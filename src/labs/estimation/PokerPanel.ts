import type { LabPanel } from '../Lab';
import { query, queryAll } from '../../app/html';

export interface PokerVote {
  name: string;
  vote: number;
}

export interface PokerStory {
  title: string;
  detail: string;
  firstRound: PokerVote[];
  /** HTML with what the highest and the lowest voters explained. */
  discussion: string;
  secondRound: PokerVote[];
  consensus: number;
  /** HTML takeaway shown once the team agrees. */
  lesson: string;
}

export interface PokerConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  deck: number[];
  stories: PokerStory[];
  you: string;
  pickPrompt: string;
  reveal: string;
  discussionTitle: string;
  secondRound: string;
  consensusLabel: (points: number) => string;
  yourVote: { exact: string; close: string; far: (points: number) => string };
  nextStory: string;
  storyCounter: (index: number, total: number) => string;
}

type Phase = 'pick' | 'first' | 'second';

/** Planning poker table: vote, flip the cards, let the extremes explain, vote again. */
export class PokerPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: PokerConfig;
  private root: HTMLElement | null = null;
  private storyIndex: number = 0;
  private phase: Phase = 'pick';
  private pick: number | null = null;

  constructor(config: PokerConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.root = null;
  }

  private render(): void {
    if (this.root === null) return;
    const config: PokerConfig = this.config;
    const story: PokerStory = config.stories[this.storyIndex];
    const votes: PokerVote[] = this.phase === 'second' ? story.secondRound : story.firstRound;
    const faceUp: boolean = this.phase !== 'pick';
    const yourVote: number | null = this.phase === 'second' ? story.consensus : this.pick;
    const table: string = [...votes, { name: config.you, vote: yourVote ?? 0 }]
      .map((vote: PokerVote, index: number) =>
        '<div class="poker-seat' + (vote.name === config.you ? ' you' : '') + '" style="--i:' + index + '">' +
        '<div class="poker-card' + (faceUp ? ' face-up' : '') + (vote.name === config.you && yourVote === null ? ' empty' : '') + '">' +
        '<span class="poker-back">?</span><span class="poker-front">' + vote.vote + '</span></div><small>' + vote.name + '</small></div>')
      .join('');
    const deck: string = config.deck
      .map((points: number) => '<button class="poker-pick' + (this.pick === points ? ' active' : '') + '" data-points="' + points + '">' + points + '</button>')
      .join('');
    let footer: string = '';
    if (this.phase === 'pick') {
      footer = '<p class="poker-prompt">' + config.pickPrompt + '</p><div class="poker-deck">' + deck + '</div>' +
        '<button class="primary-button" data-action="reveal"' + (this.pick === null ? ' disabled' : '') + '>' + config.reveal + '</button>';
    } else if (this.phase === 'first') {
      footer = '<div class="diagram-caption reveal"><b>' + config.discussionTitle + '</b> ' + story.discussion + '</div>' +
        '<button class="primary-button" data-action="second">' + config.secondRound + '</button>';
    } else {
      const distance: number = Math.abs(config.deck.indexOf(this.pick ?? 0) - config.deck.indexOf(story.consensus));
      const verdict: string = distance === 0 ? config.yourVote.exact : distance === 1 ? config.yourVote.close : config.yourVote.far(this.pick ?? 0);
      const last: boolean = this.storyIndex === config.stories.length - 1;
      footer = '<div class="diagram-caption reveal"><b>' + config.consensusLabel(story.consensus) + '</b> ' + verdict + ' ' + story.lesson + '</div>' +
        (last && config.stories.length === 1 ? '' : '<button class="primary-button" data-action="next">' + config.nextStory + '</button>');
    }
    this.root.innerHTML =
      '<div class="poker">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="poker-story"><small>' + config.storyCounter(this.storyIndex + 1, config.stories.length) + '</small><b>' + story.title + '</b><p>' + story.detail + '</p></div>' +
      '  <div class="poker-table">' + table + '</div>' +
      '  <div class="poker-footer">' + footer + '</div>' +
      '</div>';
    for (const button of queryAll(this.root, '.poker-pick')) {
      button.addEventListener('click', () => {
        this.pick = Number(button.dataset.points);
        this.render();
      });
    }
    this.bind('reveal', () => this.setPhase('first'));
    this.bind('second', () => this.setPhase('second'));
    this.bind('next', () => {
      this.storyIndex = (this.storyIndex + 1) % this.config.stories.length;
      this.pick = null;
      this.setPhase('pick');
    });
  }

  private bind(action: string, handler: () => void): void {
    const button: HTMLElement | null = (this.root as HTMLElement).querySelector('[data-action="' + action + '"]');
    button?.addEventListener('click', handler);
  }

  private setPhase(phase: Phase): void {
    this.phase = phase;
    this.render();
    // Cards are rendered face up; replaying the flip makes the reveal visible.
    if (phase !== 'pick' && this.root !== null) {
      for (const card of queryAll(this.root, '.poker-card')) {
        card.classList.remove('face-up');
        void card.offsetWidth;
        card.classList.add('face-up');
      }
      query(this.root, '.poker-table').classList.add('revealing');
    }
  }
}
