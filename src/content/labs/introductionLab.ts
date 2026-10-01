import type { ClassifierConfig } from '../../components/ClassifierGame';
import type { DiagramConfig } from '../../components/DiagramPlayer';
import type { StackConfig } from '../../components/StackExplorer';
import { T } from '../uiText';

export const introductionLabTitle: string = 'Laboratório · Fundamentos';

export const activitiesDiagram: DiagramConfig = {
  id: 'activities',
  label: '⚙️ Processo',
  title: 'O processo de software em movimento',
  models: [
    {
      id: 'sommerville',
      name: 'Sommerville: 4 atividades',
      summary: 'Todo processo de software, do cascata ao Scrum, executa estas quatro atividades. O que muda de um modelo para outro é a <b>ordem</b> e o <b>quanto se intercalam</b>.',
      width: 640,
      height: 250,
      nodes: [
        { id: 'spec', label: 'Especificação', x: 80, y: 90, width: 122, color: 'var(--blue)' },
        { id: 'dev', label: 'Desenvolvimento', x: 240, y: 90, width: 122, color: 'var(--green)' },
        { id: 'val', label: 'Validação', x: 400, y: 90, width: 122, color: 'var(--purple)' },
        { id: 'evo', label: 'Evolução', x: 560, y: 90, width: 122, color: 'var(--yellow)' },
        { id: 'client', label: 'Cliente e usuários', x: 320, y: 205, width: 170, shape: 'ellipse', color: 'var(--teal)' },
      ],
      edges: [
        { from: 'spec', to: 'dev' },
        { from: 'dev', to: 'val' },
        { from: 'val', to: 'evo' },
        { from: 'evo', to: 'spec', bend: -90, dashed: true, label: 'novas necessidades' },
        { from: 'client', to: 'spec', dashed: true, kind: 'line' },
        { from: 'client', to: 'val', dashed: true, kind: 'line' },
      ],
      steps: [
        { nodes: ['spec', 'client'], edges: [4], caption: '<b>1. Especificação.</b> Clientes e engenheiros definem <b>o que</b> o software deve fazer e as <b>restrições</b> sobre a sua operação. É a engenharia de requisitos.' },
        { nodes: ['dev'], edges: [0], caption: '<b>2. Desenvolvimento.</b> O software é <b>projetado e programado</b> para atender à especificação.' },
        { nodes: ['val', 'client'], edges: [1, 5], caption: '<b>3. Validação.</b> O software é verificado para garantir que é <b>o que o cliente deseja</b>. Inclui revisões e testes.' },
        { nodes: ['evo'], edges: [2], caption: '<b>4. Evolução.</b> O software é <b>modificado</b> para se adaptar às mudanças de requisitos do cliente e do mercado.' },
        { nodes: ['spec'], edges: [3], caption: 'E o ciclo recomeça: cada mudança gera <b>nova especificação</b>. Por isso desenvolvimento e manutenção são vistos hoje como um contínuo.' },
      ],
    },
    {
      id: 'pressman',
      name: 'Pressman: arcabouço genérico',
      summary: 'Cinco atividades de arcabouço, válidas para qualquer projeto, cobertas por um conjunto de <b>atividades guarda-chuva</b> que duram o projeto inteiro.',
      width: 640,
      height: 250,
      nodes: [
        { id: 'umbrella', label: 'Atividades guarda-chuva: riscos · qualidade · configuração · medição · revisões', x: 320, y: 40, width: 600, height: 40, color: 'var(--indigo)' },
        { id: 'com', label: 'Comunicação', x: 70, y: 145, width: 104, color: 'var(--blue)' },
        { id: 'plan', label: 'Planejamento', x: 195, y: 145, width: 104, color: 'var(--teal)' },
        { id: 'model', label: 'Modelagem', x: 320, y: 145, width: 104, color: 'var(--green)' },
        { id: 'build', label: 'Construção', x: 445, y: 145, width: 104, color: 'var(--purple)' },
        { id: 'deploy', label: 'Implantação', x: 570, y: 145, width: 104, color: 'var(--yellow)' },
      ],
      edges: [
        { from: 'com', to: 'plan' },
        { from: 'plan', to: 'model' },
        { from: 'model', to: 'build' },
        { from: 'build', to: 'deploy' },
        { from: 'deploy', to: 'com', bend: -70, dashed: true, label: 'feedback do cliente' },
      ],
      steps: [
        { nodes: ['com'], caption: '<b>Comunicação.</b> Colaboração intensa com o cliente e levantamento de requisitos.' },
        { nodes: ['plan'], edges: [0], caption: '<b>Planejamento.</b> Estimativas, cronograma, riscos, recursos e produtos de trabalho.' },
        { nodes: ['model'], edges: [1], caption: '<b>Modelagem.</b> Modelos de <b>análise</b> (entender o problema) e de <b>projeto</b> (definir a solução).' },
        { nodes: ['build'], edges: [2], caption: '<b>Construção.</b> Geração de <b>código</b> e os <b>testes</b> para revelar erros.' },
        { nodes: ['deploy'], edges: [3], caption: '<b>Implantação.</b> O software é entregue ao cliente, que o avalia e devolve <b>feedback</b>.' },
        { nodes: ['umbrella'], edges: [4], caption: '<b>Atividades guarda-chuva</b> acompanham tudo: gestão de riscos, garantia de qualidade, revisões técnicas, medição e gerência de configuração.' },
      ],
    },
    {
      id: 'phases',
      name: 'Pressman (1995): 3 fases',
      summary: 'Na edição da bibliografia, independentemente do paradigma, o trabalho se divide em três fases genéricas.',
      width: 640,
      height: 250,
      nodes: [
        { id: 'definition', label: 'Definição\n"o quê"', x: 120, y: 120, width: 150, height: 70, color: 'var(--blue)' },
        { id: 'development', label: 'Desenvolvimento\n"como"', x: 320, y: 120, width: 150, height: 70, color: 'var(--green)' },
        { id: 'maintenance', label: 'Manutenção\n"mudanças"', x: 520, y: 120, width: 150, height: 70, color: 'var(--yellow)' },
      ],
      edges: [
        { from: 'definition', to: 'development' },
        { from: 'development', to: 'maintenance' },
        { from: 'maintenance', to: 'definition', bend: -100, dashed: true },
      ],
      steps: [
        { nodes: ['definition'], caption: '<b>Definição: o quê.</b> Que informação será processada, que funções e desempenho são desejados, que restrições existem. Inclui análise do sistema, planejamento do projeto e análise de requisitos.' },
        { nodes: ['development'], edges: [0], caption: '<b>Desenvolvimento: como.</b> Como os dados serão estruturados, como a arquitetura será implementada. Inclui projeto de software, codificação e testes.' },
        { nodes: ['maintenance'], edges: [1], caption: '<b>Manutenção: mudanças.</b> Correção de erros, adaptações ao ambiente e melhorias pedidas pelo cliente.' },
        { nodes: ['definition'], edges: [2], caption: 'A manutenção <b>reaplica</b> as fases de definição e desenvolvimento, agora sobre um software que já existe.' },
      ],
    },
  ],
};

