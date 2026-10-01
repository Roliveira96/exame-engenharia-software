import type { LabPanel } from '../labs/Lab';
import { query, queryAll, shuffle } from '../app/html';

export interface ClassifierCategory {
  id: string;
  label: string;
  /** One-line reminder of what the category means. */
  hint: string;
  /** Any CSS color. */
  color: string;
}

export interface ClassifierItem {
  text: string;
  category: string;
  explanation: string;
}

export interface ClassifierLabels {
  round: (current: number, total: number) => string;
  streak: (count: number) => string;
  correct: string;
  wrong: (rightLabel: string) => string;
  next: string;
  finishedTitle: (hits: number, total: number) => string;
  finishedPerfect: string;
  finishedReview: string;
  playAgain: string;
  keyboardHint: string;
}

export interface ClassifierConfig {
  id: string;
  label: string;
  title: string;
  /** HTML shown above the deck. */
  intro: string;
  categories: ClassifierCategory[];
  items: ClassifierItem[];
  /** How many items one match uses (defaults to all of them). */
  rounds?: number;
}

interface Miss {
  item: ClassifierItem;
  chosen: string;
}

/** Card-sorting game: read a statement, pick its category, get the reasoning right away. */
export class ClassifierGame implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: ClassifierConfig;
  private readonly labels: ClassifierLabels;
  private root: HTMLElement | null = null;
  private deck: ClassifierItem[] = [];
  private position: number = 0;
  private hits: number = 0;
  private streak: number = 0;
  private misses: Miss[] = [];
  private locked: boolean = false;
  private readonly onKey = (event: KeyboardEvent): void => this.handleKey(event);

  constructor(config: ClassifierConfig, labels: ClassifierLabels) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.labels = labels;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    document.addEventListener('keydown', this.onKey);
    this.start();
  }

  public unmount(): void {
    document.removeEventListener('keydown', this.onKey);
    this.root = null;
  }

  private start(): void {
    const rounds: number = Math.min(this.config.rounds ?? this.config.items.length, this.config.items.length);
    this.deck = shuffle(this.config.items).slice(0, rounds);
    this.position = 0;
    this.hits = 0;
    this.streak = 0;
    this.misses = [];
    this.renderRound();
  }

  private renderRound(): void {
    if (this.root === null) return;
    this.locked = false;
    const item: ClassifierItem = this.deck[this.position];
    const buttons: string = this.config.categories
      .map((category: ClassifierCategory, index: number) =>
        '<button class="classifier-choice" data-category="' + category.id + '" style="--choice-color:' + category.color + '">' +
        '<kbd>' + (index + 1) + '</kbd><span><b>' + category.label + '</b><small>' + category.hint + '</small></span></button>')
      .join('');
    const dots: string = this.deck
      .map((_: ClassifierItem, index: number) => '<i class="' + (index < this.position ? 'done' : index === this.position ? 'now' : '') + '"></i>')
      .join('');
    this.root.innerHTML =
      '<div class="classifier">' +
      '  <h3 class="panel-title">' + this.config.title + '</h3>' +
      '  <p class="panel-intro">' + this.config.intro + '</p>' +
      '  <div class="classifier-status"><span>' + this.labels.round(this.position + 1, this.deck.length) + '</span>' +
      '    <span class="classifier-dots">' + dots + '</span>' +
      '    <span class="classifier-streak' + (this.streak >= 2 ? ' hot' : '') + '">' + this.labels.streak(this.streak) + '</span></div>' +
      '  <div class="classifier-card"><p>' + item.text + '</p></div>' +
      '  <div class="classifier-choices count-' + this.config.categories.length + '">' + buttons + '</div>' +
      '  <div class="classifier-feedback" hidden></div>' +
      '  <p class="classifier-keys">' + this.labels.keyboardHint + '</p>' +
      '</div>';
    for (const button of queryAll<HTMLButtonElement>(this.root, '.classifier-choice')) {
      button.addEventListener('click', () => this.answer(button.dataset.category ?? ''));
    }
  }

  private answer(categoryId: string): void {
    if (this.root === null || this.locked) return;
    this.locked = true;
    const item: ClassifierItem = this.deck[this.position];
    const correct: boolean = categoryId === item.category;
    const right: ClassifierCategory = this.category(item.category);
    const card: HTMLElement = query(this.root, '.classifier-card');
    card.classList.add(correct ? 'right' : 'wrong');
    for (const button of queryAll<HTMLButtonElement>(this.root, '.classifier-choice')) {
      button.disabled = true;
      if (button.dataset.category === item.category) button.classList.add('is-answer');
      else if (button.dataset.category === categoryId) button.classList.add('is-mistake');
    }
    if (correct) {
      this.hits++;
      this.streak++;
    } else {
      this.streak = 0;
      this.misses.push({ item, chosen: categoryId });
    }
    const feedback: HTMLElement = query(this.root, '.classifier-feedback');
    feedback.hidden = false;
    feedback.className = 'classifier-feedback ' + (correct ? 'right' : 'wrong');
    feedback.innerHTML =
      '<div><b>' + (correct ? this.labels.correct : this.labels.wrong(right.label)) + '</b> ' + item.explanation + '</div>' +
      '<button class="primary-button classifier-next">' + this.labels.next + ' <kbd>↵</kbd></button>';
    query(feedback, '.classifier-next').addEventListener('click', () => this.advance());
  }

  private advance(): void {
    this.position++;
    if (this.position >= this.deck.length) this.renderSummary();
    else this.renderRound();
  }

  private renderSummary(): void {
    if (this.root === null) return;
    const total: number = this.deck.length;
    const missList: string = this.misses
      .map((miss: Miss) =>
        '<li><p>' + miss.item.text + '</p><span style="--choice-color:' + this.category(miss.item.category).color + '">' +
        this.category(miss.item.category).label + '</span><small>' + miss.item.explanation + '</small></li>')
      .join('');
    const ratio: number = total === 0 ? 0 : this.hits / total;
    this.root.innerHTML =
      '<div class="classifier classifier-summary">' +
      '  <div class="score-ring" style="--ratio:' + ratio + '"><b>' + Math.round(ratio * 100) + '%</b></div>' +
      '  <h3 class="panel-title">' + this.labels.finishedTitle(this.hits, total) + '</h3>' +
      '  <p class="panel-intro">' + (this.misses.length === 0 ? this.labels.finishedPerfect : this.labels.finishedReview) + '</p>' +
      (missList === '' ? '' : '<ul class="classifier-misses">' + missList + '</ul>') +
      '  <button class="primary-button classifier-again">' + this.labels.playAgain + '</button>' +
      '</div>';
    query(this.root, '.classifier-again').addEventListener('click', () => this.start());
  }

  private handleKey(event: KeyboardEvent): void {
    if (this.root === null || this.root.offsetParent === null) return;
    const target: EventTarget | null = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
    if (event.key === 'Enter' && this.locked) {
      const next: HTMLElement | null = this.root.querySelector('.classifier-next');
      if (next !== null) {
        event.preventDefault();
        this.advance();
      }
      return;
    }
    const index: number = Number(event.key) - 1;
    if (!this.locked && Number.isInteger(index) && index >= 0 && index < this.config.categories.length) {
      this.answer(this.config.categories[index].id);
    }
  }

  private category(id: string): ClassifierCategory {
    const found: ClassifierCategory | undefined = this.config.categories.find((category: ClassifierCategory) => category.id === id);
    if (found === undefined) throw new Error('Unknown classifier category: ' + id);
    return found;
  }
}
