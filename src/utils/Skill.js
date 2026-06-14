/**
 * Skill type taxonomy.
 * Each primary type has an array of subtypes.
 * The subtype is what gets assigned to a skill.
 * Add more subtypes (or primary types) here as needed.
 */
export const SKILL_TYPE_TREE = {
  Elemental: ["Thermodynamic", "Photonic", "Geomancy", "Hydromancy", "Atmospheric", "Biosynthesis"],
  Chaos:     ["Combustion", "Corrosion", "Fortune", "Warp", "Void", "Paradox"],
  Arcana:    ["Gravity", "Chronomancy", "Spatial", "Kinetic", "Resonance", "Sygal"],
  Psychic:   ["Telepathic", "Dreamscape", "Illusion", "Emotion", "Manifestation", "Cognition"],
  Holy:      ["Vitality", "Protection", "Blessing", "Aura", "Purification", "Bond"],
  Occult:    ["Blood", "Necromancy", "Umbral", "Pact", "Hex", "Soul"],
  Physical:  ["Might", "Finesse", "Prowess", "Endurance", "Stealth", "Vanguard"],
};

/** Flat list of all subtypes for dropdowns */
export const ALL_SKILL_SUBTYPES = Object.values(SKILL_TYPE_TREE).flat();

/** Given a subtype string, returns its primary type label */
export function getPrimaryType(subtype) {
  for (const [primary, subs] of Object.entries(SKILL_TYPE_TREE)) {
    if (subs.includes(subtype)) return primary;
  }
  return null;
}

/** Max skills a character can equip */
export const MAX_EQUIPPED_SKILLS = 12;

export function newSkill(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    mp_cost: 0,
    exhaustion_cost: 0,       // percent 0–100
    is_passive: false,
    type: ALL_SKILL_SUBTYPES[0] ?? null,  // default to first available subtype
    time_unit: 0,             // 0–12
    base_power: { count: 0, faces: 6 },  // always a dice object; count 0 = no power
    skill_mastery: 0,
    ...overrides,
  };
}

/** Badge label for a skill row */
export function skillBadge(skill) {
  if (skill.is_passive) return "PSV";
  return skill.type ? skill.type.slice(0, 3).toUpperCase() : "ACT";
}

/** Returns sorted mastery map: { [primaryType]: { [subtype]: count } } */
export function buildMasteryMap(skillset) {
  const map = {};
  for (const skill of skillset) {
    if (!skill.type || skill.is_passive) continue;
    const primary = getPrimaryType(skill.type) ?? "Other";
    if (!map[primary]) map[primary] = {};
    map[primary][skill.type] = (map[primary][skill.type] ?? 0) + (skill.skill_mastery ?? 0);
  }
  return map;
}

/**
 * Given a skill, return the tech_stats key to increment when it is used.
 * The skill.type is a subtype string (e.g. "Fire") — we lowercase it to get the key.
 * Returns null for passive skills or skills without a type.
 */
export function techKeyForSkill(skill) {
  if (skill.is_passive || !skill.type) return null;
  return skill.type.toLowerCase();
}

/** Dice bonus for weapon mastery: 1 per 24 points */
export function weaponMasteryBonus(mastery) {
  return Math.floor(mastery / 24);
}

/** Dice bonus for tech stat: 1 per 12 points */
export function techStatBonus(val) {
  return Math.floor(val / 12);
}