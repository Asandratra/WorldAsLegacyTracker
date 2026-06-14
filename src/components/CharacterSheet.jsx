import { useCallback, useMemo, useState } from "react";
import { BASE_STATS, SOCIAL_STATS, TECH_STAT_TREE, newEquipped } from "../utils/Character.js";
import { sumModifier } from "../utils/Inventory.js";
import EmojiPicker from "./EmojiPicker.jsx";
import HpTracker from "./HpTracker.jsx";
//import StatBox from "./StatBox.jsx";
import InventoryList from "./InventoryList.jsx";
import EquipmentPanel from "./EquipmentPanel.jsx";
import SkillPanel from "./SkillPanel.jsx";
import WeaponAttackPanel from "./WeaponAttackPanel.jsx";

/* ─────────────────────────────────────────────
   Shared hook — derives all state & handlers
   from a char + onChange pair. Used by both
   LeftColumn and RightColumn so they stay in
   sync without prop-drilling everything twice.
───────────────────────────────────────────── */
function useCharSheet(char, onChange) {

  const update = useCallback(
    (field, val) => onChange({ ...char, [field]: val }),
    [char, onChange]
  );
  const updateMany = useCallback(
    (fields) => onChange({ ...char, ...fields }),
    [char, onChange]
  );

  const equipped = useMemo(() => ({
    ...newEquipped(),
    ...(char.equipped ?? {}),
    accessories: char.equipped?.accessories ?? [null, null, null],
  }), [char.equipped]);
  
  const getModifier = (key) => equipped ? sumModifier(equipped, key) : 0;
  const getTotal = (key, base) => base + getModifier(key);

  const inventory      = useMemo(() => Array.isArray(char.inventory)      ? char.inventory      : [], [char.inventory]);
  const skillset       = useMemo(() => Array.isArray(char.skillset)       ? char.skillset       : [], [char.skillset]);
  const equippedSkills = useMemo(() => Array.isArray(char.equippedSkills) ? char.equippedSkills : [], [char.equippedSkills]);

  const maxMp  = getTotal("mp",char.maxMp) ?? 10;
  const mp     = char.mp    ?? maxMp;
  const mpPct  = maxMp > 0 ? Math.min(100, (mp / maxMp) * 100) : 0;
  const exhPct = Math.min(100, char.exhaustion ?? 0);

  /* equipment */
  const handleEquip = useCallback((item, hand) => {
    const next = { ...equipped, accessories: [...equipped.accessories] };
    if (item.kind === "weapon") {
      if (hand === "both") {
        if (next.right_hand || next.left_hand) return;
        next.right_hand = next.left_hand = item;
      } else {
        if (next[hand]) return;
        next[hand] = item;
      }
    } else if (item.kind === "equipment") {
      if (item.slot === "accessory") {
        const idx = next.accessories.findIndex(a => a === null);
        if (idx === -1) return;
        next.accessories[idx] = item;
      } else {
        if (next[item.slot]) return;
        next[item.slot] = item;
      }
    }
    onChange({ ...char, inventory: inventory.filter(e => e.id !== item.id), equipped: next });
  }, [char, equipped, inventory, onChange]);

  const handleUnequip = useCallback((slot, accIdx) => {
    const next = { ...equipped, accessories: [...equipped.accessories] };
    let returned;
    if (slot === "accessory") {
      returned = next.accessories[accIdx]; if (!returned) return;
      next.accessories[accIdx] = null;
    } else if (slot === "both_hands") {
      returned = next.right_hand; if (!returned) return;
      next.right_hand = next.left_hand = null;
    } else {
      returned = next[slot]; if (!returned) return;
      next[slot] = null;
    }
    onChange({ ...char, inventory: [...inventory, returned], equipped: next });
  }, [char, equipped, inventory, onChange]);

  /* skills */
  const handleSkillsetChange    = useCallback((s) => onChange({ ...char, skillset: s }),       [char, onChange]);
  const handleEquippedSkillChange = useCallback((s) => onChange({ ...char, equippedSkills: s }), [char, onChange]);
  const handleSkillCharUpdate = useCallback((changes) => {
  const updatedChar = { ...char, ...changes };
    onChange(updatedChar);     // ← send full updated character
  }, [char, onChange]);

  return {
    update, updateMany,
    equipped, inventory, skillset, equippedSkills,
    mp, maxMp, mpPct, exhPct,
    handleEquip, handleUnequip,
    handleSkillsetChange, handleEquippedSkillChange, handleSkillCharUpdate
  };
}

