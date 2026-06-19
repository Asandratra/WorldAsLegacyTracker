import { useState, useCallback, useRef, memo } from "react";
import { sortActions, spentTU, remainingTU, MAX_TU, newCombatant, combatantFromChar } from "../utils/Encounter.js";

/* ─── Add Action Modal ───────────────────────────────────────────────────── */
function AddActionModal({ combatant, tuLeft, onAdd, onClose }) {
  const [actionName, setActionName] = useState("");
  const [tu, setTu] = useState(Math.min(1, tuLeft));

  const clampedTu = Math.min(Math.max(0, tu), tuLeft);

  const handleAdd = () => {
    if (!actionName.trim()) return;
    onAdd({ actionId: crypto.randomUUID(), combatantId: combatant.id, name: actionName.trim(), tu: clampedTu });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 340 }}>
        <div className="modal-title">{combatant.name}</div>
        <div className="enc-tu-budget-row">
          <span className="enc-tu-budget-label">TU remaining this turn</span>
          <span className="enc-tu-budget-val">{tuLeft} / {MAX_TU}</span>
        </div>
        <div className="modal-field">
          <div className="label">Action</div>
          <input
            type="text" placeholder="Attack · Defend · Spell…"
            value={actionName} onChange={e => setActionName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
            autoFocus
          />
        </div>
        <div className="modal-field">
          <div className="label">Time Units (0 – {tuLeft})</div>
          <input
            type="number" min={0} max={tuLeft} value={tu}
            onChange={e => setTu(Math.min(tuLeft, Math.max(0, parseInt(e.target.value) || 0)))}
          />
        </div>
        <div className="modal-footer">
          <button className="btn primary" onClick={handleAdd}>Confirm</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Edit Combatant Modal ───────────────────────────────────────────────── */
function EditCombatantModal({ initial, onSave, onClose }) {
  const [name, setName]         = useState(initial?.name     ?? "");
  const [reaction, setReaction] = useState(initial?.reaction ?? 10);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...initial, name: name.trim(), reaction: Math.max(0, reaction) });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 320 }}>
        <div className="modal-title">{initial?.id ? "Edit Combatant" : "Add Combatant"}</div>
        <div className="modal-field">
          <div className="label">Name</div>
          <input type="text" placeholder="Goblin Archer…" value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSave(); }} autoFocus />
        </div>
        <div className="modal-field">
          <div className="label">Reaction</div>
          <input type="number" min={0} value={reaction}
            onChange={e => setReaction(parseInt(e.target.value) || 0)} />
        </div>
        <div className="modal-footer">
          <button className="btn primary" onClick={handleSave}>Save</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ─── TU Bar ─────────────────────────────────────────────────────────────── */
function TuBar({ spent }) {
  const pct = Math.min(100, (spent / MAX_TU) * 100);
  const full = spent >= MAX_TU;
  return (
    <div className="enc-tu-bar-wrap" title={`${spent} / ${MAX_TU} TU used`}>
      <div
        className="enc-tu-bar-fill"
        style={{
          width: `${pct}%`,
          background: full
            ? "linear-gradient(90deg,#6a0000,#aa2020)"
            : "linear-gradient(90deg,#3a6a28,#60a040)",
        }}
      />
    </div>
  );
}

