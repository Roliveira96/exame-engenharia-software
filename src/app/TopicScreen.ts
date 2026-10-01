import type { Screen } from './Screen';
import type { ChoiceQuestion, Flashcard, Lesson, OpenQuestion, Topic } from '../content/Topic';
import type { TopicCatalog } from '../content/TopicCatalog';
import type { Lab } from '../labs/Lab';
import { LabFactory } from '../labs/LabFactory';
import { ProgressStore } from './ProgressStore';
import type { OpenResult, TopicProgress } from './ProgressStore';
import { query, queryAll, shuffle } from './html';
import { T } from '../content/uiText';

type StudyTab = 'lessons' | 'questions' | 'open' | 'flashcards';

const OPTION_LETTERS: string[] = ['A', 'B', 'C', 'D', 'E'];

/** Study screen: concepts, questions and flashcards on the left, the animated lab on the right. */
export class TopicScreen implements Screen {
  private readonly topic: Topic;
  private readonly catalog: TopicCatalog;
  private readonly progress: ProgressStore = ProgressStore.shared;
  private readonly lab: Lab | null;
  private root: HTMLElement | null = null;
  private tab: StudyTab = 'lessons';
  private observer: IntersectionObserver | null = null;

  constructor(topic: Topic, catalog: TopicCatalog) {
    this.topic = topic;
    this.catalog = catalog;
    this.lab = LabFactory.create(topic.id);
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    const topic: Topic = this.topic;
    const previous: Topic | undefined = this.catalog.previous(topic);
    const next: Topic | undefined = this.catalog.next(topic);
    const tabs: Array<[StudyTab, string, number]> = [
      ['lessons', T.topic.tabLessons, topic.lessons.length],
      ['questions', T.topic.tabQuestions, topic.questions.length],
      ['open', T.topic.tabOpen, topic.openQuestions.length],
      ['flashcards', T.topic.tabFlashcards, topic.flashcards.length],
    ];
    root.innerHTML =
      '<div class="screen topic-screen" style="--topic-color: var(' + topic.color + ')">' +
      '  <header class="screen-header">' +
      '    <a class="back-button" href="#/">' + T.common.menu + '</a>' +
      '    <div class="screen-title"><span class="screen-icon">' + topic.icon + '</span><div><h1>' + topic.title + '</h1><p>' + topic.subtitle + '</p></div></div>' +
      '    <span class="brand-utfpr"><img src="/utfpr-logo.svg" alt="UTFPR" /><span>' + T.common.campus + '</span></span>' +
      '    <div class="topic-progress"><div class="progress-bar"><i></i></div><b></b></div>' +
      '    <nav class="topic-nav">' +
      (previous === undefined ? '' : '<a class="secondary-button" href="#/' + previous.id + '" title="' + previous.title + '">' + T.topic.previous + '</a>') +
      (next === undefined ? '' : '<a class="secondary-button" href="#/' + next.id + '" title="' + next.title + '">' + T.topic.next + '</a>') +
      '    </nav>' +
      '  </header>' +
      '  <div class="topic-body' + (this.lab === null ? ' no-lab' : '') + '">' +
      '    <section class="study">' +
      '      <nav class="study-tabs">' +
      tabs.map(([id, label, count]) => '<button class="study-tab" data-tab="' + id + '">' + label + ' <span class="tab-count" data-count="' + id + '">' + count + '</span></button>').join('') +
      '      </nav>' +
      '      <div class="study-scroll"></div>' +
      '    </section>' +
      (this.lab === null ? '' : '<section class="lab-side"></section>') +
      '  </div>' +
      '</div>';
    for (const button of queryAll(root, '.study-tab')) {
      button.addEventListener('click', () => this.showTab(button.dataset.tab as StudyTab));
    }
    if (this.lab !== null) this.lab.mount(query(root, '.lab-side'));
    this.showTab('lessons');
  }

  public unmount(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.lab?.unmount();
    this.root = null;
  }

  private showTab(tab: StudyTab): void {
    if (this.root === null) return;
    this.tab = tab;
    for (const button of queryAll(this.root, '.study-tab')) {
      button.classList.toggle('active', button.dataset.tab === tab);
    }
    const scroll: HTMLElement = query(this.root, '.study-scroll');
    scroll.scrollTop = 0;
    if (tab === 'lessons') this.renderLessons(scroll);
    else if (tab === 'questions') this.renderQuestions(scroll);
    else if (tab === 'open') this.renderOpenQuestions(scroll);
    else this.renderFlashcards(scroll);
    this.refreshProgress();
    this.revealOnScroll(scroll);
  }

  // ----- Concepts -----

