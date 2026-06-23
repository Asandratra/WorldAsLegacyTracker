import { useState, memo } from "react";

/* ── Settings modal ── */
function VitalsSettingsModal({ maxHp, maxMp, maxExhaustion, onSave, onClose }) {
  const [mHp,  setMHp]  = useState(maxHp);
  const [mMp,  setMMp]  = useState(maxMp);
  const [mExh, setMExh] = useState(maxExhaustion);

  const save = () => {
    onSave({
      maxHp:          Math.max(1, mHp),
      maxMp:          Math.max(0, mMp),
      maxExhaustion:  Math.max(1, mExh),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 320 }}>
        <div className="modal-title">Vital Limits</div>

        <div className="modal-field">
          <div className="label">Max HP</div>
          <div className="vitals-setting-row">
            <button className="vital-base-edit" onClick={() => setMHp(v => Math.max(1, v - 1))}>−</button>
            <input className="stat-edit-input" type="number" min={1} max={255}
              value={mHp} onChange={e => setMHp(Math.max(1, parseInt(e.target.value) || 1))} />
            <button className="vital-base-edit" onClick={() => setMHp(v => v + 1)}>+</button>
          </div>
        </div>

        <div className="modal-field">
          <div className="label">Max MP</div>
          <div className="vitals-setting-row">
            <button className="vital-base-edit" onClick={() => setMMp(v => Math.max(0, v - 1))}>−</button>
            <input className="stat-edit-input" type="number" min={0} max={255}
              value={mMp} onChange={e => setMMp(Math.max(0, parseInt(e.target.value) || 0))} />
            <button className="vital-base-edit" onClick={() => setMMp(v => v + 1)}>+</button>
          </div>
        </div>

        <div className="modal-field">
          <div className="label">Max Exhaustion</div>
          <div className="vitals-setting-row">
            <button className="vital-base-edit" onClick={() => setMExh(v => Math.max(1, v - 1))}>−</button>
            <input className="stat-edit-input" type="number" min={1} max={255}
              value={mExh} onChange={e => setMExh(Math.max(1, parseInt(e.target.value) || 1))} />
            <button className="vital-base-edit" onClick={() => setMExh(v => v + 1)}>+</button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={save}>Save</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ── Vital bar row ── */
function VitalBar({ label, current, max, color, children }) {
  const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0;
  return (
    <div className="vitals-bar-row">
      <div className="vitals-bar-label">{label}</div>
      <div className="hp-bar-wrap">
        <div className="hp-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="hp-nums">{children}</div>
    </div>
  );
}

/* ── Main VitalsCard ── */
const VitalsCard = memo(function VitalsCard({
  hp, maxHp,
  armor,
  mp, maxMp,
  exhaustion, maxExhaustion,
  onUpdate,
}) {
  const [delta,       setDelta]       = useState("");
  const [addArmorVal, setAddArmorVal] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────
  const safeMaxExh = maxExhaustion ?? 100;
  const exhFull    = exhaustion >= safeMaxExh;
  const exhColor   = exhFull              ? "linear-gradient(90deg,#6a0000,#c02020)"
    : exhaustion / safeMaxExh >= 0.6      ? "linear-gradient(90deg,#6a3a00,#b06a10)"
    :                                       "linear-gradient(90deg,#2a4a28,#4a7a48)";

  // HP + Armor combined bar
  const totalPool     = maxHp + armor;
  const hpPct         = totalPool > 0 ? (hp    / totalPool) * 100 : 0;
  const armorPct      = totalPool > 0 ? (armor / totalPool) * 100 : 0;
  const dividerPct    = totalPool > 0 ? (maxHp / totalPool) * 100 : 100;

  // ── Damage: armor absorbs first ───────────────────────────────────────────
  const applyDamage = (amount) => {
    if (amount <= 0) return;
    const abs = Math.min(armor, amount);
    onUpdate({ armor: armor - abs, hp: Math.max(0, hp - (amount - abs)) });
    setDelta("");
  };

  const applyHeal = (amount) => {
    if (amount <= 0) return;
    onUpdate({ hp: Math.min(maxHp, hp + amount) });
    setDelta("");
  };

  const handleQuick = (isHeal) => {
    const d = parseInt(delta) || 1;
    isHeal ? applyHeal(d) : applyDamage(d);
  };

  const handleAddArmor = () => {
    const v = parseInt(addArmorVal) || 0;
    if (v === 0) return;
    onUpdate({ armor: armor + v });
    setAddArmorVal("");
  };

  return (
    <div className="card vitals-card">
      {/* Header */}
      <div className="vitals-card-header">
        <div className="section-title" style={{ marginBottom: 0 }}>Vitals</div>
        <button className="vitals-settings-btn" onClick={() => setSettingsOpen(true)} title="Edit limits">
          ⚙
        </button>
      </div>

      {/* ── HP + Armor combined bar ── */}
      <div className="vitals-bar-row" style={{ marginTop: 12 }}>
        <div className="vitals-bar-label">HP</div>
        <div className="combined-bar-track">
          <div className="combined-bar-hp"    style={{ width: `${hpPct}%` }}    title={`HP: ${hp} / ${maxHp}`} />
          {armor > 0 && <div className="combined-bar-armor" style={{ width: `${armorPct}%` }} title={`Armor: ${armor}`} />}
          {armor > 0 && <div className="combined-bar-divider" style={{ left: `${dividerPct}%` }} />}
        </div>
        <div className="hp-nums">
          <input type="number" min={0} max={maxHp} value={hp}
            onChange={e => onUpdate({ hp: Math.min(maxHp, Math.max(0, parseInt(e.target.value) || 0)) })} />
          <span className="hp-sep">/</span>
          <span className="vital-effective">{maxHp}</span>
          {armor > 0 && <span className="armor-badge" title="Armor">+{armor}</span>}
        </div>
      </div>
      {armor > 0 && <div className="armor-note">⚔ Damage hits armor first · ✦ Heals restore HP only</div>}

      {/* ── MP bar ── */}
      <VitalBar label="MP" current={mp} max={maxMp} color="linear-gradient(90deg,#3a4a8a,#6878c8)">
        <input type="number" min={0} max={maxMp} value={mp}
          onChange={e => onUpdate({ mp: Math.min(maxMp, Math.max(0, parseInt(e.target.value) || 0)) })} />
        <span className="hp-sep">/</span>
        <span className="vital-effective">{maxMp}</span>
      </VitalBar>

      {/* ── Exhaustion bar ── */}
      <VitalBar label="EXH" current={exhaustion} max={safeMaxExh} color={exhColor}>
        <input type="number" min={0} max={safeMaxExh} value={exhaustion}
          onChange={e => onUpdate({ exhaustion: Math.min(safeMaxExh, Math.max(0, parseInt(e.target.value) || 0)) })} />
        <span className="hp-sep">/</span>
        <span className="vital-effective">{safeMaxExh}</span>
      </VitalBar>
      {exhFull && <div className="exhausted-warning">⚠ Exhausted — active skills disabled</div>}

      <hr className="divider" />

      {/* ── Quick damage / heal ── */}
      <div className="vitals-quick-row">
        <div className="delta-row" style={{ flex: 1 }}>
          <span className="delta-label">Dmg / Heal</span>
          <input type="number" min={1} placeholder="amt" value={delta}
            onChange={e => setDelta(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleQuick(false); }} />
          <div className="hp-btns">
            <button className="hp-btn heal" onClick={() => handleQuick(true)}  title="Heal HP">＋</button>
            <button className="hp-btn dmg"  onClick={() => handleQuick(false)} title="Damage">－</button>
          </div>
        </div>

        <div className="delta-row" style={{ marginLeft: 8 }}>
          <span className="delta-label">+ Armor</span>
          <input type="number" placeholder="amt" value={addArmorVal}
            style={{ maxWidth: 56 }}
            onChange={e => setAddArmorVal(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAddArmor(); }} />
          <button className="hp-btn heal" onClick={handleAddArmor} title="Add armor">＋</button>
        </div>
      </div>

      {/* ── Settings modal ── */}
      {settingsOpen && (
        <VitalsSettingsModal
          maxHp={maxHp}
          maxMp={maxMp}
          maxExhaustion={safeMaxExh}
          onSave={onUpdate}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
});

export default VitalsCard;