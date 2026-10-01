/** Books, free readings and videos recommended for the course. Titles and channels were checked on YouTube. */

export interface BookReference {
  /** HTML citation. */
  citation: string;
  /** Why this book is worth opening. */
  note?: string;
  /** Present when the full text is legally available online. */
  url?: string;
}

export interface BookGroup {
  title: string;
  description: string;
  books: BookReference[];
}

export interface VideoReference {
  title: string;
  channel: string;
  url: string;
  /** What to expect from the video. */
  note: string;
}

export interface VideoGroup {
  /** Topic id from the catalog, or "course" for videos that cover the whole subject. */
  topic: string;
  title: string;
  videos: VideoReference[];
}

export const bookGroups: BookGroup[] = [
  {
    title: 'Bibliografia básica do plano de ensino',
    description: 'Os três livros indicados pela disciplina. A prova sai daqui.',
    books: [
      { citation: 'WAZLAWICK, Raul Sidnei. <i>Análise e projeto de sistemas de informação orientados a objetos</i>. 2. ed. Rio de Janeiro: Elsevier, 2011.', note: 'Casos de uso e Processo Unificado, passo a passo.' },
      { citation: 'PRESSMAN, Roger S. <i>Engenharia de software</i>. São Paulo: Makron, 1995.', note: 'Camadas, mitos, métricas, pontos por função, testes e manutenção.' },
      { citation: 'SOMMERVILLE, Ian. <i>Engenharia de software</i>. 8. ed. São Paulo: Pearson Addison-Wesley, 2007.', note: 'Processos, requisitos, V&V e evolução de software.' },
    ],
  },
  {
    title: 'Bibliografia complementar do plano de ensino',
    description: 'Indicados pela disciplina para aprofundar Scrum, XP e UML.',
    books: [
      { citation: 'COHN, Mike. <i>Desenvolvimento de software com Scrum: aplicando métodos ágeis com sucesso</i>. Porto Alegre: Bookman, 2011.' },
      { citation: 'LARMAN, Craig. <i>Utilizando UML e padrões: uma introdução à análise e ao projeto orientados a objetos e ao desenvolvimento iterativo</i>. 3. ed. Porto Alegre: Bookman, 2007.' },
      { citation: 'BEZERRA, Eduardo. <i>Princípios de análise e projeto de sistemas com UML</i>. 2. ed. Rio de Janeiro: Elsevier, 2007.' },
      { citation: 'FOWLER, Martin. <i>UML essencial: um breve guia para a linguagem-padrão de modelagem de objetos</i>. 3. ed. Porto Alegre: Bookman, 2005.' },
      { citation: 'TELES, Vinícius Manhães. <i>Extreme Programming: aprenda como encantar seus usuários desenvolvendo software com agilidade e alta qualidade</i>. São Paulo: Novatec, 2004.' },
    ],
  },
  {
    title: 'Edições atuais e outros livros-texto',
    description: 'Os mesmos autores em edições mais novas, e alternativas em português.',
    books: [
      { citation: 'PRESSMAN, Roger S.; MAXIM, Bruce R. <i>Engenharia de software: uma abordagem profissional</i>. 8. ed. Porto Alegre: AMGH, 2016.', note: 'A versão atual do Pressman, com capítulos de métodos ágeis e engenharia web.' },
      { citation: 'SOMMERVILLE, Ian. <i>Engenharia de software</i>. 10. ed. São Paulo: Pearson, 2018.', note: 'Edição atual, com mais espaço para desenvolvimento ágil.' },
      { citation: 'VALENTE, Marco Tulio. <i>Engenharia de software moderna: princípios e práticas para desenvolvimento de software com produtividade</i>. 2020.', note: 'Livro brasileiro, direto e atual. O texto completo é gratuito no site do autor.', url: 'https://engsoftmoderna.info/' },
      { citation: 'WAZLAWICK, Raul Sidnei. <i>Engenharia de software: conceitos e práticas</i>. Rio de Janeiro: Elsevier, 2013.', note: 'Visão geral da área pelo mesmo autor da bibliografia básica.' },
      { citation: 'PFLEEGER, Shari Lawrence. <i>Engenharia de software: teoria e prática</i>. 2. ed. São Paulo: Prentice Hall, 2004.', note: 'Bom em modelos de processo, medição e testes.' },
    ],
  },
  {
    title: 'Para ir além, por assunto',
    description: 'Clássicos e livros especializados para quem quiser se aprofundar em um tópico.',
    books: [
      { citation: 'BROOKS, Frederick P. <i>O mítico homem-mês: ensaios sobre engenharia de software</i>. Rio de Janeiro: Elsevier, 2009.', note: 'Introdução. A origem da Lei de Brooks e do ensaio "Não existe bala de prata".' },
      { citation: 'BECK, Kent. <i>Programação extrema (XP) explicada: acolha as mudanças</i>. Porto Alegre: Bookman, 2004.', note: 'Ágeis. O XP contado pelo criador.' },
      { citation: 'SUTHERLAND, Jeff. <i>Scrum: a arte de fazer o dobro do trabalho na metade do tempo</i>. São Paulo: LeYa, 2014.', note: 'Ágeis. A história e as ideias do Scrum, por um dos criadores.' },
      { citation: 'ANDERSON, David J. <i>Kanban: mudança evolucionária de sucesso para seu negócio de tecnologia</i>. Blue Hole Press, 2011.', note: 'Ágeis. O livro de referência do método Kanban.' },
      { citation: 'GUEDES, Gilleanes T. A. <i>UML 2: uma abordagem prática</i>. São Paulo: Novatec.', note: 'Requisitos. Diagramas de casos de uso com muitos exemplos.' },
      { citation: 'VAZQUEZ, Carlos Eduardo; SIMÕES, Guilherme Siqueira; ALBERT, Renato Machado. <i>Análise de pontos de função: medição, estimativas e gerenciamento de projetos de software</i>. São Paulo: Érica.', note: 'Estimativas. A referência brasileira em pontos de função.' },
      { citation: 'COHN, Mike. <i>Agile estimating and planning</i>. Upper Saddle River: Prentice Hall, 2005.', note: 'Estimativas. Story points, velocidade e Planning Poker (em inglês).' },
      { citation: 'KOSCIANSKI, André; SOARES, Michel dos Santos. <i>Qualidade de software</i>. 2. ed. São Paulo: Novatec, 2007.', note: 'Qualidade. Normas ISO, CMMI e MPS.BR explicados em português.' },
      { citation: 'DELAMARO, Márcio Eduardo; MALDONADO, José Carlos; JINO, Mario. <i>Introdução ao teste de software</i>. 2. ed. Rio de Janeiro: Elsevier, 2016.', note: 'Testes. Técnicas funcionais e estruturais, por pesquisadores brasileiros.' },
      { citation: 'MYERS, Glenford J. <i>The art of software testing</i>. 3. ed. Hoboken: Wiley, 2011.', note: 'Testes. O clássico de onde vêm as definições de "teste bem-sucedido" (em inglês).' },
      { citation: 'FOWLER, Martin. <i>Refatoração: aperfeiçoando o design de códigos existentes</i>. 2. ed. São Paulo: Novatec, 2020.', note: 'Manutenção. Como melhorar código sem mudar o comportamento.' },
      { citation: 'MARTIN, Robert C. <i>Código limpo: habilidades práticas do Agile software</i>. Rio de Janeiro: Alta Books, 2009.', note: 'Manutenção. Código que outras pessoas conseguem manter.' },
      { citation: 'HUNT, Andrew; THOMAS, David. <i>O programador pragmático: de aprendiz a mestre</i>. Porto Alegre: Bookman, 2010.', note: 'Prática profissional. De onde vem o "pato de borracha".' },
    ],
  },
  {
    title: 'Leitura gratuita on-line',
    description: 'Documentos oficiais e livros com texto integral aberto.',
    books: [
      { citation: '<i>Engenharia de Software Moderna</i>, de Marco Tulio Valente: livro completo em HTML.', url: 'https://engsoftmoderna.info/' },
      { citation: '<i>Manifesto para o Desenvolvimento Ágil de Software</i>, em português.', url: 'https://agilemanifesto.org/iso/ptbr/manifesto.html' },
      { citation: '<i>Os doze princípios do software ágil</i>, em português.', url: 'https://agilemanifesto.org/iso/ptbr/principles.html' },
      { citation: '<i>Guia do Scrum</i> (2020), de Schwaber e Sutherland, em português.', url: 'https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-PortugueseBR-3.0.pdf' },
      { citation: '<i>SWEBOK</i>: o guia do corpo de conhecimento em engenharia de software, da IEEE (em inglês).', url: 'https://www.computer.org/education/bodies-of-knowledge/software-engineering' },
      { citation: '<i>MPS.BR</i>: página do programa na SOFTEX, com os guias do modelo.', url: 'https://softex.br/mpsbr/' },
    ],
  },
];

