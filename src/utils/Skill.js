/**
 * Skill type taxonomy.
 * Each primary type has an array of subtypes.
 * The subtype is what gets assigned to a skill.
 * Add more subtypes (or primary types) here as needed.
 */
export const SKILL_TYPE_TREE = {
  Elemental: ["Fire", "Water", "Wind", "Earth", "Lightning", "Ice", "Light", "Dark"],
  Physical:  ["Strike", "Slash", "Pierce", "Throw", "Rush"],
  Support:   ["Heal", "Buff", "Debuff", "Shield", "Summon"],
  Arcane:    ["Hex", "Rune", "Void", "Time"],
  Passive:   ["Aura", "Resistance", "Enhancement"],
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
    base_power: null,         // null if passive
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