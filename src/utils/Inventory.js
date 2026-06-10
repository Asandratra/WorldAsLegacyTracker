export const ITEM_TYPES = ["item", "equipment", "weapon"];

export const EQUIPMENT_SLOTS = ["head", "upper", "lower", "accessory"];
export const WEAPON_HAND_TYPES = ["single_hand", "dual_hand"];

export function newItem(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    kind: "item",
    name: "",
    description: "",
    quantity: 1,
    ...overrides,
  };
}

export function newEquipment(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    kind: "equipment",
    name: "",
    description: "",
    armor: 0,
    slot: "upper",
    ...overrides,
  };
}

export function newWeapon(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    kind: "weapon",
    name: "",
    description: "",
    hand_type: "single_hand",
    slash_power: 0,
    blunt_power: 0,
    pierce_power: 0,
    block_power: 0,
    ...overrides,
  };
}

export function createBlankEntry(kind) {
  if (kind === "equipment") return newEquipment();
  if (kind === "weapon") return newWeapon();
  return newItem();
}

/** Returns a short badge label for an inventory entry */
export function itemKindLabel(entry) {
  if (entry.kind === "weapon") return entry.hand_type === "dual_hand" ? "2H" : "1H";
  if (entry.kind === "equipment") return entry.slot.charAt(0).toUpperCase() + entry.slot.slice(1);
  return "×" + entry.quantity;
}

/** Returns the dominant power stat label for a weapon */
export function dominantPower(weapon) {
  const stats = [
    { label: "Slash", val: weapon.slash_power },
    { label: "Blunt", val: weapon.blunt_power },
    { label: "Pierce", val: weapon.pierce_power },
    { label: "Block", val: weapon.block_power }
  ];
  const top = stats.reduce((a, b) => (b.val > a.val ? b : a));
  return top.val > 0 ? top.label : null;
}