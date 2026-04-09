import { theme } from "../theme/theme";
import { HelpCircle, Mail, MessageSquare } from "../components/Icons";

export default function Ajuda() {
    const FAQ = [
        {
            q: "Como registrar a entrega de um cartão?",
            a: "Vá em 'Nova Entrega' no menu, informe o cartão e o responsável (beneficiário), e confirme. O sistema registrará a ação na auditoria e mudará o status do cartão."
        },
        {
            q: "Como funciona a central de notificações?",
            a: "As notificações alertam sobre entregas, devoluções e anomalias sistêmicas. Há também uma aba 'Histórico a Beneficiários' que exibe as mensagens de SMS, WhatsApp e E-mail enviadas pela plataforma aos cidadãos."
        },
        {
            q: "O que fazer se um cartão for devolvido quebrado?",
            a: "Vá em 'Devolução', informe o código do cartão e selecione a condição (ex: Danificado). Ele ficará disponível para troca ou bloqueio definitivo."
        },
        {
            q: "Como acompanho a trilha de segurança (LGPD)?",
            a: "Todo acesso e modificação no sistema é gravado em 'Auditoria' de forma imutável, registrando operador, ação, horário e IP para garantir total conformidade com a LGPD e regras governamentais."
        }
    ];

    return (
        <div className="page" style={{ maxWidth: 800, margin: "0 auto" }}>
            <div className="panel" style={{ marginBottom: 24, background: `linear-gradient(135deg, ${theme.card}, var(--color-brand-subtle))` }}>
                <div className="panel-body" style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ marginBottom: 16, display:"flex", justifyContent:"center" }}>
                        <HelpCircle size={52} strokeWidth={1.5} color="var(--color-brand-action)" aria-hidden="true" />
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Como podemos ajudar?</div>
                    <div style={{ color: theme.muted, fontSize: 13, maxWidth: 400, margin: "0 auto" }}>
                        Encontre respostas rápidas para as dúvidas mais comuns sobre o uso da plataforma AuxílioPay.
                    </div>
                </div>
            </div>

            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">Dúvidas Frequentes (FAQ)</div>
                </div>
                <div className="panel-body" style={{ padding: "10px 20px" }}>
                    {FAQ.map((faq, index) => (
                        <div key={index} style={{ padding: "16px 0", borderBottom: index < FAQ.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 8, display: "flex", gap: 10 }}>
                                <span style={{ color: theme.accent }}>Q.</span> {faq.q}
                            </div>
                            <div style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6, paddingLeft: 24 }}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 24 }}>
                <div className="panel" style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 24, marginBottom: 12, display:"flex", justifyContent:"center" }}><Mail size={28} strokeWidth={1.5} color="var(--color-brand-action)" /></div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Suporte por E-mail</div>
                    <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>Retorno em até 24h úteis</div>
                    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>suporte@auxiliopay.com.br</button>
                </div>
                <div className="panel" style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 24, marginBottom: 12, display:"flex", justifyContent:"center" }}><MessageSquare size={28} strokeWidth={1.5} color="var(--color-brand-action)" /></div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Chat em Tempo Real</div>
                    <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>Atendimento imediato</div>
                    <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Iniciar Chat</button>
                </div>
            </div>
        </div>
    );
}
