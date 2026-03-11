# 📋 Plano Tático de Engenharia – Distribuição de Cartões
## 4 Sprints | 8 Semanas | 4 Desenvolvedores

---

## 📌 Visão Geral

Este documento detalha a distribuição de tarefas exatas para cada um dos 4 desenvolvedores ao longo de 4 Sprints (8 semanas). A divisão clara de papéis foi estruturada para evitar gargalos e garantir que os Requisitos Funcionais (RF) e Não Funcionais (RNF) sejam atendidos em paralelo.

---

## 👥 Divisão de Papéis e Responsabilidades

| Desenvolvedor | Especialidade | Foco Principal |
|---------------|---------------|----------------|
| **Dev 1** | Tech Lead / Back-end & Infra | Arquitetura, banco de dados, CI/CD e rotas críticas |
| **Dev 2** | Back-end & Segurança | Criptografia, auditoria, 2FA e integrações |
| **Dev 3** | Front-end | Interface do usuário (UI), fluxos de tela e experiência (UX) |
| **Dev 4** | Front-end & QA/Testes | Suporte ao Front-end, integrações de API, testes de carga e qualidade |

---

## 🚀 Cronograma Detalhado de Execução

### **Sprint 1: Fundação, Infraestrutura e Segurança Base**
**Semanas 1 e 2**

**Objetivo:** Ter o ambiente rodando, banco de dados no ar e o administrador conseguindo fazer login seguro.

| Responsável | Tarefas Técnicas | Requisito Alvo |
|-------------|-----------------|----------------|
| **Dev 1** | Configurar repositório, CI/CD, ambiente Cloud e criar o Banco de Dados (PostgreSQL/MySQL) | Estrutura |
| **Dev 2** | Criar serviço de Autenticação com 2FA e rotina de criptografia AES-256 para dados sensíveis | RNF-02 |
| **Dev 3** | Configurar projeto Front-end (React/Vue), roteamento e criar tela de Login (com campo 2FA) | Estrutura / RNF-02 |
| **Dev 4** | Criar casca base do painel (Sidebar, Header) e configurar framework de testes automatizados (Jest/Cypress) | Estrutura |

---

### **Sprint 2: Core Business – Entregas e Consultas**
**Semanas 3 e 4**

**Objetivo:** O sistema deve ser capaz de registrar a entrega de um cartão e permitir a busca em tempo real.

| Responsável | Tarefas Técnicas | Requisito Alvo |
|-------------|-----------------|----------------|
| **Dev 1** | Desenvolver API de Efetuar Entrega, garantindo validação de responsabilidade única do cartão | RF-01, RF-05 |
| **Dev 2** | Desenvolver API de Consultar Status e implementar gatilho de Registro de Auditoria global | RF-03, RNF-05 |
| **Dev 3** | Criar tela de "Nova Entrega", formulários de busca de beneficiário e vinculação de cartão | RF-01 |
| **Dev 4** | Criar tela de "Consultar Status", integrar com API e garantir que a tela carregue em menos de 2s | RF-03, RNF-03 |

---

### **Sprint 3: Devoluções, Histórico e Geração de PDF**
**Semanas 5 e 6**

**Objetivo:** Fechar o ciclo de vida do cartão (devoluções) e garantir geração de comprovantes performática.

| Responsável | Tarefas Técnicas | Requisito Alvo |
|-------------|-----------------|----------------|
| **Dev 1** | Desenvolver API de Registrar Devolução, validando se o cartão estava "Entregue" | RF-02 |
| **Dev 2** | Desenvolver microserviço/rotina de geração de Comprovante de Entrega/Devolução em PDF (< 5 seg) | RNF-03 |
| **Dev 3** | Criar tela de "Registrar Devolução" e visualização do "Histórico Completo" da movimentação | RF-02, RF-03 |
| **Dev 4** | Criar relatórios de Auditoria na interface e iniciar escrita de testes de estresse (JMeter/k6) | RNF-05 |

---

### **Sprint 4: Notificações, Performance e Go-Live**
**Semanas 7 e 8**

**Objetivo:** Implementar envio de mensagens, atestar resiliência do sistema e colocar em produção.

| Responsável | Tarefas Técnicas | Requisito Alvo |
|-------------|-----------------|----------------|
| **Dev 1** | Otimizar queries do banco (índices), configurar rotina de Backup a cada 24h e alertas de anomalia | RNF-01, RNF-04 |
| **Dev 2** | Desenvolver módulo de Notificações e integrar com provedor de E-mail/SMS (AWS SES, Twilio) | RF-04 |
| **Dev 3** | Criar tela de "Gestão de Notificações" para configurar prazos e canais, e polir interface (UX) | RF-04 |
| **Dev 4** | Executar testes de carga (1.000 requisições simultâneas) e corrigir gargalos com Dev 1 e 2 | RNF-03 |

---

## ⚠️ Gestão de Riscos

### **Risco 1: Performance na Geração de Comprovantes**

**Descrição:**
A geração de comprovantes não pode exceder 5 segundos, e o banco de dados exige respostas em 2 segundos.

**Impacto:** Degradação da experiência do usuário e possível timeout de requisições.

**Estratégia de Mitigação:**
- **Dev 2** deve evitar processamento síncrono pesado na thread principal da API
- Implementar fila de processamento assíncrono para PDFs (RabbitMQ, AWS SQS, etc.)
- Usar cache distribuído (Redis) para consultas frequentes
- Realizar testes de carga cedo (Sprint 3 em diante)

---

### **Risco 2: LGPD e Criptografia**

**Descrição:**
Os dados são criptografados no banco com AES-256 (Dev 2). As buscas por nome/CPF do beneficiário na API de Consultar Status (Dev 1) precisarão de estratégia de hash ou busca determinística, senão o banco de dados não conseguirá filtrar dados encriptados de forma rápida.

**Impacto:** Impossibilidade de fazer buscas eficientes; necessidade de desencriptar todos os registros em memória (custo computacional altíssimo).

**Estratégia de Mitigação:**
- **Dev 1 e Dev 2** devem definir em conjunto:
  - Campos que serão buscáveis (ex: CPF) devem usar hash determinístico paralelo à encriptação
  - Implementar índices no banco sobre os campos hasheados
  - Usar HMAC para buscas determinísticas sem perder a segurança
  - Documentar a estratégia de criptografia até o fim da Sprint 1
- Validar a estratégia com testes de performance (Sprint 2+)

---

## 📊 Timeline Visual

```
Sprint 1 (Sem 1-2)  → Fundação & Security
Sprint 2 (Sem 3-4)  → Core Business (Delivery)
Sprint 3 (Sem 5-6)  → Devolução & PDF
Sprint 4 (Sem 7-8)  → Notificações & Go-Live
```

---

## 📝 Próximas Ações

1. ✅ Validar divisão de papéis com a equipe
2. ✅ Detalhar tecnologias específicas (framework, libs, etc.)
3. ✅ Definir reuniões de sincronização (diárias por Sprint)
4. ✅ Criar repositório único com estrutura de branches por Sprint
5. ✅ Documentar a estratégia de criptografia e busca (Dev 1 + Dev 2)