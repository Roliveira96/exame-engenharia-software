import type { ClassifierConfig } from '../../components/ClassifierGame';
import type { StackConfig } from '../../components/StackExplorer';
import type { WheelConfig } from '../../labs/WheelPanel';
import { T } from '../uiText';

export const qualityLabTitle: string = 'Laboratório · Inspeção de qualidade';

export const qualityWheel: WheelConfig = {
  id: 'wheel',
  label: '🎡 Roda da qualidade',
  title: 'Modelo de qualidade do produto',
  centerLabel: 'QUALIDADE',
  emptyHint: 'Clique em uma fatia para ver a pergunta que ela responde e as suas subcaracterísticas.',
  subcharacteristicsLabel: 'Subcaracterísticas',
  models: [
    {
      id: 'iso9126',
      name: 'ISO/IEC 9126 · 6 características',
      note: 'O modelo cobrado na bibliografia da disciplina. Cada característica se desdobra em subcaracterísticas mensuráveis.',
      characteristics: [
        { id: 'functionality', label: 'Funcionalidade', color: 'var(--blue)', question: 'O software <b>faz o que é necessário</b>? Satisfaz as necessidades explícitas e implícitas?', subcharacteristics: ['adequação', 'acurácia', 'interoperabilidade', 'segurança de acesso', 'conformidade'] },
        { id: 'reliability', label: 'Confiabilidade', color: 'var(--green)', question: 'O software <b>mantém o nível de desempenho</b> sob as condições estabelecidas?', subcharacteristics: ['maturidade', 'tolerância a falhas', 'recuperabilidade'] },
        { id: 'usability', label: 'Usabilidade', color: 'var(--purple)', question: 'É <b>fácil de entender, aprender e operar</b>?', subcharacteristics: ['inteligibilidade', 'apreensibilidade', 'operacionalidade', 'atratividade'] },
        { id: 'efficiency', label: 'Eficiência', color: 'var(--yellow)', question: 'O desempenho é adequado à <b>quantidade de recursos</b> usada?', subcharacteristics: ['comportamento em relação ao tempo', 'utilização de recursos'] },
        { id: 'maintainability', label: 'Manutenibilidade', color: 'var(--pink)', question: 'É <b>fácil de modificar</b> para corrigir, adaptar ou melhorar?', subcharacteristics: ['analisabilidade', 'modificabilidade', 'estabilidade', 'testabilidade'] },
        { id: 'portability', label: 'Portabilidade', color: 'var(--teal)', question: 'É <b>fácil de transferir</b> para outro ambiente?', subcharacteristics: ['adaptabilidade', 'capacidade para ser instalado', 'coexistência', 'capacidade para substituir'] },
      ],
    },
    {
      id: 'iso25010',
      name: 'ISO/IEC 25010 · 8 características',
      note: 'A sucessora (família SQuaRE). Compare: <b>segurança</b> e <b>compatibilidade</b> deixaram de ser subcaracterísticas e ganharam fatia própria.',
      characteristics: [
        { id: 'suitability', label: 'Adequação funcional', color: 'var(--blue)', question: 'As funções atendem às necessidades declaradas e implícitas?', subcharacteristics: ['completude funcional', 'correção funcional', 'pertinência funcional'] },
        { id: 'performance', label: 'Eficiência de desempenho', color: 'var(--yellow)', question: 'Como é o desempenho em relação aos recursos usados?', subcharacteristics: ['comportamento temporal', 'utilização de recursos', 'capacidade'] },
        { id: 'compatibility', label: 'Compatibilidade', color: 'var(--orange)', question: 'Consegue trocar informações e conviver com outros produtos?', subcharacteristics: ['coexistência', 'interoperabilidade'] },
        { id: 'usability', label: 'Usabilidade', color: 'var(--purple)', question: 'Pode ser usado com eficácia, eficiência e satisfação?', subcharacteristics: ['reconhecimento de adequação', 'apreensibilidade', 'operabilidade', 'proteção contra erro do usuário', 'estética da interface', 'acessibilidade'] },
        { id: 'reliability', label: 'Confiabilidade', color: 'var(--green)', question: 'Executa as funções sob as condições e pelo tempo especificados?', subcharacteristics: ['maturidade', 'disponibilidade', 'tolerância a falhas', 'recuperabilidade'] },
        { id: 'security', label: 'Segurança', color: 'var(--red)', question: 'Protege informações e dados conforme o nível de autorização?', subcharacteristics: ['confidencialidade', 'integridade', 'não repúdio', 'responsabilização', 'autenticidade'] },
        { id: 'maintainability', label: 'Manutenibilidade', color: 'var(--pink)', question: 'Pode ser modificado com eficácia e eficiência?', subcharacteristics: ['modularidade', 'reusabilidade', 'analisabilidade', 'modificabilidade', 'testabilidade'] },
        { id: 'portability', label: 'Portabilidade', color: 'var(--teal)', question: 'Pode ser transferido de um ambiente para outro?', subcharacteristics: ['adaptabilidade', 'instalabilidade', 'substituibilidade'] },
      ],
    },
  ],
};

