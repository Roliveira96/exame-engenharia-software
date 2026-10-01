import type { LabPanel } from './Lab';
import { StepControls } from '../components/StepControls';
import type { StepControlLabels } from '../components/StepControls';
import { prefersReducedMotion, query, queryAll } from '../app/html';

export type SprintColumn = 'backlog' | 'todo' | 'doing' | 'done';
export type SprintActor = 'po' | 'sm' | 'dev';

export interface SprintStory {
  id: string;
  title: string;
  points: number;
  /** Stories that only show up from a given step on (feedback gathered in the review). */
  appearsAt?: number;
}

export interface SprintStep {
  /** Id of the event this step belongs to (matches SprintConfig.events). */
  event: string;
  /** Sprint day used as the burndown x coordinate; null outside the sprint days. */
  day: number | null;
  actors: SprintActor[];
  /** HTML caption. */
  caption: string;
  moves?: Array<{ story: string; to: SprintColumn }>;
  /** Stories flagged as blocked while this step is showing. */
  blocked?: string[];
}

export interface SprintConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  days: number;
  columns: Record<SprintColumn, string>;
  roles: Record<SprintActor, { name: string; duty: string }>;
  events: Array<{ id: string; name: string }>;
  stories: SprintStory[];
  steps: SprintStep[];
  pointsLabel: string;
  blockedLabel: string;
  burndownTitle: string;
  idealLabel: string;
  realLabel: string;
  dayLabel: string;
}

const COLUMN_ORDER: SprintColumn[] = ['backlog', 'todo', 'doing', 'done'];
const CHART_WIDTH: number = 300;
const CHART_HEIGHT: number = 150;
const CHART_PADDING: number = 26;

interface BoardState {
  columns: Record<SprintColumn, SprintStory[]>;
  blocked: Set<string>;
}

/** Sprint commitment and the points still open after each sprint day, up to a given step. */
export function burndownPoints(config: SprintConfig, upToStep: number): Array<{ day: number; remaining: number }> {
  const location: Map<string, SprintColumn> = new Map<string, SprintColumn>();
  const committed: Set<string> = new Set<string>();
  const points: Array<{ day: number; remaining: number }> = [];
  for (let i = 0; i <= upToStep && i < config.steps.length; i++) {
    const step: SprintStep = config.steps[i];
    for (const move of step.moves ?? []) {
      location.set(move.story, move.to);
      if (move.to !== 'backlog') committed.add(move.story);
    }
    if (step.day === null) continue;
    let remaining: number = 0;
    for (const story of config.stories) {
      if (committed.has(story.id) && location.get(story.id) !== 'done') remaining += story.points;
    }
    const existing = points.find((point) => point.day === step.day);
    if (existing !== undefined) existing.remaining = remaining;
    else points.push({ day: step.day, remaining });
  }
  return points;
}

