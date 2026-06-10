import { memo } from "react";
import { newEquipped } from "../utils/Character.js";

const SLOT_LABELS = { head: "Head", upper: "Upper", lower: "Lower" };

function SlotSubLine({ item }) {
  if (!item || item.armor <= 0) return null;
  return <div className="equip-slot-sub">Armor +{item.armor}</div>;
}

const EquipSlot = memo(function EquipSlot({ label, item, onUnequip }) {
  return (
    <div className={`equip-slot ${item ? "filled" : ""}`}>
      <div className="equip-slot-label">{label}</div>
      <div className="equip-slot-content">
        {item ? (
          <>
            <div className="equip-slot-name">{item.name || "Unnamed"}</div>
            {item.description && <div className="equip-slot-desc">{item.description}</div>}
            <SlotSubLine item={item} />
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

  return (
    <div className="card">
      <div className="section-title">Equipment</div>
      <div className="equip-grid">
        {["head", "upper", "lower"].map(slot => (
          <EquipSlot
            key={slot}
            label={SLOT_LABELS[slot]}
            item={safe[slot]}
            onUnequip={() => onUnequip(slot)}
          />
        ))}
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