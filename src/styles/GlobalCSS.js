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

/* ── Radar Chart Extensions ── */
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
  font-size: 8px;
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

/* ── Stat Sheet Modal Styling ── */
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
}
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
`;

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

export const powerModCss = `
  /* ── DiceInput ── */
  .dice-input-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .dice-input-count {
    width: 38px !important;
    text-align: center;
    padding: 4px 4px !important;
    font-family: 'Cinzel', serif;
    font-size: 13px;
  }
  .dice-input-faces {
    width: 38px !important;
    text-align: center;
    padding: 4px 4px !important;
    font-family: 'Cinzel', serif;
    font-size: 13px;
  }
  .dice-input-sep {
    font-family: 'IM Fell English', serif;
    font-size: 14px;
    color: var(--ink-dim);
    user-select: none;
  }

  /* ── Power fields grid in AddItemModal ── */
  .power-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .power-field-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .power-field-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--ink-dim);
  }

  /* ── StatModifierEditor ── */
  .stat-mod-editor {
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
  }
  .stat-mod-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--paper-dark);
    border: none;
    cursor: pointer;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--ink-dim);
    transition: background 0.12s;
  }
  .stat-mod-toggle:hover { background: var(--paper-deep); color: var(--ink); }
  .stat-mod-count {
    margin-left: auto;
    font-size: 9px;
    color: var(--gold);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 5px;
  }
  .stat-mod-chevron { font-size: 9px; color: var(--ink-faint); }
  .stat-mod-body {
    padding: 10px 12px;
    background: var(--paper);
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 260px;
    overflow-y: auto;
  }
  .stat-mod-body::-webkit-scrollbar { width: 3px; }
  .stat-mod-body::-webkit-scrollbar-thumb { background: var(--border); }
  .stat-mod-group-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 6px;
  }
  .stat-mod-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
  .stat-mod-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 6px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .stat-mod-key {
    font-size: 11px;
    color: var(--ink-mid);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-style: italic;
  }
  .stat-mod-controls {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }
  .stat-mod-btn {
    width: 18px; height: 18px;
    border: 1px solid var(--border);
    background: var(--paper);
    color: var(--ink-dim);
    font-size: 12px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    font-family: monospace;
    transition: all 0.1s;
    line-height: 1;
  }
  .stat-mod-btn:hover { border-color: var(--border-dark); color: var(--ink); }
  .stat-mod-input {
    width: 34px !important;
    text-align: center;
    padding: 2px 2px !important;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    border-radius: 2px;
  }
  .stat-mod-input.positive { color: var(--green-light); border-color: var(--green); }
  .stat-mod-input.negative { color: var(--red);         border-color: var(--red-dim); }

  /* ── Mod line in equip/inventory sublines ── */
  .equip-slot-sub.mod-line { color: var(--blue-light); font-style: italic; }
  .inv-sub.mod-line { color: var(--blue-light); font-style: italic; }

  /* ── Stat detail column in edit modal ── */
  .stat-detail-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
    min-width: 72px;
  }
  .stat-total-display {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    color: var(--ink-mid);
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .stat-mod-inline {
    font-size: 11px;
    font-family: 'Cinzel', serif;
  }
  .stat-mod-inline.pos { color: var(--green-light); }
  .stat-mod-inline.neg { color: var(--red); }
  .stat-equals {
    color: var(--ink);
    font-weight: 600;
    font-size: 13px;
  }
  .stat-dice-bonus {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--gold);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 4px;
    background: rgba(138,100,32,0.06);
    letter-spacing: 0.5px;
  }
