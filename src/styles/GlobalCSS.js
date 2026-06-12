export const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Parchment palette ── */
:root {
  --paper:       #f2e8d0;
  --paper-dark:  #e8d9b8;
  --paper-deep:  #d9c99a;
  --paper-edge:  #c4aa78;
  --ink:         #26180a;
  --ink-mid:     #4a3218;
  --ink-dim:     #7a6040;
  --ink-faint:   #b09a72;
  --red:         #7a1c1c;
  --red-dim:     #4e1212;
  --gold:        #7a5618;
  --gold-light:  #b8822a;
  --gold-faint:  #d4aa62;
  --blue:        #243058;
  --blue-light:  #5868a8;
  --green:       #243820;
  --green-light: #507848;
  --border:      #c0a060;
  --border-dark: #8a6828;
  --shadow:      rgba(60,30,0,0.18);
}

/* ── Parchment body ── */
body {
  background-color: #d8c898;
  background-image:
    /* Vignette */
    radial-gradient(ellipse at 50% 0%,   rgba(180,130,40,0.20) 0%, transparent 60%),
    radial-gradient(ellipse at 100% 100%,rgba(140,90,20,0.15)  0%, transparent 55%),
    radial-gradient(ellipse at 0%   100%,rgba(160,110,30,0.12) 0%, transparent 55%),
    /* Fine grain */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  color: var(--ink);
  font-family: 'Crimson Text', Georgia, serif;
  font-size: 16px;
  min-height: 100vh;
}

/* ── Page shell ── */
.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 24px 60px;
}

/* ── Card — parchment page feel ── */
.card {
  background: var(--paper);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 16px 18px;
  position: relative;
  box-shadow:
    0 1px 3px var(--shadow),
    inset 0 0 40px rgba(200,160,60,0.06);
}
/* Top rule decoration */
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 8%; right: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-dark), transparent);
  opacity: 0.6;
}

/* ── Masthead ── */
.masthead {
  text-align: center;
  padding: 24px 0 18px;
  border-bottom: 1px solid var(--border-dark);
  margin-bottom: 18px;
  position: relative;
}
.masthead::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 15%; right: 15%;
  height: 1px;
  background: var(--border);
  opacity: 0.5;
}
.masthead h1 {
  font-family: 'IM Fell English', serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 5px;
  color: var(--ink);
  text-transform: uppercase;
}
.masthead p {
  font-size: 13px;
  color: var(--ink-dim);
  margin-top: 5px;
  font-style: italic;
  letter-spacing: 1px;
}

/* ── Party tabs ── */
.party-bar {
  display: flex;
  gap: 5px;
  margin-bottom: 18px;
  overflow-x: auto;
  padding-bottom: 2px;
}
.party-bar::-webkit-scrollbar { height: 2px; }
.party-bar::-webkit-scrollbar-thumb { background: var(--border); }

.tab {
  flex-shrink: 0;
  padding: 5px 14px;
  border: 1px solid var(--border);
  background: var(--paper-dark);
  color: var(--ink-dim);
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 2px 2px 0 0;
  transition: all 0.15s;
  white-space: nowrap;
  border-bottom-color: transparent;
}
.tab:hover { background: var(--paper); color: var(--ink); }
.tab.active {
  background: var(--paper);
  color: var(--ink);
  border-color: var(--border-dark);
  border-bottom-color: var(--paper);
  box-shadow: 0 -1px 3px var(--shadow);
}
.tab.add-btn {
  border-style: dashed;
  border-bottom-color: transparent;
  color: var(--ink-faint);
}
.tab.add-btn:hover { color: var(--gold); border-color: var(--gold-faint); background: var(--paper); }

/* ── Two-column desktop layout ── */
.sheet-layout {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@media (min-width: 900px) {
  .sheet-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }
}

