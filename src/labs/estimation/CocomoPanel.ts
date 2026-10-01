import type { LabPanel } from '../Lab';
import { animateNumber, formatNumber, query, queryAll } from '../../app/html';
import { COCOMO_COEFFICIENTS, COCOMO_MODES, cocomoBasic } from './formulas';
import type { CocomoMode, CocomoResult } from './formulas';

export interface CocomoConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  sizeLabel: string;
  modes: Record<CocomoMode, { name: string; description: string }>;
  effortLabel: string;
  durationLabel: string;
  peopleLabel: string;
  effortUnit: string;
  durationUnit: string;
  compareTitle: string;
  note: string;
}

const MIN_KLOC: number = 2;
const MAX_KLOC: number = 400;

/** Basic COCOMO calculator: size and project mode in, effort, schedule and team size out. */
export class CocomoPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: CocomoConfig;
  private root: HTMLElement | null = null;
  private kloc: number = 32;
  private mode: CocomoMode = 'organic';

  constructor(config: CocomoConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const config: CocomoConfig = this.config;
    const modes: string = COCOMO_MODES
      .map((mode: CocomoMode) =>
        '<button class="mode-option" data-mode="' + mode + '"><b>' + config.modes[mode].name + '</b><small>' + config.modes[mode].description + '</small></button>')
      .join('');
    const bars: string = COCOMO_MODES
      .map((mode: CocomoMode) =>
        '<div class="compare-row" data-bar="' + mode + '"><span>' + config.modes[mode].name + '</span><div class="compare-track"><i></i></div><b></b></div>')
      .join('');
    root.innerHTML =
      '<div class="calculator">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <label class="calc-slider"><span>' + config.sizeLabel + ' <b class="cocomo-kloc"></b></span>' +
      '    <input type="range" min="' + MIN_KLOC + '" max="' + MAX_KLOC + '" step="1" value="' + this.kloc + '" class="cocomo-range"></label>' +
      '  <div class="mode-options">' + modes + '</div>' +
      '  <div class="calc-formula cocomo-formula"></div>' +
      '  <div class="stat-tiles three"><div class="stat-tile highlight"><small>' + config.effortLabel + '</small><b class="cocomo-effort"></b></div>' +
      '    <div class="stat-tile"><small>' + config.durationLabel + '</small><b class="cocomo-duration"></b></div>' +
      '    <div class="stat-tile"><small>' + config.peopleLabel + '</small><b class="cocomo-people"></b></div></div>' +
      '  <h4 class="calc-subtitle">' + config.compareTitle + '</h4><div class="compare-bars">' + bars + '</div>' +
      '  <p class="calc-note">' + config.note + '</p>' +
      '</div>';
    const range: HTMLInputElement = query<HTMLInputElement>(root, '.cocomo-range');
    range.addEventListener('input', () => {
      this.kloc = Number(range.value);
      this.refresh();
    });
    for (const button of queryAll(root, '[data-mode]')) {
      button.addEventListener('click', () => {
        this.mode = button.dataset.mode as CocomoMode;
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
    const result: CocomoResult = cocomoBasic(this.kloc, this.mode);
    const { a, b, c, d } = COCOMO_COEFFICIENTS[this.mode];
    for (const button of queryAll(root, '[data-mode]')) button.classList.toggle('active', button.dataset.mode === this.mode);
    query(root, '.cocomo-kloc').textContent = this.kloc + ' KLOC';
    query(root, '.cocomo-formula').innerHTML =
      'E = ' + formatNumber(a) + ' × ' + this.kloc + '<sup>' + formatNumber(b, 2) + '</sup> = <b>' + formatNumber(result.effort) + '</b> ' + this.config.effortUnit + '<br>' +
      'D = ' + formatNumber(c) + ' × ' + formatNumber(result.effort) + '<sup>' + formatNumber(d, 2) + '</sup> = <b>' + formatNumber(result.duration) + '</b> ' + this.config.durationUnit;
    animateNumber(query(root, '.cocomo-effort'), result.effort, 1);
    animateNumber(query(root, '.cocomo-duration'), result.duration, 1);
    animateNumber(query(root, '.cocomo-people'), result.people, 1);
    const efforts: number[] = COCOMO_MODES.map((mode: CocomoMode) => cocomoBasic(this.kloc, mode).effort);
    const highest: number = Math.max(...efforts);
    COCOMO_MODES.forEach((mode: CocomoMode, index: number) => {
      const row: HTMLElement = query(root, '[data-bar="' + mode + '"]');
      row.classList.toggle('active', mode === this.mode);
      query(row, 'i').style.width = (efforts[index] / highest) * 100 + '%';
      query(row, 'b').textContent = formatNumber(efforts[index], 0);
    });
  }
}
