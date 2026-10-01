import { describe, expect, it } from 'vitest';
import { TopicCatalog } from '../src/content/TopicCatalog';
import type { Topic } from '../src/content/Topic';
import { PASSING_GRADE, drawExam, isCorrect, scoreExam } from '../src/app/examEngine';
import type { ExamItem } from '../src/app/examEngine';
import { T } from '../src/content/uiText';

const topics: Topic[] = new TopicCatalog().list();

/** Deterministic pseudo-random generator so draws are repeatable. */
function seeded(seed: number): () => number {
  let state: number = seed;
  return (): number => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function answerCorrectly(item: ExamItem): void {
  item.chosen = item.options.indexOf(item.question.answer);
}

describe('exam draw', () => {
  it.each(T.exam.modes)('mode $id draws its number of distinct questions', (mode) => {
    const items: ExamItem[] = drawExam(topics, mode.questions, seeded(7));
    expect(items).toHaveLength(mode.questions);
    expect(new Set<string>(items.map((item: ExamItem) => item.question.id)).size).toBe(mode.questions);
  });

  it('spreads the questions evenly over the selected topics', () => {
    const items: ExamItem[] = drawExam(topics, 40, seeded(11));
    for (const topic of topics) {
      expect(items.filter((item: ExamItem) => item.topic.id === topic.id)).toHaveLength(5);
    }
  });

  it('keeps the right answer among the shuffled options and starts unanswered', () => {
    for (const item of drawExam(topics, 40, seeded(3))) {
      expect(item.options).toHaveLength(4);
      expect(item.options).toContain(item.question.answer);
      expect(item.chosen).toBeNull();
      expect(item.flagged).toBe(false);
    }
  });

  it('does not always put the right answer in the same position', () => {
    const positions: Set<number> = new Set<number>(
      drawExam(topics, 40, seeded(5)).map((item: ExamItem) => item.options.indexOf(item.question.answer)),
    );
    expect(positions.size).toBe(4);
  });

  it('draws only from the selected topics and stops when their questions run out', () => {
    const one: Topic[] = [topics[0]];
    const items: ExamItem[] = drawExam(one, 40, seeded(1));
    expect(items).toHaveLength(one[0].questions.length);
    expect(items.every((item: ExamItem) => item.topic.id === one[0].id)).toBe(true);
  });
});

describe('exam score', () => {
  it('gives 10 when everything is right and passes', () => {
    const items: ExamItem[] = drawExam(topics, 20, seeded(2));
    items.forEach(answerCorrectly);
    const score = scoreExam(items);
    expect(score.correct).toBe(20);
    expect(score.grade).toBe(10);
    expect(score.passed).toBe(true);
  });

  it('counts blank answers as wrong', () => {
    const items: ExamItem[] = drawExam(topics, 10, seeded(4));
    expect(isCorrect(items[0])).toBe(false);
    expect(scoreExam(items)).toMatchObject({ correct: 0, grade: 0, passed: false });
  });

  it('passes exactly at the 6.0 threshold', () => {
    const items: ExamItem[] = drawExam(topics, 10, seeded(9));
    items.slice(0, 6).forEach(answerCorrectly);
    expect(scoreExam(items).grade).toBe(PASSING_GRADE);
    expect(scoreExam(items).passed).toBe(true);
    const below: ExamItem[] = drawExam(topics, 10, seeded(9));
    below.slice(0, 5).forEach(answerCorrectly);
    expect(scoreExam(below).passed).toBe(false);
  });

  it('breaks the result down by topic, in course order', () => {
    const items: ExamItem[] = drawExam(topics, 16, seeded(6));
    items.filter((item: ExamItem) => item.topic.id === 'agile').forEach(answerCorrectly);
    const score = scoreExam(items);
    expect(score.byTopic.map((entry) => entry.topic.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    for (const entry of score.byTopic) {
      expect(entry.total).toBe(2);
      expect(entry.correct).toBe(entry.topic.id === 'agile' ? 2 : 0);
    }
  });
});
