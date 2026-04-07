import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";

/**
 * Topbar: Real-time clock (pt-BR), search trigger (Ctrl+K), and reactive notification dot.
 */
export default function Topbar({ title, subtitle, onSearchOpen, onNotificationsClick }) {
    const { state } = useAppContext();
    const [clock, setClock] = useState(new Date());
    const unreadCount = state.notificacoes.filter(n => n.unread).length;

    const [themeMode, setThemeMode] = useState(
        document.documentElement.getAttribute("data-theme") || "dark"
    );

    useEffect(() => {
        const interval = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        const newTheme = themeMode === "dark" ? "light" : "dark";
        setThemeMode(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const formattedClock = clock.toLocaleString("pt-BR", {
        weekday: "short", day: "2-digit", month: "short",
        hour: "2-digit", minute: "2-digit",
    });

    return (
        <div className="topbar">
            <div>
                <div className="topbar-title">{title}</div>
                <div className="topbar-subtitle">{subtitle}</div>
            </div>
            <div className="topbar-actions">
                <div className="topbar-clock" aria-live="polite" aria-label="Relógio do sistema">
                    {formattedClock}
                </div>
                <button
                    className="search-trigger-btn"
                    onClick={onSearchOpen}
                    aria-label="Abrir busca global (Ctrl+K)"
                >
                    <span style={{ color: theme.muted }}>🔍</span>
                    <span style={{ color: theme.muted, fontSize: 12 }}>Buscar...</span>
                    <kbd className="search-kbd">Ctrl+K</kbd>
                </button>
                <div className="icon-btn" onClick={toggleTheme} role="button" tabIndex={0} aria-label="Alternar tema">
                    {themeMode === "light" ? "🌙" : "☀️"}
                </div>
                <div className="icon-btn" onClick={onNotificationsClick} role="button" tabIndex={0} aria-label={`Notificações (${unreadCount} não lidas)`}>
                    🔔{unreadCount > 0 && <div className="notif-dot" />}
                </div>
                <div className="icon-btn" role="button" tabIndex={0} aria-label="Perfil do usuário">👤</div>
            </div>
        </div>
    );
}
