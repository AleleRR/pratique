# Biblioteca de Mensagens de Feedback — Sistema de Cartões de Auxílio

> Use estas mensagens como base. Substitua os valores `[entre colchetes]` pelos dados reais da operação.
> Todas seguem a estrutura das 3 partes da Heurística #9 de Nielsen:
> **O que aconteceu → Por quê → O que fazer**

---

## ERROS CRÍTICOS (variant: "error")

### E-001 · Cartão já com outro beneficiário (RF-05)
```
Título: "Este cartão já está com outro beneficiário"
Corpo:  "O cartão [NUMERO_SERIE] está registrado como 'Entregue' para [NOME_BENEFICIARIO]
         (CPF ···.[TRES_DIGITOS].···-[DOIS_DIGITOS]). Não é possível registrar uma nova
         entrega sem antes confirmar a devolução."
Ação:   "Ver histórico de movimentações deste cartão →"
```

### E-002 · Cartão não encontrado
```
Título: "Cartão não encontrado"
Corpo:  "Nenhum cartão com o número de série [NUMERO_SERIE] foi localizado no sistema.
         Verifique se o número foi digitado corretamente — ele está localizado no verso
         do cartão, abaixo do código de barras."
Ação:   "Limpar campo e tentar novamente"
```

### E-003 · Beneficiário não encontrado
```
Título: "Beneficiário não encontrado"
Corpo:  "Nenhum beneficiário cadastrado com o CPF informado. Confirme os dados com o
         beneficiário ou entre em contato com o setor responsável pelo cadastro."
Ação:   "Verificar dados do beneficiário →"
```

### E-004 · Falha de autenticação (2FA)
```
Título: "Código de verificação inválido"
Corpo:  "O código de verificação em dois passos não está correto ou expirou (válido por
         30 segundos). Aguarde um novo código ser gerado no seu aplicativo autenticador
         e tente novamente."
Ação:   "Solicitar novo código →"
```

### E-005 · Timeout na geração de comprovante (RNF-03)
```
Título: "Não foi possível gerar o comprovante"
Corpo:  "A geração do comprovante está demorando mais que o esperado. Seus dados foram
         salvos com sucesso. Tente gerar o comprovante novamente em alguns instantes."
Ação:   "Tentar novamente →"
```

---

## ALERTAS / AVISOS (variant: "warning")

### W-001 · Devolução de cartão sem entrega prévia (RF-02)
```
Título: "Não foi possível registrar a devolução"
Corpo:  "O cartão [NUMERO_SERIE] está com o status 'Disponível' — ele não foi entregue
         a nenhum beneficiário, portanto não há devolução a registrar. Verifique o
         número de série e tente novamente."
Ação:   "Consultar status do cartão →"
```

### W-002 · Prazo de devolução próximo
```
Título: "Devolução pendente — prazo em [N] dias"
Corpo:  "O cartão [NUMERO_SERIE] com [NOME_BENEFICIARIO] deve ser devolvido até
         [DATA_PRAZO]. A notificação de lembrete já foi enviada para [CANAL]."
Ação:   "Registrar devolução antecipada →"
```

### W-003 · Cartão sem movimentação há mais de 30 dias
```
Título: "Cartão sem movimentação recente"
Corpo:  "O cartão [NUMERO_SERIE] não possui registros de movimentação nos últimos
         [N] dias. Considere verificar a situação atual com o beneficiário responsável."
Ação:   "Ver histórico completo →"
```

---

## CONFIRMAÇÕES DE SUCESSO (variant: "success")

### S-001 · Entrega confirmada (RF-01)
```
Título: "Entrega confirmada com sucesso"
Corpo:  "O cartão [NUMERO_SERIE] foi entregue a [NOME_BENEFICIARIO] em [DATA] às [HORA].
         O registro de auditoria foi gerado automaticamente."
Ação:   "Gerar comprovante PDF desta entrega →"
```

### S-002 · Devolução confirmada (RF-02)
```
Título: "Devolução registrada com sucesso"
Corpo:  "O cartão [NUMERO_SERIE] foi devolvido por [NOME_BENEFICIARIO] em [DATA] às [HORA].
         Condição registrada: [CONDICAO_CARTAO]. O cartão está disponível para nova entrega."
Ação:   "Ver histórico de movimentações →"
```

### S-003 · Comprovante gerado (RNF-03)
```
Título: "Comprovante gerado"
Corpo:  "O comprovante de [TIPO: entrega/devolução] foi gerado em [TEMPO]s.
         Protocolo: [ID_MOVIMENTACAO]"
Ação:   "Baixar comprovante PDF ↓"
```

### S-004 · Notificação criada (RF-04)
```
Título: "Notificação criada"
Corpo:  "A notificação para [NOME_BENEFICIARIO] foi configurada com prazo de devolução
         em [DATA_PRAZO]. Canal de envio: [EMAIL/SMS]. O envio será automático."
Ação:   "Ver todas as notificações →"
```

---

## INFORMAÇÕES CONTEXTUAIS (variant: "info")

### I-001 · Campo protegido por LGPD
```
Corpo: "Este campo contém dados pessoais protegidos pela LGPD (Lei 13.709/2018).
        O conteúdo é criptografado com AES-256 e o acesso é registrado em auditoria."
```

### I-002 · Auditoria em andamento
```
Corpo: "Todas as operações nesta sessão estão sendo registradas no log de auditoria
        com timestamp UTC-3 e identificação do Administrador."
```

### I-003 · Sessão prestes a expirar
```
Título: "Sua sessão vai expirar em 5 minutos"
Corpo:  "Por segurança, sua sessão expira após 30 minutos de inatividade. Salve
         qualquer trabalho em andamento."
Ação:   "Manter sessão ativa →"
```

---

## REGRAS GERAIS DE UX WRITING

1. **Nunca culpar o usuário**: "O campo X está inválido" → "Verifique o campo X"
2. **Dados concretos**: Sempre incluir o identificador relevante (número de série, nome, CPF mascarado)
3. **Ação de recuperação**: Toda mensagem de erro deve ter pelo menos uma ação sugerida
4. **Sem jargão técnico**: Nunca expor erros do sistema (stack traces, códigos HTTP, nomes de método)
5. **Tom institucional neutro**: Nem casual demais, nem excessivamente técnico
6. **Números de série e IDs**: Sempre em fonte monospaced (`font-family: var(--font-mono)`)
7. **CPF mascarado**: Exibir apenas os 3 dígitos do meio: `···.456.···-89` (conformidade LGPD)
