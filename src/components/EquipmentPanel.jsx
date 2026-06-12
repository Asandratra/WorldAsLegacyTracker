import { memo } from "react";
import { newEquipped } from "../utils/Character.js";

const ARMOR_SLOTS = { head: "Head", upper: "Upper", lower: "Lower" };

function WeaponSubLine({ item }) {
  if (!item) return null;
  const parts = [];
  if (item.slash_power) parts.push(`Slash ${item.slash_power}`);
  if (item.blunt_power) parts.push(`Blunt ${item.blunt_power}`);
  if (item.pierce_power) parts.push(`Pierce ${item.pierce_power}`);
  if (item.block_power) parts.push(`Block ${item.block_power}`);
  if (!parts.length) return null;
  return <div className="equip-slot-sub">{parts.join(" · ")}</div>;
}

function ArmorSubLine({ item }) {
  if (!item || item.armor <= 0) return null;
  return <div className="equip-slot-sub">Armor +{item.armor}</div>;
}

const EquipSlot = memo(function EquipSlot({ label, item, tag, onUnequip }) {
  return (
    <div className={`equip-slot ${item ? "filled" : ""}`}>
      <div className="equip-slot-label">{label}</div>
      <div className="equip-slot-content">
        {item ? (
          <>
            <div className="equip-slot-name">
              {item.name || "Unnamed"}
              {tag && <span className="equip-slot-tag">{tag}</span>}
            </div>
            {item.description && <div className="equip-slot-desc">{item.description}</div>}
            {item.kind === "weapon" ? <WeaponSubLine item={item} /> : <ArmorSubLine item={item} />}
          </>
        ) : (
          <div className="equip-slot-empty">— empty —</div>
        )}
      </div>
      {item && (
        <button className="equip-unequip-btn" onClick={onUnequip}>Remove</button>
      )}
    </div>
  );
});

const EquipmentPanel = memo(function EquipmentPanel({ equipped, onUnequip }) {
  const safe = {
    ...newEquipped(),
    ...equipped,
    accessories: equipped?.accessories ?? [null, null, null],
  };

  // For dual-hand: both slots hold the same item object.
  // We detect this to show a single "2H" tag and only render one remove button.
  const isDualHeld =
    safe.right_hand !== null &&
    safe.left_hand !== null &&
    safe.right_hand.id === safe.left_hand.id;

  return (
    <div className="card">
      <div className="section-title">Equipment</div>
      <div className="equip-grid">

        {/* Armor slots */}
        {Object.entries(ARMOR_SLOTS).map(([slot, label]) => (
          <EquipSlot
            key={slot}
            label={label}
            item={safe[slot]}
            onUnequip={() => onUnequip(slot)}
          />
        ))}

        {/* Hand slots */}
        <div className="equip-section-label">Weapons</div>

        {isDualHeld ? (
          /* Dual-hand: show as one merged row */
          <div className="equip-slot filled equip-slot-dual">
            <div className="equip-slot-label">Both Hands</div>
            <div className="equip-slot-content">
              <div className="equip-slot-name">
                {safe.right_hand.name || "Unnamed"}
                <span className="equip-slot-tag">2H</span>
              </div>
              {safe.right_hand.description && (
                <div className="equip-slot-desc">{safe.right_hand.description}</div>
              )}
              <WeaponSubLine item={safe.right_hand} />
            </div>
            <button className="equip-unequip-btn" onClick={() => onUnequip("both_hands")}>
              Remove
            </button>
          </div>
        ) : (
          <>
            <EquipSlot
              label="Right Hand"
              item={safe.right_hand}
              onUnequip={() => onUnequip("right_hand")}
            />
            <EquipSlot
              label="Left Hand"
              item={safe.left_hand}
              onUnequip={() => onUnequip("left_hand")}
            />
          </>
        )}

        {/* Accessories */}
        <div className="equip-section-label">Accessories</div>
        {safe.accessories.map((item, i) => (
          <EquipSlot
            key={`acc-${i}`}
            label={`Accessory ${i + 1}`}
            item={item}
            onUnequip={() => onUnequip("accessory", i)}
          />
        ))}
      </div>
    </div>
  );
});

export default EquipmentPanel;