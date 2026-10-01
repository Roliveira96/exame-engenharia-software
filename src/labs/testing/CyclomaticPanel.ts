import type { LabPanel } from '../Lab';
import { prefersReducedMotion, query, queryAll } from '../../app/html';
import { cyclomaticComplexity } from './analysis';
import type { Cyclomatic } from './analysis';

export interface FlowNode {
  id: string;
  x: number;
  y: number;
  /** 1-based code lines this node stands for. */
  lines: number[];
}

export interface FlowEdge {
  from: string;
  to: string;
  /** Sideways bend in pixels for loops and long jumps. */
  bend?: number;
}

export interface FlowPath {
  nodes: string[];
  /** HTML with the test case that drives execution through this path. */
  description: string;
}

export interface FlowProgram {
  id: string;
  name: string;
  code: string[];
  width: number;
  height: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  /** Closed areas of the graph plus the outer one. */
  regions: number;
  paths: FlowPath[];
}

export interface CyclomaticConfig {
  id: string;
  label: string;
  title: string;
  intro: string;
  programs: FlowProgram[];
  nodesLabel: string;
  edgesLabel: string;
  predicatesLabel: string;
  regionsLabel: string;
  formulaTitles: { edges: string; predicates: string; regions: string };
  pathsTitle: (count: number) => string;
  pathLabel: (index: number) => string;
  pathHint: string;
}

const RADIUS: number = 17;
const WALK_INTERVAL_MS: number = 700;

/** White-box workbench: code, its flow graph, V(G) three ways and the independent paths. */
export class CyclomaticPanel implements LabPanel {
  public readonly id: string;
  public readonly label: string;
  private readonly config: CyclomaticConfig;
  private root: HTMLElement | null = null;
  private program: FlowProgram;
  private timer: number | null = null;

