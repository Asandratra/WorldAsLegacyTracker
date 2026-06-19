export const MAX_TU = 12;

/**
 * Sort a flat list of action entries by turn order.
 * Each action: { actionId, combatantId, name, tu }
 *
 * Order: TU asc → reaction desc → combatant name asc
 */
export function sortActions(actions, combatants) {
  const byId = Object.fromEntries(combatants.map(c => [c.id, c]));
  return [...actions].sort((a, b) => {
    const ra = byId[a.combatantId]?.reaction ?? 0;
    const rb = byId[b.combatantId]?.reaction ?? 0;
    if (a.tu !== b.tu) return a.tu - b.tu;
    if (ra  !== rb)    return rb - ra;
    const na = byId[a.combatantId]?.name ?? "";
    const nb = byId[b.combatantId]?.name ?? "";
    return na.localeCompare(nb);
  });
}

/** TU already spent by a combatant this turn */
export function spentTU(actions, combatantId) {
  return actions
    .filter(a => a.combatantId === combatantId)
    .reduce((sum, a) => sum + a.tu, 0);
}

/** Remaining TU for a combatant this turn */
export function remainingTU(actions, combatantId) {
  return Math.max(0, MAX_TU - spentTU(actions, combatantId));
}

export function newCombatant(overrides = {}) {
  return {
    id:         crypto.randomUUID(),
    name:       "Combatant",
    reaction:   10,
    isOpponent: false,
    ...overrides,
  };
}

export function combatantFromChar(char) {
  return {
    id:         char.id,
    name:       char.name,
    reaction:   char.base_stats?.reaction ?? 10,
    isOpponent: false,
  };
}