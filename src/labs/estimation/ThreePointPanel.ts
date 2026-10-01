import type { LabPanel } from '../Lab';
import { animateNumber, formatNumber, query, queryAll } from '../../app/html';
import { threePoint } from './formulas';
import type { ThreePointResult } from './formulas';

export interface ThreePointConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  fields: { optimistic: string; likely: string; pessimistic: string };
  unit: string;
  expectedLabel: string;
  deviationLabel: string;
  orderWarning: string;
  insight: (expected: string, likely: string) => string;
}

type Field = 'optimistic' | 'likely' | 'pessimistic';

const FIELDS: Field[] = ['optimistic', 'likely', 'pessimistic'];
const SLIDER_MAX: number = 60;
const CHART_WIDTH: number = 560;
const CHART_HEIGHT: number = 150;
const BASELINE: number = 112;
const PADDING: number = 30;

/** Three-point (PERT) estimate with the distribution drawn as the values change. */
export class ThreePointPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: ThreePointConfig;
  private root: HTMLElement | null = null;
  private values: Record<Field, number> = { optimistic: 6, likely: 10, pessimistic: 26 };

  constructor(config: ThreePointConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const config: ThreePointConfig = this.config;
    const sliders: string = FIELDS
      .map((field: Field) =>
        '<label class="calc-slider field-' + field + '"><span>' + config.fields[field] + ' <b data-value="' + field + '"></b></span>' +
        '<input type="range" min="1" max="' + SLIDER_MAX + '" step="1" data-field="' + field + '" value="' + this.values[field] + '"></label>')
      .join('');
    root.innerHTML =
      '<div class="calculator">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' + sliders +
      '  <p class="calc-warning" hidden>' + config.orderWarning + '</p>' +
      '  <div class="diagram-canvas three-point-chart"></div>' +
      '  <div class="calc-formula three-point-formula"></div>' +
      '  <div class="stat-tiles"><div class="stat-tile highlight"><small>' + config.expectedLabel + '</small><b class="three-point-expected"></b></div>' +
      '    <div class="stat-tile"><small>' + config.deviationLabel + '</small><b class="three-point-deviation"></b></div></div>' +
      '  <p class="calc-note three-point-insight"></p>' +
      '</div>';
    for (const input of queryAll<HTMLInputElement>(root, '[data-field]')) {
      input.addEventListener('input', () => {
        this.values[input.dataset.field as Field] = Number(input.value);
        this.refresh();
      });
    }
    this.refresh();
  }

  public unmount(): void {
    this.root = null;
  }

  private refresh(): void {
    if (this.root === null) return;
    const root: HTMLElement = this.root;
    const { optimistic, likely, pessimistic } = this.values;
    for (const field of FIELDS) query(root, '[data-value="' + field + '"]').textContent = this.values[field] + ' ' + this.config.unit;
    const ordered: boolean = optimistic <= likely && likely <= pessimistic;
    query(root, '.calc-warning').hidden = ordered;
    const result: ThreePointResult = threePoint(optimistic, likely, pessimistic);
    query(root, '.three-point-formula').innerHTML =
      'E = (' + optimistic + ' + 4 × ' + likely + ' + ' + pessimistic + ') / 6 = <b>' + formatNumber(result.expected) + '</b> ' + this.config.unit +
      '<br>σ = (' + pessimistic + ' − ' + optimistic + ') / 6 = <b>' + formatNumber(result.deviation) + '</b>';
    animateNumber(query(root, '.three-point-expected'), result.expected, 1, 0);
    animateNumber(query(root, '.three-point-deviation'), Math.abs(result.deviation), 1, 0);
    query(root, '.three-point-insight').innerHTML = ordered ? this.config.insight(formatNumber(result.expected), String(likely)) : '';
    query(root, '.three-point-chart').innerHTML = ordered ? this.renderChart(result.expected) : '';
  }

  private renderChart(expected: number): string {
    const { optimistic, likely, pessimistic } = this.values;
    const low: number = Math.max(0, optimistic - 3);
    const high: number = pessimistic + 3;
    const x = (value: number): number => PADDING + ((value - low) / (high - low)) * (CHART_WIDTH - 2 * PADDING);
    const marker = (value: number, label: string, cssClass: string, top: number): string =>
      '<g class="chart-marker ' + cssClass + '"><line x1="' + x(value) + '" y1="' + top + '" x2="' + x(value) + '" y2="' + BASELINE + '"></line>' +
      '<text x="' + x(value) + '" y="' + (BASELINE + 16) + '" text-anchor="middle">' + label + '</text></g>';
    // The curve leans to the pessimistic side whenever the tail is longer than the head.
    const curve: string =
      'M' + x(optimistic) + ',' + BASELINE +
      ' C' + x(optimistic + (likely - optimistic) * 0.6) + ',' + BASELINE + ' ' + x(likely - (likely - optimistic) * 0.25) + ',24 ' + x(likely) + ',24' +
      ' C' + x(likely + (pessimistic - likely) * 0.25) + ',24 ' + x(likely + (pessimistic - likely) * 0.45) + ',' + BASELINE + ' ' + x(pessimistic) + ',' + BASELINE + ' Z';
    return '<svg viewBox="0 0 ' + CHART_WIDTH + ' ' + CHART_HEIGHT + '">' +
      '<path class="distribution" d="' + curve + '"></path>' +
      '<line class="chart-axis" x1="' + PADDING / 2 + '" y1="' + BASELINE + '" x2="' + (CHART_WIDTH - PADDING / 2) + '" y2="' + BASELINE + '"></line>' +
      marker(optimistic, 'o = ' + optimistic, 'optimistic', 92) + marker(likely, 'm = ' + likely, 'likely', 24) +
      marker(pessimistic, 'p = ' + pessimistic, 'pessimistic', 92) +
      '<g class="chart-marker expected"><line x1="' + x(expected) + '" y1="10" x2="' + x(expected) + '" y2="' + BASELINE + '"></line>' +
      '<text x="' + x(expected) + '" y="' + (BASELINE + 32) + '" text-anchor="middle">E = ' + formatNumber(expected) + '</text></g>' +
      '</svg>';
  }
}
