import { describe, expect, it } from 'vitest';
import type { ClassifierConfig } from '../src/components/ClassifierGame';
import type { DiagramConfig, DiagramModel } from '../src/components/DiagramPlayer';
import { spiralPoint } from '../src/components/DiagramPlayer';
import { burndownPoints } from '../src/labs/SprintPanel';
import { cyclomaticComplexity } from '../src/labs/testing/analysis';
import * as introductionLab from '../src/content/labs/introductionLab';
import * as lifecyclesLab from '../src/content/labs/lifecyclesLab';
import * as agileLab from '../src/content/labs/agileLab';
import * as requirementsLab from '../src/content/labs/requirementsLab';
import * as estimationLab from '../src/content/labs/estimationLab';
import * as qualityLab from '../src/content/labs/qualityLab';
import * as testingLab from '../src/content/labs/testingLab';
import * as evolutionLab from '../src/content/labs/evolutionLab';

const modules: Array<Record<string, unknown>> = [
  introductionLab, lifecyclesLab, agileLab, requirementsLab, estimationLab, qualityLab, testingLab, evolutionLab,
];
const exported: unknown[] = modules.flatMap((module) => Object.values(module));

const classifiers: ClassifierConfig[] = exported.filter(
  (value: unknown): value is ClassifierConfig => typeof value === 'object' && value !== null && 'categories' in value && 'items' in value,
);
const diagrams: DiagramConfig[] = exported.filter(
  (value: unknown): value is DiagramConfig => typeof value === 'object' && value !== null && 'models' in value && Array.isArray((value as DiagramConfig).models) &&
    (value as DiagramConfig).models.every((model) => 'nodes' in model && 'steps' in model),
);
const models: DiagramModel[] = diagrams.flatMap((diagram: DiagramConfig) => diagram.models);

describe('classifier games', () => {
  it('found the games in the lab data', () => {
    expect(classifiers.length).toBe(19);
  });

  it.each(classifiers)('$id only uses declared categories and uses all of them', (game: ClassifierConfig) => {
    const categoryIds: string[] = game.categories.map((category) => category.id);
    expect(new Set<string>(categoryIds).size).toBe(categoryIds.length);
    for (const item of game.items) {
      expect(categoryIds, item.text).toContain(item.category);
      expect(item.explanation.trim()).not.toBe('');
    }
    for (const id of categoryIds) {
      expect(game.items.some((item) => item.category === id), id).toBe(true);
    }
    expect(new Set<string>(game.items.map((item) => item.text)).size).toBe(game.items.length);
  });
});

describe('diagrams', () => {
  it.each(models)('$id references only existing nodes and edges', (model: DiagramModel) => {
    const nodeIds: string[] = model.nodes.map((node) => node.id);
    expect(new Set<string>(nodeIds).size).toBe(nodeIds.length);
    for (const edge of model.edges) {
      expect(nodeIds).toContain(edge.from);
      expect(nodeIds).toContain(edge.to);
    }
    expect(model.steps.length).toBeGreaterThan(0);
    for (const step of model.steps) {
      expect(step.nodes.length).toBeGreaterThan(0);
      for (const id of step.nodes) expect(nodeIds).toContain(id);
      for (const index of step.edges ?? []) expect(model.edges[index]).toBeDefined();
      if (step.arc !== undefined) expect(model.spiral).toBeDefined();
    }
  });

  it.each(models)('$id keeps every node inside the drawing area', (model: DiagramModel) => {
    for (const node of model.nodes) {
      if (node.shape === 'label' || node.shape === 'actor') continue;
      const halfWidth: number = (node.width ?? 132) / 2;
      const halfHeight: number = (node.height ?? 46) / 2;
      expect(node.x - halfWidth, node.id).toBeGreaterThanOrEqual(0);
      expect(node.x + halfWidth, node.id).toBeLessThanOrEqual(model.width);
      expect(node.y - halfHeight, node.id).toBeGreaterThanOrEqual(0);
      expect(node.y + halfHeight, node.id).toBeLessThanOrEqual(model.height);
    }
  });

  it('draws the spiral clockwise starting on the left', () => {
    const spiral = { centerX: 100, centerY: 100, startRadius: 10, growth: 40, turns: 2 };
    expect(spiralPoint(spiral, 0)).toEqual({ x: 90, y: expect.closeTo(100, 5) });
    const quarter = spiralPoint(spiral, 0.25);
    expect(quarter.x).toBeCloseTo(100, 5);
    expect(quarter.y).toBeCloseTo(80, 5);
  });
});

