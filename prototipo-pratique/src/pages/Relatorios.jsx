import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { PackagePlus, PackageMinus, Clock, FileBarChart2, ClipboardList, Download, Users } from "../components/Icons";

/**
 * Relatorios page: Date range filter, KPI summary, movements table, CSV export, top beneficiaries.
 */

function dateToInput(d) {
    return d.toISOString().split("T")[0];
}

export default function Relatorios() {
    const { state, addToast } = useAppContext();
    const [from, setFrom] = useState(() => dateToInput(new Date(Date.now() - 90 * 86400000)));
    const [to, setTo] = useState(() => dateToInput(new Date()));

    const fromDate = new Date(from + "T00:00:00");
    const toDate = new Date(to + "T23:59:59");

    const movFiltradas = useMemo(() =>
        state.movimentacoes.filter(m => m.dataObj && m.dataObj >= fromDate && m.dataObj <= toDate),
        [state.movimentacoes, from, to]
    );

    const totalEntregas = movFiltradas.filter(m => m.tipo === "entrega").length;
    const totalDevolucoes = movFiltradas.filter(m => m.tipo === "devolucao").length;
    const devolucoes = movFiltradas.filter(m => m.tipo === "devolucao");
    const avgReturnDays = devolucoes.length > 0
        ? Math.round(devolucoes.reduce((sum, d) => {
            const entregas = state.movimentacoes.filter(m => m.cartaoId === d.cartaoId && m.tipo === "entrega" && m.dataObj < d.dataObj);
            const lastEntrega = entregas[0];
            if (!lastEntrega) return sum;
            return sum + Math.round((d.dataObj - lastEntrega.dataObj) / 86400000);
        }, 0) / devolucoes.length)
        : 0;
    const complianceRate = totalEntregas > 0 ? Math.round((totalDevolucoes / totalEntregas) * 100) : 100;

    const topBeneficiarios = useMemo(() => {
        const counts = {};
        movFiltradas.filter(m => m.tipo === "entrega").forEach(m => {
            counts[m.beneficiario] = (counts[m.beneficiario] || 0) + 1;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }, [movFiltradas]);

    const handleExportCSV = () => {
        const header = "ID,Cartão,Tipo,Beneficiário,Responsável,Data,Observação\n";
        const rows = movFiltradas.map(m =>
            `${m.id},${m.cartaoId},${m.tipo},${m.beneficiario},${m.responsavel},"${m.data}","${m.observacao || ""}"`
        ).join("\n");
        const csv = header + rows;
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `relatorio_${from}_${to}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        addToast("success", "Relatório CSV exportado com sucesso!");
    };

    return (
        <div className="page">
            {/* Date Range */}
            <div className="flex items-center gap-2 mb-4" style={{ flexWrap: "wrap" }}>
                <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="date-from">De</label>
                    <input id="date-from" type="date" className="form-control" value={from} onChange={e => setFrom(e.target.value)} aria-label="Data inicial" />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="date-to">Até</label>
                    <input id="date-to" type="date" className="form-control" value={to} onChange={e => setTo(e.target.value)} aria-label="Data final" />
                </div>
                <button className="btn btn-primary" onClick={handleExportCSV} style={{ marginTop: 18 }} aria-label="Exportar relatório CSV">
                    <Download size={14} style={{marginRight:4}}/>Exportar CSV
                </button>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-icon"><PackagePlus size={22} strokeWidth={1.75} /></div>
                    <div className="stat-value">{totalEntregas}</div>
                    <div className="stat-label">Entregas</div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon"><PackageMinus size={22} strokeWidth={1.75} /></div>
                    <div className="stat-value">{totalDevolucoes}</div>
                    <div className="stat-label">Devoluções</div>
                </div>
                <div className="stat-card amber">
                    <div className="stat-icon"><Clock size={22} strokeWidth={1.75} /></div>
                    <div className="stat-value">{avgReturnDays}d</div>
                    <div className="stat-label">Tempo Médio Devolução</div>
                </div>
                <div className="stat-card red">
                    <div className="stat-icon"><FileBarChart2 size={22} strokeWidth={1.75} /></div>
                    <div className="stat-value">{complianceRate}%</div>
                    <div className="stat-label">Taxa de Conformidade</div>
                </div>
            </div>

            <div className="grid-2">
                {/* Movements Table */}
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title" style={{ display:"flex", alignItems:"center", gap:6 }}><ClipboardList size={15} />Movimentações ({movFiltradas.length})</div>
                    </div>
                    <div style={{ overflowX: "auto", maxHeight: 400 }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: 20 }}>ID</th>
                                    <th>Cartão</th>
                                    <th>Tipo</th>
                                    <th>Beneficiário</th>
                                    <th style={{ paddingRight: 20 }}>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movFiltradas.slice(0, 20).map(m => (
                                    <tr key={m.id}>
                                        <td style={{ paddingLeft: 20 }}><span className="tag">{m.id}</span></td>
                                        <td><span className="tag">{m.cartaoId}</span></td>
                                        <td>
                                            <span className={`badge ${m.tipo === "entrega" ? "entregue" : "disponivel"}`}>
                                                {m.tipo === "entrega" ? "Entrega" : "Devolução"}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: 13 }}>{m.beneficiario}</td>
                                        <td style={{ paddingRight: 20, fontSize: 12 }} className="text-muted">{m.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {movFiltradas.length === 0 && (
                            <div className="text-muted" style={{ textAlign: "center", padding: 24 }}>Nenhuma movimentação no período selecionado.</div>
                        )}
                    </div>
                </div>

                {/* Top Beneficiaries */}
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title" style={{ display:"flex", alignItems:"center", gap:6 }}><Users size={15} />Top Beneficiários</div>
                    </div>
                    <div className="panel-body">
                        {topBeneficiarios.length === 0 && <div className="text-muted">Sem dados no período.</div>}
                        {topBeneficiarios.map(([name, count], i) => (
                            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < topBeneficiarios.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                                <div style={{
                                    width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                    background: i === 0 ? theme.accent : theme.border, color: i === 0 ? "white" : theme.muted,
                                    fontSize: 11, fontWeight: 700,
                                }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1, fontSize: 13 }}>{name}</div>
                                <div className="chip">{count} cartões</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
