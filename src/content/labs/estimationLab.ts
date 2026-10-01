import type { ClassifierConfig } from '../../components/ClassifierGame';
import type { CocomoConfig } from '../../labs/estimation/CocomoPanel';
import type { FunctionPointConfig } from '../../labs/estimation/FunctionPointPanel';
import type { PokerConfig } from '../../labs/estimation/PokerPanel';
import type { ThreePointConfig } from '../../labs/estimation/ThreePointPanel';

export const estimationLabTitle: string = 'Laboratório · Bancada de estimativas';

export const functionPointCalculator: FunctionPointConfig = {
  id: 'fp',
  label: '🧮 Pontos por função',
  title: 'Calculadora de pontos por função',
  intro: 'Informe quantos itens de cada tipo o sistema tem e a complexidade deles. Depois ajuste a soma dos <b>14 fatores</b> e veja a fórmula sendo resolvida.',
  kinds: {
    inputs: { name: 'Entradas externas', hint: 'telas e formulários que alimentam o sistema' },
    outputs: { name: 'Saídas externas', hint: 'relatórios, telas e mensagens com dados processados' },
    inquiries: { name: 'Consultas externas', hint: 'buscas que só recuperam dados' },
    files: { name: 'Arquivos lógicos internos', hint: 'grupos de dados mantidos pelo sistema' },
    interfaces: { name: 'Arquivos de interface externa', hint: 'dados mantidos por outros sistemas' },
  },
  complexities: { simple: 'Simples', average: 'Médio', complex: 'Complexo' },
  headers: { kind: 'Parâmetro', count: 'Qtde', complexity: 'Complexidade', weight: 'Peso', subtotal: 'Total' },
  countTotalLabel: 'Contagem total (pontos não ajustados)',
  influenceLabel: 'Soma dos 14 fatores de ajuste, Σ(Fi) =',
  influenceHint: 'Cada fator vale de 0 (sem influência) a 5 (essencial): a soma vai de 0 a 70.',
  factorLabel: 'Fator de ajuste',
  resultLabel: 'Pontos por função',
  productivityLabel: 'Se a equipe produz, em PF por pessoa-mês,',
  effortLabel: (effort: string): string => 'o esforço estimado é de <b>' + effort + ' pessoas-mês</b>.',
  presetsLabel: 'Exemplos:',
  presets: [
    {
      name: 'Sistema de biblioteca',
      influence: 35,
      counts: {
        inputs: { count: 10, complexity: 'average' },
        outputs: { count: 8, complexity: 'average' },
        inquiries: { count: 5, complexity: 'average' },
        files: { count: 4, complexity: 'average' },
        interfaces: { count: 2, complexity: 'average' },
      },
    },
    {
      name: 'App de delivery',
      influence: 48,
      counts: {
        inputs: { count: 18, complexity: 'average' },
        outputs: { count: 12, complexity: 'complex' },
        inquiries: { count: 14, complexity: 'simple' },
        files: { count: 7, complexity: 'average' },
        interfaces: { count: 4, complexity: 'complex' },
      },
    },
    {
      name: 'Cadastro simples',
      influence: 14,
      counts: {
        inputs: { count: 4, complexity: 'simple' },
        outputs: { count: 2, complexity: 'simple' },
        inquiries: { count: 3, complexity: 'simple' },
        files: { count: 2, complexity: 'simple' },
        interfaces: { count: 0, complexity: 'simple' },
      },
    },
  ],
};

export const cocomoCalculator: CocomoConfig = {
  id: 'cocomo',
  label: '🏗️ COCOMO',
  title: 'COCOMO básico',
  intro: 'Arraste o tamanho e troque o modo do projeto. Repare como o <b>esforço cresce mais rápido que o tamanho</b>.',
  sizeLabel: 'Tamanho estimado:',
  modes: {
    organic: { name: 'Orgânico', description: 'Projeto pequeno, equipe experiente, requisitos flexíveis.' },
    semidetached: { name: 'Semidestacado', description: 'Porte intermediário, equipe com experiência mista.' },
    embedded: { name: 'Embutido', description: 'Restrições rígidas de hardware, software e operação.' },
  },
  effortLabel: 'Esforço (pessoas-mês)',
  durationLabel: 'Prazo (meses)',
  peopleLabel: 'Equipe média',
  effortUnit: 'pessoas-mês',
  durationUnit: 'meses',
  compareTitle: 'Esforço para o mesmo tamanho em cada modo',
  note: 'Equipe média = E ÷ D. O modelo <b>intermediário</b> ainda multiplicaria o esforço por 15 direcionadores de custo (experiência da equipe, confiabilidade exigida, ferramentas...).',
};

