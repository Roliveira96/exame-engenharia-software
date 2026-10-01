import type { Topic } from './Topic';

export const agile: Topic = {
  id: 'agile',
  number: 3,
  unit: 2,
  title: 'Metodologias ágeis',
  subtitle: 'Manifesto Ágil · Scrum · XP · Kanban · user stories',
  icon: '🏃',
  color: '--c-agile',
  summary: 'Os valores do Manifesto Ágil e os métodos que caem em prova: papéis, eventos e artefatos do Scrum, práticas do XP e o fluxo do Kanban.',
  tags: ['4 valores', 'Scrum', 'XP', 'Kanban', 'INVEST'],
  lessons: [
    {
      id: 'agile-manifesto',
      icon: '📜',
      title: 'Manifesto Ágil: os quatro valores',
      body: `
        <p>Em <b>2001</b>, dezessete desenvolvedores reunidos em Snowbird (Utah, EUA) publicaram o <b>Manifesto para o Desenvolvimento Ágil de Software</b>, uma reação aos processos pesados, dirigidos por planos e documentos.</p>
        <table class="table">
          <tr><th>Valorizamos mais...</th><th>...do que</th></tr>
          <tr><td><b>Indivíduos e interações</b></td><td>processos e ferramentas</td></tr>
          <tr><td><b>Software em funcionamento</b></td><td>documentação abrangente</td></tr>
          <tr><td><b>Colaboração com o cliente</b></td><td>negociação de contratos</td></tr>
          <tr><td><b>Responder a mudanças</b></td><td>seguir um plano</td></tr>
        </table>
        <p>O texto termina com a frase que mais cai em prova: <i>"mesmo havendo valor nos itens à direita, valorizamos <b>mais</b> os itens à esquerda"</i>.</p>`,
      examTip: 'Ágil <b>não</b> significa "sem documentação" nem "sem planejamento". O manifesto diz que os itens da direita <b>têm valor</b>, só que menos.',
      mnemonic: '<b>I-S-C-R</b>: <b>I</b>ndivíduos, <b>S</b>oftware funcionando, <b>C</b>olaboração, <b>R</b>esposta a mudanças.',
    },
    {
      id: 'agile-principles',
      icon: '🧭',
      title: 'Os doze princípios, resumidos',
      body: `
        <ol>
          <li>A maior prioridade é <b>satisfazer o cliente</b> com entrega adiantada e contínua de software de valor.</li>
          <li><b>Mudanças de requisitos são bem-vindas</b>, mesmo no fim do desenvolvimento.</li>
          <li>Entregar software funcionando <b>com frequência</b> (de semanas a poucos meses).</li>
          <li>Pessoas de <b>negócio e desenvolvedores trabalham juntos</b> diariamente.</li>
          <li>Construir projetos em torno de <b>indivíduos motivados</b>, com ambiente, suporte e confiança.</li>
          <li>A <b>conversa face a face</b> é o meio mais eficaz de transmitir informação.</li>
          <li><b>Software funcionando</b> é a principal <b>medida de progresso</b>.</li>
          <li><b>Ritmo sustentável</b>: todos devem conseguir manter o passo indefinidamente.</li>
          <li>Atenção contínua à <b>excelência técnica</b> e ao bom projeto.</li>
          <li><b>Simplicidade</b>: a arte de maximizar o trabalho que <b>não</b> é feito.</li>
          <li>As melhores arquiteturas, requisitos e projetos emergem de <b>equipes auto-organizáveis</b>.</li>
          <li>Em intervalos regulares, a equipe <b>reflete</b> sobre como ser mais eficaz e se ajusta.</li>
        </ol>`,
      examTip: 'A medida primária de progresso é <b>software funcionando</b>, não documentos entregues nem percentual do cronograma.',
    },
    {
      id: 'agile-scrum-roles',
      icon: '👥',
      title: 'Scrum: pilares e papéis',
      body: `
        <p>O Scrum é um <b>framework</b> para gerenciar o desenvolvimento de produtos complexos de forma <b>iterativa e incremental</b>. Baseia-se no <b>empirismo</b>, apoiado em três pilares: <b>transparência, inspeção e adaptação</b>.</p>
        <table class="table">
          <tr><th>Papel</th><th>Responsabilidade</th></tr>
          <tr><td><b>Product Owner (PO)</b></td><td>Maximiza o <b>valor</b> do produto. É o <b>único</b> responsável por gerenciar e <b>ordenar o Product Backlog</b>. Representa clientes e partes interessadas. É uma pessoa, não um comitê.</td></tr>
          <tr><td><b>Scrum Master (SM)</b></td><td><b>Líder servidor</b>: garante que o Scrum seja entendido e aplicado, <b>remove impedimentos</b> e protege o time de interferências. <b>Não</b> é chefe nem gerente de projeto.</td></tr>
          <tr><td><b>Time de desenvolvimento</b></td><td><b>Auto-organizável</b> e <b>multifuncional</b>: decide <b>como</b> transformar itens do backlog em incremento e faz as <b>estimativas</b>. Costuma ter de 3 a 9 pessoas.</td></tr>
        </table>`,
      examTip: 'Quem <b>prioriza</b> é o PO. Quem <b>estima</b> e decide <b>quanto cabe</b> na Sprint é o time. Quem <b>remove impedimentos</b> é o Scrum Master.',
      labCue: { label: 'Treinar "quem faz o quê"', cue: 'roles' },
    },
    {
      id: 'agile-scrum-events',
      icon: '🗓️',
      title: 'Scrum: os eventos',
      body: `
        <p>Todos os eventos têm duração máxima fixa (<b>time-box</b>).</p>
        <table class="table">
          <tr><th>Evento</th><th>Para quê</th><th>Duração máxima</th></tr>
          <tr><td><b>Sprint</b></td><td>O contêiner dos demais eventos: um ciclo que entrega um incremento potencialmente utilizável</td><td>até 1 mês (o comum é de 2 a 4 semanas)</td></tr>
          <tr><td><b>Sprint Planning</b></td><td>Definir <b>o que</b> será entregue (meta da Sprint) e <b>como</b> o trabalho será feito</td><td>8 h para Sprint de 1 mês</td></tr>
          <tr><td><b>Daily Scrum</b></td><td>Sincronizar o time e planejar as próximas 24 h</td><td><b>15 minutos</b></td></tr>
          <tr><td><b>Sprint Review</b></td><td>Inspecionar o <b>produto</b> (incremento) com as partes interessadas e adaptar o backlog</td><td>4 h</td></tr>
          <tr><td><b>Sprint Retrospective</b></td><td>Inspecionar o <b>processo</b>: o que funcionou, o que melhorar</td><td>3 h</td></tr>
        </table>
        <p>As três perguntas clássicas da Daily: <b>o que fiz ontem? o que farei hoje? há algum impedimento?</b></p>`,
      examTip: '<b>Review</b> olha o <b>produto</b> e tem stakeholders; <b>Retrospective</b> olha o <b>processo</b> e é só do time Scrum. A banca adora trocar as duas.',
      labCue: { label: 'Simular uma Sprint', cue: 'sprint' },
    },
    {
      id: 'agile-scrum-artifacts',
      icon: '📦',
      title: 'Scrum: os artefatos',
      body: `
        <ul>
          <li><b>Product Backlog</b>: lista <b>ordenada</b> de tudo o que pode ser necessário no produto. É dinâmico, nunca está completo e pertence ao PO.</li>
          <li><b>Sprint Backlog</b>: os itens selecionados para a Sprint + o plano para entregá-los. Pertence ao <b>time de desenvolvimento</b>.</li>
          <li><b>Incremento</b>: a soma dos itens concluídos na Sprint com os incrementos anteriores. Deve estar <b>"pronto"</b> segundo a <b>Definição de Pronto</b> (<i>Definition of Done</i>).</li>
        </ul>
        <p>Ferramentas de acompanhamento:</p>
        <ul>
          <li><b>Velocidade</b> (<i>velocity</i>): quantos pontos o time conclui por Sprint; base para planejar a próxima.</li>
          <li><b>Gráfico burndown</b>: trabalho <b>restante</b> ao longo do tempo. Linha acima da ideal = atraso.</li>
          <li><b>Quadro de tarefas</b>: colunas "a fazer", "em andamento" e "concluído".</li>
        </ul>`,
      mnemonic: 'Scrum em números: <b>3</b> papéis, <b>5</b> eventos, <b>3</b> artefatos, <b>3</b> pilares.',
      labCue: { label: 'Papel, evento ou artefato?', cue: 'elements' },
    },
    {
      id: 'agile-xp',
      icon: '🧗',
      title: 'Extreme Programming (XP)',
      body: `
        <p>Criado por <b>Kent Beck</b>, o XP leva boas práticas de engenharia ao "extremo". Enquanto o Scrum foca a <b>gestão</b>, o XP foca a <b>excelência técnica</b>.</p>
        <p><b>Valores:</b> comunicação, simplicidade, feedback, coragem (e respeito).</p>
        <table class="table">
          <tr><th>Prática</th><th>Ideia</th></tr>
          <tr><td><b>Jogo do planejamento</b></td><td>cliente prioriza histórias; desenvolvedores estimam</td></tr>
          <tr><td><b>Releases pequenos</b></td><td>versões frequentes e simples em produção</td></tr>
          <tr><td><b>Cliente presente</b></td><td>um representante do cliente trabalha junto com a equipe</td></tr>
          <tr><td><b>Programação em pares</b></td><td>dois programadores, um computador: revisão contínua</td></tr>
          <tr><td><b>Desenvolvimento orientado a testes (TDD)</b></td><td>escrever o teste <b>antes</b> do código</td></tr>
          <tr><td><b>Refatoração</b></td><td>melhorar a estrutura do código sem mudar o comportamento</td></tr>
          <tr><td><b>Integração contínua</b></td><td>integrar e testar várias vezes ao dia</td></tr>
          <tr><td><b>Projeto simples</b></td><td>só o necessário para os requisitos atuais</td></tr>
          <tr><td><b>Propriedade coletiva</b></td><td>qualquer par pode alterar qualquer parte do código</td></tr>
          <tr><td><b>Padrões de codificação</b></td><td>todo o código parece escrito por uma só pessoa</td></tr>
          <tr><td><b>Metáfora</b></td><td>uma história comum que descreve como o sistema funciona</td></tr>
          <tr><td><b>Ritmo sustentável</b></td><td>semana de 40 horas, sem horas extras constantes</td></tr>
        </table>`,
      examTip: '<b>TDD, programação em pares e refatoração</b> são práticas do <b>XP</b>, não papéis ou eventos do Scrum. Ciclo do TDD: <b>vermelho → verde → refatorar</b>.',
      labCue: { label: 'Scrum, XP ou Kanban?', cue: 'methods' },
    },
    {
      id: 'agile-kanban',
      icon: '🪧',
      title: 'Kanban, Lean e outros métodos ágeis',
      body: `
        <p><b>Kanban</b> (do japonês "cartão") veio do Sistema Toyota de Produção. Não prescreve papéis nem iterações: é um método de <b>gestão de fluxo</b>.</p>
        <ul>
          <li><b>Visualizar</b> o fluxo de trabalho em um quadro.</li>
          <li><b>Limitar o trabalho em andamento (WIP)</b> em cada coluna.</li>
          <li>Sistema <b>puxado</b>: só se começa algo novo quando há capacidade.</li>
          <li>Medir e gerenciar o fluxo (<i>lead time</i>, <i>cycle time</i>) e melhorar continuamente.</li>
        </ul>
        <p><b>Lean Software Development</b> (Poppendieck): eliminar desperdício, amplificar o aprendizado, decidir o mais tarde possível, entregar o mais rápido possível, dar poder à equipe, construir integridade e ver o todo.</p>
        <p>Outros métodos ágeis citados por Pressman e Sommerville: <b>FDD</b> (desenvolvimento dirigido a funcionalidades), <b>DSDM</b>, <b>Crystal</b> e <b>ASD</b> (desenvolvimento adaptativo).</p>`,
      examTip: 'O que diferencia o Kanban do Scrum: <b>fluxo contínuo</b> e <b>limite de WIP</b> no lugar de Sprints com time-box.',
    },
    {
      id: 'agile-stories',
      icon: '🗒️',
      title: 'Histórias de usuário',
      body: `
        <p>Nos métodos ágeis, os requisitos costumam ser escritos como <b>histórias de usuário</b>:</p>
        <span class="formula">Como &lt;papel&gt;, quero &lt;funcionalidade&gt; para &lt;benefício&gt;.</span>
        <p><b>Os 3 Cs</b> (Ron Jeffries): <b>Cartão</b> (a história escrita), <b>Conversa</b> (os detalhes combinados com o cliente) e <b>Confirmação</b> (os <b>critérios de aceitação</b>).</p>
        <p><b>INVEST</b>, as qualidades de uma boa história:</p>
        <ul>
          <li><b>I</b>ndependente</li>
          <li><b>N</b>egociável</li>
          <li><b>V</b>aliosa</li>
          <li><b>E</b>stimável</li>
          <li><b>S</b>mall (pequena)</li>
          <li><b>T</b>estável</li>
        </ul>
        <p>Uma história grande demais para caber em uma iteração é um <b>épico</b> e deve ser <b>dividida</b>.</p>`,
      mnemonic: '3 Cs: <b>C</b>artão, <b>C</b>onversa, <b>C</b>onfirmação.',
    },
    {
      id: 'agile-versus',
      icon: '⚖️',
      title: 'Ágil × dirigido a planos',
      body: `
        <table class="table">
          <tr><th></th><th>Dirigido a planos</th><th>Ágil</th></tr>
          <tr><td><b>Requisitos</b></td><td>definidos e congelados no início</td><td>evoluem; mudança é bem-vinda</td></tr>
          <tr><td><b>Entrega</b></td><td>única, no fim</td><td>frequente, em incrementos</td></tr>
          <tr><td><b>Cliente</b></td><td>participa no início e no fim</td><td>envolvido continuamente</td></tr>
          <tr><td><b>Documentação</b></td><td>abrangente, guia o processo</td><td>apenas a necessária</td></tr>
          <tr><td><b>Equipe</b></td><td>papéis especializados, gerente decide</td><td>auto-organizável e multifuncional</td></tr>
          <tr><td><b>Progresso</b></td><td>documentos e marcos</td><td>software funcionando</td></tr>
        </table>
        <p><b>Limitações</b> apontadas por Sommerville: é difícil manter o <b>cliente envolvido</b>; nem todo membro tem perfil para o envolvimento intenso; <b>priorizar mudanças</b> com vários stakeholders é complicado; manter a simplicidade exige trabalho extra; <b>contratos</b> de preço fixo combinam mal com requisitos abertos. Sistemas <b>críticos</b>, equipes <b>grandes ou distribuídas</b> e projetos fortemente regulados costumam pedir mais plano e documentação.</p>`,
    },
  ],
  questions: [
    {
      id: 'agile-q1',
      difficulty: 'easy',
      prompt: 'Qual das alternativas apresenta corretamente um dos valores do Manifesto Ágil?',
      answer: 'Software em funcionamento mais que documentação abrangente.',
      distractors: [
        'Processos e ferramentas mais que indivíduos e interações.',
        'Seguir um plano mais que responder a mudanças.',
        'Negociação de contratos mais que colaboração com o cliente.',
      ],
      explanation: 'Os itens valorizados (à esquerda) são: indivíduos e interações, software em funcionamento, colaboração com o cliente e responder a mudanças.',
    },
    {
      id: 'agile-q2',
      difficulty: 'easy',
      prompt: 'No Scrum, quem é o responsável por ordenar (priorizar) os itens do Product Backlog?',
      answer: 'O Product Owner',
      distractors: ['O Scrum Master', 'O time de desenvolvimento', 'O gerente de projetos'],
      explanation: 'O Product Owner é o único responsável pelo Product Backlog: conteúdo, disponibilidade e ordenação conforme o valor de negócio.',
    },
    {
      id: 'agile-q3',
      difficulty: 'easy',
      prompt: 'Qual é a duração máxima da Daily Scrum?',
      answer: '15 minutos',
      distractors: ['5 minutos', '30 minutos', '1 hora'],
      explanation: 'A reunião diária tem time-box de 15 minutos e serve para o time sincronizar o trabalho e planejar as próximas 24 horas.',
    },
    {
      id: 'agile-q4',
      difficulty: 'easy',
      prompt: 'Qual das práticas abaixo pertence ao Extreme Programming (XP)?',
      answer: 'Programação em pares',
      distractors: ['Sprint Review', 'Limite de trabalho em andamento (WIP)', 'Análise de riscos a cada ciclo da espiral'],
      explanation: 'Programação em pares, TDD, refatoração e integração contínua são práticas do XP. Sprint Review é do Scrum; limite de WIP, do Kanban; análise de riscos por ciclo, do espiral.',
    },
    {
      id: 'agile-q5',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre Sprint Review e Sprint Retrospective?',
      answer: 'A Review inspeciona o incremento do produto com as partes interessadas; a Retrospective inspeciona o processo de trabalho do time para melhorá-lo.',
      distractors: [
        'A Review planeja a próxima Sprint; a Retrospective define a meta da Sprint.',
        'A Review ocorre todos os dias; a Retrospective ocorre uma vez por mês.',
        'A Review é conduzida apenas pelo Scrum Master; a Retrospective, apenas pelo cliente.',
      ],
      explanation: 'Review = produto (o que foi construído). Retrospective = processo (como trabalhamos). Ambas ocorrem ao fim da Sprint, nessa ordem.',
    },
    {
      id: 'agile-q6',
      difficulty: 'medium',
      prompt: 'Sobre o papel do Scrum Master, é correto afirmar que ele:',
      answer: 'Atua como líder servidor, ajudando o time a aplicar o Scrum e removendo impedimentos.',
      distractors: [
        'Distribui as tarefas diárias entre os desenvolvedores e cobra os prazos.',
        'Define a prioridade dos itens do Product Backlog.',
        'É o único autorizado a escrever código de produção.',
      ],
      explanation: 'O Scrum Master não é chefe. O time é auto-organizável e decide como fazer o trabalho; a prioridade dos itens é do Product Owner.',
    },
    {
      id: 'agile-q7',
      difficulty: 'medium',
      prompt: 'Uma equipe usa um quadro com colunas "A fazer", "Em andamento" e "Concluído" e definiu que no máximo três itens podem estar "Em andamento" ao mesmo tempo. Essa regra é característica de qual método?',
      answer: 'Kanban, por limitar o trabalho em andamento (WIP).',
      distractors: [
        'XP, pela prática de propriedade coletiva do código.',
        'Cascata, pela separação rígida de fases.',
        'RUP, pela fase de elaboração.',
      ],
      explanation: 'Limitar o WIP é a prática central do Kanban: revela gargalos e cria um sistema puxado, sem iterações com time-box.',
    },
    {
      id: 'agile-q8',
      difficulty: 'medium',
      prompt: 'No desenvolvimento orientado a testes (TDD), a sequência correta de trabalho é:',
      answer: 'Escrever um teste que falha, escrever o código mínimo para passar e, depois, refatorar.',
      distractors: [
        'Escrever todo o código, entregar ao cliente e só então escrever os testes.',
        'Refatorar o código, escrever o teste e depois implementar a funcionalidade.',
        'Projetar todos os diagramas UML e gerar o código e os testes automaticamente.',
      ],
      explanation: 'O ciclo é vermelho → verde → refatorar: o teste vem antes do código e funciona como especificação executável.',
    },
    {
      id: 'agile-q9',
      difficulty: 'medium',
      prompt: 'O que o gráfico de burndown mostra?',
      answer: 'A quantidade de trabalho restante ao longo do tempo da Sprint (ou da release).',
      distractors: [
        'O número de defeitos encontrados por linha de código.',
        'A hierarquia de papéis dentro do time Scrum.',
        'O custo acumulado do projeto em relação ao orçamento.',
      ],
      explanation: 'O burndown desce conforme o trabalho é concluído. Linha real acima da ideal indica atraso em relação ao ritmo necessário.',
    },
    {
      id: 'agile-q10',
      difficulty: 'medium',
      prompt: 'Qual artefato do Scrum contém os itens selecionados para a Sprint e o plano para entregá-los?',
      answer: 'Sprint Backlog',
      distractors: ['Product Backlog', 'Incremento', 'Definição de Pronto'],
      explanation: 'O Sprint Backlog pertence ao time de desenvolvimento. O Product Backlog é a lista completa e ordenada do produto, de responsabilidade do PO.',
    },
    {
      id: 'agile-q11',
      difficulty: 'hard',
      prompt: 'Durante uma Sprint, um diretor pede ao time que inclua uma funcionalidade urgente que não estava planejada. Segundo o Scrum, o encaminhamento correto é:',
      answer: 'O pedido deve ser levado ao Product Owner, que avalia a prioridade e o inclui no Product Backlog; a meta da Sprint em andamento é preservada.',
      distractors: [
        'O time deve aceitar o pedido imediatamente, pois responder a mudanças é um valor ágil.',
        'O Scrum Master decide sozinho se a funcionalidade entra na Sprint.',
        'O diretor deve alterar o Sprint Backlog diretamente e avisar o time na Daily.',
      ],
      explanation: 'Mudanças são bem-vindas, mas entram pelo Product Backlog. Durante a Sprint, não se fazem mudanças que coloquem a meta em risco; só o PO pode cancelar uma Sprint.',
    },
    {
      id: 'agile-q12',
      difficulty: 'hard',
      prompt: 'Assinale a alternativa que interpreta corretamente o Manifesto Ágil.',
      answer: 'Documentação, planos, contratos e processos têm valor, mas os itens da esquerda de cada frase são mais valorizados.',
      distractors: [
        'Documentação e planejamento devem ser eliminados dos projetos ágeis.',
        'Contratos são proibidos em projetos ágeis, pois impedem a colaboração.',
        'Processos e ferramentas são mais importantes do que as pessoas em equipes maduras.',
      ],
      explanation: 'O manifesto fecha com: "mesmo havendo valor nos itens à direita, valorizamos mais os itens à esquerda". Ágil não é ausência de documentação ou de plano.',
    },
    {
      id: 'agile-q13',
      difficulty: 'hard',
      prompt: 'Em qual dos cenários a adoção pura de métodos ágeis tende a ser MENOS adequada, segundo Sommerville?',
      answer: 'Sistema crítico de segurança, fortemente regulado, desenvolvido por várias equipes grandes e geograficamente distribuídas.',
      distractors: [
        'Produto web de pequeno porte, com cliente disponível e requisitos que mudam com frequência.',
        'Aplicativo desenvolvido por uma equipe pequena, reunida no mesmo local.',
        'Sistema interno cujo cliente participa do desenvolvimento e aceita entregas incrementais.',
      ],
      explanation: 'Sistemas críticos exigem análise e documentação detalhadas antes da implementação, e equipes grandes e distribuídas dificultam a comunicação informal em que os métodos ágeis se apoiam.',
    },
    {
      id: 'agile-q14',
      difficulty: 'easy',
      prompt: 'Na sigla INVEST, usada para avaliar histórias de usuário, a letra T significa:',
      answer: 'Testável',
      distractors: ['Técnica', 'Temporária', 'Terceirizável'],
      explanation: 'INVEST: Independente, Negociável, Valiosa, Estimável, Small (pequena) e Testável.',
    },
    {
      id: 'agile-q15',
      difficulty: 'medium',
      prompt: 'Os três pilares que sustentam o controle empírico de processo no Scrum são:',
      answer: 'Transparência, inspeção e adaptação.',
      distractors: [
        'Comunicação, simplicidade e coragem.',
        'Planejamento, execução e controle.',
        'Concepção, elaboração e construção.',
      ],
      explanation: 'Transparência, inspeção e adaptação são os pilares do Scrum. Comunicação, simplicidade, feedback e coragem são valores do XP.',
    },
  ],
  openQuestions: [
    {
      id: 'agile-o1',
      prompt: 'Enuncie os quatro valores do Manifesto Ágil e explique o que significa a expressão "mais que" usada no texto.',
      modelAnswer: `
        <p>Os valores são: <b>indivíduos e interações</b> mais que processos e ferramentas; <b>software em funcionamento</b> mais que documentação abrangente; <b>colaboração com o cliente</b> mais que negociação de contratos; <b>responder a mudanças</b> mais que seguir um plano.</p>
        <p>"Mais que" indica <b>prioridade, não exclusão</b>: os itens da direita (processos, documentação, contratos e planos) continuam tendo valor, mas, quando há conflito, os itens da esquerda prevalecem.</p>`,
      keyPoints: ['Os quatro pares corretos', 'Itens da direita também têm valor', 'Ágil não é ausência de documentação ou de plano'],
    },
    {
      id: 'agile-o2',
      prompt: 'Descreva os três papéis do Scrum e a principal responsabilidade de cada um.',
      modelAnswer: `
        <p><b>Product Owner:</b> representa o cliente e as partes interessadas; maximiza o valor do produto e é o único responsável por gerenciar e ordenar o Product Backlog.</p>
        <p><b>Scrum Master:</b> líder servidor que garante o entendimento e a aplicação do Scrum, facilita os eventos e remove os impedimentos do time.</p>
        <p><b>Time de desenvolvimento:</b> grupo multifuncional e auto-organizável que estima, decide como fazer o trabalho e entrega um incremento "pronto" a cada Sprint.</p>`,
      keyPoints: ['PO: valor e Product Backlog', 'SM: líder servidor, remove impedimentos', 'Time: auto-organizável e multifuncional, entrega o incremento'],
    },
    {
      id: 'agile-o3',
      prompt: 'Explique o ciclo de uma Sprint, citando os eventos na ordem em que ocorrem.',
      modelAnswer: `
        <p>A Sprint começa com a <b>Sprint Planning</b>, em que o time, com o PO, define a meta da Sprint, seleciona os itens do Product Backlog e planeja como entregá-los (Sprint Backlog).</p>
        <p>Todos os dias ocorre a <b>Daily Scrum</b>, de 15 minutos, para sincronizar o trabalho e identificar impedimentos.</p>
        <p>Ao final, a <b>Sprint Review</b> apresenta o incremento às partes interessadas e colhe feedback, e a <b>Sprint Retrospective</b> inspeciona o processo e define melhorias para a próxima Sprint. Em seguida começa uma nova Sprint.</p>`,
      keyPoints: ['Planning → Daily → Review → Retrospective', 'Sprint com time-box de até um mês', 'Review = produto; Retrospective = processo', 'Entrega de incremento "pronto"'],
    },
    {
      id: 'agile-o4',
      prompt: 'Cite e explique quatro práticas do Extreme Programming.',
      modelAnswer: `
        <p><b>Programação em pares:</b> dois desenvolvedores trabalham no mesmo computador; o código é revisado enquanto é escrito.</p>
        <p><b>Desenvolvimento orientado a testes:</b> o teste automatizado é escrito antes do código que o satisfaz.</p>
        <p><b>Refatoração:</b> melhoria contínua da estrutura interna do código sem alterar o comportamento externo.</p>
        <p><b>Integração contínua:</b> o código é integrado e testado várias vezes ao dia.</p>
        <p>(Também valem: releases pequenos, cliente presente, projeto simples, propriedade coletiva, padrões de codificação, ritmo sustentável, jogo do planejamento e metáfora.)</p>`,
      keyPoints: ['Quatro práticas reais do XP', 'Explicação correta de cada uma', 'Não confundir com eventos do Scrum'],
    },
  ],
  flashcards: [
    { id: 'agile-f1', front: 'Os 4 valores do Manifesto Ágil (lado esquerdo)?', back: 'Indivíduos e interações · software em funcionamento · colaboração com o cliente · responder a mudanças.' },
    { id: 'agile-f2', front: 'Em que ano foi publicado o Manifesto Ágil?', back: 'Em 2001.' },
    { id: 'agile-f3', front: 'Os 3 pilares do Scrum?', back: 'Transparência, inspeção e adaptação.' },
    { id: 'agile-f4', front: 'Os 3 papéis do Scrum?', back: 'Product Owner, Scrum Master e time de desenvolvimento.' },
    { id: 'agile-f5', front: 'Os 3 artefatos do Scrum?', back: 'Product Backlog, Sprint Backlog e Incremento.' },
    { id: 'agile-f6', front: 'Os 5 eventos do Scrum?', back: 'Sprint, Sprint Planning, Daily Scrum, Sprint Review e Sprint Retrospective.' },
    { id: 'agile-f7', front: 'Review × Retrospective?', back: 'Review inspeciona o produto (com stakeholders). Retrospective inspeciona o processo (só o time Scrum).' },
    { id: 'agile-f8', front: 'Os valores do XP?', back: 'Comunicação, simplicidade, feedback, coragem (e respeito).' },
    { id: 'agile-f9', front: 'Ciclo do TDD?', back: 'Vermelho (teste falha) → verde (código mínimo passa) → refatorar.' },
    { id: 'agile-f10', front: 'O que é limitar o WIP?', back: 'Restringir a quantidade de itens em andamento ao mesmo tempo. É a prática central do Kanban.' },
    { id: 'agile-f11', front: 'O que significa INVEST?', back: 'Independente, Negociável, Valiosa, Estimável, Small (pequena), Testável.' },
    { id: 'agile-f12', front: 'Os 3 Cs da história de usuário?', back: 'Cartão, Conversa e Confirmação.' },
    { id: 'agile-f13', front: 'O que é velocidade (velocity)?', back: 'A quantidade de pontos que o time conclui por Sprint; base para planejar as seguintes.' },
    { id: 'agile-f14', front: 'Qual é a principal medida de progresso em um projeto ágil?', back: 'Software funcionando.' },
  ],
  cheatSheet: [
    { term: 'Manifesto Ágil (2001)', definition: 'Indivíduos e interações; software funcionando; colaboração com o cliente; responder a mudanças.' },
    { term: 'Scrum · papéis', definition: 'Product Owner (valor e backlog), Scrum Master (líder servidor), time de desenvolvimento (auto-organizável).' },
    { term: 'Scrum · eventos', definition: 'Sprint (até 1 mês), Planning, Daily (15 min), Review (produto), Retrospective (processo).' },
    { term: 'Scrum · artefatos', definition: 'Product Backlog, Sprint Backlog, Incremento (+ Definição de Pronto).' },
    { term: 'Scrum · pilares', definition: 'Transparência, inspeção, adaptação.' },
    { term: 'XP', definition: 'Programação em pares, TDD, refatoração, integração contínua, releases pequenos, cliente presente, projeto simples.' },
    { term: 'Kanban', definition: 'Visualizar o fluxo, limitar o WIP, sistema puxado, fluxo contínuo.' },
    { term: 'História de usuário', definition: '"Como &lt;papel&gt;, quero &lt;função&gt; para &lt;benefício&gt;" + critérios de aceitação. INVEST e 3 Cs.' },
    { term: 'Burndown', definition: 'Trabalho restante × tempo.' },
    { term: 'Velocidade', definition: 'Pontos concluídos por Sprint.' },
  ],
};
