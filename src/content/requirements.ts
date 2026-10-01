import type { Topic } from './Topic';

export const requirements: Topic = {
  id: 'requirements',
  number: 4,
  unit: 2,
  title: 'Requisitos e técnicas de levantamento',
  subtitle: 'RF × RNF · elicitação · casos de uso · validação',
  icon: '📋',
  color: '--c-req',
  summary: 'O que o sistema deve fazer e sob quais restrições: tipos de requisitos, como levantá-los, especificá-los e validá-los.',
  tags: ['funcional × não funcional', 'entrevista', 'etnografia', 'include × extend'],
  lessons: [
    {
      id: 'req-concept',
      icon: '🎯',
      title: 'O que são requisitos e por que importam',
      body: `
        <p><b>Requisitos</b> são as descrições dos <b>serviços</b> que o sistema deve oferecer e das <b>restrições</b> sob as quais deve operar. A <b>engenharia de requisitos</b> é o processo de descobrir, analisar, documentar e verificar esses serviços e restrições.</p>
        <table class="table">
          <tr><th>Nível</th><th>Para quem</th><th>Como é escrito</th></tr>
          <tr><td><b>Requisitos de usuário</b></td><td>clientes, gerentes, usuários finais</td><td>linguagem natural e diagramas simples; dizem <b>o que</b> o sistema oferece, em alto nível</td></tr>
          <tr><td><b>Requisitos de sistema</b></td><td>desenvolvedores, arquitetos, testadores</td><td>descrição <b>detalhada e precisa</b> das funções e restrições; pode integrar o contrato</td></tr>
        </table>
        <p><b>Por que importam:</b> erros de requisitos são os <b>mais caros</b> de corrigir. Um defeito de requisito encontrado depois da entrega pode custar dezenas de vezes mais do que se fosse encontrado na especificação, porque obriga a refazer projeto, código e testes.</p>`,
      examTip: 'Requisito diz <b>o quê</b>, não <b>como</b>. "Usar uma tabela hash para a busca" é decisão de projeto, não requisito do usuário.',
    },
    {
      id: 'req-kinds',
      icon: '🧮',
      title: 'Funcionais, não funcionais e de domínio',
      body: `
        <table class="table">
          <tr><th>Tipo</th><th>Definição</th><th>Exemplo</th></tr>
          <tr><td><b>Funcional (RF)</b></td><td>Declara um <b>serviço</b> que o sistema deve fornecer, como reage a entradas e como se comporta em situações específicas</td><td>"O sistema deve permitir que o aluno emita o histórico escolar em PDF."</td></tr>
          <tr><td><b>Não funcional (RNF)</b></td><td><b>Restrição</b> sobre os serviços ou sobre o sistema como um todo: desempenho, confiabilidade, segurança, padrões, prazos</td><td>"A consulta deve responder em até 2 segundos para 5.000 usuários simultâneos."</td></tr>
          <tr><td><b>De domínio</b></td><td>Vem do <b>domínio da aplicação</b>, não da necessidade de um usuário; pode ser funcional ou não funcional</td><td>"O cálculo da média final segue o regulamento didático da universidade."</td></tr>
        </table>
        <p>Teste rápido: o RF responde "<b>o que o sistema faz?</b>"; o RNF responde "<b>com que qualidade ou sob que restrição?</b>".</p>
        <p>Um RNF não atendido pode <b>inutilizar o sistema inteiro</b> (um sistema de frenagem que não responde a tempo é inútil), enquanto a falha de um RF isolado apenas degrada o sistema.</p>`,
      examTip: 'RNF <b>não é menos importante</b> que RF, muitas vezes é mais crítico. E precisa ser <b>mensurável</b>: "o sistema deve ser rápido" não é verificável; "responder em até 2 s" é.',
      labCue: { label: 'Jogar RF × RNF × domínio', cue: 'kinds' },
    },
    {
      id: 'req-nfr',
      icon: '🛡️',
      title: 'Classificação dos requisitos não funcionais',
      body: `
        <p>Sommerville divide os RNF em três grupos, conforme a <b>origem</b>:</p>
        <table class="table">
          <tr><th>Grupo</th><th>De onde vem</th><th>Subtipos e exemplos</th></tr>
          <tr><td><b>De produto</b></td><td>do <b>comportamento</b> esperado do software</td><td>usabilidade, eficiência (desempenho e espaço), confiabilidade, portabilidade</td></tr>
          <tr><td><b>Organizacionais</b></td><td>das <b>políticas e procedimentos</b> do cliente e do desenvolvedor</td><td>de entrega (prazo), de implementação (linguagem, método), de padrões (processo a seguir)</td></tr>
          <tr><td><b>Externos</b></td><td>de <b>fatores externos</b> ao sistema e ao processo</td><td>interoperabilidade, éticos, legais (privacidade, segurança)</td></tr>
        </table>
        <p>Métricas para tornar um RNF verificável:</p>
        <ul>
          <li><b>Velocidade:</b> transações por segundo, tempo de resposta.</li>
          <li><b>Tamanho:</b> megabytes de memória ou de disco.</li>
          <li><b>Facilidade de uso:</b> tempo de treinamento, número de telas de ajuda.</li>
          <li><b>Confiabilidade:</b> tempo médio entre falhas, disponibilidade.</li>
          <li><b>Robustez:</b> tempo para reiniciar após uma falha.</li>
          <li><b>Portabilidade:</b> número de sistemas-alvo.</li>
        </ul>`,
      mnemonic: '<b>P-O-E</b>: de <b>P</b>roduto, <b>O</b>rganizacionais, <b>E</b>xternos.',
      labCue: { label: 'Classificar RNFs', cue: 'nfr' },
    },
    {
      id: 'req-process',
      icon: '🔁',
      title: 'O processo de engenharia de requisitos',
      body: `
        <p>Para Sommerville, o processo tem quatro atividades e um resultado, o <b>documento de requisitos</b>:</p>
        <ol>
          <li><b>Estudo de viabilidade</b>: vale a pena construir o sistema?</li>
          <li><b>Elicitação e análise</b>: descobrir os requisitos com os stakeholders.</li>
          <li><b>Especificação</b>: transformar o que foi levantado em um documento padronizado.</li>
          <li><b>Validação</b>: verificar se os requisitos definem o sistema que o cliente quer.</li>
        </ol>
        <p>Em paralelo corre o <b>gerenciamento de requisitos</b>, que controla as mudanças.</p>
        <p>A <b>elicitação e análise</b> é uma espiral de quatro passos: <b>descoberta</b> → <b>classificação e organização</b> → <b>priorização e negociação</b> → <b>documentação</b>.</p>
        <p>Pressman descreve o mesmo trabalho em sete tarefas: <b>concepção, levantamento, elaboração, negociação, especificação, validação e gestão</b>.</p>
        <p><b>Stakeholder</b> (parte interessada) é qualquer pessoa ou grupo afetado pelo sistema: usuários finais, gerentes, clientes, equipe de manutenção, órgãos reguladores.</p>`,
      labCue: { label: 'Ver o processo passo a passo', cue: 'process:sommerville' },
    },
    {
      id: 'req-techniques',
      icon: '🎤',
      title: 'Técnicas de levantamento de requisitos',
      body: `
        <table class="table">
          <tr><th>Técnica</th><th>Como funciona</th><th>Quando brilha</th></tr>
          <tr><td><b>Entrevista</b></td><td><b>Fechada</b> (perguntas predefinidas) ou <b>aberta</b> (exploratória)</td><td>entender em profundidade o trabalho e as necessidades de poucas pessoas-chave</td></tr>
          <tr><td><b>Questionário</b></td><td>perguntas padronizadas, respondidas por escrito</td><td>muitos usuários, dispersos geograficamente; dados quantificáveis</td></tr>
          <tr><td><b>Observação / etnografia</b></td><td>o analista se insere no ambiente e observa o trabalho real</td><td>requisitos <b>implícitos</b>, que as pessoas não sabem ou não lembram de dizer</td></tr>
          <tr><td><b>Workshop / JAD</b></td><td>reunião estruturada com usuários e desenvolvedores, com facilitador</td><td>resolver <b>conflitos</b> e obter consenso rapidamente</td></tr>
          <tr><td><b>Brainstorming</b></td><td>geração livre de ideias, sem crítica</td><td>sistemas novos, quando ainda não se sabe o que é possível</td></tr>
          <tr><td><b>Prototipação</b></td><td>versão simplificada para o usuário experimentar</td><td>requisitos vagos, principalmente de <b>interface</b></td></tr>
          <tr><td><b>Cenários e casos de uso</b></td><td>descrições de interações concretas com o sistema</td><td>requisitos <b>funcionais</b> vistos pelo usuário</td></tr>
          <tr><td><b>Análise de documentos</b></td><td>estudo de formulários, relatórios, manuais e sistemas existentes</td><td>entender o processo atual e as regras do negócio</td></tr>
        </table>
        <p><b>Dificuldades</b> do levantamento (Sommerville): stakeholders <b>não sabem o que querem</b>; expressam-se em <b>termos próprios</b> do domínio; têm requisitos <b>conflitantes</b>; fatores <b>políticos</b> interferem; e o ambiente de negócio <b>muda</b> durante a análise. Pressman resume em problemas de <b>escopo</b>, de <b>entendimento</b> e de <b>volatilidade</b>.</p>`,
      examTip: 'A <b>etnografia</b> é boa para descobrir como as pessoas <b>realmente</b> trabalham, mas <b>não</b> é adequada para requisitos organizacionais ou de domínio nem para propor inovações.',
      labCue: { label: 'Escolher a técnica certa', cue: 'techniques' },
    },
    {
      id: 'req-usecases',
      icon: '🎭',
      title: 'Casos de uso',
      body: `
        <p>Um <b>caso de uso</b> descreve uma interação completa entre um <b>ator</b> e o sistema que produz um resultado de valor. É a principal técnica de requisitos funcionais do Processo Unificado (Wazlawick, Larman, Bezerra).</p>
        <ul>
          <li><b>Ator:</b> papel desempenhado por algo <b>externo</b> ao sistema (pessoa, outro sistema, dispositivo).</li>
          <li><b>Fluxo principal:</b> o caminho de sucesso. <b>Fluxos alternativos e de exceção:</b> variações e erros.</li>
          <li><b>Pré-condições</b> e <b>pós-condições</b>: o que vale antes e depois da execução.</li>
        </ul>
        <table class="table">
          <tr><th>Relação</th><th>Significado</th><th>Direção da seta</th></tr>
          <tr><td><b>«include»</b></td><td>o caso base <b>sempre</b> executa o caso incluído (comportamento <b>obrigatório</b> e reutilizado)</td><td>do caso <b>base</b> para o <b>incluído</b></td></tr>
          <tr><td><b>«extend»</b></td><td>o caso estendido acontece <b>só sob uma condição</b> (comportamento <b>opcional</b>)</td><td>do caso que <b>estende</b> para o caso <b>base</b></td></tr>
          <tr><td><b>Generalização</b></td><td>um ator ou caso especializado herda do mais geral</td><td>do <b>específico</b> para o <b>geral</b> (triângulo vazado)</td></tr>
        </table>`,
      examTip: 'A seta do «extend» aponta <b>para o caso base</b>; a do «include» <b>sai</b> do caso base. E diagrama de casos de uso <b>não mostra ordem</b> de execução.',
      mnemonic: '<b>Include = Imprescindível</b> (sempre). <b>Extend = Eventual</b> (às vezes).',
      labCue: { label: 'Montar o diagrama', cue: 'process:usecase' },
    },
    {
      id: 'req-document',
      icon: '📄',
      title: 'Especificação: o documento de requisitos',
      body: `
        <p>O <b>documento de requisitos</b> (ou Especificação de Requisitos de Software, ERS) é a declaração oficial do que os desenvolvedores devem implementar. O padrão clássico é o <b>IEEE 830</b>.</p>
        <p>Um bom requisito, e um bom documento, deve ser:</p>
        <table class="table">
          <tr><td><b>Correto</b></td><td>expressa uma necessidade real</td></tr>
          <tr><td><b>Não ambíguo</b></td><td>admite uma única interpretação</td></tr>
          <tr><td><b>Completo</b></td><td>cobre todas as funções e restrições necessárias</td></tr>
          <tr><td><b>Consistente</b></td><td>não entra em conflito com outros requisitos</td></tr>
          <tr><td><b>Verificável</b></td><td>é possível testar se foi atendido</td></tr>
          <tr><td><b>Modificável</b></td><td>fácil de alterar sem quebrar a estrutura</td></tr>
          <tr><td><b>Rastreável</b></td><td>sabe-se de onde veio e onde foi implementado</td></tr>
          <tr><td><b>Priorizado</b></td><td>classificado por importância e estabilidade</td></tr>
        </table>
        <p>Formas de especificar: <b>linguagem natural</b>, linguagem natural <b>estruturada</b> (formulários), notações <b>gráficas</b> (UML) e especificações <b>matemáticas</b> (métodos formais). Problemas da linguagem natural: <b>ambiguidade</b>, mistura de requisitos e fusão de vários requisitos em um.</p>`,
    },
    {
      id: 'req-validation',
      icon: '🔍',
      title: 'Validação e gerenciamento de requisitos',
      body: `
        <p>A <b>validação</b> procura problemas nos requisitos <b>antes</b> que virem projeto e código. Verificações (Sommerville):</p>
        <ul>
          <li><b>Validade:</b> o requisito atende a uma necessidade real?</li>
          <li><b>Consistência:</b> há conflitos entre requisitos?</li>
          <li><b>Completeza:</b> todas as funções e restrições foram incluídas?</li>
          <li><b>Realismo:</b> dá para implementar com a tecnologia, o orçamento e o prazo disponíveis?</li>
          <li><b>Verificabilidade:</b> é possível escrever um teste que demonstre o atendimento?</li>
        </ul>
        <p><b>Técnicas de validação:</b> revisões de requisitos, prototipação e geração de casos de teste.</p>
        <p><b>Gerenciamento de requisitos</b> é o processo de compreender e controlar as mudanças:</p>
        <ul>
          <li>Requisitos <b>permanentes</b> (estáveis, ligados à atividade principal) × <b>voláteis</b> (tendem a mudar).</li>
          <li><b>Rastreabilidade</b>: de origem (quem pediu), de requisitos (dependências entre eles) e de projeto (quais módulos implementam).</li>
          <li><b>Controle de mudanças</b>: análise do problema → análise de impacto e custo → implementação da mudança.</li>
        </ul>`,
      mnemonic: 'Validação: <b>V-C-C-R-V</b> (Validade, Consistência, Completeza, Realismo, Verificabilidade).',
    },
  ],
  questions: [
    {
      id: 'req-q1',
      difficulty: 'easy',
      prompt: '"O sistema deve permitir que o bibliotecário cadastre novos livros no acervo." Esse requisito é:',
      answer: 'Funcional, pois descreve um serviço que o sistema deve oferecer.',
      distractors: [
        'Não funcional de produto, pois trata da usabilidade do sistema.',
        'Não funcional organizacional, pois depende das políticas da biblioteca.',
        'De domínio, pois não pode ser testado.',
      ],
      explanation: 'Requisito funcional declara o que o sistema deve fazer: funções, serviços e reações a entradas.',
    },
    {
      id: 'req-q2',
      difficulty: 'easy',
      prompt: '"O sistema deve processar cada transação em no máximo 2 segundos, com disponibilidade de 99,9%." Trata-se de um requisito:',
      answer: 'Não funcional',
      distractors: ['Funcional', 'De interface com o usuário', 'De caso de uso'],
      explanation: 'Desempenho e disponibilidade são restrições de qualidade sobre os serviços: requisitos não funcionais (de produto).',
    },
    {
      id: 'req-q3',
      difficulty: 'easy',
      prompt: 'Qual técnica de levantamento é a mais indicada para coletar informações de centenas de usuários espalhados por várias cidades?',
      answer: 'Questionário',
      distractors: ['Etnografia', 'Entrevista aberta individual', 'Programação em pares'],
      explanation: 'O questionário alcança muitas pessoas com baixo custo e gera dados padronizados. Entrevistas e etnografia são inviáveis nessa escala.',
    },
    {
      id: 'req-q4',
      difficulty: 'easy',
      prompt: 'Em um diagrama de casos de uso, um ator representa:',
      answer: 'Um papel desempenhado por uma entidade externa (pessoa, sistema ou dispositivo) que interage com o sistema.',
      distractors: [
        'Uma classe interna do sistema que armazena dados.',
        'Um programador responsável por implementar o caso de uso.',
        'Uma tabela do banco de dados usada pelo caso de uso.',
      ],
      explanation: 'Ator é sempre externo ao sistema e representa um papel, não uma pessoa específica.',
    },
    {
      id: 'req-q5',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre as relações «include» e «extend» em casos de uso?',
      answer: '«include» indica comportamento sempre executado pelo caso base; «extend» indica comportamento opcional, executado apenas sob determinada condição.',
      distractors: [
        '«include» é opcional e «extend» é obrigatório.',
        'Ambas representam herança entre atores.',
        '«include» liga atores a casos de uso; «extend» liga casos de uso a classes.',
      ],
      explanation: 'Include = obrigatório e reutilizável. Extend = condicional, acrescentado em um ponto de extensão do caso base.',
    },
    {
      id: 'req-q6',
      difficulty: 'medium',
      prompt: '"O sistema deve ser desenvolvido em Java e seguir o processo de desenvolvimento definido pela empresa." Segundo a classificação de Sommerville, esse requisito não funcional é:',
      answer: 'Organizacional',
      distractors: ['De produto', 'Externo', 'De domínio'],
      explanation: 'Requisitos de implementação (linguagem) e de padrões (processo) derivam de políticas da organização: são organizacionais.',
    },
    {
      id: 'req-q7',
      difficulty: 'medium',
      prompt: '"O sistema não deve revelar dados pessoais dos clientes, em conformidade com a legislação de proteção de dados." Esse requisito não funcional é classificado como:',
      answer: 'Externo (legal)',
      distractors: ['De produto (eficiência)', 'Organizacional (de entrega)', 'Funcional'],
      explanation: 'Requisitos que decorrem de leis e regulamentos externos ao sistema e à organização são RNF externos.',
    },
    {
      id: 'req-q8',
      difficulty: 'medium',
      prompt: 'Qual técnica é mais adequada para descobrir requisitos implícitos, isto é, aquilo que as pessoas fazem no trabalho mas não sabem ou não lembram de descrever?',
      answer: 'Etnografia (observação do trabalho no ambiente real)',
      distractors: ['Questionário de múltipla escolha', 'Análise de pontos de função', 'Revisão formal do código'],
      explanation: 'A observação mostra como o trabalho realmente acontece, revelando práticas tácitas que entrevistas não capturam.',
    },
    {
      id: 'req-q9',
      difficulty: 'medium',
      prompt: 'Quais são as atividades do processo de engenharia de requisitos segundo Sommerville?',
      answer: 'Estudo de viabilidade, elicitação e análise, especificação e validação de requisitos.',
      distractors: [
        'Concepção, elaboração, construção e transição.',
        'Planejamento, daily, review e retrospectiva.',
        'Codificação, teste de unidade, integração e implantação.',
      ],
      explanation: 'As quatro atividades geram o documento de requisitos; o gerenciamento de requisitos acompanha o processo controlando mudanças.',
    },
    {
      id: 'req-q10',
      difficulty: 'medium',
      prompt: 'O requisito "o sistema deve ser fácil de usar" apresenta qual problema?',
      answer: 'Não é verificável: falta um critério objetivo e mensurável para testar se foi atendido.',
      distractors: [
        'É um requisito funcional escrito como se fosse não funcional.',
        'É um requisito de domínio e, portanto, não precisa ser atendido.',
        'É um requisito organizacional de entrega.',
      ],
      explanation: 'RNFs devem ser quantificados, por exemplo: "após 2 horas de treinamento, o usuário deve concluir um cadastro em menos de 3 minutos, com no máximo 1 erro".',
    },
    {
      id: 'req-q11',
      difficulty: 'hard',
      prompt: 'Durante a validação, a equipe conclui que um requisito exige uma tecnologia que não existe e que não poderia ser entregue dentro do orçamento. Qual verificação detectou o problema?',
      answer: 'Verificação de realismo',
      distractors: ['Verificação de consistência', 'Verificação de completeza', 'Verificação de validade'],
      explanation: 'Realismo: os requisitos devem poder ser implementados com a tecnologia existente e dentro do orçamento e do prazo.',
    },
    {
      id: 'req-q12',
      difficulty: 'hard',
      prompt: 'No diagrama de casos de uso, o caso "Realizar pedido" sempre executa "Autenticar usuário", e "Aplicar cupom" só ocorre se o cliente informar um cupom. As setas corretas são:',
      answer: '«include» de "Realizar pedido" para "Autenticar usuário" e «extend» de "Aplicar cupom" para "Realizar pedido".',
      distractors: [
        '«include» de "Autenticar usuário" para "Realizar pedido" e «extend» de "Realizar pedido" para "Aplicar cupom".',
        '«extend» de "Realizar pedido" para "Autenticar usuário" e «include» de "Aplicar cupom" para "Realizar pedido".',
        'Generalização de "Aplicar cupom" para "Autenticar usuário".',
      ],
      explanation: 'O include sai do caso base em direção ao incluído; o extend sai do caso que estende em direção ao caso base.',
    },
    {
      id: 'req-q13',
      difficulty: 'hard',
      prompt: 'Sobre requisitos de usuário e requisitos de sistema, é correto afirmar:',
      answer: 'Requisitos de usuário são declarações de alto nível, em linguagem natural, para clientes e gerentes; requisitos de sistema detalham funções e restrições com precisão para os desenvolvedores.',
      distractors: [
        'Requisitos de usuário são sempre funcionais, e requisitos de sistema são sempre não funcionais.',
        'Requisitos de sistema são escritos pelos usuários finais, e os de usuário, pelos programadores.',
        'Não há diferença de nível de detalhe entre eles, apenas de formatação.',
      ],
      explanation: 'A diferença é o nível de detalhe e o público. Ambos os níveis podem conter requisitos funcionais e não funcionais.',
    },
    {
      id: 'req-q14',
      difficulty: 'medium',
      prompt: 'Qual das situações abaixo é uma dificuldade típica da elicitação de requisitos?',
      answer: 'Stakeholders diferentes têm requisitos conflitantes e os expressam em termos próprios do seu domínio.',
      distractors: [
        'Os requisitos são sempre estáveis e conhecidos antes do início do projeto.',
        'Os stakeholders sempre sabem exatamente o que querem do sistema.',
        'A linguagem natural elimina qualquer ambiguidade na especificação.',
      ],
      explanation: 'Sommerville lista: stakeholders que não sabem o que querem, vocabulário próprio, conflitos, fatores políticos e ambiente em mudança.',
    },
    {
      id: 'req-q15',
      difficulty: 'easy',
      prompt: 'O que é rastreabilidade de requisitos?',
      answer: 'A capacidade de relacionar cada requisito à sua origem, a outros requisitos e aos elementos de projeto que o implementam.',
      distractors: [
        'A velocidade com que o sistema responde às requisições.',
        'O registro das horas trabalhadas por cada analista.',
        'A técnica de entrevistar usuários no local de trabalho.',
      ],
      explanation: 'A rastreabilidade (de origem, de requisitos e de projeto) permite avaliar o impacto de uma mudança.',
    },
  ],
  openQuestions: [
    {
      id: 'req-o1',
      prompt: 'Diferencie requisitos funcionais de requisitos não funcionais e dê um exemplo de cada para um sistema acadêmico.',
      modelAnswer: `
        <p><b>Requisitos funcionais</b> descrevem os serviços que o sistema deve fornecer, como reage a entradas e como se comporta em determinadas situações. Exemplo: "o sistema deve permitir que o professor lance as notas e as frequências por turma".</p>
        <p><b>Requisitos não funcionais</b> são restrições sobre os serviços ou sobre o sistema como um todo (desempenho, confiabilidade, segurança, padrões, prazos). Exemplo: "a consulta de notas deve responder em até 2 segundos com 2.000 alunos conectados".</p>
        <p>Um RNF deve ser mensurável e, se não for atendido, pode comprometer o sistema inteiro.</p>`,
      keyPoints: ['RF = serviço/comportamento', 'RNF = restrição/qualidade', 'Exemplo funcional coerente', 'Exemplo não funcional mensurável'],
    },
    {
      id: 'req-o2',
      prompt: 'Cite três técnicas de levantamento de requisitos e indique em que situação cada uma é mais adequada.',
      modelAnswer: `
        <p><b>Entrevista:</b> conversa com stakeholders-chave, aberta ou fechada; adequada para compreender em profundidade o trabalho e as necessidades de poucas pessoas.</p>
        <p><b>Questionário:</b> perguntas padronizadas; adequado quando há muitos usuários ou eles estão geograficamente dispersos.</p>
        <p><b>Observação (etnografia):</b> o analista acompanha o trabalho no ambiente real; adequada para descobrir requisitos implícitos, que as pessoas não conseguem verbalizar.</p>
        <p>(Também valem: prototipação, para requisitos vagos e de interface; workshop/JAD, para resolver conflitos e obter consenso; análise de documentos; brainstorming; cenários e casos de uso.)</p>`,
      keyPoints: ['Três técnicas reais', 'Situação adequada a cada uma', 'Justificativa coerente'],
    },
    {
      id: 'req-o3',
      prompt: 'Explique a classificação dos requisitos não funcionais em de produto, organizacionais e externos, com um exemplo de cada.',
      modelAnswer: `
        <p><b>De produto:</b> especificam o comportamento do software, como desempenho, confiabilidade, usabilidade e portabilidade. Ex.: "o sistema deve estar disponível 99,5% do tempo".</p>
        <p><b>Organizacionais:</b> derivam de políticas e procedimentos das organizações do cliente e do desenvolvedor: padrões de processo, linguagem, prazos de entrega. Ex.: "o sistema deve ser desenvolvido em Java, seguindo o processo da empresa".</p>
        <p><b>Externos:</b> derivam de fatores externos ao sistema e ao processo: interoperabilidade, leis e ética. Ex.: "o sistema deve cumprir a legislação de proteção de dados pessoais".</p>`,
      keyPoints: ['Produto: comportamento do software', 'Organizacional: políticas e padrões', 'Externo: leis, ética, interoperabilidade', 'Um exemplo correto de cada'],
    },
    {
      id: 'req-o4',
      prompt: 'O que é validação de requisitos? Cite as verificações que devem ser feitas.',
      modelAnswer: `
        <p>Validação de requisitos é o processo de verificar se os requisitos definem o sistema que o cliente realmente deseja, encontrando problemas antes do projeto e da implementação, quando corrigi-los é muito mais barato.</p>
        <p>Verificações: <b>validade</b> (atende a uma necessidade real), <b>consistência</b> (sem conflitos), <b>completeza</b> (nada faltando), <b>realismo</b> (implementável com tecnologia, prazo e orçamento) e <b>verificabilidade</b> (pode ser testado).</p>
        <p>Técnicas: revisões de requisitos, prototipação e geração de casos de teste.</p>`,
      keyPoints: ['Conferir se os requisitos definem o sistema desejado', 'Validade, consistência, completeza, realismo, verificabilidade', 'Erro de requisito é o mais caro'],
    },
  ],
  flashcards: [
    { id: 'req-f1', front: 'Requisito funcional × não funcional?', back: 'Funcional: o que o sistema faz (serviços). Não funcional: restrições e qualidades (desempenho, segurança, padrões...).' },
    { id: 'req-f2', front: 'Os 3 grupos de RNF de Sommerville?', back: 'De produto, organizacionais e externos.' },
    { id: 'req-f3', front: 'Requisito de usuário × de sistema?', back: 'Usuário: alto nível, linguagem natural, para clientes. Sistema: detalhado e preciso, para desenvolvedores.' },
    { id: 'req-f4', front: 'As 4 atividades da engenharia de requisitos?', back: 'Estudo de viabilidade, elicitação e análise, especificação, validação.' },
    { id: 'req-f5', front: '«include»: significado e direção?', back: 'Comportamento sempre executado. Seta do caso base para o caso incluído.' },
    { id: 'req-f6', front: '«extend»: significado e direção?', back: 'Comportamento opcional/condicional. Seta do caso que estende para o caso base.' },
    { id: 'req-f7', front: 'Quando usar etnografia?', back: 'Para descobrir requisitos implícitos, observando o trabalho real das pessoas.' },
    { id: 'req-f8', front: 'Quando usar questionário?', back: 'Muitos usuários ou usuários dispersos; dados padronizados e quantificáveis.' },
    { id: 'req-f9', front: 'As 5 verificações da validação de requisitos?', back: 'Validade, consistência, completeza, realismo e verificabilidade.' },
    { id: 'req-f10', front: 'O que é um stakeholder?', back: 'Qualquer pessoa ou grupo afetado pelo sistema: usuários, clientes, gerentes, reguladores...' },
    { id: 'req-f11', front: 'O que é um requisito de domínio?', back: 'Requisito que vem do domínio da aplicação (regras, normas, leis da área), não de um usuário específico.' },
    { id: 'req-f12', front: 'Os 4 passos da elicitação e análise?', back: 'Descoberta → classificação e organização → priorização e negociação → documentação.' },
    { id: 'req-f13', front: 'O que é JAD?', back: 'Joint Application Design: workshops estruturados com usuários e desenvolvedores, conduzidos por um facilitador.' },
  ],
  cheatSheet: [
    { term: 'Requisito funcional', definition: 'Serviço que o sistema deve fornecer.' },
    { term: 'Requisito não funcional', definition: 'Restrição ou qualidade; deve ser mensurável. De produto, organizacional ou externo.' },
    { term: 'Requisito de domínio', definition: 'Imposto pelo domínio da aplicação.' },
    { term: 'Usuário × sistema', definition: 'Alto nível para clientes × detalhado para desenvolvedores.' },
    { term: 'Processo (Sommerville)', definition: 'Viabilidade → elicitação e análise → especificação → validação (+ gerenciamento).' },
    { term: 'Técnicas', definition: 'Entrevista, questionário, etnografia, workshop/JAD, brainstorming, prototipação, cenários, casos de uso, análise de documentos.' },
    { term: '«include»', definition: 'Obrigatório. Seta: base → incluído.' },
    { term: '«extend»', definition: 'Opcional. Seta: extensão → base.' },
    { term: 'Validação', definition: 'Validade, consistência, completeza, realismo, verificabilidade.' },
    { term: 'Rastreabilidade', definition: 'De origem, de requisitos e de projeto.' },
  ],
};
