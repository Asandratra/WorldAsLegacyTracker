export const EMOJIS = ["⚔️","🛡️","🧙","🏹","🗡️","🔮","💀","🐉","🦅","🐺","🧝","🔥","❄️","⚡","🌑","🍀"];
export const DICE_TYPES = [4, 6, 10, 16, 20, 24, 60, 100];

export const BASE_STATS = ["strength", "spirit", "dexterity", "reaction", "agility", "speed"];
export const SOCIAL_STATS = ["negotiation", "rhetoric", "seduction", "empathy", "intimidation", "humour", "insight", "creativity", "oration", "manipulation", "leadership", "intelligence"];

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
      strength: 10,
      spirit: 10,
      dexterity: 10,
      reaction: 10,
      agility: 10,
      speed: 10,
    },
    social_stats: {
      negotiation: 10,
      rhetoric: 10,
      seduction: 10,
      empathy: 10,
      intimidation: 10,
      humour: 10,
      insight: 10,
      creativity: 10,
      oration: 10,
      manipulation: 10,
      leadership: 10,
      intelligence: 10,
    },
    notes: "",
    inventory: [],
    equipped: newEquipped(),
    skillset: [],             // all known skills (the "learnt" pool)
    equippedSkills: [],       // up to 12 skill ids
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