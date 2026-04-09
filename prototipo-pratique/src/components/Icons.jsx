/**
 * Icons — centralised Lucide icon registry for the AuxílioPay design system.
 * All icons follow the brand kit spec: outline, 1.75 stroke-width, currentColor.
 *
 * Usage:
 *   <Icon name="dashboard" size={18} />
 *   <Icon name="bell" size={20} color="var(--color-brand-action)" />
 */
import {
    LayoutDashboard,
    CreditCard,
    PackagePlus,
    PackageMinus,
    Users,
    BarChart3,
    Bell,
    ShieldCheck,
    Settings,
    HelpCircle,
    Search,
    UserCircle,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Info,
    FileText,
    Download,
    Lock,
    Mail,
    Smartphone,
    MessageSquare,
    Clock,
    Archive,
    Activity,
    TrendingUp,
    ShieldAlert,
    ClipboardList,
    LogOut,
    RefreshCw,
    ChevronRight,
    Plus,
    Filter,
    Eye,
    Send,
    Boxes,
    Building2,
    KeyRound,
    FileCheck,
    ScanLine,
    Fingerprint,
    UserCheck,
    AlertCircle,
    FileBarChart2,
    DatabaseZap,
    History,
    Monitor,
    Keyboard,
} from "lucide-react";

const ICON_MAP = {
    /* ── Navigation ─────────────────────────── */
    "dashboard":        LayoutDashboard,
    "credit-card":      CreditCard,
    "card-deliver":     PackagePlus,
    "card-return":      PackageMinus,
    "users":            Users,
    "chart":            FileBarChart2,
    "bell":             Bell,
    "audit":            ShieldCheck,
    "settings":         Settings,
    "help":             HelpCircle,

    /* ── Actions ────────────────────────────── */
    "search":           Search,
    "user":             UserCircle,
    "user-check":       UserCheck,
    "download":         Download,
    "refresh":          RefreshCw,
    "send":             Send,
    "plus":             Plus,
    "filter":           Filter,
    "eye":              Eye,
    "history":          History,
    "chevron-right":    ChevronRight,
    "logout":           LogOut,

    /* ── Feedback ────────────────────────────── */
    "alert":            AlertTriangle,
    "alert-circle":     AlertCircle,
    "check":            CheckCircle2,
    "error":            XCircle,
    "info":             Info,
    "shield-alert":     ShieldAlert,

    /* ── Domain ──────────────────────────────── */
    "file":             FileText,
    "file-check":       FileCheck,
    "file-chart":       FileBarChart2,
    "lock":             Lock,
    "key":              KeyRound,
    "fingerprint":      Fingerprint,
    "shield":           ShieldCheck,
    "mail":             Mail,
    "phone":            Smartphone,
    "message":          MessageSquare,
    "package":          Boxes,
    "scan":             ScanLine,
    "clock":            Clock,
    "archive":          Archive,
    "activity":         Activity,
    "trending":         TrendingUp,
    "clipboard":        ClipboardList,
    "building":         Building2,
    "database":         DatabaseZap,
};

/**
 * Icon — renders a named Lucide icon.
 * @param {{ name: string, size?: number, strokeWidth?: number, color?: string, style?: object, className?: string }} props
 */
export function Icon({ name, size = 16, strokeWidth = 1.75, color, style, className }) {
    const Component = ICON_MAP[name];
    if (!Component) return null;
    return (
        <Component
            size={size}
            strokeWidth={strokeWidth}
            color={color}
            style={style}
            className={className}
            aria-hidden="true"
        />
    );
}

/* Re-export individual Lucide components for direct use in pages. */
export {
    LayoutDashboard, CreditCard, PackagePlus, PackageMinus,
    Users, FileBarChart2, BarChart3, Bell, ShieldCheck, Settings, HelpCircle,
    Search, UserCircle, AlertTriangle, CheckCircle2, XCircle, Info,
    FileText, Download, Lock, Mail, Smartphone, MessageSquare,
    Clock, Archive, Activity, TrendingUp, ShieldAlert, ClipboardList,
    RefreshCw, History, KeyRound, FileCheck, ScanLine, Fingerprint,
    UserCheck, AlertCircle, DatabaseZap, Boxes, Building2, Send,
    Monitor, Keyboard, Eye,
};
