/**
 * Mock data: Beneficiaries with realistic Brazilian names + masked CPFs.
 */
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toLocaleDateString("pt-BR");
}

export const beneficiarios = [
    { id: "BEN-001", nome: "Maria da Silva", cpf: "***.***.789-00", email: "maria.silva@email.com", telefone: "(49) 99812-3456", status: "ativo", dataCadastro: daysAgo(180), cartaoAtivo: "CAR-001", totalCartoes: 3 },
    { id: "BEN-002", nome: "João Pereira", cpf: "***.***.321-00", email: "joao.pereira@email.com", telefone: "(49) 99834-5678", status: "ativo", dataCadastro: daysAgo(150), cartaoAtivo: "CAR-002", totalCartoes: 2 },
    { id: "BEN-003", nome: "Ana Rodrigues", cpf: "***.***.123-00", email: "ana.rodrigues@email.com", telefone: "(49) 99856-7890", status: "inativo", dataCadastro: daysAgo(200), cartaoAtivo: null, totalCartoes: 1 },
    { id: "BEN-004", nome: "Carlos Mendes", cpf: "***.***.987-00", email: "carlos.mendes@email.com", telefone: "(49) 99878-9012", status: "ativo", dataCadastro: daysAgo(120), cartaoAtivo: "CAR-004", totalCartoes: 2 },
    { id: "BEN-005", nome: "Fernanda Lima", cpf: "***.***.098-00", email: "fernanda.lima@email.com", telefone: "(49) 99890-1234", status: "ativo", dataCadastro: daysAgo(90), cartaoAtivo: "CAR-005", totalCartoes: 4 },
    { id: "BEN-006", nome: "Roberto Santos", cpf: "***.***.456-00", email: "roberto.santos@email.com", telefone: "(49) 99812-4567", status: "ativo", dataCadastro: daysAgo(60), cartaoAtivo: "CAR-006", totalCartoes: 1 },
    { id: "BEN-007", nome: "Luciana Oliveira", cpf: "***.***.333-44", email: "luciana.oliveira@email.com", telefone: "(49) 99834-6789", status: "ativo", dataCadastro: daysAgo(75), cartaoAtivo: "CAR-007", totalCartoes: 3 },
    { id: "BEN-008", nome: "Pedro Almeida", cpf: "***.***.777-88", email: "pedro.almeida@email.com", telefone: "(49) 99856-8901", status: "inativo", dataCadastro: daysAgo(250), cartaoAtivo: null, totalCartoes: 2 },
    { id: "BEN-009", nome: "Juliana Costa", cpf: "***.***.777-66", email: "juliana.costa@email.com", telefone: "(49) 99878-0123", status: "ativo", dataCadastro: daysAgo(45), cartaoAtivo: "CAR-009", totalCartoes: 1 },
    { id: "BEN-010", nome: "Ricardo Barbosa", cpf: "***.***.444-55", email: "ricardo.barbosa@email.com", telefone: "(49) 99890-2345", status: "ativo", dataCadastro: daysAgo(30), cartaoAtivo: "CAR-010", totalCartoes: 2 },
    { id: "BEN-011", nome: "Camila Ferreira", cpf: "***.***.666-77", email: "camila.ferreira@email.com", telefone: "(49) 99812-5678", status: "ativo", dataCadastro: daysAgo(15), cartaoAtivo: "CAR-011", totalCartoes: 1 },
    { id: "BEN-012", nome: "André Souza", cpf: "***.***.888-99", email: "andre.souza@email.com", telefone: "(49) 99834-7890", status: "inativo", dataCadastro: daysAgo(300), cartaoAtivo: null, totalCartoes: 3 },
];