.col-left, .col-right {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ── Section title ── */
.section-title {
  font-family: 'IM Fell English', serif;
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--ink-dim);
  text-transform: uppercase;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-title::before {
  content: '❧';
  font-size: 11px;
  color: var(--gold);
  font-style: normal;
}

/* ── Label ── */
.label {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 1.5px;
  color: var(--ink-dim);
  text-transform: uppercase;
  margin-bottom: 3px;
}

/* ── Inputs ── */
input[type="text"],
input[type="number"],
select,
textarea {
  background: rgba(255,255,255,0.35);
  border: 1px solid var(--border);
  color: var(--ink);
  font-family: 'Crimson Text', serif;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 2px;
  width: 100%;
  transition: border-color 0.15s, box-shadow 0.15s;
}
input[type="text"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--border-dark);
  box-shadow: 0 0 0 2px rgba(138,100,32,0.15);
}
input::placeholder, textarea::placeholder { color: var(--ink-faint); font-style: italic; }

input.name-input {
  font-family: 'IM Fell English', serif;
  font-size: 18px;
  letter-spacing: 1px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  border-radius: 0;
  padding: 4px 0;
  width: 100%;
}
input.name-input:focus { outline: none; border-bottom-color: var(--border-dark); box-shadow: none; }

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a6040'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-color: rgba(255,255,255,0.35);
  padding-right: 28px;
  cursor: pointer;
}

textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.6;
}

/* ── Character header ── */
.char-header {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.char-avatar {
  width: 52px; height: 52px;
  border: 1px solid var(--border);
  border-radius: 2px;
  background: var(--paper-dark);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s;
  box-shadow: inset 0 1px 3px var(--shadow);
}
.char-avatar:hover { border-color: var(--border-dark); }
.char-fields { flex: 1; min-width: 0; }

.field-row { display: flex; gap: 10px; }
.field-group { flex: 1; min-width: 0; }

/* ── HP / vitals bars ── */
.vitals-bar-row, .hp-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.vitals-bar-label, .hp-label {
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--ink-dim);
  width: 28px;
  flex-shrink: 0;
  text-transform: uppercase;
}
.hp-bar-wrap {
  flex: 1;
  height: 10px;
  background: var(--paper-deep);
  border: 1px solid var(--border);
  border-radius: 1px;
  overflow: hidden;
}
.hp-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--red-dim), var(--red));
  transition: width 0.3s ease;
}
.hp-nums {
  display: flex;
  align-items: center;
  gap: 3px;
}
.hp-nums input { width: 44px; text-align: center; padding: 4px 4px; font-size: 14px; font-family: 'Cinzel', serif; }
.hp-sep { color: var(--ink-faint); font-size: 14px; }

.hp-btns { display: flex; gap: 4px; }
.hp-btn {
  width: 28px; height: 28px;
  border: 1px solid var(--border);
  background: var(--paper-dark);
  color: var(--ink-mid);
  font-size: 15px;
  cursor: pointer;
  border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s;
  font-family: monospace;
}
.hp-btn.heal:hover { border-color: var(--green-light); color: var(--green); }
.hp-btn.dmg:hover  { border-color: var(--red); color: var(--red); }

.delta-row { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
.delta-row input { max-width: 70px; text-align: center; }
.delta-label { font-size: 13px; color: var(--ink-dim); font-style: italic; }

.exhausted-warning {
  margin-top: 8px;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--red);
}

/* ── Core stats grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.stat-box {
  background: var(--paper-dark);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 8px 6px;
  text-align: center;
  box-shadow: inset 0 1px 2px var(--shadow);
}
.stat-box .label { margin-bottom: 4px; font-size: 9px; }
.stat-box input {
  text-align: center;
  font-family: 'IM Fell English', serif;
  font-size: 22px;
  padding: 2px;
  border: none;
  background: transparent;
  color: var(--ink);
  width: 100%;
  box-shadow: none;
}
.stat-box input:focus { outline: none; }
.stat-modifier {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  color: var(--ink-dim);
  margin-top: 2px;
}

/* ── Divider ── */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 12px 0;
}

