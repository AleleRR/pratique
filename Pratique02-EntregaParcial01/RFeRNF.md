# Requisitos Funcionais e Não Funcionais
## Sistema de Controle de Entrega e Devolução de Cartões de Auxílio

---

## Requisitos Funcionais (RF)

### RF-01: Registrar Entrega de Cartão
- O sistema deve permitir que o Administrador registre a entrega de um cartão de auxílio para um Beneficiário
- O sistema deve registrar a data, hora e identificação do Beneficiário que recebeu o cartão
- O sistema deve armazenar o número de série/identificação do cartão entregue

### RF-02: Registrar Devolução de Cartão
- O sistema deve permitir que o Administrador registre a devolução de um cartão de auxílio
- O sistema deve registrar a data, hora e condição do cartão devolvido
- O sistema deve validar se o cartão foi previamente entregue antes de permitir seu registro de devolução

### RF-03: Consultar Status do Cartão
- O sistema deve permitir que o Administrador consulte o status de qualquer cartão em tempo real
- O sistema deve exibir informações sobre a data de entrega, beneficiário responsável e histórico completo
- O Administrador deve ter acesso ao histórico completo de movimentação de cartões

### RF-04: Criar Notificação de Devolução
- O sistema deve permitir ao Administrador criar e configurar notificações de devolução para beneficiários
- O sistema deve permitir configurar o prazo de devolução e os canais de comunicação (email, SMS, etc)
- O sistema deve registrar as notificações criadas, enviadas e confirmadas com data e conteúdo

### RF-05: Controlar Responsabilidade do Cartão
- O sistema deve manter registro de quem está com o cartão em cada momento
- O sistema deve impedir que múltiplos beneficiários sejam responsáveis pelo mesmo cartão simultaneamente
- O sistema deve permitir transferência de responsabilidade com registro de auditoria

---

## Requisitos Não Funcionais (RNF)

### RNF-01: Disponibilidade
- O sistema deve estar disponível 24/7 com tempo de parada máximo de 2 horas por mês para manutenção
- O sistema deve ter backup automático a cada 24 horas
- O sistema deve ter plano de recuperação de desastres

### RNF-02: Segurança
- Todos os dados pessoais do Beneficiário devem ser protegidos com criptografia AES-256
- O sistema deve implementar autenticação de dois fatores para o Administrador
- Deve haver registro de auditoria de todas as operações com timestamp e identificação do usuário
- O sistema deve cumprir com LGPD (Lei Geral de Proteção de Dados)

### RNF-03: Performance
- O tempo de resposta para consultar o status de um cartão não deve exceder 2 segundos
- O sistema deve suportar processamento de até 1.000 requisições simultâneas
- A geração de comprovantes não deve exceder 5 segundos

### RNF-04: Confiabilidade
- Taxa de erro máxima de 0,1% em registros de transações
- Validação automática de integridade de dados
- Sistema de alertas para detecção de anomalias

### RNF-05: Rastreabilidade
- Todos os movimentos de cartão devem estar vinculados a um timestamp preciso
- Deve ser possível gerar relatórios de auditoria a qualquer momento
- Retenção de logs por no mínimo 2 anos