export const layersStack: StackConfig = {
  id: 'layers',
  label: '🧱 Camadas',
  title: 'Engenharia de software: uma tecnologia em camadas',
  tourLabel: T.lab.tour,
  emptyHint: T.lab.stackHint,
  sets: [
    {
      id: 'pressman',
      name: 'Camadas de Pressman',
      intro: 'Cada camada se apoia na de baixo. Tire a base e tudo o que está em cima perde o sentido.',
      shape: 'pyramid',
      layers: [
        {
          id: 'tools',
          label: 'Ferramentas',
          badge: 'apoio automatizado',
          color: 'var(--purple)',
          detail: '<p>Fornecem apoio <b>automatizado ou semiautomatizado</b> para o processo e para os métodos. Quando integradas, formam um ambiente <b>CASE</b> (<i>Computer-Aided Software Engineering</i>).</p><p class="muted">Exemplos: IDE, controle de versão, ferramentas de modelagem UML, automação de testes.</p>',
        },
        {
          id: 'methods',
          label: 'Métodos',
          badge: 'o "como fazer"',
          color: 'var(--blue)',
          detail: '<p>Fornecem a técnica de <b>como fazer</b> para construir software: análise de requisitos, projeto, construção de programas, teste e manutenção.</p><p class="muted">Exemplos: análise orientada a objetos, projeto estruturado, técnicas de teste caixa-preta.</p>',
        },
        {
          id: 'process',
          label: 'Processo',
          badge: 'a cola das camadas',
          color: 'var(--green)',
          detail: '<p>É o <b>alicerce</b> que mantém as camadas de tecnologia unidas. Define o <b>arcabouço</b> de atividades, a sequência em que os métodos são aplicados, os produtos de trabalho, os marcos e o controle gerencial do projeto.</p>',
        },
        {
          id: 'quality',
          label: 'Foco na qualidade',
          badge: 'a base de tudo',
          color: 'var(--yellow)',
          detail: '<p>É a <b>pedra fundamental</b>. Qualquer abordagem de engenharia precisa estar apoiada em um <b>compromisso organizacional com a qualidade</b>, que alimenta a cultura de melhoria contínua.</p><p><b>Em prova:</b> "qual é a base da engenharia de software?" → foco na qualidade.</p>',
        },
      ],
    },
  ],
};

