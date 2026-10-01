import type { Topic } from './Topic';

export const introduction: Topic = {
  id: 'introduction',
  number: 1,
  unit: 1,
  title: 'Introdução à Engenharia de Software',
  subtitle: 'software · crise do software · camadas · processo · mitos',
  icon: '🧭',
  color: '--c-intro',
  summary: 'O que é software, por que a Engenharia de Software nasceu e quais são as atividades que todo processo tem.',
  tags: ['produto × processo', 'camadas de Pressman', '4 atividades', 'mitos'],
  lessons: [
    {
      id: 'intro-software',
      icon: '💾',
      title: 'O que é software (e por que ele é diferente)',
      body: `
        <p>Para Sommerville, software <b>não é só o programa</b>: é o conjunto de <b>programas + documentação associada + dados de configuração</b> necessários para que o sistema opere corretamente.</p>
        <p>Pressman destaca três características que separam software de hardware:</p>
        <ul>
          <li><b>É desenvolvido (engenheirado), não manufaturado.</b> O custo está no projeto, não na linha de montagem.</li>
          <li><b>Não se desgasta, mas se deteriora.</b> O hardware segue a "curva da banheira"; o software deteriora por causa das <b>mudanças</b>, que introduzem novos defeitos.</li>
          <li><b>A maior parte ainda é feita sob medida</b>, embora a indústria caminhe para a montagem baseada em componentes.</li>
        </ul>
        <table class="table">
          <tr><th>Tipo de produto</th><th>Quem define a especificação</th><th>Exemplo</th></tr>
          <tr><td><b>Genérico</b> (de prateleira)</td><td>A própria empresa que desenvolve</td><td>editor de texto, banco de dados, IDE</td></tr>
          <tr><td><b>Sob encomenda</b> (personalizado)</td><td>O cliente que contrata</td><td>sistema de controle de tráfego aéreo, ERP sob medida</td></tr>
        </table>`,
      examTip: 'Se a questão disser que "software é sinônimo de programa de computador", está <b>errada</b>: documentação e dados de configuração fazem parte do produto.',
      mnemonic: 'Software = <b>P</b>rogramas + <b>D</b>ocumentação + <b>D</b>ados de configuração.',
    },
    {
      id: 'intro-definition',
      icon: '🏗️',
      title: 'O que é Engenharia de Software',
      body: `
        <p><b>Sommerville:</b> disciplina de engenharia relacionada a <b>todos os aspectos da produção de software</b>, desde os estágios iniciais de especificação do sistema até a sua manutenção, depois que ele entrou em operação.</p>
        <p><b>Fritz Bauer (1968):</b> o estabelecimento e uso de sólidos princípios de engenharia para obter, <b>economicamente</b>, software <b>confiável</b> e que funcione <b>eficientemente</b> em máquinas reais.</p>
        <p><b>IEEE:</b> aplicação de uma abordagem <b>sistemática, disciplinada e quantificável</b> ao desenvolvimento, operação e manutenção de software.</p>
        <p>O termo nasceu na <b>conferência da OTAN de 1968</b> (Garmisch, Alemanha), convocada para discutir a <b>crise do software</b>: projetos que estouravam prazo e orçamento, software de baixa qualidade, difícil de manter e que não atendia aos requisitos.</p>
        <table class="table">
          <tr><th>Área</th><th>Foco</th></tr>
          <tr><td>Ciência da computação</td><td>teorias e fundamentos</td></tr>
          <tr><td><b>Engenharia de software</b></td><td>aspectos <b>práticos</b> de desenvolver e entregar software útil</td></tr>
          <tr><td>Engenharia de sistemas</td><td>o sistema inteiro: hardware, software e processos (a ES é uma parte dela)</td></tr>
        </table>`,
      examTip: 'Guarde o trio <b>1968 · OTAN · crise do software</b>. E lembre que a engenharia de software cobre também a <b>gerência do projeto</b> e a <b>manutenção</b>, não só a programação.',
    },
    {
      id: 'intro-layers',
      icon: '🧱',
      title: 'Uma tecnologia em camadas (Pressman)',
      body: `
        <p>Pressman descreve a engenharia de software como uma tecnologia em <b>quatro camadas</b>, cada uma apoiada na de baixo:</p>
        <ol>
          <li><b>Foco na qualidade</b>: a base. É o compromisso organizacional com a qualidade que sustenta todo o resto.</li>
          <li><b>Processo</b>: a "cola" que mantém as camadas unidas; define a estrutura (o <i>arcabouço</i>) para a entrega efetiva do software.</li>
          <li><b>Métodos</b>: o "<b>como fazer</b>" técnico (análise de requisitos, projeto, construção, teste, manutenção).</li>
          <li><b>Ferramentas</b>: o apoio automatizado ou semiautomatizado para processo e métodos (ferramentas <b>CASE</b>).</li>
        </ol>`,
      examTip: 'A pergunta clássica é "<b>qual é a base</b> da engenharia de software?". Resposta: <b>foco na qualidade</b>, não ferramentas nem métodos.',
      mnemonic: 'De cima para baixo: <b>F</b>erramentas, <b>M</b>étodos, <b>P</b>rocesso, <b>Q</b>ualidade. "<b>F</b>aça <b>M</b>eu <b>P</b>rojeto com <b>Q</b>ualidade".',
      labCue: { label: 'Ver as camadas', cue: 'layers' },
    },
    {
      id: 'intro-activities',
      icon: '⚙️',
      title: 'As atividades fundamentais do processo',
      body: `
        <p>Um <b>processo de software</b> é o conjunto de atividades cujo objetivo é o desenvolvimento ou a evolução do software. Existem muitos processos, mas <b>todos</b> incluem quatro atividades (Sommerville):</p>
        <ol>
          <li><b>Especificação</b>: definir o que o sistema deve fazer e suas restrições.</li>
          <li><b>Desenvolvimento</b> (projeto e implementação): produzir o software que atende à especificação.</li>
          <li><b>Validação</b>: garantir que o software faz o que o cliente deseja.</li>
          <li><b>Evolução</b>: modificar o software para atender a novas necessidades.</li>
        </ol>
        <p>Pressman chama de <b>arcabouço genérico</b> as cinco atividades: <b>comunicação, planejamento, modelagem, construção e implantação</b>, complementadas por <b>atividades guarda-chuva</b> (gerência de projeto, garantia de qualidade, gerência de configuração, gestão de riscos, revisões técnicas, medição).</p>
        <p>Na edição de 1995 (a da bibliografia), ele resume em <b>três fases genéricas</b>: <b>definição</b> (o <i>quê</i>), <b>desenvolvimento</b> (o <i>como</i>) e <b>manutenção</b> (as <i>mudanças</i>).</p>`,
      examTip: 'Não confunda <b>processo</b> (as atividades) com <b>modelo de processo</b> (uma representação simplificada do processo, como cascata ou espiral).',
      mnemonic: 'Sommerville: <b>E-D-V-E</b> (Especificar, Desenvolver, Validar, Evoluir).',
      labCue: { label: 'Ver o processo em movimento', cue: 'activities:sommerville' },
    },
    {
      id: 'intro-attributes',
      icon: '⭐',
      title: 'Atributos de um bom software',
      body: `
        <p>Além de entregar a funcionalidade pedida, um bom software tem (Sommerville):</p>
        <table class="table">
          <tr><th>Atributo</th><th>Significa</th></tr>
          <tr><td><b>Facilidade de manutenção</b></td><td>pode evoluir para atender às mudanças de necessidade do cliente</td></tr>
          <tr><td><b>Confiança</b></td><td>confiabilidade, proteção e segurança: não causa danos físicos ou econômicos quando falha</td></tr>
          <tr><td><b>Eficiência</b></td><td>não desperdiça recursos (memória, processador, tempo de resposta)</td></tr>
          <tr><td><b>Usabilidade</b></td><td>fácil de usar, com interface e documentação adequadas ao usuário</td></tr>
        </table>
        <p>Os principais <b>desafios</b> da área, segundo o mesmo autor: <b>heterogeneidade</b> (sistemas distribuídos e de vários tipos), <b>entrega</b> (prazos cada vez menores) e <b>confiança</b> (software em que se possa confiar).</p>`,
      mnemonic: '<b>M-C-E-U</b>: <b>M</b>anutenção, <b>C</b>onfiança, <b>E</b>ficiência, <b>U</b>sabilidade.',
      labCue: { label: 'Treinar os atributos', cue: 'attributes' },
    },
    {
      id: 'intro-myths',
      icon: '🧙',
      title: 'Mitos do software',
      body: `
        <p>Pressman agrupa crenças enganosas que atrapalham projetos em três famílias:</p>
        <table class="table">
          <tr><th>Mito</th><th>Realidade</th></tr>
          <tr><td><b>Gerencial:</b> "Se atrasarmos, colocamos mais programadores e recuperamos o prazo."</td><td>Acrescentar pessoas a um projeto atrasado <b>atrasa ainda mais</b> (Lei de Brooks): quem chega precisa ser treinado por quem já estava produzindo.</td></tr>
          <tr><td><b>Gerencial:</b> "Já temos um manual de padrões, isso basta."</td><td>O manual precisa ser conhecido, atual, completo e de fato usado.</td></tr>
          <tr><td><b>Do cliente:</b> "Uma descrição geral dos objetivos é suficiente para começar a programar."</td><td>Definição inicial ruim é a <b>principal causa</b> de fracasso de projetos.</td></tr>
          <tr><td><b>Do cliente:</b> "Mudanças são fáceis, software é flexível."</td><td>O custo da mudança <b>cresce</b> quanto mais tarde ela é pedida.</td></tr>
          <tr><td><b>Do profissional:</b> "Quando o programa funciona, o trabalho acabou."</td><td>De 60% a 80% do esforço é gasto <b>depois</b> da primeira entrega.</td></tr>
          <tr><td><b>Do profissional:</b> "Só dá para avaliar a qualidade com o programa rodando."</td><td>As <b>revisões técnicas</b> encontram defeitos desde o início do projeto.</td></tr>
          <tr><td><b>Do profissional:</b> "O único produto entregue é o programa funcionando."</td><td>Documentação, modelos e dados também são parte da <b>configuração de software</b>.</td></tr>
        </table>`,
      examTip: 'A <b>Lei de Brooks</b> aparece muito: adicionar gente a projeto atrasado o atrasa mais. É um mito <b>gerencial</b>.',
      labCue: { label: 'Jogar "Mito ou fato?"', cue: 'myths' },
    },
    {
      id: 'intro-principles',
      icon: '📐',
      title: 'Princípios e responsabilidade profissional',
      body: `
        <p>Os <b>sete princípios</b> de David Hooker, citados por Pressman, valem para a prática inteira:</p>
        <ol>
          <li><b>A razão de existir</b>: o software existe para agregar valor ao usuário.</li>
          <li><b>KISS</b> (<i>Keep It Simple, Stupid</i>): todo projeto deve ser o mais simples possível, mas não mais do que isso.</li>
          <li><b>Mantenha a visão</b>: uma visão clara dá integridade conceitual ao sistema.</li>
          <li><b>O que você produz, outros consumirão</b>: especifique, projete e codifique pensando em quem vai ler e manter.</li>
          <li><b>Esteja aberto para o futuro</b>: sistemas de vida longa precisam se adaptar.</li>
          <li><b>Planeje com antecedência o reúso</b>.</li>
          <li><b>Pense!</b> Raciocinar antes de agir quase sempre produz resultados melhores.</li>
        </ol>
        <p>Sommerville lembra que o engenheiro de software tem responsabilidades além da técnica: <b>confidencialidade</b>, <b>competência</b> (não aceitar trabalho fora da sua capacidade), respeito aos <b>direitos de propriedade intelectual</b> e não fazer <b>mau uso de computadores</b>.</p>`,
    },
  ],
  questions: [
    {
      id: 'intro-q1',
      difficulty: 'easy',
      prompt: 'Segundo Sommerville, o que compõe um software?',
      answer: 'Programas de computador, a documentação associada e os dados de configuração necessários para operá-lo.',
      distractors: [
        'Apenas o código-fonte e o código executável do sistema.',
        'O programa executável e o hardware em que ele é instalado.',
        'Somente os diagramas de projeto e os manuais do usuário.',
      ],
      explanation: 'Software é mais do que o programa: inclui a documentação associada e os dados de configuração que permitem ao sistema operar corretamente.',
    },
    {
      id: 'intro-q2',
      difficulty: 'easy',
      prompt: 'Na visão em camadas de Pressman, qual é a camada que serve de <b>base</b> para toda a engenharia de software?',
      answer: 'Foco na qualidade',
      distractors: ['Ferramentas', 'Métodos', 'Processo'],
      explanation: 'A base é o foco na qualidade. Sobre ela vêm o processo (a cola entre as camadas), os métodos (o "como fazer") e, no topo, as ferramentas.',
    },
    {
      id: 'intro-q3',
      difficulty: 'easy',
      prompt: 'O termo "engenharia de software" foi proposto em 1968, em uma conferência da OTAN, como resposta a qual cenário?',
      answer: 'À crise do software: projetos com atraso, orçamento estourado e produtos de baixa qualidade e difíceis de manter.',
      distractors: [
        'Ao surgimento da internet comercial e das primeiras aplicações web.',
        'À publicação do Manifesto Ágil e à rejeição dos processos pesados.',
        'À falta de linguagens de programação de alto nível no mercado.',
      ],
      explanation: 'A conferência de Garmisch (1968) discutiu a chamada crise do software. O Manifesto Ágil só viria em 2001.',
    },
    {
      id: 'intro-q4',
      difficulty: 'easy',
      prompt: 'Quais são as quatro atividades fundamentais comuns a todos os processos de software, segundo Sommerville?',
      answer: 'Especificação, desenvolvimento, validação e evolução.',
      distractors: [
        'Comunicação, planejamento, modelagem e codificação.',
        'Concepção, elaboração, construção e transição.',
        'Análise de riscos, prototipação, teste e implantação.',
      ],
      explanation: 'Especificação, desenvolvimento (projeto e implementação), validação e evolução. "Concepção, elaboração, construção e transição" são as fases do RUP.',
    },
    {
      id: 'intro-q5',
      difficulty: 'medium',
      prompt: 'Um gerente, diante de um projeto atrasado, decide contratar seis programadores para recuperar o prazo. Segundo os mitos de Pressman, o resultado mais provável é:',
      answer: 'O projeto atrasar ainda mais, pois os novos integrantes precisam ser treinados por quem já estava produzindo e a comunicação fica mais complexa.',
      distractors: [
        'O prazo ser recuperado, pois desenvolvimento de software é um processo mecânico como a manufatura.',
        'A qualidade aumentar na mesma proporção do número de pessoas adicionadas.',
        'O custo cair, pois o esforço total é dividido por mais pessoas.',
      ],
      explanation: 'É a Lei de Brooks: adicionar pessoas a um projeto de software atrasado faz com que ele atrase ainda mais. Trata-se de um mito gerencial.',
    },
    {
      id: 'intro-q6',
      difficulty: 'medium',
      prompt: 'Sobre as características do software em comparação com o hardware, assinale a afirmação correta.',
      answer: 'O software não se desgasta, mas se deteriora em razão das sucessivas mudanças feitas ao longo da sua vida.',
      distractors: [
        'O software se desgasta com o uso, seguindo a mesma "curva da banheira" do hardware.',
        'O software é manufaturado em série, por isso o custo se concentra na produção.',
        'Um software com defeito pode ser reparado com peças sobressalentes, como o hardware.',
      ],
      explanation: 'Software é desenvolvido (não manufaturado) e não sofre desgaste físico; ele se deteriora porque cada mudança pode introduzir novos defeitos. Não há peças de reposição.',
    },
    {
      id: 'intro-q7',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre um produto de software <b>genérico</b> e um produto <b>sob encomenda</b>?',
      answer: 'No genérico, a especificação é controlada pela organização que o desenvolve; no sob encomenda, pelo cliente que o contrata.',
      distractors: [
        'O genérico é sempre gratuito, enquanto o sob encomenda é sempre pago.',
        'O genérico não possui documentação, e o sob encomenda possui.',
        'O genérico é desenvolvido com métodos ágeis, e o sob encomenda, com o modelo cascata.',
      ],
      explanation: 'A diferença está em quem controla a especificação: o desenvolvedor (produto genérico, vendido no mercado aberto) ou o cliente (produto personalizado).',
    },
    {
      id: 'intro-q8',
      difficulty: 'medium',
      prompt: 'Qual atributo de um bom software está relacionado à sua capacidade de <b>evoluir</b> para atender a novas necessidades do cliente?',
      answer: 'Facilidade de manutenção',
      distractors: ['Eficiência', 'Usabilidade', 'Confiança'],
      explanation: 'Facilidade de manutenção (manutenibilidade): o software deve ser escrito de modo que possa evoluir, pois a mudança é inevitável.',
    },
    {
      id: 'intro-q9',
      difficulty: 'medium',
      prompt: 'Na visão em camadas de Pressman, qual é o papel da camada de <b>métodos</b>?',
      answer: 'Fornecer o "como fazer" técnico para construir software: análise de requisitos, projeto, construção, teste e manutenção.',
      distractors: [
        'Oferecer apoio automatizado ou semiautomatizado, como as ferramentas CASE.',
        'Manter as camadas unidas e definir o arcabouço para a entrega do software.',
        'Estabelecer o compromisso organizacional com a qualidade.',
      ],
      explanation: 'Métodos = "como fazer". Apoio automatizado é a camada de ferramentas; a "cola" é o processo; o compromisso com a qualidade é a base.',
    },
    {
      id: 'intro-q10',
      difficulty: 'medium',
      prompt: 'O que são as "atividades guarda-chuva" no arcabouço de processo de Pressman?',
      answer: 'Atividades aplicadas ao longo de todo o projeto, como gerência de configuração, garantia de qualidade e gestão de riscos.',
      distractors: [
        'As atividades executadas apenas na fase de manutenção do software.',
        'As tarefas de codificação e teste de unidade feitas pelos programadores.',
        'As reuniões diárias de quinze minutos previstas pelo Scrum.',
      ],
      explanation: 'Elas cobrem todo o processo (daí o nome): acompanhamento e controle do projeto, gestão de riscos, garantia de qualidade, revisões técnicas, medição, gerência de configuração.',
    },
    {
      id: 'intro-q11',
      difficulty: 'hard',
      prompt: 'Considere a afirmação: "A engenharia de software se ocupa apenas dos processos técnicos de desenvolvimento, ficando a gerência de projetos fora do seu escopo". Ela é:',
      answer: 'Falsa: a engenharia de software abrange todos os aspectos da produção, incluindo gerência de projeto e o desenvolvimento de ferramentas, métodos e teorias de apoio.',
      distractors: [
        'Verdadeira: gerência de projetos pertence exclusivamente à administração.',
        'Verdadeira: a engenharia de software termina quando o código é entregue ao cliente.',
        'Falsa: a engenharia de software trata apenas da gerência, e a parte técnica pertence à ciência da computação.',
      ],
      explanation: 'Sommerville: "todos os aspectos da produção de software", o que inclui atividades como o gerenciamento de projetos e vai da especificação até a manutenção.',
    },
    {
      id: 'intro-q12',
      difficulty: 'hard',
      prompt: 'Qual alternativa relaciona corretamente engenharia de software e engenharia de sistemas?',
      answer: 'A engenharia de sistemas trata de todos os aspectos do sistema (hardware, software e processos); a engenharia de software é uma parte dela.',
      distractors: [
        'São sinônimos: os dois termos descrevem exatamente a mesma disciplina.',
        'A engenharia de sistemas trata apenas do hardware e não tem relação com software.',
        'A engenharia de software é mais ampla e contém a engenharia de sistemas.',
      ],
      explanation: 'A engenharia de sistemas é mais abrangente: cuida do desenvolvimento de hardware, do projeto de políticas e processos e da implantação do sistema, além do software.',
    },
    {
      id: 'intro-q13',
      difficulty: 'hard',
      prompt: 'Um cliente afirma: "Podem começar a programar, depois a gente detalha o que o sistema precisa fazer". De acordo com Pressman, essa postura:',
      answer: 'É um mito do cliente: uma definição inicial ruim dos requisitos é a principal causa de fracasso dos projetos de software.',
      distractors: [
        'É correta, pois os requisitos nunca podem ser conhecidos antes da codificação.',
        'É um mito do profissional, pois quem decide quando começar a programar é o programador.',
        'É recomendada pelo modelo cascata, que adia os requisitos para a fase de testes.',
      ],
      explanation: 'É o mito do cliente de que uma declaração geral de objetivos basta. Uma descrição formal e detalhada do domínio, das funções e das restrições é essencial.',
    },
    {
      id: 'intro-q14',
      difficulty: 'easy',
      prompt: 'Qual é a diferença entre <b>processo de software</b> e <b>modelo de processo de software</b>?',
      answer: 'O processo é o conjunto de atividades para produzir o software; o modelo é uma representação simplificada desse processo.',
      distractors: [
        'O processo é a documentação do sistema; o modelo é o código-fonte.',
        'Não há diferença: os dois termos designam os diagramas UML do sistema.',
        'O processo só existe em métodos ágeis; o modelo só existe no cascata.',
      ],
      explanation: 'Modelo de processo (cascata, evolucionário, espiral...) é uma abstração do processo real, apresentada sob uma perspectiva específica.',
    },
  ],
  openQuestions: [
    {
      id: 'intro-o1',
      prompt: 'Defina Engenharia de Software e explique por que ela surgiu.',
      modelAnswer: `
        <p>Engenharia de Software é a disciplina de engenharia que trata de <b>todos os aspectos da produção de software</b>, da especificação inicial até a manutenção, aplicando uma abordagem <b>sistemática, disciplinada e quantificável</b>.</p>
        <p>Ela surgiu no fim dos anos 1960 (conferência da OTAN, 1968) como resposta à <b>crise do software</b>: os sistemas ficavam cada vez maiores e os projetos atrasavam, estouravam o orçamento, tinham baixa qualidade, eram difíceis de manter e não atendiam aos requisitos. O desenvolvimento informal deixou de ser suficiente e passou a exigir métodos, processos e ferramentas de engenharia.</p>`,
      keyPoints: [
        'Abrange todos os aspectos da produção, da especificação à manutenção',
        'Abordagem sistemática, disciplinada e quantificável',
        'Crise do software: atraso, custo, baixa qualidade, manutenção difícil',
        'Conferência da OTAN de 1968',
      ],
    },
    {
      id: 'intro-o2',
      prompt: 'Descreva as quatro camadas da engenharia de software segundo Pressman e a relação entre elas.',
      modelAnswer: `
        <p>A engenharia de software é uma tecnologia em camadas. Na base está o <b>foco na qualidade</b>, o compromisso organizacional que sustenta as demais. Sobre ela está o <b>processo</b>, que une as camadas e define o arcabouço de atividades para a entrega do software. Os <b>métodos</b> fornecem o "como fazer" técnico (requisitos, projeto, construção, teste e manutenção). No topo, as <b>ferramentas</b> dão apoio automatizado ou semiautomatizado ao processo e aos métodos (CASE).</p>
        <p>Cada camada depende da inferior: ferramentas sem método e sem processo apenas automatizam a desordem.</p>`,
      keyPoints: ['Qualidade é a base', 'Processo é a "cola" e define o arcabouço', 'Métodos são o "como fazer"', 'Ferramentas dão apoio automatizado (CASE)'],
    },
    {
      id: 'intro-o3',
      prompt: 'Cite e explique dois mitos do software, indicando a categoria de cada um e a realidade correspondente.',
      modelAnswer: `
        <p><b>Mito gerencial:</b> "se o projeto atrasar, basta acrescentar programadores". Realidade: pela Lei de Brooks, isso atrasa ainda mais, porque a equipe atual precisa parar para treinar os novos e o número de canais de comunicação cresce.</p>
        <p><b>Mito do profissional:</b> "depois que o programa funciona, o trabalho acabou". Realidade: de 60% a 80% do esforço é gasto depois da primeira entrega, em manutenção e evolução.</p>
        <p>(Também valeriam: mito do cliente de que uma descrição geral basta para começar, ou de que mudanças são sempre fáceis.)</p>`,
      keyPoints: ['Categorias: gerencial, do cliente, do profissional', 'Enunciar o mito', 'Apresentar a realidade que o desmente'],
    },
    {
      id: 'intro-o4',
      prompt: 'Diferencie produto de software genérico de produto sob encomenda e dê um exemplo de cada.',
      modelAnswer: `
        <p><b>Produto genérico</b> é um sistema produzido por uma organização e vendido no mercado aberto a qualquer cliente; a <b>especificação é controlada por quem desenvolve</b>. Exemplos: editor de texto, sistema operacional, ferramenta de desenho.</p>
        <p><b>Produto sob encomenda</b> (personalizado) é desenvolvido para um cliente específico, que <b>define a especificação</b>. Exemplos: sistema de controle de tráfego aéreo, sistema acadêmico feito para uma universidade.</p>`,
      keyPoints: ['Quem controla a especificação', 'Mercado aberto × cliente específico', 'Um exemplo coerente de cada tipo'],
    },
  ],
  flashcards: [
    { id: 'intro-f1', front: 'O que compõe um software, segundo Sommerville?', back: 'Programas + documentação associada + dados de configuração.' },
    { id: 'intro-f2', front: 'Quais são as 4 camadas de Pressman, da base ao topo?', back: 'Foco na qualidade → processo → métodos → ferramentas.' },
    { id: 'intro-f3', front: 'Quais são as 4 atividades fundamentais do processo (Sommerville)?', back: 'Especificação, desenvolvimento, validação e evolução.' },
    { id: 'intro-f4', front: 'Quais são as 5 atividades do arcabouço genérico de Pressman?', back: 'Comunicação, planejamento, modelagem, construção e implantação.' },
    { id: 'intro-f5', front: 'Onde e quando nasceu o termo "engenharia de software"?', back: 'Na conferência da OTAN de 1968, em Garmisch (Alemanha), sobre a crise do software.' },
    { id: 'intro-f6', front: 'O que diz a Lei de Brooks?', back: 'Adicionar pessoas a um projeto de software atrasado o atrasa ainda mais.' },
    { id: 'intro-f7', front: 'Quais são os 4 atributos de um bom software?', back: 'Facilidade de manutenção, confiança, eficiência e usabilidade.' },
    { id: 'intro-f8', front: 'Produto genérico × produto sob encomenda: qual é o critério?', back: 'Quem controla a especificação: o desenvolvedor (genérico) ou o cliente (sob encomenda).' },
    { id: 'intro-f9', front: 'O software se desgasta?', back: 'Não. Ele se deteriora por causa das mudanças, que introduzem novos defeitos.' },
    { id: 'intro-f10', front: 'Quais são as três famílias de mitos do software?', back: 'Mitos gerenciais, mitos do cliente e mitos do profissional.' },
    { id: 'intro-f11', front: 'O que são atividades guarda-chuva?', back: 'Atividades que acompanham todo o projeto: gestão de riscos, garantia de qualidade, gerência de configuração, revisões, medição.' },
    { id: 'intro-f12', front: 'Processo × modelo de processo?', back: 'Processo: conjunto de atividades. Modelo: representação simplificada (abstrata) de um processo.' },
  ],
  cheatSheet: [
    { term: 'Software', definition: 'Programas + documentação associada + dados de configuração.' },
    { term: 'Engenharia de software', definition: 'Disciplina de engenharia que cobre todos os aspectos da produção de software, da especificação à manutenção.' },
    { term: 'Crise do software', definition: 'Atrasos, estouro de custo, baixa qualidade e manutenção difícil; motivou a conferência da OTAN de 1968.' },
    { term: 'Camadas (Pressman)', definition: 'Qualidade (base) → processo → métodos → ferramentas.' },
    { term: 'Atividades (Sommerville)', definition: 'Especificação, desenvolvimento, validação, evolução.' },
    { term: 'Arcabouço (Pressman)', definition: 'Comunicação, planejamento, modelagem, construção, implantação + atividades guarda-chuva.' },
    { term: 'Fases genéricas (Pressman 1995)', definition: 'Definição (o quê), desenvolvimento (como), manutenção (mudanças).' },
    { term: 'Bom software', definition: 'Facilidade de manutenção, confiança, eficiência, usabilidade.' },
    { term: 'Lei de Brooks', definition: 'Mais gente em projeto atrasado = mais atraso.' },
    { term: 'Genérico × sob encomenda', definition: 'Especificação definida pelo desenvolvedor × pelo cliente.' },
  ],
};
