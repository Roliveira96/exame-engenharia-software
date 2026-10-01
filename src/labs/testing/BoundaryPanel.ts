import type { LabPanel } from '../Lab';
import { formatNumber, query, queryAll } from '../../app/html';
import { boundaryValues, coverage, partitionOf, snap } from './analysis';
import type { Coverage, Partition } from './analysis';

export interface BoundaryScenario {
  id: string;
  name: string;
  /** HTML with the business rule under test. */
  rule: string;
  step: number;
  partitions: Partition[];
}

export interface BoundaryConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  scenarios: BoundaryScenario[];
  inputLabel: string;
  add: string;
  suggest: string;
  clear: string;
  classesLabel: (hit: number, total: number) => string;
  boundariesLabel: (hit: number, total: number) => string;
  validLabel: string;
  invalidLabel: string;
  outsideLabel: string;
  boundaryBadge: string;
  headers: { value: string; partition: string; outcome: string };
  emptyTests: string;
  done: (tests: number) => string;
  hint: string;
}

const WIDTH: number = 600;
const HEIGHT: number = 132;
const LEFT: number = 24;
const RIGHT: number = WIDTH - 24;
const BAND_Y: number = 52;
const BAND_HEIGHT: number = 30;
const BAND_PADDING: number = 24;
const VALID_COLORS: string[] = ['var(--green)', 'var(--teal)', 'var(--blue)'];

