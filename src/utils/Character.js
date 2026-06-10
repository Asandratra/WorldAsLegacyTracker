export const EMOJIS = ["⚔️","🛡️","🧙","🏹","🗡️","🔮","💀","🐉","🦅","🐺","🧝","🔥","❄️","⚡","🌑","🍀"];
export const DICE_TYPES = [4, 6, 10, 16, 20, 24, 60, 100];
export const ABILITY_STATS = ["str","dex","con","int","wis","cha"];

export function newEquipped() {
  return { head: null, upper: null, lower: null, accessories: [null, null, null] };
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
    armor: 10,
    gold: 0,
    str: 10, dex: 10, con: 10,
    int: 10, wis: 10, cha: 10,
    notes: "",
    inventory: [],
    equipped: newEquipped(),
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