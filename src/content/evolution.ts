import type { Topic } from './Topic';

export const evolution: Topic = {
  id: 'evolution',
  number: 8,
  unit: 4,
  title: 'Implantação, manutenção e engenharia web',
  subtitle: 'estratégias de implantação · tipos de manutenção · Lehman · reengenharia · WebApps',
  icon: '🚀',
  color: '--c-evo',
  summary: 'Como colocar o software em produção, mantê-lo vivo depois da entrega e o que muda quando o sistema é uma aplicação web.',
  tags: ['direta × paralela', 'corretiva · adaptativa', 'leis de Lehman', 'reengenharia', 'WebApps'],
  lessons: [
    {
      id: 'evo-deploy',
      funFact: `Em 2018, o banco britânico <b>TSB</b> migrou todos os clientes para uma plataforma nova em um único fim de semana. Resultado: cerca de <b>1,9 milhão de clientes</b> ficaram sem acesso às contas, alguns por semanas.`,
      icon: '📦',
      title: 'Implantação de software',
      body: `
        <p><b>Implantação</b> é a atividade que leva o software do ambiente de desenvolvimento para o <b>ambiente de produção</b>, tornando-o disponível aos usuários. No arcabouço de Pressman, engloba <b>entrega, suporte e feedback</b>; no RUP, corresponde à fase de <b>transição</b>.</p>
        <p>Atividades típicas:</p>
        <ul>
          <li><b>Planejamento</b> da implantação e do <b>plano de retorno</b> (o que fazer se der errado).</li>
          <li><b>Preparação do ambiente</b>: hardware, rede, banco de dados, licenças.</li>
          <li><b>Instalação e configuração</b> do sistema.</li>
          <li><b>Conversão (migração) de dados</b> do sistema antigo.</li>
          <li><b>Treinamento</b> dos usuários e da equipe de suporte.</li>
          <li><b>Documentação</b>: manual do usuário, manual de instalação e de operação.</li>
          <li><b>Teste de aceitação</b> no ambiente real e <b>suporte</b> inicial.</li>
        </ul>
        <p>Princípios de Pressman para a implantação: gerenciar as <b>expectativas</b> do cliente; montar e testar o <b>pacote completo</b> de entrega; estabelecer o <b>suporte</b> antes de entregar; fornecer <b>material instrucional</b>; e <b>corrigir antes de entregar</b> o software com defeito.</p>`,
      examTip: 'Implantar não é só instalar: <b>migração de dados</b> e <b>treinamento</b> costumam ser os pontos mais esquecidos, e os mais cobrados.',
    },
    {
      id: 'evo-strategies',
      funFact: `A implantação direta é chamada de <b>big bang</b> porque tudo acontece de uma vez. Quando funciona, ninguém lembra; quando falha, vira manchete, como no caso do banco TSB.`,
      icon: '🔀',
      title: 'Estratégias de implantação (conversão)',
      body: `
        <table class="table">
          <tr><th>Estratégia</th><th>Como funciona</th><th>Risco</th><th>Custo</th></tr>
          <tr><td><b>Direta</b> (<i>big bang</i>)</td><td>o sistema antigo é desligado e o novo entra no mesmo instante</td><td><b>alto</b></td><td>baixo</td></tr>
          <tr><td><b>Paralela</b></td><td>os dois sistemas operam juntos por um período, e os resultados são comparados</td><td><b>baixo</b></td><td><b>alto</b> (trabalho em dobro)</td></tr>
          <tr><td><b>Piloto</b></td><td>o sistema novo é implantado primeiro em <b>uma unidade</b> (filial, setor) e, se der certo, nas demais</td><td>médio</td><td>médio</td></tr>
          <tr><td><b>Por fases</b> (gradual)</td><td>o sistema novo entra <b>módulo a módulo</b>, substituindo o antigo aos poucos</td><td>médio</td><td>médio</td></tr>
        </table>
        <p>Regra prática: quanto mais <b>crítico</b> o sistema, menos se aceita a conversão direta. A paralela é a mais segura, pois sempre há o sistema antigo para recorrer, mas exige manter e alimentar dois sistemas.</p>`,
      examTip: '<b>Piloto</b> divide por <b>local ou grupo de usuários</b>; <b>por fases</b> divide por <b>funcionalidade ou módulo</b>. É a troca que a prova faz.',
      labCue: { label: 'Ver as estratégias na linha do tempo', cue: 'rollout:direct' },
    },
    {
      id: 'evo-maintenance',
      funFact: `O <b>bug do milênio</b> (Y2K) foi a maior manutenção da história: anos guardados com dois dígitos fariam 2000 virar 1900. O mundo gastou <b>centenas de bilhões de dólares</b> revisando sistemas, e por isso quase nada quebrou.`,
      icon: '🛠️',
      title: 'Manutenção: os quatro tipos',
      body: `
        <p><b>Manutenção</b> é a modificação do software <b>depois</b> que ele entrou em uso. É a fase mais longa e, em geral, a mais cara do ciclo de vida: costuma consumir de <b>60% a 80%</b> do custo total.</p>
        <table class="table">
          <tr><th>Tipo</th><th>Motivo</th><th>Exemplo</th></tr>
          <tr><td><b>Corretiva</b></td><td>corrigir <b>defeitos</b> descobertos em uso</td><td>o relatório soma errado os descontos</td></tr>
          <tr><td><b>Adaptativa</b></td><td>acompanhar mudanças no <b>ambiente externo</b>: sistema operacional, hardware, banco de dados, <b>legislação</b></td><td>adequar a nota fiscal a uma nova regra da Receita</td></tr>
          <tr><td><b>Perfectiva</b> (evolutiva)</td><td>atender a <b>novos requisitos</b> ou melhorar funções e desempenho</td><td>incluir pagamento por Pix</td></tr>
          <tr><td><b>Preventiva</b></td><td>melhorar a estrutura para <b>evitar problemas futuros</b> e facilitar manutenções (reengenharia, refatoração)</td><td>reestruturar um módulo confuso antes que ele quebre</td></tr>
        </table>
        <p>Sommerville mede o esforço assim: cerca de <b>65%</b> em <b>adição ou modificação de funcionalidade</b>, <b>18%</b> em <b>adaptação ao ambiente</b> e <b>17%</b> em <b>correção de defeitos</b>. Ou seja, a maior parte da manutenção <b>não</b> é consertar erro.</p>`,
      examTip: 'Mudança na <b>lei</b>, no <b>sistema operacional</b> ou no <b>hardware</b> é <b>adaptativa</b>, mesmo que pareça "nova funcionalidade". Novo <b>desejo do usuário</b> é perfectiva.',
      mnemonic: '<b>C-A-P-P</b>: <b>C</b>orretiva (erro), <b>A</b>daptativa (ambiente), <b>P</b>erfectiva (pedido), <b>P</b>reventiva (prevenir).',
      labCue: { label: 'Classificar pedidos de manutenção', cue: 'maintenance' },
    },
    {
      id: 'evo-process',
      funFact: `Linus Torvalds criou o <b>Git</b> em 2005, em poucos dias, depois que o Linux perdeu a licença da ferramenta de controle de versão que usava. O nome, segundo ele, é uma gíria britânica para "pessoa desagradável".`,
      icon: '🔁',
      title: 'Processo de manutenção e gerência de configuração',
      body: `
        <p>O processo de evolução (Sommerville) é um ciclo:</p>
        <ol>
          <li><b>Solicitação de mudança</b> (correção, adaptação ou melhoria).</li>
          <li><b>Análise de impacto</b>: quanto do sistema é afetado e quanto custa.</li>
          <li><b>Planejamento da release</b>: quais mudanças entram na próxima versão.</li>
          <li><b>Implementação da mudança</b> (uma iteração do processo de desenvolvimento).</li>
          <li><b>Liberação</b> da nova versão do sistema.</li>
        </ol>
        <p>Em <b>correções de emergência</b>, altera-se o código direto e a documentação fica para depois, o que acelera o <b>envelhecimento</b> do software.</p>
        <p><b>Por que manter custa mais que desenvolver?</b> A equipe que mantém raramente é a que construiu; contratos de desenvolvimento e de manutenção são separados (falta incentivo para escrever código fácil de manter); a manutenção é vista como tarefa menor, dada aos menos experientes; e a estrutura do programa se degrada com o tempo.</p>
        <p>A <b>gerência de configuração de software</b> controla essa evolução: <b>identificação</b> dos itens de configuração, <b>controle de versões</b>, <b>controle de mudanças</b>, <b>auditoria</b> e <b>relato de status</b>. Uma <b>linha-base</b> (<i>baseline</i>) é uma versão formalmente aprovada, que só muda por procedimento formal.</p>`,
      labCue: { label: 'Ver o ciclo de mudança', cue: 'change:maintenance' },
    },
    {
      id: 'evo-lehman',
      funFact: `Lehman formulou as leis observando o crescimento do <b>OS/360</b>, da IBM: o mesmo sistema cujo desenvolvimento inspirou Brooks a escrever <i>O Mítico Homem-Mês</i>.`,
      icon: '📜',
      title: 'Leis de Lehman',
      body: `
        <p>Lehman e Belady estudaram o crescimento de grandes sistemas e formularam as <b>leis da evolução de software</b>:</p>
        <table class="table">
          <tr><th>Lei</th><th>Enunciado</th></tr>
          <tr><td><b>Mudança contínua</b></td><td>um programa usado em ambiente real <b>precisa mudar</b>, ou se torna cada vez menos útil</td></tr>
          <tr><td><b>Complexidade crescente</b></td><td>à medida que muda, a estrutura fica <b>mais complexa</b>, a menos que se gaste esforço para preservá-la</td></tr>
          <tr><td>Evolução de programas de grande porte</td><td>a evolução é um processo <b>autorregulado</b>; tamanho, intervalo entre versões e erros são quase constantes a cada versão</td></tr>
          <tr><td>Estabilidade organizacional</td><td>a taxa de desenvolvimento é quase constante, independentemente dos recursos dedicados</td></tr>
          <tr><td>Conservação da familiaridade</td><td>a mudança incremental em cada versão é aproximadamente constante</td></tr>
          <tr><td>Crescimento contínuo</td><td>a funcionalidade precisa <b>crescer</b> para manter a satisfação do usuário</td></tr>
          <tr><td>Qualidade em declínio</td><td>a qualidade <b>parecerá cair</b> se o sistema não for adaptado ao ambiente</td></tr>
          <tr><td>Sistema de feedback</td><td>os processos de evolução são sistemas de retroalimentação com vários agentes e laços</td></tr>
        </table>`,
      examTip: 'As duas primeiras bastam para a maioria das questões: <b>mudança contínua</b> e <b>complexidade crescente</b>.',
    },
    {
      id: 'evo-reengineering',
      funFact: `Em 2020, com a explosão de pedidos de seguro-desemprego na pandemia, estados americanos fizeram um apelo público por <b>programadores de COBOL</b>: os sistemas, com décadas de idade, não davam conta e pouca gente ainda sabia mantê-los.`,
      icon: '♻️',
      title: 'Sistemas legados, reengenharia e engenharia reversa',
      body: `
        <p><b>Sistema legado</b> é um sistema antigo, ainda essencial ao negócio, feito com tecnologia ultrapassada e difícil de manter.</p>
        <table class="table">
          <tr><th>Termo</th><th>Significado</th></tr>
          <tr><td><b>Engenharia reversa</b></td><td>analisar o software para <b>recuperar</b> o projeto e a especificação a partir do código. <b>Não altera</b> o sistema.</td></tr>
          <tr><td><b>Reengenharia</b></td><td><b>reestruturar ou reescrever</b> parte ou todo o sistema legado, <b>sem mudar a funcionalidade</b>, para torná-lo mais fácil de manter</td></tr>
          <tr><td><b>Refatoração</b></td><td>melhoria <b>contínua</b> da estrutura do código durante o desenvolvimento, sem mudar o comportamento</td></tr>
          <tr><td><b>Engenharia direta</b> (<i>forward</i>)</td><td>reconstruir o sistema com métodos modernos, a partir do projeto recuperado</td></tr>
        </table>
        <p><b>Modelo de reengenharia de Pressman</b> (ciclo de seis atividades): análise de inventário → reestruturação de documentos → engenharia reversa → reestruturação de código → reestruturação de dados → engenharia direta.</p>
        <p><b>O que fazer com um legado?</b> (Sommerville) Avaliam-se a <b>qualidade técnica</b> e o <b>valor de negócio</b>:</p>
        <ul>
          <li>baixa qualidade, baixo valor → <b>descartar</b>;</li>
          <li>baixa qualidade, alto valor → <b>reengenharia</b> ou <b>substituição</b>;</li>
          <li>alta qualidade, baixo valor → manter ou descartar, conforme o custo;</li>
          <li>alta qualidade, alto valor → <b>continuar a manutenção</b> normal.</li>
        </ul>`,
      examTip: 'Reengenharia <b>não adiciona funcionalidade</b>: muda a forma, não a função. Se o enunciado fala em "novos requisitos", é manutenção perfectiva.',
      labCue: { label: 'Ver o ciclo de reengenharia', cue: 'change:reengineering' },
    },
    {
      id: 'evo-web',
      funFact: `O <b>primeiro site da história</b> entrou no ar em 1991, criado por Tim Berners-Lee no CERN. O endereço info.cern.ch ainda funciona e mostra uma réplica daquela página.`,
      icon: '🌐',
      title: 'Engenharia de software para web',
      body: `
        <p>A <b>engenharia web</b> aplica princípios de engenharia ao desenvolvimento de <b>aplicações web</b> (WebApps). Pressman defende que elas são diferentes o bastante para pedir adaptações, por causa destes atributos:</p>
        <table class="table">
          <tr><td><b>Uso intensivo de rede</b></td><td>residem em uma rede e atendem a uma comunidade diversificada de clientes</td></tr>
          <tr><td><b>Concorrência</b></td><td>muitos usuários acessam ao mesmo tempo</td></tr>
          <tr><td><b>Carga imprevisível</b></td><td>o número de usuários varia em ordens de grandeza de um dia para o outro</td></tr>
          <tr><td><b>Desempenho</b></td><td>se demorar, o usuário vai embora</td></tr>
          <tr><td><b>Disponibilidade</b></td><td>espera-se acesso 24 horas por dia, 7 dias por semana</td></tr>
          <tr><td><b>Orientada a dados</b></td><td>a função principal é apresentar conteúdo (texto, imagem, áudio, vídeo)</td></tr>
          <tr><td><b>Sensível ao conteúdo</b></td><td>a qualidade e a estética do conteúdo determinam a qualidade percebida</td></tr>
          <tr><td><b>Evolução contínua</b></td><td>não evolui por versões planejadas, mas continuamente</td></tr>
          <tr><td><b>Imediatismo</b></td><td>prazos de dias ou semanas para colocar no ar</td></tr>
          <tr><td><b>Segurança</b></td><td>exposta a toda a rede, precisa proteger dados e transações</td></tr>
          <tr><td><b>Estética</b></td><td>a aparência é parte inseparável do sucesso</td></tr>
        </table>
        <p><b>Categorias de WebApps:</b> informacional, de download, personalizável, de interação, de entrada do usuário, orientada a transações, orientada a serviços, portal, de acesso a banco de dados e de <i>data warehousing</i>.</p>`,
      examTip: 'Os três atributos mais citados como diferencial das WebApps: <b>imediatismo</b>, <b>evolução contínua</b> e <b>segurança</b> (além da estética).',
    },
    {
      id: 'evo-web-process',
      funFact: `O lema antigo do Facebook era "<b>move fast and break things</b>" (ande rápido e quebre coisas). Em 2014, a empresa trocou por um bem menos empolgante: "ande rápido com infraestrutura estável".`,
      icon: '🧭',
      title: 'Processo, projeto e teste de WebApps',
      body: `
        <p>Por causa do imediatismo e da evolução contínua, o processo de engenharia web é <b>ágil, iterativo e incremental</b>. Atividades do arcabouço:</p>
        <ol>
          <li><b>Comunicação</b>: formulação (metas e público) e levantamento de requisitos.</li>
          <li><b>Planejamento</b> do incremento.</li>
          <li><b>Modelagem</b>: análise (de <b>conteúdo</b>, de <b>interação</b>, <b>funcional</b> e de <b>configuração</b>) e projeto.</li>
          <li><b>Construção</b>: codificação e teste.</li>
          <li><b>Implantação</b>: entrega e avaliação pelo usuário.</li>
        </ol>
        <p>O projeto é descrito pela <b>pirâmide de projeto de WebApps</b>, do que o usuário vê até a tecnologia: projeto de <b>interface</b>, <b>estético</b>, de <b>conteúdo</b>, de <b>navegação</b>, <b>arquitetural</b> e de <b>componentes</b>.</p>
        <p>Os <b>testes de WebApp</b> seguem a mesma lógica: teste de conteúdo, de interface, de navegação, de componente, de <b>configuração</b> (navegadores, sistemas, dispositivos), de <b>desempenho</b> (carga e estresse) e de <b>segurança</b>.</p>
        <p>Dimensões de qualidade de uma WebApp: usabilidade, funcionalidade, confiabilidade, eficiência e manutenibilidade, além de <b>segurança, disponibilidade, escalabilidade</b> e <b>prazo de colocação no mercado</b>.</p>`,
      mnemonic: 'Pirâmide, do topo à base: <b>I-E-C-N-A-C</b> (Interface, Estético, Conteúdo, Navegação, Arquitetura, Componentes).',
      labCue: { label: 'Explorar a pirâmide de projeto', cue: 'pyramid' },
    },
  ],
  questions: [
    {
      id: 'evo-q1',
      difficulty: 'easy',
      prompt: 'A manutenção que corrige defeitos encontrados no software em operação é chamada de:',
      answer: 'Corretiva',
      distractors: ['Adaptativa', 'Perfectiva', 'Preventiva'],
      explanation: 'Corretiva: conserta erros. Adaptativa: mudanças no ambiente. Perfectiva: novos requisitos. Preventiva: melhora a estrutura para evitar problemas.',
    },
    {
      id: 'evo-q2',
      difficulty: 'easy',
      prompt: 'Um sistema precisa ser alterado porque a legislação tributária mudou. Esse tipo de manutenção é:',
      answer: 'Adaptativa',
      distractors: ['Corretiva', 'Preventiva', 'Regressiva'],
      explanation: 'Mudanças no ambiente externo (leis, sistema operacional, hardware, banco de dados) exigem manutenção adaptativa.',
    },
    {
      id: 'evo-q3',
      difficulty: 'easy',
      prompt: 'Na estratégia de implantação paralela:',
      answer: 'O sistema antigo e o novo operam simultaneamente por um período, até que o novo se mostre confiável.',
      distractors: [
        'O sistema antigo é desligado no mesmo instante em que o novo entra em operação.',
        'O sistema novo é instalado apenas em uma filial antes das demais.',
        'O sistema novo substitui o antigo um módulo por vez.',
      ],
      explanation: 'A paralela é a mais segura e a mais cara. As outras alternativas descrevem, na ordem, a implantação direta, a piloto e a por fases.',
    },
    {
      id: 'evo-q4',
      difficulty: 'easy',
      prompt: 'Qual é a fase mais longa e, em geral, mais cara do ciclo de vida do software?',
      answer: 'Manutenção',
      distractors: ['Levantamento de requisitos', 'Codificação', 'Teste de unidade'],
      explanation: 'A manutenção costuma responder por 60% a 80% do custo total de um sistema de vida longa.',
    },
    {
      id: 'evo-q5',
      difficulty: 'medium',
      prompt: 'Segundo os dados apresentados por Sommerville, a maior parte do esforço de manutenção é gasta em:',
      answer: 'Adição ou modificação de funcionalidades.',
      distractors: [
        'Correção de defeitos.',
        'Adaptação do software a novos ambientes.',
        'Reescrita da documentação do usuário.',
      ],
      explanation: 'Cerca de 65% em funcionalidade, 18% em adaptação ao ambiente e 17% em correção de defeitos.',
    },
    {
      id: 'evo-q6',
      difficulty: 'medium',
      prompt: 'Uma rede de lojas instala o novo sistema de caixa primeiro em uma única loja; após um mês de uso sem problemas, estende-o às demais. Essa estratégia é a:',
      answer: 'Implantação piloto',
      distractors: ['Implantação direta', 'Implantação paralela', 'Implantação por fases'],
      explanation: 'Piloto: o sistema completo vai primeiro para um local ou grupo. Por fases seria implantar módulo a módulo.',
    },
    {
      id: 'evo-q7',
      difficulty: 'medium',
      prompt: 'A primeira lei de Lehman (mudança contínua) afirma que:',
      answer: 'Um programa usado em um ambiente real deve mudar necessariamente, ou se tornará progressivamente menos útil.',
      distractors: [
        'Um programa bem projetado nunca precisa ser alterado depois da entrega.',
        'A complexidade de um programa diminui a cada alteração feita.',
        'A manutenção deve ser sempre mais barata do que o desenvolvimento.',
      ],
      explanation: 'O ambiente muda, e o software precisa acompanhá-lo. A segunda lei diz que, ao mudar, a estrutura tende a ficar mais complexa.',
    },
    {
      id: 'evo-q8',
      difficulty: 'medium',
      prompt: 'O que é engenharia reversa de software?',
      answer: 'O processo de analisar um sistema existente para recuperar o seu projeto e a sua especificação, sem modificá-lo.',
      distractors: [
        'A reescrita completa do sistema em uma nova linguagem, com novas funcionalidades.',
        'A técnica de testar o sistema da saída para a entrada.',
        'O desenvolvimento de um sistema a partir dos requisitos até o código.',
      ],
      explanation: 'A engenharia reversa extrai informação de projeto do código; não altera o sistema. Ela costuma ser uma etapa da reengenharia.',
    },
    {
      id: 'evo-q9',
      difficulty: 'medium',
      prompt: 'Qual dos atributos abaixo é característico de aplicações web (WebApps), segundo Pressman?',
      answer: 'Evolução contínua e imediatismo, com prazos muito curtos para colocar o sistema no ar.',
      distractors: [
        'Carga de acesso sempre previsível e constante.',
        'Ausência de preocupação com estética e conteúdo.',
        'Uso por um único usuário de cada vez, sem concorrência.',
      ],
      explanation: 'WebApps têm uso intensivo de rede, concorrência, carga imprevisível, exigência de desempenho e disponibilidade, evolução contínua, imediatismo, segurança e estética.',
    },
    {
      id: 'evo-q10',
      difficulty: 'medium',
      prompt: 'Uma equipe reestrutura um módulo antigo e confuso, sem alterar o que ele faz, para facilitar manutenções futuras. Trata-se de manutenção:',
      answer: 'Preventiva',
      distractors: ['Corretiva', 'Adaptativa', 'Perfectiva'],
      explanation: 'A manutenção preventiva (reengenharia, refatoração) melhora a manutenibilidade antes que os problemas apareçam.',
    },
    {
      id: 'evo-q11',
      difficulty: 'hard',
      prompt: 'Qual é a principal diferença entre reengenharia e manutenção perfectiva?',
      answer: 'A reengenharia reestrutura o sistema sem alterar a sua funcionalidade; a manutenção perfectiva acrescenta ou modifica funcionalidades.',
      distractors: [
        'A reengenharia corrige defeitos; a manutenção perfectiva adapta o sistema à legislação.',
        'A reengenharia só se aplica a hardware; a manutenção perfectiva, a software.',
        'Não há diferença: os dois termos são sinônimos.',
      ],
      explanation: 'Reengenharia muda a forma (estrutura, linguagem, dados), não a função. Perfectiva atende a novos requisitos do usuário.',
    },
    {
      id: 'evo-q12',
      difficulty: 'hard',
      prompt: 'Um sistema legado tem baixa qualidade técnica, mas alto valor para o negócio. A estratégia recomendada por Sommerville é:',
      answer: 'Aplicar reengenharia para melhorar a qualidade ou substituí-lo, se houver um sistema adequado disponível.',
      distractors: [
        'Descartá-lo imediatamente, pois não vale o custo.',
        'Manter a manutenção normal, sem nenhuma intervenção.',
        'Congelar o sistema e proibir qualquer alteração.',
      ],
      explanation: 'Sistemas importantes para o negócio, mas caros de manter, devem passar por reengenharia ou ser substituídos. Baixa qualidade com baixo valor é que se descarta.',
    },
    {
      id: 'evo-q13',
      difficulty: 'hard',
      prompt: 'Na pirâmide de projeto de WebApps de Pressman, qual nível fica no topo, mais próximo do usuário?',
      answer: 'Projeto de interface',
      distractors: ['Projeto de componentes', 'Projeto arquitetural', 'Projeto de navegação'],
      explanation: 'Do topo (usuário) à base (tecnologia): interface, estético, conteúdo, navegação, arquitetural e componentes.',
    },
    {
      id: 'evo-q14',
      difficulty: 'medium',
      prompt: 'Qual atividade da gerência de configuração garante que alterações no software sejam avaliadas e aprovadas antes de serem implementadas?',
      answer: 'Controle de mudanças',
      distractors: ['Teste de estresse', 'Planning Poker', 'Análise de pontos por função'],
      explanation: 'O controle de mudanças avalia impacto e custo e aprova (ou rejeita) cada solicitação. Complementa o controle de versões e a auditoria de configuração.',
    },
    {
      id: 'evo-q15',
      difficulty: 'medium',
      prompt: 'A implantação direta (big bang) caracteriza-se por:',
      answer: 'Baixo custo e alto risco, pois não há sistema antigo em operação se o novo falhar.',
      distractors: [
        'Alto custo e baixo risco, pois os dois sistemas operam juntos.',
        'Risco nulo, pois o sistema é testado em uma única filial.',
        'Substituição gradual, um módulo de cada vez.',
      ],
      explanation: 'Na direta, a troca é imediata. É a mais barata, mas a mais arriscada: exige um bom plano de retorno.',
    },
  ],
  openQuestions: [
    {
      id: 'evo-o1',
      prompt: 'Explique os quatro tipos de manutenção de software, com um exemplo de cada.',
      modelAnswer: `
        <p><b>Corretiva:</b> corrige defeitos encontrados em uso. Ex.: o sistema calcula errado o troco.</p>
        <p><b>Adaptativa:</b> adapta o software a mudanças no ambiente externo (hardware, sistema operacional, banco de dados, legislação). Ex.: adequar o sistema a uma nova regra fiscal.</p>
        <p><b>Perfectiva (evolutiva):</b> atende a novos requisitos do usuário ou melhora funções existentes. Ex.: adicionar exportação de relatórios em PDF.</p>
        <p><b>Preventiva:</b> melhora a estrutura do software para facilitar manutenções futuras e evitar problemas. Ex.: refatorar um módulo complexo.</p>`,
      keyPoints: ['Corretiva: defeitos', 'Adaptativa: ambiente externo', 'Perfectiva: novos requisitos', 'Preventiva: estrutura / evitar problemas'],
    },
    {
      id: 'evo-o2',
      prompt: 'Compare as estratégias de implantação direta e paralela quanto a custo e risco.',
      modelAnswer: `
        <p>Na <b>implantação direta</b>, o sistema antigo é desativado e o novo entra em operação de uma vez. O <b>custo é baixo</b>, pois não há duplicidade de trabalho, mas o <b>risco é alto</b>: se o novo sistema falhar, não há alternativa em funcionamento.</p>
        <p>Na <b>implantação paralela</b>, os dois sistemas operam ao mesmo tempo por um período, e os resultados são comparados. O <b>risco é baixo</b>, pois o sistema antigo serve de retaguarda, mas o <b>custo é alto</b>: os usuários fazem o trabalho em dobro e é preciso manter dois ambientes.</p>
        <p>Sistemas críticos tendem a usar a paralela; sistemas simples ou não críticos podem usar a direta.</p>`,
      keyPoints: ['Direta: troca imediata', 'Direta: baixo custo, alto risco', 'Paralela: dois sistemas juntos', 'Paralela: alto custo, baixo risco'],
    },
    {
      id: 'evo-o3',
      prompt: 'Por que a manutenção de software costuma ser mais cara do que o desenvolvimento? Cite pelo menos três fatores.',
      modelAnswer: `
        <p>1. <b>Estabilidade da equipe:</b> quem mantém geralmente não é quem desenvolveu e precisa gastar tempo para entender o sistema.</p>
        <p>2. <b>Responsabilidade contratual:</b> desenvolvimento e manutenção costumam ser contratos distintos, então não há incentivo para escrever software fácil de manter.</p>
        <p>3. <b>Habilidade da equipe:</b> a manutenção é vista como menos nobre e costuma ser atribuída a pessoas menos experientes.</p>
        <p>4. <b>Idade e estrutura do programa:</b> a cada mudança a estrutura se degrada (lei da complexidade crescente) e a documentação fica desatualizada.</p>`,
      keyPoints: ['Equipe diferente da que desenvolveu', 'Contratos separados / falta de incentivo', 'Equipe menos experiente', 'Estrutura degradada e documentação desatualizada'],
    },
    {
      id: 'evo-o4',
      prompt: 'Cite e explique quatro atributos que diferenciam as aplicações web dos sistemas convencionais.',
      modelAnswer: `
        <p><b>Uso intensivo de rede e concorrência:</b> a aplicação reside em uma rede e é acessada por muitos usuários ao mesmo tempo.</p>
        <p><b>Carga imprevisível:</b> o número de acessos pode variar muito de um dia para o outro.</p>
        <p><b>Evolução contínua e imediatismo:</b> o conteúdo e as funções mudam o tempo todo, e os prazos para publicação são de dias ou semanas.</p>
        <p><b>Segurança:</b> por estar exposta na rede, precisa proteger dados sensíveis e transações.</p>
        <p>(Também valem: desempenho, disponibilidade 24×7, orientação a dados, sensibilidade ao conteúdo e estética.)</p>`,
      keyPoints: ['Quatro atributos de Pressman', 'Explicação de cada um', 'Consequência: processo ágil e incremental'],
    },
  ],
  flashcards: [
    { id: 'evo-f1', front: 'Os 4 tipos de manutenção?', back: 'Corretiva, adaptativa, perfectiva (evolutiva) e preventiva.' },
    { id: 'evo-f2', front: 'Manutenção adaptativa: o que a motiva?', back: 'Mudança no ambiente externo: sistema operacional, hardware, banco de dados, legislação.' },
    { id: 'evo-f3', front: 'As 4 estratégias de implantação?', back: 'Direta (big bang), paralela, piloto e por fases.' },
    { id: 'evo-f4', front: 'Implantação mais segura e mais cara?', back: 'A paralela: os dois sistemas rodam juntos.' },
    { id: 'evo-f5', front: 'Piloto × por fases?', back: 'Piloto: divide por local ou grupo de usuários. Por fases: divide por módulo ou funcionalidade.' },
    { id: 'evo-f6', front: 'As duas primeiras leis de Lehman?', back: 'Mudança contínua e complexidade crescente.' },
    { id: 'evo-f7', front: 'Distribuição do esforço de manutenção (Sommerville)?', back: '65% funcionalidade, 18% adaptação ao ambiente, 17% correção de defeitos.' },
    { id: 'evo-f8', front: 'Engenharia reversa × reengenharia?', back: 'Reversa: recupera o projeto a partir do código, sem alterar. Reengenharia: reestrutura o sistema sem mudar a funcionalidade.' },
    { id: 'evo-f9', front: 'O que é um sistema legado?', back: 'Sistema antigo, essencial ao negócio, com tecnologia ultrapassada e difícil de manter.' },
    { id: 'evo-f10', front: 'Três atributos típicos das WebApps?', back: 'Imediatismo, evolução contínua e segurança (além de concorrência, carga imprevisível e estética).' },
    { id: 'evo-f11', front: 'A pirâmide de projeto de WebApps, do topo à base?', back: 'Interface, estético, conteúdo, navegação, arquitetural e componentes.' },
    { id: 'evo-f12', front: 'O que é uma linha-base (baseline)?', back: 'Uma versão formalmente aprovada de um item de configuração, que só muda por controle formal de mudanças.' },
    { id: 'evo-f13', front: 'Atividades da gerência de configuração?', back: 'Identificação, controle de versões, controle de mudanças, auditoria e relato de status.' },
  ],
  cheatSheet: [
    { term: 'Implantação', definition: 'Ambiente, instalação, migração de dados, treinamento, documentação, suporte.' },
    { term: 'Direta / paralela', definition: 'Troca imediata (barata, arriscada) / dois sistemas juntos (cara, segura).' },
    { term: 'Piloto / por fases', definition: 'Uma unidade primeiro / um módulo de cada vez.' },
    { term: 'Manutenção', definition: 'Corretiva (erro), adaptativa (ambiente), perfectiva (novos requisitos), preventiva (estrutura).' },
    { term: 'Custos', definition: '60% a 80% do custo total; 65% funcionalidade, 18% adaptação, 17% correção.' },
    { term: 'Lehman', definition: 'Mudança contínua; complexidade crescente.' },
    { term: 'Engenharia reversa', definition: 'Do código para o projeto, sem alterar o sistema.' },
    { term: 'Reengenharia', definition: 'Reestruturar sem mudar a funcionalidade.' },
    { term: 'Gerência de configuração', definition: 'Identificação, versões, mudanças, auditoria, status; linha-base.' },
    { term: 'WebApps', definition: 'Rede, concorrência, carga imprevisível, disponibilidade, evolução contínua, imediatismo, segurança, estética.' },
    { term: 'Pirâmide de projeto web', definition: 'Interface, estético, conteúdo, navegação, arquitetural, componentes.' },
  ],
};
