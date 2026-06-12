import { memo } from "react";

const AppHeader = memo(function AppHeader({ partyCount, activeName }) {
  return (
    <div className="masthead">
      <h1>Dungeon Tracker</h1>
      <p>Character {partyCount}{activeName ? ` · ${activeName}` : ""}</p>
    </div>
  );
});

export default AppHeader;