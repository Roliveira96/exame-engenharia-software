import type { Screen } from './Screen';
import type { Topic } from '../content/Topic';
import type { TopicCatalog } from '../content/TopicCatalog';
import { Confetti } from './Confetti';
import { ProgressStore } from './ProgressStore';
import type { ExamRecord } from './ProgressStore';
import { Toast } from './Toast';
import { drawExam, isCorrect, scoreExam } from './examEngine';
import type { ExamItem, ExamScore, TopicScore } from './examEngine';
import { formatClock, formatNumber, query, queryAll } from './html';
import { T } from '../content/uiText';

type ExamMode = (typeof T.exam.modes)[number];
type Phase = 'hub' | 'running' | 'result';

const OPTION_LETTERS: string[] = ['A', 'B', 'C', 'D', 'E'];
const LOW_TIME_SECONDS: number = 120;
const HISTORY_ROWS: number = 5;

/** Timed mock exam: pick a size, answer without feedback, then review everything commented. */
export class ExamScreen implements Screen {
  private readonly catalog: TopicCatalog;
  private readonly progress: ProgressStore = ProgressStore.shared;
  private root: HTMLElement | null = null;
  private phase: Phase = 'hub';
  private mode: ExamMode = T.exam.modes[1];
  private selectedTopics: Set<string>;
  private items: ExamItem[] = [];
  private position: number = 0;
  private secondsLeft: number = 0;
  private secondsTotal: number = 0;
  private timer: number | null = null;
  private readonly onKey = (event: KeyboardEvent): void => this.handleKey(event);

  constructor(catalog: TopicCatalog) {
    this.catalog = catalog;
    this.selectedTopics = new Set<string>(catalog.list().map((topic: Topic) => topic.id));
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    document.addEventListener('keydown', this.onKey);
    this.renderHub();
  }

  public unmount(): void {
    this.stopTimer();
    document.removeEventListener('keydown', this.onKey);
    this.root = null;
  }

  public canLeave = (): boolean => this.phase !== 'running' || window.confirm(T.exam.quitConfirm);

  // ----- Hub -----

  private renderHub(): void {
    if (this.root === null) return;
    this.phase = 'hub';
    this.stopTimer();
    const modes: string = T.exam.modes
      .map((mode: ExamMode) =>
        '<button class="mode-card' + (mode.id === this.mode.id ? ' active' : '') + '" data-mode="' + mode.id + '">' +
        '<span class="mode-icon">' + mode.icon + '</span><b>' + mode.title + '</b>' +
        '<small>' + T.exam.modeInfo(mode.questions, mode.minutes) + '</small><p>' + mode.description + '</p></button>')
      .join('');
    const topics: string = this.catalog.list()
      .map((topic: Topic) =>
        '<label class="topic-check" style="--topic-color: var(' + topic.color + ')"><input type="checkbox" value="' + topic.id + '"' +
        (this.selectedTopics.has(topic.id) ? ' checked' : '') + '><span>' + topic.icon + ' ' + topic.title + '</span></label>')
      .join('');
    const exams: ExamRecord[] = this.progress.exams().slice(0, HISTORY_ROWS);
    const history: string = exams.length === 0 ? '<p class="muted">' + T.exam.historyEmpty + '</p>' :
      '<ul class="exam-history">' + exams.map((exam: ExamRecord) => {
        const grade: number = (exam.correct / exam.total) * 10;
        return '<li><b class="' + (grade >= 6 ? 'grade-pass' : 'grade-fail') + '">' + formatNumber(grade) + '</b><span>' +
          T.exam.historyRow(exam.correct, exam.total, formatClock(exam.seconds)) + '</span><small>' + exam.date + '</small></li>';
      }).join('') + '</ul>';
    this.root.innerHTML =
      '<div class="screen exam-screen">' +
      '  <header class="screen-header">' +
      '    <a class="back-button" href="#/">' + T.common.menu + '</a>' +
      '    <div class="screen-title"><span class="screen-icon">📝</span><div><h1>' + T.exam.title + '</h1><p>' + T.exam.subtitle + '</p></div></div>' +
      '    <span class="brand-utfpr"><img src="/utfpr-logo.svg" alt="UTFPR" /><span>' + T.common.campus + '</span></span>' +
      '  </header>' +
      '  <div class="exam-hub">' +
      '    <p class="exam-lead">' + T.exam.hubLead + '</p>' +
      '    <div class="mode-cards">' + modes + '</div>' +
      '    <section class="hub-box"><header><h3>' + T.exam.topicsTitle + '</h3>' +
      '      <button class="link-button" data-action="all">' + T.exam.selectAll + '</button></header>' +
      '      <div class="topic-checks">' + topics + '</div></section>' +
      '    <button class="primary-button start-button">' + T.exam.start + '</button>' +
      '    <section class="hub-box"><header><h3>' + T.exam.historyTitle + '</h3></header>' + history + '</section>' +
      '  </div>' +
      '</div>';
    for (const card of queryAll(this.root, '.mode-card')) {
      card.addEventListener('click', () => {
        this.mode = T.exam.modes.find((mode: ExamMode) => mode.id === card.dataset.mode) ?? this.mode;
        for (const other of queryAll(this.root as HTMLElement, '.mode-card')) other.classList.toggle('active', other === card);
      });
    }
    for (const input of queryAll<HTMLInputElement>(this.root, '.topic-check input')) {
      input.addEventListener('change', () => {
        if (input.checked) this.selectedTopics.add(input.value);
        else this.selectedTopics.delete(input.value);
      });
    }
    query(this.root, '[data-action="all"]').addEventListener('click', () => {
      for (const input of queryAll<HTMLInputElement>(this.root as HTMLElement, '.topic-check input')) {
        input.checked = true;
        this.selectedTopics.add(input.value);
      }
    });
    query(this.root, '.start-button').addEventListener('click', () => this.start());
  }

