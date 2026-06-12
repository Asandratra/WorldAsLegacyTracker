export const ITEM_TYPES = ["item", "equipment", "weapon"];

export const EQUIPMENT_SLOTS = ["head", "upper", "lower", "accessory"];
export const WEAPON_HAND_TYPES = ["single_hand", "dual_hand"];

/**
 * Validates and normalizes dice notation.
 * Accepts formats like: "2d6", "3", "2+1d6", "1d6+2"
 * Returns the normalized string or empty string if invalid.
 */
export function normalizeDiceNotation(input) {
  if (!input || input.trim() === "") return "";
  const str = input.trim();
  
  // Match patterns: (num)(d|+d)(num)?, (num), (d(num))
  const diceRegex = /^(\d+)?d(\d+)([+\-]\d+)?$|^\d+([+\-]\d+d\d+)?$|^d\d+([+\-]\d+)?$/;
  
  if (!diceRegex.test(str)) return "";
  
  return str;
}

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
    slash_power: "",
    blunt_power: "",
    pierce_power: "",
    block_power: "",
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
  const getPowerValue = (notation) => {
    if (!notation || notation === "") return 0;
    // Extract numeric values for comparison
    const numMatch = notation.match(/\d+/);
    return numMatch ? parseInt(numMatch[0]) : 0;
  };
  
  const stats = [
    { label: "Slash", val: getPowerValue(weapon.slash_power), notation: weapon.slash_power },
    { label: "Blunt", val: getPowerValue(weapon.blunt_power), notation: weapon.blunt_power },
    { label: "Pierce", val: getPowerValue(weapon.pierce_power), notation: weapon.pierce_power },
    { label: "Block", val: getPowerValue(weapon.block_power), notation: weapon.block_power }
  ];
  const top = stats.reduce((a, b) => (b.val > a.val ? b : a));
  return top.val > 0 ? top.label : null;
}