  private renderLessons(container: HTMLElement): void {
    const total: number = this.topic.lessons.length;
    container.innerHTML = this.topic.lessons
      .map((lesson: Lesson, index: number) => {
        const done: boolean = this.progress.isLessonDone(lesson.id);
        return '<article class="lesson reveal-item' + (done ? ' done' : '') + '" data-lesson="' + lesson.id + '">' +
          '<header><span class="lesson-icon">' + lesson.icon + '</span><h3>' + lesson.title + '</h3>' +
          '<span class="lesson-index">' + T.topic.lessonOf(index + 1, total) + '</span></header>' +
          '<div class="lesson-body">' + lesson.body + '</div>' +
          (lesson.examTip === undefined ? '' : '<aside class="callout callout-exam"><b>' + T.topic.examTip + '</b><p>' + lesson.examTip + '</p></aside>') +
          (lesson.mnemonic === undefined ? '' : '<aside class="callout callout-memo"><b>' + T.topic.mnemonic + '</b><p>' + lesson.mnemonic + '</p></aside>') +
          '<footer>' +
          (lesson.labCue === undefined || this.lab === null ? '<span></span>' :
            '<button class="cue-button" data-cue="' + lesson.labCue.cue + '">▶ ' + lesson.labCue.label + '</button>') +
          '<label class="understood"><input type="checkbox"' + (done ? ' checked' : '') + '><span>' + T.topic.understood + '</span></label>' +
          '</footer></article>';
      })
      .join('');
    for (const button of queryAll(container, '.cue-button')) {
      button.addEventListener('click', () => {
        this.lab?.cue(button.dataset.cue ?? '');
        this.root?.querySelector('.lab-side')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
    for (const article of queryAll(container, '.lesson')) {
      const checkbox: HTMLInputElement = query<HTMLInputElement>(article, 'input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        this.progress.setLessonDone(article.dataset.lesson ?? '', checkbox.checked);
        article.classList.toggle('done', checkbox.checked);
        this.refreshProgress();
      });
    }
  }

  // ----- Multiple-choice questions -----

  private renderQuestions(container: HTMLElement): void {
    container.innerHTML =
      '<div class="study-note"><b class="questions-score"></b><span>' + T.topic.questionsHint + '</span></div>' +
      this.topic.questions.map((question: ChoiceQuestion, index: number) =>
        '<article class="question reveal-item" data-question="' + question.id + '" data-index="' + index + '"></article>').join('');
    for (const article of queryAll(container, '.question')) {
      this.renderQuestion(article);
    }
  }

  private renderQuestion(article: HTMLElement): void {
    const question: ChoiceQuestion = this.topic.questions[Number(article.dataset.index)];
    const options: string[] = shuffle([question.answer, ...question.distractors]);
    const previous: boolean | undefined = this.progress.questionResult(question.id);
    article.classList.remove('answered-right', 'answered-wrong');
    article.innerHTML =
      '<header><span class="question-number">' + (Number(article.dataset.index) + 1) + '</span>' +
      '<span class="badge difficulty-' + question.difficulty + '">' + T.common.difficulty[question.difficulty] + '</span>' +
      (previous === true ? '<span class="badge badge-ok">✓</span>' : '') + '</header>' +
      '<p class="question-prompt">' + question.prompt + '</p>' +
      '<div class="options">' +
      options.map((option: string, index: number) =>
        '<button class="option" data-option="' + index + '"><b>' + OPTION_LETTERS[index] + '</b><span>' + option + '</span></button>').join('') +
      '</div><div class="question-feedback" hidden></div>';
    for (const button of queryAll<HTMLButtonElement>(article, '.option')) {
      button.addEventListener('click', () => {
        const chosen: string = options[Number(button.dataset.option)];
        const correct: boolean = chosen === question.answer;
        for (const other of queryAll<HTMLButtonElement>(article, '.option')) {
          other.disabled = true;
          if (options[Number(other.dataset.option)] === question.answer) other.classList.add('is-answer');
        }
        if (!correct) button.classList.add('is-mistake');
        article.classList.add(correct ? 'answered-right' : 'answered-wrong');
        this.progress.recordQuestion(question.id, correct);
        const feedback: HTMLElement = query(article, '.question-feedback');
        feedback.hidden = false;
        feedback.className = 'question-feedback ' + (correct ? 'right' : 'wrong');
        feedback.innerHTML = '<p><b>' + (correct ? T.topic.right : T.topic.wrong) + '</b> ' + question.explanation + '</p>' +
          '<button class="link-button">' + T.topic.retry + '</button>';
        query(feedback, '.link-button').addEventListener('click', () => this.renderQuestion(article));
        this.refreshProgress();
      });
    }
  }

  // ----- Written questions -----

  private renderOpenQuestions(container: HTMLElement): void {
    container.innerHTML =
      '<div class="study-note"><span>' + T.topic.openIntro + '</span></div>' +
      this.topic.openQuestions.map((question: OpenQuestion, index: number) => {
        const keyPoints: string = question.keyPoints
          .map((point: string) => '<label><input type="checkbox"><span>' + point + '</span></label>')
          .join('');
        return '<article class="question open-question reveal-item" data-open="' + question.id + '">' +
          '<header><span class="question-number">' + (index + 1) + '</span><span class="open-status"></span></header>' +
          '<p class="question-prompt">' + question.prompt + '</p>' +
          '<textarea rows="4" placeholder="' + T.topic.openPlaceholder + '"></textarea>' +
          '<button class="secondary-button open-reveal">' + T.topic.openReveal + '</button>' +
          '<div class="open-model" hidden><h4>' + T.topic.openModel + '</h4>' + question.modelAnswer +
          '<h4>' + T.topic.openKeyPoints + '</h4><div class="key-points">' + keyPoints + '</div>' +
          '<div class="open-grade"><button class="secondary-button grade-ok" data-grade="ok">' + T.topic.openOk + '</button>' +
          '<button class="secondary-button grade-review" data-grade="review">' + T.topic.openReview + '</button></div></div>' +
          '</article>';
      }).join('');
    for (const article of queryAll(container, '.open-question')) {
      const id: string = article.dataset.open ?? '';
      this.refreshOpenStatus(article, this.progress.openResult(id));
      query(article, '.open-reveal').addEventListener('click', () => {
        query(article, '.open-model').hidden = false;
        query(article, '.open-reveal').hidden = true;
      });
      for (const button of queryAll(article, '[data-grade]')) {
        button.addEventListener('click', () => {
          const result: OpenResult = button.dataset.grade === 'ok' ? 'ok' : 'review';
          this.progress.recordOpen(id, result);
          this.refreshOpenStatus(article, result);
          this.refreshProgress();
        });
      }
    }
  }

  private refreshOpenStatus(article: HTMLElement, result: OpenResult | undefined): void {
    const status: HTMLElement = query(article, '.open-status');
    status.className = 'open-status' + (result === undefined ? '' : ' badge ' + (result === 'ok' ? 'badge-ok' : 'badge-review'));
    status.textContent = result === undefined ? '' : result === 'ok' ? T.topic.openStatusOk : T.topic.openStatusReview;
  }

  // ----- Flashcards -----

  private renderFlashcards(container: HTMLElement): void {
    container.innerHTML =
      '<div class="study-note"><span>' + T.topic.flashHint + '</span>' +
      '<a class="link-button" href="#/flashcards/' + this.topic.id + '">' + T.topic.flashTrain + '</a></div>' +
      '<div class="flash-grid">' +
      this.topic.flashcards.map((card: Flashcard) =>
        '<button class="flip-card reveal-item"><span class="flip-inner"><span class="flip-face flip-front">' + card.front +
        '</span><span class="flip-face flip-back">' + card.back + '</span></span></button>').join('') +
      '</div>';
    for (const card of queryAll(container, '.flip-card')) {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
    }
  }

  // ----- Shared -----

  private refreshProgress(): void {
    if (this.root === null) return;
    const progress: TopicProgress = this.progress.topicProgress(this.topic);
    const percent: number = Math.round(progress.ratio * 100);
    query(this.root, '.topic-progress i').style.setProperty('--ratio', String(progress.ratio));
    query(this.root, '.topic-progress b').textContent = T.topic.progress(percent);
    const right: number = this.topic.questions.filter((question: ChoiceQuestion) => this.progress.questionResult(question.id) === true).length;
    if (this.tab === 'questions') {
      query(this.root, '.questions-score').textContent = T.topic.questionsIntro(right, this.topic.questions.length);
    }
    const lessonsDone: number = this.topic.lessons.filter((lesson: Lesson) => this.progress.isLessonDone(lesson.id)).length;
    const openDone: number = this.topic.openQuestions.filter((question: OpenQuestion) => this.progress.openResult(question.id) === 'ok').length;
    query(this.root, '[data-count="lessons"]').textContent = lessonsDone + '/' + this.topic.lessons.length;
    query(this.root, '[data-count="questions"]').textContent = right + '/' + this.topic.questions.length;
    query(this.root, '[data-count="open"]').textContent = openDone + '/' + this.topic.openQuestions.length;
  }

  /** Cards fade in as they enter the scroll area. */
  private revealOnScroll(container: HTMLElement): void {
    this.observer?.disconnect();
    const items: HTMLElement[] = queryAll(container, '.reveal-item');
    if (typeof IntersectionObserver === 'undefined') {
      for (const item of items) item.classList.add('in-view');
      return;
    }
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          this.observer?.unobserve(entry.target);
        }
      }
    }, { root: container, rootMargin: '0px 0px -8% 0px' });
    for (const item of items) this.observer.observe(item);
  }
}
