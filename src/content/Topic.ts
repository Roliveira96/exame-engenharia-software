/** Shared content model: every study topic is plain data rendered by the screens. */

export type Difficulty = 'easy' | 'medium' | 'hard';

/** A study card: one concept explained, with optional exam tip and a jump into the lab. */
export interface Lesson {
  id: string;
  icon: string;
  title: string;
  /** HTML body. */
  body: string;
  /** Highlights the classic exam trap for this concept. */
  examTip?: string;
  /** Short memory aid. */
  mnemonic?: string;
  /** Opens the lab panel that shows this concept in motion ("panel" or "panel:argument"). */
  labCue?: { label: string; cue: string };
}

/** Multiple-choice question. Options are shuffled at render time, so no index is stored. */
export interface ChoiceQuestion {
  id: string;
  difficulty: Difficulty;
  prompt: string;
  answer: string;
  distractors: string[];
  explanation: string;
}

/** Written question with a model answer the student checks against. */
export interface OpenQuestion {
  id: string;
  prompt: string;
  /** HTML model answer. */
  modelAnswer: string;
  /** What a full-mark answer must mention. */
  keyPoints: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface CheatRow {
  term: string;
  definition: string;
}

export interface Topic {
  id: string;
  number: number;
  /** Unit of the official course plan this topic belongs to (1..4). */
  unit: number;
  title: string;
  subtitle: string;
  icon: string;
  /** CSS custom property holding the topic color (e.g. "--c-agile"). */
  color: string;
  summary: string;
  tags: string[];
  lessons: Lesson[];
  questions: ChoiceQuestion[];
  openQuestions: OpenQuestion[];
  flashcards: Flashcard[];
  cheatSheet: CheatRow[];
}
