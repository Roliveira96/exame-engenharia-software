import type { Topic } from '../content/Topic';

export type OpenResult = 'ok' | 'review';

/** One finished mock exam, kept so the menu can show the history. */
export interface ExamRecord {
  date: string;
  modeId: string;
  total: number;
  correct: number;
  seconds: number;
}

export interface TopicProgress {
  done: number;
  total: number;
  ratio: number;
}

interface ProgressData {
  lessons: Record<string, boolean>;
  questions: Record<string, boolean>;
  open: Record<string, OpenResult>;
  flashcards: Record<string, boolean>;
  exams: ExamRecord[];
}

const STORAGE_KEY: string = 'software-engineering-exam-progress-v1';
const MAX_EXAM_HISTORY: number = 20;

function emptyData(): ProgressData {
  return { lessons: {}, questions: {}, open: {}, flashcards: {}, exams: [] };
}

/** Study progress persisted in localStorage; everything degrades to memory if storage is blocked. */
export class ProgressStore {
  public static readonly shared: ProgressStore = new ProgressStore();

  private data: ProgressData = emptyData();

  constructor() {
    this.load();
  }

  public isLessonDone(id: string): boolean {
    return this.data.lessons[id] === true;
  }

  public setLessonDone(id: string, done: boolean): void {
    if (done) this.data.lessons[id] = true;
    else delete this.data.lessons[id];
    this.save();
  }

  /** Undefined while the question was never answered. */
  public questionResult(id: string): boolean | undefined {
    return this.data.questions[id];
  }

  public recordQuestion(id: string, correct: boolean): void {
    this.data.questions[id] = correct;
    this.save();
  }

  public openResult(id: string): OpenResult | undefined {
    return this.data.open[id];
  }

  public recordOpen(id: string, result: OpenResult): void {
    this.data.open[id] = result;
    this.save();
  }

  public isFlashcardKnown(id: string): boolean {
    return this.data.flashcards[id] === true;
  }

  public setFlashcardKnown(id: string, known: boolean): void {
    if (known) this.data.flashcards[id] = true;
    else delete this.data.flashcards[id];
    this.save();
  }

  public topicProgress(topic: Topic): TopicProgress {
    let done: number = 0;
    for (const lesson of topic.lessons) if (this.isLessonDone(lesson.id)) done++;
    for (const question of topic.questions) if (this.questionResult(question.id) === true) done++;
    for (const open of topic.openQuestions) if (this.openResult(open.id) === 'ok') done++;
    const total: number = topic.lessons.length + topic.questions.length + topic.openQuestions.length;
    return { done, total, ratio: total === 0 ? 0 : done / total };
  }

  public overallProgress(topics: Topic[]): TopicProgress {
    let done: number = 0;
    let total: number = 0;
    for (const topic of topics) {
      const progress: TopicProgress = this.topicProgress(topic);
      done += progress.done;
      total += progress.total;
    }
    return { done, total, ratio: total === 0 ? 0 : done / total };
  }

  public addExam(record: ExamRecord): void {
    this.data.exams.unshift(record);
    this.data.exams = this.data.exams.slice(0, MAX_EXAM_HISTORY);
    this.save();
  }

  public exams(): ExamRecord[] {
    return [...this.data.exams];
  }

  public reset(): void {
    this.data = emptyData();
    this.save();
  }

  private load(): void {
    try {
      const raw: string | null = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) this.data = { ...emptyData(), ...(JSON.parse(raw) as Partial<ProgressData>) };
    } catch {
      this.data = emptyData();
    }
  }

  private save(): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // Storage unavailable (private window): progress simply lives for this visit.
    }
  }
}
