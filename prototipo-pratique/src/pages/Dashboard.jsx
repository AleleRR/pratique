import { useState, useEffect, useMemo, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { ChartBars, SkeletonLoader, SkeletonStat } from "../components";

/**
 * Dashboard page: KPI stats with count-up animation, donut chart,
 * real-time clock, activity feed, notification preview, and recent deliveries.
 */

export default function Dashboard({ onNav }) {
    const { state } = useAppContext();
    const { cartoes, movimentacoes, notificacoes } = state;

    const total = cartoes.length;
    const entregues = useMemo(() => cartoes.filter(c => c.status === "entregue").length, [cartoes]);
    const disponiveis = useMemo(() => cartoes.filter(c => c.status === "disponivel").length, [cartoes]);
    const bloqueados = useMemo(() => cartoes.filter(c => c.status === "bloqueado").length, [cartoes]);

    const statusBreakdown = useMemo(() => [
        { label: "Entregues", val: entregues, total, color: theme.success },
        { label: "Disponíveis", val: disponiveis, total, color: theme.accent },
        { label: "Bloqueados", val: bloqueados, total, color: theme.danger },
    ], [entregues, disponiveis, bloqueados, total]);

    const typeDistribution = useMemo(() => [
        { label: "Alimentação", count: cartoes.filter(c => c.tipo === "Alimentação").length, color: theme.accent },
        { label: "Transporte", count: cartoes.filter(c => c.tipo === "Transporte").length, color: theme.success },
        { label: "Saúde", count: cartoes.filter(c => c.tipo === "Saúde").length, color: theme.warning },
        { label: "Educação", count: cartoes.filter(c => c.tipo === "Educação").length, color: "#A855F7" },
    ], [cartoes]);

    const recentDeliveries = useMemo(() => movimentacoes
        .filter(m => m.tipo === "entrega")
        .slice(0, 5), [movimentacoes]);

    const recentActivities = useMemo(() => movimentacoes.slice(0, 5).map(m => ({
        tipo: m.tipo === "entrega" ? "entrega" : "devolucao",
        icon: m.tipo === "entrega" ? "📤" : "📥",
        texto: `Cartão ${m.cartaoId} ${m.tipo === "entrega" ? "entregue para" : "devolvido por"} ${m.beneficiario}`,
        tempo: m.data,
    })), [movimentacoes]);

    return (
        <SkeletonLoader skeleton={<DashboardSkeleton />} delay={600}>
            <div className="page">
                {/* Stats Cards with animated count-up */}
                <div className="stats-grid">
                    <AnimatedStatCard variant="blue" icon="🪪" value={total} label="Total de Cartões" change="↑ 12% este mês" changeType="up" />
                    <AnimatedStatCard variant="green" icon="✅" value={entregues} label="Entregues" change="↑ 8% esta semana" changeType="up" />
                    <AnimatedStatCard variant="amber" icon="🔓" value={disponiveis} label="Disponíveis" change="em estoque" changeType="" />
                    <AnimatedStatCard variant="red" icon="⛔" value={bloqueados} label="Bloqueados" change="requer atenção" changeType="down" />
                </div>

                <div className="grid-3-1">
                    {/* Monthly Chart */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">📊 Movimentações por Mês</div>
                            <span className="chip">2025</span>
                        </div>
                        <div className="panel-body">
                            <div className="flex items-center gap-2 mb-2">
                                <div style={{ fontSize: 24, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{movimentacoes.length}</div>
                                <span className="chip" style={{ color: theme.success, borderColor: "rgba(16,201,143,0.3)", background: "rgba(16,201,143,0.1)" }}>↑ 14%</span>
                            </div>
                            <div className="text-muted mb-4">Total de movimentações</div>
                            <ChartBars />
                        </div>
                    </div>

                    {/* Status Overview + Donut Chart */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">📋 Distribuição por Tipo</div>
                        </div>
                        <div className="panel-body">
                            <DonutChart data={typeDistribution} total={total} />
                            <div className="divider" />
                            {statusBreakdown.map(s => (
                                <div key={s.label} style={{ marginBottom: 10 }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-sm">{s.label}</div>
                                        <div className="ml-auto text-muted text-sm">{s.val}/{s.total}</div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${(s.val / s.total) * 100}%`, background: s.color }} />
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 8 }} onClick={() => onNav("cartoes")} aria-label="Ver todos os cartões">
                                Ver Todos os Cartões
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid-2">
                    {/* Activity Feed */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">🕐 Atividade Recente</div>
                            <button className="btn btn-ghost btn-sm" aria-label="Ver toda atividade">Ver tudo</button>
                        </div>
                        <div className="panel-body" style={{ paddingTop: 8, paddingBottom: 8 }}>
                            {recentActivities.map((a, i) => (
                                <div key={i} className="activity-item">
                                    <div className={`activity-dot ${a.tipo}`}>{a.icon}</div>
                                    <div className="activity-content">
                                        <div className="activity-text">{a.texto}</div>
                                        <div className="activity-time">{a.tempo}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notifications Preview */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">🔔 Notificações</div>
                            <span className="nav-badge" style={{ fontSize: 11 }}>{notificacoes.filter(n => n.unread).length}</span>
                        </div>
                        <div className="panel-body" style={{ paddingTop: 8, paddingBottom: 8 }}>
                            {notificacoes.slice(0, 4).map((n, i) => (
                                <div key={n.id || i} className={`notif-item ${n.unread ? "notif-unread" : ""}`}>
                                    <div className="notif-icon">{n.icon}</div>
                                    <div>
                                        <div className="notif-text">{n.texto}</div>
                                        <div className="notif-meta">{n.meta}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Deliveries mini-table */}
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">📤 Entregas Recentes</div>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: 20 }}>Cartão</th>
                                    <th>Beneficiário</th>
                                    <th>Responsável</th>
                                    <th style={{ paddingRight: 20 }}>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentDeliveries.map(m => (
                                    <tr key={m.id}>
                                        <td style={{ paddingLeft: 20 }}><span className="tag">{m.cartaoId}</span></td>
                                        <td style={{ fontSize: 13 }}>{m.beneficiario}</td>
                                        <td style={{ fontSize: 13 }}>{m.responsavel}</td>
                                        <td style={{ paddingRight: 20, fontSize: 12 }} className="text-muted">{m.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SkeletonLoader>
    );
}

/* ── Sub-components ── */

function AnimatedStatCard({ variant, icon, value, label, change, changeType }) {
    const [displayVal, setDisplayVal] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) { setDisplayVal(value); return; }
        hasAnimated.current = true;
        let frame = 0;
        const total = 40; // ~800ms at 20ms intervals
        const interval = setInterval(() => {
            frame++;
            setDisplayVal(Math.round((frame / total) * value));
            if (frame >= total) { clearInterval(interval); setDisplayVal(value); }
        }, 20);
        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className={`stat-card ${variant}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{displayVal}</div>
            <div className="stat-label">{label}</div>
            <div className={`stat-change ${changeType}`}>{change}</div>
        </div>
    );
}

function DonutChart({ data, total }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" aria-label="Gráfico de distribuição por tipo">
                {data.map((item, i) => {
                    const pct = item.count / total;
                    const dash = pct * circumference;
                    const strokeDash = `${dash} ${circumference - dash}`;
                    const currentOffset = offset;
                    offset += dash;
                    return (
                        <circle
                            key={i}
                            cx="50" cy="50" r={radius}
                            fill="none"
                            stroke={item.color}
                            strokeWidth="12"
                            strokeDasharray={strokeDash}
                            strokeDashoffset={-currentOffset}
                            transform="rotate(-90 50 50)"
                            style={{ transition: "stroke-dasharray 0.8s ease" }}
                        />
                    );
                })}
                <text x="50" y="54" textAnchor="middle" fill={theme.text} fontSize="16" fontWeight="700" fontFamily="Space Grotesk">{total}</text>
            </svg>
            <div style={{ fontSize: 11 }}>
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                        <span>{item.label}: {item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="page">
            <div className="stats-grid">
                {[1, 2, 3, 4].map(i => <SkeletonStat key={i} />)}
            </div>
            <div className="skeleton skeleton-card" style={{ height: 200, marginBottom: 16 }} />
            <div className="skeleton skeleton-card" style={{ height: 200 }} />
        </div>
    );
}
