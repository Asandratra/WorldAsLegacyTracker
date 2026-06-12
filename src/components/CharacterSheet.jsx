import { useCallback, useMemo, useState } from "react";
import { BASE_STATS, SOCIAL_STATS, newEquipped } from "../utils/Character.js";
import { sumModifier } from "../utils/Inventory.js";
import EmojiPicker from "./EmojiPicker.jsx";
import HpTracker from "./HpTracker.jsx";
//import StatBox from "./StatBox.jsx";
import InventoryList from "./InventoryList.jsx";
import EquipmentPanel from "./EquipmentPanel.jsx";
import SkillPanel from "./SkillPanel.jsx";

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
  const handleSkillCharUpdate   = useCallback((f) => onChange({ ...char, ...f }),               [char, onChange]);

  return {
    update, updateMany,
    equipped, inventory, skillset, equippedSkills,
    mp, maxMp, mpPct, exhPct,
    handleEquip, handleUnequip,
    handleSkillsetChange, handleEquippedSkillChange, handleSkillCharUpdate,
  };
}

/* ─────────────────────────────────────────────
   STATS SECTION
   Tabbed view: Base Stats and Social Stats
───────────────────────────────────────────── */
function StatsSection({ char, onChange, equipped }) {
  const [statTab, setStatTab] = useState("base");
  const [isEditing, setIsEditing] = useState(false); // Controls modal visibility

  const updateStat = useCallback(
    (category, statName, val) => {
      const stats = { ...char[category] };
      stats[statName] = val;
      onChange({ ...char, [category]: stats });
    },
    [char, onChange]
  );

  const baseStats = useMemo(() => char.base_stats ?? {}, [char.base_stats]);
  const socialStats = useMemo(() => char.social_stats ?? {}, [char.social_stats]);

  const activeKeys = statTab === "base" ? BASE_STATS : SOCIAL_STATS;
  const activeData = statTab === "base" ? baseStats : socialStats;
  const activeCategory = statTab === "base" ? "base_stats" : "social_stats";
  // Sum stat modifiers from all equipped items for currently viewed stat group
  const getModifier = (key) => equipped ? sumModifier(equipped, key) : 0;
  const getTotal = (key, base) => base + getModifier(key);
  const getDiceBonus = (total) => Math.floor(total / 3);

  // Radar math dimensions
  const size = 300;
  const center = size / 2;
  const radius = 100; 
  const maxStatValue = 20; 

  const radarPoints = useMemo(() => {
    const totalSides = activeKeys.length;
    return activeKeys.map((key, i) => {
      const val = activeData[key] ?? 10;
      const angle = (Math.PI * 2 / totalSides) * i - Math.PI / 2;
      
      const calculatedRadius = (Math.min(val, maxStatValue) / maxStatValue) * radius;
      const x = center + calculatedRadius * Math.cos(angle);
      const y = center + calculatedRadius * Math.sin(angle);

      const labelX = center + (radius + 22) * Math.cos(angle);
      const labelY = center + (radius + 12) * Math.sin(angle);

      return { key, val, x, y, labelX, labelY, angle };
    });
  }, [activeKeys, activeData, center, radius]);

  const polygonPointsStr = radarPoints.map(p => `${p.x},${p.y}`).join(" ");
  const concentricGridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <>
      <div className="modal-kind-tabs" style={{ marginBottom: 16 }}>
        <button
          className={`modal-kind-tab ${statTab === "base" ? "active" : ""}`}
          onClick={() => setStatTab("base")}
        >
          Base
        </button>
        <button
          className={`modal-kind-tab ${statTab === "social" ? "active" : ""}`}
          onClick={() => setStatTab("social")}
        >
          Social
        </button>
      </div>

      <div className="radar-container">
        {/* Radar Map Frame */}
        <div className="radar-chart-wrapper">
          <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg">
            {concentricGridLevels.map((lvl, index) => {
              const gridPoints = activeKeys.map((_, i) => {
                const angle = (Math.PI * 2 / activeKeys.length) * i - Math.PI / 2;
                return `${center + (radius * lvl) * Math.cos(angle)},${center + (radius * lvl) * Math.sin(angle)}`;
              }).join(" ");
              return <polygon key={index} points={gridPoints} className="radar-grid-line" />;
            })}

            {radarPoints.map((p, i) => {
              const edgeX = center + radius * Math.cos(p.angle);
              const edgeY = center + radius * Math.sin(p.angle);
              return <line key={i} x1={center} y1={center} x2={edgeX} y2={edgeY} className="radar-axis-line" />;
            })}

            <polygon points={polygonPointsStr} className="radar-poly-fill" />
            <polygon points={polygonPointsStr} className="radar-poly-stroke" />

            {radarPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" className="radar-node" />
            ))}

            {radarPoints.map((p, i) => (
              <text style={{fontSize:10}} key={i} x={p.labelX} y={p.labelY} textAnchor="middle" alignmentBaseline="middle" className="radar-label-text">
                {p.key.slice(0, 3).toLowerCase()} {getTotal(p.key, p.val)} { getTotal(p.key, p.val)<0 ? "["+getDiceBonus(getTotal(p.key, p.val))+"]" : "[+"+getDiceBonus(getTotal(p.key, p.val))+"]"}
              </text>
            ))}
          </svg>
        </div>

        {/* Edit triggering button */}
        <button className="btn primary-btn stat-edit-trigger" onClick={() => setIsEditing(true)}>
          Edit Attributes
        </button>
      </div>

      {/* STAT EDITING MODAL OVERLAY */}
      {isEditing && (
        <div className="stat-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="stat-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="stat-modal-header">
              <h3>Edit {statTab === "base" ? "Base" : "Social"} Attributes</h3>
              <button className="stat-modal-close" onClick={() => setIsEditing(false)}>×</button>
            </div>
            
            <div className="radar-inputs-list">
              {radarPoints.map(p => (
                <div className="radar-input-row" key={p.key}>
                  <label className="label">{p.key.charAt(0).toUpperCase() + p.key.slice(1)}</label>
                  <div className="radar-counter-box">
                    <button className="hp-btn" onClick={() => updateStat(activeCategory, p.key, Math.max(0, p.val - 1))}>-</button>
                    <input
                      type="number" min={0} max={30}
                      value={p.val}
                      onChange={e => updateStat(activeCategory, p.key, Math.max(0, parseInt(e.target.value) || 0))}
                    />
                    <button className="hp-btn" onClick={() => updateStat(activeCategory, p.key, p.val + 1)}>+</button>
                  </div>
                  {(() => {
                    const mod   = getModifier(p.key);
                    const total = p.val + mod;
                    const dice  = getDiceBonus(total);
                    return (
                      <div className="stat-detail-col">
                        <span className="stat-total-display">
                          {p.val}
                          {mod !== 0 && <span className={`stat-mod-inline ${mod > 0 ? "pos" : "neg"}`}>{mod > 0 ? "+" : ""}{mod}</span>}
                          <span className="stat-equals">= {total}</span>
                        </span>
                        {dice > 0 && <span className="stat-dice-bonus">+{dice}d bonus</span>}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>

            <div className="stat-modal-footer">
              <button className="btn" onClick={() => setIsEditing(false)}>Done</button>
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
        <div className="section-title">Ability Scores</div>
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
      {/* Skills — 6×2 grid */}
      <SkillPanel
        skillset={skillset}
        equippedSkills={equippedSkills}
        mp={mp}
        maxMp={maxMp}
        exhaustion={exhPct}
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