  // ----- Running -----

  private start(): void {
    const topics: Topic[] = this.catalog.list().filter((topic: Topic) => this.selectedTopics.has(topic.id));
    if (topics.length === 0) {
      Toast.show(T.exam.needTopic);
      return;
    }
    this.items = drawExam(topics, this.mode.questions);
    this.position = 0;
    // Keeps the pace of the chosen mode when the selected topics have fewer questions than it asks for.
    this.secondsTotal = Math.ceil((this.mode.minutes * 60 * this.items.length) / this.mode.questions);
    this.secondsLeft = this.secondsTotal;
    this.phase = 'running';
    this.renderRunning();
    this.timer = window.setInterval(() => this.tick(), 1000);
  }

  private renderRunning(): void {
    if (this.root === null) return;
    this.root.innerHTML =
      '<div class="screen exam-screen running">' +
      '  <header class="screen-header">' +
      '    <button class="back-button" data-action="quit">' + T.exam.quit + '</button>' +
      '    <div class="screen-title"><span class="screen-icon">' + this.mode.icon + '</span><div><h1>' + T.exam.title + ' · ' + this.mode.title + '</h1>' +
      '      <p class="exam-answered"></p></div></div>' +
      '    <span class="brand-utfpr"><img src="/utfpr-logo.svg" alt="UTFPR" /><span>' + T.common.campus + '</span></span>' +
      '    <div class="exam-clock"><span>⏱️</span><b></b></div>' +
      '    <button class="primary-button" data-action="finish">' + T.exam.finish + '</button>' +
      '  </header>' +
      '  <div class="exam-time-track"><i></i></div>' +
      '  <div class="exam-body">' +
      '    <nav class="exam-grid"></nav>' +
      '    <div class="exam-question"></div>' +
      '  </div>' +
      '</div>';
    query(this.root, '[data-action="quit"]').addEventListener('click', () => {
      window.location.hash = '#/';
    });
    query(this.root, '[data-action="finish"]').addEventListener('click', () => this.askToFinish());
    this.renderQuestion();
    this.refreshClock();
  }

