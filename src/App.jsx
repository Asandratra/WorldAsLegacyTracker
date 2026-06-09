import { useState, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0d0b08;
    --surface:   #16120d;
    --card:      #1e1812;
    --border:    #3a2e1e;
    --gold:      #c9973a;
    --gold-dim:  #7a5a20;
    --red:       #b03030;
    --red-dim:   #6b1e1e;
    --green:     #4a7c4e;
    --text:      #e8dcc8;
    --text-dim:  #7a6a52;
    --accent:    #c9973a;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Crimson Text', Georgia, serif;
    font-size: 17px;
    min-height: 100vh;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(100,60,10,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(80,30,10,0.06) 0%, transparent 50%);
  }

  .app { max-width: 480px; margin: 0 auto; padding: 16px; }

  /* ── Header ── */
  .header {
    text-align: center;
    padding: 20px 0 16px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }
  .header h1 {
    font-family: 'Cinzel', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--gold);
    text-transform: uppercase;
  }
  .header p {
    font-size: 13px;
    color: var(--text-dim);
    margin-top: 4px;
    font-style: italic;
    letter-spacing: 1px;
  }

  /* ── Party tabs ── */
  .party-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .party-bar::-webkit-scrollbar { height: 2px; }
  .party-bar::-webkit-scrollbar-thumb { background: var(--border); }

  .tab {
    flex-shrink: 0;
    padding: 6px 12px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .tab:hover { border-color: var(--gold-dim); color: var(--text); }
  .tab.active {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,151,58,0.08);
  }
  .tab.add-btn {
    border-style: dashed;
    color: var(--text-dim);
  }
  .tab.add-btn:hover { color: var(--gold); border-color: var(--gold); }

  /* ── Card ── */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 18px;
    margin-bottom: 14px;
    position: relative;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--gold-dim);
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  /* ── Character header ── */
  .char-header {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  .char-avatar {
    width: 52px; height: 52px;
    border: 2px solid var(--border);
    border-radius: 3px;
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .char-avatar:hover { border-color: var(--gold-dim); }

  .char-fields { flex: 1; }
  .field-row { display: flex; gap: 8px; margin-bottom: 8px; }

  input[type="text"], input[type="number"], select {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    padding: 6px 10px;
    border-radius: 2px;
    width: 100%;
    transition: border-color 0.15s;
  }
  input[type="text"]:focus, input[type="number"]:focus {
    outline: none;
    border-color: var(--gold-dim);
  }
  input[type="text"]::placeholder { color: var(--text-dim); }
  input.name-input {
    font-family: 'Cinzel', serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .label {
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  .field-group { flex: 1; }

  /* ── HP bar ── */
  .hp-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .hp-label { font-family: 'Cinzel', serif; font-size: 12px; color: var(--text-dim); width: 24px; }
  .hp-bar-wrap {
    flex: 1;
    height: 10px;
    background: var(--red-dim);
    border-radius: 1px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.3);
  }
  .hp-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--red), #e05050);
    transition: width 0.3s ease;
    border-radius: 1px;
  }
  .hp-nums {
    display: flex;
    gap: 3px;
    align-items: center;
    font-family: 'Cinzel', serif;
    font-size: 13px;
  }
  .hp-nums input { width: 44px; text-align: center; padding: 4px 6px; font-size: 14px; }
  .hp-sep { color: var(--text-dim); }

  .hp-btns { display: flex; gap: 4px; }
  .hp-btn {
    width: 28px; height: 28px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 16px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.12s;
    font-family: monospace;
  }
  .hp-btn.dmg:hover { border-color: var(--red); color: var(--red); background: rgba(176,48,48,0.1); }
  .hp-btn.heal:hover { border-color: var(--green); color: #6fbf75; background: rgba(74,124,78,0.1); }

  /* ── Core stats grid ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .stat-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 10px 8px;
    text-align: center;
  }
  .stat-box .label { display: block; margin-bottom: 6px; }
  .stat-box input {
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: 20px;
    font-weight: 600;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--gold);
    width: 100%;
  }
  .stat-box input:focus { outline: none; }
  .stat-modifier {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 2px;
    font-family: 'Cinzel', serif;
  }

  /* ── XP bar ── */
  .xp-row { margin-bottom: 4px; }
  .xp-bar-wrap {
    height: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 1px;
    overflow: hidden;
    margin-top: 4px;
  }
  .xp-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dim), var(--gold));
    transition: width 0.4s ease;
  }
  .xp-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .level-badge {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: var(--gold);
    letter-spacing: 1px;
  }
  .xp-text { font-size: 12px; color: var(--text-dim); }

  /* ── Notes / inventory ── */
  textarea {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    padding: 10px;
    border-radius: 2px;
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
  }
  textarea:focus { outline: none; border-color: var(--gold-dim); }
  textarea::placeholder { color: var(--text-dim); }

  /* ── Buttons ── */
  .btn-row {
    display: flex;
    gap: 8px;
    margin-top: 6px;
  }
  .btn {
    flex: 1;
    padding: 9px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s;
  }
  .btn:hover { border-color: var(--gold-dim); color: var(--text); }
  .btn.danger:hover { border-color: var(--red); color: var(--red); }
  .btn.primary {
    border-color: var(--gold-dim);
    color: var(--gold);
    background: rgba(201,151,58,0.06);
  }
  .btn.primary:hover { background: rgba(201,151,58,0.14); }

  /* ── Empty state ── */
  .empty {
    text-align: center;
    padding: 48px 20px;
    color: var(--text-dim);
    font-style: italic;
    font-size: 15px;
    border: 1px dashed var(--border);
    border-radius: 4px;
  }
  .empty span { display: block; font-size: 32px; margin-bottom: 10px; opacity: 0.4; }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 14px 0;
  }

  /* ── Delta input popup ── */
  .delta-row {
    display: flex;
    gap: 6px;
    margin-top: 8px;
    align-items: center;
  }
  .delta-row input { max-width: 70px; text-align: center; }
  .delta-label { font-size: 13px; color: var(--text-dim); }
