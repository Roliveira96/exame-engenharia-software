import type { ClassifierConfig } from '../../components/ClassifierGame';
import type { DiagramConfig } from '../../components/DiagramPlayer';
import type { StackConfig } from '../../components/StackExplorer';
import type { RolloutConfig } from '../../labs/RolloutPanel';
import { T } from '../uiText';

export const evolutionLabTitle: string = 'Laboratório · Sala de operações';

export const rolloutTimeline: RolloutConfig = {
  id: 'rollout',
  label: '🔀 Implantação',
  title: 'Estratégias de implantação na linha do tempo',
  intro: 'A cortina amarela é o <b>tempo passando</b>. Veja quando o sistema antigo (cinza) sai de cena e o novo (colorido) assume.',
  duration: 10,
  timeUnit: 'semanas',
  legend: { old: 'Sistema antigo', new: 'Sistema novo' },
  replay: '↺ Repetir a animação',
  riskLabel: 'Risco',
  costLabel: 'Custo',
  levels: ['baixo', 'médio', 'alto'],
  strengthLabel: 'Ponto forte',
  weaknessLabel: 'Ponto fraco',
  whenLabel: 'Quando usar',
  strategies: [
    {
      id: 'direct',
      name: 'Direta (big bang)',
      summary: '<b>Implantação direta.</b> Em uma data marcada, o sistema antigo é desligado e o novo entra no lugar. Não há período de convivência.',
      rows: [
        { label: 'Toda a empresa', segments: [{ from: 0, to: 5, system: 'old' }, { from: 5, to: 10, system: 'new' }] },
      ],
      risk: 3,
      cost: 1,
      strength: 'Rápida e barata: sem trabalho em dobro.',
      weakness: 'Se o novo sistema falhar, não há para onde voltar.',
      when: 'Sistemas simples ou não críticos, ou quando os dois não podem coexistir.',
    },
    {
      id: 'parallel',
      name: 'Paralela',
      summary: '<b>Implantação paralela.</b> Os dois sistemas rodam <b>ao mesmo tempo</b>, com os mesmos dados, e os resultados são comparados. O antigo só é desligado quando o novo se prova confiável.',
      rows: [
        { label: 'Sistema antigo', segments: [{ from: 0, to: 7, system: 'old' }] },
        { label: 'Sistema novo', segments: [{ from: 3, to: 10, system: 'new' }] },
      ],
      risk: 1,
      cost: 3,
      strength: 'A mais segura: o sistema antigo é a retaguarda.',
      weakness: 'Trabalho em dobro para os usuários e dois ambientes para manter.',
      when: 'Sistemas críticos, como folha de pagamento e sistemas bancários.',
    },
    {
      id: 'pilot',
      name: 'Piloto',
      summary: '<b>Implantação piloto.</b> O sistema novo, <b>completo</b>, entra primeiro em <b>uma unidade</b>. Os problemas aparecem em escala pequena e são corrigidos antes de chegar às demais.',
      rows: [
        { label: 'Filial piloto', segments: [{ from: 0, to: 2, system: 'old' }, { from: 2, to: 10, system: 'new' }] },
        { label: 'Filial B', segments: [{ from: 0, to: 6, system: 'old' }, { from: 6, to: 10, system: 'new' }] },
        { label: 'Filial C', segments: [{ from: 0, to: 6, system: 'old' }, { from: 6, to: 10, system: 'new' }] },
      ],
      risk: 2,
      cost: 2,
      strength: 'Os erros ficam contidos em um grupo pequeno.',
      weakness: 'A unidade piloto pode não representar todas as outras.',
      when: 'Organizações com várias unidades parecidas (filiais, lojas, setores).',
    },
    {
      id: 'phased',
      name: 'Por fases',
      summary: '<b>Implantação por fases.</b> O sistema novo entra <b>módulo a módulo</b>, em toda a organização. A cada fase, uma parte do sistema antigo é aposentada.',
      rows: [
        { label: 'Módulo de estoque', segments: [{ from: 0, to: 2, system: 'old' }, { from: 2, to: 10, system: 'new' }] },
        { label: 'Módulo de vendas', segments: [{ from: 0, to: 5, system: 'old' }, { from: 5, to: 10, system: 'new' }] },
        { label: 'Módulo financeiro', segments: [{ from: 0, to: 8, system: 'old' }, { from: 8, to: 10, system: 'new' }] },
      ],
      risk: 2,
      cost: 2,
      strength: 'Usuários se adaptam aos poucos; o problema fica restrito a um módulo.',
      weakness: 'Exige interfaces temporárias entre os módulos novos e os antigos.',
      when: 'Sistemas grandes e modulares, como ERPs.',
    },
  ],
};

