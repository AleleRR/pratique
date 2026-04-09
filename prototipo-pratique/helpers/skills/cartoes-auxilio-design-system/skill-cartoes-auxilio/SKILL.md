---
name: cartoes-auxilio-design-system
description: >
  Design system e identidade visual para o Sistema de Gestão e Rastreabilidade de Cartões de Auxílio.
  Use esta skill SEMPRE que precisar criar, modificar ou estilizar qualquer componente React neste projeto.
  Aplica tokens de design, paleta, tipografia, iconografia, padrões de UX Writing e convenções de acessibilidade
  definidos no Kit de Marca. Triggers: qualquer pedido de componente, tela, estilo, cor, fonte, botão, tabela,
  formulário, feedback de erro ou qualquer elemento de UI/UX dentro deste projeto.
  NÃO use para outros projetos que não sejam este sistema de cartões.
---

# Skill: Design System · Cartões de Auxílio

Esta skill contém TODAS as regras de identidade visual e padrões de implementação React para o projeto.
Leia as seções relevantes antes de escrever qualquer código de componente.

---

## 1. Tokens de Design (CSS Custom Properties)

Adicione estas variáveis no `:root` do seu `index.css` ou `App.css`. **Nunca hardcode cores, fontes ou espaçamentos.**

```css
:root {
  /* === CORES PRIMÁRIAS === */
  --color-brand-deep:     #1A3A5C; /* Sidebar, header, identidade */
  --color-brand-action:   #1E6FA6; /* Botões primários, links, foco */
  --color-brand-hover:    #155E8E; /* Hover de botões primários */
  --color-brand-light:    #D6E8F5; /* Badges, hover de linhas de tabela */
  --color-brand-subtle:   #EBF4FA; /* Fundos de ícone, tooltips */

  /* === NEUTROS === */
  --color-gray-900: #111827;
  --color-gray-800: #1F2937;
  --color-gray-700: #374151;
  --color-gray-500: #6B7280;
  --color-gray-300: #D1D5DB;
  --color-gray-200: #E5E7EB;
  --color-gray-100: #F3F4F6;
  --color-gray-050: #F9FAFB;
  --color-white:    #FFFFFF;

  /* === SEMÂNTICAS === */
  --color-success-text: #166534;
  --color-success-bg:   #DCFCE7;
  --color-success-border: rgba(22, 101, 52, 0.2);

  --color-error-text:   #991B1B;
  --color-error-bg:     #FEE2E2;
  --color-error-border: rgba(153, 27, 27, 0.2);

  --color-warning-text: #92400E;
  --color-warning-bg:   #FEF3C7;
  --color-warning-border: rgba(146, 64, 14, 0.2);

  --color-info-text:    #1E3A5F;
  --color-info-bg:      #DBEAFE;
  --color-info-border:  rgba(30, 58, 95, 0.2);

  /* === TIPOGRAFIA === */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body:    'IBM Plex Sans', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;

  /* === ESPAÇAMENTO === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* === RAIO DE BORDA === */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* === SOMBRAS === */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);

  /* === TRANSIÇÕES === */
  --transition-fast: 120ms ease;
  --transition-base: 200ms ease;
}
```

### Google Fonts — import no `index.html`
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 2. Hierarquia Tipográfica — Classes Utilitárias

Crie `src/styles/typography.css` com estas classes. Use-as nos componentes.

```css
/* HEADINGS — Space Grotesk */
.text-page-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--color-gray-900);
  line-height: 1.15;
}
.text-section-title {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--color-gray-800);
}
.text-subsection {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-gray-800);
}

/* BODY — IBM Plex Sans */
.text-body {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-gray-700);
  line-height: 1.65;
}
.text-body-sm {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--color-gray-700);
  line-height: 1.55;
}
.text-caption {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-gray-500);
  line-height: 1.5;
}
.text-label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-700);
}

/* MONO — IBM Plex Mono (timestamps, número de série, IDs) */
.text-mono {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-gray-700);
}
.text-mono-sm {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-gray-500);
}

/* BADGES / TAGS de seção */
.text-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-brand-action);
}
```

---

## 3. Componentes Base — Padrões de Implementação

### 3.1 Botões (`Button.jsx`)

