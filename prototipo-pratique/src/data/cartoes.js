/**
 * Mock data: Benefit cards inventory — 24 cards across all statuses and types.
 */
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toLocaleDateString("pt-BR");
}

export const cartoes = [
    { id: "CAR-001", numero: "**** **** **** 4821", beneficiario: "Maria da Silva", cpf: "123.456.789-00", status: "entregue", entregaEm: daysAgo(22), responsavel: "Admin João", valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-002", numero: "**** **** **** 7734", beneficiario: "João Pereira", cpf: "987.654.321-00", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 200,00", tipo: "Transporte" },
    { id: "CAR-003", numero: "**** **** **** 1192", beneficiario: "Ana Rodrigues", cpf: "456.789.123-00", status: "bloqueado", entregaEm: daysAgo(45), responsavel: "Admin Maria", valor: "R$ 500,00", tipo: "Saúde" },
    { id: "CAR-004", numero: "**** **** **** 5566", beneficiario: "Carlos Mendes", cpf: "321.654.987-00", status: "pendente", entregaEm: null, responsavel: "Admin João", valor: "R$ 150,00", tipo: "Alimentação" },
    { id: "CAR-005", numero: "**** **** **** 8899", beneficiario: "Fernanda Lima", cpf: "654.321.098-00", status: "entregue", entregaEm: daysAgo(19), responsavel: "Admin Maria", valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-006", numero: "**** **** **** 3344", beneficiario: "Roberto Santos", cpf: "789.123.456-00", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 300,00", tipo: "Transporte" },
    { id: "CAR-007", numero: "**** **** **** 2211", beneficiario: "Luciana Oliveira", cpf: "111.222.333-44", status: "entregue", entregaEm: daysAgo(10), responsavel: "Admin João", valor: "R$ 400,00", tipo: "Saúde" },
    { id: "CAR-008", numero: "**** **** **** 9988", beneficiario: "Pedro Almeida", cpf: "555.666.777-88", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 250,00", tipo: "Educação" },
    { id: "CAR-009", numero: "**** **** **** 6677", beneficiario: "Juliana Costa", cpf: "999.888.777-66", status: "entregue", entregaEm: daysAgo(5), responsavel: "Admin Maria", valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-010", numero: "**** **** **** 1122", beneficiario: "Ricardo Barbosa", cpf: "222.333.444-55", status: "pendente", entregaEm: null, responsavel: "Admin João", valor: "R$ 180,00", tipo: "Transporte" },
    { id: "CAR-011", numero: "**** **** **** 3456", beneficiario: "Camila Ferreira", cpf: "444.555.666-77", status: "entregue", entregaEm: daysAgo(3), responsavel: "Admin João", valor: "R$ 500,00", tipo: "Saúde" },
    { id: "CAR-012", numero: "**** **** **** 7890", beneficiario: "André Souza", cpf: "666.777.888-99", status: "bloqueado", entregaEm: daysAgo(60), responsavel: "Admin Maria", valor: "R$ 200,00", tipo: "Educação" },
    { id: "CAR-013", numero: "**** **** **** 4455", beneficiario: "Beatriz Martins", cpf: "333.444.555-66", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-014", numero: "**** **** **** 6789", beneficiario: "Gustavo Ribeiro", cpf: "777.888.999-00", status: "entregue", entregaEm: daysAgo(15), responsavel: "Admin João", valor: "R$ 300,00", tipo: "Transporte" },
    { id: "CAR-015", numero: "**** **** **** 2345", beneficiario: "Patrícia Nascimento", cpf: "888.999.000-11", status: "pendente", entregaEm: null, responsavel: "Admin Maria", valor: "R$ 450,00", tipo: "Saúde" },
    { id: "CAR-016", numero: "**** **** **** 8765", beneficiario: "Marcos Teixeira", cpf: "000.111.222-33", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 150,00", tipo: "Educação" },
    { id: "CAR-017", numero: "**** **** **** 5432", beneficiario: "Raquel Moreira", cpf: "112.233.445-56", status: "entregue", entregaEm: daysAgo(8), responsavel: "Admin Maria", valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-018", numero: "**** **** **** 1098", beneficiario: "Felipe Araújo", cpf: "223.344.556-67", status: "bloqueado", entregaEm: daysAgo(30), responsavel: "Admin João", valor: "R$ 200,00", tipo: "Transporte" },
    { id: "CAR-019", numero: "**** **** **** 7654", beneficiario: "Daniela Pinto", cpf: "334.455.667-78", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 500,00", tipo: "Saúde" },
    { id: "CAR-020", numero: "**** **** **** 3210", beneficiario: "Thiago Carvalho", cpf: "445.566.778-89", status: "entregue", entregaEm: daysAgo(2), responsavel: "Admin João", valor: "R$ 250,00", tipo: "Educação" },
    { id: "CAR-021", numero: "**** **** **** 9876", beneficiario: "Vanessa Dias", cpf: "556.677.889-90", status: "pendente", entregaEm: null, responsavel: "Admin Maria", valor: "R$ 350,00", tipo: "Alimentação" },
    { id: "CAR-022", numero: "**** **** **** 5555", beneficiario: "Leonardo Gomes", cpf: "667.788.990-01", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 300,00", tipo: "Transporte" },
    { id: "CAR-023", numero: "**** **** **** 1234", beneficiario: "Isabela Rocha", cpf: "778.899.001-12", status: "entregue", entregaEm: daysAgo(12), responsavel: "Admin Maria", valor: "R$ 400,00", tipo: "Saúde" },
    { id: "CAR-024", numero: "**** **** **** 4567", beneficiario: "Bruno Cavalcanti", cpf: "889.900.112-23", status: "disponivel", entregaEm: null, responsavel: null, valor: "R$ 180,00", tipo: "Educação" },
];
