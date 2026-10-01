import type { Topic } from './Topic';

export const estimation: Topic = {
  id: 'estimation',
  number: 5,
  unit: 3,
  title: 'Estimativas, métricas e viabilidade',
  subtitle: 'medida × métrica · LOC · pontos por função · COCOMO · viabilidade',
  icon: '📊',
  color: '--c-est',
  summary: 'Como medir software, estimar tamanho, esforço e prazo de um projeto e decidir se ele é viável.',
  tags: ['LOC', 'pontos por função', 'COCOMO', 'três pontos', 'story points'],
  lessons: [
    {
      id: 'est-concepts',
      funFact: `Tom DeMarco, autor de "não se pode controlar o que não se pode medir", publicou em 2009 um artigo dizendo que <b>tinha exagerado</b>: medir é útil, mas os projetos que mais importam são justamente os mais difíceis de controlar por números.`,
      icon: '📏',
      title: 'Medida, medição, métrica e indicador',
      body: `
        <p>Quatro palavras parecidas que a prova gosta de misturar (definições de Pressman):</p>
        <table class="table">
          <tr><th>Termo</th><th>Definição</th><th>Exemplo</th></tr>
          <tr><td><b>Medida</b></td><td>indicação <b>quantitativa</b> da extensão, quantidade, dimensão ou tamanho de um atributo</td><td>o módulo tem 12 erros</td></tr>
          <tr><td><b>Medição</b></td><td>o <b>ato</b> de determinar uma medida</td><td>contar os erros durante a revisão</td></tr>
          <tr><td><b>Métrica</b></td><td>medida quantitativa do <b>grau</b> em que um sistema possui um atributo; <b>relaciona</b> medidas</td><td>3 erros por KLOC</td></tr>
          <tr><td><b>Indicador</b></td><td>métrica (ou combinação) que dá <b>compreensão</b> para decidir e ajustar</td><td>a densidade de erros subiu 40% neste módulo: revisar</td></tr>
        </table>
        <p><b>Por que medir?</b> Para <b>caracterizar</b>, <b>avaliar</b>, <b>prever</b> e <b>melhorar</b> processo, projeto e produto. "Não se pode controlar o que não se pode medir" (Tom DeMarco).</p>`,
      examTip: 'Um número isolado é <b>medida</b>. Quando ele é <b>relacionado</b> a outro (erros <b>por</b> KLOC, PF <b>por</b> pessoa-mês), vira <b>métrica</b>.',
      mnemonic: 'A <b>medição</b> (ato) produz a <b>medida</b> (dado); medidas relacionadas formam a <b>métrica</b>; a métrica interpretada é o <b>indicador</b>.',
    },
    {
      id: 'est-kinds',
      funFact: `Frase atribuída a Bill Gates: "<b>medir o progresso de um programa por linhas de código é como medir o progresso da construção de um avião pelo peso</b>".`,
      icon: '🗂️',
      title: 'Tipos de métricas de software',
      body: `
        <table class="table">
          <tr><th>Classificação</th><th>Tipos</th></tr>
          <tr><td><b>Pelo objeto medido</b></td><td>de <b>processo</b> (melhoria de longo prazo), de <b>projeto</b> (acompanhar e ajustar o trabalho em andamento) e de <b>produto</b> (qualidade do que é construído)</td></tr>
          <tr><td><b>Pela forma de obter</b></td><td><b>Diretas</b>: custo, esforço, LOC, velocidade de execução, memória, defeitos encontrados.<br><b>Indiretas</b>: funcionalidade, qualidade, complexidade, eficiência, confiabilidade, manutenibilidade.</td></tr>
          <tr><td><b>Pela base de normalização</b></td><td><b>Orientadas a tamanho</b> (por KLOC) e <b>orientadas a função</b> (por ponto de função)</td></tr>
        </table>
        <p><b>Métricas orientadas a tamanho</b> normalizam pela quantidade de linhas de código (LOC / KLOC):</p>
        <ul>
          <li>Produtividade = KLOC / pessoa-mês</li>
          <li>Qualidade = erros / KLOC</li>
          <li>Custo = R$ / KLOC</li>
          <li>Documentação = páginas / KLOC</li>
        </ul>
        <p><b>Críticas à LOC:</b> depende da <b>linguagem</b> de programação; <b>penaliza</b> programas curtos e bem projetados; não se adapta bem a linguagens não procedurais; e exige um detalhamento difícil de ter <b>no início</b> do projeto.</p>`,
      examTip: 'LOC é medida <b>direta</b>. Funcionalidade (pontos por função), qualidade e complexidade são <b>indiretas</b>.',
    },
    {
      id: 'est-fp',
      funFact: `Albrecht criou os pontos por função na <b>IBM</b> porque precisava comparar a produtividade de equipes que programavam em <b>linguagens diferentes</b>, e as linhas de código não permitiam isso.`,
      icon: '🧮',
      title: 'Análise de pontos por função (APF)',
      body: `
        <p>Proposta por <b>Allan Albrecht (IBM, 1979)</b>, mede o <b>tamanho funcional</b> do software do ponto de vista do <b>usuário</b>, <b>independentemente da linguagem</b> de programação. Pode ser aplicada <b>cedo</b>, a partir dos requisitos.</p>
        <p>Contam-se cinco valores do domínio da informação, cada um com peso conforme a complexidade:</p>
        <table class="table">
          <tr><th>Parâmetro</th><th>Simples</th><th>Médio</th><th>Complexo</th></tr>
          <tr><td>Entradas externas</td><td>3</td><td>4</td><td>6</td></tr>
          <tr><td>Saídas externas</td><td>4</td><td>5</td><td>7</td></tr>
          <tr><td>Consultas externas</td><td>3</td><td>4</td><td>6</td></tr>
          <tr><td>Arquivos lógicos internos</td><td>7</td><td>10</td><td>15</td></tr>
          <tr><td>Arquivos de interface externa</td><td>5</td><td>7</td><td>10</td></tr>
        </table>
        <span class="formula">PF = contagem total × [0,65 + 0,01 × Σ(Fi)]</span>
        <p>Os <b>Fi</b> são <b>14 características gerais</b> do sistema (comunicação de dados, desempenho, facilidade de mudança, reutilização...), cada uma avaliada de <b>0</b> (sem influência) a <b>5</b> (essencial). Assim, ΣFi vai de 0 a 70 e o fator de ajuste vai de <b>0,65 a 1,35</b>.</p>
        <p>Com PF calculado, derivam-se métricas: erros por PF, R$ por PF, <b>PF por pessoa-mês</b> (produtividade).</p>`,
      examTip: 'PF mede <b>funcionalidade entregue ao usuário</b>, não linhas de código. Por isso serve para comparar projetos feitos em linguagens diferentes.',
      mnemonic: 'Os cinco parâmetros: <b>E-S-C-A-I</b> (Entradas, Saídas, Consultas, Arquivos, Interfaces).',
      labCue: { label: 'Abrir a calculadora de PF', cue: 'fp' },
    },
    {
      id: 'est-project',
      funFact: `<b>Lei de Hofstadter:</b> "sempre leva mais tempo do que você espera, mesmo quando você leva em conta a Lei de Hofstadter".`,
      icon: '🔮',
      title: 'Estimativas de projeto',
      body: `
        <p>Estimar é prever <b>tamanho</b>, <b>esforço</b> (pessoas-mês), <b>prazo</b> e <b>custo</b> antes de o trabalho começar. A sequência natural é: <b>tamanho → esforço → prazo → custo</b>.</p>
        <p>A incerteza depende da <b>complexidade</b> do projeto, do seu <b>tamanho</b>, do <b>grau de incerteza estrutural</b> dos requisitos e da existência de <b>dados históricos</b>.</p>
        <table class="table">
          <tr><th>Técnica</th><th>Ideia</th></tr>
          <tr><td><b>Decomposição</b></td><td>dividir o problema (por funções, com LOC ou PF) ou o processo (por tarefas) e somar as estimativas das partes</td></tr>
          <tr><td><b>Modelos empíricos</b></td><td>fórmulas calibradas com projetos passados, como o <b>COCOMO</b></td></tr>
          <tr><td><b>Analogia</b></td><td>comparar com projetos semelhantes já concluídos</td></tr>
          <tr><td><b>Julgamento de especialistas</b></td><td>vários especialistas estimam e convergem (técnica <b>Delphi</b>)</td></tr>
          <tr><td><b>Lei de Parkinson</b></td><td>"o trabalho se expande para preencher o tempo disponível": o custo vira o que houver de recurso</td></tr>
          <tr><td><b>Preço para ganhar</b></td><td>o custo é o que o cliente está disposto a pagar</td></tr>
        </table>
        <p><b>Estimativa de três pontos</b> (a mesma lógica do PERT), para reduzir o otimismo:</p>
        <span class="formula">E = (otimista + 4 × mais provável + pessimista) / 6</span>`,
      examTip: 'Na média de três pontos, o valor <b>mais provável pesa 4</b> e o divisor é <b>6</b>. O desvio padrão é (pessimista − otimista) / 6.',
      labCue: { label: 'Testar a estimativa de três pontos', cue: 'threepoint' },
    },
    {
      id: 'est-cocomo',
      funFact: `Boehm calibrou o COCOMO original com dados de <b>63 projetos reais</b> da TRW. Por isso se diz que é um modelo <b>empírico</b>: as constantes não vieram de teoria, vieram de histórico.`,
      icon: '🏗️',
      title: 'COCOMO',
      body: `
        <p>O <b>COnstructive COst MOdel</b> (<b>Barry Boehm, 1981</b>) é o modelo empírico mais conhecido. Tem três versões: <b>básico</b> (só o tamanho), <b>intermediário</b> (tamanho + 15 direcionadores de custo) e <b>avançado</b> (direcionadores por fase).</p>
        <span class="formula">Esforço E = a × (KLOC)^b pessoas-mês &nbsp;·&nbsp; Prazo D = c × E^d meses</span>
        <table class="table">
          <tr><th>Modo</th><th>Perfil do projeto</th><th>a</th><th>b</th><th>c</th><th>d</th></tr>
          <tr><td><b>Orgânico</b></td><td>pequeno, equipe experiente, requisitos pouco rígidos</td><td>2,4</td><td>1,05</td><td>2,5</td><td>0,38</td></tr>
          <tr><td><b>Semidestacado</b></td><td>tamanho e complexidade intermediários, equipe mista</td><td>3,0</td><td>1,12</td><td>2,5</td><td>0,35</td></tr>
          <tr><td><b>Embutido</b></td><td>restrições rígidas de hardware, software e operação</td><td>3,6</td><td>1,20</td><td>2,5</td><td>0,32</td></tr>
        </table>
        <p>O expoente <b>b &gt; 1</b> representa a <b>deseconomia de escala</b>: dobrar o tamanho <b>mais que dobra</b> o esforço. A equipe média é <b>E / D</b>.</p>
        <p>O <b>COCOMO II</b> atualiza o modelo para o desenvolvimento moderno, com submodelos (composição de aplicação, projeto preliminar, pós-arquitetura) e aceita pontos de objeto e pontos por função como entrada.</p>`,
      examTip: 'Entrada do COCOMO básico: <b>KLOC</b>. Saídas: <b>esforço</b> em pessoas-mês e <b>prazo</b> em meses. O modo que exige mais esforço é o <b>embutido</b>.',
      labCue: { label: 'Abrir a calculadora COCOMO', cue: 'cocomo' },
    },
    {
      id: 'est-agile',
      funFact: `O Planning Poker foi inventado por <b>James Grenning</b>, em 2002, cansado de reuniões de estimativa em que duas pessoas falavam por horas e o resto concordava com sono.`,
      icon: '🃏',
      title: 'Estimativa ágil: story points e Planning Poker',
      body: `
        <p>Em times ágeis, estima-se o <b>tamanho relativo</b> das histórias em <b>story points</b>, que combinam <b>esforço, complexidade e incerteza</b>. Não são horas: uma história de 8 pontos é "mais ou menos quatro vezes" uma de 2.</p>
        <p><b>Planning Poker</b> (popularizado por Mike Cohn):</p>
        <ol>
          <li>O PO lê a história e tira dúvidas.</li>
          <li>Cada membro escolhe, <b>em segredo</b>, uma carta da sequência (1, 2, 3, 5, 8, 13, 21...).</li>
          <li>Todos <b>revelam ao mesmo tempo</b>, o que evita a <b>ancoragem</b> na opinião de quem fala primeiro.</li>
          <li>Quem deu a <b>maior</b> e a <b>menor</b> estimativa explica o porquê.</li>
          <li>Vota-se de novo até convergir.</li>
        </ol>
        <p>A sequência tipo <b>Fibonacci</b> reflete que a incerteza cresce com o tamanho: não faz sentido discutir se algo vale 20 ou 21.</p>
        <p><b>Velocidade</b> = pontos concluídos por Sprint. Com ela, <b>prazo ≈ pontos do backlog ÷ velocidade</b>.</p>`,
      labCue: { label: 'Sentar à mesa de Planning Poker', cue: 'poker' },
    },
    {
      id: 'est-feasibility',
      funFact: `A <b>Ópera de Sydney</b> é o exemplo favorito de estimativa otimista: prevista para 4 anos e 7 milhões de dólares australianos, levou <b>14 anos</b> e custou <b>102 milhões</b>.`,
      icon: '🚦',
      title: 'Estudo de viabilidade',
      body: `
        <p>Antes de investir no projeto, o <b>estudo de viabilidade</b> responde, de forma <b>rápida e barata</b>, se vale a pena continuar. Para Sommerville, é a <b>primeira atividade</b> da engenharia de requisitos e responde a três perguntas:</p>
        <ol>
          <li>O sistema <b>contribui para os objetivos</b> gerais da organização?</li>
          <li>Pode ser implementado com a <b>tecnologia atual</b> e dentro das restrições de <b>custo e prazo</b>?</li>
          <li>Pode ser <b>integrado</b> com os outros sistemas já em operação?</li>
        </ol>
        <p>O resultado é um <b>relatório</b> que recomenda prosseguir ou não, podendo sugerir mudanças de escopo, orçamento e cronograma.</p>
        <table class="table">
          <tr><th>Dimensão</th><th>Pergunta</th></tr>
          <tr><td><b>Técnica</b></td><td>Temos tecnologia e competência para construir?</td></tr>
          <tr><td><b>Econômica</b></td><td>Os benefícios superam os custos? (análise de <b>custo-benefício</b>, retorno do investimento, <i>payback</i>)</td></tr>
          <tr><td><b>Operacional</b></td><td>A organização e os usuários vão conseguir e querer usar o sistema?</td></tr>
          <tr><td><b>Legal</b></td><td>Há impedimento em leis, contratos ou normas?</td></tr>
          <tr><td><b>De cronograma</b></td><td>Fica pronto a tempo de ser útil?</td></tr>
        </table>`,
      examTip: 'O estudo de viabilidade vem <b>antes</b> da elicitação detalhada: se a resposta for "não", não se gasta com o resto.',
      mnemonic: '<b>T-E-L-O-C</b>: <b>T</b>écnica, <b>E</b>conômica, <b>L</b>egal, <b>O</b>peracional, de <b>C</b>ronograma.',
      labCue: { label: 'Treinar as dimensões de viabilidade', cue: 'feasibility' },
    },
    {
      id: 'est-quality-metrics',
      funFact: `McCabe sugeriu em 1976 um limite prático: módulo com complexidade ciclomática <b>acima de 10</b> merece ser dividido. Quase cinquenta anos depois, muitas ferramentas de análise de código ainda usam esse número como alerta.`,
      icon: '🩺',
      title: 'Métricas de qualidade e de produto',
      body: `
        <table class="table">
          <tr><th>Métrica</th><th>Fórmula / ideia</th></tr>
          <tr><td><b>Densidade de defeitos</b></td><td>defeitos / KLOC (ou por PF)</td></tr>
          <tr><td><b>Eficiência na remoção de defeitos (DRE)</b></td><td>DRE = E / (E + D), em que E = erros achados <b>antes</b> da entrega e D = defeitos achados <b>depois</b>. O ideal é 1.</td></tr>
          <tr><td><b>MTTF</b></td><td>tempo médio <b>até</b> a falha</td></tr>
          <tr><td><b>MTTR</b></td><td>tempo médio <b>de reparo</b></td></tr>
          <tr><td><b>MTBF</b></td><td>tempo médio <b>entre</b> falhas = MTTF + MTTR</td></tr>
          <tr><td><b>Disponibilidade</b></td><td>MTTF / (MTTF + MTTR) × 100%</td></tr>
          <tr><td><b>Complexidade ciclomática</b> (McCabe)</td><td>V(G) = arestas − nós + 2: número de caminhos independentes do código</td></tr>
        </table>
        <p>Para software orientado a objetos, a suíte <b>CK</b> (Chidamber e Kemerer) mede, entre outros: métodos ponderados por classe (WMC), profundidade da árvore de herança (DIT), número de filhos (NOC), <b>acoplamento</b> entre objetos (CBO) e falta de <b>coesão</b> nos métodos (LCOM).</p>
        <p>Regra de ouro do bom projeto: <b>alta coesão</b> e <b>baixo acoplamento</b>.</p>`,
      examTip: 'Pressman distingue <b>erro</b> (encontrado antes da entrega) de <b>defeito</b> (encontrado depois, pelo usuário). É essa diferença que a DRE mede.',
    },
  ],
  questions: [
    {
      id: 'est-q1',
      difficulty: 'easy',
      prompt: 'Segundo Pressman, uma <b>métrica</b> de software é:',
      answer: 'Uma medida quantitativa do grau em que um sistema, componente ou processo possui determinado atributo.',
      distractors: [
        'O ato de determinar uma medida.',
        'Um documento que lista os requisitos do sistema.',
        'Uma ferramenta automatizada para gerar código.',
      ],
      explanation: 'O ato de determinar a medida é a medição. A métrica relaciona medidas (por exemplo, erros por KLOC).',
    },
    {
      id: 'est-q2',
      difficulty: 'easy',
      prompt: 'A análise de pontos por função mede:',
      answer: 'O tamanho funcional do software do ponto de vista do usuário, independentemente da linguagem de programação.',
      distractors: [
        'O número de linhas de código-fonte escritas.',
        'A quantidade de horas trabalhadas pela equipe.',
        'O número de classes e métodos do sistema.',
      ],
      explanation: 'A APF conta entradas, saídas, consultas, arquivos e interfaces, e por isso não depende da linguagem nem da tecnologia.',
    },
    {
      id: 'est-q3',
      difficulty: 'easy',
      prompt: 'Qual das alternativas é uma medida <b>direta</b> de software?',
      answer: 'Linhas de código (LOC) produzidas',
      distractors: ['Qualidade', 'Manutenibilidade', 'Funcionalidade'],
      explanation: 'Medidas diretas: custo, esforço, LOC, velocidade de execução, memória, defeitos registrados. Qualidade, funcionalidade e manutenibilidade são indiretas.',
    },
    {
      id: 'est-q4',
      difficulty: 'easy',
      prompt: 'No COCOMO básico, qual é a principal entrada do modelo?',
      answer: 'O tamanho estimado do software em milhares de linhas de código (KLOC).',
      distractors: [
        'O número de pontos de história concluídos por Sprint.',
        'A quantidade de casos de teste executados.',
        'O número de reuniões realizadas com o cliente.',
      ],
      explanation: 'O COCOMO básico calcula esforço (E = a·KLOC^b) e prazo (D = c·E^d) a partir do tamanho em KLOC e do modo do projeto.',
    },
    {
      id: 'est-q5',
      difficulty: 'medium',
      prompt: 'Uma tarefa foi estimada em 4 dias (otimista), 7 dias (mais provável) e 16 dias (pessimista). Pela estimativa de três pontos, o valor esperado é:',
      answer: '8 dias',
      distractors: ['9 dias', '7 dias', '10 dias'],
      explanation: 'E = (4 + 4×7 + 16) / 6 = 48 / 6 = 8 dias.',
    },
    {
      id: 'est-q6',
      difficulty: 'medium',
      prompt: 'Um sistema tem contagem total (pontos não ajustados) igual a 200, e a soma dos 14 fatores de ajuste é 50. O total de pontos por função é:',
      answer: '230',
      distractors: ['200', '250', '130'],
      explanation: 'PF = 200 × [0,65 + 0,01 × 50] = 200 × 1,15 = 230.',
    },
    {
      id: 'est-q7',
      difficulty: 'medium',
      prompt: 'Os três modos de projeto do COCOMO original são:',
      answer: 'Orgânico, semidestacado e embutido.',
      distractors: [
        'Básico, intermediário e avançado.',
        'Simples, médio e complexo.',
        'Concepção, elaboração e construção.',
      ],
      explanation: 'Básico, intermediário e avançado são as versões do modelo. Simples, médio e complexo são os pesos da análise de pontos por função.',
    },
    {
      id: 'est-q8',
      difficulty: 'medium',
      prompt: 'Uma crítica clássica ao uso de linhas de código (LOC) como métrica de tamanho é que ela:',
      answer: 'Depende da linguagem de programação e penaliza programas curtos e bem projetados.',
      distractors: [
        'Só pode ser calculada depois que o sistema é aposentado.',
        'Não pode ser contada automaticamente por ferramentas.',
        'É independente da tecnologia e, por isso, imprecisa.',
      ],
      explanation: 'A mesma função exige quantidades diferentes de linhas em linguagens diferentes, e um código enxuto parece "menos produtivo".',
    },
    {
      id: 'est-q9',
      difficulty: 'medium',
      prompt: 'No Planning Poker, por que as cartas são reveladas por todos ao mesmo tempo?',
      answer: 'Para evitar a ancoragem: que a primeira estimativa dita influencie as demais.',
      distractors: [
        'Para que o Scrum Master possa escolher a estimativa vencedora.',
        'Para reduzir a duração da Daily Scrum.',
        'Porque o Product Owner é quem define o número de pontos.',
      ],
      explanation: 'A revelação simultânea obtém opiniões independentes; depois, quem deu a maior e a menor estimativa explica o raciocínio.',
    },
    {
      id: 'est-q10',
      difficulty: 'medium',
      prompt: 'O estudo de viabilidade tem como resultado:',
      answer: 'Um relatório que recomenda prosseguir ou não com o desenvolvimento do sistema.',
      distractors: [
        'O código-fonte de um protótipo descartável.',
        'O plano de testes de aceitação.',
        'O manual do usuário do sistema.',
      ],
      explanation: 'É um estudo curto e focado que avalia se o sistema contribui para os objetivos do negócio e se pode ser feito com a tecnologia, o custo e o prazo disponíveis.',
    },
    {
      id: 'est-q11',
      difficulty: 'hard',
      prompt: 'Um sistema apresentou, antes da entrega, 90 erros (encontrados em revisões e testes) e, depois da entrega, 10 defeitos relatados pelos usuários. A eficiência na remoção de defeitos (DRE) é:',
      answer: '0,90',
      distractors: ['0,10', '9,00', '0,80'],
      explanation: 'DRE = E / (E + D) = 90 / (90 + 10) = 0,90. Quanto mais perto de 1, melhor a filtragem antes da entrega.',
    },
    {
      id: 'est-q12',
      difficulty: 'hard',
      prompt: 'No COCOMO, o expoente <b>b</b> é maior que 1 em todos os modos. Isso significa que:',
      answer: 'O esforço cresce mais do que proporcionalmente ao tamanho: há deseconomia de escala.',
      distractors: [
        'O esforço diminui à medida que o sistema cresce.',
        'O prazo é sempre igual ao esforço.',
        'O tamanho do software não influencia o esforço.',
      ],
      explanation: 'Dobrar o tamanho mais que dobra o esforço, por causa do aumento de comunicação, integração e complexidade.',
    },
    {
      id: 'est-q13',
      difficulty: 'hard',
      prompt: 'Um servidor tem tempo médio até a falha (MTTF) de 990 horas e tempo médio de reparo (MTTR) de 10 horas. A disponibilidade é:',
      answer: '99%',
      distractors: ['90%', '99,9%', '10%'],
      explanation: 'Disponibilidade = MTTF / (MTTF + MTTR) = 990 / 1000 = 99%.',
    },
    {
      id: 'est-q14',
      difficulty: 'medium',
      prompt: 'A empresa quer saber se o retorno financeiro do novo sistema compensa o investimento. Qual dimensão da viabilidade está sendo avaliada?',
      answer: 'Viabilidade econômica',
      distractors: ['Viabilidade técnica', 'Viabilidade operacional', 'Viabilidade legal'],
      explanation: 'A viabilidade econômica usa a análise de custo-benefício: retorno do investimento e tempo de retorno (payback).',
    },
    {
      id: 'est-q15',
      difficulty: 'easy',
      prompt: 'O que são story points?',
      answer: 'Uma unidade relativa de tamanho de histórias de usuário, que combina esforço, complexidade e incerteza.',
      distractors: [
        'O número exato de horas necessárias para concluir uma história.',
        'A quantidade de linhas de código de uma história.',
        'O número de defeitos encontrados em uma Sprint.',
      ],
      explanation: 'Story points são relativos: comparam histórias entre si. A velocidade do time (pontos por Sprint) converte pontos em prazo.',
    },
  ],
  openQuestions: [
    {
      id: 'est-o1',
      prompt: 'Diferencie medida, medição e métrica, dando um exemplo.',
      modelAnswer: `
        <p><b>Medida</b> é a indicação quantitativa da extensão, quantidade, dimensão ou tamanho de um atributo de produto ou processo. Ex.: o sistema tem 20 mil linhas de código.</p>
        <p><b>Medição</b> é o ato de determinar uma medida. Ex.: contar as linhas de código com uma ferramenta.</p>
        <p><b>Métrica</b> é a medida quantitativa do grau em que um sistema possui um atributo; relaciona medidas. Ex.: 2,5 erros por KLOC.</p>
        <p>(A métrica, quando interpretada para apoiar uma decisão, torna-se um <b>indicador</b>.)</p>`,
      keyPoints: ['Medida = valor quantitativo de um atributo', 'Medição = ato de medir', 'Métrica = relação entre medidas / grau de um atributo', 'Exemplo coerente'],
    },
    {
      id: 'est-o2',
      prompt: 'Explique como funciona a análise de pontos por função e cite uma vantagem em relação à contagem de linhas de código.',
      modelAnswer: `
        <p>A análise de pontos por função (Albrecht, 1979) mede o tamanho funcional do software. Contam-se cinco valores do domínio da informação: <b>entradas externas, saídas externas, consultas externas, arquivos lógicos internos e arquivos de interface externa</b>. Cada item recebe um peso conforme a complexidade (simples, médio, complexo), e a soma é a contagem total.</p>
        <p>A contagem é ajustada por 14 características gerais do sistema, avaliadas de 0 a 5: <b>PF = contagem total × [0,65 + 0,01 × ΣFi]</b>.</p>
        <p><b>Vantagem:</b> é independente da linguagem de programação e pode ser estimada cedo, a partir dos requisitos, enquanto a LOC depende da linguagem e só é conhecida com precisão depois da codificação.</p>`,
      keyPoints: ['Cinco parâmetros contados', 'Pesos por complexidade', '14 fatores de ajuste e a fórmula', 'Independência de linguagem / estimável cedo'],
    },
    {
      id: 'est-o3',
      prompt: 'O que é um estudo de viabilidade e quais aspectos ele deve avaliar?',
      modelAnswer: `
        <p>É um estudo breve, feito no início do projeto, para decidir se vale a pena desenvolver o sistema. Avalia se o sistema <b>contribui para os objetivos da organização</b>, se pode ser implementado com a <b>tecnologia atual</b> e dentro das restrições de <b>custo e prazo</b>, e se pode ser <b>integrado</b> aos sistemas existentes.</p>
        <p>As dimensões usuais são: viabilidade <b>técnica</b>, <b>econômica</b> (custo-benefício), <b>operacional</b>, <b>legal</b> e de <b>cronograma</b>.</p>
        <p>O resultado é um <b>relatório de viabilidade</b> com a recomendação de prosseguir ou não.</p>`,
      keyPoints: ['Decidir se o projeto deve prosseguir', 'Contribuição para o negócio, tecnologia, custo/prazo, integração', 'Dimensões: técnica, econômica, operacional, legal, cronograma', 'Resultado: relatório'],
    },
    {
      id: 'est-o4',
      prompt: 'Descreva o modelo COCOMO básico: o que ele estima, quais são as entradas e os três modos de projeto.',
      modelAnswer: `
        <p>O COCOMO (Boehm, 1981) é um modelo empírico de estimativa. Na versão básica, estima o <b>esforço</b> em pessoas-mês e o <b>prazo</b> em meses a partir do <b>tamanho</b> em KLOC: <b>E = a × KLOC^b</b> e <b>D = c × E^d</b>.</p>
        <p>Os coeficientes dependem do modo do projeto: <b>orgânico</b> (projetos pequenos, equipes experientes, requisitos flexíveis), <b>semidestacado</b> (porte e complexidade intermediários) e <b>embutido</b> (fortes restrições de hardware, software e operação).</p>
        <p>Como b &gt; 1, o esforço cresce mais que proporcionalmente ao tamanho.</p>`,
      keyPoints: ['Estima esforço e prazo', 'Entrada: KLOC', 'Modos: orgânico, semidestacado, embutido', 'Fórmulas E = a·KLOC^b e D = c·E^d'],
    },
  ],
  flashcards: [
    { id: 'est-f1', front: 'Medida × medição × métrica?', back: 'Medida: valor quantitativo. Medição: ato de medir. Métrica: grau de um atributo, relacionando medidas.' },
    { id: 'est-f2', front: 'Fórmula dos pontos por função?', back: 'PF = contagem total × [0,65 + 0,01 × Σ(Fi)], com 14 fatores de 0 a 5.' },
    { id: 'est-f3', front: 'Os 5 parâmetros da APF?', back: 'Entradas externas, saídas externas, consultas externas, arquivos lógicos internos e arquivos de interface externa.' },
    { id: 'est-f4', front: 'Quem criou a análise de pontos por função?', back: 'Allan Albrecht (IBM), em 1979.' },
    { id: 'est-f5', front: 'Fórmulas do COCOMO básico?', back: 'E = a × KLOC^b (pessoas-mês) e D = c × E^d (meses).' },
    { id: 'est-f6', front: 'Os 3 modos do COCOMO?', back: 'Orgânico, semidestacado e embutido.' },
    { id: 'est-f7', front: 'Estimativa de três pontos?', back: 'E = (otimista + 4 × mais provável + pessimista) / 6.' },
    { id: 'est-f8', front: 'Medidas diretas × indiretas?', back: 'Diretas: LOC, custo, esforço, defeitos, memória. Indiretas: qualidade, funcionalidade, complexidade, manutenibilidade.' },
    { id: 'est-f9', front: 'As 3 perguntas do estudo de viabilidade (Sommerville)?', back: 'Contribui para os objetivos da organização? Dá para fazer com a tecnologia, o custo e o prazo? Integra-se aos outros sistemas?' },
    { id: 'est-f10', front: 'Fórmula da disponibilidade?', back: 'MTTF / (MTTF + MTTR) × 100%.' },
    { id: 'est-f11', front: 'O que é DRE?', back: 'Eficiência na remoção de defeitos: E / (E + D). E = erros antes da entrega; D = defeitos depois.' },
    { id: 'est-f12', front: 'Por que o Planning Poker usa revelação simultânea?', back: 'Para evitar ancoragem na primeira opinião.' },
    { id: 'est-f13', front: 'Faixa do fator de ajuste da APF?', back: 'De 0,65 (ΣFi = 0) a 1,35 (ΣFi = 70).' },
  ],
  cheatSheet: [
    { term: 'Medida / medição / métrica', definition: 'Valor quantitativo / ato de medir / grau de um atributo (relaciona medidas).' },
    { term: 'Diretas × indiretas', definition: 'LOC, custo, esforço, defeitos × qualidade, funcionalidade, complexidade.' },
    { term: 'Pontos por função', definition: 'PF = contagem × [0,65 + 0,01 × ΣFi]. Entradas, saídas, consultas, arquivos, interfaces.' },
    { term: 'COCOMO básico', definition: 'E = a·KLOC^b; D = c·E^d. Orgânico (2,4; 1,05), semidestacado (3,0; 1,12), embutido (3,6; 1,20).' },
    { term: 'Três pontos', definition: 'E = (o + 4m + p) / 6; σ = (p − o) / 6.' },
    { term: 'Story points', definition: 'Tamanho relativo; Planning Poker com Fibonacci; velocidade = pontos por Sprint.' },
    { term: 'Viabilidade', definition: 'Técnica, econômica, legal, operacional, de cronograma. Resultado: relatório de viabilidade.' },
    { term: 'Disponibilidade', definition: 'MTTF / (MTTF + MTTR). MTBF = MTTF + MTTR.' },
    { term: 'DRE', definition: 'E / (E + D).' },
  ],
};