export const maintenanceGame: ClassifierConfig = {
  id: 'maintenance',
  label: '🛠️ Manutenção',
  title: 'Que tipo de manutenção é esse?',
  intro: 'Pergunte-se o <b>motivo</b> da mudança: erro, ambiente, pedido novo ou prevenção?',
  rounds: 12,
  categories: [
    { id: 'corrective', label: 'Corretiva', hint: 'consertar defeito', color: 'var(--red)' },
    { id: 'adaptive', label: 'Adaptativa', hint: 'o ambiente mudou', color: 'var(--blue)' },
    { id: 'perfective', label: 'Perfectiva', hint: 'novo requisito ou melhoria', color: 'var(--green)' },
    { id: 'preventive', label: 'Preventiva', hint: 'evitar problema futuro', color: 'var(--yellow)' },
  ],
  items: [
    { text: 'O relatório de vendas soma duas vezes os pedidos cancelados.', category: 'corrective', explanation: 'Um defeito em produção precisa ser corrigido.' },
    { text: 'A Receita Federal mudou o leiaute da nota fiscal eletrônica.', category: 'adaptive', explanation: 'Mudança na legislação é mudança no ambiente externo.' },
    { text: 'Os usuários pedem que o sistema passe a aceitar pagamento por Pix.', category: 'perfective', explanation: 'Novo requisito funcional: manutenção perfectiva (evolutiva).' },
    { text: 'A equipe refatora o módulo de cobrança, que funciona, mas está difícil de entender.', category: 'preventive', explanation: 'Melhora a estrutura para reduzir o risco e o custo de manutenções futuras.' },
    { text: 'O servidor será migrado para uma nova versão do sistema operacional.', category: 'adaptive', explanation: 'O ambiente de execução mudou.' },
    { text: 'O sistema trava quando o nome do cliente tem mais de 60 caracteres.', category: 'corrective', explanation: 'Falha observada em uso.' },
    { text: 'A gerência quer um novo painel com gráficos de desempenho por vendedor.', category: 'perfective', explanation: 'Funcionalidade nova pedida pelo usuário.' },
    { text: 'O banco de dados usado pelo sistema foi descontinuado e será trocado por outro.', category: 'adaptive', explanation: 'Mudança de plataforma tecnológica.' },
    { text: 'A documentação do sistema é atualizada e são acrescentados testes automatizados a módulos antigos.', category: 'preventive', explanation: 'Aumenta a manutenibilidade antes que os problemas apareçam.' },
    { text: 'Os usuários pedem que a tela de busca fique mais rápida, embora ela atenda ao requisito atual.', category: 'perfective', explanation: 'Melhoria de desempenho pedida pelo usuário, sem que haja defeito.' },
    { text: 'O cálculo de juros está arredondando errado na terceira casa decimal.', category: 'corrective', explanation: 'O sistema não se comporta conforme a especificação.' },
    { text: 'A empresa passou a usar outra moeda e o sistema precisa suportá-la por exigência do novo país de operação.', category: 'adaptive', explanation: 'O ambiente de negócio externo mudou.' },
    { text: 'Um trecho com código duplicado em dez lugares é unificado em uma função, sem alterar o comportamento.', category: 'preventive', explanation: 'Reestruturação preventiva.' },
    { text: 'O navegador mais usado pelos clientes lançou uma versão que quebra a página de login.', category: 'adaptive', explanation: 'A causa é a mudança no ambiente (navegador), não um erro original do sistema.' },
  ],
};

