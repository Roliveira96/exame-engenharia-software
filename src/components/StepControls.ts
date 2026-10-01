import { query } from '../app/html';

export interface StepControlLabels {
  previous: string;
  play: string;
  pause: string;
  next: string;
  restart: string;
}

/** Debugger-style transport (previous / play / next) that drives any step-by-step animation. */
export class StepControls {
  private readonly labels: StepControlLabels;
  private readonly onStep: (index: number) => void;
  private readonly intervalMs: number;
  private total: number;
  private index: number = 0;
  private timer: number | null = null;
  private root: HTMLElement | null = null;

  constructor(total: number, labels: StepControlLabels, onStep: (index: number) => void, intervalMs: number = 3200) {
    this.total = total;
    this.labels = labels;
    this.onStep = onStep;
    this.intervalMs = intervalMs;
  }

  public renderHtml(): string {
    return '<div class="step-controls">' +
      '<button class="step-button" data-step="previous" title="' + this.labels.previous + '" aria-label="' + this.labels.previous + '">⏮</button>' +
      '<button class="step-button step-play" data-step="play" title="' + this.labels.play + '" aria-label="' + this.labels.play + '">▶</button>' +
      '<button class="step-button" data-step="next" title="' + this.labels.next + '" aria-label="' + this.labels.next + '">⏭</button>' +
      '<span class="step-counter"></span>' +
      '<span class="step-track"><span class="step-fill"></span></span>' +
      '</div>';
  }

  public attach(root: HTMLElement): void {
    this.root = root;
    query(root, '[data-step="previous"]').addEventListener('click', () => {
      this.pause();
      this.goTo(this.index - 1);
    });
    query(root, '[data-step="next"]').addEventListener('click', () => {
      this.pause();
      this.goTo(this.index + 1);
    });
    query(root, '[data-step="play"]').addEventListener('click', () => {
      if (this.timer !== null) this.pause();
      else this.play();
    });
    this.refresh();
  }

  public currentIndex(): number {
    return this.index;
  }

  /** Swaps the step count (a different model was selected) and rewinds. */
  public reset(total: number): void {
    this.pause();
    this.total = total;
    this.index = 0;
    this.refresh();
    this.onStep(0);
  }

  public goTo(index: number): void {
    const clamped: number = Math.min(this.total - 1, Math.max(0, index));
    this.index = clamped;
    this.refresh();
    this.onStep(clamped);
  }

  public play(): void {
    if (this.index >= this.total - 1) this.goTo(0);
    this.timer = window.setInterval(() => {
      if (this.index >= this.total - 1) {
        this.pause();
        return;
      }
      this.goTo(this.index + 1);
    }, this.intervalMs);
    this.refresh();
  }

  public pause(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.refresh();
  }

  public destroy(): void {
    this.pause();
    this.root = null;
  }

  private refresh(): void {
    if (this.root === null) return;
    const playing: boolean = this.timer !== null;
    const atEnd: boolean = this.index >= this.total - 1;
    const play: HTMLElement = query(this.root, '[data-step="play"]');
    play.textContent = playing ? '⏸' : atEnd ? '↺' : '▶';
    const playLabel: string = playing ? this.labels.pause : atEnd ? this.labels.restart : this.labels.play;
    play.title = playLabel;
    play.setAttribute('aria-label', playLabel);
    query<HTMLButtonElement>(this.root, '[data-step="previous"]').disabled = this.index === 0;
    query<HTMLButtonElement>(this.root, '[data-step="next"]').disabled = atEnd;
    query(this.root, '.step-counter').textContent = (this.index + 1) + ' / ' + this.total;
    query(this.root, '.step-fill').style.width = (this.total <= 1 ? 100 : (this.index / (this.total - 1)) * 100) + '%';
  }
}