export const characteristicGame: ClassifierConfig = {
  id: 'characteristic',
  label: '🔎 Qual característica?',
  title: 'Qual característica da ISO/IEC 9126?',
  intro: 'Cada relato de avaliação aponta para uma das seis características de qualidade do produto.',
  rounds: 12,
  categories: [
    { id: 'functionality', label: 'Funcionalidade', hint: 'faz o que precisa', color: 'var(--blue)' },
    { id: 'reliability', label: 'Confiabilidade', hint: 'não falha, se recupera', color: 'var(--green)' },
    { id: 'usability', label: 'Usabilidade', hint: 'fácil de usar', color: 'var(--purple)' },
    { id: 'efficiency', label: 'Eficiência', hint: 'tempo e recursos', color: 'var(--yellow)' },
    { id: 'maintainability', label: 'Manutenibilidade', hint: 'fácil de modificar', color: 'var(--pink)' },
    { id: 'portability', label: 'Portabilidade', hint: 'muda de ambiente', color: 'var(--teal)' },
  ],
  items: [
    { text: 'O cálculo do imposto retorna valores com erro de centavos em algumas notas.', category: 'functionality', explanation: 'Acurácia: os resultados não estão corretos. É subcaracterística de funcionalidade.' },
    { text: 'Após uma queda de energia, o sistema restaurou os dados e voltou a operar em dois minutos.', category: 'reliability', explanation: 'Recuperabilidade, subcaracterística de confiabilidade.' },
    { text: 'Os usuários levam uma semana para aprender a emitir um pedido.', category: 'usability', explanation: 'Apreensibilidade: facilidade de aprender a usar.' },
    { text: 'A tela de busca demora 12 segundos para responder com poucos usuários conectados.', category: 'efficiency', explanation: 'Comportamento em relação ao tempo.' },
    { text: 'Para mudar uma regra de desconto é preciso alterar 40 arquivos e ninguém sabe o impacto.', category: 'maintainability', explanation: 'Modificabilidade e analisabilidade ruins.' },
    { text: 'O sistema só roda em uma versão específica do Windows e não instala em outras.', category: 'portability', explanation: 'Adaptabilidade e capacidade para ser instalado.' },
    { text: 'Usuários sem permissão conseguem abrir o relatório de salários.', category: 'functionality', explanation: 'Segurança de acesso é subcaracterística de funcionalidade na ISO 9126.' },
    { text: 'O aplicativo consome 3 GB de memória para exibir uma lista simples.', category: 'efficiency', explanation: 'Utilização de recursos.' },
    { text: 'O sistema trava duas vezes por dia sem motivo aparente.', category: 'reliability', explanation: 'Maturidade: baixa frequência de falhas é o que se espera.' },
    { text: 'Não há testes automatizados e o código não permite testar um módulo isoladamente.', category: 'maintainability', explanation: 'Testabilidade é subcaracterística de manutenibilidade.' },
    { text: 'O sistema não consegue trocar dados com o ERP da empresa, embora isso tenha sido pedido.', category: 'functionality', explanation: 'Interoperabilidade, na ISO 9126, está em funcionalidade.' },
    { text: 'Os botões têm nomes ambíguos e os usuários não entendem para que servem.', category: 'usability', explanation: 'Inteligibilidade: facilidade de compreender o conceito e o uso.' },
    { text: 'O novo sistema substitui o antigo sem exigir mudanças no restante do ambiente.', category: 'portability', explanation: 'Capacidade para substituir.' },
    { text: 'Quando um serviço externo cai, o sistema continua funcionando com os dados em cache.', category: 'reliability', explanation: 'Tolerância a falhas.' },
  ],
};