/* ── Buttons ── */
.btn-row { display: flex; gap: 8px; margin-top: 6px; }
.btn {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--border);
  background: var(--paper-dark);
  color: var(--ink-dim);
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.15s;
}
.btn:hover { border-color: var(--border-dark); color: var(--ink); background: var(--paper); }
.btn.danger:hover { border-color: var(--red); color: var(--red); }
.btn.primary {
  border-color: var(--border-dark);
  color: var(--gold);
  background: var(--paper);
}
.btn.primary:hover { background: var(--paper-dark); }

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding: 64px 20px;
  color: var(--ink-faint);
  font-style: italic;
  font-size: 16px;
}
.empty-state-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.35; }
.inv-empty {
  text-align: center;
  padding: 18px;
  color: var(--ink-faint);
  font-style: italic;
  font-size: 14px;
  border: 1px dashed var(--border);
  border-radius: 2px;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 15, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
}
.modal {
  background: var(--paper);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  border: 1px solid var(--border-dark);
  border-radius: 3px;
  padding: 22px;
  width: 100%;
  max-width: 420px;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(30,15,0,0.45);
  position: relative;
}
.modal::before {
  content: '';
  position: absolute;
  top: 0; left: 8%; right: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-dark), transparent);
}
.modal-title {
  font-family: 'IM Fell English', serif;
  font-size: 18px;
  letter-spacing: 2px;
  color: var(--ink);
  margin-bottom: 16px;
}
.modal-kind-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 14px;
}
.modal-kind-tab {
  flex: 1;
  padding: 5px;
  border: 1px solid var(--border);
  background: var(--paper-dark);
  color: var(--ink-dim);
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.12s;
}
.modal-kind-tab.active { border-color: var(--border-dark); color: var(--gold); background: var(--paper); }
.modal-kind-tab:hover:not(.active) { border-color: var(--border-dark); color: var(--ink); }

.modal-field { margin-bottom: 12px; }
.modal-field .label { margin-bottom: 4px; }
.modal-row { display: flex; gap: 8px; margin-bottom: 12px; }
.modal-row .modal-field { flex: 1; margin-bottom: 0; }
.modal-footer { display: flex; gap: 8px; margin-top: 18px; }
.modal-footer .btn { margin-top: 0; }

/* ── Inventory ── */
.inv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.inv-add-btn {
  padding: 4px 10px;
  border: 1px dashed var(--border-dark);
  background: transparent;
  color: var(--gold);
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.15s;
}
.inv-add-btn:hover { background: rgba(138,100,32,0.08); border-style: solid; }

/* Scrollable inventory on right column desktop */
.inventory-scroll-card .card { padding: 0; }
.inventory-scroll-card .card > .inv-header { padding: 14px 16px 0; }
.inv-scroll-inner {
  max-height: 420px;
  overflow-y: auto;
  padding: 0 16px 14px;
}
.inv-scroll-inner::-webkit-scrollbar { width: 4px; }
.inv-scroll-inner::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.inv-list { display: flex; flex-direction: column; gap: 5px; }

.inv-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  background: var(--paper-dark);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: border-color 0.12s;
}
.inv-item:hover { border-color: var(--border-dark); }

.inv-kind-badge {
  flex-shrink: 0;
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.5px;
  color: var(--ink-dim);
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 2px 5px;
  min-width: 28px;
  text-align: center;
}
.inv-kind-badge.weapon    { color: var(--red);  border-color: var(--red-dim); }
.inv-kind-badge.equipment { color: var(--gold); border-color: var(--border-dark); }

