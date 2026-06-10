export default function PartyTabs({ party, activeId, onSelect, onAdd }) {
  return (
    <div className="party-bar">
      {party.map(c => (
        <button
          key={c.id}
          className={`tab ${c.id === activeId ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          {c.emoji} {c.name.split(" ")[0] || "?"}
        </button>
      ))}
      {party.length < 6 && (
        <button className="tab add-btn" onClick={onAdd}>+ Add</button>
      )}
    </div>
  );
}