export const maturityStack: StackConfig = {
  id: 'maturity',
  label: '🪜 Maturidade',
  title: 'Escada de maturidade do processo',
  tourLabel: T.lab.tour,
  emptyHint: 'Clique em um degrau para ver o que a organização precisa demonstrar naquele nível.',
  sets: [
    {
      id: 'cmmi',
      name: 'CMMI · 5 níveis',
      intro: 'Representação por estágios. Cada nível é a base do seguinte: <b>não se pula degrau</b>.',
      shape: 'ladder',
      layers: [
        { id: 'l5', label: '5 · Em otimização', badge: 'melhoria contínua', color: 'var(--green)', detail: '<p>O foco é a <b>melhoria contínua</b> do processo, com base na análise das causas comuns de variação e na adoção de inovações.</p><p class="muted">Áreas: análise causal e resolução, gestão do desempenho organizacional.</p>' },
        { id: 'l4', label: '4 · Gerenciado quantitativamente', badge: 'controle estatístico', color: 'var(--teal)', detail: '<p>O desempenho do processo é <b>medido e controlado</b> com técnicas estatísticas. A organização consegue <b>prever</b> resultados.</p><p class="muted">Áreas: desempenho do processo organizacional, gestão quantitativa de projeto.</p>' },
        { id: 'l3', label: '3 · Definido', badge: 'processo padrão', color: 'var(--blue)', detail: '<p>Existe um <b>processo padrão da organização</b>, documentado, que cada projeto <b>adapta</b>. A postura passa de reativa a <b>proativa</b>.</p><p class="muted">Áreas: desenvolvimento de requisitos, solução técnica, integração, verificação, validação, gestão de riscos, treinamento.</p>' },
        { id: 'l2', label: '2 · Gerenciado', badge: 'disciplina por projeto', color: 'var(--purple)', detail: '<p>Os projetos são <b>planejados, executados, medidos e controlados</b>. A disciplina existe, mas <b>por projeto</b>: cada um pode fazer de um jeito.</p><p class="muted">Áreas: gestão de requisitos, planejamento e controle de projeto, gestão de configuração, medição e análise, garantia da qualidade.</p>' },
        { id: 'l1', label: '1 · Inicial', badge: 'caos e heróis', color: 'var(--red)', detail: '<p>Processo <b>imprevisível</b>, pouco controlado e <b>reativo</b>. O sucesso depende do esforço individual, e os resultados não se repetem.</p><p><b>Em prova:</b> o nível 1 não tem áreas de processo; toda organização já parte dele.</p>' },
      ],
    },
    {
      id: 'mpsbr',
      name: 'MPS.BR · 7 níveis',
      intro: 'Modelo brasileiro (SOFTEX). A escala vai de <b>G</b> (base) a <b>A</b> (topo): mais degraus, subida mais suave.',
      shape: 'ladder',
      layers: [
        { id: 'a', label: 'A · Em otimização', badge: '≈ CMMI 5', color: 'var(--green)', detail: '<p>Melhoria contínua dos processos por meio de mudanças incrementais e inovações.</p>' },
        { id: 'b', label: 'B · Gerenciado quantitativamente', badge: '≈ CMMI 4', color: 'var(--teal)', detail: '<p>Os processos selecionados são controlados com técnicas estatísticas e quantitativas.</p>' },
        { id: 'c', label: 'C · Definido', badge: '≈ CMMI 3', color: 'var(--blue)', detail: '<p>Acrescenta gerência de riscos, desenvolvimento para reutilização e gerência de decisões.</p>' },
        { id: 'd', label: 'D · Largamente definido', color: 'var(--indigo)', detail: '<p>Entram os processos de engenharia: desenvolvimento de requisitos, projeto e construção do produto, integração, verificação e validação.</p>' },
        { id: 'e', label: 'E · Parcialmente definido', color: 'var(--purple)', detail: '<p>A organização passa a ter processo padrão: definição e avaliação do processo organizacional, gerência de recursos humanos e de reutilização.</p>' },
        { id: 'f', label: 'F · Gerenciado', badge: '≈ CMMI 2', color: 'var(--pink)', detail: '<p>Acrescenta medição, garantia da qualidade, gerência de configuração, aquisição e gerência de portfólio de projetos.</p>' },
        { id: 'g', label: 'G · Parcialmente gerenciado', badge: 'primeiro degrau', color: 'var(--red)', detail: '<p>O primeiro nível a ser alcançado. Exige apenas dois processos: <b>gerência de projetos</b> e <b>gerência de requisitos</b>.</p><p><b>Em prova:</b> G é o nível <b>mais baixo</b>, não o mais alto.</p>' },
      ],
    },
  ],
};

