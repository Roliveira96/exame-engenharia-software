import type { AuthorProfile } from '../app/Author';

const GITHUB_ICON: string =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
const LINKEDIN_ICON: string =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';
const SITE_ICON: string =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.8 2.7 4 6.1 4 10s-1.2 7.3-4 10m0-20C9.2 4.7 8 8.1 8 12s1.2 7.3 4 10M2 12h20"/></svg>';

export const author: AuthorProfile = {
  name: 'Ricardo Martins de Oliveira',
  role: 'Software Developer / Backend Engineer na Studio4You',
  location: 'Guarapuava, PR',
  about: 'Material de estudo interativo para o exame de suficiência de Engenharia de Software (SI104C), montado sobre a ementa oficial e a bibliografia do plano de ensino.',
  photo: 'ricardo.png',
  links: [
    { label: 'github.com/Roliveira96', url: 'https://github.com/Roliveira96', icon: GITHUB_ICON },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ricardodeoliveira96/', icon: LINKEDIN_ICON },
    { label: 'rmo.dev.br', url: 'https://rmo.dev.br', icon: SITE_ICON },
  ],
};

export const professor = {
  monogram: 'RS',
  name: 'Profª. Renata Stange',
  subject: 'Engenharia de Software · SI104C',
  note: 'Universidade Tecnológica Federal do Paraná - UTFPR · Campus Guarapuava. Exame de suficiência sobre a ementa completa da disciplina.',
};

/** The four units of the official course plan, with the syllabus text of each one. */
export const units: Array<{ number: number; syllabus: string; detail: string }> = [
  {
    number: 1,
    syllabus: 'Introdução à Engenharia de Software. Modelos de ciclo de vida de software.',
    detail: 'Princípios, conceitos e importância da Engenharia de Software. Principais modelos e metodologias de desenvolvimento.',
  },
  {
    number: 2,
    syllabus: 'Metodologias ágeis. Técnicas de levantamento de requisitos.',
    detail: 'Principais métodos ágeis. Requisitos de software: descrição, importância e principais técnicas de levantamento.',
  },
  {
    number: 3,
    syllabus: 'Estimativas e métricas de software. Estudo de viabilidade. Qualidade de software. Produto de software.',
    detail: 'Medidas, medição e métricas. Principais métricas e projeto de estimativas. O produto de software. Qualidade em produto e processo.',
  },
  {
    number: 4,
    syllabus: 'Implantação de software. Manutenção de software. Engenharia de software para web. Testes e revisão de software.',
    detail: 'Aplicações web. Processo de manutenção e implantação. Fundamentos e tipos de testes. Verificação e Validação.',
  },
];

export const bibliography: { basic: string[]; extra: string[] } = {
  basic: [
    'WAZLAWICK, Raul Sidnei. <i>Análise e projeto de sistemas de informação orientados a objetos</i>. 2. ed. Elsevier, 2011.',
    'PRESSMAN, Roger S. <i>Engenharia de software</i>. Makron, 1995.',
    'SOMMERVILLE, Ian. <i>Engenharia de software</i>. 8. ed. Pearson Addison-Wesley, 2007.',
  ],
  extra: [
    'COHN, Mike. <i>Desenvolvimento de software com Scrum: aplicando métodos ágeis com sucesso</i>. Bookman, 2011.',
    'LARMAN, Craig. <i>Utilizando UML e padrões</i>. 3. ed. Bookman, 2007.',
    'BEZERRA, Eduardo. <i>Princípios de análise e projeto de sistemas com UML</i>. 2. ed. Elsevier, 2007.',
    'FOWLER, Martin. <i>UML essencial</i>. 3. ed. Bookman, 2005.',
    'TELES, Vinícius Manhães. <i>Extreme Programming</i>. Novatec, 2004.',
  ],
};
