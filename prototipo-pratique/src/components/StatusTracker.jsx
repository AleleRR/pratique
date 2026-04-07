/**
 * StatusTracker component: Multi-step progress indicator showing
 * the lifecycle of a benefit card (cadastro → disponível → entregue → devolvido).
 *
 * @param {{ status: string }} props
 */
const STEPS = [
    { key: "cadastro", label: "Cadastrado" },
    { key: "disponivel", label: "Disponível" },
    { key: "entregue", label: "Entregue" },
    { key: "devolvido", label: "Devolvido" },
];

const STATUS_INDEX = {
    cadastro: 0,
    disponivel: 1,
    entregue: 2,
    devolvido: 3,
};

function getDotClass(stepIndex, currentIndex) {
    if (stepIndex < currentIndex) return "done";
    if (stepIndex === currentIndex) return "active";
    return "pending";
}

export default function StatusTracker({ status }) {
    const currentIndex = status === "bloqueado" ? 0 : (STATUS_INDEX[status] ?? 1);

    return (
        <div className="tracker">
            {STEPS.map((step, index) => (
                <div key={step.key} className="tracker-step">
                    <div className="tracker-dot-row">
                        <div className={`tracker-dot ${getDotClass(index, currentIndex)}`}>
                            {index < currentIndex ? "✓" : index + 1}
                        </div>
                        {index < STEPS.length - 1 && (
                            <div className={`tracker-line ${index < currentIndex ? "done" : ""}`} />
                        )}
                    </div>
                    <div className={`tracker-label ${index === currentIndex ? "active" : ""}`}>
                        {step.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
