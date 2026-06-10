import { useState, memo, useCallback } from "react";
import { itemKindLabel } from "../utils/Inventory.js";
import AddItemModal from "./AddItemModal.jsx";

function isSlotOccupied(equipped, slot) {
  if (!equipped) return false;
  if (slot === "accessory") return (equipped.accessories ?? []).every(a => a !== null);
  return equipped[slot] !== null;
}

const ItemRow = memo(function ItemRow({ entry, onIncrement, onDecrement, onDelete, onEquip, slotFull }) {
  const badge = itemKindLabel(entry);

  const subLine = () => {
    if (entry.kind === "weapon") {
      const parts = [];
      if (entry.slash_power > 0) parts.push(`Slash ${entry.slash_power}`);
      if (entry.blunt_power > 0) parts.push(`Blunt ${entry.blunt_power}`);
      if (entry.pierce_power > 0) parts.push(`Pierce ${entry.pierce_power}`);
      return parts.length ? parts.join(" · ") : null;
    }
    if (entry.kind === "equipment" && entry.armor > 0) return `Armor +${entry.armor}`;
    return null;
  };

  const sub = subLine();

  return (
    <div className="inv-item">
      <div className={`inv-kind-badge ${entry.kind}`}>{badge}</div>
      <div className="inv-info">
        <div className="inv-name">{entry.name || "Unnamed"}</div>
        {entry.description && <div className="inv-desc">{entry.description}</div>}
        {sub && <div className="inv-sub">{sub}</div>}
      </div>
      {entry.kind === "equipment" && (
        <button
          className="inv-equip-btn"
          onClick={() => onEquip(entry)}
          disabled={slotFull}
          title={slotFull ? "Remove equipped item first" : `Equip to ${entry.slot}`}
        >
          Equip
        </button>
      )}
      {entry.kind === "item" && (
        <div className="inv-qty-controls">
          <button className="inv-qty-btn remove" onClick={onDecrement}>−</button>
          <div className="inv-qty-num">{entry.quantity}</div>
          <button className="inv-qty-btn" onClick={onIncrement}>+</button>
        </div>
      )}
      <button className="inv-delete-btn" onClick={onDelete} title="Remove">✕</button>
    </div>
  );
});

const InventoryList = memo(function InventoryList({ inventory, equipped, onChange, onEquip }) {
  const [modalOpen, setModalOpen] = useState(false);

  const addEntry = useCallback((entry) => {
    onChange([...inventory, entry]);
  }, [inventory, onChange]);

  const removeEntry = useCallback((id) => {
    onChange(inventory.filter(e => e.id !== id));
  }, [inventory, onChange]);

  const incrementQty = useCallback((id, delta) => {
    onChange(
      inventory.map(e => {
        if (e.id !== id || e.kind !== "item") return e;
        const next = e.quantity + delta;
        return next <= 0 ? null : { ...e, quantity: next };
      }).filter(Boolean)
    );
  }, [inventory, onChange]);

  return (
    <div className="card">
      <div className="inv-header">
        <div className="section-title" style={{ marginBottom: 0 }}>Inventory</div>
        <button className="inv-add-btn" onClick={() => setModalOpen(true)}>+ Add Item</button>
      </div>

      <div className="inv-list">
        {inventory.length === 0 ? (
          <div className="inv-empty">No items yet. Add your first.</div>
        ) : (
          inventory.map(entry => (
            <ItemRow
              key={entry.id}
              entry={entry}
              equipped={equipped}
              slotFull={entry.kind === "equipment" && isSlotOccupied(equipped, entry.slot)}
              onIncrement={() => incrementQty(entry.id, 1)}
              onDecrement={() => incrementQty(entry.id, -1)}
              onDelete={() => removeEntry(entry.id)}
              onEquip={onEquip}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <AddItemModal onAdd={addEntry} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
});

export default InventoryList;