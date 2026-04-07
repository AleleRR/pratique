import { useState, useEffect, useRef, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import { theme } from "../../theme/theme";

/**
 * GlobalSearch: Command palette (Ctrl+K / Cmd+K) for searching cards,
 * beneficiaries, and audit entries simultaneously.
 */

const CATEGORIES = [
    { key: "cartoes", label: "Cartões", icon: "🪪" },
    { key: "beneficiarios", label: "Beneficiários", icon: "👥" },
    { key: "auditoria", label: "Auditoria", icon: "📋" },
];

export default function GlobalSearch({ isOpen, onClose, onNavigate }) {
    const { state } = useAppContext();
    const [query, setQuery] = useState("");
    const [highlightIdx, setHighlightIdx] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setHighlightIdx(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const results = getResults(state, query);
    const flatResults = results.flatMap(g => g.items);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIdx(i => Math.min(i + 1, flatResults.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIdx(i => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && flatResults[highlightIdx]) {
            onNavigate(flatResults[highlightIdx].page);
            onClose();
        } else if (e.key === "Escape") {
            onClose();
        }
    }, [flatResults, highlightIdx, onNavigate, onClose]);

    if (!isOpen) return null;

    return (
        <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Busca global">
            <div className="search-palette">
                <div className="search-palette-input-wrap">
                    <span style={{ fontSize: 18 }}>🔍</span>
                    <input
                        ref={inputRef}
                        className="search-palette-input"
                        placeholder="Buscar cartões, beneficiários, auditoria..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setHighlightIdx(0); }}
                        onKeyDown={handleKeyDown}
                        role="combobox"
                        aria-expanded={flatResults.length > 0}
                        aria-controls="search-results-list"
                        aria-activedescendant={flatResults[highlightIdx] ? `search-item-${flatResults[highlightIdx].id}` : undefined}
                        aria-label="Campo de busca global"
                        autoComplete="off"
                    />
                    <kbd className="search-kbd">ESC</kbd>
                </div>

                <div className="search-results" id="search-results-list" role="listbox" aria-label="Resultados da busca">
                    {query.length === 0 && (
                        <div className="search-hint">
                            <div style={{ color: theme.muted, fontSize: 13, textAlign: "center", padding: "24px 0" }}>
                                Digite para buscar em todo o sistema
                            </div>
                        </div>
                    )}
                    {query.length > 0 && flatResults.length === 0 && (
                        <div style={{ textAlign: "center", padding: "32px 0" }}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                                <circle cx="28" cy="28" r="18" stroke={theme.border} strokeWidth="3" />
                                <line x1="42" y1="42" x2="56" y2="56" stroke={theme.border} strokeWidth="3" strokeLinecap="round" />
                                <line x1="22" y1="22" x2="34" y2="34" stroke={theme.danger} strokeWidth="2" strokeLinecap="round" />
                                <line x1="34" y1="22" x2="22" y2="34" stroke={theme.danger} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <div style={{ color: theme.muted, fontSize: 14, marginTop: 12 }}>Nenhum resultado para "{query}"</div>
                        </div>
                    )}
                    {results.map(group => {
                        if (group.items.length === 0) return null;
                        return (
                            <div key={group.key}>
                                <div className="search-group-label">{group.icon} {group.label}</div>
                                {group.items.map((item, i) => {
                                    const globalIdx = flatResults.indexOf(item);
                                    return (
                                        <div
                                            key={item.id}
                                            id={`search-item-${item.id}`}
                                            role="option"
                                            aria-selected={globalIdx === highlightIdx}
                                            className={`search-result-item ${globalIdx === highlightIdx ? "highlighted" : ""}`}
                                            onClick={() => { onNavigate(item.page); onClose(); }}
                                            onMouseEnter={() => setHighlightIdx(globalIdx)}
                                        >
                                            <div className="search-result-title">{item.title}</div>
                                            <div className="search-result-sub">{item.subtitle}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <div className="search-footer">
                    <span style={{ fontSize: 11, color: theme.muted }}>↑↓ navegar &nbsp; ↵ selecionar &nbsp; esc fechar</span>
                </div>
            </div>
        </div>
    );
}

function getResults(state, query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();

    const cartaoResults = state.cartoes
        .filter(c => c.id.toLowerCase().includes(q) || c.numero.includes(q) || c.beneficiario.toLowerCase().includes(q))
        .slice(0, 5)
        .map(c => ({ id: c.id, title: `${c.id} — ${c.beneficiario}`, subtitle: `${c.numero} · ${c.tipo} · ${c.status}`, page: "cartoes" }));

    const benResults = state.beneficiarios
        .filter(b => b.nome.toLowerCase().includes(q) || b.cpf.includes(q))
        .slice(0, 5)
        .map(b => ({ id: b.id, title: b.nome, subtitle: `${b.cpf} · ${b.status}`, page: "beneficiarios" }));

    const auditResults = state.auditoria
        .filter(a => a.op.toLowerCase().includes(q) || a.ent.toLowerCase().includes(q) || a.user.toLowerCase().includes(q))
        .slice(0, 5)
        .map((a, i) => ({ id: `aud-${i}`, title: `${a.op} — ${a.ent}`, subtitle: `${a.user} · ${a.ts}`, page: "auditoria" }));

    return [
        { key: "cartoes", label: "Cartões", icon: "🪪", items: cartaoResults },
        { key: "beneficiarios", label: "Beneficiários", icon: "👥", items: benResults },
        { key: "auditoria", label: "Auditoria", icon: "📋", items: auditResults },
    ];
}
