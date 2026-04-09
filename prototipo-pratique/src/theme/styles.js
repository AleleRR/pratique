import { theme } from "./theme";

/**
 * Global stylesheet — organized by section.
 * All new component styles appended at the end.
 */
export const styles = `
:root {
  /* === BRAND === */
  --color-brand-deep:    #1E2D6F;
  --color-brand-action:  #4361EE;
  --color-brand-hover:   #3451D1;
  --color-brand-active:  #2741BE;
  --color-brand-light:   #C7D2FE;
  --color-brand-subtle:  #EEF2FF;

  /* === NEUTROS === */
  --color-gray-900: #111827;
  --color-gray-800: #1F2937;
  --color-gray-700: #374151;
  --color-gray-600: #4B5563;
  --color-gray-500: #6B7280;
  --color-gray-400: #9CA3AF;
  --color-gray-300: #D1D5DB;
  --color-gray-200: #E5E7EB;
  --color-gray-100: #F3F4F6;
  --color-gray-050: #F9FAFB;
  --color-white:    #FFFFFF;

  /* === SEMÂNTICAS === */
  --color-success-700:    #166534;
  --color-success-100:    #DCFCE7;
  --color-success-border: rgba(22, 101, 52, 0.2);

  --color-error-700:    #991B1B;
  --color-error-100:    #FEE2E2;
  --color-error-border: rgba(153, 27, 27, 0.2);

  --color-warning-700:    #92400E;
  --color-warning-100:    #FEF3C7;
  --color-warning-border: rgba(146, 64, 14, 0.2);

  --color-info-700:    #1E3A5F;
  --color-info-100:    #DBEAFE;
  --color-info-border: rgba(30, 58, 95, 0.2);

  /* === TIPOGRAFIA === */
  --font-heading: 'Space Grotesk', -apple-system, sans-serif;
  --font-body:    'IBM Plex Sans', -apple-system, sans-serif;
  --font-mono:    'IBM Plex Mono', 'Courier New', monospace;
}

/* ═══════════════════════════════════════════
   1. RESET & BASE
   ═══════════════════════════════════════════ */

* { box-sizing: border-box; margin: 0; padding: 0; }


body {
    font-family: var(--font-body);
    background: ${theme.bg};
    color: ${theme.text};
    min-height: 100vh;
}

/* ═══════════════════════════════════════════
   2. SCROLLBAR
   ═══════════════════════════════════════════ */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: ${theme.surface}; }
::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 2px; }

/* ═══════════════════════════════════════════
   3. LAYOUT
   ═══════════════════════════════════════════ */
.app { display: flex; height: 100vh; overflow: hidden; }

/* ═══════════════════════════════════════════
   4. SIDEBAR
   ═══════════════════════════════════════════ */
.sidebar {
    width: 220px; min-width: 220px;
    background: var(--color-brand-deep); border-right: none;
    display: flex; flex-direction: column; padding: 0; transition: all 0.3s ease; z-index: 100;
}
.sidebar-logo {
    padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.15);
}
.logo-badge { display: flex; align-items: center; gap: 10px; }
.logo-icon {
    width: 36px; height: 36px;
    background: var(--color-brand-action);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
.logo-text { font-family: var(--font-heading); font-size: 13px; font-weight: 600; line-height: 1.2; color: rgba(255,255,255,0.95); }
.logo-sub { font-size: 10px; color: rgba(255,255,255,0.45); font-weight: 400; }
.nav { padding: 12px 10px; flex: 1; overflow-y: auto; }
.nav-section-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.35); padding: 8px 10px 4px; font-weight: 600; font-family: var(--font-mono); }
.nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 6px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.65);
    transition: all 0.18s ease; margin-bottom: 2px; border: 1px solid transparent;
}
.nav-item:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.92); }
.nav-item.active { background: rgba(255,255,255,0.14); color: #FFFFFF; border-color: rgba(255,255,255,0.18); }
.nav-item .icon { font-size: 15px; width: 20px; text-align: center; }
.nav-badge { margin-left: auto; background: var(--color-brand-action); color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; }
.sidebar-footer { padding: 12px 10px; border-top: 1px solid rgba(255,255,255,0.1); }
.user-chip { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; background: rgba(255,255,255,0.07); cursor: pointer; }
.avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--color-brand-action); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: white; flex-shrink: 0; }
.user-info { flex: 1; min-width: 0; }
.user-name { font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: rgba(255,255,255,0.9); }
.user-role { font-size: 10px; color: rgba(255,255,255,0.45); }

/* ═══════════════════════════════════════════
   5. MAIN CONTENT
   ═══════════════════════════════════════════ */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar { background: ${theme.surface}; border-bottom: 1px solid ${theme.border}; padding: 12px 24px; display: flex; align-items: center; gap: 16; }
.topbar-title { font-family: var(--font-heading); font-size: 17px; font-weight: 600; color: var(--color-brand-deep); }
.topbar-subtitle { font-size: 12px; color: ${theme.muted}; margin-top: 1px; font-family: var(--font-body); }
.topbar-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.topbar-clock { font-size: 11px; color: ${theme.muted}; font-family: var(--font-mono); white-space: nowrap; }
.search-trigger-btn {
    display: flex; align-items: center; gap: 8px;
    background: ${theme.subtle}; border: 1px solid ${theme.border};
    border-radius: 6px; padding: 7px 12px; cursor: pointer;
    transition: all 0.15s; min-width: 180px;
}
.search-trigger-btn:hover { border-color: ${theme.accent}; }
.search-kbd {
    margin-left: auto; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;
    background: ${theme.surface}; border: 1px solid ${theme.border}; color: ${theme.muted};
    font-family: var(--font-mono);
}
.search-box {
    display: flex; align-items: center; gap: 8px;
    background: ${theme.subtle}; border: 1px solid ${theme.border};
    border-radius: 6px; padding: 7px 12px; width: 200px;
}
.search-box input { background: transparent; border: none; outline: none; color: ${theme.text}; font-size: 13px; width: 100%; font-family: var(--font-body); }
.search-box input::placeholder { color: ${theme.muted}; }
.icon-btn { width: 34px; height: 34px; border-radius: 6px; background: ${theme.subtle}; border: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.15s; position: relative; }
.icon-btn:hover { background: ${theme.accentGlow}; border-color: ${theme.accent}; }
.notif-dot { width: 7px; height: 7px; border-radius: 50%; background: ${theme.danger}; position: absolute; top: 5px; right: 5px; border: 1.5px solid ${theme.surface}; }
.content { flex: 1; overflow-y: auto; padding: 24px; }

/* ═══════════════════════════════════════════
   6. STATS CARDS
   ═══════════════════════════════════════════ */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
.stat-card { background: ${theme.card}; border: 1px solid ${theme.border}; border-radius: 10px; padding: 18px 20px; position: relative; overflow: hidden; transition: border-color 0.2s; }
.stat-card:hover { border-color: ${theme.accent}; }
.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.stat-card.blue::before { background: linear-gradient(90deg, var(--color-brand-action), var(--color-brand-deep)); }
.stat-card.green::before { background: linear-gradient(90deg, var(--color-success-700), #0D9488); }
.stat-card.amber::before { background: linear-gradient(90deg, var(--color-warning-700), #B45309); }
.stat-card.red::before { background: linear-gradient(90deg, var(--color-error-700), #B91C1C); }
.stat-icon { font-size: 22px; margin-bottom: 10px; }
.stat-value { font-family: var(--font-heading); font-size: 28px; font-weight: 600; line-height: 1; color: var(--color-brand-deep); }
.stat-label { font-size: 12px; color: ${theme.muted}; margin-top: 4px; }
.stat-change { font-size: 11px; margin-top: 8px; }
.stat-change.up { color: ${theme.success}; }
.stat-change.down { color: ${theme.danger}; }

/* ═══════════════════════════════════════════
   7. GRID LAYOUTS
   ═══════════════════════════════════════════ */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.grid-3-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 20px; }

/* ═══════════════════════════════════════════
   8. PANEL
   ═══════════════════════════════════════════ */
.panel { background: ${theme.card}; border: 1px solid ${theme.border}; border-radius: 10px; overflow: hidden; transition: border-color 0.2s ease; }
.panel:hover { border-color: var(--color-brand-light); }
.panel-header { padding: 16px 20px; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: space-between; }
.panel-title { font-family: var(--font-heading); font-size: 14px; font-weight: 600; color: var(--color-brand-deep); }
.panel-body { padding: 20px; }

/* ═══════════════════════════════════════════
   9. TABLE
   ═══════════════════════════════════════════ */
.table { width: 100%; border-collapse: collapse; }
.table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${theme.muted}; padding: 0 0 12px; font-weight: 600; border-bottom: 1px solid ${theme.border}; user-select: none; font-family: var(--font-mono); }
.table td { padding: 12px 0; font-size: 13px; border-bottom: 1px solid ${theme.border}; vertical-align: middle; }
.table tr:last-child td { border-bottom: none; }
.table tr { transition: background 0.15s; }
.table tr:hover td { background: var(--color-brand-subtle); }

/* ═══════════════════════════════════════════
   10. BADGE
   ═══════════════════════════════════════════ */
.badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; transition: all 0.2s ease; }
.badge.entregue { background: var(--color-info-100); color: var(--color-info-700); border: 1px solid var(--color-info-border); }
.badge.disponivel { background: var(--color-gray-100); color: var(--color-gray-700); border: 1px solid var(--color-gray-200); }
.badge.bloqueado { background: var(--color-error-100); color: var(--color-error-700); border: 1px solid var(--color-error-border); }
.badge.pendente { background: var(--color-warning-100); color: var(--color-warning-700); border: 1px solid var(--color-warning-border); }
.badge.devolvido { background: var(--color-success-100); color: var(--color-success-700); border: 1px solid var(--color-success-border); }
.badge::before { content: '●'; font-size: 8px; }

/* ═══════════════════════════════════════════
   11. BUTTONS
   ═══════════════════════════════════════════ */
.btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; font-family: var(--font-body); transition: all 0.18s ease; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: ${theme.accent}; color: white; box-shadow: 0 2px 8px rgba(30,111,166,0.25); }
.btn-primary:hover:not(:disabled) { background: ${theme.accentLight}; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,111,166,0.35); }
.btn-ghost { background: transparent; color: ${theme.accent}; border: 1px solid ${theme.accent}; }
.btn-ghost:hover:not(:disabled) { background: ${theme.accentGlow}; }
.btn-sm { padding: 5px 12px; font-size: 12px; }
.btn-success { background: var(--color-success-700); color: white; }
.btn-success:hover:not(:disabled) { opacity: 0.9; }
.btn-danger { background: var(--color-error-100); color: var(--color-error-700); border: 1px solid var(--color-error-border); }
.btn-danger:hover:not(:disabled) { background: #FCA5A5; }

/* ═══════════════════════════════════════════
   12. FORMS
   ═══════════════════════════════════════════ */
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 12px; font-weight: 500; color: ${theme.muted}; margin-bottom: 6px; font-family: var(--font-body); }
.form-control { width: 100%; padding: 10px 14px; border-radius: 6px; background: ${theme.surface}; border: 1px solid ${theme.border}; color: ${theme.text}; font-size: 13px; outline: none; font-family: var(--font-body); transition: border-color 0.15s; }
.form-control:focus { border-color: ${theme.accent}; box-shadow: 0 0 0 3px var(--color-brand-subtle); }
.form-control option { background: ${theme.surface}; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ═══════════════════════════════════════════
   13. MODAL
   ═══════════════════════════════════════════ */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
.modal { background: ${theme.surface}; border: 1px solid ${theme.border}; border-radius: 12px; width: 480px; max-width: 95vw; animation: slideUp 0.25s ease; max-height: 85vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
.modal-header { padding: 20px 24px; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-family: var(--font-heading); font-size: 16px; font-weight: 600; color: var(--color-brand-deep); }
.modal-body { padding: 24px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid ${theme.border}; display: flex; gap: 10px; justify-content: flex-end; }
.close-btn { background: none; border: none; color: ${theme.muted}; font-size: 20px; cursor: pointer; padding: 4px; }
.close-btn:hover { color: ${theme.text}; }

/* ═══════════════════════════════════════════
   14. ACTIVITY FEED
   ═══════════════════════════════════════════ */
.activity-item { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid ${theme.border}; }
.activity-item:last-child { border-bottom: none; }
.activity-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.activity-dot.entrega { background: var(--color-success-100); }
.activity-dot.devolucao { background: var(--color-brand-subtle); }
.activity-dot.alerta { background: var(--color-warning-100); }
.activity-content { flex: 1; }
.activity-text { font-size: 13px; line-height: 1.4; }
.activity-time { font-size: 11px; color: ${theme.muted}; margin-top: 2px; }

/* ═══════════════════════════════════════════
   15. CHART
   ═══════════════════════════════════════════ */
.chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 80px; padding-top: 8px; }
.chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.chart-bar { width: 100%; border-radius: 4px 4px 0 0; background: var(--color-brand-action); opacity: 0.7; transition: opacity 0.2s; min-height: 4px; }
.chart-bar:hover { opacity: 1; }
.chart-label { font-size: 9px; color: ${theme.muted}; }

/* ═══════════════════════════════════════════
   16. STATUS TRACKER
   ═══════════════════════════════════════════ */
.tracker { display: flex; gap: 0; margin: 12px 0; }
.tracker-step { flex: 1; }
.tracker-dot-row { display: flex; align-items: center; }
.tracker-dot { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
.tracker-dot.done { background: var(--color-success-700); color: white; }
.tracker-dot.active { background: ${theme.accent}; color: white; box-shadow: 0 0 0 4px var(--color-brand-subtle); }
.tracker-dot.pending { background: ${theme.border}; color: ${theme.muted}; }
.tracker-line { flex: 1; height: 2px; background: ${theme.border}; }
.tracker-line.done { background: var(--color-success-700); }
.tracker-label { font-size: 10px; color: ${theme.muted}; margin-top: 6px; padding-right: 8px; }
.tracker-label.active { color: ${theme.text}; font-weight: 600; }

/* ═══════════════════════════════════════════
   17. CARD PREVIEW + HOLOGRAPHIC EFFECT
   ═══════════════════════════════════════════ */
.card-preview {
    background: linear-gradient(135deg, #1a2540, #0d1628);
    border: 1px solid ${theme.border}; border-radius: 14px;
    padding: 20px 22px; position: relative; overflow: hidden; height: 120px;
}
.card-preview::before {
    content: ''; position: absolute; top: -30px; right: -20px;
    width: 120px; height: 120px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,110,248,0.25), transparent 70%);
}
.holographic-card { position: relative; }
.holographic-card::after {
    content: ''; position: absolute; inset: 0; border-radius: 14px;
    background: linear-gradient(135deg, rgba(168,85,247,0.0), rgba(59,110,248,0.15), rgba(16,201,143,0.1), rgba(245,158,11,0.1), transparent);
    background-size: 400% 400%; opacity: 0; transition: opacity 0.3s;
    pointer-events: none;
}
.holographic-card:hover::after { opacity: 1; animation: holographicShift 3s ease infinite; }

@keyframes holographicShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.card-chip { width: 30px; height: 22px; background: linear-gradient(135deg, #d4af37, #b8860b); border-radius: 4px; margin-bottom: 16px; }
.card-number { font-family: 'Space Grotesk', sans-serif; font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.7); }
.card-holder { font-size: 10px; color: ${theme.muted}; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
.card-badge-status { position: absolute; top: 14px; right: 14px; }

/* ═══════════════════════════════════════════
   18. NOTIFICATIONS
   ═══════════════════════════════════════════ */
.notif-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid ${theme.border}; }
.notif-item:last-child { border-bottom: none; }
.notif-icon { font-size: 20px; }
.notif-text { font-size: 13px; line-height: 1.4; }
.notif-meta { font-size: 11px; color: ${theme.muted}; margin-top: 3px; }
.notif-unread { border-left: 3px solid ${theme.accent}; padding-left: 12px; margin-left: -12px; }

/* ═══════════════════════════════════════════
   19. MOBILE BAR
   ═══════════════════════════════════════════ */
.mobile-bar {
    display: none; position: fixed; bottom: 0; left: 0; right: 0;
    background: ${theme.surface}; border-top: 1px solid ${theme.border};
    padding: 8px 0 14px; z-index: 200; grid-template-columns: repeat(5, 1fr);
}
.mobile-tab { display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; padding: 4px; color: ${theme.muted}; transition: color 0.15s; }
.mobile-tab.active { color: ${theme.accent}; }
.mobile-tab .tab-icon { font-size: 20px; }
.mobile-tab .tab-label { font-size: 9px; font-weight: 600; font-family: var(--font-mono); }

/* ═══════════════════════════════════════════
   20. TOAST SYSTEM
   ═══════════════════════════════════════════ */
.toast-container {
    position: fixed; bottom: 24px; right: 24px; z-index: 2000;
    display: flex; flex-direction: column; gap: 8px; max-width: 360px;
}
.toast-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 16px; border-radius: 8px;
    border: 1px solid; position: relative; overflow: hidden;
    animation: toastSlideIn 0.3s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.toast-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.toast-message { font-size: 13px; flex: 1; line-height: 1.4; color: ${theme.text}; }
.toast-close { background: none; border: none; color: ${theme.muted}; font-size: 18px; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0; }
.toast-close:hover { color: ${theme.text}; }
.toast-progress {
    position: absolute; bottom: 0; left: 0; height: 3px; border-radius: 0 0 12px 12px;
    animation: toastCountdown 4s linear forwards;
}

@keyframes toastSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toastCountdown { from { width: 100%; } to { width: 0%; } }

/* ═══════════════════════════════════════════
   21. SKELETON LOADING
   ═══════════════════════════════════════════ */
.skeleton {
    background: linear-gradient(90deg, ${theme.border} 25%, ${theme.subtle} 50%, ${theme.border} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease infinite;
    border-radius: 6px;
}
.skeleton-text { height: 12px; margin-bottom: 8px; border-radius: 4px; }
.skeleton-card { padding: 20px; border-radius: 14px; border: 1px solid ${theme.border}; min-height: 100px; }
.skeleton-stat { padding: 18px 20px; border-radius: 14px; border: 1px solid ${theme.border}; min-height: 110px; }
.skeleton-group { display: flex; flex-direction: column; gap: 4px; }
.skeleton-table { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
.skeleton-table-row { display: flex; gap: 12px; }
.skeleton-reveal { animation: fadeIn 0.3s ease; }

@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

/* ═══════════════════════════════════════════
   22. GLOBAL SEARCH PALETTE
   ═══════════════════════════════════════════ */
.search-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1500;
    display: flex; align-items: flex-start; justify-content: center; padding-top: 15vh;
    backdrop-filter: blur(4px); animation: fadeIn 0.15s ease;
}
.search-palette {
    background: ${theme.surface}; border: 1px solid ${theme.border};
    border-radius: 10px; width: 560px; max-width: 95vw;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15); animation: slideUp 0.2s ease;
    overflow: hidden;
}
.search-palette-input-wrap {
    display: flex; align-items: center; gap: 12px; padding: 16px 20px;
    border-bottom: 1px solid ${theme.border};
}
.search-palette-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: ${theme.text}; font-size: 16px; font-family: var(--font-body);
}
.search-palette-input::placeholder { color: ${theme.muted}; }
.search-results { max-height: 340px; overflow-y: auto; padding: 8px 0; }
.search-group-label { padding: 8px 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${theme.muted}; font-weight: 600; font-family: var(--font-mono); }
.search-result-item { padding: 10px 20px; cursor: pointer; transition: background 0.1s; }
.search-result-item:hover, .search-result-item.highlighted { background: ${theme.accentGlow}; }
.search-result-title { font-size: 13px; font-weight: 600; }
.search-result-sub { font-size: 11px; color: ${theme.muted}; margin-top: 2px; }
.search-footer { padding: 10px 20px; border-top: 1px solid ${theme.border}; display: flex; justify-content: center; }

/* ═══════════════════════════════════════════
   23. ONBOARDING TOUR
   ═══════════════════════════════════════════ */
.onboarding-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 3000;
    animation: fadeIn 0.3s ease;
}
.onboarding-highlight {
    position: fixed; border: 2px solid ${theme.accent}; border-radius: 8px;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.45); z-index: 3001;
    transition: all 0.3s ease; pointer-events: none;
}
.onboarding-tooltip {
    position: fixed; z-index: 3002;
    background: ${theme.surface}; border: 1px solid ${theme.border}; border-radius: 10px;
    padding: 18px 22px; width: 280px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12); animation: slideUp 0.25s ease;
}
.onboarding-step-num { font-size: 10px; color: ${theme.muted}; margin-bottom: 6px; font-family: var(--font-mono); }
.onboarding-title { font-family: var(--font-heading); font-size: 15px; font-weight: 600; margin-bottom: 6px; color: var(--color-brand-deep); }
.onboarding-desc { font-size: 13px; color: ${theme.muted}; line-height: 1.5; margin-bottom: 14px; }
.onboarding-actions { display: flex; gap: 8px; justify-content: flex-end; }

/* ═══════════════════════════════════════════
   24. QUICK ACTIONS DROPDOWN
   ═══════════════════════════════════════════ */
.quick-actions-menu {
    position: absolute; right: 0; top: 100%; z-index: 50;
    background: ${theme.surface}; border: 1px solid ${theme.border}; border-radius: 8px;
    padding: 6px 0; min-width: 160px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    animation: fadeIn 0.15s ease;
}
.quick-action { padding: 8px 16px; font-size: 12px; cursor: pointer; transition: background 0.1s; }
.quick-action:hover { background: ${theme.accentGlow}; }

/* ═══════════════════════════════════════════
   24b. DETAIL PANEL (SLIDE-IN)
   ═══════════════════════════════════════════ */
.detail-panel {
    animation: slideInRight 0.25s ease;
}
@keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

/* ═══════════════════════════════════════════
   24c. RISK HIGH
   ═══════════════════════════════════════════ */
.risk-high { animation: pulse 1.5s ease-in-out infinite; }

/* ═══════════════════════════════════════════
   24d. TAB BAR
   ═══════════════════════════════════════════ */
.tab-bar { display: flex; gap: 0; border-bottom: 2px solid ${theme.border}; margin-bottom: 16px; }
.tab-item {
    padding: 10px 20px; font-size: 13px; font-weight: 500; color: ${theme.muted};
    cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;
    user-select: none;
}
.tab-item:hover { color: ${theme.text}; }
.tab-item.active { color: ${theme.accent}; border-bottom-color: ${theme.accent}; }
.tab-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 20px; height: 20px; border-radius: 10px; font-size: 10px; font-weight: 700;
    padding: 0 6px;
}
.tab-badge.blue { background: var(--color-brand-subtle); color: ${theme.accent}; }
.tab-badge.green { background: var(--color-success-100); color: var(--color-success-700); }

/* ═══════════════════════════════════════════
   24e. BENEFICIARY NOTIFICATION ITEMS
   ═══════════════════════════════════════════ */
.benef-notif-item {
    display: flex; align-items: flex-start; gap: 12px; padding: 14px 0;
    border-bottom: 1px solid ${theme.border}; cursor: pointer;
    transition: background 0.15s ease;
}
.benef-notif-item:last-child { border-bottom: none; }
.benef-notif-item:hover { background: var(--color-brand-subtle); margin: 0 -20px; padding-left: 20px; padding-right: 20px; }

.canal-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0;
}
.canal-badge.sms { background: rgba(168,85,247,0.1); color: #7C3AED; border: 1px solid rgba(124,58,237,0.2); }
.canal-badge.email { background: var(--color-brand-subtle); color: var(--color-brand-action); border: 1px solid var(--color-brand-light); }
.canal-badge.whatsapp { background: var(--color-success-100); color: var(--color-success-700); border: 1px solid var(--color-success-border); }

.status-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
}
.status-dot.entregue { background: var(--color-success-700); }
.status-dot.pendente { background: var(--color-warning-700); animation: pulse 2s ease-in-out infinite; }
.status-dot.falhou { background: var(--color-error-700); }

.benef-notif-subject { font-size: 13px; font-weight: 600; color: ${theme.text}; margin-bottom: 2px; }
.benef-notif-preview { font-size: 12px; color: ${theme.muted}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 500px; }
.benef-notif-meta { font-size: 11px; color: ${theme.muted}; margin-top: 4px; display: flex; align-items: center; gap: 8px; }

.benef-detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid ${theme.border}; font-size: 13px; }
.benef-detail-row:last-child { border-bottom: none; }
.benef-detail-key { color: ${theme.muted}; font-size: 12px; }
.benef-detail-val { font-weight: 600; color: ${theme.text}; font-size: 13px; }
.benef-msg-box {
    background: ${theme.subtle}; border: 1px solid ${theme.border}; border-radius: 10px;
    padding: 16px; font-size: 13px; line-height: 1.6; color: ${theme.text};
    margin-top: 12px; white-space: pre-wrap;
}

/* ═══════════════════════════════════════════
   25. EMPTY STATE
   ═══════════════════════════════════════════ */
.empty-state-container { text-align: center; padding: 40px 20px; }
.empty-state-icon-wrap { margin-bottom: 16px; display: flex; justify-content: center; }
.empty-state-title { font-family: var(--font-heading); font-size: 16px; font-weight: 600; color: ${theme.text}; margin-bottom: 6px; }
.empty-state-desc { font-size: 13px; color: ${theme.muted}; max-width: 300px; margin: 0 auto; }

/* ═══════════════════════════════════════════
   26. ANIMATED CHECK
   ═══════════════════════════════════════════ */
.animated-check .check-circle { stroke-dasharray: 226; stroke-dashoffset: 226; animation: drawCircle 0.6s ease forwards; }
.animated-check .check-mark { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawCheck 0.4s 0.5s ease forwards; }

@keyframes drawCircle { to { stroke-dashoffset: 0; } }
@keyframes drawCheck { to { stroke-dashoffset: 0; } }

/* ═══════════════════════════════════════════
   27. ANIMATIONS
   ═══════════════════════════════════════════ */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.5; } }

/* ═══════════════════════════════════════════
   28. RESPONSIVE
   ═══════════════════════════════════════════ */
@media (max-width: 768px) {
    .sidebar { display: none; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
    .grid-3-1 { grid-template-columns: 1fr; }
    .content { padding: 16px; padding-bottom: 80px; }
    .topbar { padding: 10px 16px; }
    .topbar-clock { display: none; }
    .search-trigger-btn { min-width: auto; }
    .search-trigger-btn span:nth-child(2) { display: none; }
    .mobile-bar { display: grid; }
    .form-row { grid-template-columns: 1fr; }
    .stat-value { font-size: 22px; }
    .modal { border-radius: 16px 16px 0 0; margin-top: auto; width: 100vw; max-width: 100vw; }
    .modal-overlay { align-items: flex-end; }
    .detail-panel { display: none !important; }
    .toast-container { bottom: auto; top: 16px; right: 50%; transform: translateX(50%); }

    /* Mobile stacked cards for tables */
    .table-mobile-cards thead { display: none; }
    .table-mobile-cards tr { display: flex; flex-direction: column; padding: 12px 16px; margin-bottom: 8px; border: 1px solid ${theme.border}; border-radius: 10px; background: ${theme.card}; }
    .table-mobile-cards td { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid ${theme.border}; font-size: 13px; }
    .table-mobile-cards td:last-child { border-bottom: none; }
    .table-mobile-cards td::before { content: attr(data-label); font-weight: 600; color: ${theme.muted}; font-size: 11px; text-transform: uppercase; }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .sidebar { width: 180px; min-width: 180px; }
}

/* ═══════════════════════════════════════════
   29. UTILITIES
   ═══════════════════════════════════════════ */
.empty-state { text-align: center; padding: 40px 20px; color: ${theme.muted}; }
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.empty-title { font-size: 15px; font-weight: 600; color: ${theme.text}; margin-bottom: 6px; font-family: var(--font-heading); }
.alert { padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 16px; display: flex; gap: 10px; align-items: flex-start; }
.alert-success { background: var(--color-success-100); border: 1px solid var(--color-success-border); color: var(--color-success-700); }
.alert-warning { background: var(--color-warning-100); border: 1px solid var(--color-warning-border); color: var(--color-warning-700); }
.alert-icon { font-size: 16px; }
.tag { display: inline-flex; align-items: center; background: ${theme.subtle}; border: 1px solid ${theme.border}; border-radius: 6px; padding: 2px 8px; font-size: 11px; color: ${theme.muted}; }
.divider { height: 1px; background: ${theme.border}; margin: 16px 0; }
.text-muted { color: ${theme.muted}; font-size: 12px; }
.text-sm { font-size: 12px; }
.font-bold { font-weight: 700; }
.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.mb-2 { margin-bottom: 8px; }
.mb-4 { margin-bottom: 16px; }
.mt-2 { margin-top: 8px; }
.ml-auto { margin-left: auto; }
.w-full { width: 100%; }
.summary-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid ${theme.border}; font-size: 13px; }
.summary-row:last-child { border-bottom: none; }
.summary-key { color: ${theme.muted}; }
.page { animation: fadeIn 0.2s ease; }
.chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; background: ${theme.subtle}; border: 1px solid ${theme.border}; }
.progress-bar { width: 100%; height: 6px; background: ${theme.border}; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
`;
