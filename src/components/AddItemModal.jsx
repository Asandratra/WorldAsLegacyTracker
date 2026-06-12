import { useState } from "react";
import {
  ITEM_TYPES, EQUIPMENT_SLOTS, WEAPON_HAND_TYPES,
  createBlankEntry
} from "../utils/Inventory.js";

const KIND_LABELS = { item: "Item", equipment: "Equipment", weapon: "Weapon" };

export default function AddItemModal({ onAdd, onClose }) {
  const [kind, setKind] = useState("item");
  const [form, setForm] = useState(createBlankEntry("item"));

  const switchKind = (k) => {
    setKind(k);
    setForm(createBlankEntry(k));
  };

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
            <button
              key={k}
              className={`modal-kind-tab ${kind === k ? "active" : ""}`}
              onClick={() => switchKind(k)}
            >
              {KIND_LABELS[k]}
            </button>
          ))}
        </div>

        {/* Shared: Name */}
        <div className="modal-field">
          <div className="label">Name</div>
          <input type="text" placeholder="Iron Sword…" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>

        {/* Shared: Description */}
        <div className="modal-field">
          <div className="label">Description</div>
          <input type="text" placeholder={kind === "equipment" ? "+2 STR while equipped…" : "A rusty blade…"} value={form.description} onChange={e => set("description", e.target.value)} />
        </div>

        {/* Item-specific */}
        {kind === "item" && (
          <div className="modal-field">
            <div className="label">Quantity</div>
            <input type="number" min={1} value={form.quantity} onChange={e => set("quantity", Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        )}

        {/* Equipment-specific */}
        {kind === "equipment" && (
          <div className="modal-row">
            <div className="modal-field">
              <div className="label">Armor Bonus</div>
              <input type="number" min={0} value={form.armor} onChange={e => set("armor", parseInt(e.target.value) || 0)} />
            </div>
            <div className="modal-field">
              <div className="label">Slot</div>
              <select value={form.slot} onChange={e => set("slot", e.target.value)}>
                {EQUIPMENT_SLOTS.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Weapon-specific */}
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
            <div className="modal-row">
              <div className="modal-field">
                <div className="label">Slash</div>
                <input
                  type="text"
                  placeholder="e.g., 2d6, 1d8+2"
                  value={form.slash_power}
                  onChange={e => set("slash_power", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <div className="label">Blunt</div>
                <input
                  type="text"
                  placeholder="e.g., 2d6, 1d8+2"
                  value={form.blunt_power}
                  onChange={e => set("blunt_power", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <div className="label">Pierce</div>
                <input
                  type="text"
                  placeholder="e.g., 2d6, 1d8+2"
                  value={form.pierce_power}
                  onChange={e => set("pierce_power", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <div className="label">Block</div>
                <input
                  type="text"
                  placeholder="e.g., 1d6, 2+1d4"
                  value={form.block_power}
                  onChange={e => set("block_power", e.target.value)}
                />
              </div>
            </div>
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