export const changeDiagram: DiagramConfig = {
  id: 'change',
  label: '🔁 Ciclos de mudança',
  title: 'O software depois da entrega',
  models: [
    {
      id: 'maintenance',
      name: 'Processo de evolução',
      summary: 'Toda mudança, seja correção, adaptação ou melhoria, percorre o mesmo ciclo e termina em uma <b>nova versão</b>.',
      width: 640,
      height: 300,
      nodes: [
        { id: 'request', label: 'Solicitação\nde mudança', x: 320, y: 45, width: 150, color: 'var(--yellow)' },
        { id: 'impact', label: 'Análise\nde impacto', x: 540, y: 120, width: 150, color: 'var(--red)' },
        { id: 'planning', label: 'Planejamento\nda release', x: 460, y: 250, width: 150, color: 'var(--blue)' },
        { id: 'implementation', label: 'Implementação\nda mudança', x: 180, y: 250, width: 150, color: 'var(--green)' },
        { id: 'release', label: 'Liberação\ndo sistema', x: 100, y: 120, width: 150, color: 'var(--purple)' },
      ],
      edges: [
        { from: 'request', to: 'impact', bend: -18 },
        { from: 'impact', to: 'planning', bend: -18 },
        { from: 'planning', to: 'implementation', bend: -18 },
        { from: 'implementation', to: 'release', bend: -18 },
        { from: 'release', to: 'request', bend: -18 },
      ],
      steps: [
        { nodes: ['request'], caption: '<b>Solicitação de mudança.</b> Vem de um defeito relatado, de uma mudança no ambiente ou de um novo requisito.' },
        { nodes: ['impact'], edges: [0], caption: '<b>Análise de impacto.</b> Quais componentes são afetados? Quanto custa? A <b>rastreabilidade</b> dos requisitos é o que torna essa análise possível.' },
        { nodes: ['planning'], edges: [1], caption: '<b>Planejamento da release.</b> Decide-se quais mudanças (correções, adaptações, melhorias) entram na próxima versão.' },
        { nodes: ['implementation'], edges: [2], caption: '<b>Implementação.</b> É uma iteração do processo de desenvolvimento: revisar requisitos, alterar o projeto e o código e <b>testar de novo</b> (regressão).' },
        { nodes: ['release'], edges: [3], caption: '<b>Liberação.</b> A nova versão é entregue, sob controle da <b>gerência de configuração</b>.' },
        { nodes: ['request'], edges: [4], caption: 'O uso da nova versão gera <b>novas solicitações</b>. É a primeira lei de Lehman em ação: mudança contínua.' },
      ],
    },
    {
      id: 'reengineering',
      name: 'Reengenharia (Pressman)',
      summary: 'Seis atividades em ciclo para dar vida nova a um sistema legado, <b>sem mudar o que ele faz</b>.',
      width: 640,
      height: 330,
      nodes: [
        { id: 'inventory', label: 'Análise de\ninventário', x: 320, y: 40, width: 150, color: 'var(--yellow)' },
        { id: 'documents', label: 'Reestruturação\nde documentos', x: 540, y: 110, width: 150, color: 'var(--orange)' },
        { id: 'reverse', label: 'Engenharia\nreversa', x: 540, y: 225, width: 150, color: 'var(--red)' },
        { id: 'code', label: 'Reestruturação\nde código', x: 320, y: 292, width: 150, color: 'var(--purple)' },
        { id: 'data', label: 'Reestruturação\nde dados', x: 100, y: 225, width: 150, color: 'var(--blue)' },
        { id: 'forward', label: 'Engenharia\ndireta', x: 100, y: 110, width: 150, color: 'var(--green)' },
      ],
      edges: [
        { from: 'inventory', to: 'documents', bend: -14 },
        { from: 'documents', to: 'reverse', bend: -14 },
        { from: 'reverse', to: 'code', bend: -14 },
        { from: 'code', to: 'data', bend: -14 },
        { from: 'data', to: 'forward', bend: -14 },
        { from: 'forward', to: 'inventory', bend: -14 },
      ],
      steps: [
        { nodes: ['inventory'], caption: '<b>Análise de inventário.</b> Listar todas as aplicações, com tamanho, idade e criticidade para o negócio, e escolher as <b>candidatas</b> à reengenharia.' },
        { nodes: ['documents'], edges: [0], caption: '<b>Reestruturação de documentos.</b> Legados têm pouca documentação. Decide-se o que vale documentar: às vezes só o que for alterado.' },
        { nodes: ['reverse'], edges: [1], caption: '<b>Engenharia reversa.</b> Analisar o programa para <b>recuperar o projeto</b>: dados, arquitetura e procedimentos, em um nível mais alto que o código.' },
        { nodes: ['code'], edges: [2], caption: '<b>Reestruturação de código.</b> Reescrever os trechos confusos mantendo a arquitetura e a função.' },
        { nodes: ['data'], edges: [3], caption: '<b>Reestruturação de dados.</b> Rever a arquitetura de dados; costuma forçar mudanças na arquitetura e no código.' },
        { nodes: ['forward'], edges: [4], caption: '<b>Engenharia direta.</b> Com o projeto recuperado, reconstruir o sistema usando métodos e tecnologias atuais.' },
      ],
    },
  ],
};

