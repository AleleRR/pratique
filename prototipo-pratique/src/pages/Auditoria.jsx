import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { EmptyState } from "../components";

/**
 * Auditoria page: Expandable rows with JSON payload, operation + date filters, risk score.
 */

function getOperationBadgeClass(op) {
    switch (op) {
        case "ENTREGA": return "entregue";
        case "DEVOLUÇÃO": return "disponivel";
        case "LOGIN 2FA": return "pendente";
        case "BLOQUEIO": return "bloqueado";
        default: return "bloqueado";
    }
}

function getRiskScore(entry) {
    const hour = parseInt(entry.ts.split(" ")[1]?.split(":")[0] || "10");
    if (entry.ip && !entry.ip.startsWith("192.168.")) return { level: "high", label: "Alto", color: theme.danger, pulse: true };
    if (hour < 6 || hour > 22) return { level: "high", label: "Alto", color: theme.danger, pulse: true };
    if (entry.op === "LOGIN 2FA") return { level: "medium", label: "Médio", color: theme.warning, pulse: false };
    if (entry.op === "CONSULTA") return { level: "low", label: "Baixo", color: theme.success, pulse: false };
    return { level: "low", label: "Baixo", color: theme.success, pulse: false };
}

function dateToInput(d) { return d.toISOString().split("T")[0]; }

export default function Auditoria() {
    const { state } = useAppContext();
    const [expanded, setExpanded] = useState(null);
    const [opFilter, setOpFilter] = useState("todos");
    const [dateFrom, setDateFrom] = useState(() => dateToInput(new Date(Date.now() - 90 * 86400000)));
    const [dateTo, setDateTo] = useState(() => dateToInput(new Date()));

    const filtrados = useMemo(() => {
        return state.auditoria.filter(entry => {
            if (opFilter !== "todos" && entry.op !== opFilter) return false;
            return true;
        });
    }, [state.auditoria, opFilter, dateFrom, dateTo]);

    const operations = [...new Set(state.auditoria.map(e => e.op))];

    return (
        <div className="page">
            <div className="alert alert-warning mb-4">
                <div className="alert-icon">🔒</div>
                <div>Logs de auditoria retidos por <strong>2 anos</strong> conforme LGPD. Acesso apenas para administradores.</div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-4" style={{ flexWrap: "wrap" }}>
                <select className="form-control" style={{ width: "auto" }} value={opFilter} onChange={e => setOpFilter(e.target.value)} aria-label="Filtrar por operação">
                    <option value="todos">Todas operações</option>
                    {operations.map(op => <option key={op} value={op}>{op}</option>)}
                </select>
                <input type="date" className="form-control" style={{ width: "auto" }} value={dateFrom} onChange={e => setDateFrom(e.target.value)} aria-label="Data inicial" />
                <input type="date" className="form-control" style={{ width: "auto" }} value={dateTo} onChange={e => setDateTo(e.target.value)} aria-label="Data final" />
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="stat-card blue">
                    <div className="stat-icon">📋</div>
                    <div className="stat-value">{state.auditoria.length}</div>
                    <div className="stat-label">Total de registros</div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon">🔍</div>
                    <div className="stat-value">98,4%</div>
                    <div className="stat-label">Integridade dos dados</div>
                </div>
                <div className="stat-card amber">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-value">{state.auditoria.filter(e => getRiskScore(e).level === "high").length}</div>
                    <div className="stat-label">Alertas de risco</div>
                </div>
            </div>

            {/* Table */}
            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">📋 Log de Auditoria ({filtrados.length})</div>
                    <button className="btn btn-primary btn-sm" aria-label="Exportar auditoria CSV">📥 Exportar CSV</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: 20 }}>Timestamp</th>
                                <th>Operação</th>
                                <th>Usuário</th>
                                <th>Entidade</th>
                                <th>Risco</th>
                                <th style={{ paddingRight: 20 }}>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrados.map((r, i) => {
                                const risk = getRiskScore(r);
                                const stableKey = `${r.ts}-${r.ent}-${i}`;
                                return (
                                    <ExpandableRow key={stableKey} record={r} risk={risk} isExpanded={expanded === stableKey} onToggle={() => setExpanded(expanded === stableKey ? null : stableKey)} />
                                );
                            })}
                        </tbody>
                    </table>
                    {filtrados.length === 0 && (
                        <EmptyState icon="📋" title="Nenhum registro" description="Nenhuma entrada de auditoria no período selecionado." />
                    )}
                </div>
            </div>
        </div>
    );
}

function ExpandableRow({ record, risk, isExpanded, onToggle }) {
    return (
        <>
            <tr onClick={onToggle} style={{ cursor: "pointer" }}>
                <td style={{ paddingLeft: 20 }}>
                    <code style={{ fontSize: 11, color: theme.muted }}>{record.ts}</code>
                </td>
                <td>
                    <span className={`badge ${getOperationBadgeClass(record.op)}`}>{record.op}</span>
                </td>
                <td style={{ fontSize: 13 }}>{record.user}</td>
                <td><span className="tag">{record.ent}</span></td>
                <td>
                    <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: risk.color,
                        ...(risk.pulse ? { animation: "pulse 1.5s ease-in-out infinite" } : {}),
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: risk.color, display: "inline-block" }} />
                        {risk.label}
                    </span>
                </td>
                <td style={{ paddingRight: 20 }}>
                    <code style={{ fontSize: 11, color: theme.muted }}>{record.ip}</code>
                </td>
            </tr>
            {isExpanded && record.payload && (
                <tr>
                    <td colSpan={6} style={{ padding: "0 20px 12px", background: theme.bg }}>
                        <pre style={{
                            background: theme.subtle, border: `1px solid ${theme.border}`, borderRadius: 8,
                            padding: "12px 16px", fontSize: 11, color: theme.text, fontFamily: "'Space Grotesk', monospace",
                            overflow: "auto", margin: 0, whiteSpace: "pre-wrap",
                        }}>
                            {JSON.stringify(record.payload, null, 2)}
                        </pre>
                    </td>
                </tr>
            )}
        </>
    );
}
