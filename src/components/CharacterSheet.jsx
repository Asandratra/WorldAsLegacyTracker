import { useCallback, useMemo } from "react";
import { ABILITY_STATS, newEquipped } from "../utils/Character.js";
import EmojiPicker from "./EmojiPicker.jsx";
import HpTracker from "./HpTracker.jsx";
import StatBox from "./StatBox.jsx";
import InventoryList from "./InventoryList.jsx";
import EquipmentPanel from "./EquipmentPanel.jsx";

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

  // Normalise equipped — memoised so child refs stay stable when unrelated fields change
  const equipped = useMemo(() => ({
    ...newEquipped(),
    ...(char.equipped ?? {}),
    accessories: char.equipped?.accessories ?? [null, null, null],
  }), [char.equipped]);

  const inventory = useMemo(
    () => Array.isArray(char.inventory) ? char.inventory : [],
    [char.inventory]
  );

  const handleEquip = useCallback((item) => {
    const slot = item.slot;
    const nextEquipped = { ...equipped, accessories: [...equipped.accessories] };

    if (slot === "accessory") {
      const idx = nextEquipped.accessories.findIndex(a => a === null);
      if (idx === -1) return;
      nextEquipped.accessories[idx] = item;
    } else {
      if (nextEquipped[slot] !== null) return;
      nextEquipped[slot] = item;
    }

    onChange({
      ...char,
      inventory: inventory.filter(e => e.id !== item.id),
      equipped: nextEquipped,
    });
  }, [char, equipped, inventory, onChange]);

  const handleUnequip = useCallback((slot, accessoryIndex) => {
    const nextEquipped = { ...equipped, accessories: [...equipped.accessories] };
    let returnedItem;

    if (slot === "accessory") {
      returnedItem = nextEquipped.accessories[accessoryIndex];
      if (!returnedItem) return;
      nextEquipped.accessories[accessoryIndex] = null;
    } else {
      returnedItem = nextEquipped[slot];
      if (!returnedItem) return;
      nextEquipped[slot] = null;
    }

    onChange({
      ...char,
      inventory: [...inventory, returnedItem],
      equipped: nextEquipped,
    });
  }, [char, equipped, inventory, onChange]);

  return (
    <>
      {/* Identity */}
      <div className="card">
        <div className="char-header">
          <EmojiPicker value={char.emoji} onChange={e => update("emoji", e)} />
          <div className="char-fields">
            <input
              className="name-input"
              type="text"
              placeholder="Character Name"
              value={char.name}
              onChange={e => update("name", e.target.value)}
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
            <input
              type="number"
              min={0}
              value={char.gold}
              onChange={e => update("gold", Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
        </div>
      </div>

      {/* HP & Armor */}
      <HpTracker
        hp={char.hp}
        maxHp={char.maxHp}
        armor={char.armor}
        onUpdate={updateMany}
      />

      {/* Ability scores */}
      <div className="card">
        <div className="section-title">Ability Scores</div>
        <div className="stats-grid">
          {ABILITY_STATS.map(stat => (
            <StatBox
              key={stat}
              label={stat.toUpperCase()}
              value={char[stat]}
              onChange={v => update(stat, v)}
            />
          ))}
        </div>
      </div>

      {/* Equipment slots */}
      <EquipmentPanel equipped={equipped} onUnequip={handleUnequip} />

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