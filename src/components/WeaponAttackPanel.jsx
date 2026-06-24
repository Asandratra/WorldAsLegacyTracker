import { memo, useCallback } from "react";
import { getWeaponMasteryBonus } from "../utils/Character.js";

const AttackCell = memo(function AttackCell({ attackType, mastery, onAttack }) {
  const bonus = getWeaponMasteryBonus(mastery);
  const nextMilestone = Math.ceil((mastery + 1) / 15) * 15;
  const progress = mastery % 15;

  return (
    <div className="attack-cell">
      <div className="attack-cell-top">
        <div className="attack-type-label">{attackType}</div>
        {mastery > 0 && (
          <span className="mastery-badge">M{mastery}</span>
        )}
      </div>

      <div className="attack-cell-mastery">
        <div className="mastery-bar-container">
          <div className="mastery-bar-fill" style={{ width: `${(progress / 15) * 100}%` }}></div>
        </div>
        <div className="mastery-text">
          {progress}/15 {bonus > 0 && `(D+${bonus})`}
        </div>
      </div>

      <button
        className="attack-btn"
        onClick={onAttack}
        title={`Attack with ${attackType}. Mastery: ${mastery} → ${mastery + 1}${bonus > 0 ? ` (+${bonus} dice bonus)` : ''}`}
      >
        {attackType} Attack
      </button>
    </div>
  );
});

const AttackListRow = memo(function AttackListRow({ attackType, mastery, onAttack }) {
  const bonus = getWeaponMasteryBonus(mastery);
  const progress = mastery % 15;

  return (
    <div className="attack-list-row">
      <div className="attack-info">
        <div className="attack-name">{attackType}</div>
        <div className="attack-mastery-text">
          Mastery: {mastery} ({progress}/15)
          {bonus > 0 && ` · +${bonus} dice`}
        </div>
      </div>
      <button className="attack-btn" onClick={onAttack}>Attack</button>
    </div>
  );
});

export default function WeaponAttackPanel({
  equipped, weapon_mastery,
  onCharUpdate,
}) {
  const safe = weapon_mastery ?? { slash: 0, blunt: 0, pierce: 0 };

  const handleAttack = useCallback((attackType) => {
    onCharUpdate({
      weapon_mastery: {
        ...safe,
        [attackType]: (safe[attackType] ?? 0) + 1,
      },
    });
  }, [safe, onCharUpdate]);

  // Check if there are weapons equipped
  const hasWeapons = equipped?.right_hand || equipped?.left_hand;

  if (!hasWeapons) {
    return (
      <div className="card attack-panel-card">
        <div className="section-title">Combat</div>
        <div className="inv-empty">No weapons equipped.</div>
      </div>
    );
  }

  // Determine which attack types are available based on equipped weapons
  const rightHand = equipped?.right_hand;
  const leftHand = equipped?.left_hand;
  const isDualHeld = rightHand && leftHand && rightHand.id === leftHand.id;
  
  const availableAttacks = [];
  
  if (rightHand) {
    if (rightHand.slash_power?.count > 0) availableAttacks.push({ type: 'slash', weapon: 'Right' });
    if (rightHand.blunt_power?.count > 0) availableAttacks.push({ type: 'blunt', weapon: 'Right' });
    if (rightHand.pierce_power?.count > 0) availableAttacks.push({ type: 'pierce', weapon: 'Right' });
  }
  
  if (leftHand && !isDualHeld) {
    if (leftHand.slash_power?.count > 0) availableAttacks.push({ type: 'slash', weapon: 'Left' });
    if (leftHand.blunt_power?.count > 0) availableAttacks.push({ type: 'blunt', weapon: 'Left' });
    if (leftHand.pierce_power?.count > 0) availableAttacks.push({ type: 'pierce', weapon: 'Left' });
  }

  // Pad to 6 cells for desktop grid
  const cells = availableAttacks.slice(0, 6);
  while (cells.length < 6) cells.push(null);

  return (
    <div className="card attack-panel-card">
      <div className="section-title">Combat</div>

      {/* Desktop grid */}
      <div className="attack-grid-6">
        {cells.map((cell, i) =>
          cell ? (
            <AttackCell
              key={`${cell.type}-${cell.weapon}`}
              attackType={`${cell.type.charAt(0).toUpperCase() + cell.type.slice(1)} (${cell.weapon})`}
              mastery={safe[cell.type] ?? 0}
              onAttack={() => handleAttack(cell.type)}
            />
          ) : (
            <div key={`empty-${i}`} className="attack-cell empty">
              <div className="attack-cell-empty-label">—</div>
            </div>
          )
        )}
      </div>

      {/* Mobile fallback list */}
      <div className="attack-list-mobile">
        {availableAttacks.length === 0 ? (
          <div className="inv-empty">No attacks available.</div>
        ) : (
          availableAttacks.map(cell => (
            <AttackListRow
              key={`${cell.type}-${cell.weapon}`}
              attackType={`${cell.type.charAt(0).toUpperCase() + cell.type.slice(1)} (${cell.weapon})`}
              mastery={safe[cell.type] ?? 0}
              onAttack={() => handleAttack(cell.type)}
            />
          ))
        )}
      </div>
    </div>
  );
}
