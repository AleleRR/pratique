import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { Badge } from "../components";

/**
 * Devolucao page: Return a delivered card with condition assessment.
 */

const CONDITIONS = ["Ótimo", "Bom", "Danificado", "Perdido"];
const RESPONSAVEL = "Admin João";

export default function Devolucao() {
    const { state, dispatch, addToast } = useAppContext();
    const [busca, setBusca] = useState("");
    const [selected, setSelected] = useState(null);
    const [condicao, setCondicao] = useState("");
    const [observacao, setObservacao] = useState("");
    const [error, setError] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [recibo, setRecibo] = useState(null);

    const entregues = state.cartoes.filter(c => {
        if (c.status !== "entregue") return false;
        const q = busca.toLowerCase();
        return !busca || c.id.toLowerCase().includes(q) || c.beneficiario.toLowerCase().includes(q) || c.numero.includes(busca);
    });

    const handleSelect = (c) => {
        if (c.status !== "entregue") {
            setError(`Cartão ${c.id} não está com status "entregue". Status atual: ${c.status}`);
            setSelected(null);
            return;
        }
        setError("");
        setSelected(c);
        setCondicao("");
        setObservacao("");
    };

    const handleConfirm = () => {
        if (!selected || !condicao) return;

        dispatch({
            type: "RETURN_CARD",
            payload: {
                cartaoId: selected.id,
                beneficiario: selected.beneficiario,
                condicao,
                responsavel: RESPONSAVEL,
                observacao,
            },
        });

        addToast("success", `Devolução do cartão ${selected.id} registrada com sucesso!`);

        setRecibo({
            cartaoId: selected.id,
            beneficiario: selected.beneficiario,
            cpf: selected.cpf,
            numero: selected.numero,
            tipo: selected.tipo,
            condicao,
            responsavel: RESPONSAVEL,
            data: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        });

        setSucesso(true);
    };

    const handleReset = () => {
        setSucesso(false);
        setSelected(null);
        setCondicao("");
        setObservacao("");
        setRecibo(null);
        setBusca("");
    };

    if (sucesso) {
        return (
            <div className="page">
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" className="animated-check" aria-hidden="true">
                        <circle cx="40" cy="40" r="36" fill="none" stroke={theme.success} strokeWidth="3" className="check-circle" />
                        <polyline points="26,42 36,52 56,30" fill="none" stroke={theme.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-mark" />
                    </svg>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginTop: 16 }}>
                        Devolução Registrada!
                    </div>
                    <div className="text-muted" style={{ marginTop: 4 }}>O cartão foi atualizado com sucesso.</div>
                </div>

                {recibo && <ReceiptSVG data={recibo} />}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button className="btn btn-primary" onClick={handleReset} aria-label="Registrar nova devolução">
                        Nova Devolução
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="search-box" style={{ display: "flex", width: "100%", marginBottom: 16 }}>
                <span>🔍</span>
                <input
                    placeholder="Buscar cartão entregue..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    aria-label="Buscar cartão para devolução"
                />
            </div>

            {error && (
                <div className="alert alert-warning" style={{ marginBottom: 16 }}>
                    <div className="alert-icon">⚠️</div>
                    <div>{error}</div>
                </div>
            )}

            <div className="panel" style={{ marginBottom: 16 }}>
                <div className="panel-header">
                    <div className="panel-title">📥 Selecionar Cartão Entregue ({entregues.length})</div>
                </div>
                <div className="panel-body" style={{ maxHeight: 300, overflowY: "auto" }}>
                    {entregues.length === 0 && (
                        <div className="text-muted" style={{ textAlign: "center", padding: 20 }}>Nenhum cartão entregue encontrado.</div>
                    )}
                    {entregues.map(c => (
                        <div
                            key={c.id}
                            onClick={() => handleSelect(c)}
                            className={`selectable-card ${selected?.id === c.id ? "selected" : ""}`}
                            style={{
                                border: `1px solid ${selected?.id === c.id ? theme.accent : theme.border}`,
                                borderRadius: 10, padding: "12px 16px", marginBottom: 8, cursor: "pointer",
                                background: selected?.id === c.id ? theme.accentGlow : theme.subtle,
                                transition: "all 0.15s",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div style={{ fontSize: 18 }}>🪪</div>
                                <div style={{ flex: 1 }}>
                                    <div className="font-bold" style={{ fontSize: 13 }}>{c.id} — {c.beneficiario}</div>
                                    <div className="text-muted">{c.numero} · {c.tipo} · {c.valor}</div>
                                </div>
                                <Badge status={c.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selected && (
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">📋 Condição e Confirmação</div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label className="form-label" htmlFor="condicao-select">Condição do Cartão</label>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                                {CONDITIONS.map(c => (
                                    <button
                                        key={c}
                                        className={`btn ${condicao === c ? "btn-primary" : "btn-ghost"}`}
                                        style={{ justifyContent: "center", fontSize: 12 }}
                                        onClick={() => setCondicao(c)}
                                        aria-label={`Condição: ${c}`}
                                        aria-pressed={condicao === c}
                                    >
                                        {c === "Perdido" ? "❌ " : c === "Danificado" ? "⚠️ " : c === "Ótimo" ? "✨ " : "👍 "}
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {condicao === "Perdido" && (
                            <div className="alert alert-warning">
                                <div className="alert-icon">⚠️</div>
                                <div>Cartão marcado como <strong>Perdido</strong> será automaticamente <strong>bloqueado</strong>.</div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="obs-textarea">Observações</label>
                            <textarea
                                id="obs-textarea"
                                className="form-control"
                                rows={3}
                                placeholder="Observações sobre a devolução..."
                                value={observacao}
                                onChange={e => setObservacao(e.target.value)}
                                style={{ resize: "none" }}
                                aria-label="Observações sobre a devolução"
                            />
                        </div>

                        <button
                            className="btn btn-success w-full"
                            style={{ justifyContent: "center" }}
                            onClick={handleConfirm}
                            disabled={!condicao}
                            aria-label="Confirmar devolução"
                        >
                            ✅ Confirmar Devolução
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/** SVG-rendered receipt / fake PDF */
function ReceiptSVG({ data }) {
    return (
        <div className="panel" style={{ maxWidth: 440, margin: "0 auto" }}>
            <div className="panel-header">
                <div className="panel-title">📄 Comprovante de Devolução</div>
            </div>
            <div className="panel-body" style={{ padding: 0 }}>
                <svg viewBox="0 0 400 320" width="100%" style={{ display: "block" }}>
                    <rect width="400" height="320" fill={theme.bg} rx="8" />
                    <rect x="16" y="16" width="368" height="288" fill={theme.card} rx="6" stroke={theme.border} strokeWidth="1" />
                    {/* Header */}
                    <text x="200" y="48" textAnchor="middle" fill={theme.accent} fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif">COMPROVANTE DE DEVOLUÇÃO</text>
                    <line x1="40" y1="60" x2="360" y2="60" stroke={theme.border} strokeWidth="1" />
                    {/* Body */}
                    {[
                        ["Cartão", data.cartaoId],
                        ["Número", data.numero],
                        ["Beneficiário", data.beneficiario],
                        ["CPF", data.cpf],
                        ["Tipo", data.tipo],
                        ["Condição", data.condicao],
                        ["Responsável", data.responsavel],
                        ["Data/Hora", data.data],
                    ].map(([label, value], i) => (
                        <g key={i}>
                            <text x="40" y={88 + i * 26} fill={theme.muted} fontSize="10" fontFamily="DM Sans, sans-serif">{label}</text>
                            <text x="360" y={88 + i * 26} textAnchor="end" fill={theme.text} fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif">{value}</text>
                        </g>
                    ))}
                    <line x1="40" y1="268" x2="360" y2="268" stroke={theme.border} strokeWidth="1" />
                    <text x="200" y="288" textAnchor="middle" fill={theme.muted} fontSize="9" fontFamily="DM Sans, sans-serif">AuxílioPay · Documento gerado automaticamente · AES-256</text>
                </svg>
            </div>
        </div>
    );
}
