# Documentação de Pesquisa e Requisitos do Sistema

Este documento reúne os artefatos de pesquisa, a análise dos trabalhos correlatos e a definição dos requisitos funcionais e não funcionais para o desenvolvimento do sistema.

## 📚 Artefatos de Pesquisa

### Referências Acadêmicas e Técnicas
* [Artigo: Revista Aracê](https://periodicos.newsciencepubl.com/arace/article/view/7642/9869)
* [TCC: Felipe Gueller (Repositório IFES)](https://repositorio.ifes.edu.br/bitstream/handle/123456789/2883/TCF_Felipe_Gueller.pdf?sequence=1&isAllowed=y)
* [Artigo: Revista FCM-MG](https://revista.fcmmg.br/index.php/REES/article/view/214)
* [Gov.br: Definição da Cesta Básica de Alimentos](https://www.gov.br/mds/pt-br/acoes-e-programas/promocao-da-alimentacao-adequada-e-saudavel/cesta-basica-de-alimentos)

### Referências Multimídia
* [Vídeo de Referência 1](https://www.youtube.com/watch?v=II9q5v4hfBk&feature=youtu.be)
* [Vídeo de Referência 2](https://www.youtube.com/watch?v=N5MGib1aB4E&feature=youtu.be)

### Contexto Regional (Chapecó)
* [Unochapecó: Subiu de novo](https://uno.edu.br/noticias/subiu-de-novo)
* [DI Regional: Cesto básico em Chapecó tem alta de 1,86%](https://diregional.com.br/diario-do-iguacu/economia/2025-10-20-cesto-basico-em-chapeco-tem-alta-de-186)

---

## 1. Análise dos Artefatos e Tecnologias

Os artigos e trabalhos analisados demonstram excelência na **aplicação prática de tecnologias modernas**. As soluções propostas acertam ao escolher stacks tecnológicas robustas e amplamente utilizadas no mercado, o que garante escalabilidade e facilidade de manutenção.

**Pontos Fortes Identificados:**
* **Logística e Geolocalização:** Integração eficiente com o Google Maps para aprimorar a distribuição de alimentos, otimizando rotas e pontos de parada. Uso de GPS para sugerir automaticamente o mercado mais próximo e validar o local de coleta, permitindo o cálculo preciso de tempo e distância.
* **Engenharia de Requisitos:** Levantamentos detalhados de Requisitos Funcionais e Não Funcionais, cobrindo todo o fluxo do sistema, desde o login até a geração de relatórios (ex: acompanhamento de histórico de preços).
* **Segurança e UX:** Implementação de mecanismos de segurança e uso de alertas visuais para melhorar a comunicação e feedback com o usuário.

> **Observação sobre a Base Legal:** A página do governo federal é fundamental, pois estabelece o ponto de partida legal e metodológico para a composição da cesta básica no Brasil, servindo de base comparativa mesmo que sua definição possa estar defasada em relação aos hábitos de consumo contemporâneos.

---

## 2. Requisitos Funcionais

O sistema deve oferecer as seguintes funcionalidades:

- [ ] Permitir o cadastro de usuários e entidades da comunidade.
- [ ] Permitir o cadastro de produtos, serviços e eventos locais.
- [ ] Permitir busca sobre produtos, serviços e eventos locais.
- [ ] Permitir que o usuário escaneie o produto para busca.
- [ ] Exibir informações detalhadas sobre produtos, serviços e eventos locais.
- [ ] Enviar notificações ou mensagens entre os participantes.
- [ ] Exibir métricas e indicadores dos produtos, serviços e eventos.
- [ ] Permitir análise comparativa de preços.
- [ ] Permitir que o usuário crie e gerencie listas de compras.
- [ ] Integrar inteligência artificial para otimizar o processo de escaneamento.

---

## 3. Requisitos Não Funcionais

O sistema deve atender aos seguintes critérios de qualidade:

- [ ] **Usabilidade:** Deve apresentar interface simples e de fácil navegação.
- [ ] **Portabilidade:** Deve apresentar compatibilidade com dispositivos móveis (Responsividade/App).
- [ ] **Desempenho:** Deve garantir tempo de resposta rápido.
- [ ] **Segurança:** Deve proteger os dados sensíveis dos usuários.
- [ ] **Escalabilidade:** A arquitetura deve suportar novas melhorias e aumento de carga.
- [ ] **Funcionalidade Desejável:** O sistema deve permitir a criação de campanhas de arrecadação.