export const costGame: ClassifierConfig = {
  id: 'cost',
  label: '💰 Custo da qualidade',
  title: 'Em qual categoria de custo isso entra?',
  intro: 'Gastos para <b>obter</b> qualidade (prevenção e avaliação) e perdas pela <b>falta</b> dela (falhas internas e externas).',
  categories: [
    { id: 'prevention', label: 'Prevenção', hint: 'evitar o defeito', color: 'var(--green)' },
    { id: 'appraisal', label: 'Avaliação', hint: 'procurar o defeito', color: 'var(--blue)' },
    { id: 'internal', label: 'Falha interna', hint: 'achado antes da entrega', color: 'var(--yellow)' },
    { id: 'external', label: 'Falha externa', hint: 'achado pelo cliente', color: 'var(--red)' },
  ],
  items: [
    { text: 'Treinamento da equipe em técnicas de revisão de código.', category: 'prevention', explanation: 'Treinar é investir para que o defeito não seja introduzido.' },
    { text: 'Execução da bateria de testes de sistema.', category: 'appraisal', explanation: 'Testar é avaliar o produto em busca de defeitos.' },
    { text: 'Reescrever um módulo que falhou nos testes de integração.', category: 'internal', explanation: 'Retrabalho antes da entrega.' },
    { text: 'Equipe de suporte atendendo reclamações de clientes sobre um erro em produção.', category: 'external', explanation: 'O defeito chegou ao cliente.' },
    { text: 'Elaboração do plano de qualidade do projeto.', category: 'prevention', explanation: 'Planejamento da qualidade é custo de prevenção.' },
    { text: 'Inspeção formal do documento de requisitos.', category: 'appraisal', explanation: 'Inspecionar um produto de trabalho é avaliação.' },
    { text: 'Multa contratual por indisponibilidade do sistema entregue.', category: 'external', explanation: 'Perda causada por falha após a entrega.' },
    { text: 'Horas gastas depurando um defeito encontrado no teste de unidade.', category: 'internal', explanation: 'Análise e reparo de falha detectada internamente.' },
    { text: 'Compra de uma ferramenta de análise estática para apoiar os desenvolvedores.', category: 'prevention', explanation: 'Investimento em meios para evitar defeitos.' },
    { text: 'Envio de uma versão corretiva de emergência a todos os clientes.', category: 'external', explanation: 'Correção e redistribuição depois da entrega.' },
  ],
};

export const scopeGame: ClassifierConfig = {
  id: 'scope',
  label: '⚖️ Produto ou processo?',
  title: 'Qualidade de produto ou de processo?',
  intro: 'Normas, modelos e evidências: cada um fala do <b>software pronto</b> ou de <b>como ele é feito</b>.',
  categories: [
    { id: 'product', label: 'Produto', hint: 'o software construído', color: 'var(--blue)' },
    { id: 'process', label: 'Processo', hint: 'como se constrói', color: 'var(--green)' },
  ],
  items: [
    { text: 'ISO/IEC 9126', category: 'product', explanation: 'Modelo de qualidade do produto, com seis características.' },
    { text: 'CMMI', category: 'process', explanation: 'Modelo de maturidade e capacidade de processos.' },
    { text: 'MPS.BR', category: 'process', explanation: 'Modelo brasileiro de melhoria de processo de software.' },
    { text: 'ISO/IEC 25010', category: 'product', explanation: 'Sucessora da 9126: qualidade do produto e qualidade em uso.' },
    { text: 'ISO/IEC 12207', category: 'process', explanation: 'Define os processos do ciclo de vida de software.' },
    { text: 'Fatores de qualidade de McCall', category: 'product', explanation: 'Operação, revisão e transição do produto.' },
    { text: 'ISO/IEC 15504 (SPICE)', category: 'process', explanation: 'Avaliação da capacidade de processos.' },
    { text: '"O tempo médio entre falhas do sistema é de 400 horas."', category: 'product', explanation: 'Medida de confiabilidade do software em operação.' },
    { text: '"Todos os projetos seguem o mesmo roteiro de revisão antes de liberar uma versão."', category: 'process', explanation: 'Descreve a forma padronizada de trabalhar.' },
    { text: '"A interface foi aprovada em testes com usuários reais."', category: 'product', explanation: 'Usabilidade é característica do produto.' },
  ],
};
