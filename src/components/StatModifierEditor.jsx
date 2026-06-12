import { useState, memo } from "react";
import { MODIFIABLE_VITALS, BASE_STAT_KEYS, SOCIAL_STAT_KEYS } from "../utils/Inventory.js";

const STAT_GROUPS = [
  { label: "Vitals",       keys: MODIFIABLE_VITALS },
  { label: "Base Stats",   keys: BASE_STAT_KEYS },
  { label: "Social Stats", keys: SOCIAL_STAT_KEYS },
];

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/**
 * modifiers: { [key]: number }   (sparse — only non-zero stored)
 * onChange: (modifiers) => void
 */
const StatModifierEditor = memo(function StatModifierEditor({ modifiers = {}, onChange }) {
  const [open, setOpen] = useState(false);

  const set = (key, raw) => {
    const val = parseInt(raw) || 0;
    const next = { ...modifiers };
    if (val === 0) delete next[key];
    else next[key] = val;
    onChange(next);
  };

  const activeCount = Object.values(modifiers).filter(v => v !== 0).length;

  return (
    <div className="stat-mod-editor">
      <button
        type="button"
        className="stat-mod-toggle"
        onClick={() => setOpen(o => !o)}
      >
        <span>Stat Modifiers</span>
        {activeCount > 0 && <span className="stat-mod-count">{activeCount} active</span>}
        <span className="stat-mod-chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="stat-mod-body">
          {STAT_GROUPS.map(group => (
            <div key={group.label} className="stat-mod-group">
              <div className="stat-mod-group-label">{group.label}</div>
              <div className="stat-mod-grid">
                {group.keys.map(key => {
                  const val = modifiers[key] ?? 0;
                  return (
                    <div key={key} className="stat-mod-row">
                      <label className="stat-mod-key">{capitalize(key.replace("_", " "))}</label>
                      <div className="stat-mod-controls">
                        <button className="stat-mod-btn" onClick={() => set(key, val - 1)}>−</button>
                        <input
                          className={`stat-mod-input ${val > 0 ? "positive" : val < 0 ? "negative" : ""}`}
                          type="number"
                          value={val}
                          onChange={e => set(key, e.target.value)}
                        />
                        <button className="stat-mod-btn" onClick={() => set(key, val + 1)}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default StatModifierEditor;