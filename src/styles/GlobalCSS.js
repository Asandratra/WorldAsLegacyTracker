const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');`;

export const globalCss = `
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

  /* ── Dice Roller ── */
  .dice-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
  .dice-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .dice-label {
    flex: 1;
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dim);
    letter-spacing: 1px;
    min-width: 40px;
  }
  .dice-controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .dice-btn {
    width: 28px;
    height: 28px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-family: 'Cinzel', serif;
    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.12s;
  }
  .dice-btn:hover:not(:disabled) {
    border-color: var(--gold-dim);
    color: var(--gold);
  }
  .dice-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .dice-count {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: var(--gold);
    font-weight: 600;
    min-width: 24px;
    text-align: center;
  }
  .dice-pool {
    background: rgba(201,151,58,0.05);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 12px;
    margin-bottom: 10px;
    font-size: 13px;
  }
  .dice-pool-label { color: var(--text-dim); margin-bottom: 6px; }
  .dice-pool-content { display: flex; justify-content: space-between; align-items: center; }
  .dice-pool-formula { color: var(--gold); font-weight: 600; }
  .dice-range { display: flex; gap: 12px; font-size: 12px; }
  .dice-range-item { display: flex; flex-direction: column; }
  .dice-range-label { color: var(--text-dim); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
  .dice-range-value { color: var(--gold); font-weight: 600; font-family: 'Cinzel', serif; }
  .dice-result {
    background: linear-gradient(135deg, rgba(201,151,58,0.2), rgba(201,151,58,0.08));
    border: 2px solid var(--gold);
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    letter-spacing: 2px;
  }
  .dice-history {
    margin-top: 12px;
    padding: 10px;
    background: rgba(201,151,58,0.03);
    border: 1px solid var(--border);
    border-radius: 3px;
  }
  .dice-history-title {
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
    font-weight: 600;
  }
  .dice-history-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 200px;
    overflow-y: auto;
  }
  .dice-history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 12px;
  }
  .dice-history-formula {
    color: var(--text-dim);
    font-size: 11px;
  }
  .dice-history-value {
    color: var(--gold);
    font-weight: 600;
    font-family: 'Cinzel', serif;
    font-size: 13px;
  }
  .dice-history-time {
    color: var(--text-dim);
    font-size: 10px;
    margin-left: 8px;
  }

  /* ── Inventory ── */
  .inv-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .inv-add-btn {
    padding: 4px 10px;
    border: 1px dashed var(--gold-dim);
    background: transparent;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s;
  }
  .inv-add-btn:hover { background: rgba(201,151,58,0.1); border-style: solid; }

  .inv-list { display: flex; flex-direction: column; gap: 6px; }
  .inv-empty {
    text-align: center;
    padding: 20px;
    color: var(--text-dim);
    font-style: italic;
    font-size: 14px;
    border: 1px dashed var(--border);
    border-radius: 3px;
  }

  .inv-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 3px;
    transition: border-color 0.15s;
  }
  .inv-item:hover { border-color: var(--gold-dim); }

  .inv-kind-badge {
    flex-shrink: 0;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.5px;
    color: var(--text-dim);
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 2px 5px;
    min-width: 28px;
    text-align: center;
  }
  .inv-kind-badge.weapon { color: var(--red); border-color: var(--red-dim); }
  .inv-kind-badge.equipment { color: var(--gold-dim); border-color: var(--gold-dim); }

  .inv-info { flex: 1; overflow: hidden; }
  .inv-name {
    font-size: 14px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inv-desc {
    font-size: 12px;
    color: var(--text-dim);
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
  }
  .inv-sub {
    font-size: 11px;
    color: var(--gold-dim);
    margin-top: 2px;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.5px;
  }

  .inv-qty-controls {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  .inv-qty-btn {
    width: 22px; height: 22px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-dim);
    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.12s;
    font-family: monospace;
    line-height: 1;
  }
  .inv-qty-btn:hover { border-color: var(--gold-dim); color: var(--gold); }
  .inv-qty-btn.remove:hover { border-color: var(--red); color: var(--red); }
  .inv-qty-num {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    color: var(--gold);
    min-width: 18px;
    text-align: center;
  }
  .inv-delete-btn {
    width: 22px; height: 22px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-dim);
    font-size: 13px;
    cursor: pointer;
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.4;
    transition: all 0.12s;
    flex-shrink: 0;
  }
  .inv-delete-btn:hover { opacity: 1; color: var(--red); border-color: var(--red-dim); }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 16px;
  }
  .modal {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  .modal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  }
  .modal-title {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .modal-kind-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }
  .modal-kind-tab {
    flex: 1;
    padding: 6px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s;
  }
  .modal-kind-tab.active { border-color: var(--gold); color: var(--gold); background: rgba(201,151,58,0.08); }
  .modal-kind-tab:hover:not(.active) { border-color: var(--gold-dim); color: var(--text); }

  .modal-field { margin-bottom: 12px; }
  .modal-field .label { margin-bottom: 4px; }

  .modal-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .modal-row .modal-field { flex: 1; margin-bottom: 0; }

  .modal-footer {
    display: flex;
    gap: 8px;
    margin-top: 18px;
  }
  .modal-footer .btn { margin-top: 0; }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a6a52'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 28px;
    cursor: pointer;
  }
`;

export const equipmentCss = `
  /* ── Equipment Panel ── */
  .equip-grid {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .equip-slot {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 3px;
    min-height: 48px;
    transition: border-color 0.15s;
  }
  .equip-slot.filled { border-color: var(--gold-dim); }

  .equip-slot-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--text-dim);
    text-transform: uppercase;
    width: 62px;
    flex-shrink: 0;
  }

  .equip-slot-content {
    flex: 1;
    overflow: hidden;
  }
  .equip-slot-empty {
    font-size: 13px;
    color: var(--text-dim);
    font-style: italic;
  }
  .equip-slot-name {
    font-size: 14px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .equip-slot-desc {
    font-size: 11px;
    color: var(--text-dim);
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
  }
  .equip-slot-sub {
    font-size: 10px;
    color: var(--gold-dim);
    font-family: 'Cinzel', serif;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  .equip-slot-tag {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 5px;
    border: 1px solid var(--gold-dim);
    border-radius: 2px;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--gold-dim);
    vertical-align: middle;
  }

  .equip-slot-dual {
    border-color: var(--gold-dim);
  }

  .equip-unequip-btn {
    flex-shrink: 0;
    padding: 3px 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.12s;
  }
  .equip-unequip-btn:hover { border-color: var(--red-dim); color: var(--red); }

  .equip-section-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--gold-dim);
    text-transform: uppercase;
    margin: 10px 0 4px;
  }

  /* Equip button inside inventory rows */
  .inv-equip-btn {
    flex-shrink: 0;
    padding: 3px 8px;
    border: 1px solid var(--gold-dim);
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
  .inv-equip-btn:hover { background: rgba(201,151,58,0.12); }
  .inv-equip-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    border-color: var(--border);
    color: var(--text-dim);
  }
`;