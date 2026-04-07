/**
 * Mock data: 10+ notifications with mixed read/unread states.
 */
export const notificacoes = [
    { id: "NOT-001", icon: "⚠️", texto: "Prazo de devolução do CAR-001 vence em 5 dias", meta: "Alerta automático • há 2h", unread: true },
    { id: "NOT-002", icon: "✅", texto: "Comprovante de entrega gerado para Maria da Silva", meta: "Sistema • há 3h", unread: true },
    { id: "NOT-003", icon: "📧", texto: "E-mail enviado para João Pereira sobre disponibilidade", meta: "Notificação • há 1 dia", unread: false },
    { id: "NOT-004", icon: "🔐", texto: "Acesso de novo usuário autenticado com 2FA", meta: "Segurança • há 2 dias", unread: false },
    { id: "NOT-005", icon: "⚠️", texto: "Cartão CAR-012 reportado como perdido — bloqueio automático", meta: "Alerta • há 3 dias", unread: true },
    { id: "NOT-006", icon: "📤", texto: "Cartão CAR-020 entregue para Thiago Carvalho", meta: "Sistema • há 4 dias", unread: false },
    { id: "NOT-007", icon: "📥", texto: "Cartão CAR-007 devolvido por Luciana Oliveira", meta: "Sistema • há 5 dias", unread: false },
    { id: "NOT-008", icon: "🔒", texto: "Backup semanal realizado com sucesso", meta: "Sistema • há 6 dias", unread: false },
    { id: "NOT-009", icon: "⚠️", texto: "Tentativa de login fora do horário comercial detectada", meta: "Segurança • há 7 dias", unread: true },
    { id: "NOT-010", icon: "📊", texto: "Relatório mensal de movimentações disponível para download", meta: "Relatório • há 10 dias", unread: false },
    { id: "NOT-011", icon: "✅", texto: "Comprovante de devolução gerado para CAR-005", meta: "Sistema • há 12 dias", unread: false },
];
