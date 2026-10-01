import { prefersReducedMotion, query } from '../app/html';

export interface StepControlLabels {
  previous: string;
  play: string;
  pause: string;
  next: string;
  restart: string;
}

const MIN_STEP_MS: number = 3400;
const MAX_STEP_MS: number = 10000;
const BASE_STEP_MS: number = 1800;
const MS_PER_CHARACTER: number = 48;

/** How long a caption should stay on screen so it can actually be read. */
export function readingTime(html: string): number {
  const text: string = html.replace(/<[^>]*>/g, '');
  return Math.min(MAX_STEP_MS, Math.max(MIN_STEP_MS, BASE_STEP_MS + text.length * MS_PER_CHARACTER));
}

/**
 * Debugger-style transport (previous / play / next) that drives any step-by-step animation.
 * While playing, each step stays for as long as its caption takes to read, and a thin bar shows the wait.
 */
export class StepControls {
  private readonly labels: StepControlLabels;
  private readonly onStep: (index: number) => void;
  private durationFor: (index: number) => number;
  private total: number;
  private index: number = 0;
  private timer: number | null = null;
  private playing: boolean = false;
  private root: HTMLElement | null = null;

  constructor(total: number, labels: StepControlLabels, onStep: (index: number) => void, durationFor: (index: number) => number = () => MIN_STEP_MS) {
    this.total = total;
    this.labels = labels;
    this.onStep = onStep;
    this.durationFor = durationFor;
  }

  public renderHtml(): string {
    return '<div class="step-controls">' +
      '<button class="step-button" data-step="previous" title="' + this.labels.previous + '" aria-label="' + this.labels.previous + '">⏮</button>' +
      '<button class="step-button step-play" data-step="play" title="' + this.labels.play + '" aria-label="' + this.labels.play + '">▶</button>' +
      '<button class="step-button" data-step="next" title="' + this.labels.next + '" aria-label="' + this.labels.next + '">⏭</button>' +
      '<span class="step-counter"></span>' +
      '<span class="step-track"><span class="step-fill"></span><span class="step-timer"></span></span>' +
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
      if (this.playing) this.pause();
      else this.play();
    });
    this.refresh();
  }

  public currentIndex(): number {
    return this.index;
  }

  /** Swaps the step count (a different model was selected) and rewinds. */
  public reset(total: number, durationFor?: (index: number) => number): void {
    this.pause();
    this.total = total;
    if (durationFor !== undefined) this.durationFor = durationFor;
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
    this.playing = true;
    this.schedule();
    this.refresh();
  }

  /** Starts playing by itself, unless the reader asked the system for less motion. */
  public autoplay(): void {
    if (!prefersReducedMotion() && this.total > 1) this.play();
  }

  public pause(): void {
    this.playing = false;
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.refresh();
  }

  public destroy(): void {
    this.pause();
    this.root = null;
  }

  private schedule(): void {
    if (this.timer !== null) window.clearTimeout(this.timer);
    const duration: number = this.durationFor(this.index);
    this.restartTimerBar(duration);
    this.timer = window.setTimeout(() => {
      this.timer = null;
      if (this.index >= this.total - 1) {
        this.pause();
        return;
      }
      this.goTo(this.index + 1);
      if (this.index >= this.total - 1) this.pause();
      else this.schedule();
    }, duration);
  }

  /** The countdown bar is a CSS animation, restarted for every step with that step's duration. */
  private restartTimerBar(duration: number): void {
    if (this.root === null) return;
    const bar: HTMLElement = query(this.root, '.step-timer');
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = 'step-timer ' + duration + 'ms linear forwards';
  }

  private refresh(): void {
    if (this.root === null) return;
    const atEnd: boolean = this.index >= this.total - 1;
    const play: HTMLElement = query(this.root, '[data-step="play"]');
    play.textContent = this.playing ? '⏸' : atEnd ? '↺' : '▶';
    const playLabel: string = this.playing ? this.labels.pause : atEnd ? this.labels.restart : this.labels.play;
    play.title = playLabel;
    play.setAttribute('aria-label', playLabel);
    query<HTMLButtonElement>(this.root, '[data-step="previous"]').disabled = this.index === 0;
    query<HTMLButtonElement>(this.root, '[data-step="next"]').disabled = atEnd;
    query(this.root, '.step-counter').textContent = (this.index + 1) + ' / ' + this.total;
    query(this.root, '.step-fill').style.transform = 'scaleX(' + (this.total <= 1 ? 1 : this.index / (this.total - 1)) + ')';
    if (!this.playing) query(this.root, '.step-timer').style.animation = 'none';
    query(this.root, '.step-controls').classList.toggle('playing', this.playing);
  }
}
