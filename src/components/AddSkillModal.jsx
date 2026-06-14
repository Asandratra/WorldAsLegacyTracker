import { useState } from "react";
import { newSkill, SKILL_TYPE_TREE, ALL_SKILL_SUBTYPES, isValidBasePower } from "../utils/Skill.js";
import DiceInput from "./DiceInput.jsx";

export default function AddSkillModal({ onAdd, onClose }) {
  const [form, setForm] = useState(newSkill());
  const [errors, setErrors] = useState({});

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const setPassive = (val) => {
    setForm(f => ({
      ...f,
      is_passive: val,
      type: val ? null : (f.type ?? ALL_SKILL_SUBTYPES[0]),
      time_unit: val ? 0 : (f.time_unit ?? 0),
      base_power: val ? "" : (f.base_power ?? ""),
    }));
    setErrors({});
  };

  const handleAdd = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.is_passive && !isValidBasePower(form.base_power)) {
      newErrors.base_power = "Invalid dice notation (e.g., 2d6, 1d8+2)";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onAdd({ ...form, skill_mastery: 0 });
    onClose();
  };

  // Group subtypes by primary for the <optgroup> select
  const typeOptions = Object.entries(SKILL_TYPE_TREE).map(([primary, subs]) => (
    <optgroup key={primary} label={primary}>
      {subs.map(s => <option key={s} value={s}>{s}</option>)}
    </optgroup>
  ));

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-title">Add Skill</div>

        {/* Passive toggle */}
        <div className="modal-field skill-passive-row">
          <label className="skill-toggle-label">
            <input
              type="checkbox"
              checked={form.is_passive}
              onChange={e => setPassive(e.target.checked)}
            />
            <span>Passive skill</span>
          </label>
        </div>

        {/* Name */}
        <div className="modal-field">
          <div className="label">Name {errors.name && <span style={{ color: 'var(--red)' }}>*</span>}</div>
          <input 
            type="text" 
            placeholder="Fireball…" 
            value={form.name} 
            onChange={e => { set("name", e.target.value); if (errors.name) setErrors(errs => ({ ...errs, name: '' })); }}
          />
          {errors.name && <div style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px' }}>{errors.name}</div>}
        </div>

        {/* Description */}
        <div className="modal-field">
          <div className="label">Description &amp; Effect</div>
          <textarea
            placeholder="Deals base_power × 1.5 fire damage to all enemies in range…"
            value={form.description}
            onChange={e => set("description", e.target.value)}
            style={{ minHeight: 64 }}
          />
        </div>

        {/* Type — hidden for passive */}
        {!form.is_passive && (
          <div className="modal-field">
            <div className="label">Type</div>
            <select
              value={form.type ?? ALL_SKILL_SUBTYPES[0]}
              onChange={e => set("type", e.target.value)}
            >
              {typeOptions}
            </select>
          </div>
        )}

        {/* Costs row */}
        <div className="modal-row">
          <div className="modal-field">
            <div className="label">MP Cost</div>
            <input type="number" min={0} value={form.mp_cost} onChange={e => set("mp_cost", parseInt(e.target.value) || 0)} />
          </div>
          <div className="modal-field">
            <div className="label">Exhaustion %</div>
            <input type="number" min={0} max={100} value={form.exhaustion_cost} onChange={e => set("exhaustion_cost", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} />
          </div>
        </div>

        {/* Active-only fields */}
        {!form.is_passive && (
          <div className="modal-row">
            <div className="modal-field">
              <div className="label">Base Power {errors.base_power && <span style={{ color: 'var(--red)' }}>*</span>}</div>
              <DiceInput
                value={form.base_power}
                onChange={v => set("base_power", v)}
              />
              {/* <input
                type="text"
                placeholder="e.g., 2d6, 1d8+2"
                value={form.base_power}
                onChange={e => { set("base_power", e.target.value); if (errors.base_power) setErrors(errs => ({ ...errs, base_power: '' })); }}
              /> */}
              {errors.base_power && <div style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px' }}>{errors.base_power}</div>}
            </div>
            <div className="modal-field">
              <div className="label">Time Units (0–12)</div>
              <input type="number" min={0} max={12} value={form.time_unit} onChange={e => set("time_unit", Math.min(12, Math.max(0, parseInt(e.target.value) || 0)))} />
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn primary" onClick={() => {
            set("base_power", `${form.base_power.count}d${form.base_power.faces}`)
            handleAdd();
          }}>Add Skill</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}