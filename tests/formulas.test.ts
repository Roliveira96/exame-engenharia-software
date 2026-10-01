import { describe, expect, it } from 'vitest';
import {
  adjustmentFactor, cocomoBasic, functionPoints, threePoint, unadjustedFunctionPoints,
} from '../src/labs/estimation/formulas';
import { boundaryValues, coverage, cyclomaticComplexity, partitionOf, snap } from '../src/labs/testing/analysis';
import type { Partition } from '../src/labs/testing/analysis';
import { functionPointCalculator } from '../src/content/labs/estimationLab';
import { boundaryWorkbench } from '../src/content/labs/testingLab';

describe('function points', () => {
  it('weighs every domain value by its complexity', () => {
    const library = functionPointCalculator.presets[0];
    expect(unadjustedFunctionPoints(library.counts)).toBe(10 * 4 + 8 * 5 + 5 * 4 + 4 * 10 + 2 * 7);
  });

  it('keeps the adjustment factor between 0.65 and 1.35', () => {
    expect(adjustmentFactor(0)).toBeCloseTo(0.65);
    expect(adjustmentFactor(35)).toBeCloseTo(1);
    expect(adjustmentFactor(70)).toBeCloseTo(1.35);
  });

  it('matches the worked example used in the question bank', () => {
    expect(functionPoints(200, 50)).toBeCloseTo(230);
    expect(functionPoints(154, 35)).toBeCloseTo(154);
  });
});

describe('basic COCOMO', () => {
  it('reproduces the organic 32 KLOC textbook case', () => {
    const result = cocomoBasic(32, 'organic');
    expect(result.effort).toBeCloseTo(91.3, 0);
    expect(result.duration).toBeCloseTo(13.9, 0);
    expect(result.people).toBeCloseTo(result.effort / result.duration);
  });

  it('asks for more effort as the project mode gets more constrained', () => {
    const organic: number = cocomoBasic(50, 'organic').effort;
    const semidetached: number = cocomoBasic(50, 'semidetached').effort;
    const embedded: number = cocomoBasic(50, 'embedded').effort;
    expect(semidetached).toBeGreaterThan(organic);
    expect(embedded).toBeGreaterThan(semidetached);
  });

  it('shows diseconomy of scale: doubling the size more than doubles the effort', () => {
    expect(cocomoBasic(100, 'organic').effort).toBeGreaterThan(2 * cocomoBasic(50, 'organic').effort);
  });
});

describe('three-point estimate', () => {
  it('weighs the most likely value four times', () => {
    expect(threePoint(4, 7, 16)).toEqual({ expected: 8, deviation: 2 });
  });
});

describe('equivalence partitions and boundary values', () => {
  const age: Partition[] = boundaryWorkbench.scenarios[0].partitions;
  const grade: Partition[] = boundaryWorkbench.scenarios[1].partitions;

  it('finds the class of a value', () => {
    expect(partitionOf(17, age)).toBe(0);
    expect(partitionOf(18, age)).toBe(1);
    expect(partitionOf(65, age)).toBe(1);
    expect(partitionOf(66, age)).toBe(2);
    expect(partitionOf(500, age)).toBe(-1);
  });

  it('derives the values on both sides of each boundary', () => {
    expect(boundaryValues(age)).toEqual([17, 18, 65, 66]);
    expect(boundaryValues(grade)).toEqual([-0.1, 0, 5.9, 6, 10, 10.1]);
  });

  it('reports full coverage only when every class and boundary was exercised', () => {
    expect(coverage([40], age).complete).toBe(false);
    expect(coverage([17, 18, 65], age).complete).toBe(false);
    const full = coverage([17, 18, 65, 66], age);
    expect(full.partitions.size).toBe(3);
    expect(full.complete).toBe(true);
  });

  it.each(boundaryWorkbench.scenarios)('scenario $id has contiguous classes on its step', (scenario) => {
    for (let i = 0; i < scenario.partitions.length - 1; i++) {
      expect(snap(scenario.partitions[i].to + scenario.step, scenario.step)).toBe(scenario.partitions[i + 1].from);
    }
    expect(scenario.partitions.some((partition: Partition) => partition.valid)).toBe(true);
    expect(scenario.partitions.some((partition: Partition) => !partition.valid)).toBe(true);
  });

  it('removes floating point noise from decimal steps', () => {
    expect(snap(5.8999999, 0.1)).toBe(5.9);
    expect(snap(0.1 + 0.2, 0.1)).toBe(0.3);
    expect(snap(17.4, 1)).toBe(17);
  });
});

describe('cyclomatic complexity', () => {
  it('computes V(G) for the graph used in the question bank', () => {
    const nodes: string[] = ['1', '2', '3', '4', '5', '6', '7'];
    const edges: Array<[string, string]> = [
      ['1', '2'], ['1', '3'], ['2', '5'], ['3', '4'], ['3', '5'], ['4', '5'], ['5', '6'], ['5', '7'], ['6', '7'],
    ];
    expect(cyclomaticComplexity({ nodes, edges })).toEqual({ nodes: 7, edges: 9, predicates: 3, byEdges: 4, byPredicates: 4 });
  });

  it('is 1 for straight-line code', () => {
    expect(cyclomaticComplexity({ nodes: ['a', 'b', 'c'], edges: [['a', 'b'], ['b', 'c']] }).byEdges).toBe(1);
  });
});
