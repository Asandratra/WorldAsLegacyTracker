import { useCallback, useMemo, useState } from "react";
import { BASE_STATS, SOCIAL_STATS, TECH_STAT_TREE, TECH_STATS, newEquipped } from "../utils/Character.js";
import { techKeyForSkill } from "../utils/Skill.js";
import { sumModifier } from "../utils/Inventory.js";
import EmojiPicker from "./EmojiPicker.jsx";
import VitalsCard from "./VitalsCard.jsx";
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
  const maxExhaustion = getTotal("exh", char.maxExhaustion) ?? 100;
  const exhaustion     = Math.min(char.exhaustion ?? 0, maxExhaustion);

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
  const handleSkillsetChange      = useCallback((s) => onChange({ ...char, skillset: s }),        [char, onChange]);
  const handleEquippedSkillChange = useCallback((s) => onChange({ ...char, equippedSkills: s }),  [char, onChange]);
  const handleSkillCharUpdate     = useCallback((f) => onChange({ ...char, ...f }),               [char, onChange]);

  /* weapon mastery */
  const handleAttack = useCallback((weapon, attackType) => {
    const wm = { ...(char.weapon_mastery ?? { slash: 0, blunt: 0, pierce: 0 }) };
    wm[attackType] = (wm[attackType] ?? 0) + 1;
    onChange({ ...char, weapon_mastery: wm });
  }, [char, onChange]);

  /* skill use — applies mp/exhaustion cost AND increments tech_stat */
  const handleSkillUse = useCallback((skill, skillset) => {
    const techKey = techKeyForSkill(skill);
    const nextTech = techKey
      ? { ...char.tech_stats, [techKey]: ((char.tech_stats ?? {})[techKey] ?? 0) + 1 }
      : char.tech_stats;
    onChange({
      ...char,
      mp:         Math.max(0, (char.mp ?? 0) - skill.mp_cost),
      exhaustion: Math.min(char.maxExhaustion ?? 100, (char.exhaustion ?? 0) + skill.exhaustion_cost),
      skillset:   skillset.map(s =>
        s.id === skill.id ? { ...s, skill_mastery: (s.skill_mastery ?? 0) + 1 } : s
      ),
      tech_stats: nextTech,
    });
  }, [char, onChange]);

  const weaponMastery = useMemo(
    () => char.weapon_mastery ?? { slash: 0, blunt: 0, pierce: 0 },
    [char.weapon_mastery]
  );

  return {
    update, updateMany,
    equipped, inventory, skillset, equippedSkills,
    weaponMastery,
    mp, maxMp, mpPct,
    exhaustion, maxExhaustion,
    handleEquip, handleUnequip,
    handleSkillsetChange, handleEquippedSkillChange,
    handleSkillCharUpdate, handleSkillUse, handleAttack,
  };
}

/* ─────────────────────────────────────────────
   STATS SECTION
   Tabbed view: Base Stats and Social Stats
───────────────────────────────────────────── */
/* ── Radar graph constants ── */
const RADAR_MAX = 255;
const STAT_MAX  = 255;

function radarPoint(value, max, index, total, cx, cy, r) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const ratio = Math.min(value, max) / max;
  return { x: cx + r * ratio * Math.cos(angle), y: cy + r * ratio * Math.sin(angle) };
}
function labelPoint(index, total, cx, cy, r) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}
function polyPoints(pts) { return pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "); }

function RadarGrid({ cx, cy, r, n, rings = 5 }) {
  const angles = Array.from({ length: n }, (_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
  const ringRadii = Array.from({ length: rings }, (_, i) => r * (i + 1) / rings);
  return (
    <g className="radar-grid">
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy}
          x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)}
          className="radar-spoke" />
      ))}
      {ringRadii.map((rr, ri) => {
        const pts = angles.map(a => `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`).join(" ");
        return <polygon key={ri} points={pts} className="radar-ring" />;
      })}
    </g>
  );
}

