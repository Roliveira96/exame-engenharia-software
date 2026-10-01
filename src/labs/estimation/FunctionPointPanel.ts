import type { LabPanel } from '../Lab';
import { animateNumber, formatNumber, query, queryAll, setText } from '../../app/html';
import {
  COMPLEXITIES, FUNCTION_KINDS, FUNCTION_POINT_WEIGHTS, MAX_INFLUENCE_SUM,
  adjustmentFactor, functionPoints, unadjustedFunctionPoints,
} from './formulas';
import type { Complexity, FunctionCount, FunctionKind } from './formulas';

export interface FunctionPointConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  kinds: Record<FunctionKind, { name: string; hint: string }>;
  complexities: Record<Complexity, string>;
  headers: { kind: string; count: string; complexity: string; weight: string; subtotal: string };
  countTotalLabel: string;
  influenceLabel: string;
  influenceHint: string;
  factorLabel: string;
  resultLabel: string;
  productivityLabel: string;
  effortLabel: (effort: string) => string;
  presetsLabel: string;
  presets: Array<{ name: string; counts: Record<FunctionKind, FunctionCount>; influence: number }>;
}

/** Function point calculator: counts, complexity weights and the 14 adjustment factors. */
export class FunctionPointPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: FunctionPointConfig;
  private root: HTMLElement | null = null;
  private counts: Record<FunctionKind, FunctionCount>;
  private influence: number;
  private productivity: number = 10;

  constructor(config: FunctionPointConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.counts = structuredClone(config.presets[0].counts);
    this.influence = config.presets[0].influence;
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const config: FunctionPointConfig = this.config;
    const rows: string = FUNCTION_KINDS
      .map((kind: FunctionKind) =>
        '<tr data-kind="' + kind + '"><td><b>' + config.kinds[kind].name + '</b><small>' + config.kinds[kind].hint + '</small></td>' +
        '<td><input type="number" min="0" max="999" class="calc-input fp-count"></td>' +
        '<td><div class="segmented">' + COMPLEXITIES.map((complexity: Complexity) =>
          '<button data-complexity="' + complexity + '">' + config.complexities[complexity] + '</button>').join('') + '</div></td>' +
        '<td class="fp-weight"></td><td class="fp-subtotal"></td></tr>')
      .join('');
    const presets: string = config.presets
      .map((preset, index: number) => '<button class="chip" data-preset="' + index + '">' + preset.name + '</button>')
      .join('');
    root.innerHTML =
      '<div class="calculator">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="chips"><span class="chips-label">' + config.presetsLabel + '</span>' + presets + '</div>' +
      '  <table class="calc-table"><tr><th>' + config.headers.kind + '</th><th>' + config.headers.count + '</th><th>' + config.headers.complexity +
      '</th><th>' + config.headers.weight + '</th><th>' + config.headers.subtotal + '</th></tr>' + rows +
      '  <tr class="calc-total"><td colspan="4">' + config.countTotalLabel + '</td><td class="fp-total"></td></tr></table>' +
      '  <label class="calc-slider"><span>' + config.influenceLabel + ' <b class="fp-influence"></b></span>' +
      '    <input type="range" min="0" max="' + MAX_INFLUENCE_SUM + '" step="1" class="fp-range"><small>' + config.influenceHint + '</small></label>' +
      '  <div class="calc-formula fp-formula"></div>' +
      '  <div class="stat-tiles"><div class="stat-tile"><small>' + config.factorLabel + '</small><b class="fp-factor"></b></div>' +
      '    <div class="stat-tile highlight"><small>' + config.resultLabel + '</small><b class="fp-result"></b></div></div>' +
      '  <label class="calc-inline"><span>' + config.productivityLabel + '</span>' +
      '    <input type="number" min="1" max="100" class="calc-input fp-productivity"><span class="fp-effort"></span></label>' +
      '</div>';
    for (const row of queryAll(root, 'tr[data-kind]')) {
      const kind: FunctionKind = row.dataset.kind as FunctionKind;
      const input: HTMLInputElement = query<HTMLInputElement>(row, '.fp-count');
      input.addEventListener('input', () => {
        this.counts[kind].count = Math.max(0, Math.min(999, Math.floor(Number(input.value) || 0)));
        this.refresh(false);
      });
      for (const button of queryAll(row, '[data-complexity]')) {
        button.addEventListener('click', () => {
          this.counts[kind].complexity = button.dataset.complexity as Complexity;
          this.refresh(false);
        });
      }
    }
    const range: HTMLInputElement = query<HTMLInputElement>(root, '.fp-range');
    range.addEventListener('input', () => {
      this.influence = Number(range.value);
      this.refresh(false);
    });
    const productivity: HTMLInputElement = query<HTMLInputElement>(root, '.fp-productivity');
    productivity.addEventListener('input', () => {
      this.productivity = Math.max(1, Number(productivity.value) || 1);
      this.refresh(false);
    });
    for (const chip of queryAll(root, '[data-preset]')) {
      chip.addEventListener('click', () => {
        const preset = this.config.presets[Number(chip.dataset.preset)];
        this.counts = structuredClone(preset.counts);
        this.influence = preset.influence;
        this.refresh(true);
      });
    }
    this.refresh(true);
  }

  public unmount(): void {
    this.root = null;
  }

  /** Recomputes everything; inputs are only rewritten when the values came from a preset. */
  private refresh(writeInputs: boolean): void {
    if (this.root === null) return;
    const root: HTMLElement = this.root;
    for (const row of queryAll(root, 'tr[data-kind]')) {
      const kind: FunctionKind = row.dataset.kind as FunctionKind;
      const entry: FunctionCount = this.counts[kind];
      const weight: number = FUNCTION_POINT_WEIGHTS[kind][entry.complexity];
      if (writeInputs) query<HTMLInputElement>(row, '.fp-count').value = String(entry.count);
      for (const button of queryAll(row, '[data-complexity]')) button.classList.toggle('active', button.dataset.complexity === entry.complexity);
      setText(query(row, '.fp-weight'), '× ' + weight);
      setText(query(row, '.fp-subtotal'), String(entry.count * weight));
    }
    if (writeInputs) {
      query<HTMLInputElement>(root, '.fp-range').value = String(this.influence);
      query<HTMLInputElement>(root, '.fp-productivity').value = String(this.productivity);
    }
    const countTotal: number = unadjustedFunctionPoints(this.counts);
    const factor: number = adjustmentFactor(this.influence);
    const result: number = functionPoints(countTotal, this.influence);
    setText(query(root, '.fp-total'), String(countTotal));
    setText(query(root, '.fp-influence'), String(this.influence));
    query(root, '.fp-formula').innerHTML =
      'PF = ' + countTotal + ' × [0,65 + 0,01 × ' + this.influence + '] = ' + countTotal + ' × ' + formatNumber(factor, 2) + ' = <b>' + formatNumber(result) + '</b>';
    // Presets count up to the new value; live edits (slider, typing) update at once so dragging stays light.
    animateNumber(query(root, '.fp-factor'), factor, 2, writeInputs ? 450 : 0);
    animateNumber(query(root, '.fp-result'), result, 1, writeInputs ? 450 : 0);
    const effort: string = this.config.effortLabel(formatNumber(result / this.productivity));
    const effortElement: HTMLElement = query(root, '.fp-effort');
    if (effortElement.innerHTML !== effort) effortElement.innerHTML = effort;
  }
}
