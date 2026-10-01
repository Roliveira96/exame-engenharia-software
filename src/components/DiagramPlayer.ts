import type { LabPanel } from '../labs/Lab';
import { prefersReducedMotion, query, queryAll } from '../app/html';
import { StepControls } from './StepControls';
import type { StepControlLabels } from './StepControls';

export type DiagramShape = 'box' | 'ellipse' | 'actor' | 'label';

export interface DiagramNode {
  id: string;
  /** Use "\n" to break the label in two lines. */
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  shape?: DiagramShape;
  color?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  dashed?: boolean;
  label?: string;
  /** Sideways bend in pixels; positive bends to the left of the travel direction. */
  bend?: number;
  /** "arrow" (default), "line" without head, or "generalization" with a hollow triangle. */
  kind?: 'arrow' | 'line' | 'generalization';
}

export interface DiagramStep {
  /** Nodes highlighted in this step; the token travels to the first one. */
  nodes: string[];
  /** Indexes of the edges highlighted in this step. */
  edges?: number[];
  /** HTML caption. */
  caption: string;
  /** Spiral models only: the token follows the curve between these two turn counts. */
  arc?: [number, number];
}

export interface DiagramSpiral {
  centerX: number;
  centerY: number;
  startRadius: number;
  /** Radius gained per full turn. */
  growth: number;
  turns: number;
}

export interface DiagramFact {
  label: string;
  text: string;
}

export interface DiagramModel {
  id: string;
  name: string;
  /** HTML shown above the drawing. */
  summary: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  steps: DiagramStep[];
  /** Hide the travelling token for static diagrams such as use cases. */
  noToken?: boolean;
  spiral?: DiagramSpiral;
  /** "When to use / strength / risk" style notes under the drawing. */
  facts?: DiagramFact[];
}

export interface DiagramConfig {
  id: string;
  label: string;
  title: string;
  models: DiagramModel[];
}

interface Point {
  x: number;
  y: number;
}

const SVG_NS: string = 'http://www.w3.org/2000/svg';
const DEFAULT_WIDTH: number = 132;
const DEFAULT_HEIGHT: number = 46;
const TOKEN_TRAVEL_MS: number = 750;

/** Position on an Archimedean spiral that starts at the left and turns clockwise on screen. */
export function spiralPoint(spiral: DiagramSpiral, turn: number): Point {
  const angle: number = Math.PI + 2 * Math.PI * turn;
  const radius: number = spiral.startRadius + spiral.growth * turn;
  return { x: spiral.centerX + radius * Math.cos(angle), y: spiral.centerY + radius * Math.sin(angle) };
}