export const threePointCalculator: ThreePointConfig = {
  id: 'threepoint',
  label: '🔮 Três pontos',
  title: 'Estimativa de três pontos',
  intro: 'Em vez de um chute único, dê três: o <b>otimista</b>, o <b>mais provável</b> e o <b>pessimista</b>. A média ponderada puxa a estimativa para longe do otimismo.',
  fields: { optimistic: 'Otimista (o):', likely: 'Mais provável (m):', pessimistic: 'Pessimista (p):' },
  unit: 'dias',
  expectedLabel: 'Valor esperado (E)',
  deviationLabel: 'Desvio padrão',
  orderWarning: 'Mantenha otimista ≤ mais provável ≤ pessimista para a estimativa fazer sentido.',
  insight: (expected: string, likely: string): string =>
    'Esperado: <b>' + expected + '</b>; mais provável: ' + likely + '. Em software, o esperado costuma ficar <b>acima</b> do mais provável porque a cauda pessimista é mais longa: há mais formas de atrasar do que de adiantar.',
};

export const planningPoker: PokerConfig = {
  id: 'poker',
  label: '🃏 Planning Poker',
  title: 'Mesa de Planning Poker',
  intro: 'Você faz parte do time. Escolha a sua carta <b>antes</b> de ver as dos colegas: é isso que evita a ancoragem.',
  deck: [1, 2, 3, 5, 8, 13, 21],
  you: 'Você',
  pickPrompt: 'Quantos story points vale esta história?',
  reveal: 'Revelar as cartas',
  discussionTitle: 'Os extremos explicam.',
  secondRound: 'Votar de novo',
  consensusLabel: (points: number): string => 'Consenso: ' + points + ' pontos.',
  yourVote: {
    exact: 'Você votou exatamente no consenso.',
    close: 'Você ficou a uma carta do consenso: dentro da margem normal de discussão.',
    far: (points: number): string => 'Seu voto (' + points + ') ficou longe: vale ouvir os argumentos dos extremos.',
  },
  nextStory: 'Próxima história →',
  storyCounter: (index: number, total: number): string => 'História ' + index + ' de ' + total,
  stories: [
    {
      title: 'Como aluno, quero gerar o histórico escolar em PDF autenticado por QR Code.',
      detail: 'Envolve biblioteca de PDF, assinatura digital e consulta ao banco acadêmico.',
      firstRound: [{ name: 'Ana', vote: 5 }, { name: 'Bruno', vote: 13 }, { name: 'Carla', vote: 8 }, { name: 'Diego', vote: 3 }],
      discussion: '<b>Bruno (13):</b> "ninguém aqui usou assinatura digital, é incerteza pura". <b>Diego (3):</b> "eu achei que o PDF já existia". Não existe: a história inclui gerar o PDF.',
      secondRound: [{ name: 'Ana', vote: 8 }, { name: 'Bruno', vote: 8 }, { name: 'Carla', vote: 8 }, { name: 'Diego', vote: 8 }],
      consensus: 8,
      lesson: 'A divergência revelou uma <b>premissa errada</b> e um <b>risco técnico</b>, que é o grande valor da técnica.',
    },
    {
      title: 'Como visitante, quero trocar o tema do site entre claro e escuro.',
      detail: 'A folha de estilos já usa variáveis de cor; falta o botão e salvar a preferência.',
      firstRound: [{ name: 'Ana', vote: 2 }, { name: 'Bruno', vote: 2 }, { name: 'Carla', vote: 3 }, { name: 'Diego', vote: 2 }],
      discussion: 'Quase todos concordam. <b>Carla (3)</b> lembra que é preciso testar o contraste das telas no tema novo, mas aceita que cabe no 2.',
      secondRound: [{ name: 'Ana', vote: 2 }, { name: 'Bruno', vote: 2 }, { name: 'Carla', vote: 2 }, { name: 'Diego', vote: 2 }],
      consensus: 2,
      lesson: 'Histórias pequenas e bem entendidas convergem rápido: não gaste tempo discutindo entre 2 e 3.',
    },
    {
      title: 'Como gerente, quero um painel com todos os indicadores de vendas em tempo real.',
      detail: 'Não está definido quais indicadores, de quais sistemas vêm os dados nem o que significa "tempo real".',
      firstRound: [{ name: 'Ana', vote: 21 }, { name: 'Bruno', vote: 13 }, { name: 'Carla', vote: 21 }, { name: 'Diego', vote: 8 }],
      discussion: '<b>Ana e Carla (21):</b> "isso não é uma história, é um projeto". <b>Diego (8):</b> pensou só em um gráfico. O escopo está aberto demais.',
      secondRound: [{ name: 'Ana', vote: 21 }, { name: 'Bruno', vote: 21 }, { name: 'Carla', vote: 21 }, { name: 'Diego', vote: 21 }],
      consensus: 21,
      lesson: 'Quando a estimativa vai ao topo do baralho, a história é um <b>épico</b>: o certo é <b>dividi-la</b> em histórias menores com o Product Owner antes de planejar.',
    },
  ],
};

