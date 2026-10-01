import type { LabPanel } from './Lab';
import { query, queryAll } from '../app/html';

export interface WheelCharacteristic {
  id: string;
  label: string;
  /** The question this characteristic answers about the product. */
  question: string;
  subcharacteristics: string[];
  color: string;
}

export interface WheelModel {
  id: string;
  name: string;
  /** HTML shown above the wheel. */
  note: string;
  characteristics: WheelCharacteristic[];
}

export interface WheelConfig {
  id: string;
  label: string;
  title: string;
  models: WheelModel[];
  centerLabel: string;
  emptyHint: string;
  subcharacteristicsLabel: string;
}

const SIZE: number = 420;
const CENTER: number = SIZE / 2;
const OUTER_RADIUS: number = 190;
const INNER_RADIUS: number = 82;
const GAP_DEGREES: number = 2.2;

function polar(radius: number, degrees: number): { x: number; y: number } {
  const radians: number = ((degrees - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) };
}

/** Quality model drawn as a wheel: each slice is a characteristic that opens its sub-characteristics. */
export class WheelPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: WheelConfig;
  private root: HTMLElement | null = null;
  private model: WheelModel;

  constructor(config: WheelConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.model = config.models[0];
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.root = null;
  }

  public cue(argument: string): void {
    const found: WheelModel | undefined = this.config.models.find((candidate: WheelModel) => candidate.id === argument);
    if (found === undefined) return;
    this.model = found;
    this.render();
  }

  private render(): void {
    if (this.root === null) return;
    const chips: string = this.config.models
      .map((model: WheelModel) => '<button class="chip' + (model === this.model ? ' active' : '') + '" data-model="' + model.id + '">' + model.name + '</button>')
      .join('');
    this.root.innerHTML =
      '<div class="wheel-panel">' +
      '  <h3 class="panel-title">' + this.config.title + '</h3>' +
      '  <div class="chips">' + chips + '</div>' +
      '  <p class="panel-intro">' + this.model.note + '</p>' +
      '  <div class="wheel-layout"><div class="wheel">' + this.renderWheel() + '</div>' +
      '  <div class="stack-detail wheel-detail"><p class="muted">' + this.config.emptyHint + '</p></div></div>' +
      '</div>';
    for (const chip of queryAll(this.root, '.chip')) {
      chip.addEventListener('click', () => this.cue(chip.dataset.model ?? ''));
    }
    for (const slice of queryAll<SVGGElement>(this.root, '.wheel-slice')) {
      slice.addEventListener('click', () => this.select(slice.dataset.slice ?? ''));
    }
  }

  private renderWheel(): string {
    const count: number = this.model.characteristics.length;
    const sweep: number = 360 / count;
    const slices: string = this.model.characteristics
      .map((characteristic: WheelCharacteristic, index: number) => {
        const from: number = index * sweep + GAP_DEGREES / 2;
        const to: number = (index + 1) * sweep - GAP_DEGREES / 2;
        const outerStart = polar(OUTER_RADIUS, from);
        const outerEnd = polar(OUTER_RADIUS, to);
        const innerEnd = polar(INNER_RADIUS, to);
        const innerStart = polar(INNER_RADIUS, from);
        const path: string =
          'M' + outerStart.x.toFixed(1) + ',' + outerStart.y.toFixed(1) +
          ' A' + OUTER_RADIUS + ',' + OUTER_RADIUS + ' 0 0 1 ' + outerEnd.x.toFixed(1) + ',' + outerEnd.y.toFixed(1) +
          ' L' + innerEnd.x.toFixed(1) + ',' + innerEnd.y.toFixed(1) +
          ' A' + INNER_RADIUS + ',' + INNER_RADIUS + ' 0 0 0 ' + innerStart.x.toFixed(1) + ',' + innerStart.y.toFixed(1) + ' Z';
        const middle: number = (from + to) / 2;
        const labelPoint = polar((OUTER_RADIUS + INNER_RADIUS) / 2, middle);
        // The slice slides outwards along its own bisector when selected.
        const push = polar(14, middle);
        const words: string[] = characteristic.label.split(' ');
        const lines: string[] = words.length > 1 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : words;
        const text: string = lines
          .map((line: string, lineIndex: number) =>
            '<tspan x="' + labelPoint.x.toFixed(1) + '" y="' + (labelPoint.y + (lineIndex - (lines.length - 1) / 2) * 14).toFixed(1) + '">' + line + '</tspan>')
          .join('');
        return '<g class="wheel-slice" data-slice="' + characteristic.id + '" style="--slice-color:' + characteristic.color + ';--i:' + index +
          ';--push-x:' + (push.x - CENTER).toFixed(1) + 'px;--push-y:' + (push.y - CENTER).toFixed(1) + 'px">' +
          '<path d="' + path + '"></path><text text-anchor="middle" dominant-baseline="central">' + text + '</text></g>';
      })
      .join('');
    return '<svg viewBox="0 0 ' + SIZE + ' ' + SIZE + '" role="img">' + slices +
      '<circle class="wheel-hub" cx="' + CENTER + '" cy="' + CENTER + '" r="' + (INNER_RADIUS - 8) + '"></circle>' +
      '<text class="wheel-hub-text" x="' + CENTER + '" y="' + CENTER + '" text-anchor="middle" dominant-baseline="central">' + this.config.centerLabel + '</text></svg>';
  }

  private select(id: string): void {
    if (this.root === null) return;
    const characteristic: WheelCharacteristic | undefined = this.model.characteristics.find((candidate: WheelCharacteristic) => candidate.id === id);
    if (characteristic === undefined) return;
    for (const slice of queryAll<SVGGElement>(this.root, '.wheel-slice')) slice.classList.toggle('active', slice.dataset.slice === id);
    const detail: HTMLElement = query(this.root, '.wheel-detail');
    detail.style.setProperty('--layer-color', characteristic.color);
    detail.innerHTML =
      '<h4>' + characteristic.label + '</h4><p>' + characteristic.question + '</p>' +
      '<p class="muted">' + this.config.subcharacteristicsLabel + '</p><ul class="wheel-subs">' +
      characteristic.subcharacteristics.map((sub: string, index: number) => '<li style="--i:' + index + '">' + sub + '</li>').join('') + '</ul>';
    detail.classList.remove('reveal');
    void detail.offsetWidth;
    detail.classList.add('reveal');
  }
}
