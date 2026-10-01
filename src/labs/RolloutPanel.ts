import type { LabPanel } from './Lab';
import { query, queryAll } from '../app/html';

export type RolloutSystem = 'old' | 'new';

export interface RolloutSegment {
  from: number;
  to: number;
  system: RolloutSystem;
}

export interface RolloutRow {
  label: string;
  segments: RolloutSegment[];
}

export interface RolloutStrategy {
  id: string;
  name: string;
  /** HTML explanation of how the changeover happens. */
  summary: string;
  rows: RolloutRow[];
  /** 1 (low) to 3 (high). */
  risk: number;
  cost: number;
  strength: string;
  weakness: string;
  when: string;
}

export interface RolloutConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  /** Length of the timeline, in the unit named by timeUnit. */
  duration: number;
  timeUnit: string;
  strategies: RolloutStrategy[];
  legend: Record<RolloutSystem, string>;
  replay: string;
  riskLabel: string;
  costLabel: string;
  levels: string[];
  strengthLabel: string;
  weaknessLabel: string;
  whenLabel: string;
}

/** Changeover timelines: how the old system gives way to the new one in each deployment strategy. */
export class RolloutPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: RolloutConfig;
  private root: HTMLElement | null = null;
  private strategy: RolloutStrategy;

  constructor(config: RolloutConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.strategy = config.strategies[0];
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.root = null;
  }

  public cue(argument: string): void {
    const found: RolloutStrategy | undefined = this.config.strategies.find((candidate: RolloutStrategy) => candidate.id === argument);
    if (found === undefined) return;
    this.strategy = found;
    this.render();
  }

  private render(): void {
    if (this.root === null) return;
    const config: RolloutConfig = this.config;
    const strategy: RolloutStrategy = this.strategy;
    const chips: string = config.strategies
      .map((candidate: RolloutStrategy) => '<button class="chip' + (candidate === strategy ? ' active' : '') + '" data-strategy="' + candidate.id + '">' + candidate.name + '</button>')
      .join('');
    const rows: string = strategy.rows
      .map((row: RolloutRow) =>
        '<div class="rollout-row"><span class="rollout-label">' + row.label + '</span><div class="rollout-track">' +
        row.segments.map((segment: RolloutSegment) =>
          '<i class="rollout-segment system-' + segment.system + '" style="left:' + (segment.from / config.duration) * 100 + '%;width:' +
          ((segment.to - segment.from) / config.duration) * 100 + '%"></i>').join('') +
        '</div></div>')
      .join('');
    let ticks: string = '';
    for (let tick = 0; tick <= config.duration; tick += 2) {
      ticks += '<span style="left:' + (tick / config.duration) * 100 + '%">' + tick + '</span>';
    }
    const meter = (label: string, level: number): string =>
      '<div class="rollout-meter level-' + level + '"><small>' + label + '</small><span><i></i><i></i><i></i></span><b>' + config.levels[level - 1] + '</b></div>';
    this.root.innerHTML =
      '<div class="rollout">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="chips">' + chips + '</div>' +
      '  <div class="diagram-caption">' + strategy.summary + '</div>' +
      '  <div class="rollout-chart"><div class="rollout-rows">' + rows +
      '    <div class="rollout-curtain"></div></div>' +
      '    <div class="rollout-axis"><span class="rollout-label rollout-unit">' + config.timeUnit + '</span><div class="rollout-ticks">' + ticks + '</div></div>' +
      '    <div class="rollout-legend"><span class="system-old">' + config.legend.old + '</span><span class="system-new">' + config.legend.new + '</span>' +
      '      <button class="link-button" data-action="replay">' + config.replay + '</button></div></div>' +
      '  <div class="rollout-meters">' + meter(config.riskLabel, strategy.risk) + meter(config.costLabel, strategy.cost) + '</div>' +
      '  <div class="diagram-facts">' +
      '    <div class="diagram-fact"><b>' + config.strengthLabel + '</b><span>' + strategy.strength + '</span></div>' +
      '    <div class="diagram-fact"><b>' + config.weaknessLabel + '</b><span>' + strategy.weakness + '</span></div>' +
      '    <div class="diagram-fact"><b>' + config.whenLabel + '</b><span>' + strategy.when + '</span></div></div>' +
      '</div>';
    for (const chip of queryAll(this.root, '[data-strategy]')) {
      chip.addEventListener('click', () => this.cue(chip.dataset.strategy ?? ''));
    }
    query(this.root, '[data-action="replay"]').addEventListener('click', () => {
      // Restarting a CSS animation needs the class to be removed and added back.
      const curtain: HTMLElement = query(this.root as HTMLElement, '.rollout-curtain');
      curtain.style.animation = 'none';
      void curtain.offsetWidth;
      curtain.style.animation = '';
    });
  }
}
