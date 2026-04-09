import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";
import { navItems } from "../data";
import { Icon, CreditCard } from "../components/Icons";

/**
 * Sidebar layout: Reactive notification badge from context.
 */
export default function Sidebar({ activePage, onNavigate }) {
    const { state } = useAppContext();
    const unreadCount = state.notificacoes.filter(n => n.unread).length;

    return (
        <div className="sidebar">
            <SidebarLogo />
            <SidebarNav activePage={activePage} onNavigate={onNavigate} unreadCount={unreadCount} />
            <SidebarFooter />
        </div>
    );
}

function SidebarLogo() {
    return (
        <div className="sidebar-logo">
            <div className="logo-badge">
                <div className="logo-icon"><CreditCard size={20} strokeWidth={1.75} color="white" aria-hidden="true" /></div>
                <div>
                    <div className="logo-text">AuxílioPay</div>
                    <div className="logo-sub">Gestão de Cartões</div>
                </div>
            </div>
        </div>
    );
}

function SidebarNav({ activePage, onNavigate, unreadCount }) {
    const mainItems = navItems.filter(i => !["configuracoes", "ajuda"].includes(i.key));
    return (
        <nav className="nav" aria-label="Navegação principal">
            <div className="nav-section-label">Menu Principal</div>
            {mainItems.map(item => (
                <div
                    key={item.key}
                    className={`nav-item ${activePage === item.key ? "active" : ""}`}
                    onClick={() => onNavigate(item.key)}
                    role="button"
                    tabIndex={0}
                    aria-label={item.label}
                    onKeyDown={e => e.key === "Enter" && onNavigate(item.key)}
                >
                    <span className="icon"><Icon name={item.icon} size={16} /></span>
                    {item.label}
                    {item.key === "notificacoes" && unreadCount > 0 && (
                        <span className="nav-badge">{unreadCount}</span>
                    )}
                </div>
            ))}
            <div className="nav-section-label" style={{ marginTop: 12 }}>Sistema</div>
            <div
                className={`nav-item ${activePage === "configuracoes" ? "active" : ""}`}
                onClick={() => onNavigate("configuracoes")}
                role="button"
                tabIndex={0}
                aria-label="Configurações"
            >
                <span className="icon"><Icon name="settings" size={16} /></span>Configurações
            </div>
            <div 
                className={`nav-item ${activePage === "ajuda" ? "active" : ""}`}
                onClick={() => onNavigate("ajuda")}
                role="button" 
                tabIndex={0} 
                aria-label="Ajuda"
            >
                <span className="icon"><Icon name="help" size={16} /></span>Ajuda
            </div>
        </nav>
    );
}

function SidebarFooter() {
    return (
        <div className="sidebar-footer">
            <div style={{ fontSize: 10, color: theme.muted, padding: "4px 10px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.success }} />
                Sistema online · AES-256
            </div>
            <div className="user-chip">
                <div className="avatar">AJ</div>
                <div className="user-info">
                    <div className="user-name">Admin João</div>
                    <div className="user-role">Administrador</div>
                </div>
            </div>
        </div>
    );
}
