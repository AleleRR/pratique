import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { Badge, StatusTracker, Modal, EmptyState } from "../components";

/**
 * Cartoes page: Card inventory with sorting, pagination, quick actions,
 * and card history timeline in detail modal.
 */

const PAGE_SIZE = 8;
const DETAIL_FIELDS = [
    { key: "Beneficiário", accessor: c => c.beneficiario },
    { key: "CPF", accessor: c => c.cpf },
    { key: "Tipo", accessor: c => c.tipo },
    { key: "Valor", accessor: c => c.valor },
    { key: "Responsável", accessor: c => c.responsavel || "—" },
    { key: "Data de Entrega", accessor: c => c.entregaEm || "—" },
];

function filterCartoes(list, busca, filtroStatus) {
    const q = busca.toLowerCase();
    return list.filter(c => {
        const matchesSearch = c.beneficiario.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.numero.includes(busca);
        const matchesStatus = filtroStatus === "todos" || c.status === filtroStatus;
        return matchesSearch && matchesStatus;
    });
}

export default function Cartoes() {
    const { state, dispatch, addToast } = useAppContext();
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("todos");
    const [selected, setSelected] = useState(null);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(0);
    const [actionsOpen, setActionsOpen] = useState(null);

    const filtrados = useMemo(() => {
        let list = filterCartoes(state.cartoes, busca, filtro);
        if (sortCol) {
            list = [...list].sort((a, b) => {
                const va = a[sortCol] || "";
                const vb = b[sortCol] || "";
                const cmp = String(va).localeCompare(String(vb));
                return sortDir === "asc" ? cmp : -cmp;
            });
        }
        return list;
    }, [state.cartoes, busca, filtro, sortCol, sortDir]);

    const totalPages = Math.ceil(filtrados.length / PAGE_SIZE);
    const paged = filtrados.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const handleSort = (col) => {
        if (sortCol === col) {
            setSortDir(d => d === "asc" ? "desc" : "asc");
        } else {
            setSortCol(col);
            setSortDir("asc");
        }
    };

    const sortIndicator = (col) => {
        if (sortCol !== col) return " ↕";
        return sortDir === "asc" ? " ▲" : " ▼";
    };

    const handleBlock = (c) => {
        dispatch({ type: "BLOCK_CARD", payload: { cartaoId: c.id, motivo: "Bloqueio manual", responsavel: "Admin João" } });
        addToast("warning", `Cartão ${c.id} bloqueado.`);
        setActionsOpen(null);
    };

    const cardHistory = useMemo(() => selected
        ? state.movimentacoes.filter(m => m.cartaoId === selected.id)
        : [], [selected, state.movimentacoes]);

    return (
        <div className="page">
            <div className="flex items-center gap-2 mb-4" style={{ flexWrap: "wrap" }}>
                <div className="search-box" style={{ display: "flex", width: "auto", flex: 1, minWidth: 180 }}>
                    <span>🔍</span>
                    <input placeholder="Buscar cartão ou beneficiário..." value={busca} onChange={e => { setBusca(e.target.value); setPage(0); }} aria-label="Buscar cartão" />
                </div>
                <select className="form-control" style={{ width: "auto" }} value={filtro} onChange={e => { setFiltro(e.target.value); setPage(0); }} aria-label="Filtrar por status">
                    <option value="todos">Todos os status</option>
                    <option value="entregue">Entregue</option>
                    <option value="disponivel">Disponível</option>
                    <option value="bloqueado">Bloqueado</option>
                    <option value="pendente">Pendente</option>
                </select>
            </div>

            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">🪪 Cartões ({filtrados.length})</div>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table className="table" style={{ padding: "0 20px" }}>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: 20, cursor: "pointer" }} onClick={() => handleSort("id")}>ID{sortIndicator("id")}</th>
                                <th>Número</th>
                                <th style={{ cursor: "pointer" }} onClick={() => handleSort("beneficiario")}>Beneficiário{sortIndicator("beneficiario")}</th>
                                <th style={{ cursor: "pointer" }} onClick={() => handleSort("tipo")}>Tipo{sortIndicator("tipo")}</th>
                                <th style={{ cursor: "pointer" }} onClick={() => handleSort("status")}>Status{sortIndicator("status")}</th>
                                <th>Entrega</th>
                                <th style={{ paddingRight: 20 }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map(c => (
                                <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => setSelected(c)}>
                                    <td style={{ paddingLeft: 20 }}><span className="tag">{c.id}</span></td>
                                    <td><code style={{ fontSize: 12, color: theme.muted }}>{c.numero}</code></td>
                                    <td>
                                        <div className="font-bold" style={{ fontSize: 13 }}>{c.beneficiario}</div>
                                        <div className="text-muted">{c.cpf}</div>
                                    </td>
                                    <td><span className="chip">{c.tipo}</span></td>
                                    <td><Badge status={c.status} /></td>
                                    <td className="text-muted" style={{ fontSize: 12 }}>{c.entregaEm || "—"}</td>
                                    <td style={{ paddingRight: 20, position: "relative" }}>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={e => { e.stopPropagation(); setActionsOpen(actionsOpen === c.id ? null : c.id); }}
                                            aria-label={`Ações para ${c.id}`}
                                        >
                                            ⋯
                                        </button>
                                        {actionsOpen === c.id && (
                                            <div className="quick-actions-menu" onClick={e => e.stopPropagation()}>
                                                <div className="quick-action" onClick={() => { setSelected(c); setActionsOpen(null); }}>👁️ Ver Detalhes</div>
                                                {c.status !== "bloqueado" && (
                                                    <div className="quick-action" onClick={() => handleBlock(c)}>⛔ Bloquear</div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtrados.length === 0 && (
                        <EmptyState icon="🔍" title="Nenhum resultado" description="Tente buscar por outro termo." />
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2" style={{ padding: "12px 20px", justifyContent: "center", borderTop: `1px solid ${theme.border}` }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} aria-label="Página anterior">← Anterior</button>
                        <span className="text-muted" style={{ fontSize: 12 }}>Página {page + 1} de {totalPages}</span>
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} aria-label="Próxima página">Próximo →</button>
                    </div>
                )}
            </div>

            {/* Detail Modal with Card History */}
            {selected && (
                <Modal
                    title={`Detalhes — ${selected.id}`}
                    onClose={() => setSelected(null)}
                    footer={
                        <>
                            <button className="btn btn-ghost" onClick={() => setSelected(null)} aria-label="Fechar detalhes">Fechar</button>
                            <button className="btn btn-primary" aria-label="Gerar comprovante">📄 Gerar Comprovante</button>
                        </>
                    }
                >
                    <div className="card-preview mb-4 holographic-card">
                        <div className="card-chip" />
                        <div className="card-number">{selected.numero}</div>
                        <div className="card-holder">{selected.beneficiario}</div>
                        <div className="card-badge-status"><Badge status={selected.status} /></div>
                    </div>
                    <StatusTracker status={selected.status} />
                    <div className="divider" />
                    {DETAIL_FIELDS.map(({ key, accessor }) => (
                        <div key={key} className="summary-row">
                            <span className="summary-key">{key}</span>
                            <span className="font-bold" style={{ fontSize: 13 }}>{accessor(selected)}</span>
                        </div>
                    ))}

                    {/* Card History Timeline */}
                    {cardHistory.length > 0 && (
                        <>
                            <div className="divider" />
                            <div className="panel-title" style={{ fontSize: 12, marginBottom: 8 }}>📜 Histórico</div>
                            {cardHistory.map(m => (
                                <div key={m.id} style={{ display: "flex", gap: 10, padding: "6px 0", borderLeft: `2px solid ${m.tipo === "entrega" ? theme.success : theme.accent}`, paddingLeft: 12, marginLeft: 8, marginBottom: 4 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600 }}>
                                            {m.tipo === "entrega" ? "📤 Entrega" : "📥 Devolução"}
                                            {m.condicao && ` — ${m.condicao}`}
                                        </div>
                                        <div className="text-muted">{m.data} · {m.responsavel}</div>
                                        {m.observacao && <div className="text-muted" style={{ fontStyle: "italic" }}>"{m.observacao}"</div>}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </Modal>
            )}
        </div>
    );
}
