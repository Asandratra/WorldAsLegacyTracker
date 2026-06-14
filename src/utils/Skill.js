/**
 * Skill type taxonomy.
 * Each primary type has an array of subtypes.
 * The subtype is what gets assigned to a skill.
 * Add more subtypes (or primary types) here as needed.
 */
export const SKILL_TYPE_TREE = {
  Elemental: ["Thermodynamic", "Photonic", "Geomancy", "Hydromancy", "Atmostpheric", "Biosynthesis"],
  Chaos: ["Combustion", "Corrosion", "Fortune", "Warp", "Void", "Paradox"],
  Arcana: ["Gravity", "Chronomancy", "Spatial", "Kinetic", "Resonance", "Sygal"],
  Psychic: ["Telepathic", "Dreamscape", "Illusion", "Emotion", "Manifestation", "Cognition"],
  Holy: ["Vitality", "Protection", "Blessing", "Aura", "Purification", "Bond"],
  Occult: ["Blood", "Necromancy", "Umbral", "Pact", "Hex", "Soul"],
  Physical: ["Might", "Finesse", "Prowess", "Endurance", "Stealth", "Vanguard"]
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
    type: null,               // subtype string, null if passive has no type
    time_unit: 0,             // 0–12
    base_power: {count:0, faces:6},           // empty string, or dice notation like "2d6" or "3+1d4"
    skill_mastery: 0,
    ...overrides,
  };
}

/** Badge label for a skill row */
export function skillBadge(skill) {
  if (skill.is_passive) return "PSV";
  return skill.type ? skill.type.slice(0, 3).toUpperCase() : "ACT";
}

/**
 * Validate base_power format (dice notation)
 * Examples: "2d6", "1d8+2", "3d4+1", "1d20-2"
 * Returns true if valid or empty (empty is allowed)
 */
export function isValidBasePower(str) {
  str=`${str.count}d${str.faces}`
  if (!str || str.trim() === "") return true; // Empty is allowed
  // Regex: matches patterns like "2d6", "2d6+3", "2d6-1", etc.
  const diceRegex = /^(\d+d\d+)(\s*[+-]\s*\d+)?(\s*\+\s*\d+d\d+)*$/i;
  return diceRegex.test(str.trim());
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