  private renderQuestion(): void {
    if (this.root === null) return;
    const item: ExamItem = this.items[this.position];
    const total: number = this.items.length;
    query(this.root, '.exam-grid').innerHTML = this.items
      .map((other: ExamItem, index: number) =>
        '<button class="grid-cell' + (index === this.position ? ' current' : '') + (other.chosen !== null ? ' answered' : '') +
        (other.flagged ? ' flagged' : '') + '" data-goto="' + index + '">' + (index + 1) + '</button>')
      .join('');
    for (const cell of queryAll(this.root, '.grid-cell')) {
      cell.addEventListener('click', () => this.goTo(Number(cell.dataset.goto)));
    }
    const options: string = item.options
      .map((option: string, index: number) =>
        '<button class="option' + (item.chosen === index ? ' selected' : '') + '" data-option="' + index + '"><b>' + OPTION_LETTERS[index] +
        '</b><span>' + option + '</span></button>')
      .join('');
    const card: HTMLElement = query(this.root, '.exam-question');
    card.innerHTML =
      '<article class="question exam-card" style="--topic-color: var(' + item.topic.color + ')">' +
      '<header><span class="badge">' + T.exam.questionOf(this.position + 1, total) + '</span>' +
      '<span class="badge badge-topic">' + item.topic.icon + ' ' + item.topic.title + '</span>' +
      '<span class="badge difficulty-' + item.question.difficulty + '">' + T.common.difficulty[item.question.difficulty] + '</span></header>' +
      '<p class="question-prompt">' + item.question.prompt + '</p>' +
      '<div class="options">' + options + '</div>' +
      '<footer class="exam-actions">' +
      '<button class="secondary-button" data-action="previous"' + (this.position === 0 ? ' disabled' : '') + '>' + T.exam.previous + '</button>' +
      '<button class="secondary-button flag-button' + (item.flagged ? ' active' : '') + '" data-action="flag">' + (item.flagged ? T.exam.unflag : T.exam.flag) + '</button>' +
      '<button class="secondary-button" data-action="next"' + (this.position === total - 1 ? ' disabled' : '') + '>' + T.exam.next + '</button>' +
      '</footer></article>' +
      '<p class="exam-keys">' + T.exam.keys + '</p>';
    for (const button of queryAll(card, '.option')) {
      button.addEventListener('click', () => this.choose(Number(button.dataset.option)));
    }
    query(card, '[data-action="previous"]').addEventListener('click', () => this.goTo(this.position - 1));
    query(card, '[data-action="next"]').addEventListener('click', () => this.goTo(this.position + 1));
    query(card, '[data-action="flag"]').addEventListener('click', () => {
      item.flagged = !item.flagged;
      this.renderQuestion();
    });
    const answered: number = this.items.filter((other: ExamItem) => other.chosen !== null).length;
    query(this.root, '.exam-answered').textContent = T.exam.answered(answered, total);
  }

  private choose(optionIndex: number): void {
    const item: ExamItem = this.items[this.position];
    if (optionIndex < 0 || optionIndex >= item.options.length) return;
    item.chosen = item.chosen === optionIndex ? null : optionIndex;
    this.renderQuestion();
  }

  private goTo(index: number): void {
    if (index < 0 || index >= this.items.length) return;
    this.position = index;
    this.renderQuestion();
  }

  private tick(): void {
    this.secondsLeft--;
    this.refreshClock();
    if (this.secondsLeft <= 0) {
      Toast.show(T.exam.timeUp);
      this.finish();
    }
  }

  private refreshClock(): void {
    if (this.root === null || this.phase !== 'running') return;
    const clock: HTMLElement = query(this.root, '.exam-clock');
    query(clock, 'b').textContent = formatClock(this.secondsLeft);
    clock.classList.toggle('low', this.secondsLeft <= LOW_TIME_SECONDS);
    query(this.root, '.exam-time-track i').style.width = (this.secondsLeft / this.secondsTotal) * 100 + '%';
  }

