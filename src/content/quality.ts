import type { Topic } from './Topic';

export const quality: Topic = {
  id: 'quality',
  number: 6,
  unit: 3,
  title: 'Qualidade e produto de software',
  subtitle: 'produto × processo · ISO 9126 · McCall · SQA · CMMI · MPS.BR',
  icon: '🏅',
  color: '--c-qual',
  summary: 'O que é qualidade em software, como avaliá-la no produto (ISO 9126) e no processo (CMMI, MPS.BR) e quanto custa garanti-la.',
  tags: ['ISO 9126', 'McCall', 'garantia × controle', 'CMMI', 'MPS.BR'],
  lessons: [
    {
      id: 'qual-product',
      icon: '📦',
      title: 'O produto de software',
      body: `
        <p>Para Pressman, o software tem um <b>duplo papel</b>: é um <b>produto</b> (transforma informação) e, ao mesmo tempo, o <b>veículo</b> que entrega o produto (controla o computador, a rede e outros programas).</p>
        <p><b>Categorias de software</b> (Pressman):</p>
        <table class="table">
          <tr><td><b>Básico (de sistema)</b></td><td>programas que servem a outros programas: compiladores, sistemas operacionais, drivers</td></tr>
          <tr><td><b>De tempo real</b></td><td>monitora e controla eventos do mundo real conforme ocorrem</td></tr>
          <tr><td><b>Comercial</b></td><td>processamento de informações de negócio: folha, estoque, contas a pagar</td></tr>
          <tr><td><b>Científico e de engenharia</b></td><td>algoritmos de processamento numérico intenso: simulação, CAD</td></tr>
          <tr><td><b>Embutido (embarcado)</b></td><td>reside no produto e controla as suas funções: forno de micro-ondas, injeção eletrônica</td></tr>
          <tr><td><b>De computador pessoal</b></td><td>editores de texto, planilhas, multimídia</td></tr>
          <tr><td><b>Baseado na web</b></td><td>páginas e aplicações acessadas por navegador</td></tr>
          <tr><td><b>De inteligência artificial</b></td><td>algoritmos não numéricos para problemas complexos: sistemas especialistas, reconhecimento de padrões</td></tr>
        </table>
        <p><b>Software legado</b> é o sistema antigo que continua essencial ao negócio, mas é caro e arriscado de manter e de substituir.</p>`,
      examTip: 'Software <b>embutido</b> fica <b>dentro</b> de um produto (memória só de leitura) e controla as funções dele. Não confunda com software de <b>tempo real</b>, que é definido pela restrição de <b>tempo de resposta</b>.',
    },
    {
      id: 'qual-concept',
      icon: '💎',
      title: 'O que é qualidade de software',
      body: `
        <p><b>Pressman:</b> qualidade é a <b>conformidade</b> a (1) requisitos funcionais e de desempenho <b>explicitamente declarados</b>, (2) padrões de desenvolvimento <b>documentados</b> e (3) características <b>implícitas</b> esperadas de todo software desenvolvido profissionalmente.</p>
        <p>Três lições dessa definição:</p>
        <ul>
          <li>Os <b>requisitos</b> são a base para medir qualidade: falta de conformidade é falta de qualidade.</li>
          <li>Os <b>padrões</b> definem os critérios que guiam o desenvolvimento.</li>
          <li>Atender só ao que está escrito <b>não basta</b>: se o software é difícil de usar ou de manter, a qualidade é duvidosa.</li>
        </ul>
        <table class="table">
          <tr><td><b>Qualidade de projeto</b></td><td>as características que os projetistas <b>especificam</b> para o produto</td></tr>
          <tr><td><b>Qualidade de conformidade</b></td><td>o grau em que as especificações são <b>seguidas</b> na construção</td></tr>
        </table>
        <p>Outras definições clássicas: Crosby, "<b>conformidade com os requisitos</b>"; Juran, "<b>adequação ao uso</b>".</p>`,
      mnemonic: 'Qualidade = requisitos <b>explícitos</b> + padrões <b>documentados</b> + expectativas <b>implícitas</b>.',
    },
    {
      id: 'qual-product-process',
      icon: '⚖️',
      title: 'Qualidade de produto × qualidade de processo',
      body: `
        <table class="table">
          <tr><th></th><th>Qualidade de produto</th><th>Qualidade de processo</th></tr>
          <tr><td><b>O que avalia</b></td><td>as características do <b>software pronto</b></td><td><b>como</b> o software é desenvolvido e mantido</td></tr>
          <tr><td><b>Pergunta</b></td><td>o software é confiável, eficiente, fácil de usar?</td><td>a organização trabalha de forma disciplinada, medida e repetível?</td></tr>
          <tr><td><b>Referências</b></td><td><b>ISO/IEC 9126</b>, ISO/IEC 25010, fatores de McCall</td><td><b>CMMI</b>, <b>MPS.BR</b>, ISO/IEC 12207, ISO/IEC 15504, ISO 9001</td></tr>
        </table>
        <p>A premissa da gerência de qualidade é que a <b>qualidade do processo influencia diretamente a qualidade do produto</b>. Sommerville alerta que, em software, essa relação é mais complexa do que na manufatura: pesam também as <b>pessoas</b>, a <b>tecnologia</b>, o <b>custo</b> e o <b>prazo</b>.</p>`,
      examTip: '<b>ISO 9126 → produto</b>. <b>CMMI e MPS.BR → processo</b>. Se a questão pergunta sobre "maturidade", é processo.',
      labCue: { label: 'Produto ou processo?', cue: 'scope' },
    },
    {
      id: 'qual-iso9126',
      icon: '🎡',
      title: 'ISO/IEC 9126: as seis características',
      body: `
        <table class="table">
          <tr><th>Característica</th><th>Pergunta</th><th>Subcaracterísticas</th></tr>
          <tr><td><b>Funcionalidade</b></td><td>Faz o que é necessário?</td><td>adequação, acurácia, interoperabilidade, segurança de acesso, conformidade</td></tr>
          <tr><td><b>Confiabilidade</b></td><td>Mantém o desempenho sem falhar?</td><td>maturidade, tolerância a falhas, recuperabilidade</td></tr>
          <tr><td><b>Usabilidade</b></td><td>É fácil de entender e usar?</td><td>inteligibilidade, apreensibilidade, operacionalidade, atratividade</td></tr>
          <tr><td><b>Eficiência</b></td><td>É rápido e econômico?</td><td>comportamento em relação ao tempo, utilização de recursos</td></tr>
          <tr><td><b>Manutenibilidade</b></td><td>É fácil de modificar?</td><td>analisabilidade, modificabilidade, estabilidade, testabilidade</td></tr>
          <tr><td><b>Portabilidade</b></td><td>É fácil de levar para outro ambiente?</td><td>adaptabilidade, capacidade para ser instalado, coexistência, capacidade para substituir</td></tr>
        </table>
        <p>A <b>ISO/IEC 25010</b> (família SQuaRE) substituiu a 9126 e passou a ter <b>oito</b> características: <b>segurança</b> e <b>compatibilidade</b> viraram características próprias, e funcionalidade passou a se chamar <b>adequação funcional</b>.</p>`,
      examTip: 'Na 9126, <b>segurança de acesso</b> é subcaracterística de <b>funcionalidade</b>. Na 25010, segurança é característica própria.',
      mnemonic: '<b>F-C-U-E-M-P</b>: <b>F</b>uncionalidade, <b>C</b>onfiabilidade, <b>U</b>sabilidade, <b>E</b>ficiência, <b>M</b>anutenibilidade, <b>P</b>ortabilidade.',
      labCue: { label: 'Girar a roda da qualidade', cue: 'wheel:iso9126' },
    },
    {
      id: 'qual-mccall',
      icon: '🔺',
      title: 'Fatores de qualidade de McCall',
      body: `
        <p>McCall (1977) organizou os fatores de qualidade em três perspectivas do produto, o chamado <b>triângulo de McCall</b>:</p>
        <table class="table">
          <tr><th>Perspectiva</th><th>Fatores</th></tr>
          <tr><td><b>Operação</b> do produto (usar)</td><td>correção, confiabilidade, eficiência, integridade, usabilidade</td></tr>
          <tr><td><b>Revisão</b> do produto (mudar)</td><td>manutenibilidade, flexibilidade, testabilidade</td></tr>
          <tr><td><b>Transição</b> do produto (levar para outro ambiente)</td><td>portabilidade, reusabilidade, interoperabilidade</td></tr>
        </table>
        <p>Como os fatores são difíceis de medir diretamente, são avaliados por <b>métricas indiretas</b> (por exemplo, numa escala de 0 a 10).</p>`,
      mnemonic: 'Operação = <b>usar</b>. Revisão = <b>mexer</b>. Transição = <b>mudar de lugar</b>.',
    },
    {
      id: 'qual-sqa',
      icon: '🛡️',
      title: 'Garantia × controle de qualidade',
      body: `
        <table class="table">
          <tr><th></th><th>Garantia da qualidade (SQA)</th><th>Controle de qualidade</th></tr>
          <tr><td><b>Foco</b></td><td>o <b>processo</b>: prevenir defeitos</td><td>o <b>produto</b>: detectar defeitos</td></tr>
          <tr><td><b>Natureza</b></td><td>proativa, atividade <b>guarda-chuva</b> ao longo de todo o projeto</td><td>reativa, aplicada aos produtos de trabalho</td></tr>
          <tr><td><b>Exemplos</b></td><td>definir padrões, auditorias, acompanhar a conformidade ao processo</td><td>inspeções, revisões e <b>testes</b></td></tr>
        </table>
        <p>Sommerville divide a gerência de qualidade em três atividades: <b>garantia</b> (definir procedimentos e padrões), <b>planejamento</b> (escolher os padrões aplicáveis ao projeto e definir o plano de qualidade) e <b>controle</b> (verificar se a equipe os seguiu).</p>
        <p>Padrões podem ser de <b>produto</b> (formato de documentos, padrão de codificação) ou de <b>processo</b> (como conduzir revisões, como liberar versões).</p>`,
      examTip: '<b>Teste é controle de qualidade</b>, não garantia. Garantia atua no processo para evitar que o defeito apareça.',
    },
    {
      id: 'qual-cost',
      icon: '💰',
      title: 'Custo da qualidade',
      body: `
        <p>O custo da qualidade inclui tudo o que se gasta para <b>obter</b> qualidade e tudo o que se perde pela <b>falta</b> dela:</p>
        <table class="table">
          <tr><th>Categoria</th><th>Exemplos</th></tr>
          <tr><td><b>Prevenção</b></td><td>planejamento da qualidade, treinamento, revisões técnicas, equipamento de teste</td></tr>
          <tr><td><b>Avaliação</b></td><td>inspeções, testes, calibração e manutenção de equipamentos</td></tr>
          <tr><td><b>Falhas internas</b> (antes da entrega)</td><td>retrabalho, reparo, análise do modo de falha</td></tr>
          <tr><td><b>Falhas externas</b> (depois da entrega)</td><td>atendimento a reclamações, devolução e substituição, suporte, garantia</td></tr>
        </table>
        <p>O custo de encontrar e corrigir um defeito <b>cresce dramaticamente</b> ao longo do ciclo: barato na prevenção, caro nos testes, muito mais caro em produção.</p>`,
      labCue: { label: 'Classificar custos da qualidade', cue: 'cost' },
    },
    {
      id: 'qual-maturity',
      icon: '🪜',
      title: 'Modelos de maturidade: CMMI e MPS.BR',
      body: `
        <p>O <b>CMMI</b> (<i>Capability Maturity Model Integration</i>), do SEI, avalia a <b>maturidade do processo</b> da organização em cinco níveis (representação por estágios):</p>
        <ol>
          <li><b>Inicial</b>: processo imprevisível, reativo; o sucesso depende de "heróis".</li>
          <li><b>Gerenciado</b>: processos planejados e controlados <b>por projeto</b> (requisitos, planejamento, configuração, medição).</li>
          <li><b>Definido</b>: processo <b>padrão da organização</b>, adaptado a cada projeto; postura proativa.</li>
          <li><b>Gerenciado quantitativamente</b>: processo medido e controlado com <b>técnicas estatísticas</b>.</li>
          <li><b>Em otimização</b>: foco em <b>melhoria contínua</b> e inovação.</li>
        </ol>
        <p>O <b>MPS.BR</b> (Melhoria de Processo do Software Brasileiro, da SOFTEX) é compatível com o CMMI e com as normas ISO/IEC 12207 e 15504, mas tem <b>sete níveis</b>, de <b>G</b> (o mais baixo) a <b>A</b> (o mais alto). Mais degraus tornam a evolução mais <b>gradual e barata</b>, adequada a micro, pequenas e médias empresas.</p>
        <p>Outras referências: <b>ISO 9001</b> (sistema de gestão da qualidade, genérico), <b>ISO/IEC 12207</b> (processos do ciclo de vida de software) e <b>ISO/IEC 15504</b> (SPICE, avaliação de processos).</p>`,
      examTip: 'No MPS.BR a escala é <b>invertida</b>: <b>G é o primeiro</b> nível e <b>A é o topo</b>. No CMMI, o nível 1 não exige nada: toda organização já está nele.',
      mnemonic: 'CMMI: <b>I-G-D-Q-O</b> (Inicial, Gerenciado, Definido, Quantitativamente gerenciado, Otimização).',
      labCue: { label: 'Subir a escada de maturidade', cue: 'maturity:cmmi' },
    },
  ],
  questions: [
    {
      id: 'qual-q1',
      difficulty: 'easy',
      prompt: 'A norma ISO/IEC 9126 define um modelo de qualidade para:',
      answer: 'O produto de software, com seis características: funcionalidade, confiabilidade, usabilidade, eficiência, manutenibilidade e portabilidade.',
      distractors: [
        'O processo de software, com cinco níveis de maturidade.',
        'A gerência de projetos, com dez áreas de conhecimento.',
        'A estimativa de esforço, com três modos de projeto.',
      ],
      explanation: 'A 9126 trata da qualidade do produto. Níveis de maturidade são do CMMI; modos de projeto são do COCOMO.',
    },
    {
      id: 'qual-q2',
      difficulty: 'easy',
      prompt: 'Quantos níveis de maturidade tem o CMMI (representação por estágios) e qual é o mais alto?',
      answer: 'Cinco níveis; o mais alto é o nível 5, "em otimização".',
      distractors: [
        'Sete níveis; o mais alto é o nível A.',
        'Três níveis; o mais alto é o "definido".',
        'Cinco níveis; o mais alto é o "gerenciado quantitativamente".',
      ],
      explanation: 'CMMI: 1 inicial, 2 gerenciado, 3 definido, 4 gerenciado quantitativamente, 5 em otimização. Sete níveis (G a A) são do MPS.BR.',
    },
    {
      id: 'qual-q3',
      difficulty: 'easy',
      prompt: 'No MPS.BR, qual é o primeiro nível de maturidade que uma empresa pode alcançar?',
      answer: 'Nível G (parcialmente gerenciado)',
      distractors: ['Nível A (em otimização)', 'Nível 1 (inicial)', 'Nível C (definido)'],
      explanation: 'A escala do MPS.BR vai de G (mais baixo) a A (mais alto). O nível G exige gerência de projetos e gerência de requisitos.',
    },
    {
      id: 'qual-q4',
      difficulty: 'medium',
      prompt: 'Qual é a diferença entre garantia da qualidade e controle de qualidade?',
      answer: 'A garantia atua sobre o processo para prevenir defeitos; o controle avalia os produtos de trabalho para detectar defeitos.',
      distractors: [
        'A garantia é feita apenas pelos testadores; o controle, apenas pelos programadores.',
        'A garantia ocorre depois da entrega; o controle ocorre antes do levantamento de requisitos.',
        'São sinônimos: ambas se referem exclusivamente à execução de testes.',
      ],
      explanation: 'Garantia = processo, prevenção, atividade guarda-chuva. Controle = produto, detecção (inspeções, revisões, testes).',
    },
    {
      id: 'qual-q5',
      difficulty: 'medium',
      prompt: 'Na ISO/IEC 9126, as subcaracterísticas "maturidade, tolerância a falhas e recuperabilidade" pertencem a qual característica?',
      answer: 'Confiabilidade',
      distractors: ['Funcionalidade', 'Manutenibilidade', 'Eficiência'],
      explanation: 'Confiabilidade é a capacidade de manter o nível de desempenho sob condições estabelecidas, por um período de tempo.',
    },
    {
      id: 'qual-q6',
      difficulty: 'medium',
      prompt: 'O retrabalho para corrigir um defeito encontrado nos testes, antes de o produto ser entregue ao cliente, é um custo de:',
      answer: 'Falha interna',
      distractors: ['Prevenção', 'Avaliação', 'Falha externa'],
      explanation: 'Falhas internas são detectadas antes da entrega. O teste em si é custo de avaliação; o retrabalho que ele provoca é custo de falha interna.',
    },
    {
      id: 'qual-q7',
      difficulty: 'medium',
      prompt: 'Uma organização possui um processo padrão documentado, usado por todos os projetos, que o adaptam às suas necessidades. Em qual nível do CMMI ela se encontra?',
      answer: 'Nível 3: definido',
      distractors: ['Nível 1: inicial', 'Nível 2: gerenciado', 'Nível 5: em otimização'],
      explanation: 'No nível 2 a gestão é por projeto. O nível 3 se caracteriza pelo processo padrão da organização, adaptado a cada projeto.',
    },
    {
      id: 'qual-q8',
      difficulty: 'medium',
      prompt: 'Nos fatores de qualidade de McCall, manutenibilidade, flexibilidade e testabilidade pertencem à perspectiva de:',
      answer: 'Revisão do produto',
      distractors: ['Operação do produto', 'Transição do produto', 'Implantação do produto'],
      explanation: 'Operação: correção, confiabilidade, eficiência, integridade, usabilidade. Revisão: manutenibilidade, flexibilidade, testabilidade. Transição: portabilidade, reusabilidade, interoperabilidade.',
    },
    {
      id: 'qual-q9',
      difficulty: 'medium',
      prompt: 'Segundo Pressman, a qualidade de software é a conformidade a:',
      answer: 'Requisitos explicitamente declarados, padrões de desenvolvimento documentados e características implícitas esperadas de todo software profissional.',
      distractors: [
        'Somente os requisitos funcionais descritos no contrato.',
        'Somente a ausência de erros de compilação.',
        'Somente a opinião do gerente de projeto sobre o produto.',
      ],
      explanation: 'A definição tem três partes: requisitos explícitos, padrões documentados e expectativas implícitas (como facilidade de uso e de manutenção).',
    },
    {
      id: 'qual-q10',
      difficulty: 'hard',
      prompt: 'Sobre a relação entre o MPS.BR e o CMMI, é correto afirmar:',
      answer: 'O MPS.BR é compatível com o CMMI, mas divide a evolução em sete níveis, o que permite uma implantação mais gradual e acessível a pequenas e médias empresas.',
      distractors: [
        'O MPS.BR avalia a qualidade do produto, enquanto o CMMI avalia a qualidade do processo.',
        'O MPS.BR possui cinco níveis numerados de 1 a 5, idênticos aos do CMMI.',
        'O MPS.BR é um modelo de ciclo de vida que substitui o cascata.',
      ],
      explanation: 'Ambos são modelos de melhoria de processo. O MPS.BR (SOFTEX) tem níveis de G a A e foi pensado para a realidade das empresas brasileiras.',
    },
    {
      id: 'qual-q11',
      difficulty: 'hard',
      prompt: 'Um software atende a todos os requisitos funcionais especificados, mas os usuários o consideram tão confuso que evitam usá-lo. De acordo com a definição de qualidade de Pressman:',
      answer: 'A qualidade é questionável, pois o software falha em características implícitas esperadas, como a facilidade de uso.',
      distractors: [
        'O software tem qualidade máxima, pois qualidade é apenas conformidade aos requisitos escritos.',
        'A qualidade não pode ser avaliada, pois usabilidade não é atributo de software.',
        'O problema é exclusivamente do usuário e não está relacionado à qualidade.',
      ],
      explanation: 'Atender aos requisitos explícitos sem atender aos implícitos deixa a qualidade em dúvida.',
    },
    {
      id: 'qual-q12',
      difficulty: 'hard',
      prompt: 'Qual das alternativas associa corretamente a norma ou o modelo ao seu foco?',
      answer: 'ISO/IEC 12207: processos do ciclo de vida de software; ISO/IEC 9126: qualidade do produto; CMMI: maturidade do processo.',
      distractors: [
        'ISO/IEC 12207: qualidade do produto; ISO/IEC 9126: maturidade do processo; CMMI: estimativa de custo.',
        'ISO/IEC 9126: processos do ciclo de vida; CMMI: qualidade do produto; ISO/IEC 12207: usabilidade.',
        'CMMI: linguagem de modelagem; ISO/IEC 9126: gestão ambiental; ISO/IEC 12207: segurança da informação.',
      ],
      explanation: 'A 12207 descreve os processos de ciclo de vida; a 9126 (e a 25010) descreve características de qualidade do produto; o CMMI mede maturidade de processo.',
    },
    {
      id: 'qual-q13',
      difficulty: 'easy',
      prompt: 'Qual característica da ISO/IEC 9126 trata da facilidade de transferir o software de um ambiente para outro?',
      answer: 'Portabilidade',
      distractors: ['Usabilidade', 'Eficiência', 'Confiabilidade'],
      explanation: 'Portabilidade: adaptabilidade, capacidade para ser instalado, coexistência e capacidade para substituir.',
    },
    {
      id: 'qual-q14',
      difficulty: 'medium',
      prompt: 'Um software que reside em memória só de leitura e controla as funções de um produto, como um forno de micro-ondas, é classificado por Pressman como:',
      answer: 'Software embutido (embarcado)',
      distractors: ['Software básico', 'Software comercial', 'Software de computador pessoal'],
      explanation: 'O software embutido fica dentro do produto e controla suas funções. Software básico é o que serve a outros programas (compiladores, sistemas operacionais).',
    },
  ],
  openQuestions: [
    {
      id: 'qual-o1',
      prompt: 'Diferencie qualidade de produto de qualidade de processo e cite uma norma ou modelo relacionado a cada uma.',
      modelAnswer: `
        <p><b>Qualidade de produto</b> avalia as características do software construído: se é funcional, confiável, fácil de usar, eficiente, fácil de manter e portável. Referência: <b>ISO/IEC 9126</b> (ou ISO/IEC 25010).</p>
        <p><b>Qualidade de processo</b> avalia a forma como a organização desenvolve e mantém software: se o processo é definido, gerenciado, medido e continuamente melhorado. Referências: <b>CMMI</b> e <b>MPS.BR</b>.</p>
        <p>A premissa é que um processo de qualidade tende a gerar um produto de qualidade, embora pessoas, tecnologia, custo e prazo também influenciem.</p>`,
      keyPoints: ['Produto: características do software', 'Processo: como o software é feito', 'ISO 9126/25010 para produto', 'CMMI/MPS.BR para processo'],
    },
    {
      id: 'qual-o2',
      prompt: 'Cite as seis características de qualidade da ISO/IEC 9126 e explique duas delas.',
      modelAnswer: `
        <p>As seis são: <b>funcionalidade, confiabilidade, usabilidade, eficiência, manutenibilidade e portabilidade</b>.</p>
        <p><b>Confiabilidade:</b> capacidade de o software manter o seu nível de desempenho sob condições estabelecidas (maturidade, tolerância a falhas, recuperabilidade).</p>
        <p><b>Manutenibilidade:</b> facilidade de modificar o software para corrigir, adaptar ou melhorar (analisabilidade, modificabilidade, estabilidade, testabilidade).</p>`,
      keyPoints: ['As seis características', 'Explicação correta de duas', 'Citar subcaracterísticas ajuda'],
    },
    {
      id: 'qual-o3',
      prompt: 'Descreva os cinco níveis de maturidade do CMMI.',
      modelAnswer: `
        <p><b>1. Inicial:</b> processo imprevisível e reativo; os resultados dependem de esforços individuais.</p>
        <p><b>2. Gerenciado:</b> os projetos são planejados, executados e controlados; há gestão de requisitos, de configuração e medição, mas no nível de cada projeto.</p>
        <p><b>3. Definido:</b> existe um processo padrão da organização, documentado e adaptado a cada projeto.</p>
        <p><b>4. Gerenciado quantitativamente:</b> o processo é medido e controlado com base em dados e técnicas estatísticas.</p>
        <p><b>5. Em otimização:</b> a organização melhora continuamente o processo, com base na análise das causas de variação e em inovação.</p>`,
      keyPoints: ['Nomes dos cinco níveis, na ordem', 'Nível 2: gestão por projeto', 'Nível 3: processo padrão da organização', 'Nível 4: quantitativo; nível 5: melhoria contínua'],
    },
    {
      id: 'qual-o4',
      prompt: 'Explique as categorias do custo da qualidade.',
      modelAnswer: `
        <p><b>Custos de prevenção:</b> o que se gasta para evitar defeitos: planejamento da qualidade, treinamento, revisões técnicas.</p>
        <p><b>Custos de avaliação:</b> o que se gasta para verificar o produto: inspeções e testes.</p>
        <p><b>Custos de falhas internas:</b> defeitos detectados antes da entrega: retrabalho e reparo.</p>
        <p><b>Custos de falhas externas:</b> defeitos detectados pelo cliente: suporte, reclamações, substituição, garantia e dano à imagem.</p>
        <p>Investir em prevenção e avaliação reduz os custos de falhas, que são os mais altos.</p>`,
      keyPoints: ['Prevenção', 'Avaliação', 'Falhas internas (antes da entrega)', 'Falhas externas (depois da entrega)'],
    },
  ],
  flashcards: [
    { id: 'qual-f1', front: 'As 6 características da ISO/IEC 9126?', back: 'Funcionalidade, confiabilidade, usabilidade, eficiência, manutenibilidade, portabilidade.' },
    { id: 'qual-f2', front: 'Os 5 níveis do CMMI?', back: '1 inicial, 2 gerenciado, 3 definido, 4 gerenciado quantitativamente, 5 em otimização.' },
    { id: 'qual-f3', front: 'Os níveis do MPS.BR?', back: 'Sete, de G (parcialmente gerenciado) a A (em otimização).' },
    { id: 'qual-f4', front: 'Garantia × controle de qualidade?', back: 'Garantia: processo, prevenção. Controle: produto, detecção (revisões e testes).' },
    { id: 'qual-f5', front: 'Definição de qualidade de Pressman (3 partes)?', back: 'Conformidade a requisitos explícitos, a padrões documentados e a características implícitas esperadas.' },
    { id: 'qual-f6', front: 'As 3 perspectivas de McCall?', back: 'Operação, revisão e transição do produto.' },
    { id: 'qual-f7', front: 'As 4 categorias do custo da qualidade?', back: 'Prevenção, avaliação, falhas internas e falhas externas.' },
    { id: 'qual-f8', front: 'ISO 9126 é de produto ou de processo?', back: 'De produto.' },
    { id: 'qual-f9', front: 'CMMI e MPS.BR são de produto ou de processo?', back: 'De processo (maturidade).' },
    { id: 'qual-f10', front: 'O que caracteriza o nível 3 do CMMI?', back: 'Processo padrão da organização, documentado e adaptado a cada projeto.' },
    { id: 'qual-f11', front: 'Subcaracterísticas de confiabilidade (ISO 9126)?', back: 'Maturidade, tolerância a falhas e recuperabilidade.' },
    { id: 'qual-f12', front: 'O que mudou da ISO 9126 para a ISO 25010?', back: 'De 6 para 8 características: segurança e compatibilidade ganharam espaço próprio.' },
    { id: 'qual-f13', front: 'Qualidade de projeto × de conformidade?', back: 'Projeto: o que foi especificado. Conformidade: o quanto a especificação foi seguida.' },
  ],
  cheatSheet: [
    { term: 'Qualidade (Pressman)', definition: 'Conformidade a requisitos explícitos, padrões documentados e características implícitas.' },
    { term: 'ISO/IEC 9126', definition: 'Produto: funcionalidade, confiabilidade, usabilidade, eficiência, manutenibilidade, portabilidade.' },
    { term: 'ISO/IEC 25010', definition: 'Sucessora da 9126, com 8 características (+ segurança e compatibilidade).' },
    { term: 'McCall', definition: 'Operação, revisão e transição do produto.' },
    { term: 'Garantia × controle', definition: 'Processo/prevenção × produto/detecção.' },
    { term: 'Custo da qualidade', definition: 'Prevenção, avaliação, falhas internas, falhas externas.' },
    { term: 'CMMI', definition: '1 inicial, 2 gerenciado, 3 definido, 4 gerenciado quantitativamente, 5 em otimização.' },
    { term: 'MPS.BR', definition: 'SOFTEX; 7 níveis, de G (base) a A (topo).' },
    { term: 'ISO/IEC 12207', definition: 'Processos do ciclo de vida de software.' },
  ],
};
