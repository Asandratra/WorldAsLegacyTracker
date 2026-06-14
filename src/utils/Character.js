export const EMOJIS = ["⚔️","🛡️","🧙","🏹","🗡️","🔮","💀","🐉","🦅","🐺","🧝","🔥","❄️","⚡","🌑","🍀"];
export const DICE_TYPES = [4, 6, 10, 16, 20, 24, 60, 100];

export const BASE_STATS   = ["strength", "spirit", "dexterity", "reaction", "agility", "speed"];
export const SOCIAL_STATS = ["negotiation", "rhetoric", "seduction", "empathy", "intimidation", "humour", "insight", "creativity", "oration", "manipulation", "leadership", "intelligence"];

export const TECH_STAT_TREE = {
  Elemental: ["Thermodynamic", "Photonic", "Geomancy", "Hydromancy", "Atmospheric", "Biosynthesis"],
  Chaos:     ["Combustion", "Corrosion", "Fortune", "Warp", "Void", "Paradox"],
  Arcana:    ["Gravity", "Chronomancy", "Spatial", "Kinetic", "Resonance", "Sygal"],
  Psychic:   ["Telepathic", "Dreamscape", "Illusion", "Emotion", "Manifestation", "Cognition"],
  Holy:      ["Vitality", "Protection", "Blessing", "Aura", "Purification", "Bond"],
  Occult:    ["Blood", "Necromancy", "Umbral", "Pact", "Hex", "Soul"],
  Physical:  ["Might", "Finesse", "Prowess", "Endurance", "Stealth", "Vanguard"],
};

// Flat list of all tech stat keys (lowercased for storage)
export const TECH_STATS = Object.values(TECH_STAT_TREE).flat().map(s => s.toLowerCase());

function defaultTechStats() {
  const obj = {};
  for (const key of TECH_STATS) obj[key] = 0;
  return obj;
}

export function newEquipped() {
  return {
    head: null,
    upper: null,
    lower: null,
    accessories: [null, null, null],
    right_hand: null,
    left_hand: null,
  };
}

export function newCharacter(name = "New Adventurer") {
  return {
    id: crypto.randomUUID(),
    name,
    class: "",
    race: "",
    emoji: "⚔️",
    xp: 0,
    hp: 10,
    maxHp: 10,
    mp: 10,
    maxMp: 10,
    exhaustion: 0,
    armor: 0,
    gold: 0,
    base_stats: {
      strength: 10, spirit: 10, dexterity: 10,
      reaction: 10, agility: 10, speed: 10,
    },
    social_stats: {
      negotiation: 10, rhetoric: 10, seduction: 10,
      empathy: 10,     intimidation: 10, humour: 10,
      insight: 10,     creativity: 10,   oration: 10,
      manipulation: 10, leadership: 10,  intelligence: 10,
    },
    tech_stats: defaultTechStats(),
    weapon_mastery: {
      slash: 0,
      blunt: 0,
      pierce: 0,
    },
    notes: "",
    inventory: [],
    equipped: newEquipped(),
    skillset: [],
    equippedSkills: [],
  };
}

export function modifier(val) {
  const mod = Math.floor((val - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function loadPartyFromStorage() {
  try {
    const saved = localStorage.getItem("dnd-party");
    return saved ? JSON.parse(saved) : [newCharacter("Hero")];
  } catch {
    return [newCharacter("Hero")];
  }
}

export function savePartyToStorage(party) {
  try {
    localStorage.setItem("dnd-party", JSON.stringify(party));
  } catch { /* silent */ }
}

/**
 * Calculate dice bonus from weapon mastery
 * 1 bonus die for every 24 points
 */
export function getWeaponMasteryBonus(mastery) {
  return Math.floor(mastery / 24);
}

/**
 * Calculate dice bonus from tech stats
 * 1 bonus die for every 12 points
 */
export function getTechStatBonus(tech_stat) {
  return Math.floor(tech_stat / 12);
}