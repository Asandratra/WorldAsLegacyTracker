import { useState, memo } from "react";

const HpTracker = memo(function HpTracker({ hp, maxHp, armor, onUpdate }) {
  const [deltaHp, setDeltaHp] = useState("");

  // ── Bar geometry ───────────────────────────────────────────────────────────
  // Total visual pool = maxHp + base armor value (armor is shown as extra left segment)
  const totalPool    = maxHp + armor;
  const armorWidthPct = totalPool > 0 ? (armor  / totalPool) * 100 : 0;
  const hpWidthPct    = totalPool > 0 ? (hp     / totalPool) * 100 : 0;

  // ── Damage: armor absorbs first, remainder goes to HP ─────────────────────
  const applyDamage = (amount) => {
    if (amount <= 0) return;
    const armorAbsorb = Math.min(armor, amount);
    const hpDamage    = amount - armorAbsorb;
    onUpdate({
      armor: armor - armorAbsorb,
      hp:    Math.max(0, hp - hpDamage),
    });
    setDeltaHp("");
  };

  // ── Heal: restores HP only, never armor ───────────────────────────────────
  const applyHeal = (amount) => {
    if (amount <= 0) return;
    onUpdate({ hp: Math.min(maxHp, hp + amount) });
    setDeltaHp("");
  };

  const handleQuick = (isHeal) => {
    const delta = parseInt(deltaHp) || 1;
    isHeal ? applyHeal(delta) : applyDamage(delta);
  };

  return (
    <div className="card">
      <div className="section-title">Vitals</div>

      {/* Combined HP + Armor bar */}
      <div className="hp-row" style={{ marginBottom: 6 }}>
        <div className="vitals-bar-label">HP</div>

        <div className="combined-bar-track">
          {/* HP fill — grows from the left */}
          <div
            className="combined-bar-hp"
            style={{ width: `${hpWidthPct}%` }}
            title={`HP: ${hp} / ${maxHp}`}
          />
          {/* Armor fill — sits directly after HP */}
          {armor > 0 && (
            <div
              className="combined-bar-armor"
              style={{ width: `${armorWidthPct}%` }}
              title={`Armor: ${armor}`}
            />
          )}
          {/* Divider tick between HP zone and Armor zone */}
          {armor > 0 && (
            <div
              className="combined-bar-divider"
              style={{ left: `${(maxHp / totalPool) * 100}%` }}
            />
          )}
        </div>

        <div className="hp-nums">
          <input
            type="number" min={0} max={maxHp} value={hp}
            onChange={e => onUpdate({ hp: Math.min(maxHp, Math.max(0, parseInt(e.target.value) || 0)) })}
          />
          <span className="hp-sep">/</span>
          <span className="vital-effective">{maxHp}</span>
          {armor > 0 && (
            <span className="armor-badge" title="Armor — absorbs damage before HP">
              +{armor}
            </span>
          )}
        </div>
      </div>

      {/* Rule reminder */}
      {armor > 0 && (
        <div className="armor-note">⚔ Damage hits armor first · ✦ Heals restore HP only</div>
      )}

      {/* Quick damage / heal */}
      <div className="delta-row">
        <span className="delta-label">Quick:</span>
        <input
          type="number" min={1} placeholder="amt" value={deltaHp}
          onChange={e => setDeltaHp(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleQuick(false); }}
        />
        <div className="hp-btns">
          <button className="hp-btn heal" onClick={() => handleQuick(true)}  title="Heal HP">＋</button>
          <button className="hp-btn dmg"  onClick={() => handleQuick(false)} title="Damage (armor first)">－</button>
        </div>
      </div>

      <hr className="divider" />

      {/* Base value editors */}
      <div className="vital-base-row">
        <span className="vital-base-label">Max HP</span>
        <div className="vital-base-controls">
          <button className="vital-base-edit" onClick={() => onUpdate({ maxHp: Math.max(1, maxHp - 1) })}>−</button>
          <span className="vital-base-val">{maxHp}</span>
          <button className="vital-base-edit" onClick={() => onUpdate({ maxHp: maxHp + 1 })}>+</button>
        </div>
      </div>

      <div className="vital-base-row">
        <span className="vital-base-label">Armor</span>
        <div className="vital-base-controls">
          <button className="vital-base-edit" onClick={() => onUpdate({ armor: Math.max(0, armor - 1) })}>−</button>
          <span className="vital-base-val">{armor}</span>
          <button className="vital-base-edit" onClick={() => onUpdate({ armor: armor + 1 })}>+</button>
        </div>
      </div>
    </div>
  );
});

export default HpTracker;