import { useState } from "react";
import { theme } from "../theme/theme";
import { Modal } from "../components";

/**
 * Configuracoes page: Profile, security (2FA), notification prefs, system info, keyboard shortcuts.
 */

const NOTIFICATION_EVENTS = [
    { key: "entrega", label: "Entrega de cartão" },
    { key: "devolucao", label: "Devolução de cartão" },
    { key: "bloqueio", label: "Bloqueio de cartão" },
    { key: "prazo", label: "Prazo de vencimento" },
    { key: "anomalia", label: "Atividade suspeita" },
    { key: "relatorio", label: "Relatório semanal" },
];

const SHORTCUTS = [
    { keys: "Ctrl + K", desc: "Busca global" },
    { keys: "N", desc: "Nova Entrega" },
    { keys: "D", desc: "Devoluções" },
    { keys: "Escape", desc: "Fechar modal / busca" },
];

function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function Configuracoes() {
    const [twoFA, setTwoFA] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [code, setCode] = useState("");
    const [notifPrefs, setNotifPrefs] = useState(() => {
        const prefs = {};
        NOTIFICATION_EVENTS.forEach(e => { prefs[e.key] = { email: true, sms: false }; });
        return prefs;
    });

    const togglePref = (eventKey, channel) => {
        setNotifPrefs(prev => ({
            ...prev,
            [eventKey]: { ...prev[eventKey], [channel]: !prev[eventKey][channel] },
        }));
    };

    const handle2FAToggle = () => {
        if (!twoFA) {
            setShow2FAModal(true);
        } else {
            setTwoFA(false);
        }
    };

    const verify2FA = () => {
        if (code.length === 6) {
            setTwoFA(true);
            setShow2FAModal(false);
            setCode("");
        }
    };

    return (
        <div className="page">
            <div className="grid-2">
                {/* Profile */}
                <div className="panel">
                    <div className="panel-header"><div className="panel-title">👤 Perfil do Usuário</div></div>
                    <div className="panel-body">
                        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: "50%",
                                background: `linear-gradient(135deg, ${theme.accent}, #A855F7)`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 20, fontWeight: 700, color: "white",
                            }}>
                                AJ
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>Admin João</div>
                                <div className="text-muted">Administrador</div>
                            </div>
                        </div>
                        {[
                            ["E-mail", "admin.joao@auxiliopay.com"],
                            ["Função", "Administrador"],
                            ["Último Login", daysAgo(0)],
                        ].map(([k, v]) => (
                            <div key={k} className="summary-row">
                                <span className="summary-key">{k}</span>
                                <span className="font-bold" style={{ fontSize: 12 }}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className="panel">
                    <div className="panel-header"><div className="panel-title">🔐 Segurança</div></div>
                    <div className="panel-body">
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>Autenticação 2FA</div>
                                <div className="text-muted">{twoFA ? "Ativado — TOTP" : "Desativado"}</div>
                            </div>
                            <div
                                onClick={handle2FAToggle}
                                style={{
                                    width: 40, height: 22, borderRadius: 11, cursor: "pointer",
                                    background: twoFA ? theme.accent : theme.border,
                                    position: "relative", transition: "background 0.2s",
                                }}
                                role="switch"
                                aria-checked={twoFA}
                                aria-label="Toggle autenticação dois fatores"
                                tabIndex={0}
                            >
                                <div style={{
                                    width: 16, height: 16, borderRadius: "50%", background: "white",
                                    position: "absolute", top: 3, left: twoFA ? 21 : 3, transition: "left 0.2s",
                                }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>Alterar Senha</div>
                                <div className="text-muted">Última alteração há 45 dias</div>
                            </div>
                            <button className="btn btn-ghost btn-sm" aria-label="Alterar senha">Alterar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Preferences Grid */}
            <div className="panel" style={{ marginTop: 16 }}>
                <div className="panel-header"><div className="panel-title">🔔 Preferências de Notificação</div></div>
                <div style={{ overflowX: "auto" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: 20 }}>Evento</th>
                                <th style={{ textAlign: "center" }}>📧 E-mail</th>
                                <th style={{ textAlign: "center", paddingRight: 20 }}>📱 SMS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NOTIFICATION_EVENTS.map(evt => (
                                <tr key={evt.key}>
                                    <td style={{ paddingLeft: 20, fontSize: 13 }}>{evt.label}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={notifPrefs[evt.key]?.email || false}
                                            onChange={() => togglePref(evt.key, "email")}
                                            aria-label={`E-mail para ${evt.label}`}
                                            style={{ width: 16, height: 16, cursor: "pointer", accentColor: theme.accent }}
                                        />
                                    </td>
                                    <td style={{ textAlign: "center", paddingRight: 20 }}>
                                        <input
                                            type="checkbox"
                                            checked={notifPrefs[evt.key]?.sms || false}
                                            onChange={() => togglePref(evt.key, "sms")}
                                            aria-label={`SMS para ${evt.label}`}
                                            style={{ width: 16, height: 16, cursor: "pointer", accentColor: theme.accent }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 16 }}>
                {/* System Info */}
                <div className="panel">
                    <div className="panel-header"><div className="panel-title">🖥️ Informações do Sistema</div></div>
                    <div className="panel-body">
                        {[
                            ["Versão", "1.0.0"],
                            ["Último Backup", daysAgo(1)],
                            ["Uptime", "99.97%"],
                        ].map(([k, v]) => (
                            <div key={k} className="summary-row">
                                <span className="summary-key">{k}</span>
                                <span className="font-bold" style={{ fontSize: 12 }}>{v}</span>
                            </div>
                        ))}
                        <div className="summary-row">
                            <span className="summary-key">Status DB</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.success }} />
                                Online
                            </span>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-sm">Armazenamento</div>
                                <div className="ml-auto text-muted text-sm">2.4 / 10 GB</div>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "24%", background: theme.accent }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="panel">
                    <div className="panel-header"><div className="panel-title">⌨️ Atalhos do Teclado</div></div>
                    <div className="panel-body">
                        {SHORTCUTS.map(s => (
                            <div key={s.keys} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: `1px solid ${theme.border}` }}>
                                <kbd style={{
                                    padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                                    background: theme.subtle, border: `1px solid ${theme.border}`, color: theme.text,
                                    fontFamily: "'Space Grotesk', monospace",
                                }}>
                                    {s.keys}
                                </kbd>
                                <div style={{ fontSize: 13 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2FA Setup Modal */}
            {show2FAModal && (
                <Modal title="🔐 Configurar 2FA" onClose={() => setShow2FAModal(false)}
                    footer={
                        <>
                            <button className="btn btn-ghost" onClick={() => setShow2FAModal(false)} aria-label="Cancelar 2FA">Cancelar</button>
                            <button className="btn btn-primary" onClick={verify2FA} disabled={code.length !== 6} aria-label="Verificar código 2FA">Verificar</button>
                        </>
                    }
                >
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <div className="text-muted" style={{ marginBottom: 16 }}>Escaneie o QR Code com seu autenticador:</div>
                        {/* Fake SVG QR Code */}
                        <svg width="160" height="160" viewBox="0 0 160 160" style={{ margin: "0 auto", display: "block" }} aria-label="QR Code para autenticação 2FA">
                            <rect width="160" height="160" fill={theme.bg} rx="8" />
                            {Array.from({ length: 12 }, (_, r) =>
                                Array.from({ length: 12 }, (_, c) => {
                                    const filled = (r + c) % 3 === 0 || (r * c) % 5 === 0 || (r < 3 && c < 3) || (r < 3 && c > 8) || (r > 8 && c < 3);
                                    return filled ? <rect key={`${r}-${c}`} x={12 + c * 11} y={12 + r * 11} width="10" height="10" fill={theme.text} rx="1" /> : null;
                                })
                            )}
                        </svg>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="twofa-code">Código de 6 dígitos</label>
                        <input
                            id="twofa-code"
                            className="form-control"
                            value={code}
                            onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            placeholder="000000"
                            maxLength={6}
                            style={{ textAlign: "center", fontSize: 24, letterSpacing: 8, fontFamily: "'Space Grotesk', monospace" }}
                            aria-label="Código de verificação 2FA"
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}
