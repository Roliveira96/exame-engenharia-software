import type { Screen } from './Screen';
import type { Flashcard, Topic } from '../content/Topic';
import type { TopicCatalog } from '../content/TopicCatalog';
import { ProgressStore } from './ProgressStore';
import { query, queryAll, shuffle } from './html';
import { T } from '../content/uiText';

interface DeckCard {
  topic: Topic;
  card: Flashcard;
}

/** Flashcard drill: flip, then tell whether you already know it; known cards can be filtered out. */
export class FlashcardScreen implements Screen {
  private readonly catalog: TopicCatalog;
  private readonly progress: ProgressStore = ProgressStore.shared;
  private root: HTMLElement | null = null;
  private topicId: string | null;
  private onlyUnknown: boolean = false;
  private deck: DeckCard[] = [];
  private position: number = 0;
  private knownThisRound: number = 0;
  private readonly onKey = (event: KeyboardEvent): void => this.handleKey(event);

  constructor(catalog: TopicCatalog, topicId: string | null) {
    this.catalog = catalog;
    this.topicId = topicId;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    document.addEventListener('keydown', this.onKey);
    const chips: string =
      '<button class="chip" data-topic="">' + T.flash.all + '</button>' +
      this.catalog.list().map((topic: Topic) =>
        '<button class="chip" data-topic="' + topic.id + '" style="--topic-color: var(' + topic.color + ')">' + topic.icon + ' ' + topic.title + '</button>').join('');
    root.innerHTML =
      '<div class="screen flash-screen">' +
      '  <header class="screen-header">' +
      '    <a class="back-button" href="#/">' + T.common.menu + '</a>' +
      '    <div class="screen-title"><span class="screen-icon">🃏</span><div><h1>' + T.flash.title + '</h1><p>' + T.flash.subtitle + '</p></div></div>' +
      '    <span class="brand-utfpr"><img src="/utfpr-logo.svg" alt="UTFPR" /><span>' + T.common.campus + '</span></span>' +
      '  </header>' +
      '  <div class="flash-body">' +
      '    <div class="chips flash-filters">' + chips + '</div>' +
      '    <label class="understood"><input type="checkbox" data-action="unknown"><span>' + T.flash.onlyUnknown + '</span></label>' +
      '    <div class="flash-stage"></div>' +
      '  </div>' +
      '</div>';
    for (const chip of queryAll(root, '.flash-filters .chip')) {
      chip.addEventListener('click', () => {
        this.topicId = chip.dataset.topic === '' ? null : chip.dataset.topic ?? null;
        this.buildDeck();
      });
    }
    const unknown: HTMLInputElement = query<HTMLInputElement>(root, '[data-action="unknown"]');
    unknown.addEventListener('change', () => {
      this.onlyUnknown = unknown.checked;
      this.buildDeck();
    });
    this.buildDeck();
  }

  public unmount(): void {
    document.removeEventListener('keydown', this.onKey);
    this.root = null;
  }

  private buildDeck(): void {
    if (this.root === null) return;
    for (const chip of queryAll(this.root, '.flash-filters .chip')) {
      chip.classList.toggle('active', (chip.dataset.topic ?? '') === (this.topicId ?? ''));
    }
    const cards: DeckCard[] = [];
    for (const topic of this.catalog.list()) {
      if (this.topicId !== null && topic.id !== this.topicId) continue;
      for (const card of topic.flashcards) {
        if (this.onlyUnknown && this.progress.isFlashcardKnown(card.id)) continue;
        cards.push({ topic, card });
      }
    }
    this.deck = shuffle(cards);
    this.position = 0;
    this.knownThisRound = 0;
    this.renderCard();
  }

  private renderCard(): void {
    if (this.root === null) return;
    const stage: HTMLElement = query(this.root, '.flash-stage');
    if (this.deck.length === 0) {
      stage.innerHTML = '<div class="flash-done"><span>✅</span><h2>' + T.flash.emptyTitle + '</h2><p>' + T.flash.emptyText + '</p></div>';
      return;
    }
    if (this.position >= this.deck.length) {
      stage.innerHTML = '<div class="flash-done"><span>🎉</span><h2>' + T.flash.doneTitle + '</h2><p>' +
        T.flash.doneText(this.knownThisRound, this.deck.length) + '</p><button class="primary-button">' + T.flash.restart + '</button></div>';
      query(stage, 'button').addEventListener('click', () => this.buildDeck());
      return;
    }
    const current: DeckCard = this.deck[this.position];
    const knownTotal: number = this.deck.filter((entry: DeckCard) => this.progress.isFlashcardKnown(entry.card.id)).length;
    stage.innerHTML =
      '<div class="flash-status"><span>' + T.flash.counter(this.position + 1, this.deck.length) + '</span>' +
      '<span class="progress-bar"><i style="--ratio:' + this.position / this.deck.length + '"></i></span>' +
      '<span>' + T.flash.known(knownTotal, this.deck.length) + '</span></div>' +
      '<button class="flip-card big" style="--topic-color: var(' + current.topic.color + ')"><span class="flip-inner">' +
      '<span class="flip-face flip-front"><small>' + current.topic.icon + ' ' + current.topic.title + ' · ' + T.flash.front + '</small>' + current.card.front + '</span>' +
      '<span class="flip-face flip-back"><small>' + T.flash.back + '</small>' + current.card.back + '</span></span></button>' +
      '<div class="flash-actions">' +
      '<button class="secondary-button grade-review" data-action="unknown-card">← ' + T.flash.dontKnow + '</button>' +
      '<button class="secondary-button" data-action="flip">' + T.flash.flip + '</button>' +
      '<button class="secondary-button grade-ok" data-action="known-card">' + T.flash.know + ' →</button></div>' +
      '<p class="exam-keys">' + T.flash.keys + '</p>';
    query(stage, '.flip-card').addEventListener('click', () => this.flip());
    query(stage, '[data-action="flip"]').addEventListener('click', () => this.flip());
    query(stage, '[data-action="unknown-card"]').addEventListener('click', () => this.grade(false));
    query(stage, '[data-action="known-card"]').addEventListener('click', () => this.grade(true));
  }

  private flip(): void {
    this.root?.querySelector('.flip-card')?.classList.toggle('flipped');
  }

  private grade(known: boolean): void {
    if (this.position >= this.deck.length) return;
    this.progress.setFlashcardKnown(this.deck[this.position].card.id, known);
    if (known) this.knownThisRound++;
    this.position++;
    this.renderCard();
  }

  private handleKey(event: KeyboardEvent): void {
    if (this.root === null || this.position >= this.deck.length) return;
    if (event.key === ' ') {
      event.preventDefault();
      this.flip();
    } else if (event.key === 'ArrowLeft') {
      this.grade(false);
    } else if (event.key === 'ArrowRight') {
      this.grade(true);
    }
  }
}
