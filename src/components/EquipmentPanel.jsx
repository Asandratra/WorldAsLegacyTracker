import { memo } from "react";
import { newEquipped } from "../utils/Character.js";
import { fmtPower } from "../utils/Inventory.js";

const ARMOR_SLOTS = { head: "Head", upper: "Upper", lower: "Lower" };

function fmtMods(mods) {
  if (!mods) return null;
  return Object.entries(mods)
    .filter(([, v]) => v !== 0)
    .map(([k, v]) => `${k.slice(0, 3)} ${v > 0 ? "+" : ""}${v}`)
    .join(" · ");
}

export function WeaponSubLine({ item }) {
  if (!item) return null;
  const powers = [
    ["Slash",  item.slash_power],
    ["Blunt",  item.blunt_power],
    ["Pierce", item.pierce_power],
    ["Block",  item.block_power],
  ].filter(([, p]) => p?.count > 0)
   .map(([l, p]) => `${l} ${fmtPower(p)}`);

  const mods = fmtMods(item.stat_modifiers);
  if (!powers.length && !mods) return null;
  return (
    <>
      {powers.length > 0 && <div className="equip-slot-sub">{powers.join(" · ")}</div>}
      {mods && <div className="equip-slot-sub mod-line">{mods}</div>}
    </>
  );
}

export function EquipSubLine({ item }) {
  if (!item) return null;
  const parts = [];
  if (item.armor > 0) parts.push(`Armor +${item.armor}`);
  const mods = fmtMods(item.stat_modifiers);
  return (
    <>
      {parts.length > 0 && <div className="equip-slot-sub">{parts.join(" · ")}</div>}
      {mods && <div className="equip-slot-sub mod-line">{mods}</div>}
    </>
  );
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
            {item.kind === "weapon" ? <WeaponSubLine item={item} /> : <EquipSubLine item={item} />}
          </>
        ) : (
          <div className="equip-slot-empty">— empty —</div>
        )}
      </div>
      {item && <button className="equip-unequip-btn" onClick={onUnequip}>Remove</button>}
    </div>
  );
});

const EquipmentPanel = memo(function EquipmentPanel({ equipped, onUnequip }) {
  const safe = {
    ...newEquipped(),
    ...equipped,
    accessories: equipped?.accessories ?? [null, null, null],
  };

  const isDualHeld =
    safe.right_hand !== null &&
    safe.left_hand  !== null &&
    safe.right_hand.id === safe.left_hand.id;

  return (
    <div className="card">
      <div className="section-title">Equipment</div>
      <div className="equip-grid">
        {Object.entries(ARMOR_SLOTS).map(([slot, label]) => (
          <EquipSlot key={slot} label={label} item={safe[slot]} onUnequip={() => onUnequip(slot)} />
        ))}

        <div className="equip-section-label">Weapons</div>

        {isDualHeld ? (
          <div className="equip-slot filled equip-slot-dual">
            <div className="equip-slot-label">Both Hands</div>
            <div className="equip-slot-content">
              <div className="equip-slot-name">
                {safe.right_hand.name || "Unnamed"}
                <span className="equip-slot-tag">2H</span>
              </div>
              {safe.right_hand.description && <div className="equip-slot-desc">{safe.right_hand.description}</div>}
              <WeaponSubLine item={safe.right_hand} />
            </div>
            <button className="equip-unequip-btn" onClick={() => onUnequip("both_hands")}>Remove</button>
          </div>
        ) : (
          <>
            <EquipSlot label="Right Hand" item={safe.right_hand} onUnequip={() => onUnequip("right_hand")} />
            <EquipSlot label="Left Hand"  item={safe.left_hand}  onUnequip={() => onUnequip("left_hand")}  />
          </>
        )}

        <div className="equip-section-label">Accessories</div>
        {safe.accessories.map((item, i) => (
          <EquipSlot key={`acc-${i}`} label={`Accessory ${i + 1}`} item={item} onUnequip={() => onUnequip("accessory", i)} />
        ))}
      </div>
    </div>
  );
});

export default EquipmentPanel;