function StatRadar({ keys, statData, getMod, label: labelFn }) {
  const n = keys.length;
  const cx = 160, cy = 140, r = 70;
  const svgW = 320, svgH = 300;

  const basePts = keys.map((k, i) =>
    radarPoint(Math.min(statData[k] ?? 0, RADAR_MAX), RADAR_MAX, i, n, cx, cy, r)
  );
  const totalPts = keys.map((k, i) => {
    const total  = Math.min((statData[k] ?? 0) + getMod(k), 510);
    const scaled = Math.min(total, RADAR_MAX);
    return radarPoint(scaled, RADAR_MAX, i, n, cx, cy, r);
  });
  const labelPts = keys.map((_, i) => labelPoint(i, n, cx, cy, r + 30));

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="radar-svg">
      <RadarGrid cx={cx} cy={cy} r={r} n={n} rings={5} />
      <polygon points={polyPoints(totalPts)} className="radar-poly-mod" />
      <polygon points={polyPoints(basePts)}  className="radar-poly-base" />
      {keys.map((k, i) => {
        const lp    = labelPts[i];
        const total = Math.min((statData[k] ?? 0) + getMod(k), 510);
        const bonus = Math.floor(total/15);
        const name  = labelFn(k);
        const anchor = lp.x < cx - 5 ? "end" : lp.x > cx + 5 ? "start" : "middle";
        return (
          <g key={k}>
            <text x={lp.x} y={lp.y - 9}  textAnchor={anchor} className="radar-label-name">{name}</text>
            <text x={lp.x} y={lp.y + 0} textAnchor={anchor} className="radar-label-val">{total}</text>
            {bonus>0 && (<text x={lp.x} y={lp.y + 9}  textAnchor={anchor} className="radar-label-name">D+{bonus}</text>)}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Stats edit modal — local draft, saved on confirm ── */
const DraftRow = ({ statKey, displayLabel, draft, setVal, getMod }) => {
  const base  = draft[statKey] ?? 0;
  const mod   = getMod(statKey);
  const total = Math.min(base + mod, 510);
  const bonus = Math.floor(total / 15);
  
  return (
    <div className="stat-edit-row">
      <span className="stat-edit-label">{displayLabel}</span>
      <div className="stat-edit-counter">
        <button className="stat-edit-btn" onClick={() => setVal(statKey, base - 1)}>−</button>
        <input 
          className="stat-edit-input" 
          type="number" 
          min={0} 
          max={STAT_MAX}
          value={base}
          onChange={e => setVal(statKey, e.target.value)} 
        />
        <button className="stat-edit-btn" onClick={() => setVal(statKey, base + 1)}>+</button>
      </div>
      <div className="stat-edit-right">
        {mod !== 0 && <span className={`stat-row-mod ${mod > 0 ? "pos" : "neg"}`}>{mod > 0 ? "+" : ""}{mod}</span>}
        <span className="stat-row-sep">=</span>
        <span className="stat-row-total">{total}</span>
        {bonus > 0 && <span className="stat-row-bonus">d+{bonus}</span>}
      </div>
    </div>
  );
};

function StatsEditModal({ label, category, initialData, getMod, isTech, onSave, onClose }) {
  const [draft, setDraft] = useState({ ...initialData });

  const setVal = (key, val) => {
    const clamped = Math.min(STAT_MAX, Math.max(0, parseInt(val) || 0));
    setDraft(d => ({ ...d, [key]: clamped }));
  };

  const handleSave = () => {
    onSave(category, draft);
    onClose();
  };

  return (
    <div className="stat-modal-overlay" onClick={onClose}>
      <div className="stat-modal-content" onClick={e => e.stopPropagation()}>
        <div className="stat-modal-header">
          <h3>Edit {label} Stats</h3>
          <button className="stat-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="stat-edit-list">
          {!isTech && Object.keys(initialData).map(key => (
            <DraftRow 
              key={key} 
              statKey={key}
              displayLabel={key.charAt(0).toUpperCase() + key.slice(1)} 
              draft={draft}
              setVal={setVal}
              getMod={getMod}
            />
          ))}
          {isTech && Object.entries(TECH_STAT_TREE).map(([primary, subs]) => (
            <div key={primary}>
              <div className="tech-stat-group-label" style={{ marginTop: 12, marginBottom: 4 }}>{primary}</div>
              {subs.map(sub => (
                <DraftRow 
                  key={sub.toLowerCase()} 
                  statKey={sub.toLowerCase()} 
                  displayLabel={sub} 
                  draft={draft}
                  setVal={setVal}
                  getMod={getMod}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="stat-modal-footer">
          <button className="btn primary" onClick={handleSave}>Save</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function StatsSection({ char, onChange, equipped }) {
  const [tab, setTab] = useState("base");
  const [techCategory, setTechCategory] = useState(Object.keys(TECH_STAT_TREE)[0]);
  const [editing, setEditing] = useState(false);

  const getMod    = (key) => (equipped ? sumModifier(equipped, key) : 0);
  const getTotal  = (key, base) => Math.min(base + getMod(key), 510);

  const TAB_CONFIG = {
    base:      { label: "Base",      category: "base_stats",   keys: BASE_STATS   },
    social:    { label: "Social",    category: "social_stats", keys: SOCIAL_STATS },
    technique: { label: "Technique", category: "tech_stats",   keys: TECH_STATS   },
  };

  const cfg      = TAB_CONFIG[tab];
  const statData = char[cfg.category] ?? {};
  const flatKeys = tab === "technique"
    ? Object.values(TECH_STAT_TREE).flat().map(s => s.toLowerCase())
    : cfg.keys;

  const shortLabel = (k) => {
    return k.charAt(0).toUpperCase() + k.slice(1);
  };

  const handleSave = useCallback((category, draft) => {
    onChange({ ...char, [category]: draft });
  }, [char, onChange]);

  return (
    <>
      <div className="stat-tabs">
        {Object.entries(TAB_CONFIG).map(([key, { label }]) => (
          <button key={key}
            className={`stat-tab ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >{label}</button>
        ))}
      </div>

      {/* ── Base / Social — radar ── */}
      {tab !== "technique" && (
        <div className="radar-wrapper">
          <StatRadar keys={flatKeys} statData={statData} getMod={getMod} label={shortLabel} />
          <div className="radar-legend">
            <span className="radar-legend-item base">■ Base</span>
            <span className="radar-legend-item mod">■ + Equipment</span>
          </div>
        </div>
      )}

      {/* ── Technique — category selector + radar ── */}
      {tab === "technique" && (() => {
        const techSubs  = TECH_STAT_TREE[techCategory] ?? [];
        const techKeys  = techSubs.map(s => s.toLowerCase());
        const shortTech = (k) => {
          const orig = techSubs.find(s => s.toLowerCase() === k) ?? k;
          return orig;
        };
        return (
          <>
            <div className="tech-category-tabs">
              {Object.keys(TECH_STAT_TREE).map(cat => (
                <button key={cat}
                  className={`tech-category-tab ${techCategory === cat ? "active" : ""}`}
                  onClick={() => setTechCategory(cat)}
                >{cat.slice(0,4)}</button>
              ))}
            </div>
            <div className="radar-wrapper">
              <StatRadar keys={techKeys} statData={statData} getMod={getMod} label={shortTech} />
              <div className="radar-legend">
                <span className="radar-legend-item base">■ Base</span>
                <span className="radar-legend-item mod">■ + Equipment</span>
              </div>
            </div>
          </>
        );
      })()}

      <button className="btn primary" style={{ marginTop: 10 }} onClick={() => setEditing(true)}>
        Edit {TAB_CONFIG[tab].label} Stats
      </button>

      {editing && (
        <StatsEditModal
          label={TAB_CONFIG[tab].label}
          category={cfg.category}
          initialData={{ ...statData }}
          getMod={getMod}
          isTech={tab === "technique"}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
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
    equipped, weaponMastery,
    mp, maxMp, mpPct,
    exhaustion, maxExhaustion,
    handleUnequip, handleAttack,
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

      {/* Unified Vitals Card */}
      <VitalsCard
        hp={char.hp}
        maxHp={getTotal("hp", char.maxHp)}
        armor={getTotal("armor", char.armor)}
        mp={mp}
        maxMp={maxMp}
        exhaustion={exhaustion}
        maxExhaustion={maxExhaustion}
        onUpdate={updateMany}
      />

      {/* Ability scores */}
      <div className="card">
        <div className="section-title">Ability Scores</div>
        <StatsSection char={char} onChange={onChange} equipped={equipped} />
      </div>

      {/* Equipment */}
      <EquipmentPanel equipped={equipped} weaponMastery={weaponMastery} onUnequip={handleUnequip} onAttack={handleAttack} />

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
    mp, maxMp,
    exhaustion, maxExhaustion,
    handleEquip,
    handleSkillsetChange, handleEquippedSkillChange,
    handleSkillCharUpdate, handleSkillUse,
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
        exhaustion={exhaustion}
        maxExhaustion={maxExhaustion}
        tech_stats={char.tech_stats}
        onSkillUse={handleSkillUse}
        onSkillsetChange={handleSkillsetChange}
        onEquippedChange={handleEquippedSkillChange}
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