export const feasibilityGame: ClassifierConfig = {
  id: 'feasibility',
  label: '🚦 Viabilidade',
  title: 'Qual dimensão da viabilidade está em jogo?',
  intro: 'Cada dúvida levantada no estudo de viabilidade pertence a uma dimensão. Classifique.',
  categories: [
    { id: 'technical', label: 'Técnica', hint: 'dá para construir?', color: 'var(--blue)' },
    { id: 'economic', label: 'Econômica', hint: 'compensa financeiramente?', color: 'var(--green)' },
    { id: 'operational', label: 'Operacional', hint: 'vão conseguir usar?', color: 'var(--purple)' },
    { id: 'legal', label: 'Legal', hint: 'a lei permite?', color: 'var(--red)' },
    { id: 'schedule', label: 'De cronograma', hint: 'fica pronto a tempo?', color: 'var(--yellow)' },
  ],
  items: [
    { text: 'A equipe nunca trabalhou com reconhecimento de voz e não sabe se a precisão exigida é alcançável.', category: 'technical', explanation: 'Dúvida sobre tecnologia e competência para construir.' },
    { text: 'O sistema custará R$ 400 mil e deve economizar R$ 150 mil por ano. Em quanto tempo o investimento se paga?', category: 'economic', explanation: 'Análise de custo-benefício e tempo de retorno.' },
    { text: 'Os atendentes resistem a abandonar as planilhas e a gerência não pretende treinar ninguém.', category: 'operational', explanation: 'O sistema pode ser tecnicamente perfeito e ainda assim não ser usado.' },
    { text: 'O sistema armazenará dados de saúde dos pacientes em servidores fora do país.', category: 'legal', explanation: 'Pode violar leis de proteção de dados e normas do setor.' },
    { text: 'O sistema de matrículas precisa estar no ar antes do início do semestre, daqui a seis semanas.', category: 'schedule', explanation: 'Se ficar pronto depois, perde a utilidade.' },
    { text: 'O sistema legado só exporta dados em um formato proprietário sem documentação.', category: 'technical', explanation: 'Risco de integração com os sistemas existentes.' },
    { text: 'A licença do banco de dados escolhido proíbe o uso comercial sem contrato específico.', category: 'legal', explanation: 'Restrição contratual e de licenciamento.' },
    { text: 'O custo de manter a infraestrutura em nuvem pode superar a receita esperada do produto.', category: 'economic', explanation: 'Os benefícios precisam superar os custos, inclusive os de operação.' },
    { text: 'A fábrica funciona em três turnos e não há computadores no chão de fábrica para os operadores.', category: 'operational', explanation: 'O ambiente de uso precisa comportar o sistema.' },
    { text: 'A feira em que o produto seria lançado acontece antes da data mais otimista de conclusão.', category: 'schedule', explanation: 'Restrição de prazo que pode inviabilizar o projeto.' },
  ],
};
