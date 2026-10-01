import type { Topic } from './Topic';

export const testing: Topic = {
  id: 'testing',
  number: 7,
  unit: 4,
  title: 'Testes, V&V e revisão de software',
  subtitle: 'verificação × validação · níveis · caixa-preta · caixa-branca · inspeção',
  icon: '🧪',
  color: '--c-test',
  summary: 'Como procurar defeitos de forma sistemática: verificação e validação, níveis e tipos de teste, técnicas de projeto de casos de teste e revisões.',
  tags: ['V&V', 'unidade → aceitação', 'valor limite', 'complexidade ciclomática', 'inspeção'],
  lessons: [
    {
      id: 'test-vv',
      funFact: `O software de navegação do foguete <b>Ariane 5</b> estava <b>verificado</b>: fazia exatamente o que a especificação herdada do Ariane 4 mandava. Só não era <b>válido</b> para o foguete novo, bem mais veloz. Explodiu no primeiro voo, em 1996.`,
      icon: '⚖️',
      title: 'Verificação × validação',
      body: `
        <p>A distinção clássica é de <b>Barry Boehm</b>:</p>
        <table class="table">
          <tr><th></th><th>Verificação</th><th>Validação</th></tr>
          <tr><td><b>Pergunta</b></td><td>"Estamos construindo o produto <b>corretamente</b>?"</td><td>"Estamos construindo o produto <b>certo</b>?"</td></tr>
          <tr><td><b>Compara com</b></td><td>a <b>especificação</b></td><td>as <b>necessidades reais</b> do cliente</td></tr>
          <tr><td><b>Exemplos</b></td><td>revisões de código e de projeto, teste de unidade e de integração</td><td>teste de aceitação, validação com protótipo</td></tr>
        </table>
        <p>O processo de V&amp;V usa duas abordagens complementares:</p>
        <ul>
          <li><b>Estática</b> (inspeções e revisões): analisa requisitos, modelos e código <b>sem executar</b> o programa.</li>
          <li><b>Dinâmica</b> (testes): <b>executa</b> o programa com dados de teste e observa o comportamento.</li>
        </ul>
        <p>Um software pode passar na verificação e falhar na validação: está exatamente como especificado, mas a especificação não era o que o cliente precisava.</p>`,
      examTip: 'A banca troca as frases de propósito. Fixe: verifica<b>ção</b> → especifica<b>ção</b> ("do jeito certo"); <b>val</b>idação → <b>val</b>or para o cliente ("a coisa certa").',
      labCue: { label: 'Treinar verificação × validação', cue: 'vv' },
    },
    {
      id: 'test-concepts',
      funFact: `Em 9 de setembro de 1947, a equipe de <b>Grace Hopper</b> achou uma <b>mariposa</b> presa em um relé do computador Mark II e a colou no diário de bordo com a anotação "primeiro caso real de bug encontrado". O caderno está hoje no museu Smithsonian.`,
      icon: '🐞',
      title: 'Erro, defeito, falha e os princípios do teste',
      body: `
        <table class="table">
          <tr><td><b>Erro</b> (engano)</td><td>ação humana equivocada, como entender mal um requisito</td></tr>
          <tr><td><b>Defeito</b> (<i>fault</i>, <i>bug</i>)</td><td>a imperfeição no artefato (código, modelo, documento) causada pelo erro</td></tr>
          <tr><td><b>Falha</b> (<i>failure</i>)</td><td>o comportamento incorreto <b>observado</b> quando o defeito é executado</td></tr>
        </table>
        <p>Cadeia: o <b>erro</b> humano introduz um <b>defeito</b>, que, quando executado, pode provocar uma <b>falha</b>.</p>
        <p>Objetivos do teste, segundo <b>Glenford Myers</b>:</p>
        <ul>
          <li>Testar é executar um programa <b>com a intenção de encontrar erros</b>.</li>
          <li>Um <b>bom caso de teste</b> tem alta probabilidade de revelar um erro ainda não descoberto.</li>
          <li>Um teste <b>bem-sucedido</b> é o que <b>revela</b> um erro.</li>
        </ul>
        <p><b>Dijkstra:</b> "o teste pode mostrar a <b>presença</b> de defeitos, mas nunca a sua <b>ausência</b>". Por isso o <b>teste exaustivo é impossível</b>.</p>
        <p>Outros princípios (Davis, em Pressman): todo teste deve ser <b>rastreável</b> aos requisitos; os testes devem ser <b>planejados</b> muito antes de começarem; vale o <b>princípio de Pareto</b> (80% dos erros estão em 20% dos módulos); testa-se do <b>pequeno para o grande</b>; e o teste mais eficaz é feito por uma <b>equipe independente</b>.</p>
        <p><b>Teste ≠ depuração:</b> o teste <b>revela</b> a existência do defeito; a depuração <b>localiza e corrige</b> a causa.</p>`,
      examTip: 'Pergunta clássica: "um teste é bem-sucedido quando...". Resposta de Myers: <b>quando encontra um erro</b>, não quando o programa passa.',
    },
    {
      id: 'test-levels',
      funFact: `Em 2012, a corretora <b>Knight Capital</b> perdeu <b>US$ 440 milhões em 45 minutos</b>: o código novo foi instalado em sete servidores e esquecido no oitavo, que continuou rodando uma função antiga. Cada servidor funcionava sozinho; o problema estava no <b>conjunto</b>.`,
      icon: '🪜',
      title: 'Níveis de teste',
      body: `
        <table class="table">
          <tr><th>Nível</th><th>O que é testado</th><th>Baseado em</th></tr>
          <tr><td><b>Unidade</b></td><td>cada módulo, função ou classe isoladamente</td><td>projeto detalhado e código</td></tr>
          <tr><td><b>Integração</b></td><td>as <b>interfaces</b> entre os módulos combinados</td><td>projeto de arquitetura</td></tr>
          <tr><td><b>Sistema</b></td><td>o sistema completo no seu ambiente, incluindo requisitos não funcionais</td><td>requisitos do sistema</td></tr>
          <tr><td><b>Aceitação</b></td><td>o sistema com dados e usuários reais, para o cliente decidir se aceita</td><td>requisitos do usuário</td></tr>
        </table>
        <p><b>Estratégias de integração:</b></p>
        <ul>
          <li><b>Descendente</b> (<i>top-down</i>): começa pelo módulo principal; os módulos subordinados ainda ausentes são simulados por <b>stubs</b>.</li>
          <li><b>Ascendente</b> (<i>bottom-up</i>): começa pelos módulos de mais baixo nível; quem os chama é simulado por <b>drivers</b>.</li>
          <li><b>Sanduíche:</b> combina as duas.</li>
          <li><b>Big-bang</b> (não incremental): integra tudo de uma vez; os erros ficam difíceis de isolar.</li>
        </ul>
        <p><b>Teste alfa:</b> feito pelo cliente <b>no ambiente do desenvolvedor</b>, com este observando. <b>Teste beta:</b> feito pelos usuários <b>no próprio ambiente</b>, sem controle do desenvolvedor.</p>`,
      examTip: '<b>Stub</b> substitui o módulo <b>chamado</b> (subordinado). <b>Driver</b> substitui o módulo que <b>chama</b>. Top-down usa stubs; bottom-up usa drivers.',
      mnemonic: '<b>U-I-S-A</b>: Unidade, Integração, Sistema, Aceitação. <b>A</b>lfa = n<b>a</b> casa do desenvolvedor; <b>b</b>eta = am<b>b</b>iente do cliente.',
      labCue: { label: 'Em que nível estou testando?', cue: 'levels' },
    },
    {
      id: 'test-blackbox',
      funFact: `O erro mais famoso da programação tem até nome: <b>off-by-one</b> (erro por um). É o laço que roda uma vez a mais, o "menor que" que devia ser "menor ou igual". A análise de valor limite existe para caçá-lo.`,
      icon: '⬛',
      title: 'Teste caixa-preta (funcional)',
      body: `
        <p>O testador <b>não olha o código</b>: projeta os casos a partir da <b>especificação</b>, observando entradas e saídas. Procura funções incorretas ou ausentes, erros de interface, de estruturas de dados, de desempenho e de inicialização e término.</p>
        <table class="table">
          <tr><th>Técnica</th><th>Ideia</th></tr>
          <tr><td><b>Particionamento de equivalência</b></td><td>dividir o domínio de entrada em <b>classes</b> cujos valores o programa trata do mesmo modo; basta <b>um</b> representante por classe, válida ou inválida</td></tr>
          <tr><td><b>Análise de valor limite</b></td><td>os erros se concentram nas <b>fronteiras</b> das classes; testar os valores exatamente no limite, logo abaixo e logo acima</td></tr>
          <tr><td><b>Grafo de causa e efeito / tabela de decisão</b></td><td>combinar condições de entrada (causas) e ações (efeitos)</td></tr>
          <tr><td><b>Teste baseado em casos de uso</b></td><td>exercitar o fluxo principal e os alternativos</td></tr>
        </table>
        <p>Exemplo: campo "idade" que aceita de 18 a 65. <b>Classes:</b> menor que 18 (inválida), de 18 a 65 (válida), maior que 65 (inválida). <b>Valores limite:</b> 17, 18, 65 e 66.</p>`,
      examTip: 'Valor limite <b>complementa</b> o particionamento de equivalência, não o substitui: primeiro definem-se as classes, depois testam-se as bordas.',
      labCue: { label: 'Projetar casos na reta numérica', cue: 'boundary' },
    },
    {
      id: 'test-whitebox',
      funFact: `<b>Cobertura de 100% não prova nada sozinha.</b> Dá para executar todas as linhas de um programa e ainda assim não testar a divisão por zero, se nenhum caso usar o valor zero.`,
      icon: '⬜',
      title: 'Teste caixa-branca (estrutural)',
      body: `
        <p>Os casos de teste são derivados da <b>estrutura interna</b> do código. O objetivo é garantir que os caminhos, as decisões e os laços foram exercitados.</p>
        <ul>
          <li><b>Critérios de cobertura:</b> de comandos (toda instrução executada ao menos uma vez), de decisões ou ramos (cada desvio assume verdadeiro e falso) e de condições.</li>
          <li><b>Teste de caminho básico</b> (McCabe): desenha-se o <b>grafo de fluxo</b>, calcula-se a <b>complexidade ciclomática</b> e gera-se um caso de teste para cada <b>caminho independente</b>.</li>
          <li><b>Teste de laços:</b> zero, uma, duas, um número típico e o máximo de iterações.</li>
          <li><b>Teste de fluxo de dados:</b> acompanha onde as variáveis são definidas e usadas.</li>
        </ul>
        <p>A <b>complexidade ciclomática</b> V(G) pode ser calculada de três formas equivalentes:</p>
        <span class="formula">V(G) = E − N + 2 &nbsp;·&nbsp; V(G) = P + 1 &nbsp;·&nbsp; V(G) = número de regiões</span>
        <p>em que <b>E</b> = arestas, <b>N</b> = nós, <b>P</b> = nós predicados (decisões) e as regiões incluem a área <b>externa</b> ao grafo. O valor de V(G) é o <b>número mínimo de casos de teste</b> para executar cada instrução ao menos uma vez.</p>`,
      examTip: 'Atalho de prova: conte os <code>if</code>, <code>while</code> e <code>for</code> (decisões simples) e <b>some 1</b>.',
      labCue: { label: 'Calcular V(G) no grafo de fluxo', cue: 'cyclomatic' },
    },
    {
      id: 'test-system',
      funFact: `A <b>Netflix</b> criou o <b>Chaos Monkey</b>: um programa que desliga servidores de produção <b>aleatoriamente</b>, em horário comercial, para garantir que o sistema se recupera sozinho. Teste de recuperação levado a sério.`,
      icon: '🧰',
      title: 'Tipos de teste',
      body: `
        <table class="table">
          <tr><th>Teste</th><th>Objetivo</th></tr>
          <tr><td><b>Regressão</b></td><td>reexecutar testes já aprovados para garantir que uma <b>mudança</b> não quebrou o que funcionava</td></tr>
          <tr><td><b>Fumaça</b> (<i>smoke</i>)</td><td>bateria rápida, executada a cada nova construção, para ver se o básico funciona antes de testar a fundo</td></tr>
          <tr><td><b>Recuperação</b></td><td>forçar o sistema a falhar e verificar se a retomada ocorre corretamente</td></tr>
          <tr><td><b>Segurança</b></td><td>tentar invadir e verificar se os mecanismos de proteção resistem</td></tr>
          <tr><td><b>Estresse</b></td><td>submeter a quantidade, frequência ou volume <b>anormais</b> de recursos, além do limite</td></tr>
          <tr><td><b>Desempenho</b></td><td>medir tempo de resposta e uso de recursos sob a carga <b>esperada</b></td></tr>
          <tr><td><b>Usabilidade</b></td><td>avaliar a facilidade de uso com usuários representativos</td></tr>
          <tr><td><b>Aceitação</b></td><td>o cliente valida o sistema contra os seus requisitos (alfa e beta)</td></tr>
        </table>
        <p>Recuperação, segurança, estresse e desempenho são os quatro <b>testes de sistema</b> clássicos de Pressman.</p>`,
      examTip: '<b>Desempenho</b> = carga normal ou prevista. <b>Estresse</b> = <b>além</b> do limite, para ver como o sistema quebra.',
      labCue: { label: 'Que teste é esse?', cue: 'kinds' },
    },
    {
      id: 'test-reviews',
      funFact: `A técnica do <b>pato de borracha</b>, do livro <i>O Programador Pragmático</i>: explique o seu código, linha por linha, para um pato de borracha. Ao ser obrigado a explicar, você mesmo encontra o defeito. É uma revisão com um revisor muito paciente.`,
      icon: '🔎',
      title: 'Revisões e inspeções de software',
      body: `
        <p>Revisões são <b>filtros</b> aplicados aos produtos de trabalho (requisitos, modelos, código, planos de teste) para encontrar defeitos <b>sem executar</b> o software. São a principal técnica de verificação <b>estática</b>.</p>
        <table class="table">
          <tr><th>Tipo</th><th>Característica</th></tr>
          <tr><td><b>Revisão informal</b></td><td>verificação de mesa ou conversa com um colega</td></tr>
          <tr><td><b>Walkthrough</b></td><td>o <b>autor</b> conduz o grupo pelo artefato, simulando a execução</td></tr>
          <tr><td><b>Inspeção</b> (Fagan)</td><td>processo <b>formal</b>, com papéis definidos, checklist e registro dos defeitos</td></tr>
          <tr><td><b>Revisão técnica formal (RTF)</b></td><td>termo de Pressman que engloba walkthroughs e inspeções</td></tr>
        </table>
        <p><b>Papéis da inspeção:</b> moderador, autor, leitor, registrador (escrivão) e inspetores. <b>Etapas:</b> planejamento → visão geral → preparação individual → reunião de inspeção → retrabalho → acompanhamento.</p>
        <p><b>Diretrizes de Pressman:</b> revise o <b>produto, não o produtor</b>; fixe uma agenda e cumpra-a; limite o debate; <b>aponte</b> os problemas, mas não tente resolvê-los na reunião; faça anotações; limite os participantes (3 a 5) e exija preparação; use checklists.</p>
        <p><b>Vantagens sobre o teste</b> (Sommerville): um erro <b>não mascara</b> outro; vale para artefatos <b>incompletos</b> e não executáveis; e encontra problemas mais amplos de qualidade (padrões, portabilidade, manutenibilidade). Mas a inspeção <b>não substitui</b> o teste: não avalia comportamento dinâmico, desempenho nem usabilidade.</p>`,
      examTip: 'Na reunião de revisão, o objetivo é <b>encontrar</b> defeitos, não corrigi-los. A correção fica para o <b>retrabalho</b>, depois.',
    },
    {
      id: 'test-plan',
      funFact: `Kent Beck escreveu a primeira versão do <b>JUnit</b> com Erich Gamma (da Gang of Four) durante um <b>voo</b> de Zurique para Atlanta, em 1997.`,
      icon: '🗒️',
      title: 'Plano, caso de teste e automação',
      body: `
        <p>Um <b>caso de teste</b> tem três partes: <b>entradas</b> (e pré-condições), <b>passos de execução</b> e <b>resultado esperado</b>. Sem resultado esperado, não é caso de teste: é só uma execução.</p>
        <p>O <b>plano de teste</b> define o que será testado, a abordagem, os critérios de aprovação e de parada, os recursos, o ambiente e o cronograma.</p>
        <ul>
          <li><b>Teste de defeitos:</b> busca revelar defeitos; o sucesso é fazer o sistema falhar.</li>
          <li><b>Teste de validação:</b> busca demonstrar que o sistema atende aos requisitos.</li>
          <li><b>Teste de release (sistema):</b> feito por equipe independente, normalmente caixa-preta.</li>
        </ul>
        <p>A <b>automação</b> (JUnit e similares) torna barato o <b>teste de regressão</b> e é a base do <b>TDD</b> e da <b>integração contínua</b>.</p>
        <p><b>Quando parar de testar?</b> Nunca se prova a ausência de defeitos; para-se por <b>critério</b>: cobertura atingida, taxa de descoberta de defeitos em queda, prazo ou custo.</p>`,
    },
  ],
  questions: [
    {
      id: 'test-q1',
      difficulty: 'easy',
      prompt: 'Segundo Boehm, qual pergunta define a <b>validação</b>?',
      answer: '"Estamos construindo o produto certo?"',
      distractors: [
        '"Estamos construindo o produto corretamente?"',
        '"Estamos construindo o produto no prazo?"',
        '"Estamos construindo o produto com a ferramenta adequada?"',
      ],
      explanation: 'Validação: o produto certo (necessidades do cliente). Verificação: o produto corretamente (conformidade à especificação).',
    },
    {
      id: 'test-q2',
      difficulty: 'easy',
      prompt: 'Qual técnica de teste projeta os casos a partir da especificação, sem considerar a estrutura interna do código?',
      answer: 'Teste caixa-preta',
      distractors: ['Teste caixa-branca', 'Teste de caminho básico', 'Teste de cobertura de comandos'],
      explanation: 'O caixa-preta (funcional) foca entradas e saídas. Caminho básico e cobertura de comandos são técnicas caixa-branca.',
    },
    {
      id: 'test-q3',
      difficulty: 'easy',
      prompt: 'A ordem correta dos níveis de teste, do menor para o maior escopo, é:',
      answer: 'Unidade, integração, sistema e aceitação.',
      distractors: [
        'Aceitação, sistema, integração e unidade.',
        'Integração, unidade, aceitação e sistema.',
        'Sistema, unidade, aceitação e integração.',
      ],
      explanation: 'Testa-se do pequeno para o grande: módulos isolados, depois as interfaces entre eles, o sistema completo e, por fim, a aceitação pelo cliente.',
    },
    {
      id: 'test-q4',
      difficulty: 'easy',
      prompt: 'Depois de corrigir um defeito, a equipe reexecuta os testes que já haviam passado para garantir que a correção não introduziu novos problemas. Esse é o teste de:',
      answer: 'Regressão',
      distractors: ['Estresse', 'Aceitação', 'Recuperação'],
      explanation: 'O teste de regressão verifica que mudanças não causaram efeitos colaterais em funcionalidades que já funcionavam.',
    },
    {
      id: 'test-q5',
      difficulty: 'medium',
      prompt: 'Um campo aceita valores inteiros de 1 a 100. Pela análise de valor limite, quais valores devem ser testados?',
      answer: '0, 1, 100 e 101',
      distractors: ['50 e 51', '1, 50 e 100', '−100 e 1000'],
      explanation: 'Testam-se as fronteiras: o último valor inválido antes do limite inferior (0), os limites (1 e 100) e o primeiro valor inválido acima (101).',
    },
    {
      id: 'test-q6',
      difficulty: 'medium',
      prompt: 'Um grafo de fluxo possui 9 arestas e 7 nós. A complexidade ciclomática é:',
      answer: '4',
      distractors: ['2', '16', '3'],
      explanation: 'V(G) = E − N + 2 = 9 − 7 + 2 = 4. São necessários pelo menos 4 casos de teste para cobrir os caminhos independentes.',
    },
    {
      id: 'test-q7',
      difficulty: 'medium',
      prompt: 'Na integração descendente (top-down), os módulos subordinados que ainda não foram desenvolvidos são substituídos por:',
      answer: 'Stubs',
      distractors: ['Drivers', 'Protótipos descartáveis', 'Casos de uso'],
      explanation: 'Stub simula o módulo chamado. Driver simula o módulo que chama, e é usado na integração ascendente.',
    },
    {
      id: 'test-q8',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre teste alfa e teste beta?',
      answer: 'O alfa é feito pelo cliente no ambiente do desenvolvedor, de forma controlada; o beta é feito pelos usuários no próprio ambiente, sem controle do desenvolvedor.',
      distractors: [
        'O alfa é um teste de unidade; o beta é um teste de integração.',
        'O alfa é feito depois da entrega; o beta, antes da codificação.',
        'O alfa é caixa-branca feito por usuários; o beta é caixa-preta feito por programadores.',
      ],
      explanation: 'Ambos são testes de aceitação. A diferença é o local e o grau de controle do desenvolvedor.',
    },
    {
      id: 'test-q9',
      difficulty: 'medium',
      prompt: 'Sobre erro, defeito e falha, é correto afirmar:',
      answer: 'O erro é o engano humano; o defeito é a imperfeição introduzida no artefato; a falha é o comportamento incorreto observado na execução.',
      distractors: [
        'A falha é o engano humano; o erro é o comportamento observado; o defeito é o caso de teste.',
        'Os três termos são sinônimos e designam o mesmo fenômeno.',
        'O defeito só existe em documentos; a falha só existe em hardware.',
      ],
      explanation: 'Erro → defeito → falha. Nem todo defeito gera falha: ele precisa ser executado em uma condição que o exponha.',
    },
    {
      id: 'test-q10',
      difficulty: 'medium',
      prompt: 'Uma vantagem das inspeções de software em relação aos testes é que:',
      answer: 'Podem ser aplicadas a artefatos não executáveis ou incompletos, e um defeito encontrado não impede a descoberta de outros.',
      distractors: [
        'Elas medem com precisão o tempo de resposta do sistema.',
        'Elas dispensam a participação de pessoas, por serem totalmente automáticas.',
        'Elas substituem completamente os testes dinâmicos.',
      ],
      explanation: 'Inspeção é verificação estática. Nos testes, uma falha pode mascarar outras. Mas inspeções não avaliam comportamento dinâmico, e por isso não substituem os testes.',
    },
    {
      id: 'test-q11',
      difficulty: 'hard',
      prompt: 'Segundo Myers, um teste bem-sucedido é aquele que:',
      answer: 'Revela um erro ainda não descoberto.',
      distractors: [
        'Executa sem que o programa apresente qualquer falha.',
        'Demonstra que o programa está livre de defeitos.',
        'É executado no menor tempo possível.',
      ],
      explanation: 'O objetivo do teste é encontrar erros. Um teste que nada encontra pode significar apenas que foi mal projetado.',
    },
    {
      id: 'test-q12',
      difficulty: 'hard',
      prompt: 'Um sistema de vendas deve suportar 500 usuários simultâneos. A equipe o submete a 5.000 usuários para observar como ele se comporta e se degrada. Esse é um teste de:',
      answer: 'Estresse',
      distractors: ['Desempenho', 'Regressão', 'Unidade'],
      explanation: 'Estresse: carga muito além do limite especificado. O teste de desempenho mediria o comportamento com a carga prevista (até 500 usuários).',
    },
    {
      id: 'test-q13',
      difficulty: 'hard',
      prompt: 'Uma função contém, em sequência, um <code>if</code>, um <code>while</code> e, dentro do laço, outro <code>if</code>, todos com condições simples. A complexidade ciclomática é:',
      answer: '4',
      distractors: ['3', '5', '6'],
      explanation: 'V(G) = P + 1. Há três nós predicados (dois if e um while): 3 + 1 = 4.',
    },
    {
      id: 'test-q14',
      difficulty: 'medium',
      prompt: 'Em uma reunião de revisão técnica formal, qual diretriz de Pressman deve ser seguida?',
      answer: 'Revisar o produto, não o produtor, apontando os problemas sem tentar resolvê-los durante a reunião.',
      distractors: [
        'Avaliar o desempenho individual do autor para fins de promoção.',
        'Corrigir todos os defeitos encontrados durante a própria reunião.',
        'Dispensar a preparação prévia para economizar tempo dos participantes.',
      ],
      explanation: 'A reunião identifica problemas; a solução fica para depois. A preparação antecipada é exigida, e o foco é o artefato.',
    },
    {
      id: 'test-q15',
      difficulty: 'easy',
      prompt: 'Qual é a diferença entre teste e depuração?',
      answer: 'O teste revela a existência de defeitos; a depuração localiza e corrige a causa.',
      distractors: [
        'O teste corrige os defeitos; a depuração os documenta.',
        'São a mesma atividade com nomes diferentes.',
        'A depuração é feita pelo cliente; o teste, pelo compilador.',
      ],
      explanation: 'A depuração é consequência de um teste que encontrou uma falha: parte do sintoma para chegar à causa.',
    },
    {
      id: 'test-q16',
      difficulty: 'medium',
      prompt: 'Qual das alternativas é uma técnica de verificação <b>estática</b>?',
      answer: 'Inspeção de código',
      distractors: ['Teste de unidade', 'Teste de estresse', 'Teste beta'],
      explanation: 'Técnicas estáticas não executam o programa: inspeções, revisões e análise estática. Todos os testes são técnicas dinâmicas.',
    },
  ],
  openQuestions: [
    {
      id: 'test-o1',
      prompt: 'Diferencie verificação de validação e dê um exemplo de atividade de cada uma.',
      modelAnswer: `
        <p><b>Verificação</b> responde a "estamos construindo o produto corretamente?": confere se o software está de acordo com a sua especificação. Exemplos: inspeção de código, revisão do projeto, teste de unidade.</p>
        <p><b>Validação</b> responde a "estamos construindo o produto certo?": confere se o software atende às necessidades reais do cliente. Exemplos: teste de aceitação, avaliação de um protótipo com os usuários.</p>
        <p>Um sistema pode estar verificado (igual à especificação) e ainda assim não ser válido, se a especificação não refletir o que o cliente precisa.</p>`,
      keyPoints: ['As duas perguntas de Boehm', 'Verificação: conformidade à especificação', 'Validação: necessidades do cliente', 'Um exemplo de cada'],
    },
    {
      id: 'test-o2',
      prompt: 'Compare o teste caixa-preta com o teste caixa-branca, citando uma técnica de cada um.',
      modelAnswer: `
        <p>O teste <b>caixa-preta</b> (funcional) deriva os casos de teste da especificação, sem considerar o código: observa apenas entradas e saídas. Técnicas: particionamento de equivalência e análise de valor limite.</p>
        <p>O teste <b>caixa-branca</b> (estrutural) deriva os casos de teste da estrutura interna do programa, buscando exercitar caminhos, decisões e laços. Técnicas: teste de caminho básico (complexidade ciclomática) e cobertura de comandos e de decisões.</p>
        <p>As abordagens são <b>complementares</b>: a caixa-preta encontra funções incorretas ou ausentes; a caixa-branca encontra erros de lógica em caminhos pouco usados.</p>`,
      keyPoints: ['Caixa-preta: especificação, entradas e saídas', 'Caixa-branca: estrutura interna', 'Uma técnica de cada', 'São complementares'],
    },
    {
      id: 'test-o3',
      prompt: 'Explique os quatro níveis de teste de software.',
      modelAnswer: `
        <p><b>Teste de unidade:</b> verifica cada módulo, função ou classe isoladamente, em geral pelo próprio desenvolvedor.</p>
        <p><b>Teste de integração:</b> verifica as interfaces e a comunicação entre os módulos, combinados de forma incremental (descendente, com stubs, ou ascendente, com drivers).</p>
        <p><b>Teste de sistema:</b> verifica o sistema completo em seu ambiente, incluindo requisitos não funcionais (desempenho, segurança, recuperação, estresse).</p>
        <p><b>Teste de aceitação:</b> o cliente valida o sistema com dados reais para decidir se o aceita (testes alfa e beta).</p>`,
      keyPoints: ['Unidade: módulos isolados', 'Integração: interfaces (stubs e drivers)', 'Sistema: sistema completo e RNF', 'Aceitação: cliente, alfa e beta'],
    },
    {
      id: 'test-o4',
      prompt: 'O que é complexidade ciclomática e como ela é usada no teste de software?',
      modelAnswer: `
        <p>É uma métrica proposta por <b>McCabe</b> que mede a complexidade lógica de um programa a partir do seu grafo de fluxo de controle. Corresponde ao número de <b>caminhos independentes</b> do programa.</p>
        <p>Pode ser calculada por <b>V(G) = E − N + 2</b> (arestas e nós), por <b>V(G) = P + 1</b> (nós predicados) ou pelo <b>número de regiões</b> do grafo.</p>
        <p>No teste de caminho básico (caixa-branca), V(G) indica o <b>número mínimo de casos de teste</b> necessários para garantir que todas as instruções sejam executadas ao menos uma vez. Valores altos indicam módulos mais propensos a erros e difíceis de manter.</p>`,
      keyPoints: ['McCabe; número de caminhos independentes', 'Pelo menos uma das fórmulas', 'Número mínimo de casos de teste (caminho básico)', 'Técnica caixa-branca'],
    },
    {
      id: 'test-o5',
      prompt: 'O que é uma inspeção de software e quais são as suas vantagens em relação ao teste?',
      modelAnswer: `
        <p>Inspeção é uma técnica de verificação <b>estática</b> e <b>formal</b> em que uma equipe examina um artefato (requisitos, projeto, código) para encontrar defeitos, sem executar o software. Tem papéis definidos (moderador, autor, leitor, registrador, inspetores), uso de checklist e etapas: planejamento, visão geral, preparação individual, reunião, retrabalho e acompanhamento.</p>
        <p><b>Vantagens:</b> pode ser aplicada cedo e a artefatos incompletos; vários defeitos são encontrados em uma única sessão, pois um não mascara o outro; e identifica também problemas de padrão e de manutenibilidade.</p>
        <p><b>Limite:</b> não avalia o comportamento dinâmico (desempenho, usabilidade), portanto complementa, mas não substitui, o teste.</p>`,
      keyPoints: ['Verificação estática: não executa o software', 'Processo formal com papéis', 'Defeitos encontrados cedo; um não mascara outro', 'Complementa o teste'],
    },
  ],
  flashcards: [
    { id: 'test-f1', front: 'Verificação: qual é a pergunta?', back: '"Estamos construindo o produto corretamente?" (conforme a especificação).' },
    { id: 'test-f2', front: 'Validação: qual é a pergunta?', back: '"Estamos construindo o produto certo?" (o que o cliente precisa).' },
    { id: 'test-f3', front: 'Erro × defeito × falha?', back: 'Erro: engano humano. Defeito: imperfeição no artefato. Falha: comportamento incorreto observado.' },
    { id: 'test-f4', front: 'Os 4 níveis de teste?', back: 'Unidade, integração, sistema e aceitação.' },
    { id: 'test-f5', front: 'Stub × driver?', back: 'Stub simula o módulo chamado (top-down). Driver simula o módulo que chama (bottom-up).' },
    { id: 'test-f6', front: 'As 3 fórmulas da complexidade ciclomática?', back: 'V(G) = E − N + 2 = P + 1 = número de regiões.' },
    { id: 'test-f7', front: 'Duas técnicas caixa-preta?', back: 'Particionamento de equivalência e análise de valor limite.' },
    { id: 'test-f8', front: 'Teste alfa × teste beta?', back: 'Alfa: no ambiente do desenvolvedor. Beta: no ambiente do cliente.' },
    { id: 'test-f9', front: 'Estresse × desempenho?', back: 'Desempenho: carga esperada. Estresse: carga além do limite.' },
    { id: 'test-f10', front: 'O que é teste de regressão?', back: 'Reexecutar testes após uma mudança para garantir que nada que funcionava quebrou.' },
    { id: 'test-f11', front: 'Frase de Dijkstra sobre testes?', back: 'O teste mostra a presença de defeitos, nunca a sua ausência.' },
    { id: 'test-f12', front: 'Quando um teste é bem-sucedido, para Myers?', back: 'Quando revela um erro ainda não descoberto.' },
    { id: 'test-f13', front: 'Etapas da inspeção de Fagan?', back: 'Planejamento, visão geral, preparação individual, reunião de inspeção, retrabalho e acompanhamento.' },
    { id: 'test-f14', front: 'V&V estática × dinâmica?', back: 'Estática: inspeções e revisões, sem executar. Dinâmica: testes, executando o programa.' },
  ],
  cheatSheet: [
    { term: 'Verificação', definition: 'Produto corretamente: conforme a especificação.' },
    { term: 'Validação', definition: 'Produto certo: o que o cliente precisa.' },
    { term: 'Erro → defeito → falha', definition: 'Engano humano → imperfeição no artefato → comportamento incorreto.' },
    { term: 'Níveis', definition: 'Unidade → integração (stubs e drivers) → sistema → aceitação (alfa e beta).' },
    { term: 'Caixa-preta', definition: 'Pela especificação: particionamento de equivalência, valor limite, tabela de decisão.' },
    { term: 'Caixa-branca', definition: 'Pela estrutura: caminho básico, cobertura de comandos e decisões, laços.' },
    { term: 'Complexidade ciclomática', definition: 'V(G) = E − N + 2 = P + 1 = regiões.' },
    { term: 'Testes de sistema', definition: 'Recuperação, segurança, estresse, desempenho.' },
    { term: 'Regressão', definition: 'Reteste após mudança.' },
    { term: 'Inspeção', definition: 'Verificação estática formal: moderador, autor, leitor, registrador; não substitui o teste.' },
  ],
};
