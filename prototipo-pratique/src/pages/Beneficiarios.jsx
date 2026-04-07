import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { Modal, EmptyState } from "../components";

/**
 * Beneficiarios page: CRUD with search, filter, detail panel, and card history.
 */

const INITIAL_FORM = { nome: "", cpf: "", email: "", telefone: "", status: "ativo" };

export default function Beneficiarios() {
    const { state, dispatch, addToast } = useAppContext();
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("todos");
    const [selected, setSelected] = useState(null);
    const [modalMode, setModalMode] = useState(null); // "add" | "edit" | null
    const [form, setForm] = useState(INITIAL_FORM);
    const [confirmDeactivate, setConfirmDeactivate] = useState(null);

    const filtrados = useMemo(() => state.beneficiarios.filter(b => {
        const q = busca.toLowerCase();
        const matchSearch = !busca || b.nome.toLowerCase().includes(q) || b.cpf.includes(q) || b.id.toLowerCase().includes(q);
        const matchStatus = filtro === "todos" || b.status === filtro;
        return matchSearch && matchStatus;
    }), [state.beneficiarios, busca, filtro]);

    const openAdd = () => { setForm(INITIAL_FORM); setModalMode("add"); };
    const openEdit = (b) => { setForm({ nome: b.nome, cpf: b.cpf, email: b.email, telefone: b.telefone, status: b.status }); setModalMode("edit"); setSelected(b); };

    const handleSave = () => {
        if (!form.nome || !form.cpf) {
            addToast("error", "Nome e CPF são obrigatórios.");
            return;
        }
        if (modalMode === "add") {
            dispatch({ type: "ADD_BENEFICIARIO", payload: form });
            addToast("success", `Beneficiário ${form.nome} cadastrado com sucesso!`);
        } else if (modalMode === "edit" && selected) {
            dispatch({ type: "UPDATE_BENEFICIARIO", payload: { ...form, id: selected.id } });
            addToast("success", `Dados de ${form.nome} atualizados.`);
        }
        setModalMode(null);
        setSelected(null);
    };

    const handleDeactivate = () => {
        if (!confirmDeactivate) return;
        dispatch({ type: "DEACTIVATE_BENEFICIARIO", payload: { id: confirmDeactivate.id } });
        addToast("warning", `${confirmDeactivate.nome} foi desativado.`);
        setConfirmDeactivate(null);
        if (selected?.id === confirmDeactivate.id) setSelected(null);
    };

    const cardHistory = useMemo(() => selected
        ? state.movimentacoes.filter(m => {
            const card = state.cartoes.find(c => c.id === m.cartaoId);
            return card && card.beneficiario === selected.nome;
        }).slice(0, 10)
        : [], [selected, state.movimentacoes, state.cartoes]);

    return (
        <div className="page">
            {/* Search + Filter + Add */}
            <div className="flex items-center gap-2 mb-4" style={{ flexWrap: "wrap" }}>
                <div className="search-box" style={{ display: "flex", width: "auto", flex: 1, minWidth: 180 }}>
                    <span>🔍</span>
                    <input placeholder="Buscar beneficiário..." value={busca} onChange={e => setBusca(e.target.value)} aria-label="Buscar beneficiário" />
                </div>
                <select className="form-control" style={{ width: "auto" }} value={filtro} onChange={e => setFiltro(e.target.value)} aria-label="Filtrar por status">
                    <option value="todos">Todos</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
                <button className="btn btn-primary" onClick={openAdd} aria-label="Adicionar beneficiário">+ Novo</button>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
                {/* List */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {filtrados.length === 0 && (
                        <EmptyState icon="👥" title="Nenhum beneficiário" description="Nenhum beneficiário corresponde à busca." ctaLabel="Adicionar" onCta={openAdd} />
                    )}
                    {filtrados.map(b => (
                        <div
                            key={b.id}
                            onClick={() => setSelected(b)}
                            style={{
                                border: `1px solid ${selected?.id === b.id ? theme.accent : theme.border}`,
                                borderRadius: 12, padding: "14px 18px", marginBottom: 10, cursor: "pointer",
                                background: selected?.id === b.id ? theme.accentGlow : theme.card, transition: "all 0.15s",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${theme.accent}, #A855F7)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
                                }}>
                                    {b.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="font-bold" style={{ fontSize: 13 }}>{b.nome}</div>
                                    <div className="text-muted">{b.cpf} · {b.totalCartoes} cartões</div>
                                </div>
                                <span className={`badge ${b.status === "ativo" ? "entregue" : "bloqueado"}`}>
                                    {b.status === "ativo" ? "Ativo" : "Inativo"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Panel (desktop slide-in) */}
                {selected && (
                    <div className="detail-panel" style={{
                        width: 340, background: theme.card, border: `1px solid ${theme.border}`,
                        borderRadius: 14, padding: 20, flexShrink: 0,
                    }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="panel-title" style={{ flex: 1 }}>👤 {selected.nome}</div>
                            <button className="close-btn" onClick={() => setSelected(null)} aria-label="Fechar painel">×</button>
                        </div>

                        {[
                            ["ID", selected.id],
                            ["CPF", selected.cpf],
                            ["E-mail", selected.email],
                            ["Telefone", selected.telefone],
                            ["Cartão Ativo", selected.cartaoAtivo || "—"],
                            ["Total Cartões", selected.totalCartoes],
                            ["Cadastro", selected.dataCadastro],
                            ["Status", selected.status],
                        ].map(([k, v]) => (
                            <div key={k} className="summary-row">
                                <span className="summary-key">{k}</span>
                                <span className="font-bold" style={{ fontSize: 12 }}>{v}</span>
                            </div>
                        ))}

                        <div className="divider" />

                        <div className="flex gap-2" style={{ marginBottom: 16 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(selected)} aria-label="Editar beneficiário">✏️ Editar</button>
                            {selected.status === "ativo" && (
                                <button className="btn btn-ghost btn-sm" style={{ color: theme.danger }} onClick={() => setConfirmDeactivate(selected)} aria-label="Desativar beneficiário">
                                    ⛔ Desativar
                                </button>
                            )}
                        </div>

                        {/* Card History */}
                        <div className="panel-title" style={{ fontSize: 12, marginBottom: 8 }}>📜 Histórico de Movimentações</div>
                        {cardHistory.length === 0 && <div className="text-muted">Nenhuma movimentação encontrada.</div>}
                        {cardHistory.map(m => (
                            <div key={m.id} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 11 }}>
                                <span>{m.tipo === "entrega" ? "📤" : "📥"}</span>
                                <div style={{ flex: 1 }}>
                                    <div>{m.cartaoId} — {m.tipo === "entrega" ? "Entrega" : "Devolução"}</div>
                                    <div className="text-muted">{m.data}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {modalMode && (
                <Modal
                    title={modalMode === "add" ? "➕ Novo Beneficiário" : "✏️ Editar Beneficiário"}
                    onClose={() => setModalMode(null)}
                    footer={
                        <>
                            <button className="btn btn-ghost" onClick={() => setModalMode(null)} aria-label="Cancelar">Cancelar</button>
                            <button className="btn btn-primary" onClick={handleSave} aria-label="Salvar beneficiário">Salvar</button>
                        </>
                    }
                >
                    <div className="form-group">
                        <label className="form-label" htmlFor="ben-nome">Nome Completo</label>
                        <input id="ben-nome" className="form-control" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Nome completo" aria-label="Nome completo" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="ben-cpf">CPF</label>
                        <input id="ben-cpf" className="form-control" value={form.cpf} onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))} placeholder="***.***.***-**" aria-label="CPF" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="ben-email">E-mail</label>
                        <input id="ben-email" className="form-control" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@exemplo.com" aria-label="E-mail" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="ben-tel">Telefone</label>
                        <input id="ben-tel" className="form-control" value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} placeholder="(00) 00000-0000" aria-label="Telefone" />
                    </div>
                </Modal>
            )}

            {/* Deactivate Confirmation */}
            {confirmDeactivate && (
                <Modal
                    title="⚠️ Confirmar Desativação"
                    onClose={() => setConfirmDeactivate(null)}
                    footer={
                        <>
                            <button className="btn btn-ghost" onClick={() => setConfirmDeactivate(null)} aria-label="Cancelar desativação">Cancelar</button>
                            <button className="btn btn-danger" onClick={handleDeactivate} aria-label="Confirmar desativação">Desativar</button>
                        </>
                    }
                >
                    <div style={{ fontSize: 14 }}>
                        Tem certeza que deseja desativar <strong>{confirmDeactivate.nome}</strong>?
                        O cartão ativo será desvinculado.
                    </div>
                </Modal>
            )}
        </div>
    );
}
