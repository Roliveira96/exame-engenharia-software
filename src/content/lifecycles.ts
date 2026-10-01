import type { Topic } from './Topic';

export const lifecycles: Topic = {
  id: 'lifecycles',
  number: 2,
  unit: 1,
  title: 'Modelos de ciclo de vida',
  subtitle: 'cascata · prototipação · incremental · espiral · modelo V · RUP',
  icon: '🔄',
  color: '--c-life',
  summary: 'Como as atividades do processo são organizadas no tempo: do cascata sequencial aos modelos iterativos guiados por risco.',
  tags: ['cascata', 'prototipação', 'incremental', 'espiral', 'RUP'],
  lessons: [
    {
      id: 'life-concept',
      funFact: `A expressão "<b>release early, release often</b>" (libere cedo, libere com frequência) ficou famosa com o desenvolvimento do <b>Linux</b>, descrito por Eric Raymond em <i>A Catedral e o Bazar</i>.`,
      icon: '🗺️',
      title: 'O que é um modelo de ciclo de vida',
      body: `
        <p>Um <b>modelo de ciclo de vida</b> (ou modelo de processo) é uma <b>representação abstrata</b> de um processo de software: diz <b>quais</b> atividades existem, em que <b>ordem</b> acontecem e como se relacionam, do nascimento à aposentadoria do sistema.</p>
        <p>Todos usam as mesmas atividades fundamentais (especificar, desenvolver, validar, evoluir). O que muda é a organização:</p>
        <table class="table">
          <tr><th>Família</th><th>Ideia central</th><th>Exemplos</th></tr>
          <tr><td><b>Sequencial</b></td><td>fases separadas, uma depois da outra</td><td>cascata, modelo V</td></tr>
          <tr><td><b>Evolucionário / iterativo</b></td><td>versões sucessivas refinadas com o cliente</td><td>prototipação, espiral</td></tr>
          <tr><td><b>Incremental</b></td><td>o sistema é entregue em partes que funcionam</td><td>entrega incremental, RAD, RUP</td></tr>
          <tr><td><b>Baseado em reúso</b></td><td>montar o sistema a partir de componentes prontos</td><td>engenharia baseada em componentes</td></tr>
        </table>
        <p>Não existe modelo "certo": a escolha depende do <b>tipo de sistema</b>, da <b>estabilidade dos requisitos</b>, do <b>risco</b> e do <b>tamanho</b> da equipe.</p>`,
      examTip: '<b>Iterativo</b> é repetir o ciclo para refinar; <b>incremental</b> é entregar o produto em partes. Um processo pode ser as duas coisas (RUP, Scrum).',
    },
    {
      id: 'life-waterfall',
      funFact: `Ironia histórica: o artigo de <b>Royce (1970)</b> nunca usa a palavra "cascata" e, logo depois de mostrar o diagrama sequencial, avisa que aquela forma de trabalhar "<b>é arriscada e convida ao fracasso</b>". O modelo ficou famoso justamente pela versão que ele criticava.`,
      icon: '🌊',
      title: 'Modelo cascata (ciclo de vida clássico)',
      body: `
        <p>Proposto por <b>Winston Royce (1970)</b>, organiza o desenvolvimento em fases <b>sequenciais</b>: cada uma produz documentos aprovados que alimentam a seguinte, e uma fase só começa quando a anterior termina.</p>
        <table class="table">
          <tr><th>Sommerville</th><th>Pressman (1995)</th></tr>
          <tr><td>1. Definição de requisitos</td><td>1. Engenharia de sistemas</td></tr>
          <tr><td>2. Projeto de sistema e de software</td><td>2. Análise de requisitos</td></tr>
          <tr><td>3. Implementação e teste de unidade</td><td>3. Projeto</td></tr>
          <tr><td>4. Integração e teste de sistema</td><td>4. Codificação</td></tr>
          <tr><td>5. Operação e manutenção</td><td>5. Testes · 6. Manutenção</td></tr>
        </table>
        <p><b>Vantagens:</b> simples de entender e gerenciar, processo <b>visível</b> (cada fase gera um documento), bom para contratos.</p>
        <p><b>Problemas:</b> exige que <b>todos os requisitos sejam conhecidos no início</b>; é <b>inflexível</b> a mudanças; o cliente só vê software funcionando <b>no fim</b>; um erro de requisito descoberto tarde custa muito caro.</p>
        <p><b>Quando usar:</b> requisitos bem compreendidos e estáveis, sistemas grandes desenvolvidos em vários locais, ou quando há exigência contratual de documentação por fase.</p>`,
      examTip: 'A manutenção é a fase <b>mais longa</b> do ciclo de vida. E a maior crítica ao cascata é a <b>dificuldade de acomodar mudanças</b> depois que o processo está em andamento.',
      labCue: { label: 'Ver a cascata descendo', cue: 'models:waterfall' },
    },
    {
      id: 'life-prototype',
      funFact: `Antes de existir o <b>Palm Pilot</b>, seu criador, Jeff Hawkins, andava com um <b>bloquinho de madeira</b> no bolso da camisa e fingia usá-lo nas reuniões, para descobrir quais funções realmente fariam falta. Protótipo descartável de verdade.`,
      icon: '🧪',
      title: 'Prototipação',
      body: `
        <p>Usada quando o cliente <b>não consegue detalhar os requisitos</b>. Constrói-se rapidamente uma versão simplificada (protótipo), o cliente avalia, e o ciclo se repete até os requisitos ficarem claros.</p>
        <p>Ciclo de Pressman: <b>comunicação → plano rápido → projeto rápido → construção do protótipo → entrega e feedback</b>.</p>
        <table class="table">
          <tr><th>Tipo</th><th>O que acontece com o protótipo</th></tr>
          <tr><td><b>Descartável</b> (<i>throwaway</i>)</td><td>Serve só para <b>descobrir requisitos</b>; depois é jogado fora e o sistema é construído do jeito certo.</td></tr>
          <tr><td><b>Evolucionário</b></td><td>Vai sendo <b>refinado</b> até virar o sistema final.</td></tr>
        </table>
        <p><b>Riscos:</b> o cliente vê algo funcionando e <b>acha que o produto está pronto</b>; decisões apressadas (linguagem, algoritmo ineficiente) acabam ficando no produto final.</p>`,
      examTip: 'O protótipo é, antes de tudo, um <b>mecanismo para identificar requisitos</b>. Na prototipação descartável ele <b>não</b> vira o produto.',
      labCue: { label: 'Ver o ciclo do protótipo', cue: 'models:prototyping' },
    },
    {
      id: 'life-incremental',
      funFact: `O <b>Gmail</b> ficou com o selo "beta" por <b>mais de cinco anos</b>, recebendo funções novas aos poucos enquanto milhões de pessoas já o usavam. Entrega incremental na veia.`,
      icon: '🧩',
      title: 'Desenvolvimento evolucionário e entrega incremental',
      body: `
        <p><b>Desenvolvimento evolucionário</b> (Sommerville): desenvolver uma implementação inicial, expor ao usuário e <b>refinar em várias versões</b>, com especificação, desenvolvimento e validação <b>intercalados</b>. Problemas: o processo <b>não é visível</b> (pouca documentação) e os sistemas tendem a ficar <b>mal estruturados</b>.</p>
        <p><b>Entrega incremental:</b> os requisitos são priorizados e o sistema é dividido em <b>incrementos</b>. Cada incremento entrega uma parte <b>funcionando</b>; o primeiro contém o <b>núcleo</b> (os requisitos mais importantes).</p>
        <ul>
          <li>O cliente <b>usa o sistema cedo</b> e obtém valor antes do fim do projeto.</li>
          <li>Os primeiros incrementos funcionam como <b>protótipo</b> para os seguintes.</li>
          <li><b>Menor risco</b> de fracasso total do projeto.</li>
          <li>Os serviços prioritários recebem <b>mais testes</b>, pois são entregues primeiro.</li>
        </ul>
        <p><b>RAD</b> (<i>Rapid Application Development</i>) é um incremental de <b>ciclo muito curto</b> (60 a 90 dias), com equipes em paralelo e forte uso de componentes. Exige requisitos bem conhecidos e sistema modularizável.</p>`,
      mnemonic: 'Incremental = <b>fatias de bolo</b> que já podem ser comidas. Iterativo = <b>esculpir</b> a mesma peça várias vezes.',
      labCue: { label: 'Ver as entregas por incremento', cue: 'models:incremental' },
    },
    {
      id: 'life-spiral',
      funFact: `Boehm criou o espiral enquanto trabalhava na <b>TRW</b>, empresa que fazia software para foguetes e satélites: um lugar onde ignorar um risco técnico podia custar, literalmente, uma missão espacial.`,
      icon: '🌀',
      title: 'Modelo espiral',
      body: `
        <p>Proposto por <b>Barry Boehm (1988)</b>. O processo é uma espiral em que <b>cada volta é uma fase</b> (viabilidade, requisitos, projeto...). É um modelo <b>dirigido a riscos</b>: une a iteração da prototipação com o controle do cascata.</p>
        <p>Cada volta passa por quatro setores:</p>
        <ol>
          <li><b>Definição de objetivos</b>, alternativas e restrições.</li>
          <li><b>Avaliação e redução de riscos</b> (com protótipos, simulações, análises).</li>
          <li><b>Desenvolvimento e validação</b> do produto daquele nível.</li>
          <li><b>Planejamento</b> da próxima volta (decide-se se o projeto continua).</li>
        </ol>
        <p><b>Vantagem:</b> os riscos são tratados <b>explicitamente</b> e cedo. <b>Desvantagens:</b> exige <b>especialistas em análise de risco</b>, é complexo de gerenciar e pode ser caro demais para projetos pequenos.</p>`,
      examTip: 'Palavra-chave do espiral: <b>RISCO</b>. Se o enunciado fala em "análise de riscos a cada ciclo", a resposta é espiral (Boehm).',
      labCue: { label: 'Percorrer a espiral', cue: 'models:spiral' },
    },
    {
      id: 'life-v',
      funFact: `O V não é só um desenho didático: o <b>V-Modell</b> é o padrão oficial de desenvolvimento de sistemas do governo da <b>Alemanha</b>, exigido em projetos públicos e de defesa.`,
      icon: '✅',
      title: 'Modelo V',
      body: `
        <p>É uma variação do cascata que deixa explícita a relação entre cada fase de <b>desenvolvimento</b> (lado esquerdo, descendo) e o nível de <b>teste</b> que a verifica (lado direito, subindo).</p>
        <table class="table">
          <tr><th>Fase de desenvolvimento</th><th>Verificada por</th></tr>
          <tr><td>Requisitos do usuário</td><td><b>Teste de aceitação</b></td></tr>
          <tr><td>Requisitos / especificação do sistema</td><td><b>Teste de sistema</b></td></tr>
          <tr><td>Projeto de arquitetura</td><td><b>Teste de integração</b></td></tr>
          <tr><td>Projeto detalhado (e código)</td><td><b>Teste de unidade</b></td></tr>
        </table>
        <p>A grande lição do V: os <b>testes são planejados desde o início</b>, junto com cada artefato, e não só depois do código.</p>`,
      mnemonic: 'De baixo para cima no lado direito: <b>U-I-S-A</b> (Unidade, Integração, Sistema, Aceitação).',
      labCue: { label: 'Ver o V se formando', cue: 'models:vmodel' },
    },
    {
      id: 'life-rup',
      funFact: `O RUP veio da <b>Rational</b>, a empresa dos "três amigos" da UML (Booch, Rumbaugh e Jacobson). Em 2003, a <b>IBM comprou a Rational por US$ 2,1 bilhões</b>.`,
      icon: '🏛️',
      title: 'Processo Unificado (RUP)',
      body: `
        <p>O <b>Rational Unified Process</b> é um processo <b>iterativo e incremental</b>, <b>dirigido por casos de uso</b> e <b>centrado na arquitetura</b>, que usa a UML. É a base dos livros de Wazlawick e Larman da bibliografia.</p>
        <table class="table">
          <tr><th>Fase</th><th>Objetivo</th><th>Marco</th></tr>
          <tr><td><b>Concepção</b></td><td>Estabelecer o caso de negócio: escopo, viabilidade, principais atores e casos de uso</td><td>Objetivos do ciclo de vida</td></tr>
          <tr><td><b>Elaboração</b></td><td>Entender o domínio, definir a <b>arquitetura</b> e eliminar os maiores riscos</td><td>Arquitetura do ciclo de vida</td></tr>
          <tr><td><b>Construção</b></td><td>Projetar, programar e testar o sistema em iterações</td><td>Capacidade operacional inicial</td></tr>
          <tr><td><b>Transição</b></td><td>Levar o sistema para o ambiente do usuário (implantação, treinamento)</td><td>Release do produto</td></tr>
        </table>
        <p>As <b>fases</b> são a perspectiva <b>dinâmica</b> (tempo). Os <b>fluxos de trabalho</b> (modelagem de negócios, requisitos, análise e projeto, implementação, teste, implantação + apoio) são a perspectiva <b>estática</b> e atravessam todas as fases.</p>
        <p><b>Seis boas práticas:</b> desenvolver iterativamente, gerenciar requisitos, usar arquiteturas baseadas em componentes, modelar visualmente, verificar a qualidade e controlar as mudanças.</p>`,
      examTip: 'Fase do RUP <b>não</b> é sinônimo de atividade do cascata: em <b>todas</b> as fases há requisitos, projeto, código e teste, só muda a intensidade.',
      mnemonic: '<b>C-E-C-T</b>: Concepção, Elaboração, Construção, Transição.',
      labCue: { label: 'Ver as fases do RUP', cue: 'models:rup' },
    },
    {
      id: 'life-choose',
      funFact: `Em 1996, o foguete <b>Ariane 5</b> explodiu cerca de 40 segundos depois de decolar. A causa: um componente <b>reutilizado do Ariane 4</b>, que tentou guardar um número de 64 bits em 16 bits. Reúso também precisa de análise e teste.`,
      icon: '⚖️',
      title: 'Como escolher o modelo',
      body: `
        <table class="table">
          <tr><th>Situação do projeto</th><th>Modelo indicado</th></tr>
          <tr><td>Requisitos claros, estáveis e bem documentados</td><td><b>Cascata</b> (ou V, se a verificação é crítica)</td></tr>
          <tr><td>Cliente não sabe expressar o que quer; interface é o ponto incerto</td><td><b>Prototipação</b></td></tr>
          <tr><td>É preciso entregar valor cedo; requisitos priorizáveis</td><td><b>Incremental</b></td></tr>
          <tr><td>Projeto grande, caro e com riscos técnicos altos</td><td><b>Espiral</b></td></tr>
          <tr><td>Prazo muito curto, sistema modular, requisitos conhecidos</td><td><b>RAD</b></td></tr>
          <tr><td>Já existem componentes prontos que cobrem boa parte dos requisitos</td><td><b>Baseado em componentes (reúso)</b></td></tr>
          <tr><td>Sistema crítico em que a correção precisa ser provada</td><td><b>Métodos formais</b></td></tr>
        </table>
        <p>Pressman (1995) lista ainda as <b>técnicas de quarta geração (4GT)</b>: ferramentas que geram código a partir de uma especificação de alto nível.</p>
        <p>Na <b>engenharia baseada em componentes</b> (Sommerville), as etapas são: análise de componentes, modificação de requisitos, projeto do sistema com reúso, desenvolvimento e integração. Ganha-se em custo e prazo, mas os requisitos podem ter de ceder ao que os componentes oferecem.</p>`,
      labCue: { label: 'Treinar a escolha do modelo', cue: 'choose' },
    },
  ],
  questions: [
    {
      id: 'life-q1',
      difficulty: 'easy',
      prompt: 'Qual é a principal característica do modelo cascata?',
      answer: 'As fases são executadas em sequência, e cada uma só começa depois que a anterior é concluída e aprovada.',
      distractors: [
        'O sistema é entregue ao cliente em pequenos incrementos a cada duas semanas.',
        'Cada ciclo começa obrigatoriamente por uma análise de riscos.',
        'Os requisitos são descobertos por meio de protótipos descartáveis.',
      ],
      explanation: 'O cascata é sequencial e dirigido por documentos. Incrementos curtos lembram métodos ágeis; análise de riscos a cada ciclo é o espiral.',
    },
    {
      id: 'life-q2',
      difficulty: 'easy',
      prompt: 'O modelo espiral, proposto por Barry Boehm, distingue-se dos demais principalmente por:',
      answer: 'Tratar explicitamente a análise e a redução de riscos a cada volta da espiral.',
      distractors: [
        'Dispensar qualquer tipo de planejamento entre os ciclos.',
        'Proibir o uso de protótipos durante o desenvolvimento.',
        'Exigir que todos os requisitos sejam congelados antes da primeira volta.',
      ],
      explanation: 'O espiral é um modelo dirigido a riscos. Cada volta define objetivos, avalia e reduz riscos, desenvolve e valida, e planeja a próxima.',
    },
    {
      id: 'life-q3',
      difficulty: 'easy',
      prompt: 'Quais são, na ordem, as fases do Processo Unificado (RUP)?',
      answer: 'Concepção, elaboração, construção e transição.',
      distractors: [
        'Especificação, desenvolvimento, validação e evolução.',
        'Comunicação, planejamento, modelagem e construção.',
        'Análise, projeto, codificação e testes.',
      ],
      explanation: 'Concepção (caso de negócio), elaboração (arquitetura e riscos), construção (implementação) e transição (entrega ao usuário).',
    },
    {
      id: 'life-q4',
      difficulty: 'easy',
      prompt: 'Em qual situação a prototipação é mais indicada?',
      answer: 'Quando o cliente tem dificuldade para definir os requisitos e precisa ver algo funcionando para esclarecê-los.',
      distractors: [
        'Quando os requisitos são estáveis e totalmente conhecidos desde o início.',
        'Quando o contrato exige a entrega de um documento formal ao fim de cada fase.',
        'Quando não há qualquer possibilidade de contato com o usuário final.',
      ],
      explanation: 'O protótipo é um mecanismo de descoberta e validação de requisitos, útil sobretudo quando eles são vagos ou a interface é incerta.',
    },
    {
      id: 'life-q5',
      difficulty: 'medium',
      prompt: 'No modelo V, qual nível de teste verifica os <b>requisitos do usuário</b>?',
      answer: 'Teste de aceitação',
      distractors: ['Teste de unidade', 'Teste de integração', 'Teste de sistema'],
      explanation: 'No V, requisitos do usuário ↔ aceitação; especificação do sistema ↔ sistema; arquitetura ↔ integração; projeto detalhado ↔ unidade.',
    },
    {
      id: 'life-q6',
      difficulty: 'medium',
      prompt: 'Uma vantagem da entrega incremental em relação ao modelo cascata é:',
      answer: 'O cliente pode usar partes do sistema mais cedo, e os serviços de maior prioridade são entregues e testados primeiro.',
      distractors: [
        'Não é mais necessário priorizar os requisitos.',
        'A arquitetura do sistema pode ser definida somente no último incremento.',
        'O sistema inteiro é entregue de uma única vez, o que reduz o esforço de integração.',
      ],
      explanation: 'Na entrega incremental, cada incremento agrega funcionalidade utilizável, começando pelo núcleo. Isso reduz o risco de fracasso total do projeto.',
    },
    {
      id: 'life-q7',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre prototipação descartável e prototipação evolucionária?',
      answer: 'Na descartável, o protótipo serve para entender os requisitos e depois é abandonado; na evolucionária, ele é refinado até se tornar o sistema final.',
      distractors: [
        'Na descartável, o protótipo é entregue como produto final; na evolucionária, ele nunca é mostrado ao cliente.',
        'A descartável é usada apenas em métodos ágeis, e a evolucionária, apenas no cascata.',
        'Não há diferença: os dois termos são sinônimos.',
      ],
      explanation: 'O objetivo da descartável é a especificação; o da evolucionária é entregar um sistema funcionando aos usuários finais.',
    },
    {
      id: 'life-q8',
      difficulty: 'medium',
      prompt: 'Segundo Sommerville, dois problemas do desenvolvimento evolucionário (exploratório) são:',
      answer: 'O processo não é visível para a gerência e os sistemas tendem a ficar mal estruturados.',
      distractors: [
        'A impossibilidade de mudar requisitos e a entrega única ao final.',
        'O excesso de documentação e a ausência de contato com o cliente.',
        'A obrigatoriedade de métodos formais e o alto custo de hardware.',
      ],
      explanation: 'Como o sistema muda rapidamente, não compensa documentar cada versão (falta visibilidade), e as mudanças contínuas corrompem a estrutura.',
    },
    {
      id: 'life-q9',
      difficulty: 'medium',
      prompt: 'Em qual fase do RUP a arquitetura do sistema é estabelecida e os principais riscos são tratados?',
      answer: 'Elaboração',
      distractors: ['Concepção', 'Construção', 'Transição'],
      explanation: 'A elaboração desenvolve o entendimento do domínio, define a arquitetura e elimina os riscos mais altos. Seu marco é a "arquitetura do ciclo de vida".',
    },
    {
      id: 'life-q10',
      difficulty: 'medium',
      prompt: 'Um sistema de controle para uma usina terá requisitos regulatórios estáveis, definidos em norma, e o contrato exige documentação aprovada ao fim de cada etapa. O modelo mais adequado é:',
      answer: 'Cascata',
      distractors: ['Prototipação descartável', 'Desenvolvimento exploratório', 'RAD'],
      explanation: 'Requisitos estáveis e bem compreendidos e exigência de documentos por fase são o cenário clássico do cascata (ou do modelo V).',
    },
    {
      id: 'life-q11',
      difficulty: 'hard',
      prompt: 'Sobre o RUP, é correto afirmar que:',
      answer: 'Suas fases estão ligadas a objetivos de negócio, e os fluxos de trabalho (requisitos, projeto, implementação, teste...) ocorrem em todas elas, com intensidades diferentes.',
      distractors: [
        'Cada fase corresponde exatamente a uma atividade do cascata: concepção é requisitos, elaboração é projeto, construção é código e transição é teste.',
        'É um processo estritamente sequencial, sem iterações dentro das fases.',
        'Dispensa a modelagem visual e não utiliza a UML.',
      ],
      explanation: 'O RUP separa a perspectiva dinâmica (fases) da estática (fluxos de trabalho). É iterativo e incremental, e a UML é a sua notação.',
    },
    {
      id: 'life-q12',
      difficulty: 'hard',
      prompt: 'Qual das alternativas descreve corretamente os quatro setores de cada volta do modelo espiral?',
      answer: 'Definição de objetivos; avaliação e redução de riscos; desenvolvimento e validação; planejamento da próxima fase.',
      distractors: [
        'Concepção; elaboração; construção; transição.',
        'Análise; projeto; codificação; manutenção.',
        'Planning; daily; review; retrospective.',
      ],
      explanation: 'São os setores de Boehm. Concepção/elaboração/construção/transição são fases do RUP; planning/daily/review/retrospective são eventos do Scrum.',
    },
    {
      id: 'life-q13',
      difficulty: 'hard',
      prompt: 'O modelo RAD (Rapid Application Development) NÃO é indicado quando:',
      answer: 'O sistema não pode ser adequadamente modularizado ou envolve riscos técnicos altos, como o uso intenso de tecnologia nova.',
      distractors: [
        'Os requisitos são bem compreendidos e o escopo é restrito.',
        'Há equipes suficientes para trabalhar em paralelo.',
        'O sistema pode ser construído com componentes reutilizáveis.',
      ],
      explanation: 'O RAD precisa de requisitos conhecidos, modularização, equipes em paralelo e reúso para fechar ciclos de 60 a 90 dias. Alto risco técnico o inviabiliza.',
    },
    {
      id: 'life-q14',
      difficulty: 'easy',
      prompt: 'Qual é a diferença entre desenvolvimento iterativo e desenvolvimento incremental?',
      answer: 'Iterativo é repetir o ciclo para refinar o produto; incremental é construir e entregar o produto em partes.',
      distractors: [
        'Iterativo é entregar o sistema uma única vez; incremental é nunca entregar.',
        'São exatamente a mesma coisa, apenas com nomes diferentes.',
        'Iterativo só existe no cascata; incremental só existe no espiral.',
      ],
      explanation: 'As ideias se complementam: o RUP e o Scrum são iterativos (ciclos repetidos) e incrementais (cada ciclo acrescenta funcionalidade).',
    },
    {
      id: 'life-q15',
      difficulty: 'medium',
      prompt: 'Um risco típico da prototipação é:',
      answer: 'O cliente acreditar que o protótipo já é o produto final e pressionar para que ele seja entregue com "alguns ajustes".',
      distractors: [
        'O cliente ficar sem ver nada funcionando até o fim do projeto.',
        'A impossibilidade de obter feedback dos usuários.',
        'A exigência de congelar os requisitos antes de construir o protótipo.',
      ],
      explanation: 'O protótipo é feito às pressas, sem preocupação com qualidade ou manutenção. Tratá-lo como produto acabado compromete o sistema.',
    },
  ],
  openQuestions: [
    {
      id: 'life-o1',
      prompt: 'Descreva o modelo cascata, citando suas fases, duas vantagens e duas desvantagens.',
      modelAnswer: `
        <p>O modelo cascata (ciclo de vida clássico, Royce, 1970) organiza o desenvolvimento em <b>fases sequenciais</b>: definição de requisitos, projeto de sistema e de software, implementação e teste de unidade, integração e teste de sistema, operação e manutenção. Cada fase só começa quando a anterior é concluída e aprovada.</p>
        <p><b>Vantagens:</b> é simples de entender e de gerenciar; o processo é visível, pois cada fase gera documentação.</p>
        <p><b>Desvantagens:</b> exige que os requisitos sejam conhecidos e estáveis desde o início; é inflexível a mudanças; o cliente só vê o sistema funcionando no final, e erros de requisitos descobertos tarde custam caro.</p>`,
      keyPoints: ['Fases sequenciais, na ordem correta', 'Uma fase só começa quando a anterior termina', 'Vantagens: simplicidade, visibilidade/documentação', 'Desvantagens: inflexível a mudanças, cliente só vê no fim'],
    },
    {
      id: 'life-o2',
      prompt: 'Explique o modelo espiral e por que ele é considerado um modelo dirigido a riscos.',
      modelAnswer: `
        <p>O modelo espiral (Boehm, 1988) representa o processo como uma espiral em que cada volta é uma fase do projeto. Cada volta passa por quatro setores: <b>definição de objetivos</b> (com alternativas e restrições), <b>avaliação e redução de riscos</b>, <b>desenvolvimento e validação</b> e <b>planejamento</b> da próxima volta.</p>
        <p>É dirigido a riscos porque, a cada ciclo, os riscos são <b>identificados e tratados explicitamente</b> antes de se investir no desenvolvimento, usando protótipos, simulações e análises. A forma de desenvolver em cada volta é escolhida conforme o risco predominante, e ao final de cada volta decide-se se o projeto deve continuar.</p>`,
      keyPoints: ['Boehm; cada volta é uma fase', 'Os quatro setores', 'Risco é analisado e reduzido a cada volta', 'Combina prototipação com o controle do cascata'],
    },
    {
      id: 'life-o3',
      prompt: 'Compare o desenvolvimento incremental com o modelo cascata do ponto de vista do cliente.',
      modelAnswer: `
        <p>No <b>cascata</b>, o cliente participa principalmente no início (requisitos) e só recebe o sistema completo no fim; se algo foi mal entendido, descobre tarde.</p>
        <p>No <b>incremental</b>, os requisitos são priorizados e o sistema é entregue em partes que funcionam. O cliente <b>usa o sistema mais cedo</b>, obtém valor antes do fim do projeto, dá <b>feedback</b> que orienta os próximos incrementos e corre <b>menos risco</b> de fracasso total. Como os serviços mais importantes são entregues primeiro, são também os mais testados.</p>`,
      keyPoints: ['Cascata: entrega única no final', 'Incremental: entregas parciais e utilizáveis', 'Feedback cedo e menor risco', 'Prioridades entregues e testadas primeiro'],
    },
    {
      id: 'life-o4',
      prompt: 'Cite as quatro fases do RUP e o principal objetivo de cada uma.',
      modelAnswer: `
        <p><b>Concepção:</b> estabelecer o caso de negócio, o escopo e a viabilidade do projeto.</p>
        <p><b>Elaboração:</b> compreender o domínio do problema, definir a arquitetura e tratar os principais riscos.</p>
        <p><b>Construção:</b> projetar, programar e testar o sistema, em iterações, até ter uma versão operacional.</p>
        <p><b>Transição:</b> transferir o sistema para o ambiente dos usuários (implantação, treinamento, ajustes).</p>`,
      keyPoints: ['Concepção: caso de negócio/escopo', 'Elaboração: arquitetura e riscos', 'Construção: implementação e teste', 'Transição: implantação no ambiente do usuário'],
    },
  ],
  flashcards: [
    { id: 'life-f1', front: 'Quem propôs o modelo cascata e quando?', back: 'Winston Royce, em 1970.' },
    { id: 'life-f2', front: 'Quem propôs o modelo espiral e qual é a palavra-chave dele?', back: 'Barry Boehm (1988). Palavra-chave: RISCO.' },
    { id: 'life-f3', front: 'Os 4 setores de uma volta da espiral?', back: 'Objetivos → avaliação e redução de riscos → desenvolvimento e validação → planejamento.' },
    { id: 'life-f4', front: 'As 4 fases do RUP?', back: 'Concepção, elaboração, construção, transição.' },
    { id: 'life-f5', front: 'Em que fase do RUP se define a arquitetura?', back: 'Na elaboração.' },
    { id: 'life-f6', front: 'Protótipo descartável × evolucionário?', back: 'Descartável: só para levantar requisitos, depois é jogado fora. Evolucionário: é refinado até virar o sistema.' },
    { id: 'life-f7', front: 'Maior problema do modelo cascata?', back: 'Inflexibilidade: é difícil acomodar mudanças depois que o processo está em andamento.' },
    { id: 'life-f8', front: 'Modelo V: quem verifica os requisitos do usuário?', back: 'O teste de aceitação.' },
    { id: 'life-f9', front: 'Modelo V: quem verifica o projeto de arquitetura?', back: 'O teste de integração.' },
    { id: 'life-f10', front: 'O que o primeiro incremento contém, na entrega incremental?', back: 'O núcleo do produto: os requisitos de maior prioridade.' },
    { id: 'life-f11', front: 'Iterativo × incremental?', back: 'Iterativo: repetir para refinar. Incremental: entregar em partes.' },
    { id: 'life-f12', front: 'O que é RAD?', back: 'Rapid Application Development: modelo incremental de ciclo muito curto (60 a 90 dias), com equipes paralelas e reúso.' },
    { id: 'life-f13', front: 'Três adjetivos que definem o RUP?', back: 'Iterativo e incremental, dirigido por casos de uso, centrado na arquitetura.' },
  ],
  cheatSheet: [
    { term: 'Cascata', definition: 'Fases sequenciais (Royce, 1970). Bom com requisitos estáveis; ruim para mudanças.' },
    { term: 'Prototipação', definition: 'Versão rápida para descobrir requisitos. Descartável × evolucionária.' },
    { term: 'Evolucionário', definition: 'Versões sucessivas com feedback. Risco: sem visibilidade e mal estruturado.' },
    { term: 'Incremental', definition: 'Entregas parciais utilizáveis; primeiro o núcleo, de maior prioridade.' },
    { term: 'RAD', definition: 'Incremental de 60 a 90 dias, com equipes paralelas e componentes.' },
    { term: 'Espiral', definition: 'Boehm, 1988. Dirigido a riscos: objetivos → riscos → desenvolvimento → planejamento.' },
    { term: 'Modelo V', definition: 'Cada fase de desenvolvimento tem um nível de teste: unidade, integração, sistema, aceitação.' },
    { term: 'RUP', definition: 'Concepção, elaboração (arquitetura), construção, transição. Iterativo, dirigido por casos de uso.' },
    { term: 'Baseado em componentes', definition: 'Reúso: análise de componentes, modificação de requisitos, projeto com reúso, integração.' },
  ],
};
