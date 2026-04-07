import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { theme } from "../../theme/theme";

/**
 * ToastContainer: Fixed-position container that renders active toasts.
 * Auto-dismisses after 4s with countdown bar. Max 3 stacked.
 */

const TOAST_DURATION = 4000;

const TOAST_CONFIG = {
    success: { icon: "✅", color: theme.success, bg: "rgba(16,201,143,0.15)", border: "rgba(16,201,143,0.3)" },
    warning: { icon: "⚠️", color: theme.warning, bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
    error: { icon: "❌", color: theme.danger, bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
    info: { icon: "ℹ️", color: theme.accent, bg: "rgba(59,110,248,0.15)", border: "rgba(59,110,248,0.3)" },
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
