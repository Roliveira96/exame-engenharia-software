import { query, queryAll } from '../app/html';

/** One tab of a lab: a self-contained interactive piece. */
export interface LabPanel {
  readonly id: string;
  readonly label: string;
  mount(root: HTMLElement): void;
  unmount(): void;
  /** Reacts to a lesson asking for a specific state (e.g. a model to select). */
  cue?(argument: string): void;
}

/** The interactive side of a topic: a set of panels behind tabs. */
export class Lab {
  private readonly title: string;
  private readonly panels: LabPanel[];
  private root: HTMLElement | null = null;
  private current: LabPanel | null = null;

  constructor(title: string, panels: LabPanel[]) {
    this.title = title;
    this.panels = panels;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const tabs: string = this.panels
      .map((panel: LabPanel) => '<button class="lab-tab" data-panel="' + panel.id + '">' + panel.label + '</button>')
      .join('');
    root.innerHTML =
      '<div class="lab-window">' +
      '  <header class="lab-bar"><span class="lab-title">' + this.title + '</span>' +
      '    <span class="lab-dots" aria-hidden="true"><i></i><i></i><i></i></span></header>' +
      '  <nav class="lab-tabs">' + tabs + '</nav>' +
      '  <div class="lab-stage"></div>' +
      '</div>';
    for (const button of queryAll(root, '.lab-tab')) {
      button.addEventListener('click', () => this.show(button.dataset.panel ?? ''));
    }
    this.show(this.panels[0].id);
  }

  public unmount(): void {
    this.current?.unmount();
    this.current = null;
    this.root = null;
  }

  /** Cue format: "panelId" or "panelId:argument". */
  public cue(cue: string): void {
    const separator: number = cue.indexOf(':');
    const panelId: string = separator === -1 ? cue : cue.slice(0, separator);
    this.show(panelId);
    if (separator !== -1) this.current?.cue?.(cue.slice(separator + 1));
    this.root?.querySelector('.lab-window')?.classList.remove('pulse');
    void this.root?.offsetWidth;
    this.root?.querySelector('.lab-window')?.classList.add('pulse');
  }

  private show(panelId: string): void {
    if (this.root === null) return;
    const panel: LabPanel | undefined = this.panels.find((candidate: LabPanel) => candidate.id === panelId);
    if (panel === undefined) return;
    if (panel !== this.current) {
      this.current?.unmount();
      this.current = panel;
      const stage: HTMLElement = query(this.root, '.lab-stage');
      stage.innerHTML = '';
      stage.scrollTop = 0;
      panel.mount(stage);
    }
    for (const button of queryAll(this.root, '.lab-tab')) {
      button.classList.toggle('active', button.dataset.panel === panelId);
    }
  }
}
