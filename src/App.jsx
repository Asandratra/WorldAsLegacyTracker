import { useState, useCallback } from "react";
import { globalCss, equipmentCss } from "./styles/GlobalCSS.js";
import { newCharacter, loadPartyFromStorage, savePartyToStorage } from "./utils/Character.js";
import AppHeader from "./components/AppHeader.jsx";
import PartyTabs from "./components/PartyTabs.jsx";
import DiceRoller from "./components/DiceRoller.jsx";
import CharacterSheet from "./components/CharacterSheet.jsx";
import ImportExport from "./components/ImportExport.jsx";

// Inject CSS into <head> once at module load — never touched again
const styleEl = document.createElement("style");
styleEl.textContent = globalCss + equipmentCss;
document.head.appendChild(styleEl);

// Load once, share between both state initialisers
const _initial = loadPartyFromStorage();

export default function App() {
  const [party, setParty] = useState(_initial);
  const [activeId, setActiveId] = useState(_initial[0]?.id ?? null);
  const [dicePool, setDicePool] = useState({});

  const addCharacter = useCallback(() => {
    const c = newCharacter();
    setParty(prev => {
      const next = [...prev, c];
      savePartyToStorage(next);
      return next;
    });
    setActiveId(c.id);
  }, []);

  const updateChar = useCallback((updated) => {
    setParty(prev => {
      const next = prev.map(c => c.id === updated.id ? updated : c);
      savePartyToStorage(next);
      return next;
    });
  }, []);

  const deleteChar = useCallback((id) => {
    setParty(prev => {
      const filtered = prev.filter(c => c.id !== id);
      const next = filtered.length ? filtered : [newCharacter()];
      savePartyToStorage(next);
      setActiveId(next[0]?.id ?? null);
      return next;
    });
  }, []);

  const importParty = useCallback((imported) => {
    savePartyToStorage(imported);
    setParty(imported);
    setActiveId(imported[0]?.id ?? null);
  }, []);

  const active = party.find(c => c.id === activeId) ?? party[0];

  return (
    <div className="app">
      <AppHeader partyCount={party.length} activeName={active?.name} />

      <PartyTabs
        party={party}
        activeId={active?.id}
        onSelect={setActiveId}
        onAdd={addCharacter}
      />

      <DiceRoller pool={dicePool} onPoolChange={setDicePool} />

      {active ? (
        <CharacterSheet
          key={active.id}
          char={active}
          onChange={updateChar}
          onDelete={() => deleteChar(active.id)}
        />
      ) : (
        <div className="empty">
          <span>⚔️</span>
          No adventurers yet. Add a character to begin.
        </div>
      )}

      <ImportExport party={party} onImport={importParty} />
    </div>
  );
}