/* ─────────────────────────────────────────────
   STATS SECTION
   Tabbed view: Base Stats and Social Stats
───────────────────────────────────────────── */
function StatsSection({ char, onChange, equipped }) {
  const [tab, setTab] = useState("base");
  const [editing, setEditing] = useState(false);

  const updateStat = useCallback(
    (category, key, val) => {
      onChange({ ...char, [category]: { ...char[category], [key]: Math.max(0, val) } });
    },
    [char, onChange]
  );

  const getMod   = (key) => (equipped ? sumModifier(equipped, key) : 0);
  const diceBonus = (total) => Math.floor(total / 3);

  // ── Resolve active dataset for current tab ──────────────────────────────────
  const TAB_CONFIG = {
    base:      { label: "Base",      category: "base_stats",   keys: BASE_STATS   },
    social:    { label: "Social",    category: "social_stats", keys: SOCIAL_STATS },
    technique: { label: "Technique", category: "tech_stats",   keys: null         }, // uses tree
  };

  const cfg      = TAB_CONFIG[tab];
  const statData = char[cfg.category] ?? {};

  // For technique tab, produce a flat key list from the tree
  const flatKeys = tab === "technique"
    ? Object.values(TECH_STAT_TREE).flat().map(s => s.toLowerCase())
    : cfg.keys;

  // ── Stat row renderer ───────────────────────────────────────────────────────
  const StatDisplayRow = ({ label, statKey, base }) => {
    const mod   = getMod(statKey);
    const total = base + mod;
    const bonus = diceBonus(total);
    return (
      <div className="stat-row">
        <span className="stat-row-label">{label}</span>
        <div className="stat-row-values">
          <span className="stat-row-base">{base}</span>
          {mod !== 0 && (
            <span className={`stat-row-mod ${mod > 0 ? "pos" : "neg"}`}>
              {mod > 0 ? "+" : ""}{mod}
            </span>
          )}
          <span className="stat-row-sep">=</span>
          <span className="stat-row-total">{total}</span>
          {bonus > 0 && (
            <span className="stat-row-bonus">D+{bonus}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Tab bar */}
      <div className="stat-tabs">
        {Object.entries(TAB_CONFIG).map(([key, { label }]) => (
          <button
            key={key}
            className={`stat-tab ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Base & Social tabs — grouped list ── */}
      {tab !== "technique" && (
        <div className="stat-list">
          {flatKeys.map(key => (
            <StatDisplayRow
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              statKey={key}
              base={statData[key] ?? 0}
            />
          ))}
        </div>
      )}

      {/* ── Technique tab — grouped by primary type ── */}
      {tab === "technique" && (
        <div className="stat-list">
          {Object.entries(TECH_STAT_TREE).map(([primary, subs]) => (
            <div key={primary} className="tech-stat-group">
              <div className="tech-stat-group-label">{primary}</div>
              {subs.map(sub => {
                const key = sub.toLowerCase();
                return (
                  <StatDisplayRow
                    key={key}
                    label={sub}
                    statKey={key}
                    base={statData[key] ?? 0}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Edit button */}
      <button className="btn primary" style={{ marginTop: 12 }} onClick={() => setEditing(true)}>
        Edit {TAB_CONFIG[tab].label} Stats
      </button>

      {/* Edit modal */}
      {editing && (
        <div className="stat-modal-overlay" onClick={() => setEditing(false)}>
          <div className="stat-modal-content" onClick={e => e.stopPropagation()}>
            <div className="stat-modal-header">
              <h3>Edit {TAB_CONFIG[tab].label} Stats</h3>
              <button className="stat-modal-close" onClick={() => setEditing(false)}>×</button>
            </div>

            <div className="stat-edit-list">
              {tab !== "technique" && flatKeys.map(key => {
                const base  = statData[key] ?? 0;
                const mod   = getMod(key);
                const total = base + mod;
                const bonus = diceBonus(total);
                return (
                  <div className="stat-edit-row" key={key}>
                    <span className="stat-edit-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <div className="stat-edit-counter">
                      <button className="stat-edit-btn" onClick={() => updateStat(cfg.category, key, base - 1)}>−</button>
                      <input
                        className="stat-edit-input"
                        type="number" min={0}
                        value={base}
                        onChange={e => updateStat(cfg.category, key, parseInt(e.target.value) || 0)}
                      />
                      <button className="stat-edit-btn" onClick={() => updateStat(cfg.category, key, base + 1)}>+</button>
                    </div>
                    <div className="stat-edit-right">
                      {mod !== 0 && <span className={`stat-row-mod ${mod > 0 ? "pos" : "neg"}`}>{mod > 0 ? "+" : ""}{mod}</span>}
                      <span className="stat-row-sep">=</span>
                      <span className="stat-row-total">{total}</span>
                      {bonus > 0 && <span className="stat-row-bonus">D+{bonus}</span>}
                    </div>
                  </div>
                );
              })}

              {tab === "technique" && Object.entries(TECH_STAT_TREE).map(([primary, subs]) => (
                <div key={primary}>
                  <div className="tech-stat-group-label" style={{ marginTop: 12, marginBottom: 4 }}>{primary}</div>
                  {subs.map(sub => {
                    const key   = sub.toLowerCase();
                    const base  = statData[key] ?? 0;
                    const mod   = getMod(key);
                    const total = base + mod;
                    const bonus = diceBonus(total);
                    return (
                      <div className="stat-edit-row" key={key}>
                        <span className="stat-edit-label">{sub}</span>
                        <div className="stat-edit-counter">
                          <button className="stat-edit-btn" onClick={() => updateStat(cfg.category, key, base - 1)}>−</button>
                          <input
                            className="stat-edit-input"
                            type="number" min={0}
                            value={base}
                            onChange={e => updateStat(cfg.category, key, parseInt(e.target.value) || 0)}
                          />
                          <button className="stat-edit-btn" onClick={() => updateStat(cfg.category, key, base + 1)}>+</button>
                        </div>
                        <div className="stat-edit-right">
                          {mod !== 0 && <span className={`stat-row-mod ${mod > 0 ? "pos" : "neg"}`}>{mod > 0 ? "+" : ""}{mod}</span>}
                          <span className="stat-row-sep">=</span>
                          <span className="stat-row-total">{total}</span>
                          {bonus > 0 && <span className="stat-row-bonus">D+{bonus}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="stat-modal-footer">
              <button className="btn primary" onClick={() => setEditing(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


/* ─────────────────────────────────────────────
   LEFT COLUMN
   Identity · Gold · HP/MP/Exhaustion · Stats · Equipment · Notes · Delete
───────────────────────────────────────────── */
export function LeftColumn({ char, onChange, onDelete }) {
  const {
    update, updateMany,
    equipped, mp, maxMp, mpPct, exhPct,
    handleUnequip,
  } = useCharSheet(char, onChange);

  const getModifier = (key) => equipped ? sumModifier(equipped, key) : 0;
  const getTotal = (key, base) => base + getModifier(key);

  return (
    <>
      {/* Identity card */}
      <div className="card">
        <div className="char-header">
          <EmojiPicker value={char.emoji} onChange={e => update("emoji", e)} />
          <div className="char-fields">
            <input
              className="name-input" type="text" placeholder="Character Name"
              value={char.name} onChange={e => update("name", e.target.value)}
            />
            <div className="field-row" style={{ marginTop: 8 }}>
              <div className="field-group">
                <div className="label">Class</div>
                <input type="text" placeholder="Rogue…" value={char.class} onChange={e => update("class", e.target.value)} />
              </div>
              <div className="field-group">
                <div className="label">Race</div>
                <input type="text" placeholder="Elf…" value={char.race} onChange={e => update("race", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold */}
      <div className="card">
        <div className="label" style={{ marginBottom: 4 }}>Riah 🪙</div>
        <input type="number" min={0} value={char.gold}
          onChange={e => update("gold", Math.max(0, parseInt(e.target.value) || 0))} />
      </div>

      {/* HP */}
      <HpTracker hp={char.hp} maxHp={getTotal("hp", char.maxHp)} armor={getTotal("armor", char.armor)} onUpdate={updateMany} />

      {/* MP & Exhaustion */}
      <div className="card">
        <div className="section-title">Mana &amp; Exhaustion</div>

        <div className="vitals-bar-row">
          <div className="vitals-bar-label">MP</div>
          <div className="hp-bar-wrap">
            <div className="hp-bar-fill" style={{ width: `${mpPct}%`, background: "linear-gradient(90deg,#3a4a8a,#6878c8)" }} />
          </div>
          <div className="hp-nums">
            <input type="number" min={0} max={maxMp} value={mp}
              onChange={e => update("mp", Math.min(maxMp, Math.max(0, parseInt(e.target.value) || 0)))} />
            <span className="hp-sep">/</span>
            <input type="number" min={1} value={maxMp}
              onChange={e => update("maxMp", Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        </div>

        <div className="vitals-bar-row" style={{ marginBottom: 0 }}>
          <div className="vitals-bar-label">EXH</div>
          <div className="hp-bar-wrap">
            <div className="hp-bar-fill" style={{
              width: `${exhPct}%`,
              background: exhPct >= 100 ? "linear-gradient(90deg,#6a0000,#aa2020)"
                : exhPct >= 60          ? "linear-gradient(90deg,#6a3a00,#b06a10)"
                :                         "linear-gradient(90deg,#2a4a28,#4a7a48)"
            }} />
          </div>
          <div className="hp-nums">
            <input type="number" min={0} max={100} value={exhPct}
              onChange={e => update("exhaustion", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} />
            <span className="hp-sep" style={{ fontSize: 12 }}>%</span>
          </div>
        </div>
        {exhPct >= 100 && (
          <div className="exhausted-warning">⚠ Exhausted — active skills disabled</div>
        )}
      </div>

      {/* Ability scores */}
      <div className="card">
        <div className="section-title">Stats</div>
        <StatsSection char={char} onChange={onChange} equipped={equipped} />
      </div>

      {/* Equipment */}
      <EquipmentPanel equipped={equipped} onUnequip={handleUnequip} />

      {/* Notes */}
      <div className="card">
        <div className="section-title">Notes</div>
        <textarea placeholder="Conditions, quest notes, backstory…"
          value={char.notes} onChange={e => update("notes", e.target.value)}
          style={{ minHeight: 80 }} />
      </div>

      <div className="btn-row">
        <button className="btn danger" onClick={onDelete}>Remove Character</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   RIGHT COLUMN
   Skills (6×2 grid) · Inventory (scrollable)
───────────────────────────────────────────── */
export function RightColumn({ char, onChange }) {
  const {
    equipped, inventory,
    skillset, equippedSkills,
    mp, maxMp, exhPct,
    handleEquip,
    handleSkillsetChange, handleEquippedSkillChange, handleSkillCharUpdate,
  } = useCharSheet(char, onChange);

  const updateInventory = useCallback(
    (inv) => onChange({ ...char, inventory: inv }),
    [char, onChange]
  );

  return (
    <>
      {/* Weapon Attack Panel */}
      <WeaponAttackPanel
        equipped={equipped}
        weapon_mastery={char.weapon_mastery}
        onCharUpdate={handleSkillCharUpdate}
      />

      {/* Skills — 6×2 grid */}
      <SkillPanel
        skillset={skillset}
        equippedSkills={equippedSkills}
        mp={mp}
        maxMp={maxMp}
        exhaustion={exhPct}
        tech_stats={char.tech_stats}
        onSkillsetChange={handleSkillsetChange}
        onEquippedChange={handleEquippedSkillChange}
        onCharUpdate={handleSkillCharUpdate}
      />

      {/* Inventory — scrollable card */}
      <div className="inventory-scroll-card">
        <InventoryList
          inventory={inventory}
          equipped={equipped}
          onChange={updateInventory}
          onEquip={handleEquip}
        />
      </div>
    </>
  );
}