  private askToFinish(): void {
    const missing: number = this.items.filter((item: ExamItem) => item.chosen === null).length;
    if (window.confirm(T.exam.finishConfirm(missing))) this.finish();
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  // ----- Result -----

  private finish(): void {
    this.stopTimer();
    this.phase = 'result';
    const score: ExamScore = scoreExam(this.items);
    const seconds: number = this.secondsTotal - Math.max(0, this.secondsLeft);
    this.progress.addExam({
      date: new Date().toLocaleDateString('pt-BR'),
      modeId: this.mode.id,
      total: score.total,
      correct: score.correct,
      seconds,
    });
    for (const item of this.items) {
      if (item.chosen !== null) this.progress.recordQuestion(item.question.id, isCorrect(item));
    }
    this.renderResult(score, seconds);
    if (score.passed) Confetti.burst();
  }

  private renderResult(score: ExamScore, seconds: number): void {
    if (this.root === null) return;
    const topics: string = score.byTopic
      .map((entry: TopicScore) => {
        const ratio: number = entry.correct / entry.total;
        return '<li style="--topic-color: var(' + entry.topic.color + ')"><span class="topic-score-name">' + entry.topic.icon + ' ' + entry.topic.title + '</span>' +
          '<span class="progress-bar"><i style="--ratio:' + ratio + '"></i></span><b>' + entry.correct + '/' + entry.total + '</b>' +
          '<a class="link-button" href="#/' + entry.topic.id + '">' + T.exam.studyTopic + '</a></li>';
      })
      .join('');
    // Mistakes first: they are what the student needs to read.
    const ordered: ExamItem[] = [...this.items].sort((a: ExamItem, b: ExamItem) => Number(isCorrect(a)) - Number(isCorrect(b)));
    const review: string = ordered
      .map((item: ExamItem) => {
        const right: boolean = isCorrect(item);
        const chosen: string = item.chosen === null ? '<i>' + T.exam.blank + '</i>' : item.options[item.chosen];
        return '<article class="question review-item ' + (right ? 'answered-right' : 'answered-wrong') + '" style="--topic-color: var(' + item.topic.color + ')">' +
          '<header><span class="badge ' + (right ? 'badge-ok' : 'badge-review') + '">' + (right ? '✓' : '✗') + '</span>' +
          '<span class="badge badge-topic">' + item.topic.icon + ' ' + item.topic.title + '</span></header>' +
          '<p class="question-prompt">' + item.question.prompt + '</p>' +
          (right ? '' : '<p class="review-line wrong"><b>' + T.exam.yourAnswer + '</b> ' + chosen + '</p>') +
          '<p class="review-line right"><b>' + T.exam.correctAnswer + '</b> ' + item.question.answer + '</p>' +
          '<p class="review-explanation">' + item.question.explanation + '</p></article>';
      })
      .join('');
    this.root.innerHTML =
      '<div class="screen exam-screen">' +
      '  <header class="screen-header">' +
      '    <a class="back-button" href="#/">' + T.common.menu + '</a>' +
      '    <div class="screen-title"><span class="screen-icon">📝</span><div><h1>' + T.exam.title + ' · ' + this.mode.title + '</h1><p>' + T.exam.subtitle + '</p></div></div>' +
      '    <span class="brand-utfpr"><img src="/utfpr-logo.svg" alt="UTFPR" /><span>' + T.common.campus + '</span></span>' +
      '  </header>' +
      '  <div class="exam-result">' +
      '    <section class="result-hero ' + (score.passed ? 'passed' : 'failed') + '">' +
      '      <div class="score-ring big" style="--ratio:' + score.grade / 10 + '"><small>' + T.exam.grade + '</small><b>' + formatNumber(score.grade) + '</b></div>' +
      '      <div><h2>' + (score.passed ? T.exam.passed : T.exam.failed) + '</h2>' +
      '        <p>' + T.exam.resultLine(score.correct, score.total, formatClock(seconds)) + '</p>' +
      '        <p class="muted">' + T.exam.passNote + '</p>' +
      '        <div class="result-actions"><button class="primary-button" data-action="again">' + T.exam.again + '</button>' +
      '          <a class="secondary-button" href="#/">' + T.exam.backToMenu + '</a></div></div>' +
      '    </section>' +
      '    <section class="hub-box"><header><h3>' + T.exam.byTopic + '</h3></header><ul class="topic-scores">' + topics + '</ul></section>' +
      '    <section class="hub-box"><header><h3>' + T.exam.review + '</h3>' +
      '      <label class="understood"><input type="checkbox" data-action="only-wrong"><span>' + T.exam.reviewOnlyWrong + '</span></label></header>' +
      '      <div class="review-list">' + review + '</div></section>' +
      '  </div>' +
      '</div>';
    query(this.root, '[data-action="again"]').addEventListener('click', () => this.renderHub());
    const onlyWrong: HTMLInputElement = query<HTMLInputElement>(this.root, '[data-action="only-wrong"]');
    onlyWrong.addEventListener('change', () => {
      query(this.root as HTMLElement, '.review-list').classList.toggle('only-wrong', onlyWrong.checked);
    });
    window.scrollTo(0, 0);
  }

  private handleKey(event: KeyboardEvent): void {
    if (this.phase !== 'running') return;
    if (event.key === 'ArrowLeft') this.goTo(this.position - 1);
    else if (event.key === 'ArrowRight') this.goTo(this.position + 1);
    else if (/^[1-5]$/.test(event.key)) this.choose(Number(event.key) - 1);
    else if (/^[a-eA-E]$/.test(event.key)) this.choose(event.key.toUpperCase().charCodeAt(0) - 65);
  }
}
