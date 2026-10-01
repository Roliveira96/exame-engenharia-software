import { describe, expect, it } from 'vitest';
import { TopicCatalog } from '../src/content/TopicCatalog';
import type { ChoiceQuestion, Topic } from '../src/content/Topic';
import { units } from '../src/content/course';
import { LabFactory } from '../src/labs/LabFactory';
import * as introductionLab from '../src/content/labs/introductionLab';
import * as lifecyclesLab from '../src/content/labs/lifecyclesLab';
import * as agileLab from '../src/content/labs/agileLab';
import * as requirementsLab from '../src/content/labs/requirementsLab';
import * as estimationLab from '../src/content/labs/estimationLab';
import * as qualityLab from '../src/content/labs/qualityLab';
import * as testingLab from '../src/content/labs/testingLab';
import * as evolutionLab from '../src/content/labs/evolutionLab';

const topics: Topic[] = new TopicCatalog().list();

const labData: Record<string, Record<string, unknown>> = {
  introduction: introductionLab,
  lifecycles: lifecyclesLab,
  agile: agileLab,
  requirements: requirementsLab,
  estimation: estimationLab,
  quality: qualityLab,
  testing: testingLab,
  evolution: evolutionLab,
};

/** Ids of the selectable entries (models, sets, strategies...) of the panel config with the given id. */
function cueTargets(topicId: string, panelId: string): string[] {
  const config = Object.values(labData[topicId]).find(
    (value: unknown) => typeof value === 'object' && value !== null && (value as { id?: string }).id === panelId,
  ) as Record<string, unknown> | undefined;
  if (config === undefined) return [];
  const targets: string[] = [];
  for (const value of Object.values(config)) {
    if (!Array.isArray(value)) continue;
    for (const entry of value) {
      if (typeof entry === 'object' && entry !== null && typeof (entry as { id?: unknown }).id === 'string') {
        targets.push((entry as { id: string }).id);
      }
    }
  }
  return targets;
}

describe('course structure', () => {
  it('covers the four units of the official plan with eight topics in order', () => {
    expect(topics).toHaveLength(8);
    expect(topics.map((topic: Topic) => topic.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    for (const unit of units) {
      expect(topics.filter((topic: Topic) => topic.unit === unit.number).length).toBe(2);
    }
  });

  it('uses unique ids across the whole material', () => {
    const ids: string[] = [];
    for (const topic of topics) {
      ids.push(topic.id);
      ids.push(...topic.lessons.map((lesson) => lesson.id));
      ids.push(...topic.questions.map((question) => question.id));
      ids.push(...topic.openQuestions.map((question) => question.id));
      ids.push(...topic.flashcards.map((card) => card.id));
    }
    expect(new Set<string>(ids).size).toBe(ids.length);
  });
});

describe.each(topics)('topic $id', (topic: Topic) => {
  it('has enough study material', () => {
    expect(topic.lessons.length).toBeGreaterThanOrEqual(7);
    expect(topic.questions.length).toBeGreaterThanOrEqual(14);
    expect(topic.openQuestions.length).toBeGreaterThanOrEqual(4);
    expect(topic.flashcards.length).toBeGreaterThanOrEqual(12);
    expect(topic.cheatSheet.length).toBeGreaterThanOrEqual(8);
  });

  it('mixes easy, medium and hard questions', () => {
    for (const difficulty of ['easy', 'medium', 'hard']) {
      expect(topic.questions.filter((question: ChoiceQuestion) => question.difficulty === difficulty).length).toBeGreaterThanOrEqual(2);
    }
  });

  it.each(topic.questions)('question $id is well formed', (question: ChoiceQuestion) => {
    expect(question.prompt.trim()).not.toBe('');
    expect(question.answer.trim()).not.toBe('');
    expect(question.explanation.trim()).not.toBe('');
    expect(question.distractors).toHaveLength(3);
    const options: string[] = [question.answer, ...question.distractors];
    expect(new Set<string>(options).size).toBe(4);
  });

  it('has written questions with a model answer and key points', () => {
    for (const question of topic.openQuestions) {
      expect(question.modelAnswer.trim()).not.toBe('');
      expect(question.keyPoints.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('points every lesson cue to a panel and entry that exist in its lab', () => {
    const lab = LabFactory.create(topic.id);
    expect(lab).not.toBeNull();
    const panelIds: string[] = lab?.panelIds() ?? [];
    expect(new Set<string>(panelIds).size).toBe(panelIds.length);
    for (const lesson of topic.lessons) {
      if (lesson.labCue === undefined) continue;
      const [panelId, argument]: string[] = lesson.labCue.cue.split(':');
      expect(panelIds, lesson.id).toContain(panelId);
      if (argument !== undefined) expect(cueTargets(topic.id, panelId), lesson.id).toContain(argument);
    }
  });
});
