import { theme } from "../theme/theme";
import { Icon } from "./Icons";

/**
 * EmptyState: Displayed when a list/table has no items.
 * Accepts either a legacy emoji string or an icon key string for the Icon component.
 */

const ILLUSTRATIONS = {
    "search": (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <circle cx="34" cy="34" r="22" stroke={theme.border} strokeWidth="3" fill={theme.subtle} />
            <line x1="50" y1="50" x2="68" y2="68" stroke={theme.border} strokeWidth="4" strokeLinecap="round" />
            <circle cx="34" cy="34" r="10" stroke={theme.muted} strokeWidth="2" fill="none" strokeDasharray="4 3" />
        </svg>
    ),
    "users": (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <circle cx="30" cy="28" r="10" stroke={theme.border} strokeWidth="2.5" fill={theme.subtle} />
            <circle cx="50" cy="28" r="10" stroke={theme.border} strokeWidth="2.5" fill={theme.subtle} />
            <path d="M12 62c0-12 10-18 18-18s18 6 18 18" stroke={theme.border} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M32 62c0-12 10-18 18-18s18 6 18 18" stroke={theme.border} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
    ),
    "audit": (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <rect x="18" y="10" width="44" height="60" rx="6" stroke={theme.border} strokeWidth="2.5" fill={theme.subtle} />
            <rect x="28" y="4" width="24" height="12" rx="4" stroke={theme.border} strokeWidth="2" fill={theme.card} />
            <line x1="28" y1="30" x2="52" y2="30" stroke={theme.border} strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="40" x2="48" y2="40" stroke={theme.border} strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="50" x2="44" y2="50" stroke={theme.border} strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
};

const IconFallback = ({ icon }) => {
    if (ILLUSTRATIONS[icon]) return ILLUSTRATIONS[icon];
    return (
        <div style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "50%", background: theme.subtle, border: `2px solid ${theme.border}` }}>
            <Icon name={icon} size={36} color={theme.muted} />
        </div>
    );
};

export default function EmptyState({ icon, title, description, ctaLabel, onCta }) {
    return (
        <div className="empty-state-container" role="status">
            <div className="empty-state-icon-wrap">
                <IconFallback icon={icon} />
            </div>
            <div className="empty-state-title">{title}</div>
            <div className="empty-state-desc">{description}</div>
            {ctaLabel && onCta && (
                <button className="btn btn-primary" onClick={onCta} style={{ marginTop: 16 }} aria-label={ctaLabel}>
                    {ctaLabel}
                </button>
            )}
        </div>
    );
}
