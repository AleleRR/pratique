import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";

/**
 * Notificacoes page: Notification center with mark-as-read via context.
 * Now includes history of notifications sent to beneficiaries.
 */

const ALERT_SETTINGS = [
    { label: "Alertas de prazo de devolução", desc: "Notificar 5 dias antes do vencimento", on: true },
    { label: "Comprovantes automáticos", desc: "Enviar PDF ao beneficiário após entrega", on: true },
    { label: "Alertas de anomalia", desc: "Detectar padrões incomuns de uso", on: false },
    { label: "Relatório semanal", desc: "Resumo de movimentações toda segunda", on: true },
];

export default function Notificacoes() {
    const { state, dispatch, addToast } = useAppContext();
    const [activeTab, setActiveTab] = useState("sistema"); // "sistema" | "beneficiarios"
    
    // Alertas do sistema
    const unreadCount = state.notificacoes.filter(n => n.unread).length;

    // Histórico de beneficiários
    const beneficiarioNotifs = state.notificacoesBeneficiario;

    const handleMarkAllRead = () => {
        dispatch({ type: "MARK_ALL_READ" });
        addToast("info", "Todas as notificações marcadas como lidas.");
    };

    const handleMarkRead = (id) => {
        dispatch({ type: "MARK_NOTIFICATION_READ", payload: { id } });
    };

    const handleResend = (id) => {
        dispatch({ type: "RESEND_BENEFICIARY_NOTIFICATION", payload: { id } });
        addToast("success", "Notificação reenviada com sucesso!");
    };

    const StatusBadge = ({ status }) => {
        let color = theme.muted;
        let bg = "transparent";
        let text = status;
        let icon = "";

        if (status === "entregue") {
            color = theme.success;
            bg = "rgba(16, 201, 143, 0.1)";
            icon = "✓";
        } else if (status === "pendente") {
            color = theme.warning;
            bg = "rgba(245, 158, 11, 0.1)";
            icon = "⏱";
        } else if (status === "falhou") {
            color = theme.danger;
            bg = "rgba(239, 68, 68, 0.1)";
            icon = "✕";
        }

        return (
            <span style={{
                color, background: bg, padding: "4px 8px", borderRadius: "12px", 
                fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4
            }}>
                {icon} {text.toUpperCase()}
            </span>
        );
    };

    const CanalIcon = ({ canal }) => {
        const icons = {
            whatsapp: "💬",
            sms: "📱",
            email: "📧"
        };
        return <span style={{ fontSize: 16 }}>{icons[canal] || "📌"}</span>;
    };

    return (
        <div className="page">
            <div className="flex items-center gap-2 mb-4" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                        className={`btn ${activeTab === "sistema" ? "btn-primary" : "btn-ghost"}`}
                        onClick={() => setActiveTab("sistema")}
                    >
                        Alertas do Sistema <span className="chip" style={{ marginLeft: 6, background: activeTab === "sistema" ? "rgba(255,255,255,0.2)" : undefined }}>{unreadCount}</span>
                    </button>
                    <button 
                        className={`btn ${activeTab === "beneficiarios" ? "btn-primary" : "btn-ghost"}`}
                        onClick={() => setActiveTab("beneficiarios")}
                    >
                        Histórico a Beneficiários
                    </button>
                </div>
                {activeTab === "sistema" && (
                    <button className="btn btn-ghost btn-sm" onClick={handleMarkAllRead} aria-label="Marcar todas como lidas">
                        Marcar todas como lidas
                    </button>
                )}
            </div>

            {activeTab === "sistema" && (
                <>
                    <div className="panel">
                        <div className="panel-header"><div className="panel-title">🔔 Central de Notificações</div></div>
                        <div className="panel-body" style={{ paddingTop: 8, paddingBottom: 8 }}>
                            {state.notificacoes.length === 0 && (
                                <div className="text-muted" style={{ textAlign: "center", padding: 24 }}>Nenhuma notificação.</div>
                            )}
                            {state.notificacoes.map((n, i) => (
                                <div
                                    key={n.id || i}
                                    className={`notif-item ${n.unread ? "notif-unread" : ""}`}
                                    onClick={() => n.unread && handleMarkRead(n.id)}
                                    style={{ cursor: n.unread ? "pointer" : "default" }}
                                >
                                    <div className="notif-icon" style={{ fontSize: 24 }}>{n.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div className="notif-text">{n.texto}</div>
                                        <div className="notif-meta">{n.meta}</div>
                                    </div>
                                    {n.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.accent, flexShrink: 0, marginTop: 4 }} />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="panel" style={{ marginTop: 16 }}>
                        <div className="panel-header"><div className="panel-title">⚙️ Configurar Alertas</div></div>
                        <div className="panel-body">
                            {ALERT_SETTINGS.map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < ALERT_SETTINGS.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                                        <div className="text-muted">{item.desc}</div>
                                    </div>
                                    <div style={{ width: 40, height: 22, borderRadius: 11, cursor: "pointer", background: item.on ? theme.accent : theme.border, position: "relative", transition: "background 0.2s" }} role="switch" aria-checked={item.on} aria-label={item.label}>
                                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: item.on ? 21 : 3, transition: "left 0.2s" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === "beneficiarios" && (
                 <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">📱 Histórico de Comunicação a Beneficiários</div>
                    </div>
                    <div className="panel-body" style={{ padding: 0, overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>DATA/HORA</th>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>CANAL</th>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>BENEFICIÁRIO</th>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>MENSAGEM</th>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>STATUS</th>
                                    <th style={{ padding: "12px 16px", color: theme.muted, fontWeight: 500, fontSize: 12 }}>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beneficiarioNotifs.map((n) => (
                                    <tr key={n.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                                        <td style={{ padding: "16px", fontSize: 13, color: theme.text }}>{n.enviadoEm}</td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                                                <CanalIcon canal={n.canal} />
                                                <span style={{ textTransform: "capitalize" }}>{n.canal}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{n.beneficiario}</div>
                                            <div style={{ fontSize: 12, color: theme.muted }}>{n.telefone || n.email}</div>
                                        </td>
                                        <td style={{ padding: "16px", maxWidth: 300 }}>
                                            <div style={{ fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{n.assunto}</div>
                                            <div style={{ fontSize: 12, color: theme.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={n.mensagem}>
                                                {n.mensagem}
                                            </div>
                                            {n.erroMotivo && (
                                              <div style={{ fontSize: 11, color: theme.danger, marginTop: 4 }}>
                                                Erro: {n.erroMotivo}
                                              </div>
                                            )}
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <StatusBadge status={n.status} />
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            {n.status === "falhou" && (
                                                <button onClick={() => handleResend(n.id)} className="btn btn-ghost btn-sm" style={{ color: theme.accent }}>
                                                    Reenviar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {beneficiarioNotifs.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: "center", padding: 32, color: theme.muted }}>
                                            Nenhum histórico de envio encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