.inv-info { flex: 1; overflow: hidden; }
.inv-name {
  font-size: 14px;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.inv-desc {
  font-size: 12px;
  color: var(--ink-dim);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
}
.inv-sub {
  font-size: 11px;
  color: var(--gold);
  margin-top: 2px;
  font-family: 'Cinzel', serif;
  letter-spacing: 0.5px;
}

.inv-qty-controls { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.inv-qty-btn {
  width: 22px; height: 22px;
  border: 1px solid var(--border);
  background: var(--paper);
  color: var(--ink-dim);
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s;
  font-family: monospace;
  line-height: 1;
}
.inv-qty-btn:hover { border-color: var(--border-dark); color: var(--ink); }
.inv-qty-btn.remove:hover { border-color: var(--red); color: var(--red); }
.inv-qty-num { font-family: 'Cinzel', serif; font-size: 12px; color: var(--ink-mid); min-width: 18px; text-align: center; }

.inv-equip-btn {
  flex-shrink: 0;
  padding: 3px 8px;
  border: 1px solid var(--border-dark);
  background: transparent;
  color: var(--gold);
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.12s;
}
.inv-equip-btn:hover { background: rgba(138,100,32,0.1); }
.inv-equip-btn:disabled { opacity: 0.3; cursor: not-allowed; border-color: var(--border); color: var(--ink-faint); }

.inv-delete-btn {
  width: 22px; height: 22px;
  border: none;
  background: transparent;
  color: var(--ink-faint);
  font-size: 12px;
  cursor: pointer;
  border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0.5;
  transition: all 0.12s;
  flex-shrink: 0;
}
.inv-delete-btn:hover { opacity: 1; color: var(--red); }

/* ── Dice Roller ── */
.dice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.dice-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--paper-dark);
  border: 1px solid var(--border);
  border-radius: 2px;
}
.dice-label {
  flex: 1;
  font-family: 'IM Fell English', serif;
  font-size: 14px;
  color: var(--ink-mid);
  letter-spacing: 1px;
}
.dice-controls { display: flex; gap: 4px; align-items: center; }
.dice-btn {
  width: 24px; height: 24px;
  border: 1px solid var(--border);
  background: var(--paper);
  color: var(--ink-dim);
  font-family: 'Cinzel', serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s;
}
.dice-btn:hover:not(:disabled) { border-color: var(--border-dark); color: var(--gold); }
.dice-btn:disabled { opacity: 0.25; cursor: not-allowed; }
.dice-count {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  color: var(--gold);
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}
.dice-pool {
  background: var(--paper-dark);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 10px 12px;
  margin-bottom: 10px;
  font-size: 13px;
}
.dice-pool-label { color: var(--ink-dim); margin-bottom: 4px; font-style: italic; font-size: 12px; }
.dice-pool-content { display: flex; justify-content: space-between; align-items: center; }
.dice-pool-formula { color: var(--gold); font-weight: 600; font-family: 'Cinzel', serif; font-size: 13px; }
.dice-range { display: flex; gap: 12px; font-size: 12px; }
.dice-range-item { display: flex; flex-direction: column; }
.dice-range-label { color: var(--ink-faint); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinzel', serif; }
.dice-range-value { color: var(--gold); font-weight: 600; font-family: 'Cinzel', serif; }
.dice-result {
  background: linear-gradient(135deg, var(--paper-dark), var(--paper));
  border: 2px solid var(--border-dark);
  border-radius: 3px;
  padding: 14px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 36px;
  font-weight: 400;
  color: var(--ink);
  font-family: 'IM Fell English', serif;
  letter-spacing: 2px;
  box-shadow: inset 0 1px 4px var(--shadow);
}
.dice-history { margin-top: 10px; padding: 10px; background: var(--paper-dark); border: 1px solid var(--border); border-radius: 2px; }
.dice-history-title { font-size: 10px; color: var(--ink-faint); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; font-family: 'Cinzel', serif; }
.dice-history-list { display: flex; flex-direction: column; gap: 4px; max-height: 160px; overflow-y: auto; }
.dice-history-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 5px 7px; background: var(--paper); border: 1px solid var(--border); border-radius: 2px; font-size: 12px;
}
.dice-history-formula { color: var(--ink-dim); font-size: 11px; font-style: italic; }
.dice-history-value { color: var(--gold); font-weight: 600; font-family: 'Cinzel', serif; font-size: 13px; }
.dice-history-time { color: var(--ink-faint); font-size: 10px; margin-left: 8px; }

