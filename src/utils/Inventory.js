export const ITEM_TYPES = ["item", "equipment", "weapon"];
export const EQUIPMENT_SLOTS = ["head", "upper", "lower", "accessory"];
export const WEAPON_HAND_TYPES = ["single_hand", "dual_hand"];

// All stats that can have modifiers on equipment/weapons
export const MODIFIABLE_VITALS   = ["hp", "armor", "mp"];
export const BASE_STAT_KEYS      = ["strength", "spirit", "dexterity", "reaction", "agility", "speed"];
export const SOCIAL_STAT_KEYS    = ["negotiation", "rhetoric", "seduction", "empathy", "intimidation",
                                    "humour", "insight", "creativity", "oration", "manipulation",
                                    "leadership", "intelligence"];
export const ALL_MODIFIER_KEYS   = [...MODIFIABLE_VITALS, ...BASE_STAT_KEYS, ...SOCIAL_STAT_KEYS];

/** Canonical empty stat_modifiers object — only non-zero values are stored */
export function emptyModifiers() { return {}; }

/** NdF power object */
export function newPower(count = 0, faces = 6) { return { count, faces }; }

/** Pretty-print a power object → "2d6" or "—" */
export function fmtPower(p) {
  if (!p || p.count === 0) return "—";
  return `${p.count}d${p.faces}`;
}

/** Sum a single modifier key across all equipped items */
export function sumModifier(equipped, key) {
  const items = [
    equipped?.head, equipped?.upper, equipped?.lower,
    equipped?.right_hand, equipped?.left_hand,
    ...(equipped?.accessories ?? []),
  ].filter(Boolean);
  // Deduplicate dual-wield (right_hand === left_hand)
  const seen = new Set();
  let total = 0;
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    total += item.stat_modifiers?.[key] ?? 0;
  }
  return total;
}

export function newItem(overrides = {}) {
  return { id: crypto.randomUUID(), kind: "item", name: "", description: "", quantity: 1, ...overrides };
}

export function newEquipment(overrides = {}) {
  return {
    id: crypto.randomUUID(), kind: "equipment",
    name: "", description: "", armor: 0, slot: "upper",
    stat_modifiers: emptyModifiers(),
    ...overrides,
  };
}

export function newWeapon(overrides = {}) {
  return {
    id: crypto.randomUUID(), kind: "weapon",
    name: "", description: "", hand_type: "single_hand",
    slash_power:   newPower(),
    blunt_power:   newPower(),
    pierce_power:  newPower(),
    block_power:   newPower(),
    stat_modifiers: emptyModifiers(),
    ...overrides,
  };
}

export function createBlankEntry(kind) {
  if (kind === "equipment") return newEquipment();
  if (kind === "weapon")    return newWeapon();
  return newItem();
}

export function itemKindLabel(entry) {
  if (entry.kind === "weapon")    return entry.hand_type === "dual_hand" ? "2H" : "1H";
  if (entry.kind === "equipment") return entry.slot.charAt(0).toUpperCase() + entry.slot.slice(1);
  return "×" + entry.quantity;
}