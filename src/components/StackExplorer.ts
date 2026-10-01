import type { LabPanel } from '../labs/Lab';
import { query, queryAll } from '../app/html';

export interface StackLayer {
  id: string;
  label: string;
  /** Short text shown inside the layer, next to the label. */
  badge?: string;
  /** HTML explanation revealed when the layer is selected. */
  detail: string;
  color: string;
}

export interface StackSet {
  id: string;
  name: string;
  /** HTML shown above the drawing. */
  intro: string;
  /** "pyramid" narrows towards the top, "ladder" climbs to the right, "stack" keeps equal widths. */
  shape: 'pyramid' | 'ladder' | 'stack';
  /** Listed from the top of the drawing to the bottom. */
  layers: StackLayer[];
}

export interface StackConfig {
  id: string;
  label: string;
  title: string;
  sets: StackSet[];
  /** Label of the button that walks through every layer. */
  tourLabel: string;
  emptyHint: string;
}

const TOUR_INTERVAL_MS: number = 2400;

/** Layered drawing (pyramid, ladder or stack) where each layer opens its explanation. */
export class StackExplorer implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: StackConfig;
  private root: HTMLElement | null = null;
  private set: StackSet;
  private timer: number | null = null;

  constructor(config: StackConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.set = config.sets[0];
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.stopTour();
    this.root = null;
  }

  public cue(argument: string): void {
    const found: StackSet | undefined = this.config.sets.find((candidate: StackSet) => candidate.id === argument);
    if (found !== undefined) {
      this.set = found;
      this.render();
    }
  }

  private render(): void {
    if (this.root === null) return;
    this.stopTour();
    const chips: string = this.config.sets.length < 2 ? '' :
      '<div class="chips">' + this.config.sets
        .map((set: StackSet) => '<button class="chip' + (set === this.set ? ' active' : '') + '" data-set="' + set.id + '">' + set.name + '</button>')
        .join('') + '</div>';
    const count: number = this.set.layers.length;
    const layers: string = this.set.layers
      .map((layer: StackLayer, index: number) => {
        // Pyramid: the top layer is the narrowest. Ladder: each step starts further to the right.
        const width: number = this.set.shape === 'pyramid' ? 46 + (54 * (index + 1)) / count : this.set.shape === 'ladder' ? 58 : 100;
        const offset: number = this.set.shape === 'ladder' ? ((count - 1 - index) * 42) / Math.max(1, count - 1) : (100 - width) / 2;
        return '<button class="stack-layer" data-layer="' + layer.id + '" style="--layer-color:' + layer.color + ';width:' + width +
          '%;margin-left:' + offset + '%;--i:' + (count - index) + '">' +
          '<b>' + layer.label + '</b>' + (layer.badge === undefined ? '' : '<small>' + layer.badge + '</small>') + '</button>';
      })
      .join('');
    this.root.innerHTML =
      '<div class="stack-explorer">' +
      '  <h3 class="panel-title">' + this.config.title + '</h3>' + chips +
      '  <p class="panel-intro">' + this.set.intro + '</p>' +
      '  <div class="stack shape-' + this.set.shape + '">' + layers + '</div>' +
      '  <div class="stack-actions"><button class="secondary-button stack-tour">' + this.config.tourLabel + '</button></div>' +
      '  <div class="stack-detail"><p class="muted">' + this.config.emptyHint + '</p></div>' +
      '</div>';
    for (const chip of queryAll(this.root, '.chip')) {
      chip.addEventListener('click', () => this.cue(chip.dataset.set ?? ''));
    }
    for (const button of queryAll(this.root, '.stack-layer')) {
      button.addEventListener('click', () => {
        this.stopTour();
        this.select(button.dataset.layer ?? '');
      });
    }
    query(this.root, '.stack-tour').addEventListener('click', () => this.startTour());
  }

  private select(layerId: string): void {
    if (this.root === null) return;
    const layer: StackLayer | undefined = this.set.layers.find((candidate: StackLayer) => candidate.id === layerId);
    if (layer === undefined) return;
    for (const button of queryAll(this.root, '.stack-layer')) {
      button.classList.toggle('active', button.dataset.layer === layerId);
    }
    const detail: HTMLElement = query(this.root, '.stack-detail');
    detail.style.setProperty('--layer-color', layer.color);
    detail.innerHTML = '<h4>' + layer.label + '</h4>' + layer.detail;
    detail.classList.remove('reveal');
    void detail.offsetWidth;
    detail.classList.add('reveal');
  }

  /** Walks from the bottom layer to the top one, the order these structures are usually explained. */
  private startTour(): void {
    this.stopTour();
    const order: StackLayer[] = [...this.set.layers].reverse();
    let index: number = 0;
    this.select(order[0].id);
    this.timer = window.setInterval(() => {
      index++;
      if (index >= order.length) {
        this.stopTour();
        return;
      }
      this.select(order[index].id);
    }, TOUR_INTERVAL_MS);
  }

  private stopTour(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}