`;

const EMOJIS = ["⚔️","🛡️","🧙","🏹","🗡️","🔮","💀","🐉","🦅","🐺","🧝","🔥","❄️","⚡","🌑","🍀"];

const XP_THRESHOLDS = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000];

function newCharacter(name = "New Adventurer") {
  return {
    id: crypto.randomUUID(),
    name,
    class: "",
    race: "",
    emoji: "⚔️",
    level: 1,
    xp: 0,
    hp: 10,
    maxHp: 10,
    armor: 10,
    gold: 0,
    str: 10, dex: 10, con: 10,
    int: 10, wis: 10, cha: 10,
    notes: "",
    inventory: "",
  };
}

function modifier(val) {
  const mod = Math.floor((val - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function xpForNextLevel(level) {
  return XP_THRESHOLDS[Math.min(level, XP_THRESHOLDS.length - 1)] ?? 999999;
}

function xpPercent(xp, level) {
  const prev = XP_THRESHOLDS[Math.min(level - 1, XP_THRESHOLDS.length - 1)] ?? 0;
  const next = xpForNextLevel(level);
  if (next <= prev) return 100;
  return Math.min(100, Math.round(((xp - prev) / (next - prev)) * 100));
}

// ── Stat box ──
function StatBox({ label, value, onChange }) {
  return (
    <div className="stat-box">
      <span className="label">{label}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
      />
      <div className="stat-modifier">{modifier(value)}</div>
    </div>
  );
}

// ── Character sheet ──
function CharacterSheet({ char, onChange, onDelete }) {
  const [deltaHp, setDeltaHp] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);

  const update = (field, val) => onChange({ ...char, [field]: val });

  const applyHp = (sign) => {
    const delta = parseInt(deltaHp) || 1;
    const newHp = Math.min(char.maxHp, Math.max(0, char.hp + sign * delta));
    onChange({ ...char, hp: newHp });
    setDeltaHp("");
  };

  const hpPct = char.maxHp > 0 ? Math.min(100, (char.hp / char.maxHp) * 100) : 0;
  const xpPct = xpPercent(char.xp, char.level);
  const nextXp = xpForNextLevel(char.level);

  return (
    <>
      {/* Identity */}
      <div className="card">
        <div className="char-header">
          <div style={{ position: "relative" }}>
            <div className="char-avatar" onClick={() => setEmojiOpen(o => !o)}>
              {char.emoji}
            </div>
            {emojiOpen && (
              <div style={{
                position: "absolute", top: 56, left: 0, zIndex: 10,
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 4, padding: 8, display: "grid",
                gridTemplateColumns: "repeat(4,1fr)", gap: 4, width: 140
              }}>
                {EMOJIS.map(e => (
                  <div key={e} style={{ cursor: "pointer", textAlign: "center", fontSize: 20, padding: 3 }}
                    onClick={() => { update("emoji", e); setEmojiOpen(false); }}>
                    {e}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="char-fields">
            <input
              className="name-input"
              type="text"
              placeholder="Character Name"
              value={char.name}
              onChange={e => update("name", e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <div className="field-row">
              <div className="field-group">
                <div className="label">Class</div>
                <input type="text" placeholder="Rogue…" value={char.class} onChange={e => update("class", e.target.value)} />
              </div>
              <div className="field-group">
                <div className="label">Race</div>
                <input type="text" placeholder="Elf…" value={char.race} onChange={e => update("race", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level & XP */}
      <div className="card">
        <div className="section-title">Progression</div>
        <div className="xp-meta">
          <div className="level-badge">LEVEL {char.level}</div>
          <div className="xp-text">{char.xp} / {nextXp} XP</div>
        </div>
        <div className="xp-bar-wrap">
          <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="field-row" style={{ marginTop: 12 }}>
          <div className="field-group">
            <div className="label">Level</div>
            <input type="number" min={1} max={20} value={char.level}
              onChange={e => update("level", Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))} />
          </div>
          <div className="field-group">
            <div className="label">Total XP</div>
            <input type="number" min={0} value={char.xp}
              onChange={e => update("xp", Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
          <div className="field-group">
            <div className="label">Gold 🪙</div>
            <input type="number" min={0} value={char.gold}
              onChange={e => update("gold", Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
        </div>
      </div>

      {/* HP & Armor */}
      <div className="card">
        <div className="section-title">Vitals</div>
        <div className="hp-row">
          <div className="hp-label" style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "var(--text-dim)", letterSpacing: 1 }}>HP</div>
          <div className="hp-bar-wrap">
            <div className="hp-bar-fill" style={{ width: `${hpPct}%` }} />
          </div>
          <div className="hp-nums">
            <input type="number" min={0} max={char.maxHp} value={char.hp}
              onChange={e => update("hp", Math.min(char.maxHp, Math.max(0, parseInt(e.target.value) || 0)))} />
            <span className="hp-sep">/</span>
            <input type="number" min={1} value={char.maxHp}
              onChange={e => update("maxHp", Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        </div>
        <div className="delta-row">
          <span className="delta-label">Quick:</span>
          <input type="number" min={1} placeholder="amt"
            value={deltaHp}
            onChange={e => setDeltaHp(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") applyHp(1); }}
          />
          <div className="hp-btns">
            <button className="hp-btn heal" onClick={() => applyHp(1)} title="Heal">＋</button>
            <button className="hp-btn dmg" onClick={() => applyHp(-1)} title="Damage">－</button>
          </div>
        </div>
        <hr className="divider" />
        <div className="field-row">
          <div className="field-group" style={{ maxWidth: 120 }}>
            <div className="label">Armor Class</div>
            <input type="number" min={0} value={char.armor}
              onChange={e => update("armor", parseInt(e.target.value) || 0)} />
          </div>
        </div>
      </div>

      {/* Ability scores */}
      <div className="card">
        <div className="section-title">Ability Scores</div>
        <div className="stats-grid">
          {["str","dex","con","int","wis","cha"].map(stat => (
            <StatBox key={stat} label={stat.toUpperCase()} value={char[stat]}
              onChange={v => update(stat, v)} />
          ))}
        </div>
      </div>

      {/* Inventory & Notes */}
      <div className="card">
        <div className="section-title">Inventory</div>
        <textarea
          placeholder="List items, equipment, weapons…"
          value={char.inventory}
          onChange={e => update("inventory", e.target.value)}
          style={{ minHeight: 90 }}
        />
      </div>

      <div className="card">
        <div className="section-title">Notes</div>
        <textarea
          placeholder="Conditions, quest notes, backstory…"
          value={char.notes}
          onChange={e => update("notes", e.target.value)}
          style={{ minHeight: 70 }}
        />
      </div>

      <div className="btn-row">
        <button className="btn danger" onClick={onDelete}>Remove Character</button>
      </div>
    </>
  );
}

// ── Main App ──
export default function App() {
  const [party, setParty] = useState(() => {
    try {
      const saved = localStorage.getItem("dnd-party");
      return saved ? JSON.parse(saved) : [newCharacter("Hero")];
    } catch { return [newCharacter("Hero")]; }
  });
  const [activeId, setActiveId] = useState(() => {
    try {
      const saved = localStorage.getItem("dnd-party");
      if (saved) { const p = JSON.parse(saved); return p[0]?.id; }
    } catch { /* empty */ }
    return null;
  });

  const fileRef = useRef();

  const save = (newParty) => {
    setParty(newParty);
    try { localStorage.setItem("dnd-party", JSON.stringify(newParty)); } catch { /* empty */ }
  };

  const addCharacter = () => {
    const c = newCharacter();
    const updated = [...party, c];
    save(updated);
    setActiveId(c.id);
  };

  const updateChar = (updated) => {
    save(party.map(c => c.id === updated.id ? updated : c));
  };

  const deleteChar = (id) => {
    const updated = party.filter(c => c.id !== id);
    save(updated.length ? updated : [newCharacter()]);
    setActiveId(updated[0]?.id ?? null);
  };

  const exportParty = () => {
    const blob = new Blob([JSON.stringify(party, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dungeon-party-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importParty = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const imported = Array.isArray(data) ? data : [data];
        save(imported);
        setActiveId(imported[0]?.id ?? null);
      } catch { alert("Invalid file — could not import."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const active = party.find(c => c.id === activeId) ?? party[0];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <h1>Dungeon Tracker</h1>
          <p>Party of {party.length} · {active?.name ?? "—"}</p>
        </div>

        {/* Party tabs */}
        <div className="party-bar">
          {party.map(c => (
            <button
              key={c.id}
              className={`tab ${c.id === (active?.id) ? "active" : ""}`}
              onClick={() => setActiveId(c.id)}
            >
              {c.emoji} {c.name.split(" ")[0] || "?"}
            </button>
          ))}
          {party.length < 6 && (
            <button className="tab add-btn" onClick={addCharacter}>+ Add</button>
          )}
        </div>

        {/* Active sheet */}
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

        {/* Import / Export */}
        <hr className="divider" />
        <div className="btn-row" style={{ marginBottom: 32 }}>
          <button className="btn primary" onClick={exportParty}>⬇ Export Party</button>
          <button className="btn" onClick={() => fileRef.current.click()}>⬆ Import Party</button>
          <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={importParty} />
        </div>
      </div>
    </>
  );
}