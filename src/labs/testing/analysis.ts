/** Pure test-design helpers: equivalence partitions, boundary values and cyclomatic complexity. */

export interface Partition {
  label: string;
  /** Inclusive lower bound. */
  from: number;
  /** Inclusive upper bound. */
  to: number;
  valid: boolean;
  /** What the system is expected to answer for any value of this class. */
  outcome: string;
}

/** Rounds away floating point noise for values that move in fixed steps (0.1, 1...). */
export function snap(value: number, step: number): number {
  const decimals: number = Math.max(0, Math.ceil(-Math.log10(step)));
  return Number((Math.round(value / step) * step).toFixed(decimals));
}

/** Index of the equivalence class a value belongs to, or -1 when it is outside every class. */
export function partitionOf(value: number, partitions: Partition[]): number {
  return partitions.findIndex((partition: Partition) => value >= partition.from && value <= partition.to);
}

/** Two-value boundary analysis: the last value of each class and the first value of the next one. */
export function boundaryValues(partitions: Partition[]): number[] {
  const values: number[] = [];
  for (let i = 0; i < partitions.length - 1; i++) {
    values.push(partitions[i].to, partitions[i + 1].from);
  }
  return values;
}

export interface Coverage {
  /** Indexes of the classes exercised by at least one test value. */
  partitions: Set<number>;
  /** Boundary values exercised by a test value. */
  boundaries: Set<number>;
  complete: boolean;
}

export function coverage(tests: number[], partitions: Partition[]): Coverage {
  const boundaries: number[] = boundaryValues(partitions);
  const hitPartitions: Set<number> = new Set<number>();
  const hitBoundaries: Set<number> = new Set<number>();
  for (const value of tests) {
    const index: number = partitionOf(value, partitions);
    if (index !== -1) hitPartitions.add(index);
    if (boundaries.includes(value)) hitBoundaries.add(value);
  }
  return {
    partitions: hitPartitions,
    boundaries: hitBoundaries,
    complete: hitPartitions.size === partitions.length && hitBoundaries.size === new Set<number>(boundaries).size,
  };
}

export interface FlowGraph {
  nodes: string[];
  edges: Array<[string, string]>;
}

export interface Cyclomatic {
  nodes: number;
  edges: number;
  /** Nodes with more than one way out. */
  predicates: number;
  /** V(G) = E - N + 2. */
  byEdges: number;
  /** V(G) = P + 1. */
  byPredicates: number;
}

/** McCabe's cyclomatic complexity of a single-entry, single-exit flow graph with binary decisions. */
export function cyclomaticComplexity(graph: FlowGraph): Cyclomatic {
  const predicates: number = graph.nodes.filter(
    (node: string) => graph.edges.filter(([from]: [string, string]) => from === node).length > 1,
  ).length;
  return {
    nodes: graph.nodes.length,
    edges: graph.edges.length,
    predicates,
    byEdges: graph.edges.length - graph.nodes.length + 2,
    byPredicates: predicates + 1,
  };
}