/* ── XP row ── */
.xp-row { margin-bottom: 4px; }
.xp-bar-wrap { height: 5px; background: var(--paper-deep); border: 1px solid var(--border); border-radius: 1px; overflow: hidden; margin-top: 4px; }
.xp-bar-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-light)); transition: width 0.4s ease; }
.xp-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.level-badge { font-family: 'Cinzel', serif; font-size: 11px; color: var(--gold); letter-spacing: 1px; }
.xp-text { font-size: 12px; color: var(--ink-dim); }
`;

export const equipmentCss = `
  /* ── Equipment Panel ── */
  .equip-grid { display: flex; flex-direction: column; gap: 5px; }

  .equip-slot {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    min-height: 44px;
    transition: border-color 0.12s;
  }
  .equip-slot.filled { border-color: var(--border-dark); background: var(--paper); }
  .equip-slot-dual   { border-color: var(--gold) !important; }

  .equip-slot-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--ink-faint);
    text-transform: uppercase;
    width: 64px;
    flex-shrink: 0;
  }
  .equip-slot-content { flex: 1; overflow: hidden; }
  .equip-slot-empty { font-size: 13px; color: var(--ink-faint); font-style: italic; }
  .equip-slot-name {
    font-size: 14px;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .equip-slot-desc { font-size: 11px; color: var(--ink-dim); font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
  .equip-slot-sub  { font-size: 10px; color: var(--gold); font-family: 'Cinzel', serif; letter-spacing: 0.5px; margin-top: 2px; }
  .equip-slot-tag  {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--gold);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 4px;
  }

  .equip-section-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--gold);
    text-transform: uppercase;
    margin: 8px 0 3px;
  }

  .equip-unequip-btn {
    flex-shrink: 0;
    padding: 3px 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--ink-faint);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
  }
  .equip-unequip-btn:hover { border-color: var(--red-dim); color: var(--red); }
  .radar-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .radar-chart-wrapper {
    width: 100%;
    max-width: 280px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 10px;
    box-shadow: inset 0 1px 3px var(--shadow);
  }

  .radar-svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .radar-grid-line {
    fill: none;
    stroke: var(--border);
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }

  .radar-axis-line {
    stroke: var(--border);
    stroke-width: 1;
    opacity: 0.6;
  }

  .radar-poly-fill {
    fill: var(--gold-faint);
    opacity: 0.35;
  }

  .radar-poly-stroke {
    fill: none;
    stroke: var(--gold-light);
    stroke-width: 2;
  }

  .radar-node {
    fill: var(--red);
    stroke: var(--paper);
    stroke-width: 1.5;
  }

  .radar-label-text {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    fill: var(--ink-mid);
    font-weight: 600;
  }

  .radar-inputs-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .radar-input-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }

  .radar-input-row .label {
    margin-bottom: 0;
    width: 80px;
  }

  .radar-counter-box {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .radar-counter-box input {
    width: 40px;
    text-align: center;
    font-family: 'IM Fell English', serif;
    font-size: 16px;
    font-weight: bold;
    padding: 2px;
    border: none;
    background: transparent;
  }

  .radar-counter-box input::-webkit-outer-spin-button,
  .radar-counter-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .radar-input-row .stat-modifier {
    width: 30px;
    text-align: right;
    font-weight: 600;
  }
  .stat-edit-trigger {
    margin-top: 12px;
    padding: 6px 16px;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    cursor: pointer;
  }

  .stat-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(18, 11, 5, 0.6); /* Tinted with your deep ink tone */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
  }

  .stat-modal-content {
    background: var(--paper);
    border: 3px double var(--gold);
    border-radius: 4px;
    width: 90%;
    max-width: 360px;
    padding: 20px;
    box-shadow: 0 8px 24px var(--shadow);
    animation: modalFadeIn 0.2s ease-out;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .stat-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    border-bottom: 1px dashed var(--border-dark);
    padding-bottom: 8px;
  }

  .stat-modal-header h3 {
    font-family: 'Cinzel', serif;
    color: var(--red);
    margin: 0;
    font-size: 18px;
  }

  .stat-modal-close {
    background: none;
    border: none;
    font-size: 24px;
    color: var(--ink-dim);
    cursor: pointer;
    line-height: 1;
  }

  .stat-modal-close:hover {
    color: var(--red);
  }

  .stat-modal-footer {
    margin-top: 18px;
    display: flex;
    justify-content: flex-end;
  }

  .stat-modal-footer .btn {
    font-family: 'Cinzel', serif;
    min-width: 80px;
  }`;

export const skillCss = `
  /* ── Skill grid 6×2 (desktop right column) ── */
  .skill-panel-card { }

  .skill-grid-6x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, auto);
    gap: 6px;
    margin-bottom: 0;
  }

  /* On mobile, hide the grid and show the flat list instead */
  .skill-list-mobile { display: flex; flex-direction: column; gap: 5px; }
  @media (min-width: 900px) {
    .skill-list-mobile { display: none; }
  }
  @media (max-width: 899px) {
    .skill-grid-6x2 { display: none; }
  }

  /* ── Skill cell (grid item) ── */
  .skill-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 9px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    min-height: 80px;
    transition: border-color 0.12s;
  }
  .skill-cell.active.depleted { opacity: 0.5; }
  .skill-cell.passive { background: rgba(36,56,32,0.05); border-color: var(--border); }
  .skill-cell.empty {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 5px,
      rgba(192,160,96,0.06) 5px,
      rgba(192,160,96,0.06) 6px
    );
    border-style: dashed;
    opacity: 0.6;
    align-items: center;
    justify-content: center;
    min-height: 64px;
  }
  .skill-cell-empty-label { font-family: 'IM Fell English', serif; font-size: 18px; color: var(--ink-faint); }

  .skill-cell-top {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .skill-cell-name {
    flex: 1;
    font-size: 13px;
    color: var(--ink);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Crimson Text', serif;
  }
  .skill-cell-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    min-height: 16px;
  }
  .skill-passive-indicator {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--green-light);
    text-transform: uppercase;
    margin-top: auto;
    padding: 2px 0;
  }

  /* ── Skill badge ── */
  .skill-badge {
    flex-shrink: 0;
    width: 32px; height: 32px;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .skill-badge.active  { background: rgba(122,28,28,0.12); border: 1px solid var(--red-dim); color: var(--red); }
  .skill-badge.passive { background: rgba(36,56,32,0.12);  border: 1px solid var(--green);   color: var(--green-light); }
  .skill-badge.sm { width: 26px; height: 26px; font-size: 7px; }

  /* ── Skill type / cost pills ── */
  .skill-type-pill {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: 0.5px;
    color: var(--ink-dim);
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 1px 4px;
  }
  .skill-cost-pill {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    padding: 1px 4px;
    border-radius: 2px;
    border: 1px solid;
  }
  .skill-cost-pill.mp  { border-color: var(--blue-light); color: var(--blue-light); background: rgba(36,48,88,0.06); }
  .skill-cost-pill.exh { border-color: var(--gold);       color: var(--gold);       background: rgba(122,86,24,0.06); }

  /* ── Use button ── */
  .skill-use-btn {
    flex-shrink: 0;
    padding: 3px 10px;
    border: 1px solid var(--border-dark);
    background: transparent;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
    margin-left: auto;
  }
  .skill-use-btn.full {
    width: 100%;
    margin-left: 0;
    margin-top: auto;
    padding: 4px;
    text-align: center;
  }
  .skill-use-btn:hover:not(:disabled) { background: rgba(122,86,24,0.1); }
  .skill-use-btn:disabled { opacity: 0.25; cursor: not-allowed; border-color: var(--border); color: var(--ink-faint); }

  /* ── Mastery badge ── */
  .skill-mastery-badge {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--gold);
    background: rgba(138,100,32,0.1);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 4px;
    white-space: nowrap;
  }

  /* ── Skill slot count ── */
  .skill-slot-count {
    font-size: 10px;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    margin-left: 6px;
    letter-spacing: 1px;
  }

  /* ── Skillbook modal ── */
  .skillbook-modal {
    display: flex;
    flex-direction: column;
    max-height: 88vh;
    max-width: 480px;
  }
  .skillbook-header { display: flex; justify-content: space-between; align-items: center; }
  .skillbook-counter { font-family: 'Cinzel', serif; font-size: 10px; color: var(--gold); letter-spacing: 1px; }
  .skillbook-list { flex: 1; overflow-y: auto; margin: 8px 0; padding-right: 2px; }
  .skillbook-list::-webkit-scrollbar { width: 3px; }
  .skillbook-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  /* ── Skill rows (in skillbook modal) ── */
  .skill-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    transition: border-color 0.12s;
  }
  .skill-row.equipped { border-color: var(--border-dark); background: var(--paper); }
  .skill-row + .skill-row { margin-top: 5px; }

  .skill-info { flex: 1; overflow: hidden; min-width: 0; }
  .skill-name { font-size: 14px; color: var(--ink); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .skill-name.sm { font-size: 13px; }
  .skill-desc { font-size: 12px; color: var(--ink-dim); font-style: italic; margin-top: 2px; line-height: 1.4; white-space: normal; }

  .skill-meta-row { display: flex; gap: 5px; margin-top: 4px; flex-wrap: wrap; align-items: center; }
  .skill-meta-tag {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.5px;
    padding: 2px 6px;
    border-radius: 2px;
    border: 1px solid;
  }
  .skill-meta-tag.passive { border-color: var(--green); color: var(--green-light); background: rgba(36,56,32,0.08); }
  .skill-meta-tag.type    { border-color: var(--border-dark); color: var(--gold); background: rgba(138,100,32,0.06); }
  .skill-meta-tag.power   { border-color: var(--red-dim); color: var(--red); background: rgba(122,28,28,0.06); }
  .skill-meta-primary { opacity: 0.6; }

  .skill-costs { font-size: 11px; color: var(--ink-dim); margin-top: 3px; font-family: 'Cinzel', serif; letter-spacing: 0.5px; }

  .skill-row-actions { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
  .skill-action-btn {
    width: 24px; height: 24px;
    border-radius: 2px;
    border: 1px solid var(--border);
    background: var(--paper);
    font-size: 13px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.12s;
    color: var(--ink-dim);
    font-family: monospace;
  }
  .skill-action-btn.equip:hover:not(:disabled)  { border-color: var(--border-dark); color: var(--gold); }
  .skill-action-btn.unequip:hover { border-color: var(--red-dim); color: var(--red); }
  .skill-action-btn.delete:hover  { border-color: var(--red-dim); color: var(--red); }
  .skill-action-btn:disabled      { opacity: 0.2; cursor: not-allowed; }

  /* ── Equipped skill rows (mobile list) ── */
  .equipped-skill-list { display: flex; flex-direction: column; gap: 5px; }
  .equipped-skill-row {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 9px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .equipped-skill-row.passive { opacity: 0.8; }
  .skill-inline-meta { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 2px; align-items: center; }
  .skill-group-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--gold);
    text-transform: uppercase;
    margin: 5px 0 3px;
  }
  .skill-group-label:first-child { margin-top: 0; }

  /* ── Add skill modal extras ── */
  .skill-passive-row { margin-bottom: 10px; }
  .skill-toggle-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: var(--ink);
  }
  .skill-toggle-label input[type="checkbox"] {
    width: 15px; height: 15px;
    accent-color: var(--gold);
    cursor: pointer;
  }
`;