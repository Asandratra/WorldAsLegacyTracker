import { useState } from "react";
import { DICE_TYPES } from "../utils/character.js";

export default function DiceRoller({ pool, onPoolChange }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const addDie = (faces) => {
    onPoolChange({ ...pool, [faces]: (pool[faces] || 0) + 1 });
  };

  const removeDie = (faces) => {
    const next = { ...pool };
    if (next[faces] > 1) {
      next[faces]--;
    } else {
      delete next[faces];
    }
    onPoolChange(next);
  };

  const clearPool = () => {
    onPoolChange({});
    setResult(null);
  };

  const rollDice = () => {
    let total = 0;
    Object.entries(pool).forEach(([faces, count]) => {
      const f = parseInt(faces);
      for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * f) + 1;
      }
    });

    const formula = Object.entries(pool)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .map(([f, c]) => `${c}d${f}`)
      .join(" + ");

    setResult(total);
    setHistory(prev => [{ formula, result: total, time: new Date() }, ...prev]);
  };

  const totalDice = Object.values(pool).reduce((sum, c) => sum + c, 0);
  const minVal = totalDice;
  const maxVal = Object.entries(pool).reduce((sum, [faces, count]) => sum + parseInt(faces) * count, 0);
  const hasPool = totalDice > 0;

  const poolFormula = Object.entries(pool)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .map(([f, c]) => `${c}d${f}`)
    .join(" + ");

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="section-title">Dice Roller</div>

      {/* Die type grid */}
      <div className="dice-grid">
        {DICE_TYPES.map(faces => (
          <div key={faces} className="dice-row">
            <div className="dice-label">d{faces}</div>
            <div className="dice-controls">
              <button className="dice-btn" onClick={() => removeDie(faces)} disabled={!pool[faces]} title="Remove one die">−</button>
              <div className="dice-count">{pool[faces] || 0}</div>
              <button className="dice-btn" onClick={() => addDie(faces)} title="Add one die">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Current pool summary */}
      {hasPool && (
        <div className="dice-pool">
          <div className="dice-pool-label">Roll:</div>
          <div className="dice-pool-content">
            <div className="dice-pool-formula">{poolFormula}</div>
            <div className="dice-range">
              <div className="dice-range-item">
                <div className="dice-range-label">Min</div>
                <div className="dice-range-value">{minVal}</div>
              </div>
              <div className="dice-range-item">
                <div className="dice-range-label">Max</div>
                <div className="dice-range-value">{maxVal}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result !== null && <div className="dice-result">🎲 {result}</div>}

      {/* Actions */}
      {hasPool && (
        <div className="btn-row">
          <button className="btn primary" onClick={rollDice}>Roll</button>
          <button className="btn danger" onClick={clearPool}>Clear</button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="dice-history">
          <div className="dice-history-title">History</div>
          <div className="dice-history-list">
            {history.map((entry, idx) => (
              <div key={idx} className="dice-history-item">
                <div style={{ flex: 1 }}>
                  <div className="dice-history-formula">{entry.formula}</div>
                </div>
                <div className="dice-history-value">{entry.result}</div>
                <div className="dice-history-time">
                  {entry.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
          <button className="btn danger" onClick={() => setHistory([])} style={{ marginTop: 8, fontSize: 10 }}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}