import { useState, useEffect } from "react";
import { theme } from "../theme/theme";

/**
 * OnboardingTour: 4-step tooltip tour for first-time users.
 * Checks localStorage for 'auxilio_onboarded' flag.
 */

const TOUR_STEPS = [
    { title: "Navegação", description: "Use o menu lateral para navegar entre as páginas do sistema.", target: ".nav", position: "right" },
    { title: "Indicadores", description: "Acompanhe os KPIs em tempo real no painel principal.", target: ".stats-grid", position: "bottom" },
    { title: "Nova Entrega", description: "Registre entregas de cartões com o formulário passo a passo.", target: ".nav-item:nth-child(3)", position: "right" },
    { title: "Notificações", description: "Fique atento aos alertas e prazos do sistema.", target: ".icon-btn", position: "bottom" },
];

export default function OnboardingTour() {
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        try {
            if (!localStorage.getItem("auxilio_onboarded")) {
                setTimeout(() => setVisible(true), 1000);
            }
        } catch { /* localStorage unavailable */ }
    }, []);

    useEffect(() => {
        if (!visible) return;
        const el = document.querySelector(TOUR_STEPS[step]?.target);
        if (el) {
            const rect = el.getBoundingClientRect();
            const s = TOUR_STEPS[step];
            let top = rect.top;
            let left = rect.right + 16;
            if (s.position === "bottom") {
                top = rect.bottom + 12;
                left = rect.left;
            }
            setPos({ top, left, targetRect: rect });
        }
    }, [step, visible]);

    const finish = () => {
        setVisible(false);
        try { localStorage.setItem("auxilio_onboarded", "true"); } catch {}
    };

    const next = () => {
        if (step >= TOUR_STEPS.length - 1) { finish(); return; }
        setStep(s => s + 1);
    };

    if (!visible) return null;

    const currentStep = TOUR_STEPS[step];
    const isLast = step === TOUR_STEPS.length - 1;

    return (
        <div className="onboarding-overlay">
            {pos.targetRect && (
                <div className="onboarding-highlight" style={{
                    top: pos.targetRect.top - 4,
                    left: pos.targetRect.left - 4,
                    width: pos.targetRect.width + 8,
                    height: pos.targetRect.height + 8,
                }} />
            )}
            <div className="onboarding-tooltip" style={{ top: pos.top, left: pos.left }}>
                <div className="onboarding-step-num">{step + 1}/{TOUR_STEPS.length}</div>
                <div className="onboarding-title">{currentStep.title}</div>
                <div className="onboarding-desc">{currentStep.description}</div>
                <div className="onboarding-actions">
                    <button className="btn btn-ghost btn-sm" onClick={finish} aria-label="Pular tutorial">
                        Pular
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={next} aria-label={isLast ? "Finalizar tutorial" : "Próximo passo"}>
                        {isLast ? "Finalizar ✓" : "Próximo →"}
                    </button>
                </div>
            </div>
        </div>
    );
}
