import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { Badge } from "../components";

/**
 * NovaEntrega page: Multi-step wizard with CPF validation,
 * animated card preview, and digital signature canvas.
 */

const INITIAL_FORM = { beneficiario: "", cpf: "", cartao: "", tipo: "Alimentação", observacao: "" };
const BENEFIT_TYPES = ["Alimentação", "Transporte", "Saúde", "Educação"];
const STEP_LABELS = ["Beneficiário", "Cartão", "Confirmação"];
const STEP_TITLES = ["👤 Dados do Beneficiário", "🪪 Selecionar Cartão", "✅ Confirmar Entrega"];
const TOTAL_STEPS = 3;
const SUCCESS_TIMEOUT_MS = 3000;
const RESPONSAVEL = "Admin João";

/** Real Brazilian CPF validation algorithm */
function validateCPF(cpf) {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    if (rest !== parseInt(digits[9])) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    return rest === parseInt(digits[10]);
}

export default function NovaEntrega() {
    const { state, dispatch, addToast } = useAppContext();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(INITIAL_FORM);
    const [sucesso, setSucesso] = useState(false);
    const [cpfError, setCpfError] = useState("");

    const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const resetForm = () => { setSucesso(false); setStep(1); setForm(INITIAL_FORM); setCpfError(""); };

    const handleCpfBlur = () => {
        if (form.cpf && !validateCPF(form.cpf)) {
            setCpfError("CPF inválido. Verifique os dígitos.");
        } else {
            setCpfError("");
        }
    };

    const handleSubmit = () => {
        if (!form.cartao || !form.beneficiario) return;
        const card = state.cartoes.find(c => c.id === form.cartao);
        dispatch({
            type: "DELIVER_CARD",
            payload: {
                cartaoId: form.cartao,
                beneficiario: form.beneficiario,
                cpf: form.cpf,
                tipo: form.tipo,
                responsavel: RESPONSAVEL,
                observacao: form.observacao,
            },
        });
        addToast("success", `Cartão ${form.cartao} entregue para ${form.beneficiario}!`);
        setSucesso(true);
        setTimeout(resetForm, SUCCESS_TIMEOUT_MS);
    };

    const selectedCard = form.cartao ? state.cartoes.find(c => c.id === form.cartao) : null;

    if (sucesso) return <SuccessScreen />;

    return (
        <div className="page">
            <StepIndicator currentStep={step} />
            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">{STEP_TITLES[step - 1]}</div>
                </div>
                <div className="panel-body">
                    {step === 1 && (
                        <StepBeneficiario
                            form={form}
                            onUpdate={updateField}
                            onNext={() => setStep(2)}
                            cpfError={cpfError}
                            onCpfBlur={handleCpfBlur}
                        />
                    )}
                    {step === 2 && (
                        <StepCartao
                            cartoes={state.cartoes}
                            selectedCartao={form.cartao}
                            onSelect={id => updateField("cartao", id)}
                            onBack={() => setStep(1)}
                            onNext={() => setStep(3)}
                            selectedCard={selectedCard}
                        />
                    )}
                    {step === 3 && (
                        <StepConfirmacao
                            form={form}
                            onUpdate={updateField}
                            onBack={() => setStep(2)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Sub-components ── */

function SuccessScreen() {
    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
            <svg width="80" height="80" viewBox="0 0 80 80" className="animated-check" aria-hidden="true">
                <circle cx="40" cy="40" r="36" fill="none" stroke={theme.success} strokeWidth="3" className="check-circle" />
                <polyline points="26,42 36,52 56,30" fill="none" stroke={theme.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-mark" />
            </svg>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700 }}>Entrega Registrada!</div>
            <div className="text-muted">Comprovante sendo gerado automaticamente...</div>
            <div className="alert alert-success" style={{ marginTop: 8 }}>
                <div className="alert-icon">📄</div>
                <div>Comprovante PDF gerado e enviado por e-mail para o responsável.</div>
            </div>
        </div>
    );
}

function StepIndicator({ currentStep }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(n => (
                <div key={n} className="flex items-center gap-2">
                    <div style={{
                        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: currentStep >= n ? theme.accent : theme.border, color: currentStep >= n ? "white" : theme.muted,
                        fontSize: 12, fontWeight: 700, transition: "all 0.2s",
                    }}>{n}</div>
                    {n < TOTAL_STEPS && <div style={{ height: 2, width: 40, background: currentStep > n ? theme.accent : theme.border, transition: "background 0.3s" }} />}
                </div>
            ))}
            <div className="text-muted ml-auto" style={{ fontSize: 12 }}>{STEP_LABELS[currentStep - 1]}</div>
        </div>
    );
}

function StepBeneficiario({ form, onUpdate, onNext, cpfError, onCpfBlur }) {
    const isValid = form.beneficiario && form.cpf && !cpfError;
    return (
        <>
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label" htmlFor="entrega-nome">Nome Completo</label>
                    <input id="entrega-nome" className="form-control" placeholder="João da Silva" value={form.beneficiario} onChange={e => onUpdate("beneficiario", e.target.value)} aria-label="Nome completo do beneficiário" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="entrega-cpf">CPF</label>
                    <input id="entrega-cpf" className="form-control" placeholder="000.000.000-00" value={form.cpf} onChange={e => onUpdate("cpf", e.target.value)} onBlur={onCpfBlur} aria-label="CPF do beneficiário" style={cpfError ? { borderColor: theme.danger } : {}} />
                    {cpfError && <div style={{ color: theme.danger, fontSize: 11, marginTop: 4 }}>{cpfError}</div>}
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="entrega-tipo">Tipo de Benefício</label>
                <select id="entrega-tipo" className="form-control" value={form.tipo} onChange={e => onUpdate("tipo", e.target.value)} aria-label="Tipo de benefício">
                    {BENEFIT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>
            <button className="btn btn-primary w-full" style={{ justifyContent: "center" }} onClick={onNext} disabled={!isValid} aria-label="Próximo passo">Próximo →</button>
        </>
    );
}

function StepCartao({ cartoes, selectedCartao, onSelect, onBack, onNext, selectedCard }) {
    const available = cartoes.filter(c => c.status === "disponivel");
    return (
        <>
            <div className="alert alert-warning">
                <div className="alert-icon">ℹ️</div>
                <div>Apenas cartões <strong>disponíveis</strong> aparecem. Cada cartão só pode ter um responsável ativo.</div>
            </div>
            {available.map(c => {
                const isSelected = selectedCartao === c.id;
                return (
                    <div key={c.id} onClick={() => onSelect(c.id)} style={{
                        border: `1px solid ${isSelected ? theme.accent : theme.border}`, borderRadius: 10, padding: "14px 16px",
                        marginBottom: 10, cursor: "pointer", background: isSelected ? theme.accentGlow : theme.subtle, transition: "all 0.15s",
                    }}>
                        <div className="flex items-center gap-2">
                            <div style={{ fontSize: 20 }}>🪪</div>
                            <div>
                                <div className="font-bold" style={{ fontSize: 13 }}>{c.id}</div>
                                <div className="text-muted">{c.numero} · {c.tipo} · {c.valor}</div>
                            </div>
                            {isSelected && <div className="ml-auto" style={{ color: theme.accent, fontSize: 20 }}>✓</div>}
                        </div>
                    </div>
                );
            })}
            {/* Animated card preview when selected */}
            {selectedCard && (
                <div className="card-preview holographic-card" style={{ marginTop: 12, animation: "slideUp 0.3s ease" }}>
                    <div className="card-chip" />
                    <div className="card-number">{selectedCard.numero}</div>
                    <div className="card-holder">{selectedCard.tipo}</div>
                    <div className="card-badge-status"><Badge status="disponivel" /></div>
                </div>
            )}
            <div className="flex gap-2 mt-2">
                <button className="btn btn-ghost" onClick={onBack} aria-label="Voltar">← Voltar</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={onNext} disabled={!selectedCartao} aria-label="Próximo passo">Próximo →</button>
            </div>
        </>
    );
}

function StepConfirmacao({ form, onUpdate, onBack, onSubmit }) {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = theme.subtle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = theme.text;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
    }, []);

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDraw = (e) => {
        e.preventDefault();
        setDrawing(true);
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getPos(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!drawing) return;
        e.preventDefault();
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getPos(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const endDraw = () => setDrawing(false);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = theme.subtle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const summary = [["Beneficiário", form.beneficiario], ["CPF", form.cpf], ["Tipo", form.tipo], ["Cartão", form.cartao]];

    return (
        <>
            <div style={{ background: theme.subtle, borderRadius: 12, padding: "16px 20px", marginBottom: 20, border: `1px solid ${theme.border}` }}>
                {summary.map(([k, v]) => (
                    <div key={k} className="summary-row">
                        <span className="summary-key">{k}</span>
                        <span className="font-bold" style={{ fontSize: 13 }}>{v}</span>
                    </div>
                ))}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="entrega-obs">Observações (opcional)</label>
                <textarea id="entrega-obs" className="form-control" rows={2} placeholder="Observações..." value={form.observacao} onChange={e => onUpdate("observacao", e.target.value)} style={{ resize: "none" }} aria-label="Observações" />
            </div>
            <div className="form-group">
                <div className="flex items-center gap-2 mb-2">
                    <label className="form-label" style={{ margin: 0 }}>Assinatura Digital</label>
                    <button className="btn btn-ghost btn-sm ml-auto" onClick={clearCanvas} aria-label="Limpar assinatura" style={{ fontSize: 11 }}>Limpar</button>
                </div>
                <canvas
                    ref={canvasRef}
                    width={380}
                    height={100}
                    style={{ borderRadius: 8, border: `1px solid ${theme.border}`, cursor: "crosshair", width: "100%", touchAction: "none" }}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={endDraw}
                    aria-label="Área de assinatura digital"
                />
            </div>
            <div className="alert alert-success">
                <div className="alert-icon">🔒</div>
                <div>Dados criptografados com AES-256. Comprovante PDF será gerado automaticamente.</div>
            </div>
            <div className="flex gap-2">
                <button className="btn btn-ghost" onClick={onBack} aria-label="Voltar">← Voltar</button>
                <button className="btn btn-success" style={{ flex: 1, justifyContent: "center" }} onClick={onSubmit} aria-label="Confirmar entrega">✅ Confirmar Entrega</button>
            </div>
        </>
    );
}
