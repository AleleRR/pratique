import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

/**
 * ToastContainer: Fixed-position container that renders active toasts.
 * Auto-dismisses after 4s with countdown bar. Max 3 stacked.
 */

const TOAST_DURATION = 4000;

const TOAST_CONFIG = {
    success: { icon: "✅", color: "var(--color-success-700)", bg: "var(--color-success-100)", border: "var(--color-success-border)" },
    warning: { icon: "⚠️", color: "var(--color-warning-700)", bg: "var(--color-warning-100)", border: "var(--color-warning-border)" },
    error:   { icon: "❌", color: "var(--color-error-700)",   bg: "var(--color-error-100)",   border: "var(--color-error-border)" },
    info:    { icon: "ℹ️", color: "var(--color-brand-action)", bg: "var(--color-brand-subtle)", border: "var(--color-brand-light)" },
};

function ToastItem({ toast, onDismiss }) {
    const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;

    useEffect(() => {
        const timer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION);
        return () => clearTimeout(timer);
    }, [toast.id, onDismiss]);

    return (
        <div
            className="toast-item"
            role="alert"
            aria-live="polite"
            style={{ background: config.bg, borderColor: config.border }}
        >
            <div className="toast-icon">{config.icon}</div>
            <div className="toast-message">{toast.message}</div>
            <button
                className="toast-close"
                onClick={() => onDismiss(toast.id)}
                aria-label="Fechar notificação"
            >
                ×
            </button>
            <div className="toast-progress" style={{ background: config.color }} />
        </div>
    );
}

export default function ToastContainer() {
    const { state, dispatch } = useAppContext();

    const handleDismiss = (id) => {
        dispatch({ type: "DISMISS_TOAST", payload: { id } });
    };

    if (state.toasts.length === 0) return null;

    return (
        <div className="toast-container" aria-label="Notificações do sistema">
            {state.toasts.map(t => (
                <ToastItem key={t.id} toast={t} onDismiss={handleDismiss} />
            ))}
        </div>
    );
}