`;
export const statDisplayCss = `
  /* ── Stat section tabs ── */
  .stat-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
  }
  .stat-tab {
    flex: 1;
    padding: 5px 4px;
    border: 1px solid var(--border);
    background: var(--paper-dark);
    color: var(--ink-dim);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
  }
  .stat-tab.active {
    border-color: var(--border-dark);
    color: var(--gold);
    background: var(--paper);
  }
  .stat-tab:hover:not(.active) {
    border-color: var(--border-dark);
    color: var(--ink);
  }

  /* ── Stat list (display) ── */
  .stat-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 8px;
    border-radius: 2px;
    transition: background 0.1s;
  }
  .stat-row:nth-child(odd)  { background: rgba(200,160,60,0.06); }
  .stat-row:nth-child(even) { background: transparent; }
  .stat-row:hover           { background: rgba(200,160,60,0.12); }

  .stat-row-label {
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    color: var(--ink-mid);
    flex: 1;
    min-width: 0;
  }

  .stat-row-values {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }

  .stat-row-base {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: var(--ink);
    min-width: 22px;
    text-align: right;
  }

  .stat-row-mod {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    min-width: 24px;
    text-align: center;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .stat-row-mod.pos { color: var(--green-light); background: rgba(36,56,32,0.1); border: 1px solid var(--green); }
  .stat-row-mod.neg { color: var(--red);         background: rgba(122,28,28,0.08); border: 1px solid var(--red-dim); }

  .stat-row-sep {
    font-family: 'IM Fell English', serif;
    font-size: 12px;
    color: var(--ink-faint);
  }

  .stat-row-total {
    font-family: 'Cinzel', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    min-width: 26px;
    text-align: right;
  }

  .stat-row-bonus {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--gold);
    background: rgba(138,100,32,0.08);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 5px;
    letter-spacing: 0.5px;
    min-width: 32px;
    text-align: center;
  }

  /* ── Technique group labels ── */
  .tech-stat-group {
    margin-bottom: 6px;
  }
  .tech-stat-group-label {
    font-family: 'IM Fell English', serif;
    font-size: 13px;
    color: var(--gold);
    letter-spacing: 1.5px;
    padding: 4px 8px 2px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2px;
  }

  /* ── Stat edit modal ── */
  .stat-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(30,15,0,0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 16px;
  }
  .stat-modal-content {
    background: var(--paper);
    border: 1px solid var(--border-dark);
    border-radius: 3px;
    padding: 20px;
    width: 100%;
    max-width: 480px;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(30,15,0,0.45);
  }
  .stat-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }
  .stat-modal-header h3 {
    font-family: 'IM Fell English', serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 1px;
  }
  .stat-modal-close {
    border: none;
    background: transparent;
    font-size: 22px;
    color: var(--ink-dim);
    cursor: pointer;
    line-height: 1;
    padding: 0 4px;
    transition: color 0.12s;
  }
  .stat-modal-close:hover { color: var(--red); }
  .stat-modal-footer {
    margin-top: 14px;
    border-top: 1px solid var(--border);
    padding-top: 12px;
  }

  /* ── Stat edit list (in modal) ── */
  .stat-edit-list {
    overflow-y: auto;
    flex: 1;
    padding-right: 4px;
  }
  .stat-edit-list::-webkit-scrollbar { width: 3px; }
  .stat-edit-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .stat-edit-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 4px;
    border-bottom: 1px solid rgba(192,160,96,0.2);
  }
  .stat-edit-row:last-child { border-bottom: none; }

  .stat-edit-label {
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    color: var(--ink-mid);
    flex: 1;
    min-width: 0;
  }

  .stat-edit-counter {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .stat-edit-btn {
    width: 26px; height: 26px;
    border: 1px solid var(--border);
    background: var(--paper-dark);
    color: var(--ink-dim);
    font-size: 16px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.1s;
    font-family: monospace;
    line-height: 1;
  }
  .stat-edit-btn:hover { border-color: var(--border-dark); color: var(--ink); }

  .stat-edit-input {
    width: 48px !important;
    text-align: center;
    padding: 4px !important;
    font-family: 'Cinzel', serif;
    font-size: 14px;
    font-weight: 600;
  }

  .stat-edit-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    min-width: 90px;
    justify-content: flex-end;
  }

  /* ── Vital breakdown display (HP/MP + modifiers) ── */
  .vital-base-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
    padding: 4px 0;
  }
  .vital-base-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--ink-dim);
    text-transform: uppercase;
  }
  .vital-base-controls {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .vital-base-val {
    font-family: 'Cinzel', serif;
    font-size: 14px;
    color: var(--ink);
    min-width: 24px;
    text-align: center;
  }
  .vital-base-edit {
    width: 22px; height: 22px;
    border: 1px solid var(--border);
    background: var(--paper-dark);
    color: var(--ink-dim);
    font-size: 13px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.1s;
    font-family: monospace;
    line-height: 1;
  }
  .vital-base-edit:hover { border-color: var(--border-dark); color: var(--ink); }

  .vital-effective {
    font-family: 'Cinzel', serif;
    font-size: 14px;
    color: var(--ink);
    min-width: 32px;
    text-align: center;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 4px 6px;
  }
  .vital-breakdown {
    font-size: 11px;
    color: var(--ink-dim);
    font-style: italic;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .vital-breakdown-inline {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .vital-mod-tag {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    padding: 1px 4px;
    border-radius: 2px;
    border: 1px solid;
  }
  .vital-mod-tag.pos { color: var(--green-light); border-color: var(--green); }
  .vital-mod-tag.neg { color: var(--red); border-color: var(--red-dim); }
  .vital-equals {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: var(--ink);
    font-weight: 600;
  }
  .exhausted-warning {
    margin-top: 8px;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--red);
  }
  /* ── Combined HP + Armor bar ── */
  .combined-bar-track {
    flex: 1;
    height: 12px;
    background: var(--paper-deep);
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: visible;
    position: relative;
    display: flex;
  }

  /* HP segment — left portion, red fill */
  .combined-bar-hp {
    height: 100%;
    background: linear-gradient(90deg, var(--red-dim), var(--red));
    border-radius: 2px 0 0 2px;
    transition: width 0.25s ease;
    flex-shrink: 0;
  }

  /* Armor segment — continues right of HP, bronze/gold fill */
  .combined-bar-armor {
    height: 100%;
    background: linear-gradient(90deg, #8a6820, #c4a040);
    transition: width 0.25s ease;
    flex-shrink: 0;
    border-radius: 0 2px 2px 0;
  }

  /* Vertical divider tick between HP zone and Armor zone */
  .combined-bar-divider {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    background: var(--border-dark);
    transform: translateX(-1px);
    pointer-events: none;
    border-radius: 1px;
  }

  /* Armor badge next to the HP numbers */
  .armor-badge {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.5px;
    color: #8a6820;
    background: rgba(138,100,32,0.1);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 2px 6px;
    margin-left: 4px;
    white-space: nowrap;
  }

  /* Small reminder line below the bar */
  .armor-note {
    font-size: 10px;
    color: var(--ink-faint);
    font-style: italic;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
  }



  /* ── Technique category selector tabs ── */
  .tech-category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 10px;
  }
  .tech-category-tab {
    padding: 4px 9px;
    border: 1px solid var(--border);
    background: var(--paper-dark);
    color: var(--ink-dim);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
    white-space: nowrap;
  }
  .tech-category-tab:hover { border-color: var(--border-dark); color: var(--ink); }
  .tech-category-tab.active {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(138,100,32,0.08);
  }

  /* ── Unified VitalsCard ── */
  .vitals-card { }

  .vitals-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vitals-settings-btn {
    border: 1px solid var(--border);
    background: transparent;
    color: var(--ink-dim);
    font-size: 14px;
    width: 26px; height: 26px;
    border-radius: 2px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.12s;
    flex-shrink: 0;
  }
  .vitals-settings-btn:hover { border-color: var(--border-dark); color: var(--ink); }

  .vitals-quick-row {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }
  .vitals-quick-row .delta-row {
    margin-top: 0;
    flex: 1;
    min-width: 0;
  }

  .vitals-setting-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .vitals-setting-row .stat-edit-input {
    flex: 1;
  }
`;

export const masteryAttackCss = `
  /* ── Weapon attack buttons ── */
  .weapon-attack-row {
    display: flex;
    gap: 4px;
    margin-top: 6px;
    flex-wrap: wrap;
  }

  .weapon-attack-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border: 1px solid var(--border);
    background: var(--paper-dark);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
    color: var(--ink-dim);
  }
  .weapon-attack-btn:hover         { border-color: var(--border-dark); color: var(--ink); }
  .weapon-attack-btn.slash:hover   { border-color: var(--red-dim); color: var(--red); background: rgba(122,28,28,0.06); }
  .weapon-attack-btn.blunt:hover   { border-color: #6a4a20; color: #b07830; background: rgba(106,74,32,0.06); }
  .weapon-attack-btn.pierce:hover  { border-color: var(--blue-light); color: var(--blue-light); background: rgba(36,48,88,0.06); }

  .attack-btn-label { font-size: 9px; letter-spacing: 1.5px; }
  .attack-btn-bonus {
    font-size: 8px;
    color: var(--gold);
    background: rgba(138,100,32,0.12);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 0 3px;
  }

  /* ── Weapon mastery summary bar ── */
  .weapon-mastery-bar {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--border);
  }

  .mastery-pill {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    font-family: 'Cinzel', serif;
    font-size: 10px;
  }
  .mastery-pill-label { color: var(--ink-dim); letter-spacing: 1px; text-transform: capitalize; }
  .mastery-pill-val   { color: var(--ink); font-weight: 600; min-width: 20px; text-align: right; }
  .mastery-pill-bonus {
    color: var(--gold);
    background: rgba(138,100,32,0.1);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 0 4px;
    font-size: 9px;
  }

  /* ── Tech bonus pill on skill cells ── */
  .skill-cost-pill.pwr  { border-color: #6a3a00; color: #c06810; background: rgba(106,58,0,0.08); }
  .skill-cost-pill.tech { border-color: var(--green); color: var(--green-light); background: rgba(36,56,32,0.08); }

  /* ── Radar SVG ── */
  .radar-svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }

  .radar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 4px 0 2px;
  }

  /* Grid */
  .radar-spoke {
    stroke: var(--border);
    stroke-width: 0.8;
    stroke-dasharray: 3 3;
  }
  .radar-ring {
    fill: none;
    stroke: var(--border);
    stroke-width: 0.6;
    opacity: 0.6;
  }

  /* Blue polygon — base stats */
  .radar-poly-base {
    fill: rgba(52, 80, 160, 0.25);
    stroke: #6878d0;
    stroke-width: 1.5;
    stroke-linejoin: round;
  }

  /* Gold polygon — base + equipment total */
  .radar-poly-mod {
    fill: rgba(180, 130, 30, 0.18);
    stroke: #c4a040;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-dasharray: 5 3;
  }

  /* Axis labels */
  .radar-label-name {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    fill: var(--ink-dim);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .radar-label-val {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    font-weight: 600;
    fill: var(--ink);
  }

  /* Legend */
  .radar-legend {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  .radar-legend-item {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--ink-dim);
  }
  .radar-legend-item.base { color: #6878d0; }
  .radar-legend-item.mod  { color: #c4a040; }
  
  /* ── Attack panel card ── */
  .attack-panel-card { }

  /* ── Attack grid 6 (desktop) ── */
  .attack-grid-6 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 0;
  }

  /* On mobile, hide the grid and show the flat list instead */
  .attack-list-mobile { display: flex; flex-direction: column; gap: 5px; }

  @media (max-width: 1024px) and (min-width: 600px) {
    .attack-grid-6 {
      grid-template-columns: repeat(2, 1fr);
    }
    .attack-list-mobile { display: none; }
  }

  @media (min-width: 600px) {
    .attack-list-mobile { display: none; }
  }
  
  @media (max-width: 599px) {
    .attack-grid-6 { display: none; }
  }

  @media (max-width: 380px) {
    .attack-list-row {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      text-align: center;
    }
    .attack-list-row .attack-btn {
      width: 100%;
    }
  }

  /* ── Attack cell (grid item) ── */
  .attack-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px 9px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
    min-height: 100px;
    transition: border-color 0.12s;
  }
  .attack-cell.empty {
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
    min-height: 80px;
  }
  .attack-cell-empty-label { font-family: 'IM Fell English', serif; font-size: 18px; color: var(--ink-faint); }

  /* ── Attack cell top section ── */
  .attack-cell-top {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .attack-type-label {
    flex: 1;
    font-size: 13px;
    color: var(--ink);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Crimson Text', serif;
  }
  
  /* ── Mastery badge ── */
  .mastery-badge {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--red);
    background: rgba(122,28,28,0.1);
    border: 1px solid var(--red-dim);
    border-radius: 2px;
    padding: 1px 4px;
    white-space: nowrap;
  }

  /* ── Mastery bar ── */
  .attack-cell-mastery {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .mastery-bar-container {
    height: 8px;
    background: var(--paper);
    border: 1px solid var(--border-dark);
    border-radius: 1px;
    overflow: hidden;
    position: relative;
  }
  .mastery-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    border-radius: 1px;
    transition: width 0.3s;
  }
  .mastery-text {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    color: var(--ink-dim);
    text-align: center;
    letter-spacing: 0.5px;
  }

  /* ── Attack button ── */
  .attack-btn {
    flex-shrink: 0;
    padding: 6px 12px; /* Marginally larger touch target for phones */
    border: 1px solid var(--border-dark);
    background: transparent;
    color: var(--red);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
    text-align: center;
    width: auto; /* Overrides the destructive width: 100% inside flex rows */
  }
  .attack-btn:hover { background: rgba(122,28,28,0.1); border-color: var(--red-dim); }
  .attack-btn:disabled { opacity: 0.25; cursor: not-allowed; border-color: var(--border); color: var(--ink-faint); }
  .attack-cell .attack-btn {
    margin-top: auto;
    width: 100%;
  }

  /* ── Attack list row (mobile) ── */
  .attack-list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .attack-info {
    flex: 1;
    min-width: 0;
  }
  .attack-name {
    font-size: 14px;
    color: var(--ink);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .attack-mastery-text {
    font-size: 11px;
    color: var(--ink-dim);
    margin-top: 2px;
    font-family: 'Cinzel', serif;
  }
`;

export const encounterCss = `
  /* ── Encounter shell ── */
  .enc-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--paper-dark);
    background-image:
      radial-gradient(ellipse at 50% 0%, rgba(180,120,30,0.18) 0%, transparent 60%);
  }

  /* ── Top bar ── */
  .enc-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: var(--paper);
    border-bottom: 2px solid var(--border-dark);
    box-shadow: 0 2px 8px var(--shadow);
    gap: 16px;
    flex-shrink: 0;
  }
  .enc-topbar-left  { display: flex; align-items: center; gap: 14px; }
  .enc-topbar-right { display: flex; align-items: center; gap: 8px; }
  .enc-topbar-title {
    font-family: 'IM Fell English', serif;
    font-size: 22px;
    letter-spacing: 4px;
    color: var(--ink);
    text-transform: uppercase;
    flex: 1;
    text-align: center;
  }
  .enc-turn-badge {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--gold);
    border: 1px solid var(--border-dark);
    border-radius: 3px;
    padding: 4px 12px;
    background: rgba(138,100,32,0.08);
    letter-spacing: 1px;
  }
  .enc-turn-info {
    font-size: 12px;
    color: var(--ink-dim);
    font-style: italic;
  }
  .enc-btn {
    padding: 7px 16px;
    border: 1px solid var(--border-dark);
    background: var(--paper-dark);
    color: var(--ink-mid);
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s;
  }
  .enc-btn:hover       { background: var(--paper); color: var(--ink); }
  .enc-btn.next        { border-color: var(--gold); color: var(--gold); }
  .enc-btn.next:hover  { background: rgba(138,100,32,0.1); }
  .enc-btn.end         { border-color: var(--red-dim); color: var(--red); }
  .enc-btn.end:hover   { background: rgba(122,28,28,0.08); }

  /* ── Three-column body ── */
  .enc-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr minmax(220px, 320px) 1fr;
    gap: 0;
    min-height: 0;
  }
  @media (max-width: 860px) {
    .enc-body { grid-template-columns: 1fr; }
  }

  /* ── Combatant panel (left / right) ── */
  .enc-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    background: var(--paper);
    overflow: hidden;
  }
  .enc-panel:last-child { border-right: none; border-left: 1px solid var(--border); }

  .enc-panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px 10px;
    border-bottom: 1px solid var(--border);
    background: var(--paper-dark);
    flex-shrink: 0;
  }
  .enc-panel-title {
    font-family: 'IM Fell English', serif;
    font-size: 16px;
    letter-spacing: 2px;
    color: var(--ink);
    flex: 1;
  }
  .enc-panel-title.opponent { color: var(--red); }
  .enc-panel-title.party    { color: var(--gold); }

  .enc-panel-actions { display: flex; gap: 6px; }
  .enc-panel-btn {
    padding: 4px 10px;
    border: 1px dashed var(--border-dark);
    background: transparent;
    color: var(--ink-dim);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
  }
  .enc-panel-btn:hover { border-style: solid; color: var(--ink); }

  .enc-combatant-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .enc-combatant-list::-webkit-scrollbar { width: 3px; }
  .enc-combatant-list::-webkit-scrollbar-thumb { background: var(--border); }

  /* ── Combatant card ── */
  .enc-combatant-card {
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 8px 10px;
    transition: border-color 0.12s;
  }
  .enc-combatant-card.has-action { border-color: var(--gold-faint); }
  .enc-combatant-header { display: flex; align-items: center; gap: 8px; }

  .enc-combatant-info {
    flex: 1;
    cursor: pointer;
    min-width: 0;
  }
  .enc-combatant-info:hover .enc-combatant-name { color: var(--gold); }

  .enc-combatant-name {
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    color: var(--ink);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.12s;
  }
  .enc-combatant-react {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: var(--ink-dim);
    letter-spacing: 1px;
    margin-top: 1px;
  }

  .enc-combatant-btns {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
  .enc-add-action-btn {
    padding: 3px 8px;
    border: 1px solid var(--border-dark);
    background: transparent;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
    white-space: nowrap;
  }
  .enc-add-action-btn:hover { background: rgba(138,100,32,0.1); }

  .enc-action-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(138,100,32,0.1);
    border: 1px solid var(--gold-faint);
    border-radius: 2px;
    padding: 2px 8px;
    max-width: 120px;
  }
  .enc-action-name {
    font-family: 'Crimson Text', serif;
    font-size: 13px;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .enc-action-tu {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--gold);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .enc-remove-btn {
    width: 20px; height: 20px;
    border: none;
    background: transparent;
    color: var(--ink-faint);
    font-size: 12px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.5;
    transition: all 0.1s;
    flex-shrink: 0;
  }
  .enc-remove-btn:hover { opacity: 1; color: var(--red); }

  /* ── Order panel (center) ── */
  .enc-order-panel {
    display: flex;
    flex-direction: column;
    background: var(--paper-dark);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    overflow: hidden;
  }
  .enc-order-header {
    font-family: 'IM Fell English', serif;
    font-size: 16px;
    letter-spacing: 2px;
    color: var(--ink);
    padding: 12px 14px 10px;
    border-bottom: 1px solid var(--border);
    background: var(--paper);
    flex-shrink: 0;
    text-align: center;
  }
  .enc-order-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .enc-order-list::-webkit-scrollbar { width: 3px; }
  .enc-order-list::-webkit-scrollbar-thumb { background: var(--border); }
  .enc-order-empty {
    margin: 20px 10px;
    text-align: center;
    line-height: 1.8;
  }

  /* ── Order card ── */
  .enc-order-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 3px;
    border-left-width: 3px;
  }
  .enc-order-card.party    { border-left-color: var(--gold); }
  .enc-order-card.opponent { border-left-color: var(--red); }

  .enc-order-rank {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: var(--ink-faint);
    width: 22px;
    flex-shrink: 0;
    text-align: center;
  }
  .enc-order-body { flex: 1; min-width: 0; }
  .enc-order-who {
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .enc-order-what {
    font-size: 12px;
    color: var(--ink-dim);
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .enc-order-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }
  .enc-order-tu {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: var(--gold);
    background: rgba(138,100,32,0.08);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 5px;
  }
  .enc-order-react {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--ink-faint);
    letter-spacing: 0.5px;
  }

  /* ── Empty state ── */
  .enc-empty {
    font-style: italic;
    color: var(--ink-faint);
    font-size: 13px;
    padding: 14px;
    border: 1px dashed var(--border);
    border-radius: 2px;
    text-align: center;
    line-height: 1.6;
  }

  /* ── Launch button on sheet page ── */
  .enc-launch-row {
    display: flex;
    justify-content: center;
    padding: 24px 0 8px;
  }
  .enc-launch-row .btn {
    flex: none;
    padding: 10px 28px;
    font-size: 12px;
    letter-spacing: 2px;
  }
  /* ── TU budget row in AddActionModal ── */
  .enc-tu-budget-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 6px 10px;
    background: var(--paper-dark);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .enc-tu-budget-label {
    font-size: 12px;
    color: var(--ink-dim);
    font-style: italic;
  }
  .enc-tu-budget-val {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: var(--gold);
    letter-spacing: 1px;
  }

  /* ── TU bar on combatant card ── */
  .enc-tu-bar-wrap {
    height: 4px;
    background: var(--paper-deep);
    border-radius: 2px;
    overflow: hidden;
    margin: 5px 0 4px;
  }
  .enc-tu-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.2s ease;
  }

  /* ── TU counter badge on card header ── */
  .enc-tu-counter {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.5px;
    color: var(--ink-faint);
    padding: 2px 5px;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: var(--paper);
    white-space: nowrap;
  }

  /* ── Action entries list on combatant card ── */
  .enc-action-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 4px;
  }
  .enc-action-entry {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 6px;
    background: rgba(138,100,32,0.06);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .enc-action-tu-badge {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    color: var(--gold);
    background: rgba(138,100,32,0.1);
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    padding: 1px 4px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .enc-action-entry-name {
    font-size: 12px;
    color: var(--ink-mid);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .enc-action-remove {
    width: 16px; height: 16px;
    border: none;
    background: transparent;
    color: var(--ink-faint);
    font-size: 10px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.5;
    border-radius: 2px;
    flex-shrink: 0;
    transition: all 0.1s;
  }
  .enc-action-remove:hover { opacity: 1; color: var(--red); }

`;