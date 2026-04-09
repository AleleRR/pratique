import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { Search, Bell, UserCircle } from "../components/Icons";

/**
 * Topbar: Real-time clock (pt-BR), search trigger (Ctrl+K), and reactive notification dot.
 */
export default function Topbar({ title, subtitle, onSearchOpen, onNotificationsClick }) {
    const { state } = useAppContext();
    const [clock, setClock] = useState(new Date());
    const unreadCount = state.notificacoes.filter(n => n.unread).length;

    useEffect(() => {
        const interval = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

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
                    <Search size={14} color={theme.muted} />
                    <span style={{ color: theme.muted, fontSize: 12 }}>Buscar...</span>
                    <kbd className="search-kbd">Ctrl+K</kbd>
                </button>
                <div className="icon-btn" onClick={onNotificationsClick} role="button" tabIndex={0} aria-label={`Notificações (${unreadCount} não lidas)`}>
                    <Bell size={18} />{unreadCount > 0 && <div className="notif-dot" />}
                </div>
                <div className="icon-btn" role="button" tabIndex={0} aria-label="Perfil do usuário"><UserCircle size={18} /></div>
            </div>
        </div>
    );
}