```jsx
// src/components/ui/Button.jsx
const variants = {
  primary: {
    background: 'var(--color-brand-action)',
    color: '#FFFFFF',
    border: 'none',
    hoverBg: 'var(--color-brand-hover)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-brand-action)',
    border: '1px solid var(--color-brand-action)',
    hoverBg: 'var(--color-brand-subtle)',
  },
  danger: {
    background: 'var(--color-error-bg)',
    color: 'var(--color-error-text)',
    border: '1px solid var(--color-error-border)',
    hoverBg: '#FCA5A5',
  },
};

// Labels corretos por operação — NÃO desviar destes:
// registrarEntrega()        → "Confirmar Entrega"
// registrarDevolucao()      → "Confirmar Devolução"
// gerarRegistro()           → "Gerar Comprovante PDF"
// criarNotificacao()        → "Criar Notificação"
// transferirResponsabilidade() → "Transferir Cartão"
// consultarStatus()         → "Consultar Status"
// cancelar/abort            → "Cancelar Operação" (variant: danger)
```

### 3.2 Campos de Formulário (`FormField.jsx`)

Regras críticas de acessibilidade:
- Todo `<input>` DEVE ter `<label>` com `htmlFor` correspondente
- Campos com dados LGPD (CPF, nome) devem exibir badge de proteção
- Números de série e timestamps: `font-family: var(--font-mono)`
- Placeholder nunca substitui label — use `aria-describedby` para hints

```jsx
// Padrão de estrutura de campo
<div className="form-field">
  <label htmlFor="numeroSerie" className="text-label">
    Número de Série
    <span className="lgpd-badge">Criptografado · LGPD</span>
  </label>
  <input
    id="numeroSerie"
    type="text"
    style={{ fontFamily: 'var(--font-mono)' }}
    aria-describedby="numeroSerie-hint"
  />
  <span id="numeroSerie-hint" className="text-caption">
    Localizado no verso do cartão, abaixo do código de barras
  </span>
</div>
```

### 3.3 Tabelas de Auditoria / Movimentação

```jsx
// Regras para tabelas densas:
// - Cabeçalho: background var(--color-gray-100), font-mono 11px, uppercase
// - Timestamps: sempre font-mono, color gray-500
// - Hover de linha: background var(--color-brand-light)
// - Status badges: usar cores semânticas (não neutras)
// - Linhas pares/ímpares: NÃO use striped — use hover highlight apenas

const statusColors = {
  'Entregue':   { bg: 'var(--color-info-bg)',    text: 'var(--color-info-text)' },
  'Devolvido':  { bg: 'var(--color-success-bg)', text: 'var(--color-success-text)' },
  'Disponível': { bg: 'var(--color-gray-100)',   text: 'var(--color-gray-700)' },
  'Pendente':   { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-text)' },
};
```

### 3.4 Mensagens de Feedback (`Alert.jsx`)