  constructor(config: CyclomaticConfig) {
    this.id = config.id;
    this.label = config.label;
    this.config = config;
    this.program = config.programs[0];
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public unmount(): void {
    this.stop();
    this.root = null;
  }

  private render(): void {
    if (this.root === null) return;
    this.stop();
    const config: CyclomaticConfig = this.config;
    const program: FlowProgram = this.program;
    const result: Cyclomatic = cyclomaticComplexity({
      nodes: program.nodes.map((node: FlowNode) => node.id),
      edges: program.edges.map((edge: FlowEdge): [string, string] => [edge.from, edge.to]),
    });
    const chips: string = config.programs
      .map((candidate: FlowProgram) => '<button class="chip' + (candidate === program ? ' active' : '') + '" data-program="' + candidate.id + '">' + candidate.name + '</button>')
      .join('');
    const code: string = program.code
      .map((line: string, index: number) => '<div class="code-line" data-line="' + (index + 1) + '"><i>' + (index + 1) + '</i><span>' + line.replace(/</g, '&lt;') + '</span></div>')
      .join('');
    const paths: string = program.paths
      .map((_: FlowPath, index: number) => '<button class="chip" data-path="' + index + '">' + config.pathLabel(index + 1) + '</button>')
      .join('');
    this.root.innerHTML =
      '<div class="cyclomatic">' +
      '  <h3 class="panel-title">' + config.title + '</h3>' +
      '  <p class="panel-intro">' + config.intro + '</p>' +
      '  <div class="chips">' + chips + '</div>' +
      '  <div class="cyclomatic-layout"><pre class="code-block">' + code + '</pre>' +
      '    <div class="diagram-canvas flow-graph">' + this.renderGraph() + '</div></div>' +
      '  <div class="stat-tiles four"><div class="stat-tile"><small>' + config.nodesLabel + '</small><b>' + result.nodes + '</b></div>' +
      '    <div class="stat-tile"><small>' + config.edgesLabel + '</small><b>' + result.edges + '</b></div>' +
      '    <div class="stat-tile"><small>' + config.predicatesLabel + '</small><b>' + result.predicates + '</b></div>' +
      '    <div class="stat-tile"><small>' + config.regionsLabel + '</small><b>' + program.regions + '</b></div></div>' +
      '  <div class="calc-formula">' +
      config.formulaTitles.edges + ': V(G) = E − N + 2 = ' + result.edges + ' − ' + result.nodes + ' + 2 = <b>' + result.byEdges + '</b><br>' +
      config.formulaTitles.predicates + ': V(G) = P + 1 = ' + result.predicates + ' + 1 = <b>' + result.byPredicates + '</b><br>' +
      config.formulaTitles.regions + ': V(G) = <b>' + program.regions + '</b></div>' +
      '  <h4 class="calc-subtitle">' + config.pathsTitle(result.byEdges) + '</h4>' +
      '  <div class="chips">' + paths + '</div>' +
      '  <div class="diagram-caption">' + config.pathHint + '</div>' +
      '</div>';
    for (const chip of queryAll(this.root, '[data-program]')) {
      chip.addEventListener('click', () => {
        this.program = this.config.programs.find((candidate: FlowProgram) => candidate.id === chip.dataset.program) ?? this.program;
        this.render();
      });
    }
    for (const chip of queryAll(this.root, '[data-path]')) {
      chip.addEventListener('click', () => this.walk(Number(chip.dataset.path)));
    }
    if (!prefersReducedMotion()) this.walk(0);
  }

  private renderGraph(): string {
    const program: FlowProgram = this.program;
    const find = (id: string): FlowNode => {
      const node: FlowNode | undefined = program.nodes.find((candidate: FlowNode) => candidate.id === id);
      if (node === undefined) throw new Error('Unknown flow node: ' + id);
      return node;
    };
    const edges: string = program.edges
      .map((edge: FlowEdge) => {
        const from: FlowNode = find(edge.from);
        const to: FlowNode = find(edge.to);
        const bend: number = edge.bend ?? 0;
        const length: number = Math.hypot(to.x - from.x, to.y - from.y) || 1;
        const unitX: number = (to.x - from.x) / length;
        const unitY: number = (to.y - from.y) / length;
        const control = { x: (from.x + to.x) / 2 + unitY * bend, y: (from.y + to.y) / 2 - unitX * bend };
        // Start and end on the circle borders, aimed at the control point so curved edges leave cleanly.
        const aim = (node: FlowNode, target: { x: number; y: number }): { x: number; y: number } => {
          const distance: number = Math.hypot(target.x - node.x, target.y - node.y) || 1;
          return { x: node.x + ((target.x - node.x) / distance) * (RADIUS + 2), y: node.y + ((target.y - node.y) / distance) * (RADIUS + 2) };
        };
        const start = bend === 0 ? aim(from, to) : aim(from, control);
        const end = bend === 0 ? aim(to, from) : aim(to, control);
        const path: string = bend === 0
          ? 'M' + start.x.toFixed(1) + ',' + start.y.toFixed(1) + ' L' + end.x.toFixed(1) + ',' + end.y.toFixed(1)
          : 'M' + start.x.toFixed(1) + ',' + start.y.toFixed(1) + ' Q' + control.x.toFixed(1) + ',' + control.y.toFixed(1) + ' ' + end.x.toFixed(1) + ',' + end.y.toFixed(1);
        return '<g class="diagram-edge" data-edge="' + edge.from + '>' + edge.to + '"><path d="' + path + '" marker-end="url(#flow-arrow)"></path></g>';
      })
      .join('');
    const nodes: string = program.nodes
      .map((node: FlowNode) =>
        '<g class="flow-node" data-node="' + node.id + '"><circle cx="' + node.x + '" cy="' + node.y + '" r="' + RADIUS + '"></circle>' +
        '<text x="' + node.x + '" y="' + node.y + '" text-anchor="middle" dominant-baseline="central">' + node.id + '</text></g>')
      .join('');
    return '<svg viewBox="0 0 ' + program.width + ' ' + program.height + '"><defs>' +
      '<marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="marker-fill"></path></marker>' +
      '</defs>' + edges + nodes + '</svg>';
  }

  /** Lights up one independent path node by node, together with the code lines it executes. */
  private walk(pathIndex: number): void {
    if (this.root === null) return;
    this.stop();
    const root: HTMLElement = this.root;
    const path: FlowPath = this.program.paths[pathIndex];
    for (const chip of queryAll(root, '[data-path]')) chip.classList.toggle('active', Number(chip.dataset.path) === pathIndex);
    for (const element of queryAll(root, '.flow-node, .diagram-edge, .code-line')) element.classList.remove('active');
    query(root, '.diagram-caption').innerHTML = path.description;
    let step: number = 0;
    const advance = (): void => {
      const id: string = path.nodes[step];
      root.querySelector('.flow-node[data-node="' + id + '"]')?.classList.add('active');
      const node: FlowNode | undefined = this.program.nodes.find((candidate: FlowNode) => candidate.id === id);
      for (const line of node?.lines ?? []) root.querySelector('.code-line[data-line="' + line + '"]')?.classList.add('active');
      if (step > 0) root.querySelector('.diagram-edge[data-edge="' + path.nodes[step - 1] + '>' + id + '"]')?.classList.add('active');
      step++;
      if (step >= path.nodes.length) this.stop();
    };
    advance();
    if (path.nodes.length > 1) this.timer = window.setInterval(advance, WALK_INTERVAL_MS);
  }

  private stop(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}
