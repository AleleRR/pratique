/**
 * Mock data: Notifications sent to beneficiaries via SMS, E-mail, WhatsApp.
 * Each entry represents a message dispatched to the end-user (card holder).
 */
function daysAgoTs(n, h, m) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(h || 10, m || 0, 0);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export const notificacoesBeneficiario = [
    {
        id: "NBENF-001", canal: "sms", status: "entregue",
        beneficiario: "Maria da Silva", telefone: "(49) 99812-3456",
        assunto: "Cartão de Auxílio Alimentação disponível para retirada",
        mensagem: "Olá Maria, seu cartão de Auxílio Alimentação (final 4821) está disponível para retirada no posto de atendimento. Apresente RG e CPF.",
        cartaoId: "CAR-001", enviadoEm: daysAgoTs(22, 9, 15), tipo: "entrega",
    },
    {
        id: "NBENF-002", canal: "email", status: "entregue",
        beneficiario: "Maria da Silva", telefone: "(49) 99812-3456", email: "maria.silva@email.com",
        assunto: "Comprovante de entrega — Cartão CAR-001",
        mensagem: "Prezada Maria da Silva, segue em anexo o comprovante digital de entrega do seu cartão de Auxílio Alimentação (CAR-001, final 4821). Valor: R$ 350,00.",
        cartaoId: "CAR-001", enviadoEm: daysAgoTs(22, 9, 20), tipo: "comprovante",
    },
    {
        id: "NBENF-003", canal: "whatsapp", status: "entregue",
        beneficiario: "Fernanda Lima", telefone: "(49) 99890-1234",
        assunto: "Cartão de Auxílio Alimentação disponível",
        mensagem: "Olá Fernanda! 🎉 Seu cartão de Auxílio Alimentação (final 8899) está pronto. Retire no posto central com RG e CPF.",
        cartaoId: "CAR-005", enviadoEm: daysAgoTs(19, 10, 30), tipo: "entrega",
    },
    {
        id: "NBENF-004", canal: "sms", status: "entregue",
        beneficiario: "Luciana Oliveira", telefone: "(49) 99834-6789",
        assunto: "Cartão de Saúde disponível para retirada",
        mensagem: "Luciana, seu cartão de Auxílio Saúde (final 2211) está pronto para retirada. Local: Posto Central.",
        cartaoId: "CAR-007", enviadoEm: daysAgoTs(10, 8, 45), tipo: "entrega",
    },
    {
        id: "NBENF-005", canal: "email", status: "falhou",
        beneficiario: "Pedro Almeida", telefone: "(49) 99856-8901", email: "pedro.almeida@email.com",
        assunto: "Atualização sobre seu cartão de Educação",
        mensagem: "Prezado Pedro, informamos que seu cartão CAR-008 de Auxílio Educação está disponível para retirada.",
        cartaoId: "CAR-008", enviadoEm: daysAgoTs(15, 14, 0), tipo: "entrega",
        erroMotivo: "E-mail inválido — caixa não encontrada",
    },
    {
        id: "NBENF-006", canal: "sms", status: "entregue",
        beneficiario: "Juliana Costa", telefone: "(49) 99878-0123",
        assunto: "Cartão de Alimentação pronto para retirada",
        mensagem: "Juliana, seu cartão CAR-009 de Auxílio Alimentação está disponível. Retire no posto com documento de identificação.",
        cartaoId: "CAR-009", enviadoEm: daysAgoTs(5, 11, 20), tipo: "entrega",
    },
    {
        id: "NBENF-007", canal: "whatsapp", status: "entregue",
        beneficiario: "Ana Rodrigues", telefone: "(49) 99856-7890",
        assunto: "Devolução registrada — CAR-003",
        mensagem: "Olá Ana, confirmamos o recebimento do seu cartão CAR-003. Status: Danificado. Um novo cartão será providenciado em breve.",
        cartaoId: "CAR-003", enviadoEm: daysAgoTs(40, 15, 10), tipo: "devolucao",
    },
    {
        id: "NBENF-008", canal: "email", status: "entregue",
        beneficiario: "Luciana Oliveira", telefone: "(49) 99834-6789", email: "luciana.oliveira@email.com",
        assunto: "Devolução registrada — CAR-007",
        mensagem: "Prezada Luciana, confirmamos a devolução do seu cartão CAR-007. Condição: Ótimo. Obrigado pela devolução no prazo.",
        cartaoId: "CAR-007", enviadoEm: daysAgoTs(7, 16, 0), tipo: "devolucao",
    },
    {
        id: "NBENF-009", canal: "sms", status: "pendente",
        beneficiario: "Thiago Carvalho", telefone: "(49) 99812-9999",
        assunto: "Cartão de Educação entregue",
        mensagem: "Thiago, seu cartão CAR-020 de Auxílio Educação foi entregue com sucesso. Guarde o comprovante digital.",
        cartaoId: "CAR-020", enviadoEm: daysAgoTs(2, 14, 40), tipo: "comprovante",
    },
    {
        id: "NBENF-010", canal: "whatsapp", status: "entregue",
        beneficiario: "Camila Ferreira", telefone: "(49) 99812-5678",
        assunto: "Cartão de Saúde disponível",
        mensagem: "Camila! 🏥 Seu cartão de Auxílio Saúde (final 3456) foi entregue. Valor: R$ 500,00. Qualquer dúvida, entre em contato.",
        cartaoId: "CAR-011", enviadoEm: daysAgoTs(3, 10, 15), tipo: "entrega",
    },
    {
        id: "NBENF-011", canal: "sms", status: "entregue",
        beneficiario: "Maria da Silva", telefone: "(49) 99812-3456",
        assunto: "Lembrete: prazo de devolução em 5 dias",
        mensagem: "Maria, lembramos que o prazo de devolução do cartão CAR-001 vence em 5 dias. Entre em contato caso precise de mais informações.",
        cartaoId: "CAR-001", enviadoEm: daysAgoTs(1, 9, 0), tipo: "lembrete",
    },
    {
        id: "NBENF-012", canal: "email", status: "entregue",
        beneficiario: "Gustavo Ribeiro", telefone: "(49) 99878-1234", email: "gustavo.ribeiro@email.com",
        assunto: "Comprovante de entrega — Cartão CAR-014",
        mensagem: "Gustavo, segue o comprovante de entrega do seu cartão de Auxílio Transporte (CAR-014). Valor: R$ 300,00.",
        cartaoId: "CAR-014", enviadoEm: daysAgoTs(15, 10, 30), tipo: "comprovante",
    },
];
