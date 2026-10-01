/** Pure estimation formulas, kept apart from the panels so they can be unit-tested. */

export type Complexity = 'simple' | 'average' | 'complex';
export type FunctionKind = 'inputs' | 'outputs' | 'inquiries' | 'files' | 'interfaces';

export const FUNCTION_KINDS: FunctionKind[] = ['inputs', 'outputs', 'inquiries', 'files', 'interfaces'];
export const COMPLEXITIES: Complexity[] = ['simple', 'average', 'complex'];

/** Albrecht's weighting factors for the five information domain values. */
export const FUNCTION_POINT_WEIGHTS: Record<FunctionKind, Record<Complexity, number>> = {
  inputs: { simple: 3, average: 4, complex: 6 },
  outputs: { simple: 4, average: 5, complex: 7 },
  inquiries: { simple: 3, average: 4, complex: 6 },
  files: { simple: 7, average: 10, complex: 15 },
  interfaces: { simple: 5, average: 7, complex: 10 },
};

export interface FunctionCount {
  count: number;
  complexity: Complexity;
}

export const MAX_INFLUENCE_SUM: number = 70;

/** Count total: every domain value multiplied by the weight of its complexity. */
export function unadjustedFunctionPoints(counts: Record<FunctionKind, FunctionCount>): number {
  let total: number = 0;
  for (const kind of FUNCTION_KINDS) {
    total += counts[kind].count * FUNCTION_POINT_WEIGHTS[kind][counts[kind].complexity];
  }
  return total;
}

/** Value adjustment factor from the sum of the 14 general characteristics (each rated 0..5). */
export function adjustmentFactor(influenceSum: number): number {
  return 0.65 + 0.01 * influenceSum;
}

export function functionPoints(countTotal: number, influenceSum: number): number {
  return countTotal * adjustmentFactor(influenceSum);
}

export type CocomoMode = 'organic' | 'semidetached' | 'embedded';

export const COCOMO_MODES: CocomoMode[] = ['organic', 'semidetached', 'embedded'];

/** Basic COCOMO coefficients (Boehm, 1981): effort = a * KLOC^b, duration = c * effort^d. */
export const COCOMO_COEFFICIENTS: Record<CocomoMode, { a: number; b: number; c: number; d: number }> = {
  organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
  semidetached: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
  embedded: { a: 3.6, b: 1.2, c: 2.5, d: 0.32 },
};

export interface CocomoResult {
  /** Person-months. */
  effort: number;
  /** Calendar months. */
  duration: number;
  /** Average team size. */
  people: number;
}

export function cocomoBasic(kloc: number, mode: CocomoMode): CocomoResult {
  const { a, b, c, d } = COCOMO_COEFFICIENTS[mode];
  const effort: number = a * Math.pow(kloc, b);
  const duration: number = c * Math.pow(effort, d);
  return { effort, duration, people: duration === 0 ? 0 : effort / duration };
}

export interface ThreePointResult {
  expected: number;
  deviation: number;
}

/** Three-point (PERT) estimate: the most likely value weighs four times more than the extremes. */
export function threePoint(optimistic: number, likely: number, pessimistic: number): ThreePointResult {
  return {
    expected: (optimistic + 4 * likely + pessimistic) / 6,
    deviation: (pessimistic - optimistic) / 6,
  };
}
