import { useState, useCallback } from "react";
import { globalCss, equipmentCss, skillCss, attackCss, powerModCss, statDisplayCss } from "./styles/GlobalCSS.js";
import { newCharacter, loadPartyFromStorage, savePartyToStorage } from "./utils/Character.js";
import AppHeader from "./components/AppHeader.jsx";
import PartyTabs from "./components/PartyTabs.jsx";
import DiceRoller from "./components/DiceRoller.jsx";
import { LeftColumn, RightColumn } from "./components/CharacterSheet.jsx";
import ImportExport from "./components/ImportExport.jsx";

// Inject all CSS once into <head> — never re-evaluated on renders
const styleEl = document.createElement("style");
styleEl.textContent = globalCss + equipmentCss + skillCss + attackCss + powerModCss + statDisplayCss;
document.head.appendChild(styleEl);

const _initial = loadPartyFromStorage();

export default function App() {
  const [party, setParty]     = useState(_initial);
  const [activeId, setActiveId] = useState(_initial[0]?.id ?? null);
  const [dicePool, setDicePool] = useState({});

  const addCharacter = useCallback(() => {
    const c = newCharacter();
    setParty(prev => { const n = [...prev, c]; savePartyToStorage(n); return n; });
    setActiveId(c.id);
  }, []);

  const updateChar = useCallback((updated) => {
    setParty(prev => {
      const n = prev.map(c => c.id === updated.id ? updated : c);
      savePartyToStorage(n);
      return n;
    });
  }, []);

  const deleteChar = useCallback((id) => {
    setParty(prev => {
      const filtered = prev.filter(c => c.id !== id);
      const n = filtered.length ? filtered : [newCharacter()];
      savePartyToStorage(n);
      setActiveId(n[0]?.id ?? null);
      return n;
    });
  }, []);

  const importParty = useCallback((imported) => {
    savePartyToStorage(imported);
    setParty(imported);
    setActiveId(imported[0]?.id ?? null);
  }, []);

  const active = party.find(c => c.id === activeId) ?? party[0];

  return (
    <div className="app-shell">
      {/* ── Masthead ── */}
      <AppHeader partyCount={party.length} activeName={active?.name} />

      {/* ── Party tabs (full width) ── */}
      <PartyTabs
        party={party}
        activeId={active?.id}
        onSelect={setActiveId}
        onAdd={addCharacter}
      />

      {/* ── Two-column body ── */}
      {active ? (
        <div className="sheet-layout">
          {/* LEFT — character info, vitals, stats, equipment, notes */}
          <div className="col-left">
            <LeftColumn
              char={active}
              onChange={updateChar}
              onDelete={() => deleteChar(active.id)}
            />
          </div>

          {/* RIGHT — dice, skills grid, scrollable inventory */}
          <div className="col-right">
            <DiceRoller pool={dicePool} onPoolChange={setDicePool} />
            <RightColumn
              char={active}
              onChange={updateChar}
            />
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">⚔</div>
          <div>No adventurers yet. Add a character above.</div>
        </div>
      )}

      <ImportExport party={party} onImport={importParty} />
    </div>
  );
}