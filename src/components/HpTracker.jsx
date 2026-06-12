import { useState } from "react";

export default function HpTracker({ hp, maxHp, armor, onUpdate }) {
  const [deltaHp, setDeltaHp] = useState("");

  const hpPct = maxHp > 0 ? Math.min(100, (hp / maxHp) * 100) : 0;

  const applyHp = (sign) => {
    const delta = parseInt(deltaHp) || 1;
    const newHp = Math.min(maxHp, Math.max(0, hp + sign * delta));
    onUpdate({ hp: newHp });
    setDeltaHp("");
  };

  return (
    <div className="card">
      <div className="section-title">Vitals</div>

      {/* HP bar */}
      <div className="hp-row">
        <div className="hp-label" style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "var(--text-dim)", letterSpacing: 1 }}>
          HP
        </div>
        <div className="hp-bar-wrap">
          <div className="hp-bar-fill" style={{ width: `${hpPct}%` }} />
        </div>
        <div className="hp-nums">
          <input
            type="number"
            min={0}
            max={maxHp}
            value={hp}
            onChange={e => onUpdate({ hp: Math.min(maxHp, Math.max(0, parseInt(e.target.value) || 0)) })}
          />
          <span className="hp-sep">/</span>
          <input
            type="number"
            min={1}
            value={maxHp}
            onChange={e => onUpdate({ maxHp: Math.max(1, parseInt(e.target.value) || 1) })}
          />
        </div>
      </div>

      {/* Armor Class */}
      <div className="field-row">
        <div className="field-group" style={{ maxWidth: 120 }}>
          <div className="label">Armor</div>
          <input
            type="number"
            min={0}
            value={armor}
            onChange={e => onUpdate({ armor: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <hr className="divider" />

      {/* Quick damage / heal */}
      <div className="delta-row">
        <span className="delta-label">Quick:</span>
        <input
          type="number"
          min={1}
          placeholder="amt"
          value={deltaHp}
          onChange={e => setDeltaHp(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") applyHp(1); }}
        />
        <div className="hp-btns">
          <button className="hp-btn heal" onClick={() => applyHp(1)} title="Heal">＋</button>
          <button className="hp-btn dmg"  onClick={() => applyHp(-1)} title="Damage">－</button>
        </div>
      </div>
    </div>
  );
}