export const webPyramid: StackConfig = {
  id: 'pyramid',
  label: '🌐 Projeto web',
  title: 'Pirâmide de projeto de WebApps',
  tourLabel: T.lab.tour,
  emptyHint: 'Clique em um nível para ver o que se decide nele.',
  sets: [
    {
      id: 'design',
      name: 'Pirâmide de projeto',
      intro: 'No <b>topo</b> está o que o usuário vê; na <b>base</b>, a tecnologia. Cada nível sustenta o de cima.',
      shape: 'pyramid',
      layers: [
        { id: 'interface', label: 'Projeto de interface', badge: 'usuário', color: 'var(--pink)', detail: '<p>Descreve a estrutura e a organização da interface: leiaute da tela, modos de interação e mecanismos de navegação. Responde: <b>onde estou? o que posso fazer? onde estive e para onde posso ir?</b></p>' },
        { id: 'aesthetic', label: 'Projeto estético', color: 'var(--purple)', detail: '<p>Também chamado de projeto gráfico: a aparência da WebApp. Esquema de cores, tipografia, leiaute geométrico, uso de imagens.</p>' },
        { id: 'content', label: 'Projeto de conteúdo', color: 'var(--blue)', detail: '<p>Define a estrutura e o esboço de todo o conteúdo apresentado e os relacionamentos entre os objetos de conteúdo.</p>' },
        { id: 'navigation', label: 'Projeto de navegação', color: 'var(--teal)', detail: '<p>Representa o fluxo de navegação entre os objetos de conteúdo e as funções, para cada categoria de usuário.</p>' },
        { id: 'architecture', label: 'Projeto arquitetural', color: 'var(--green)', detail: '<p>Identifica a estrutura hipermídia global da WebApp: arquitetura de conteúdo (linear, em grade, hierárquica, em rede) e arquitetura da aplicação (como o padrão MVC).</p>' },
        { id: 'component', label: 'Projeto de componentes', badge: 'tecnologia', color: 'var(--yellow)', detail: '<p>Desenvolve a lógica detalhada de processamento necessária para implementar os componentes funcionais.</p>' },
      ],
    },
  ],
};

export const webAttributesGame: ClassifierConfig = {
  id: 'webapp',
  label: '🕸️ Atributos web',
  title: 'Qual atributo de WebApp explica a situação?',
  intro: 'Pressman lista atributos que tornam as aplicações web diferentes. Reconheça quatro dos mais cobrados.',
  categories: [
    { id: 'load', label: 'Carga imprevisível', hint: 'acessos variam muito', color: 'var(--red)' },
    { id: 'evolution', label: 'Evolução contínua', hint: 'muda o tempo todo', color: 'var(--green)' },
    { id: 'immediacy', label: 'Imediatismo', hint: 'prazo curtíssimo', color: 'var(--yellow)' },
    { id: 'security', label: 'Segurança', hint: 'exposta à rede', color: 'var(--purple)' },
  ],
  items: [
    { text: 'No dia da promoção, o site recebeu cem vezes mais visitas do que em um dia comum.', category: 'load', explanation: 'O número de usuários pode variar em ordens de grandeza.' },
    { text: 'O portal de notícias publica conteúdo novo a cada minuto, sem versões planejadas.', category: 'evolution', explanation: 'WebApps evoluem continuamente, não por releases espaçadas.' },
    { text: 'A campanha começa na sexta-feira e o site precisa estar no ar em cinco dias.', category: 'immediacy', explanation: 'O prazo para colocar no mercado é de dias ou semanas.' },
    { text: 'A loja virtual recebe números de cartão de crédito de qualquer pessoa conectada à internet.', category: 'security', explanation: 'É preciso proteger conteúdo sensível e transmitir dados com segurança.' },
    { text: 'A página de resultados do vestibular cai todo ano no minuto em que a lista é divulgada.', category: 'load', explanation: 'Pico de carga impossível de prever com precisão.' },
    { text: 'A equipe altera preços, banners e textos da loja várias vezes por dia.', category: 'evolution', explanation: 'O conteúdo muda sem parar.' },
    { text: 'Qualquer pessoa no mundo pode tentar acessar a área administrativa do sistema.', category: 'security', explanation: 'A exposição na rede amplia a superfície de ataque.' },
    { text: 'O cliente quer a página do evento publicada antes que o concorrente lance a dele, na semana que vem.', category: 'immediacy', explanation: 'A pressão de tempo é característica do desenvolvimento web.' },
  ],
};
