/**
 * Mock data: Card movements spanning last 90 days.
 */
function daysAgoDate(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d;
}

function fmt(d) { return d.toLocaleDateString("pt-BR"); }
function fmtFull(d) { return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); }

export const movimentacoes = [
    { id: "MOV-001", cartaoId: "CAR-001", tipo: "entrega", beneficiario: "Maria da Silva", responsavel: "Admin João", data: fmtFull(daysAgoDate(22)), dataObj: daysAgoDate(22), observacao: "Primeira entrega" },
    { id: "MOV-002", cartaoId: "CAR-003", tipo: "entrega", beneficiario: "Ana Rodrigues", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(45)), dataObj: daysAgoDate(45), observacao: "" },
    { id: "MOV-003", cartaoId: "CAR-003", tipo: "devolucao", beneficiario: "Ana Rodrigues", responsavel: "Admin João", data: fmtFull(daysAgoDate(40)), dataObj: daysAgoDate(40), observacao: "Cartão danificado", condicao: "Danificado" },
    { id: "MOV-004", cartaoId: "CAR-005", tipo: "entrega", beneficiario: "Fernanda Lima", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(19)), dataObj: daysAgoDate(19), observacao: "" },
    { id: "MOV-005", cartaoId: "CAR-007", tipo: "entrega", beneficiario: "Luciana Oliveira", responsavel: "Admin João", data: fmtFull(daysAgoDate(10)), dataObj: daysAgoDate(10), observacao: "" },
    { id: "MOV-006", cartaoId: "CAR-009", tipo: "entrega", beneficiario: "Juliana Costa", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(5)), dataObj: daysAgoDate(5), observacao: "Entrega urgente" },
    { id: "MOV-007", cartaoId: "CAR-011", tipo: "entrega", beneficiario: "Camila Ferreira", responsavel: "Admin João", data: fmtFull(daysAgoDate(3)), dataObj: daysAgoDate(3), observacao: "" },
    { id: "MOV-008", cartaoId: "CAR-014", tipo: "entrega", beneficiario: "Gustavo Ribeiro", responsavel: "Admin João", data: fmtFull(daysAgoDate(15)), dataObj: daysAgoDate(15), observacao: "" },
    { id: "MOV-009", cartaoId: "CAR-017", tipo: "entrega", beneficiario: "Raquel Moreira", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(8)), dataObj: daysAgoDate(8), observacao: "" },
    { id: "MOV-010", cartaoId: "CAR-020", tipo: "entrega", beneficiario: "Thiago Carvalho", responsavel: "Admin João", data: fmtFull(daysAgoDate(2)), dataObj: daysAgoDate(2), observacao: "" },
    { id: "MOV-011", cartaoId: "CAR-023", tipo: "entrega", beneficiario: "Isabela Rocha", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(12)), dataObj: daysAgoDate(12), observacao: "" },
    { id: "MOV-012", cartaoId: "CAR-001", tipo: "devolucao", beneficiario: "Maria da Silva", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(18)), dataObj: daysAgoDate(18), observacao: "Bom estado", condicao: "Bom" },
    { id: "MOV-013", cartaoId: "CAR-001", tipo: "entrega", beneficiario: "Maria da Silva", responsavel: "Admin João", data: fmtFull(daysAgoDate(17)), dataObj: daysAgoDate(17), observacao: "Re-entrega" },
    { id: "MOV-014", cartaoId: "CAR-005", tipo: "devolucao", beneficiario: "Fernanda Lima", responsavel: "Admin João", data: fmtFull(daysAgoDate(14)), dataObj: daysAgoDate(14), observacao: "", condicao: "Ótimo" },
    { id: "MOV-015", cartaoId: "CAR-005", tipo: "entrega", beneficiario: "Fernanda Lima", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(13)), dataObj: daysAgoDate(13), observacao: "Re-entrega" },
    { id: "MOV-016", cartaoId: "CAR-012", tipo: "entrega", beneficiario: "André Souza", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(60)), dataObj: daysAgoDate(60), observacao: "" },
    { id: "MOV-017", cartaoId: "CAR-012", tipo: "devolucao", beneficiario: "André Souza", responsavel: "Admin João", data: fmtFull(daysAgoDate(55)), dataObj: daysAgoDate(55), observacao: "Cartão perdido", condicao: "Perdido" },
    { id: "MOV-018", cartaoId: "CAR-018", tipo: "entrega", beneficiario: "Felipe Araújo", responsavel: "Admin João", data: fmtFull(daysAgoDate(30)), dataObj: daysAgoDate(30), observacao: "" },
    { id: "MOV-019", cartaoId: "CAR-007", tipo: "devolucao", beneficiario: "Luciana Oliveira", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(7)), dataObj: daysAgoDate(7), observacao: "", condicao: "Ótimo" },
    { id: "MOV-020", cartaoId: "CAR-007", tipo: "entrega", beneficiario: "Luciana Oliveira", responsavel: "Admin João", data: fmtFull(daysAgoDate(6)), dataObj: daysAgoDate(6), observacao: "Re-entrega" },
    { id: "MOV-021", cartaoId: "CAR-002", tipo: "entrega", beneficiario: "João Pereira", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(80)), dataObj: daysAgoDate(80), observacao: "" },
    { id: "MOV-022", cartaoId: "CAR-002", tipo: "devolucao", beneficiario: "João Pereira", responsavel: "Admin João", data: fmtFull(daysAgoDate(70)), dataObj: daysAgoDate(70), observacao: "", condicao: "Bom" },
    { id: "MOV-023", cartaoId: "CAR-004", tipo: "entrega", beneficiario: "Carlos Mendes", responsavel: "Admin João", data: fmtFull(daysAgoDate(50)), dataObj: daysAgoDate(50), observacao: "" },
    { id: "MOV-024", cartaoId: "CAR-006", tipo: "entrega", beneficiario: "Roberto Santos", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(35)), dataObj: daysAgoDate(35), observacao: "" },
    { id: "MOV-025", cartaoId: "CAR-006", tipo: "devolucao", beneficiario: "Roberto Santos", responsavel: "Admin João", data: fmtFull(daysAgoDate(25)), dataObj: daysAgoDate(25), observacao: "", condicao: "Bom" },
    { id: "MOV-026", cartaoId: "CAR-010", tipo: "entrega", beneficiario: "Ricardo Barbosa", responsavel: "Admin João", data: fmtFull(daysAgoDate(28)), dataObj: daysAgoDate(28), observacao: "" },
    { id: "MOV-027", cartaoId: "CAR-013", tipo: "entrega", beneficiario: "Beatriz Martins", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(42)), dataObj: daysAgoDate(42), observacao: "" },
    { id: "MOV-028", cartaoId: "CAR-013", tipo: "devolucao", beneficiario: "Beatriz Martins", responsavel: "Admin João", data: fmtFull(daysAgoDate(38)), dataObj: daysAgoDate(38), observacao: "", condicao: "Ótimo" },
    { id: "MOV-029", cartaoId: "CAR-016", tipo: "entrega", beneficiario: "Marcos Teixeira", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(65)), dataObj: daysAgoDate(65), observacao: "" },
    { id: "MOV-030", cartaoId: "CAR-016", tipo: "devolucao", beneficiario: "Marcos Teixeira", responsavel: "Admin João", data: fmtFull(daysAgoDate(58)), dataObj: daysAgoDate(58), observacao: "", condicao: "Bom" },
    { id: "MOV-031", cartaoId: "CAR-019", tipo: "entrega", beneficiario: "Daniela Pinto", responsavel: "Admin João", data: fmtFull(daysAgoDate(48)), dataObj: daysAgoDate(48), observacao: "" },
    { id: "MOV-032", cartaoId: "CAR-019", tipo: "devolucao", beneficiario: "Daniela Pinto", responsavel: "Admin Maria", data: fmtFull(daysAgoDate(44)), dataObj: daysAgoDate(44), observacao: "", condicao: "Ótimo" },
];