const watch = (id: string): string => 'https://www.youtube.com/watch?v=' + id;
const playlist = (id: string): string => 'https://www.youtube.com/playlist?list=' + id;

export const videoGroups: VideoGroup[] = [
  {
    topic: 'course',
    title: 'Cursos completos',
    videos: [
      { title: 'Engenharia de Software (playlist do curso)', channel: 'UNIVESP', url: playlist('PLxI8Can9yAHfeoA_yMm9iKJVxQprljmL9'), note: 'A disciplina completa da universidade virtual pública de São Paulo.' },
      { title: 'Engenharia de Software do ZERO: Curso Completo em Vídeo', channel: 'Crescencio Lima (IFBA)', url: watch('JbgKl9eIQgY'), note: 'A disciplina inteira em um único vídeo de mais de 7 horas.' },
      { title: 'Curso Completo de Engenharia de Software (playlist)', channel: 'Crescencio Lima (IFBA)', url: playlist('PLcilqwq_HuxUH4-Xttqm9ht_JLtAxnzQs'), note: 'O mesmo curso, dividido por aula.' },
      { title: 'Engenharia de Software Moderna, com Marco Tulio Valente (UFMG)', channel: 'Fronteiras da Engenharia de Software', url: watch('ZM77VScNNPc'), note: 'Conversa com o autor do livro gratuito indicado acima.' },
    ],
  },
  {
    topic: 'introduction',
    title: 'Introdução à Engenharia de Software',
    videos: [
      { title: 'Breve Introdução à Engenharia de Software', channel: 'Marco Tulio Valente', url: watch('6ydOpqdLuKo'), note: 'Introdução curta, pelo professor da UFMG autor do livro gratuito.' },
      { title: 'Engenharia de Software - Apresentação', channel: 'UNIVESP', url: watch('ciQ2FObc3tc'), note: 'Abertura do curso da UNIVESP.' },
      { title: 'Introdução a Engenharia de Software', channel: 'Estudo Na Web', url: watch('M3dK0otBOUY'), note: 'Aula de abertura de um curso de UML.' },
    ],
  },
  {
    topic: 'lifecycles',
    title: 'Modelos de ciclo de vida',
    videos: [
      { title: 'Aula 01 - Modelos de processo de software e atividades de software', channel: 'UNIVESP', url: watch('kO1PSkzTsYc'), note: 'Modelos de processo e atividades do processo de software.' },
      { title: 'Modelo em Cascata - Ciclos de Vida de Desenvolvimento de Software', channel: 'Bóson Treinamentos', url: watch('luCQslwi8pE'), note: 'O modelo cascata em detalhe.' },
      { title: 'Engenharia de Software - Modelo em Espiral de Boehm', channel: 'Tu quer saber mais?', url: watch('GCrxnZZCcYU'), note: 'O modelo dirigido a riscos.' },
      { title: 'Processos de software: entregas incrementais, modelo espiral, RUP', channel: 'Mazer Dv - Ademir Mazer Junior', url: watch('ynoPogjoqIk'), note: 'Incremental, espiral e Processo Unificado na mesma aula.' },
      { title: '#03 - Processos e Modelos de Processo de Software', channel: 'Professor Claudio Sanavria', url: watch('WYmWKUcBjyk'), note: 'Panorama dos modelos de processo.' },
    ],
  },
  {
    topic: 'agile',
    title: 'Metodologias ágeis',
    videos: [
      { title: 'Scrum - Aprenda Scrum em 9 minutos', channel: 'MindMaster', url: watch('XfvQWnRgxG0'), note: 'Visão geral rápida do Scrum.' },
      { title: 'Por que utilizar Metodologias Ágeis? - SCRUM, KANBAN e LEAN', channel: 'Conecta Nuvem', url: watch('LIhKbUHqrbU'), note: 'Scrum, Kanban e Lean no mesmo vídeo.' },
      { title: 'Metodologia Agile Extreme Programming XP', channel: 'Informatica Live', url: watch('S7iH9fR8Xss'), note: 'Apresentação do Extreme Programming.' },
      { title: 'WIP - Porque faz sentido! - Kanban', channel: 'Mundo Compartilhado', url: watch('CmrIvDD4w9M'), note: 'Por que limitar o trabalho em andamento.' },
    ],
  },
  {
    topic: 'requirements',
    title: 'Requisitos e técnicas de levantamento',
    videos: [
      { title: 'Aula 07 - Elicitação e análise de requisitos', channel: 'UNIVESP', url: watch('ME0LrcqbeO0'), note: 'Aula da UNIVESP sobre elicitação e análise.' },
      { title: 'Aula 08 - Validação e gerenciamento de requisitos', channel: 'UNIVESP', url: watch('WOyF1_dEiTA'), note: 'Aula da UNIVESP sobre validação e gerenciamento.' },
      { title: 'Include e Extend em Diagramas de Casos de Uso', channel: 'Dawntech', url: watch('LGkzco2pfyc'), note: 'As duas relações que mais confundem em casos de uso.' },
    ],
  },
  {
    topic: 'estimation',
    title: 'Estimativas, métricas e viabilidade',
    videos: [
      { title: 'Análise de pontos de função', channel: 'Assuntos sobre tecnologia para concursos públicos', url: watch('5ksTvRLupN4'), note: 'De um canal voltado a concursos de TI.' },
      { title: 'Webinar - Análise de Pontos de Função: Medição e Estimativa de Software', channel: 'Fatto Consultoria e Sistemas', url: watch('seq9uKQE65k'), note: 'Por uma consultoria especializada em pontos de função.' },
      { title: 'O que é e como usar o Planning Poker nas suas estimativas', channel: 'A Mente do Gestor, by André Gomes', url: watch('p387JzsOERY'), note: 'Estimativa ágil em equipe.' },
    ],
  },
  {
    topic: 'quality',
    title: 'Qualidade e produto de software',
    videos: [
      { title: 'Gerência e Qualidade de Software - Aula 01 - Visão Geral', channel: 'UNIVESP', url: watch('XiG_Gz-sv48'), note: 'Abertura da disciplina de qualidade da UNIVESP.' },
      { title: 'Qualidade do Produto de Software - ISO/IEC 9126', channel: 'Patrick Brito', url: watch('MImOsStO2ks'), note: 'As seis características da norma.' },
      { title: 'ISO 25010: Modelos e Atributos da Qualidade de Software', channel: 'Crescencio Lima (IFBA)', url: watch('BlN8D7ZvpW8'), note: 'A norma que substituiu a 9126.' },
      { title: 'Comparativo do CMMI versus o MPS.BR - Resumo das principais diferenças!', channel: 'Thiago Jabur', url: watch('AZXFeJ92JvI'), note: 'Os dois modelos de maturidade, comparados.' },
      { title: '67 - Introdução ao MPS.br', channel: 'Eduardo Engenharia de Software', url: watch('PftStdT0q6M'), note: 'O modelo brasileiro e os seus níveis.' },
    ],
  },
  {
    topic: 'testing',
    title: 'Testes, V&V e revisão de software',
    videos: [
      { title: 'Teste de Software: O que são Técnicas de teste | CTFL', channel: 'Mauro de Boni', url: watch('qnORPaQeYt0'), note: 'O que são técnicas de teste, na linha da certificação CTFL.' },
      { title: 'Testes de Software: Conheça a Técnica Tabela de Decisão | CTFL', channel: 'Mauro de Boni', url: watch('4sHZnmrsczY'), note: 'A tabela de decisão, uma técnica caixa-preta.' },
      { title: 'Teste de Software: Técnica de Teste de Caixa Branca', channel: 'programando', url: watch('UtN4BGK82Ew'), note: 'Testes derivados da estrutura do código.' },
      { title: 'Testes de Caixa Branca e Preta em Minutos: Simples e Direto!', channel: 'Robertinha QA', url: watch('3TNm-aP45No'), note: 'Revisão rápida das duas abordagens.' },
    ],
  },
  {
    topic: 'evolution',
    title: 'Implantação, manutenção e engenharia web',
    videos: [
      { title: 'Manutenção de software', channel: 'Fabiane Benitti', url: watch('QJaAj-OOnOg'), note: 'Os tipos de manutenção: corretiva, adaptativa, evolutiva e preventiva.' },
      { title: '45 - Dinâmica da Evolução (Leis de Lehman)', channel: 'Eduardo Engenharia de Software', url: watch('8jdwswEl-E4'), note: 'As leis da evolução de software.' },
      { title: 'Como funciona a deterioração de software? - Leis de Lehman', channel: 'Code By Duda', url: watch('GJuZqN8lZ9M'), note: 'Por que o software "envelhece".' },
      { title: 'O que é um sistema legado?', channel: 'ManageEngine Brasil', url: watch('lDhKzlWMurE'), note: 'Definição e exemplos de sistemas legados.' },
      { title: 'Canary e Blue-Green explicados: como fazer deploy sem derrubar o serviço', channel: 'Bits Conceituais', url: watch('Du7H-2Oxm9g'), note: 'As estratégias de implantação usadas hoje em aplicações web.' },
    ],
  },
];

export function videosForTopic(topicId: string): VideoReference[] {
  return videoGroups.find((group: VideoGroup) => group.topic === topicId)?.videos ?? [];
}
