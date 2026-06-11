import { useCallback, useMemo } from "react";
import { ABILITY_STATS, newEquipped } from "../utils/Character.js";
import EmojiPicker from "./EmojiPicker.jsx";
import HpTracker from "./HpTracker.jsx";
import StatBox from "./StatBox.jsx";
import InventoryList from "./InventoryList.jsx";
import EquipmentPanel from "./EquipmentPanel.jsx";
import SkillPanel from "./SkillPanel.jsx";

export default function CharacterSheet({ char, onChange, onDelete }) {
  const update = useCallback(
    (field, val) => onChange({ ...char, [field]: val }),
    [char, onChange]
  );
  const updateMany = useCallback(
    (fields) => onChange({ ...char, ...fields }),
    [char, onChange]
  );
  const updateInventory = useCallback(
    (inv) => onChange({ ...char, inventory: inv }),
    [char, onChange]
  );

  const equipped = useMemo(() => ({
    ...newEquipped(),
    ...(char.equipped ?? {}),
    accessories: char.equipped?.accessories ?? [null, null, null],
  }), [char.equipped]);

  const inventory = useMemo(
    () => Array.isArray(char.inventory) ? char.inventory : [],
    [char.inventory]
  );
  const skillset = useMemo(
    () => Array.isArray(char.skillset) ? char.skillset : [],
    [char.skillset]
  );
  const equippedSkills = useMemo(
    () => Array.isArray(char.equippedSkills) ? char.equippedSkills : [],
    [char.equippedSkills]
  );

  /* ── equipment handlers ── */
  const handleEquip = useCallback((item, hand) => {
    const nextEquipped = { ...equipped, accessories: [...equipped.accessories] };
    if (item.kind === "weapon") {
      if (hand === "both") {
        if (nextEquipped.right_hand !== null || nextEquipped.left_hand !== null) return;
        nextEquipped.right_hand = item;
        nextEquipped.left_hand  = item;
      } else {
        if (nextEquipped[hand] !== null) return;
        nextEquipped[hand] = item;
      }
    } else if (item.kind === "equipment") {
      const slot = item.slot;
      if (slot === "accessory") {
        const idx = nextEquipped.accessories.findIndex(a => a === null);
        if (idx === -1) return;
        nextEquipped.accessories[idx] = item;
      } else {
        if (nextEquipped[slot] !== null) return;
        nextEquipped[slot] = item;
      }
    }
    onChange({ ...char, inventory: inventory.filter(e => e.id !== item.id), equipped: nextEquipped });
  }, [char, equipped, inventory, onChange]);

  const handleUnequip = useCallback((slot, accessoryIndex) => {
    const nextEquipped = { ...equipped, accessories: [...equipped.accessories] };
    let returnedItem;
    if (slot === "accessory") {
      returnedItem = nextEquipped.accessories[accessoryIndex];
      if (!returnedItem) return;
      nextEquipped.accessories[accessoryIndex] = null;
    } else if (slot === "both_hands") {
      returnedItem = nextEquipped.right_hand;
      if (!returnedItem) return;
      nextEquipped.right_hand = null;
      nextEquipped.left_hand  = null;
    } else {
      returnedItem = nextEquipped[slot];
      if (!returnedItem) return;
      nextEquipped[slot] = null;
    }
    onChange({ ...char, inventory: [...inventory, returnedItem], equipped: nextEquipped });
  }, [char, equipped, inventory, onChange]);

  /* ── skill handlers ── */
  const handleSkillsetChange = useCallback((next) => {
    onChange({ ...char, skillset: next });
  }, [char, onChange]);

  const handleEquippedSkillsChange = useCallback((next) => {
    onChange({ ...char, equippedSkills: next });
  }, [char, onChange]);

  const handleSkillCharUpdate = useCallback((fields) => {
    onChange({ ...char, ...fields });
  }, [char, onChange]);

  /* ── MP bar percentage ── */
  const maxMp  = char.maxMp  ?? 10;
  const mp     = char.mp     ?? maxMp;
  const mpPct  = maxMp > 0 ? Math.min(100, (mp / maxMp) * 100) : 0;
  const exhPct = Math.min(100, char.exhaustion ?? 0);

  return (
    <>
      {/* Identity */}
      <div className="card">
        <div className="char-header">
          <EmojiPicker value={char.emoji} onChange={e => update("emoji", e)} />
          <div className="char-fields">
            <input
              className="name-input" type="text" placeholder="Character Name"
              value={char.name} onChange={e => update("name", e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <div className="field-row">
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
        <div className="field-row" style={{ marginTop: 12 }}>
          <div className="field-group">
            <div className="label">Gold 🪙</div>
            <input type="number" min={0} value={char.gold}
              onChange={e => update("gold", Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
        </div>
      </div>

      {/* HP, MP & Exhaustion */}
      <HpTracker hp={char.hp} maxHp={char.maxHp} armor={char.armor} onUpdate={updateMany} />

      <div className="card">
        <div className="section-title">Mana &amp; Exhaustion</div>

        {/* MP bar */}
        <div className="hp-row">
          <div className="hp-label" style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"var(--text-dim)", letterSpacing:1 }}>MP</div>
          <div className="hp-bar-wrap">
            <div className="hp-bar-fill" style={{ width:`${mpPct}%`, background:"linear-gradient(90deg,#4a5cbf,#7b8ff5)" }} />
          </div>
          <div className="hp-nums">
            <input type="number" min={0} max={maxMp} value={mp}
              onChange={e => update("mp", Math.min(maxMp, Math.max(0, parseInt(e.target.value) || 0)))} />
            <span className="hp-sep">/</span>
            <input type="number" min={1} value={maxMp}
              onChange={e => update("maxMp", Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        </div>

        {/* Exhaustion bar */}
        <div className="hp-row" style={{ marginBottom: 0 }}>
          <div className="hp-label" style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"var(--text-dim)", letterSpacing:1 }}>EXH</div>
          <div className="hp-bar-wrap">
            <div className="hp-bar-fill" style={{
              width:`${exhPct}%`,
              background: exhPct >= 100
                ? "linear-gradient(90deg,#7a0000,#c00)"
                : exhPct >= 60
                  ? "linear-gradient(90deg,#7a4a00,#c97820)"
                  : "linear-gradient(90deg,#3a5a3a,#5a9a5a)"
            }} />
          </div>
          <div className="hp-nums">
            <input type="number" min={0} max={100} value={exhPct}
              onChange={e => update("exhaustion", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} />
            <span className="hp-sep" style={{ color:"var(--text-dim)", fontSize:12 }}>%</span>
          </div>
        </div>
        {exhPct >= 100 && (
          <div style={{ marginTop:8, fontSize:12, color:"var(--red)", fontFamily:"'Cinzel',serif", letterSpacing:1 }}>
            ⚠ Exhausted — cannot use active skills
          </div>
        )}
      </div>

      {/* Ability scores */}
      <div className="card">
        <div className="section-title">Ability Scores</div>
        <div className="stats-grid">
          {ABILITY_STATS.map(stat => (
            <StatBox key={stat} label={stat.toUpperCase()} value={char[stat]} onChange={v => update(stat, v)} />
          ))}
        </div>
      </div>

      {/* Equipment slots */}
      <EquipmentPanel equipped={equipped} onUnequip={handleUnequip} />

      {/* Equipped skills */}
      <SkillPanel
        skillset={skillset}
        equippedSkills={equippedSkills}
        mp={mp}
        maxMp={maxMp}
        exhaustion={exhPct}
        onSkillsetChange={handleSkillsetChange}
        onEquippedChange={handleEquippedSkillsChange}
        onCharUpdate={handleSkillCharUpdate}
      />

      {/* Inventory */}
      <InventoryList
        inventory={inventory}
        equipped={equipped}
        onChange={updateInventory}
        onEquip={handleEquip}
      />

      {/* Notes */}
      <div className="card">
        <div className="section-title">Notes</div>
        <textarea
          placeholder="Conditions, quest notes, backstory…"
          value={char.notes}
          onChange={e => update("notes", e.target.value)}
          style={{ minHeight: 70 }}
        />
      </div>

      <div className="btn-row">
        <button className="btn danger" onClick={onDelete}>Remove Character</button>
      </div>
    </>
  );
}