/** Animated Scrum board: follow one sprint from the ordered backlog to the retrospective. */
export class SprintPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: SprintConfig;
  private readonly controls: StepControls;
  private root: HTMLElement | null = null;

  constructor(config: SprintConfig, controlLabels: StepControlLabels) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.controls = new StepControls(config.steps.length, controlLabels, (index: number) => this.showStep(index), 3600);
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const config: SprintConfig = this.config;
    const events: string = config.events
      .map((event) => '<span class="sprint-event" data-event="' + event.id + '">' + event.name + '</span>')
      .join('<i>→</i>');
    const roles: string = (Object.keys(config.roles) as SprintActor[])
      .map((actor: SprintActor) =>
        '<div class="sprint-role" data-actor="' + actor + '"><b>' + config.roles[actor].name + '</b><small>' + config.roles[actor].duty + '</small></div>')
      .join('');
    const columns: string = COLUMN_ORDER
      .map((column: SprintColumn) =>
        '<div class="sprint-column" data-column="' + column + '"><header><span>' + config.columns[column] + '</span><b></b></header><div class="sprint-cards"></div></div>')
      .join('');
    root.innerHTML =
      '<div class="sprint">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="sprint-events">' + events + '</div>' +
      '  <div class="sprint-roles">' + roles + '</div>' +
      '  <div class="sprint-board">' + columns + '</div>' +
      this.controls.renderHtml() +
      '  <div class="sprint-bottom"><div class="diagram-caption"></div>' +
      '    <figure class="sprint-chart"><figcaption>' + config.burndownTitle + '</figcaption><div class="sprint-chart-svg"></div></figure></div>' +
      '</div>';
    this.controls.attach(root);
    this.controls.reset(config.steps.length);
  }

  public unmount(): void {
    this.controls.destroy();
    this.root = null;
  }

  private stateAt(stepIndex: number): BoardState {
    const location: Map<string, SprintColumn> = new Map<string, SprintColumn>();
    for (const story of this.config.stories) {
      if (story.appearsAt === undefined || story.appearsAt <= stepIndex) location.set(story.id, 'backlog');
    }
    // Stories that moved keep the order in which they arrived in each column.
    const arrival: Map<string, number> = new Map<string, number>();
    let tick: number = 0;
    for (let i = 0; i <= stepIndex; i++) {
      for (const move of this.config.steps[i].moves ?? []) {
        location.set(move.story, move.to);
        arrival.set(move.story, ++tick);
      }
    }
    const columns: Record<SprintColumn, SprintStory[]> = { backlog: [], todo: [], doing: [], done: [] };
    for (const story of this.config.stories) {
      const column: SprintColumn | undefined = location.get(story.id);
      if (column !== undefined) columns[column].push(story);
    }
    for (const column of COLUMN_ORDER) {
      if (column === 'backlog') continue;
      columns[column].sort((a: SprintStory, b: SprintStory) => (arrival.get(a.id) ?? 0) - (arrival.get(b.id) ?? 0));
    }
    return { columns, blocked: new Set<string>(this.config.steps[stepIndex].blocked ?? []) };
  }

  private showStep(index: number): void {
    if (this.root === null) return;
    const root: HTMLElement = this.root;
    const step: SprintStep = this.config.steps[index];
    const state: BoardState = this.stateAt(index);

    // FLIP: remember where each card is, re-render, then animate from the old spot.
    const before: Map<string, DOMRect> = new Map<string, DOMRect>();
    for (const card of queryAll(root, '.sprint-card')) before.set(card.dataset.story ?? '', card.getBoundingClientRect());

    for (const column of COLUMN_ORDER) {
      const element: HTMLElement = query(root, '.sprint-column[data-column="' + column + '"]');
      const stories: SprintStory[] = state.columns[column];
      const total: number = stories.reduce((sum: number, story: SprintStory) => sum + story.points, 0);
      query(element, 'header b').textContent = total + ' ' + this.config.pointsLabel;
      query(element, '.sprint-cards').innerHTML = stories
        .map((story: SprintStory) =>
          '<div class="sprint-card' + (state.blocked.has(story.id) ? ' blocked' : '') + '" data-story="' + story.id + '">' +
          '<span>' + story.title + '</span><b>' + story.points + '</b>' +
          (state.blocked.has(story.id) ? '<em>' + this.config.blockedLabel + '</em>' : '') + '</div>')
        .join('');
    }

    if (!prefersReducedMotion()) {
      for (const card of queryAll(root, '.sprint-card')) {
        const old: DOMRect | undefined = before.get(card.dataset.story ?? '');
        const now: DOMRect = card.getBoundingClientRect();
        if (old === undefined) {
          card.animate([{ opacity: 0, transform: 'scale(0.8)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out' });
        } else if (Math.abs(old.left - now.left) > 1 || Math.abs(old.top - now.top) > 1) {
          card.animate(
            [{ transform: 'translate(' + (old.left - now.left) + 'px,' + (old.top - now.top) + 'px) rotate(-3deg)' }, { transform: 'none' }],
            { duration: 650, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
          );
        }
      }
    }

    for (const event of queryAll(root, '.sprint-event')) event.classList.toggle('active', event.dataset.event === step.event);
    for (const role of queryAll(root, '.sprint-role')) role.classList.toggle('active', step.actors.includes(role.dataset.actor as SprintActor));
    const caption: HTMLElement = query(root, '.diagram-caption');
    caption.innerHTML = step.caption;
    caption.classList.remove('reveal');
    void caption.offsetWidth;
    caption.classList.add('reveal');
    query(root, '.sprint-chart-svg').innerHTML = this.renderChart(index);
  }

  private renderChart(stepIndex: number): string {
    const config: SprintConfig = this.config;
    const all: Array<{ day: number; remaining: number }> = burndownPoints(config, config.steps.length - 1);
    const shown: Array<{ day: number; remaining: number }> = burndownPoints(config, stepIndex);
    const commitment: number = Math.max(1, ...all.map((point) => point.remaining));
    const x = (day: number): number => CHART_PADDING + (day / config.days) * (CHART_WIDTH - CHART_PADDING - 10);
    const y = (remaining: number): number => 12 + (1 - remaining / commitment) * (CHART_HEIGHT - 12 - CHART_PADDING);
    const line: string = shown.map((point, index: number) => (index === 0 ? 'M' : 'L') + x(point.day).toFixed(1) + ',' + y(point.remaining).toFixed(1)).join(' ');
    const dots: string = shown.map((point) => '<circle cx="' + x(point.day).toFixed(1) + '" cy="' + y(point.remaining).toFixed(1) + '" r="3.5"></circle>').join('');
    let ticks: string = '';
    for (let day = 0; day <= config.days; day++) {
      ticks += '<text x="' + x(day) + '" y="' + (CHART_HEIGHT - 8) + '" text-anchor="middle">' + day + '</text>';
    }
    return '<svg viewBox="0 0 ' + CHART_WIDTH + ' ' + CHART_HEIGHT + '">' +
      '<line class="chart-axis" x1="' + x(0) + '" y1="' + y(0) + '" x2="' + x(config.days) + '" y2="' + y(0) + '"></line>' +
      '<line class="chart-axis" x1="' + x(0) + '" y1="' + y(commitment) + '" x2="' + x(0) + '" y2="' + y(0) + '"></line>' +
      '<line class="chart-ideal" x1="' + x(0) + '" y1="' + y(commitment) + '" x2="' + x(config.days) + '" y2="' + y(0) + '"></line>' +
      '<text x="' + (x(0) - 6) + '" y="' + (y(commitment) + 4) + '" text-anchor="end">' + commitment + '</text>' +
      '<text x="' + (x(0) - 6) + '" y="' + (y(0) + 4) + '" text-anchor="end">0</text>' + ticks +
      (line === '' ? '' : '<path class="chart-real" d="' + line + '"></path>') + '<g class="chart-dots">' + dots + '</g>' +
      '<text class="chart-legend ideal" x="' + (CHART_WIDTH - 12) + '" y="18" text-anchor="end">┄ ' + config.idealLabel + '</text>' +
      '<text class="chart-legend real" x="' + (CHART_WIDTH - 12) + '" y="32" text-anchor="end">━ ' + config.realLabel + '</text>' +
      '<text class="chart-legend" x="2" y="' + (CHART_HEIGHT - 8) + '">' + config.dayLabel + '</text>' +
      '</svg>';
  }
}