export const mythsGame: ClassifierConfig = {
  id: 'myths',
  label: '🧙 Mito ou fato?',
  title: 'Mito ou fato?',
  intro: 'Leia a afirmação e decida se ela é um dos <b>mitos do software</b> descritos por Pressman ou um <b>fato</b> da engenharia de software.',
  rounds: 10,
  categories: [
    { id: 'myth', label: 'Mito', hint: 'crença enganosa', color: 'var(--red)' },
    { id: 'fact', label: 'Fato', hint: 'é assim mesmo', color: 'var(--green)' },
  ],
  items: [
    { text: '"Se o cronograma atrasar, colocamos mais programadores e recuperamos o tempo perdido."', category: 'myth', explanation: 'Mito <b>gerencial</b>. Pela Lei de Brooks, adicionar pessoas a um projeto atrasado o atrasa ainda mais.' },
    { text: '"Uma descrição geral dos objetivos já basta para começar a escrever os programas; os detalhes vêm depois."', category: 'myth', explanation: 'Mito do <b>cliente</b>. Requisitos mal definidos são a principal causa de fracasso dos projetos.' },
    { text: '"Os requisitos mudam o tempo todo, mas isso não é problema, porque software é flexível."', category: 'myth', explanation: 'Mito do <b>cliente</b>. O impacto e o custo de uma mudança crescem quanto mais tarde ela é introduzida.' },
    { text: '"Depois que o programa está funcionando, o nosso trabalho terminou."', category: 'myth', explanation: 'Mito do <b>profissional</b>. A maior parte do esforço (60% a 80%) acontece depois da primeira entrega.' },
    { text: '"Enquanto o programa não estiver rodando, não há como avaliar a sua qualidade."', category: 'myth', explanation: 'Mito do <b>profissional</b>. Revisões técnicas formais encontram defeitos desde os requisitos e o projeto.' },
    { text: '"O único produto que entregamos em um projeto bem-sucedido é o programa executável."', category: 'myth', explanation: 'Mito do <b>profissional</b>. A configuração de software inclui também documentos, modelos e dados.' },
    { text: '"Já temos um manual cheio de padrões e procedimentos; a equipe tem tudo de que precisa."', category: 'myth', explanation: 'Mito <b>gerencial</b>. O manual só ajuda se for conhecido, atual, completo e realmente usado.' },
    { text: '"Se terceirizarmos o projeto, podemos relaxar e deixar a outra empresa cuidar de tudo."', category: 'myth', explanation: 'Mito <b>gerencial</b>. Quem não sabe gerenciar projetos internamente terá dificuldades também ao terceirizar.' },
    { text: '"A engenharia de software vai nos fazer criar documentação volumosa e desnecessária, e isso só atrasa."', category: 'myth', explanation: 'Mito do <b>profissional</b>. Engenharia de software trata de criar qualidade; mais qualidade significa menos retrabalho e entregas mais rápidas.' },
    { text: 'O custo de corrigir um problema de requisitos cresce quanto mais tarde ele é descoberto.', category: 'fact', explanation: 'Fato. Corrigir na manutenção pode custar dezenas de vezes mais do que corrigir na definição.' },
    { text: 'Software não se desgasta, mas se deteriora por causa das mudanças que sofre.', category: 'fact', explanation: 'Fato. Cada mudança pode introduzir novos defeitos, elevando a taxa de falhas ao longo do tempo.' },
    { text: 'Revisões técnicas são um filtro de qualidade eficaz antes mesmo de existir código executável.', category: 'fact', explanation: 'Fato. É exatamente o que desmente o mito de que só se avalia qualidade com o programa rodando.' },
    { text: 'A manutenção costuma consumir mais esforço do que o desenvolvimento inicial do sistema.', category: 'fact', explanation: 'Fato. Em sistemas de vida longa, a evolução responde pela maior parte do custo total.' },
    { text: 'Documentação e dados de configuração fazem parte do produto de software.', category: 'fact', explanation: 'Fato. É a definição de software de Sommerville: programas, documentação associada e dados de configuração.' },
    { text: 'Quem entra em um projeto em andamento precisa de tempo e de ajuda da equipe para se tornar produtivo.', category: 'fact', explanation: 'Fato. É por isso que adicionar pessoas tarde não recupera prazo.' },
  ],
};