Todo feedback segue o padrão das 3 partes (Heurística #9 Nielsen):
1. **O que aconteceu** — título conciso, sem culpar o usuário
2. **Por quê** — contexto com dados concretos (número do cartão, nome do beneficiário)
3. **O que fazer** — link/ação de recuperação

```jsx
// Nunca exibir apenas: "Erro ao processar" ou "Operação inválida"
// Sempre incluir o identificador relevante no corpo da mensagem
// Sempre oferecer uma ação de recuperação

const alertVariants = {
  error:   { borderLeft: '4px solid var(--color-error-text)',   bg: 'var(--color-error-bg)' },
  warning: { borderLeft: '4px solid var(--color-warning-text)', bg: 'var(--color-warning-bg)' },
  success: { borderLeft: '4px solid var(--color-success-text)', bg: 'var(--color-success-bg)' },
  info:    { borderLeft: '4px solid var(--color-info-text)',    bg: 'var(--color-info-bg)' },
};
```

---

## 4. Glossário de Termos — UI vs Código

| Código (Classe/Método)        | UI (Português) — USE ISTO          | NUNCA usar na UI       |
|-------------------------------|-------------------------------------|------------------------|
| `Beneficiario`                | Beneficiário                        | Usuário, Cliente       |
| `Administrador`               | Administrador                       | Admin, Operador        |
| `Movimentacao`                | Movimentação                        | Transação, Log, Evento |
| `CartaoAuxilio`               | Cartão                              | Card, Token, Item      |
| `RegistroAuditoria`           | Registro de Auditoria               | Log, Trace             |
| `authDoisFatores`             | Verificação em dois passos          | 2FA, MFA, OTP          |
| `condicaoCartao`              | Condição do Cartão                  | State, Status (code)   |
| `dadosCriptografados`         | Dados protegidos pela LGPD          | Encrypted, Hash        |
| `registrarEntrega()`          | Confirmar Entrega                   | Submit, Post, Save     |
| `gerarRegistro()`             | Gerar Comprovante PDF               | Export, Download       |
| `validarPreRequisitos()`      | (interno — nunca expor na UI)       | —                      |

---

## 5. Iconografia — Diretrizes de Construção

Todos os ícones SVG devem seguir:
- **ViewBox**: `0 0 24 24`
- **Stroke-width**: `1.5`
- **Stroke-linecap**: `round`
- **Stroke-linejoin**: `round`
- **Fill**: `none` (outline only)
- **Cor**: `currentColor` (herda do pai)

### Ícones fundamentais e suas metáforas:
```
EntregarCartaoIcon   → Cartão + seta para a direita (saída)
DevolverCartaoIcon   → Cartão + seta para a esquerda (retorno)
ConsultarStatusIcon  → Lupa + relógio interno
GerarComprovanteIcon → Documento + checkmark
CriarNotificacaoIcon → Sino + faísca de "novo"
AuditoriaIcon        → Escudo + lista de linhas
LgpdIcon             → Cadeado + folha de lei
```

Para criar um ícone novo: consulte `references/icone-template.svg` na pasta da skill.

---

## 6. Layout do Painel (Estrutura de Páginas)

### Estrutura de URL e componentes:
```
/dashboard          → Visão geral (KPIs + atividade recente)
/entregas/nova      → Formulário RF-01 (registrarEntrega)
/devolucoes/nova    → Formulário RF-02 (registrarDevolucao)
/cartoes            → Listagem + busca RF-03
/cartoes/:id        → Histórico completo de movimentação
/notificacoes       → Gestão RF-04
/auditoria          → Relatórios RNF-05
```

### Layout base:
```
┌──────────────────────────────────────────────────────┐
│ Sidebar (240px fixo) │ Content Area (flex: 1)        │
│ --color-brand-deep   │ bg: --color-gray-050           │
│                      │ padding: 32px                  │
│ [Logo]               │ ┌─────────────────────────┐   │
│ [Nav items]          │ │ Page Header             │   │
│                      │ │ text-page-title         │   │
│                      │ └─────────────────────────┘   │
│ [User / Logout]      │ │ Content                 │   │
└──────────────────────────────────────────────────────┘
```

---

## 7. Acessibilidade — Checklist por Componente

Antes de commitar qualquer componente, verifique:

- [ ] Contraste de texto ≥ 4.5:1 (usar ferramenta WebAIM)
- [ ] Todos os `<input>` têm `<label>` associado
- [ ] Todos os ícones decorativos têm `aria-hidden="true"`
- [ ] Ícones funcionais têm `aria-label` descritivo
- [ ] Mensagens de erro usam `role="alert"` para leitores de tela
- [ ] Foco visível em todos os elementos interativos (outline: 2px solid var(--color-brand-action))
- [ ] Campos LGPD têm descrição acessível (aria-describedby)
- [ ] Tabelas de auditoria têm `<caption>` e `scope` nos `<th>`

---

## 8. Anti-padrões — O que NUNCA fazer

### Cores
- ❌ Hardcode de cor (`color: #333`, `background: blue`)
- ❌ Usar cor como único indicador de estado (sempre adicionar ícone + texto)
- ❌ Mais de 3 cores semânticas diferentes numa mesma tela

### Tipografia
- ❌ Usar font-weight 700 — máximo é 600
- ❌ Timestamps em `font-body` — SEMPRE `font-mono`
- ❌ Texto abaixo de 11px

### UX Writing
- ❌ Mensagem de erro sem ação de recuperação
- ❌ Usar "Usuário" para se referir ao Beneficiário
- ❌ Botão de ação destrutiva sem variante `danger`
- ❌ Labels de botão em gerúndio ("Registrando...", "Processando...") no estado padrão

### Formulários
- ❌ Placeholder como único identificador do campo
- ❌ Campo de CPF ou nome sem badge LGPD
- ❌ `<input>` sem `<label>` associado

---

## 9. Referências Internas

- `references/tokens.css` — arquivo CSS completo de tokens pronto para copiar
- `references/icone-template.svg` — template SVG para construção de ícones
- `references/mensagens-feedback.md` — biblioteca de mensagens de erro/sucesso pré-aprovadas

Consulte esses arquivos quando precisar de exemplos concretos ou copiar código pronto.