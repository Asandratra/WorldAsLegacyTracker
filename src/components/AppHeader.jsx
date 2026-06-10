export default function AppHeader({ partyCount, activeName }) {
  return (
    <div className="header">
      <h1>Dungeon Tracker</h1>
      <p>Party of {partyCount} · {activeName ?? "—"}</p>
    </div>
  );
}