export const attributesGame: ClassifierConfig = {
  id: 'attributes',
  label: '⭐ Atributos',
  title: 'Qual atributo de qualidade está em jogo?',
  intro: 'Sommerville lista quatro atributos essenciais de um bom software. Relacione cada situação ao atributo correspondente.',
  categories: [
    { id: 'maintainability', label: 'Facilidade de manutenção', hint: 'consegue evoluir', color: 'var(--blue)' },
    { id: 'dependability', label: 'Confiança', hint: 'confiável e seguro', color: 'var(--green)' },
    { id: 'efficiency', label: 'Eficiência', hint: 'não desperdiça recursos', color: 'var(--yellow)' },
    { id: 'usability', label: 'Usabilidade', hint: 'fácil de usar', color: 'var(--purple)' },
  ],
  items: [
    { text: 'O código é modular e bem documentado, então incluir uma nova regra fiscal levou apenas dois dias.', category: 'maintainability', explanation: 'O software evoluiu com facilidade para atender a uma nova necessidade.' },
    { text: 'Uma falha no sistema de frenagem não pode colocar em risco a vida dos passageiros.', category: 'dependability', explanation: 'Confiança engloba confiabilidade, proteção e segurança: o sistema não deve causar danos quando falha.' },
    { text: 'O relatório mensal que demorava 40 minutos agora é gerado em 3 segundos usando metade da memória.', category: 'efficiency', explanation: 'Eficiência: bom uso de tempo de processamento e de memória.' },
    { text: 'Novos atendentes aprendem a operar a tela de vendas em menos de uma hora, sem treinamento formal.', category: 'usability', explanation: 'Usabilidade: interface adequada ao perfil do usuário.' },
    { text: 'O internet banking precisa impedir acessos não autorizados às contas dos clientes.', category: 'dependability', explanation: 'Proteção (security) faz parte do atributo confiança.' },
    { text: 'O aplicativo não pode drenar a bateria do celular enquanto roda em segundo plano.', category: 'efficiency', explanation: 'Uso econômico dos recursos do sistema.' },
    { text: 'A empresa trocou de banco de dados e a mudança exigiu alterar apenas uma camada do sistema.', category: 'maintainability', explanation: 'Um software fácil de manter absorve mudanças do ambiente com baixo custo.' },
    { text: 'As mensagens de erro explicam o que aconteceu e o que o usuário deve fazer em seguida.', category: 'usability', explanation: 'Mensagens claras e ajuda adequada são parte da usabilidade.' },
    { text: 'O servidor do hospital precisa ficar disponível 24 horas por dia, sem perder registros.', category: 'dependability', explanation: 'Disponibilidade e confiabilidade compõem a confiança.' },
    { text: 'A equipe gastou três semanas para entender o código antes de conseguir corrigir um defeito simples.', category: 'maintainability', explanation: 'Sintoma de <b>baixa</b> facilidade de manutenção.' },
  ],
};
