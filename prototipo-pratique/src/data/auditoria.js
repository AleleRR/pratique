/**
 * Mock data: 40+ audit log records with varied operations, timestamps, IPs.
 */
function daysAgoTs(n, h, m) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(h || 10, m || 0, 0);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export const auditLogs = [
    { ts: daysAgoTs(0, 14, 32), op: "ENTREGA", user: "Admin João", ent: "CAR-020", ip: "192.168.1.45", payload: { beneficiario: "Thiago Carvalho", tipo: "Educação" } },
    { ts: daysAgoTs(0, 11, 15), op: "CONSULTA", user: "Admin Maria", ent: "CAR-003", ip: "192.168.1.22", payload: { motivo: "Verificação de status" } },
    { ts: daysAgoTs(1, 16, 48), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-007", ip: "192.168.1.45", payload: { condicao: "Ótimo", beneficiario: "Luciana Oliveira" } },
    { ts: daysAgoTs(1, 9, 20), op: "LOGIN 2FA", user: "Admin Maria", ent: "Sistema", ip: "192.168.1.22", payload: { metodo: "TOTP", sucesso: true } },
    { ts: daysAgoTs(2, 17, 3), op: "ENTREGA", user: "Admin Maria", ent: "CAR-011", ip: "192.168.1.22", payload: { beneficiario: "Camila Ferreira", tipo: "Saúde" } },
    { ts: daysAgoTs(2, 8, 45), op: "LOGIN 2FA", user: "Admin João", ent: "Sistema", ip: "192.168.1.45", payload: { metodo: "TOTP", sucesso: true } },
    { ts: daysAgoTs(3, 14, 10), op: "ENTREGA", user: "Admin Maria", ent: "CAR-009", ip: "192.168.1.22", payload: { beneficiario: "Juliana Costa", tipo: "Alimentação" } },
    { ts: daysAgoTs(3, 22, 30), op: "CONSULTA", user: "Admin João", ent: "CAR-012", ip: "10.0.0.99", payload: { motivo: "Acesso fora do horário" } },
    { ts: daysAgoTs(5, 10, 22), op: "BLOQUEIO", user: "Admin Maria", ent: "CAR-012", ip: "192.168.1.22", payload: { motivo: "Cartão perdido" } },
    { ts: daysAgoTs(5, 15, 40), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-005", ip: "192.168.1.45", payload: { condicao: "Ótimo", beneficiario: "Fernanda Lima" } },
    { ts: daysAgoTs(7, 9, 5), op: "ENTREGA", user: "Admin João", ent: "CAR-017", ip: "192.168.1.45", payload: { beneficiario: "Raquel Moreira", tipo: "Alimentação" } },
    { ts: daysAgoTs(8, 11, 33), op: "CONSULTA", user: "Admin Maria", ent: "CAR-001", ip: "192.168.1.22", payload: { motivo: "Auditoria mensal" } },
    { ts: daysAgoTs(10, 14, 15), op: "ENTREGA", user: "Admin João", ent: "CAR-007", ip: "192.168.1.45", payload: { beneficiario: "Luciana Oliveira", tipo: "Saúde" } },
    { ts: daysAgoTs(12, 10, 0), op: "ENTREGA", user: "Admin Maria", ent: "CAR-023", ip: "192.168.1.22", payload: { beneficiario: "Isabela Rocha", tipo: "Saúde" } },
    { ts: daysAgoTs(14, 16, 22), op: "DEVOLUÇÃO", user: "Admin Maria", ent: "CAR-001", ip: "192.168.1.22", payload: { condicao: "Bom", beneficiario: "Maria da Silva" } },
    { ts: daysAgoTs(15, 9, 30), op: "ENTREGA", user: "Admin João", ent: "CAR-014", ip: "192.168.1.45", payload: { beneficiario: "Gustavo Ribeiro", tipo: "Transporte" } },
    { ts: daysAgoTs(17, 11, 45), op: "ENTREGA", user: "Admin João", ent: "CAR-001", ip: "192.168.1.45", payload: { beneficiario: "Maria da Silva", tipo: "Alimentação" } },
    { ts: daysAgoTs(19, 13, 20), op: "ENTREGA", user: "Admin Maria", ent: "CAR-005", ip: "192.168.1.22", payload: { beneficiario: "Fernanda Lima", tipo: "Alimentação" } },
    { ts: daysAgoTs(20, 1, 15), op: "LOGIN 2FA", user: "admin_teste", ent: "Sistema", ip: "45.63.22.100", payload: { metodo: "TOTP", sucesso: false } },
    { ts: daysAgoTs(22, 10, 5), op: "ENTREGA", user: "Admin João", ent: "CAR-001", ip: "192.168.1.45", payload: { beneficiario: "Maria da Silva", tipo: "Alimentação" } },
    { ts: daysAgoTs(25, 14, 50), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-006", ip: "192.168.1.45", payload: { condicao: "Bom", beneficiario: "Roberto Santos" } },
    { ts: daysAgoTs(28, 10, 30), op: "ENTREGA", user: "Admin João", ent: "CAR-010", ip: "192.168.1.45", payload: { beneficiario: "Ricardo Barbosa", tipo: "Transporte" } },
    { ts: daysAgoTs(30, 11, 0), op: "ENTREGA", user: "Admin João", ent: "CAR-018", ip: "192.168.1.45", payload: { beneficiario: "Felipe Araújo", tipo: "Transporte" } },
    { ts: daysAgoTs(30, 23, 55), op: "CONSULTA", user: "Admin João", ent: "CAR-018", ip: "10.0.0.50", payload: { motivo: "Acesso fora do horário" } },
    { ts: daysAgoTs(35, 9, 15), op: "ENTREGA", user: "Admin Maria", ent: "CAR-006", ip: "192.168.1.22", payload: { beneficiario: "Roberto Santos", tipo: "Transporte" } },
    { ts: daysAgoTs(38, 15, 40), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-013", ip: "192.168.1.45", payload: { condicao: "Ótimo", beneficiario: "Beatriz Martins" } },
    { ts: daysAgoTs(40, 10, 10), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-003", ip: "192.168.1.45", payload: { condicao: "Danificado", beneficiario: "Ana Rodrigues" } },
    { ts: daysAgoTs(42, 11, 20), op: "ENTREGA", user: "Admin Maria", ent: "CAR-013", ip: "192.168.1.22", payload: { beneficiario: "Beatriz Martins", tipo: "Alimentação" } },
    { ts: daysAgoTs(44, 14, 30), op: "DEVOLUÇÃO", user: "Admin Maria", ent: "CAR-019", ip: "192.168.1.22", payload: { condicao: "Ótimo", beneficiario: "Daniela Pinto" } },
    { ts: daysAgoTs(45, 9, 0), op: "ENTREGA", user: "Admin Maria", ent: "CAR-003", ip: "192.168.1.22", payload: { beneficiario: "Ana Rodrigues", tipo: "Saúde" } },
    { ts: daysAgoTs(48, 10, 45), op: "ENTREGA", user: "Admin João", ent: "CAR-019", ip: "192.168.1.45", payload: { beneficiario: "Daniela Pinto", tipo: "Saúde" } },
    { ts: daysAgoTs(50, 11, 30), op: "ENTREGA", user: "Admin João", ent: "CAR-004", ip: "192.168.1.45", payload: { beneficiario: "Carlos Mendes", tipo: "Alimentação" } },
    { ts: daysAgoTs(55, 14, 0), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-012", ip: "192.168.1.45", payload: { condicao: "Perdido", beneficiario: "André Souza" } },
    { ts: daysAgoTs(58, 10, 20), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-016", ip: "192.168.1.45", payload: { condicao: "Bom", beneficiario: "Marcos Teixeira" } },
    { ts: daysAgoTs(60, 9, 45), op: "ENTREGA", user: "Admin Maria", ent: "CAR-012", ip: "192.168.1.22", payload: { beneficiario: "André Souza", tipo: "Educação" } },
    { ts: daysAgoTs(60, 15, 10), op: "BLOQUEIO", user: "Admin Maria", ent: "CAR-003", ip: "192.168.1.22", payload: { motivo: "Cartão danificado" } },
    { ts: daysAgoTs(65, 11, 0), op: "ENTREGA", user: "Admin Maria", ent: "CAR-016", ip: "192.168.1.22", payload: { beneficiario: "Marcos Teixeira", tipo: "Educação" } },
    { ts: daysAgoTs(70, 14, 30), op: "DEVOLUÇÃO", user: "Admin João", ent: "CAR-002", ip: "192.168.1.45", payload: { condicao: "Bom", beneficiario: "João Pereira" } },
    { ts: daysAgoTs(75, 10, 0), op: "LOGIN 2FA", user: "Admin João", ent: "Sistema", ip: "192.168.1.45", payload: { metodo: "TOTP", sucesso: true } },
    { ts: daysAgoTs(80, 9, 30), op: "ENTREGA", user: "Admin Maria", ent: "CAR-002", ip: "192.168.1.22", payload: { beneficiario: "João Pereira", tipo: "Transporte" } },
    { ts: daysAgoTs(85, 2, 10), op: "CONSULTA", user: "admin_teste", ent: "CAR-001", ip: "45.63.22.100", payload: { motivo: "Acesso suspeito" } },
];
