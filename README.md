# Projeto Pomodoro: Análise de Soluções Integradas para Organizações

[![Status do Projeto](https://img.shields.io/badge/status-concluído-green)](https://shields.io/)
[![Versão](https://img.shields.io/badge/version-1.0.0-blue)](https://shields.io/)
[![Licença](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.7x-61DAFB?logo=react)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Kanban](https://img.shields.io/badge/Methodology-Kanban-blue)](https://shields.io/)
[![GitHub Projects](https://img.shields.io/badge/Management-GitHub%20Projects-lightgrey?logo=github)](https://github.com/features/project-management)

## Sumário

1.  [Visão Geral do Produto](#visão-geral-do-produto)
2.  [Principais Funcionalidades](#principais-funcionalidades)
3.  [Metodologia de Desenvolvimento](#metodologia-de-desenvolvimento)
    * [Kanban e GitHub Projects](#kanban-e-github-projects)
    * [Revisões de Código Semanais](#revisões-de-código-semanais)
4.  [Especificações Técnicas](#especificações-técnicas)
5.  [Equipe do Projeto e Contribuições](#equipe-do-projeto-e-contribuições)
6.  [Diretrizes de Uso](#diretrizes-de-uso)
7.  [Linha do Tempo do Projeto (Ciclo de Vida)](#linha-do-tempo-do-projeto-ciclo-de-vida)
8.  [Como Contribuir](#como-contribuir)
9. [Licença](#licença)

## 1. Visão Geral do Produto

Este projeto consiste no desenvolvimento de um aplicativo da técnica Pomodoro, uma metodologia de gerenciamento de tempo que utiliza intervalos de trabalho focado de 25 minutos, chamados "pomodoros", seguidos por breves pausas. [cite: 12] O objetivo principal é combater o impacto negativo do uso excessivo da internet e das redes sociais na capacidade de concentração. [cite: 6] Muitos usuários enfrentam dificuldades em manter o foco devido a constantes distrações e sobrecarga de informações. [cite: 7]

O aplicativo Pomodoro foi concebido para transformar a clássica técnica em uma experiência adaptativa e orientada por dados. [cite: 12] Utilizando Inteligência Artificial (IA) para analisar padrões de uso e sugerir ajustes inteligentes[cite: 13], o aplicativo visa otimizar a produtividade de forma personalizada, indo além de um simples cronômetro. [cite: 13, 18] A solução é pensada para estudantes, profissionais e qualquer pessoa que busque reduzir distrações e melhorar a organização diária. [cite: 15]

**Valor Agregado:**
* **Personalização Contínua:** IA analisa o histórico para sugerir blocos de tempo ideais. [cite: 23]
* **Feedback Prático:** Relatórios semanais com dicas acionáveis. [cite: 24]
* **Engajamento Proativo:** Notificações motivacionais e contextuais. [cite: 26]

## 2. Principais Funcionalidades

O aplicativo oferece um conjunto de funcionalidades para aprimorar a gestão do tempo e a produtividade:

* **Configuração Personalizada:** Tempos de foco ("pomodoros") e pausas ajustáveis pelo usuário. [cite: 14]
* **Notificações Inteligentes:** Alertas para início e fim dos períodos de trabalho e pausa. [cite: 14, 21]
* **Relatórios e Estatísticas:** Acompanhamento da produtividade com gráficos de progresso e tendências semanais. [cite: 14, 22]
* **Análise com IA (OpenAI):** Interpretação de anotações do usuário ou históricos de sessões via Processamento de Linguagem Natural (PNL) para identificar padrões de procrastinação, sobrecarga ou períodos de alta concentração. [cite: 17]
* **Recomendações Personalizadas:** Sugestões de pausas, metas realistas e ajuste na duração dos "pomodoros" com base no contexto do usuário. [cite: 18]
* **Acesso Multiplataforma:** Sincronização em tempo real (inicialmente pensada com MongoDB Atlas[cite: 25], adaptada para Firebase neste projeto).
* **Interface Intuitiva e Acessível:** Design minimalista e fluido, fácil de usar mesmo para iniciantes na técnica Pomodoro. [cite: 15, 30]
* **Abordagem Preventiva:** Análise preditiva para identificar riscos de procrastinação e oferecer soluções proativas. [cite: 33]

## 3. Metodologia de Desenvolvimento

Para o desenvolvimento desta solução, adotamos uma abordagem ágil, focada na flexibilidade, entrega contínua e melhoria incremental. [cite: 66]

### Kanban e GitHub Projects

A gestão do projeto foi realizada utilizando a metodologia **Kanban**, visualizada e gerenciada através do **GitHub Projects**. Essa escolha permitiu um fluxo de trabalho transparente e eficiente, com as seguintes colunas principais no nosso quadro Kanban:

* **Backlog:** Todas as tarefas e funcionalidades planejadas para o projeto.
* **A Fazer (To Do):** Tarefas priorizadas e prontas para serem iniciadas.
* **Em Andamento (In Progress):** Tarefas que estão sendo desenvolvidas ativamente por um membro da equipe.
* **Em Revisão (In Review):** Tarefas concluídas que aguardam revisão (code review) por outros membros da equipe.
* **Concluído (Done):** Tarefas finalizadas, testadas e aprovadas.

O GitHub Projects foi fundamental para rastrear o progresso, atribuir responsabilidades e garantir que todos os membros da equipe tivessem uma visão clara do status de cada entrega. As tarefas eram movidas pelas colunas à medida que progrediam, facilitando a identificação de gargalos e a colaboração.

### Revisões de Código Semanais

Como parte crucial do nosso processo colaborativo, implementamos **revisões de código semanais**. Cada funcionalidade ou correção desenvolvida passava por uma análise criteriosa de pelo menos um outro membro da equipe antes de ser integrada à base de código principal. Esse processo visou:

* Garantir a qualidade e a manutenibilidade do código.
* Compartilhar conhecimento entre os membros da equipe.
* Identificar e corrigir bugs precocemente.
* Assegurar a aderência aos padrões de codificação estabelecidos.

## 4. Especificações Técnicas

A arquitetura da solução foi definida para garantir escalabilidade, desempenho e uma boa experiência do usuário:

* **Plataforma Mobile (Frontend):**
    * **Framework:** React Native
    * **Linguagem:** JavaScript/TypeScript
    * **Gerenciamento de Estado:** Redux (ou Context API, conforme a complexidade da feature)
    * **Navegação:** React Navigation
    * **UI Kits:** (Opcional, especificar se algum foi usado, ex: React Native Elements, NativeBase)

* **Backend e Banco de Dados:**
    * **Plataforma:** Firebase
    * **Serviços Utilizados:**
        * **Firebase Authentication:** Para gerenciamento de usuários.
        * **Cloud Firestore (ou Realtime Database):** Para armazenamento e sincronização de dados das sessões Pomodoro, configurações do usuário e estatísticas.
        * **Firebase Cloud Functions:** Para lógica de backend, como processamento de dados para relatórios ou integrações com IA.
        * **Firebase Cloud Messaging (FCM):** Para notificações push. [cite: 99]

* **Inteligência Artificial (IA):**
    * **API:** OpenAI API para processamento de linguagem natural e sugestões personalizadas. [cite: 17, 31]

* **Ferramentas de Desenvolvimento e DevOps:**
    * **Controle de Versão:** Git e GitHub
    * **Gerenciador de Pacotes:** npm ou Yarn
    * **CI/CD (Integração Contínua/Entrega Contínua):** GitHub Actions para automatizar testes e builds. [cite: 100]

## 5. Equipe do Projeto e Contribuições

Este projeto foi realizado por uma equipe dedicada, com cada membro desempenhando um papel crucial para o sucesso da solução:

* **Anderson Kevin Araujo Baltar** - *Administrador de Banco de Dados (DBA)*
    * Responsável pelo design, implementação e manutenção da estrutura do banco de dados no Firebase (Firestore/Realtime Database), garantindo a integridade, segurança e otimização das consultas de dados.
* **Antônio Gabriel Sousa Lira** - *Assistente de Banco de Dados*
    * Auxiliou na modelagem dos dados, na criação de scripts para migração e testes de carga, além de dar suporte na manutenção e otimização do banco de dados.
* **Bruno Mingorance Gorga** - *Engenheiro DevOps*
    * Configurou e gerenciou o ambiente de desenvolvimento, integração contínua (CI/CD) com GitHub Actions, e o deployment da aplicação e backend no Firebase.
* **Carla Rodrigues de Souza** - *Product Owner / Gerente de Projetos*
    * Liderou a visão do produto, definiu e priorizou o backlog de funcionalidades, gerenciou o cronograma do projeto utilizando o Kanban no GitHub Projects e facilitou a comunicação entre a equipe e stakeholders.
* **Leonardo de Alcântara Fróes** - *Desenvolvedor Frontend*
    * Principal responsável pelo desenvolvimento da interface do usuário (UI) e experiência do usuário (UX) do aplicativo mobile em React Native, implementando as telas, componentes e a lógica de interação.
* **Thiago Aleixo da Silva** - *Assistente de Backend*
    * Colaborou no desenvolvimento das Cloud Functions no Firebase, na integração com a API da OpenAI e na criação dos endpoints necessários para o funcionamento do aplicativo.
* **Tiago Carvalho da Silva** - *Assistente Frontend*
    * Apoiou no desenvolvimento de componentes visuais em React Native, na implementação de funcionalidades secundárias da interface e na realização de testes de usabilidade.

A colaboração e a comunicação constante foram pilares para o desenvolvimento deste projeto, assegurando que os objetivos fossem alcançados com qualidade e dentro do escopo definido.


## 6. Diretrizes de Uso

Após a instalação, o aplicativo Pomodoro oferece uma experiência intuitiva:

1.  **Tela Inicial:** Apresenta o timer principal.
2.  **Iniciar Sessão Pomodoro:** Toque no botão "Iniciar" para começar um ciclo de foco (padrão de 25 minutos).
3.  **Pausas:** Ao final de um "pomodoro", o aplicativo sugerirá uma pausa curta (padrão de 5 minutos). Após um número configurável de "pomodoros", uma pausa longa será sugerida.
4.  **Configurações:** Acesse o menu de configurações para personalizar:
    * Duração dos "pomodoros".
    * Duração das pausas curtas e longas.
    * Número de "pomodoros" antes de uma pausa longa.
    * Sons de notificação.
5.  **Relatórios:** Verifique a seção de estatísticas para visualizar seu progresso, tempo focado por dia/semana e outras métricas de produtividade. [cite: 14, 22]
6.  **Notas e IA:** Utilize o campo de anotações para descrever suas tarefas. A IA poderá usar essas informações para fornecer insights. [cite: 17]

## 7. Linha do Tempo do Projeto (Ciclo de Vida)

O desenvolvimento do aplicativo Pomodoro seguiu um ciclo de vida incremental[cite: 87], permitindo entregas contínuas e refinamento progressivo. As principais fases foram:

1.  **Fase de Concepção e Planejamento:** [cite: 90]
    * Definição dos objetivos do aplicativo e do problema a ser resolvido. [cite: 90]
    * Análise de mercado e requisitos dos usuários. [cite: 69, 70]
    * Seleção inicial de tecnologias e arquitetura. [cite: 73]
    * Definição do escopo do MVP (Minimum Viable Product).

2.  **Fase de Elaboração e Prototipagem:** [cite: 94]
    * Criação de wireframes e mockups (Figma/Adobe XD). [cite: 83]
    * Desenvolvimento de protótipos de baixa e alta fidelidade. [cite: 94]
    * Mapeamento detalhado da arquitetura do sistema com React Native e Firebase. [cite: 95]
    * Definição dos endpoints da API (Cloud Functions). [cite: 96]

3.  **Fase de Construção e Implementação:** [cite: 97]
    * Desenvolvimento do backend no Firebase (Authentication, Firestore, Cloud Functions). [cite: 98]
    * Implementação do frontend em React Native, focando em interatividade e responsividade. [cite: 99]
    * Integração com a API da OpenAI para funcionalidades de IA.
    * Configuração de CI/CD com GitHub Actions. [cite: 100]

4.  **Fase de Testes e Validação:** [cite: 101]
    * Testes unitários e de integração. [cite: 102, 103]
    * Testes de usabilidade com usuários reais. [cite: 84, 104]
    * Testes de estresse e carga no backend. [cite: 105]
    * Correção de bugs e ajustes. [cite: 106]

5.  **Fase de Implantação e Monitoramento:** [cite: 107]
    * Publicação nas lojas de aplicativos (Google Play Store e App Store) - *simulado para este projeto*. [cite: 108]
    * Configuração de métricas de monitoramento (Firebase Analytics). [cite: 109]
    * Suporte e correções pós-lançamento. [cite: 110]

6.  **Fase de Manutenção e Evolução Contínua:** [cite: 111]
    * Coleta de feedbacks dos usuários para melhorias. [cite: 113]
    * Correção de bugs e otimizações contínuas. [cite: 114]
    * Planejamento e desenvolvimento de novas funcionalidades. [cite: 115]

## 8. Como Contribuir

Agradecemos o interesse em contribuir para o Projeto Pomodoro! Para garantir um processo de contribuição eficiente e colaborativo, siga estas diretrizes:

1.  **Fork o Repositório:** Crie um fork do projeto para sua conta pessoal no GitHub.
2.  **Crie uma Branch:** Para cada nova funcionalidade ou correção, crie uma branch a partir da `main` (ou `develop`, se aplicável):
    ```bash
    git checkout -b minha-nova-feature
    ```
3.  **Faça suas Alterações:** Implemente sua funcionalidade ou correção de bug. Certifique-se de seguir os padrões de código do projeto.
4.  **Teste suas Alterações:** Garanta que suas modificações não quebram nenhuma funcionalidade existente e que os testes (se aplicável) passam.
5.  **Faça o Commit:** Escreva mensagens de commit claras e descritivas:
    ```bash
    git commit -m "feat: Adiciona funcionalidade X"
    # ou
    git commit -m "fix: Corrige bug Y na funcionalidade Z"
    ```
6.  **Envie para o GitHub (Push):**
    ```bash
    git push origin minha-nova-feature
    ```
7.  **Abra um Pull Request (PR):** No GitHub, abra um Pull Request da sua branch para a branch principal do repositório original. Descreva detalhadamente as alterações realizadas no PR.
8.  **Revisão de Código:** Aguarde a revisão do seu PR por um dos mantenedores do projeto. Esteja aberto a discussões e ajustes no seu código.

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

## 9. Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---

*Este README foi gerado com base na documentação do Projeto Integrador V e adaptado para um formato de repositório GitHub, incluindo detalhes específicos da metodologia e tecnologias utilizadas pela equipe.*
