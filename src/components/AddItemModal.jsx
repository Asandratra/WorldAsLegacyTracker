import { useState } from "react";
import {
  ITEM_TYPES, EQUIPMENT_SLOTS, WEAPON_HAND_TYPES,
  createBlankEntry, newPower,
} from "../utils/Inventory.js";
import DiceInput from "./DiceInput.jsx";
import StatModifierEditor from "./StatModifierEditor.jsx";

const KIND_LABELS = { item: "Item", equipment: "Equipment", weapon: "Weapon" };

const POWER_FIELDS = [
  { key: "slash_power",  label: "Slash" },
  { key: "blunt_power",  label: "Blunt" },
  { key: "pierce_power", label: "Pierce" },
  { key: "block_power",  label: "Block" },
];

export default function AddItemModal({ onAdd, onClose }) {
  const [kind, setKind] = useState("item");
  const [form, setForm] = useState(createBlankEntry("item"));

  const switchKind = (k) => { setKind(k); setForm(createBlankEntry(k)); };
  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-title">Add to Inventory</div>

        {/* Kind tabs */}
        <div className="modal-kind-tabs">
          {ITEM_TYPES.map(k => (
            <button key={k} className={`modal-kind-tab ${kind === k ? "active" : ""}`} onClick={() => switchKind(k)}>
              {KIND_LABELS[k]}
            </button>
          ))}
        </div>

        {/* Name */}
        <div className="modal-field">
          <div className="label">Name</div>
          <input type="text" placeholder="Iron Sword…" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>

        {/* Description */}
        <div className="modal-field">
          <div className="label">{kind === "equipment" ? "Effect / Notes" : "Description"}</div>
          <input type="text" placeholder={kind === "equipment" ? "+2 STR while equipped…" : "A rusty blade…"}
            value={form.description} onChange={e => set("description", e.target.value)} />
        </div>

        {/* Item */}
        {kind === "item" && (
          <div className="modal-field">
            <div className="label">Quantity</div>
            <input type="number" min={1} value={form.quantity}
              onChange={e => set("quantity", Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        )}

        {/* Equipment */}
        {kind === "equipment" && (
          <>
            <div className="modal-row">
              <div className="modal-field">
                <div className="label">Slot</div>
                <select value={form.slot} onChange={e => set("slot", e.target.value)}>
                  {EQUIPMENT_SLOTS.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <StatModifierEditor
              modifiers={form.stat_modifiers ?? {}}
              onChange={m => set("stat_modifiers", m)}
            />
          </>
        )}

        {/* Weapon */}
        {kind === "weapon" && (
          <>
            <div className="modal-field">
              <div className="label">Hand Type</div>
              <select value={form.hand_type} onChange={e => set("hand_type", e.target.value)}>
                {WEAPON_HAND_TYPES.map(t => (
                  <option key={t} value={t}>{t === "single_hand" ? "Single Hand" : "Dual Hand"}</option>
                ))}
              </select>
            </div>

            {/* Power fields — each is a DiceInput */}
            <div className="modal-field">
              <div className="label" style={{ marginBottom: 8 }}>Powers</div>
              <div className="power-fields-grid">
                {POWER_FIELDS.map(({ key, label }) => (
                  <div key={key} className="power-field-row">
                    <span className="power-field-label">{label}</span>
                    <DiceInput
                      value={form[key] ?? newPower()}
                      onChange={v => set(key, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <StatModifierEditor
              modifiers={form.stat_modifiers ?? {}}
              onChange={m => set("stat_modifiers", m)}
            />
          </>
        )}

        <div className="modal-footer">
          <button className="btn primary" onClick={handleAdd}>Add</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}