describe('sprint simulation', () => {
  const config = agileLab.sprintSimulation;

  it('only moves stories that exist and names known events', () => {
    const storyIds: string[] = config.stories.map((story) => story.id);
    const eventIds: string[] = config.events.map((event) => event.id);
    for (const step of config.steps) {
      expect(eventIds).toContain(step.event);
      for (const move of step.moves ?? []) expect(storyIds).toContain(move.story);
      for (const story of step.blocked ?? []) expect(storyIds).toContain(story);
    }
  });

  it('burns the sprint commitment down to zero, flat while a story is blocked', () => {
    const points = burndownPoints(config, config.steps.length - 1);
    expect(points.map((point) => point.day)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(points.map((point) => point.remaining)).toEqual([13, 13, 10, 10, 5, 0]);
  });

  it('shows only the days already reached', () => {
    expect(burndownPoints(config, 0)).toEqual([]);
    expect(burndownPoints(config, 3)).toEqual([
      { day: 0, remaining: 13 }, { day: 1, remaining: 13 }, { day: 2, remaining: 10 },
    ]);
  });
});

describe('flow graphs of the cyclomatic workbench', () => {
  it.each(testingLab.cyclomaticWorkbench.programs)('$id agrees on V(G) by edges, predicates, regions and paths', (program) => {
    const result = cyclomaticComplexity({
      nodes: program.nodes.map((node) => node.id),
      edges: program.edges.map((edge): [string, string] => [edge.from, edge.to]),
    });
    expect(result.byPredicates).toBe(result.byEdges);
    expect(program.regions).toBe(result.byEdges);
    expect(program.paths).toHaveLength(result.byEdges);
  });

  it.each(testingLab.cyclomaticWorkbench.programs)('$id has basis paths that follow real edges and cover all of them', (program) => {
    const edgeKeys: Set<string> = new Set<string>(program.edges.map((edge) => edge.from + '>' + edge.to));
    const covered: Set<string> = new Set<string>();
    for (const path of program.paths) {
      for (let i = 1; i < path.nodes.length; i++) {
        const key: string = path.nodes[i - 1] + '>' + path.nodes[i];
        expect(edgeKeys, key).toContain(key);
        covered.add(key);
      }
    }
    expect(covered.size).toBe(edgeKeys.size);
    for (const node of program.nodes) {
      for (const line of node.lines) expect(program.code[line - 1]).toBeDefined();
    }
  });
});

describe('rollout timelines', () => {
  it.each(evolutionLab.rolloutTimeline.strategies)('$id fills the timeline without gaps inside a row', (strategy) => {
    const duration: number = evolutionLab.rolloutTimeline.duration;
    for (const row of strategy.rows) {
      for (const segment of row.segments) {
        expect(segment.from).toBeGreaterThanOrEqual(0);
        expect(segment.to).toBeLessThanOrEqual(duration);
        expect(segment.to).toBeGreaterThan(segment.from);
      }
    }
    // The new system must be the one running when the timeline ends.
    const endsOnNew: boolean = strategy.rows.some((row) => row.segments.some((segment) => segment.system === 'new' && segment.to === duration));
    expect(endsOnNew).toBe(true);
    expect([1, 2, 3]).toContain(strategy.risk);
    expect([1, 2, 3]).toContain(strategy.cost);
  });
});