/* ─── Combatant Card ─────────────────────────────────────────────────────── */
const CombatantCard = memo(function CombatantCard({
  combatant, combatantActions, onAddAction, onRemoveAction, onRemove, onEdit,
}) {
  const spent  = combatantActions.reduce((s, a) => s + a.tu, 0);
  const left   = Math.max(0, MAX_TU - spent);
  const isFull = left === 0;

  return (
    <div className={`enc-combatant-card ${combatantActions.length > 0 ? "has-action" : ""}`}>
      {/* Header row */}
      <div className="enc-combatant-header">
        <div className="enc-combatant-info" onClick={onEdit}>
          <div className="enc-combatant-name">{combatant.name}</div>
          <div className="enc-combatant-react">RCT {combatant.reaction}</div>
        </div>
        <div className="enc-combatant-btns">
          <span className="enc-tu-counter">{left > 0 ? `${left}tu left` : "Full"}</span>
          {!isFull && (
            <button className="enc-add-action-btn" onClick={onAddAction}>+ Action</button>
          )}
          <button className="enc-remove-btn" onClick={onRemove} title="Remove combatant">✕</button>
        </div>
      </div>

      {/* TU bar */}
      <TuBar spent={spent} />

      {/* Submitted actions list */}
      {combatantActions.length > 0 && (
        <div className="enc-action-list">
          {combatantActions.map(a => (
            <div key={a.actionId} className="enc-action-entry">
              <span className="enc-action-tu-badge">{a.tu}tu</span>
              <span className="enc-action-entry-name">{a.name}</span>
              <button
                className="enc-action-remove"
                onClick={() => onRemoveAction(a.actionId)}
                title="Remove this action"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

/* ─── Combatant Panel ────────────────────────────────────────────────────── */
function CombatantPanel({ title, combatants, actions, isOpponent,
  onAdd, onImport, onRemove, onEdit, onAddAction, onRemoveAction }) {

  const fileRef = useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        onImport(Array.isArray(data) ? data : [data], isOpponent);
      } catch { alert("Invalid JSON file."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="enc-panel">
      <div className="enc-panel-header">
        <div className={`enc-panel-title ${isOpponent ? "opponent" : "party"}`}>{title}</div>
        <div className="enc-panel-actions">
          <button className="enc-panel-btn" onClick={onAdd}>+ Add</button>
          <button className="enc-panel-btn" onClick={() => fileRef.current.click()}>↑ Import</button>
        </div>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
      </div>

      <div className="enc-combatant-list">
        {combatants.length === 0 ? (
          <div className="enc-empty">{isOpponent ? "No opponents yet." : "No party members."}</div>
        ) : (
          combatants.map(c => {
            const combatantActions = actions.filter(a => a.combatantId === c.id);
            return (
              <CombatantCard
                key={c.id}
                combatant={c}
                combatantActions={combatantActions}
                onAddAction={() => onAddAction(c)}
                onRemoveAction={onRemoveAction}
                onRemove={() => onRemove(c.id)}
                onEdit={() => onEdit(c)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

/* ─── Order Card ─────────────────────────────────────────────────────────── */
function OrderCard({ rank, action, combatant }) {
  const isOpponent = combatant?.isOpponent;
  return (
    <div className={`enc-order-card ${isOpponent ? "opponent" : "party"}`}>
      <div className="enc-order-rank">#{rank}</div>
      <div className="enc-order-body">
        <div className="enc-order-who">{combatant?.name ?? "?"}</div>
        <div className="enc-order-what">{action.name}</div>
      </div>
      <div className="enc-order-meta">
        <span className="enc-order-tu">{action.tu}tu</span>
        <span className="enc-order-react">RCT {combatant?.reaction ?? "?"}</span>
      </div>
    </div>
  );
}

/* ─── Main Encounter Page ────────────────────────────────────────────────── */
export default function EncounterPage({ onExit }) {
  const [party,     setParty]     = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [actions,   setActions]   = useState([]);   // all actions this turn (multi per combatant)
  const [turn,      setTurn]      = useState(1);

  // Modal state
  const [actionTarget,   setActionTarget]   = useState(null);
  const [editTarget,     setEditTarget]     = useState(null);
  const [isEditOpponent, setIsEditOpponent] = useState(false);
  const [addOpponent,    setAddOpponent]    = useState(false);
  const [addParty,       setAddParty]       = useState(false);

  const allCombatants = [...party, ...opponents];
  const sorted        = sortActions(actions, allCombatants);

  /* ── Import (works for both party and opponents) ────────────────────────── */
  const handleImport = useCallback((chars, isOpponent) => {
    const fresh = chars.map(c => ({ ...combatantFromChar(c), isOpponent }));
    if (isOpponent) {
      setOpponents(prev => {
        const ids = new Set(prev.map(x => x.id));
        return [...prev, ...fresh.filter(c => !ids.has(c.id))];
      });
    } else {
      setParty(prev => {
        const ids = new Set(prev.map(x => x.id));
        return [...prev, ...fresh.filter(c => !ids.has(c.id))];
      });
    }
  }, []);

  /* ── Combatant CRUD ─────────────────────────────────────────────────────── */
  const addCombatant = useCallback((c, isOpponent) => {
    const entry = { ...c, isOpponent };
    if (isOpponent) setOpponents(prev => [...prev, entry]);
    else            setParty(prev => [...prev, entry]);
  }, []);

  const editCombatant = useCallback((updated, isOpponent) => {
    const setter = isOpponent ? setOpponents : setParty;
    setter(prev => prev.map(c => c.id === updated.id ? updated : c));
  }, []);

  const removeCombatant = useCallback((id, isOpponent) => {
    const setter = isOpponent ? setOpponents : setParty;
    setter(prev => prev.filter(c => c.id !== id));
    setActions(prev => prev.filter(a => a.combatantId !== id));
  }, []);

  /* ── Action CRUD ────────────────────────────────────────────────────────── */
  const addAction = useCallback((action) => {
    setActions(prev => [...prev, action]);
    setActionTarget(null);
  }, []);

  const removeAction = useCallback((actionId) => {
    setActions(prev => prev.filter(a => a.actionId !== actionId));
  }, []);

  /* ── Turn controls ──────────────────────────────────────────────────────── */
  const nextTurn = useCallback(() => {
    setActions([]);
    setTurn(t => t + 1);
  }, []);

  const endEncounter = useCallback(() => {
    if (confirm("End encounter and return to character sheet?")) onExit();
  }, [onExit]);

  const totalActions    = actions.length;
  const withActions     = new Set(actions.map(a => a.combatantId)).size;
  const totalCombatants = allCombatants.length;

  return (
    <div className="enc-shell">
      {/* ── Top bar ── */}
      <div className="enc-topbar">
        <div className="enc-topbar-left">
          <div className="enc-turn-badge">Turn {turn}</div>
          <div className="enc-turn-info">
            {withActions}/{totalCombatants} combatants · {totalActions} actions
          </div>
        </div>
        <div className="enc-topbar-title">Encounter</div>
        <div className="enc-topbar-right">
          <button className="enc-btn next" onClick={nextTurn} title="Resolve turn and start next">
            Next Turn →
          </button>
          <button className="enc-btn end" onClick={endEncounter}>End</button>
        </div>
      </div>

      {/* ── Three-column body ── */}
      <div className="enc-body">

        {/* LEFT — party */}
        <CombatantPanel
          title="Party"
          combatants={party}
          actions={actions}
          isOpponent={false}
          onAdd={() => setAddParty(true)}
          onImport={handleImport}
          onRemove={id => removeCombatant(id, false)}
          onEdit={c => { setEditTarget(c); setIsEditOpponent(false); }}
          onAddAction={c => setActionTarget(c)}
          onRemoveAction={removeAction}
        />

        {/* CENTER — turn order */}
        <div className="enc-order-panel">
          <div className="enc-order-header">Action Order</div>
          {sorted.length === 0 ? (
            <div className="enc-empty enc-order-empty">
              No actions yet.<br />Click "+ Action" on any combatant.
            </div>
          ) : (
            <div className="enc-order-list">
              {sorted.map((action, i) => {
                const c = allCombatants.find(x => x.id === action.combatantId);
                return <OrderCard key={action.actionId} rank={i + 1} action={action} combatant={c} />;
              })}
            </div>
          )}
        </div>

        {/* RIGHT — opponents */}
        <CombatantPanel
          title="Opponents"
          combatants={opponents}
          actions={actions}
          isOpponent={true}
          onAdd={() => setAddOpponent(true)}
          onImport={handleImport}
          onRemove={id => removeCombatant(id, true)}
          onEdit={c => { setEditTarget(c); setIsEditOpponent(true); }}
          onAddAction={c => setActionTarget(c)}
          onRemoveAction={removeAction}
        />
      </div>

      {/* ── Modals ── */}
      {actionTarget && (
        <AddActionModal
          combatant={actionTarget}
          tuLeft={remainingTU(actions, actionTarget.id)}
          onAdd={addAction}
          onClose={() => setActionTarget(null)}
        />
      )}

      {addParty && (
        <EditCombatantModal
          initial={newCombatant({ isOpponent: false })}
          onSave={c => { addCombatant(c, false); setAddParty(false); }}
          onClose={() => setAddParty(false)}
        />
      )}

      {addOpponent && (
        <EditCombatantModal
          initial={newCombatant({ isOpponent: true })}
          onSave={c => { addCombatant(c, true); setAddOpponent(false); }}
          onClose={() => setAddOpponent(false)}
        />
      )}

      {editTarget && (
        <EditCombatantModal
          initial={editTarget}
          onSave={c => { editCombatant(c, isEditOpponent); setEditTarget(null); }}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}