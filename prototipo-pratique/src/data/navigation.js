/**
 * Navigation items configuration for sidebar and mobile bar.
 */
export const navItems = [
    { key: "dashboard", icon: "🏠", label: "Dashboard" },
    { key: "cartoes", icon: "🪪", label: "Cartões" },
    { key: "entrega", icon: "📤", label: "Nova Entrega" },
    { key: "devolucao", icon: "📥", label: "Devolução" },
    { key: "beneficiarios", icon: "👥", label: "Beneficiários" },
    { key: "relatorios", icon: "📊", label: "Relatórios" },
    { key: "notificacoes", icon: "🔔", label: "Notificações" },
    { key: "auditoria", icon: "📋", label: "Auditoria" },
    { key: "configuracoes", icon: "⚙️", label: "Configurações" },
    { key: "ajuda", icon: "❓", label: "Ajuda" },
];

/**
 * Page title and subtitle mapping for the topbar.
 */
export const pageTitles = {
    dashboard: { title: "Dashboard", sub: "Visão geral do sistema" },
    cartoes: { title: "Cartões de Auxílio", sub: "Gestão e rastreabilidade" },
    entrega: { title: "Nova Entrega", sub: "Registrar entrega de cartão" },
    devolucao: { title: "Devolução", sub: "Registrar devolução de cartão" },
    beneficiarios: { title: "Beneficiários", sub: "Gestão de beneficiários" },
    relatorios: { title: "Relatórios", sub: "Análises e exportação de dados" },
    notificacoes: { title: "Notificações", sub: "Alertas e configurações" },
    auditoria: { title: "Auditoria", sub: "Logs de conformidade LGPD" },
    configuracoes: { title: "Configurações", sub: "Perfil, segurança e sistema" },
    ajuda: { title: "Ajuda", sub: "Suporte e dúvidas frequentes" },
};
