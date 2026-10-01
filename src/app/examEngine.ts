import type { ChoiceQuestion, Topic } from '../content/Topic';
import { shuffle } from './html';

/** A drawn exam question: the options already shuffled, plus the student's state. */
export interface ExamItem {
  topic: Topic;
  question: ChoiceQuestion;
  options: string[];
  chosen: number | null;
  flagged: boolean;
}

export interface TopicScore {
  topic: Topic;
  correct: number;
  total: number;
}

export interface ExamScore {
  correct: number;
  total: number;
  /** Grade from 0 to 10. */
  grade: number;
  passed: boolean;
  byTopic: TopicScore[];
}

/** UTFPR approves from grade 6.0. */
export const PASSING_GRADE: number = 6;

/**
 * Draws questions round-robin across the topics so every selected topic is represented
 * as evenly as its question pool allows.
 */
export function drawExam(topics: Topic[], count: number, random: () => number = Math.random): ExamItem[] {
  const pools: Array<{ topic: Topic; questions: ChoiceQuestion[] }> = shuffle(topics, random)
    .map((topic: Topic) => ({ topic, questions: shuffle(topic.questions, random) }));
  const drawn: ExamItem[] = [];
  let progressed: boolean = true;
  while (drawn.length < count && progressed) {
    progressed = false;
    for (const pool of pools) {
      if (drawn.length >= count) break;
      const question: ChoiceQuestion | undefined = pool.questions.pop();
      if (question === undefined) continue;
      progressed = true;
      drawn.push({
        topic: pool.topic,
        question,
        options: shuffle([question.answer, ...question.distractors], random),
        chosen: null,
        flagged: false,
      });
    }
  }
  return shuffle(drawn, random);
}

export function isCorrect(item: ExamItem): boolean {
  return item.chosen !== null && item.options[item.chosen] === item.question.answer;
}

export function scoreExam(items: ExamItem[]): ExamScore {
  const byTopic: Map<string, TopicScore> = new Map<string, TopicScore>();
  let correct: number = 0;
  for (const item of items) {
    const score: TopicScore = byTopic.get(item.topic.id) ?? { topic: item.topic, correct: 0, total: 0 };
    score.total++;
    if (isCorrect(item)) {
      score.correct++;
      correct++;
    }
    byTopic.set(item.topic.id, score);
  }
  const grade: number = items.length === 0 ? 0 : (correct / items.length) * 10;
  return {
    correct,
    total: items.length,
    grade,
    passed: grade >= PASSING_GRADE,
    byTopic: [...byTopic.values()].sort((a: TopicScore, b: TopicScore) => a.topic.number - b.topic.number),
  };
}
