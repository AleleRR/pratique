import { useAppContext } from "../context/AppContext";
import { theme } from "../theme/theme";

/**
 * MobileBar: Bottom tab bar for mobile viewports. Shows top 5 nav items.
 */
const MOBILE_ITEMS = [
    { key: "dashboard", icon: "🏠", label: "Home" },
    { key: "cartoes", icon: "🪪", label: "Cartões" },
    { key: "entrega", icon: "📤", label: "Entrega" },
    { key: "notificacoes", icon: "🔔", label: "Alertas" },
    { key: "configuracoes", icon: "⚙️", label: "Config" },
];

export default function MobileBar({ activePage, onNavigate }) {
    const { state } = useAppContext();
    const unread = state.notificacoes.filter(n => n.unread).length;

    return (
        <div className="mobile-bar" aria-label="Navegação mobile">
            {MOBILE_ITEMS.map(item => (
                <div
                    key={item.key}
                    className={`mobile-tab ${activePage === item.key ? "active" : ""}`}
                    onClick={() => onNavigate(item.key)}
                    role="button"
                    tabIndex={0}
                    aria-label={item.label}
                >
                    <div className="tab-icon" style={{ position: "relative" }}>
                        {item.icon}
                        {item.key === "notificacoes" && unread > 0 && (
                            <span style={{
                                position: "absolute", top: -4, right: -8,
                                background: theme.danger, color: "white",
                                fontSize: 8, fontWeight: 700, padding: "1px 4px",
                                borderRadius: 6, minWidth: 14, textAlign: "center",
                            }}>
                                {unread}
                            </span>
                        )}
                    </div>
                    <div className="tab-label">{item.label}</div>
                </div>
            ))}
        </div>
    );
}