/** Animated node-and-arrow diagram with a token that walks the steps of a process. */
export class DiagramPlayer implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: DiagramConfig;
  private readonly controls: StepControls;
  private root: HTMLElement | null = null;
  private model: DiagramModel;
  private tokenPosition: Point | null = null;
  private animationFrame: number | null = null;

  constructor(config: DiagramConfig, controlLabels: StepControlLabels) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.model = config.models[0];
    this.controls = new StepControls(this.model.steps.length, controlLabels, (index: number) => this.showStep(index));
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.controls.destroy();
    this.cancelAnimation();
    this.root = null;
  }

  public cue(argument: string): void {
    const found: DiagramModel | undefined = this.config.models.find((candidate: DiagramModel) => candidate.id === argument);
    if (found === undefined) return;
    this.model = found;
    this.render();
  }

  private render(): void {
    if (this.root === null) return;
    this.cancelAnimation();
    this.controls.destroy();
    this.tokenPosition = null;
    const chips: string = this.config.models.length < 2 ? '' :
      '<div class="chips">' + this.config.models
        .map((model: DiagramModel) => '<button class="chip' + (model === this.model ? ' active' : '') + '" data-model="' + model.id + '">' + model.name + '</button>')
        .join('') + '</div>';
    const facts: string = (this.model.facts ?? [])
      .map((fact: DiagramFact) => '<div class="diagram-fact"><b>' + fact.label + '</b><span>' + fact.text + '</span></div>')
      .join('');
    this.root.innerHTML =
      '<div class="diagram-player">' +
      '  <h3 class="panel-title">' + this.config.title + '</h3>' + chips +
      '  <p class="panel-intro">' + this.model.summary + '</p>' +
      '  <div class="diagram-canvas">' + this.renderSvg() + '</div>' +
      this.controls.renderHtml() +
      '  <div class="diagram-caption"></div>' +
      (facts === '' ? '' : '<div class="diagram-facts">' + facts + '</div>') +
      '</div>';
    for (const chip of queryAll(this.root, '.chip')) {
      chip.addEventListener('click', () => this.cue(chip.dataset.model ?? ''));
    }
    for (const node of queryAll<SVGGElement>(this.root, '.diagram-node')) {
      node.addEventListener('click', () => this.jumpToNode(node.dataset.node ?? ''));
    }
    this.controls.attach(this.root);
    this.controls.reset(this.model.steps.length);
  }

  private renderSvg(): string {
    const model: DiagramModel = this.model;
    let edges: string = '';
    model.edges.forEach((edge: DiagramEdge, index: number) => {
      edges += this.renderEdge(edge, index);
    });
    const nodes: string = model.nodes.map((node: DiagramNode) => this.renderNode(node)).join('');
    const spiral: string = model.spiral === undefined ? '' : this.renderSpiral(model.spiral);
    const token: string = model.noToken === true ? '' :
      '<g class="diagram-token" style="opacity:0"><circle r="13" class="token-halo"></circle><circle r="6" class="token-core"></circle></g>';
    return '<svg xmlns="' + SVG_NS + '" viewBox="0 0 ' + model.width + ' ' + model.height + '" role="img">' +
      '<defs>' +
      '<marker id="arrow-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="marker-fill"></path></marker>' +
      '<marker id="arrow-hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 z" class="marker-hollow"></path></marker>' +
      '</defs>' + spiral + edges + nodes + token + '</svg>';
  }

  private renderNode(node: DiagramNode): string {
    const width: number = node.width ?? DEFAULT_WIDTH;
    const height: number = node.height ?? DEFAULT_HEIGHT;
    const shape: DiagramShape = node.shape ?? 'box';
    const lines: string[] = node.label.split('\n');
    const lineHeight: number = 15;
    const style: string = node.color === undefined ? '' : ' style="--node-color:' + node.color + '"';
    let body: string = '';
    let textY: number = node.y - ((lines.length - 1) * lineHeight) / 2;
    if (shape === 'box') {
      body = '<rect x="' + (node.x - width / 2) + '" y="' + (node.y - height / 2) + '" width="' + width + '" height="' + height + '" rx="11"></rect>';
    } else if (shape === 'ellipse') {
      body = '<ellipse cx="' + node.x + '" cy="' + node.y + '" rx="' + width / 2 + '" ry="' + height / 2 + '"></ellipse>';
    } else if (shape === 'actor') {
      const top: number = node.y - 30;
      body = '<g class="actor-figure"><circle cx="' + node.x + '" cy="' + top + '" r="9"></circle>' +
        '<path d="M' + node.x + ',' + (top + 9) + ' v24 M' + (node.x - 15) + ',' + (top + 19) + ' h30 M' + node.x + ',' + (top + 33) +
        ' l-12,18 M' + node.x + ',' + (top + 33) + ' l12,18"></path></g>';
      textY = node.y + 38;
    }
    const text: string = lines
      .map((line: string, index: number) => '<tspan x="' + node.x + '" y="' + (textY + index * lineHeight) + '">' + line + '</tspan>')
      .join('');
    return '<g class="diagram-node shape-' + shape + '" data-node="' + node.id + '"' + style + '>' + body +
      '<text text-anchor="middle" dominant-baseline="central">' + text + '</text></g>';
  }

  private renderEdge(edge: DiagramEdge, index: number): string {
    const from: DiagramNode = this.node(edge.from);
    const to: DiagramNode = this.node(edge.to);
    const start: Point = this.borderPoint(from, to);
    const end: Point = this.borderPoint(to, from);
    const bend: number = edge.bend ?? 0;
    const middle: Point = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
    const length: number = Math.hypot(end.x - start.x, end.y - start.y) || 1;
    // Perpendicular offset gives feedback arrows their curve.
    const control: Point = {
      x: middle.x + ((end.y - start.y) / length) * bend,
      y: middle.y - ((end.x - start.x) / length) * bend,
    };
    const path: string = bend === 0
      ? 'M' + start.x + ',' + start.y + ' L' + end.x + ',' + end.y
      : 'M' + start.x + ',' + start.y + ' Q' + control.x + ',' + control.y + ' ' + end.x + ',' + end.y;
    const kind: string = edge.kind ?? 'arrow';
    const marker: string = kind === 'line' ? '' : ' marker-end="url(#' + (kind === 'generalization' ? 'arrow-hollow' : 'arrow-head') + ')"';
    const labelPoint: Point = bend === 0 ? middle : { x: (middle.x + control.x) / 2, y: (middle.y + control.y) / 2 };
    const label: string = edge.label === undefined ? '' :
      '<text class="edge-label" x="' + labelPoint.x + '" y="' + (labelPoint.y - 7) + '" text-anchor="middle">' + edge.label + '</text>';
    return '<g class="diagram-edge' + (edge.dashed === true ? ' dashed' : '') + '" data-edge="' + index + '">' +
      '<path d="' + path + '"' + marker + '></path>' + label + '</g>';
  }

  private renderSpiral(spiral: DiagramSpiral): string {
    const samples: number = Math.ceil(spiral.turns * 72);
    let path: string = '';
    for (let i = 0; i <= samples; i++) {
      const point: Point = spiralPoint(spiral, (i / samples) * spiral.turns);
      path += (i === 0 ? 'M' : ' L') + point.x.toFixed(1) + ',' + point.y.toFixed(1);
    }
    const reach: number = spiral.startRadius + spiral.growth * spiral.turns + 14;
    return '<g class="diagram-spiral">' +
      '<line x1="' + (spiral.centerX - reach) + '" y1="' + spiral.centerY + '" x2="' + (spiral.centerX + reach) + '" y2="' + spiral.centerY + '"></line>' +
      '<line x1="' + spiral.centerX + '" y1="' + (spiral.centerY - reach) + '" x2="' + spiral.centerX + '" y2="' + (spiral.centerY + reach) + '"></line>' +
      '<path d="' + path + '"></path></g>';
  }

  private showStep(index: number): void {
    if (this.root === null) return;
    const step: DiagramStep = this.model.steps[index];
    const visited: Set<string> = new Set<string>();
    for (let i = 0; i < index; i++) for (const id of this.model.steps[i].nodes) visited.add(id);
    for (const node of queryAll<SVGGElement>(this.root, '.diagram-node')) {
      const id: string = node.dataset.node ?? '';
      node.classList.toggle('active', step.nodes.includes(id));
      node.classList.toggle('visited', visited.has(id) && !step.nodes.includes(id));
    }
    for (const edge of queryAll<SVGGElement>(this.root, '.diagram-edge')) {
      edge.classList.toggle('active', (step.edges ?? []).includes(Number(edge.dataset.edge)));
    }
    const caption: HTMLElement = query(this.root, '.diagram-caption');
    caption.innerHTML = step.caption;
    caption.classList.remove('reveal');
    void caption.offsetWidth;
    caption.classList.add('reveal');
    this.moveToken(step);
  }

  private moveToken(step: DiagramStep): void {
    if (this.root === null || this.model.noToken === true || step.nodes.length === 0) return;
    const token: SVGGElement | null = this.root.querySelector<SVGGElement>('.diagram-token');
    if (token === null) return;
    const spiral: DiagramSpiral | undefined = this.model.spiral;
    const arc: [number, number] | undefined = step.arc;
    const target: Point = spiral !== undefined && arc !== undefined ? spiralPoint(spiral, arc[1]) : this.dock(this.node(step.nodes[0]));
    const origin: Point = spiral !== undefined && arc !== undefined ? spiralPoint(spiral, arc[0]) : this.tokenPosition ?? target;
    const place = (point: Point): void => {
      token.setAttribute('transform', 'translate(' + point.x.toFixed(1) + ',' + point.y.toFixed(1) + ')');
    };
    this.cancelAnimation();
    token.style.opacity = '1';
    this.tokenPosition = target;
    if (prefersReducedMotion()) {
      place(target);
      return;
    }
    const startTime: number = performance.now();
    const frame = (now: number): void => {
      const linear: number = Math.min(1, (now - startTime) / TOKEN_TRAVEL_MS);
      const eased: number = linear < 0.5 ? 2 * linear * linear : 1 - Math.pow(-2 * linear + 2, 2) / 2;
      if (spiral !== undefined && arc !== undefined) {
        place(spiralPoint(spiral, arc[0] + (arc[1] - arc[0]) * eased));
      } else {
        place({ x: origin.x + (target.x - origin.x) * eased, y: origin.y + (target.y - origin.y) * eased });
      }
      if (linear < 1) this.animationFrame = window.requestAnimationFrame(frame);
      else this.animationFrame = null;
    };
    this.animationFrame = window.requestAnimationFrame(frame);
  }

  private jumpToNode(nodeId: string): void {
    const index: number = this.model.steps.findIndex((step: DiagramStep) => step.nodes[0] === nodeId);
    if (index === -1) return;
    this.controls.pause();
    this.controls.goTo(index);
  }

  private cancelAnimation(): void {
    if (this.animationFrame !== null) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private node(id: string): DiagramNode {
    const found: DiagramNode | undefined = this.model.nodes.find((candidate: DiagramNode) => candidate.id === id);
    if (found === undefined) throw new Error('Unknown diagram node "' + id + '" in model "' + this.model.id + '"');
    return found;
  }

  private center(node: DiagramNode): Point {
    return { x: node.x, y: node.y };
  }

  /** Where the token rests on a node: its top edge, so the label stays readable. */
  private dock(node: DiagramNode): Point {
    const shape: DiagramShape = node.shape ?? 'box';
    if (shape === 'label') return { x: node.x, y: node.y - 16 };
    if (shape === 'actor') return { x: node.x, y: node.y - 48 };
    return { x: node.x, y: node.y - (node.height ?? DEFAULT_HEIGHT) / 2 };
  }

  /** Point where the segment between two node centers crosses the border of the first one. */
  private borderPoint(node: DiagramNode, towards: DiagramNode): Point {
    const shape: DiagramShape = node.shape ?? 'box';
    const halfWidth: number = (shape === 'actor' ? 40 : node.width ?? DEFAULT_WIDTH) / 2 + 4;
    const halfHeight: number = (shape === 'actor' ? 76 : node.height ?? DEFAULT_HEIGHT) / 2 + 4;
    const deltaX: number = towards.x - node.x;
    const deltaY: number = towards.y - node.y;
    if (deltaX === 0 && deltaY === 0) return this.center(node);
    if (shape === 'ellipse') {
      const scale: number = 1 / Math.sqrt((deltaX * deltaX) / (halfWidth * halfWidth) + (deltaY * deltaY) / (halfHeight * halfHeight));
      return { x: node.x + deltaX * scale, y: node.y + deltaY * scale };
    }
    const scale: number = Math.min(
      deltaX === 0 ? Infinity : halfWidth / Math.abs(deltaX),
      deltaY === 0 ? Infinity : halfHeight / Math.abs(deltaY),
    );
    return { x: node.x + deltaX * scale, y: node.y + deltaY * scale };
  }
}