/** Black-box workbench: drop test values on a number line and cover every class and boundary. */
export class BoundaryPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: BoundaryConfig;
  private root: HTMLElement | null = null;
  private scenario: BoundaryScenario;
  private tests: number[] = [];

  constructor(config: BoundaryConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.scenario = config.scenarios[0];
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.root = null;
  }

  private decimals(): number {
    return this.scenario.step < 1 ? 1 : 0;
  }

  private render(): void {
    if (this.root === null) return;
    const config: BoundaryConfig = this.config;
    const chips: string = config.scenarios
      .map((scenario: BoundaryScenario) => '<button class="chip' + (scenario === this.scenario ? ' active' : '') + '" data-scenario="' + scenario.id + '">' + scenario.name + '</button>')
      .join('');
    this.root.innerHTML =
      '<div class="boundary">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="chips">' + chips + '</div>' +
      '  <div class="boundary-rule">' + this.scenario.rule + '</div>' +
      '  <div class="diagram-canvas boundary-line"></div>' +
      '  <form class="boundary-form"><label>' + config.inputLabel + ' <input type="number" class="calc-input" step="' + this.scenario.step + '" required></label>' +
      '    <button class="primary-button" type="submit">' + config.add + '</button>' +
      '    <button class="secondary-button" type="button" data-action="suggest">' + config.suggest + '</button>' +
      '    <button class="link-button" type="button" data-action="clear">' + config.clear + '</button></form>' +
      '  <div class="boundary-progress"></div>' +
      '  <div class="boundary-tests"></div>' +
      '  <p class="calc-note">' + config.hint + '</p>' +
      '</div>';
    for (const chip of queryAll(this.root, '[data-scenario]')) {
      chip.addEventListener('click', () => {
        this.scenario = this.config.scenarios.find((scenario: BoundaryScenario) => scenario.id === chip.dataset.scenario) ?? this.scenario;
        this.tests = [];
        this.render();
      });
    }
    const form: HTMLFormElement = query<HTMLFormElement>(this.root, '.boundary-form');
    const input: HTMLInputElement = query<HTMLInputElement>(form, 'input');
    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      if (input.value === '') return;
      this.addTest(snap(Number(input.value), this.scenario.step));
      input.value = '';
      input.focus();
    });
    query(this.root, '[data-action="suggest"]').addEventListener('click', () => {
      // The boundary values already include one value of every class.
      this.tests = [...new Set<number>(boundaryValues(this.scenario.partitions))];
      this.refresh(null);
    });
    query(this.root, '[data-action="clear"]').addEventListener('click', () => {
      this.tests = [];
      this.refresh(null);
    });
    this.refresh(null);
  }

  private addTest(value: number): void {
    if (!this.tests.includes(value)) this.tests.push(value);
    this.refresh(value);
  }

  private refresh(latest: number | null): void {
    if (this.root === null) return;
    const config: BoundaryConfig = this.config;
    const partitions: Partition[] = this.scenario.partitions;
    const result: Coverage = coverage(this.tests, partitions);
    const boundaryCount: number = new Set<number>(boundaryValues(partitions)).size;
    query(this.root, '.boundary-line').innerHTML = this.renderLine(result, latest);
    query(this.root, '.boundary-progress').innerHTML =
      '<div class="boundary-meter' + (result.partitions.size === partitions.length ? ' full' : '') + '"><span>' +
      config.classesLabel(result.partitions.size, partitions.length) + '</span><div class="progress-bar"><i style="--ratio:' +
      result.partitions.size / partitions.length + '"></i></div></div>' +
      '<div class="boundary-meter' + (result.boundaries.size === boundaryCount ? ' full' : '') + '"><span>' +
      config.boundariesLabel(result.boundaries.size, boundaryCount) + '</span><div class="progress-bar"><i style="--ratio:' +
      result.boundaries.size / boundaryCount + '"></i></div></div>';
    const boundaries: number[] = boundaryValues(partitions);
    const rows: string = [...this.tests]
      .sort((a: number, b: number) => a - b)
      .map((value: number) => {
        const index: number = partitionOf(value, partitions);
        const partition: Partition | undefined = partitions[index];
        return '<tr class="' + (value === latest ? 'latest' : '') + '"><td><b>' + formatNumber(value, this.decimals()) + '</b>' +
          (boundaries.includes(value) ? ' <span class="badge badge-review">' + config.boundaryBadge + '</span>' : '') + '</td><td>' +
          (partition === undefined ? config.outsideLabel : partition.label + ' <small>(' + (partition.valid ? config.validLabel : config.invalidLabel) + ')</small>') +
          '</td><td>' + (partition === undefined ? '—' : partition.outcome) + '</td></tr>';
      })
      .join('');
    query(this.root, '.boundary-tests').innerHTML = this.tests.length === 0
      ? '<p class="muted">' + config.emptyTests + '</p>'
      : '<table class="calc-table"><tr><th>' + config.headers.value + '</th><th>' + config.headers.partition + '</th><th>' + config.headers.outcome + '</th></tr>' + rows + '</table>' +
        (result.complete ? '<div class="boundary-done">' + config.done(this.tests.length) + '</div>' : '');
  }

  private renderLine(result: Coverage, latest: number | null): string {
    const partitions: Partition[] = this.scenario.partitions;
    const low: number = partitions[0].from;
    const high: number = partitions[partitions.length - 1].to;
    // Schematic axis: every class gets the same width, so neighbouring boundary values never overlap.
    const bandWidth: number = (RIGHT - LEFT) / partitions.length;
    const x = (value: number): number => {
      const index: number = Math.max(0, partitionOf(value, partitions));
      const partition: Partition = partitions[index];
      const span: number = partition.to - partition.from;
      const ratio: number = span === 0 ? 0.5 : (value - partition.from) / span;
      return LEFT + index * bandWidth + BAND_PADDING + ratio * (bandWidth - 2 * BAND_PADDING);
    };
    let validIndex: number = 0;
    let bands: string = '';
    partitions.forEach((partition: Partition, index: number) => {
      const color: string = partition.valid ? VALID_COLORS[validIndex++ % VALID_COLORS.length] : 'var(--red)';
      const start: number = LEFT + index * bandWidth + 2;
      const end: number = LEFT + (index + 1) * bandWidth - 2;
      bands += '<g class="boundary-band' + (result.partitions.has(index) ? ' hit' : '') + '" style="--band-color:' + color + '">' +
        '<rect x="' + start.toFixed(1) + '" y="' + BAND_Y + '" width="' + (end - start).toFixed(1) + '" height="' + BAND_HEIGHT + '" rx="6"></rect>' +
        '<text x="' + ((start + end) / 2).toFixed(1) + '" y="' + (BAND_Y - 9) + '" text-anchor="middle">' + partition.label + '</text></g>';
    });
    const ticks: string = [...new Set<number>(boundaryValues(partitions))]
      .map((value: number) =>
        '<g class="boundary-tick' + (result.boundaries.has(value) ? ' hit' : '') + '"><circle cx="' + x(value).toFixed(1) + '" cy="' + (BAND_Y + BAND_HEIGHT + 12) + '" r="5"></circle>' +
        '<text x="' + x(value).toFixed(1) + '" y="' + (BAND_Y + BAND_HEIGHT + 33) + '" text-anchor="middle">' + formatNumber(value, this.decimals()) + '</text></g>')
      .join('');
    const markers: string = this.tests
      .filter((value: number) => value >= low && value <= high)
      .map((value: number) =>
        '<g class="boundary-marker' + (value === latest ? ' latest' : '') + '" transform="translate(' + x(value).toFixed(1) + ',' + (BAND_Y + BAND_HEIGHT / 2) + ')"><circle r="6"></circle></g>')
      .join('');
    return '<svg viewBox="0 0 ' + WIDTH + ' ' + HEIGHT + '">' + bands + ticks + markers + '</svg>';
  }
}
