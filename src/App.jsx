import { useState } from "react";
import { globalCss } from "./styles/GlobalCSS.js";
import { newCharacter, loadPartyFromStorage, savePartyToStorage } from "./utils/Character.js";
import AppHeader from "./components/AppHeader.jsx";
import PartyTabs from "./components/PartyTabs.jsx";
import DiceRoller from "./components/DiceRoller.jsx";
import CharacterSheet from "./components/CharacterSheet.jsx";
import ImportExport from "./components/ImportExport.jsx";

export default function App() {
  const [party, setParty] = useState(loadPartyFromStorage);
  const [activeId, setActiveId] = useState(() => loadPartyFromStorage()[0]?.id ?? null);
  const [dicePool, setDicePool] = useState({});

  const saveParty = (newParty) => {
    setParty(newParty);
    savePartyToStorage(newParty);
  };

  const addCharacter = () => {
    const c = newCharacter();
    const updated = [...party, c];
    saveParty(updated);
    setActiveId(c.id);
  };

  const updateChar = (updated) => {
    saveParty(party.map(c => c.id === updated.id ? updated : c));
  };

  const deleteChar = (id) => {
    const updated = party.filter(c => c.id !== id);
    const next = updated.length ? updated : [newCharacter()];
    saveParty(next);
    setActiveId(next[0]?.id ?? null);
  };

  const importParty = (imported) => {
    saveParty(imported);
    setActiveId(imported[0]?.id ?? null);
  };

  const active = party.find(c => c.id === activeId) ?? party[0];

  return (
    <>
      <style>{globalCss}</style>
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
    </>
  );
}