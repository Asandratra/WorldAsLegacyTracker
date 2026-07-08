import { useRef } from "react";

export default function ImportExport({ activeId, party, onImport }) {
  const fileRef = useRef();

  const exportParty = () => {
    const blob = new Blob([JSON.stringify(party, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dungeon-party-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const exportCharacter = (character) => {
    const blob = new Blob([JSON.stringify(character, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const characterName = character.name ? character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'character';
    a.href = url;
    a.download = `dungeon-character-${characterName}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        onImport(Array.isArray(data) ? data : [data]);
      } catch {
        alert("Invalid file — could not import.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      <hr className="divider" />
      <div className="btn-row" style={{ marginBottom: 32 }}>
        {activeId && (
          <button className="btn primary" onClick={() => {
            const character = party.find(c => c.id === activeId);
            if (character) exportCharacter(character);
          }}>
            ⬇ Export Character
          </button>
        )}
        <button className="btn" onClick={exportParty}>⬇ Export Party</button>
        <button className="btn" onClick={() => fileRef.current.click()}>⬆ Import Party</button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFileChange} />
      </div>
    </>
  );
}