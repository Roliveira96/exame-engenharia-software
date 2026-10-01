import type { Screen } from './Screen';
import type { Topic } from '../content/Topic';
import type { TopicCatalog } from '../content/TopicCatalog';
import { Author } from './Author';
import { CheatSheet } from './CheatSheet';
import { Modal } from './Modal';
import { ProgressStore } from './ProgressStore';
import type { ExamRecord, TopicProgress } from './ProgressStore';
import { Toast } from './Toast';
import { formatNumber, query } from './html';
import { T } from '../content/uiText';
import { author, bibliography, professor, units } from '../content/course';

const RING_RADIUS: number = 17;
const RING_LENGTH: number = 2 * Math.PI * RING_RADIUS;

/** Cover page: the syllabus units, the topic cards and the shortcuts to exam and flashcards. */
export class MenuScreen implements Screen {
  private readonly catalog: TopicCatalog;
  private readonly progress: ProgressStore = ProgressStore.shared;
  private modal: Modal | null = null;

  constructor(catalog: TopicCatalog) {
    this.catalog = catalog;
  }

  public mount(root: HTMLElement): void {
    const topics: Topic[] = this.catalog.list();
    const overall: TopicProgress = this.progress.overallProgress(topics);
    let cardIndex: number = 0;
    const unitSections: string = units
      .map((unit) => {
        const cards: string = this.catalog.byUnit(unit.number).map((topic: Topic) => this.card(topic, cardIndex++)).join('');
        if (cards === '') return '';
        return '<section class="unit">' +
          '<header class="unit-header"><span class="unit-number">' + T.menu.unit(unit.number) + '</span>' +
          '<div><h2>' + unit.syllabus + '</h2><p>' + unit.detail + '</p></div></header>' +
          '<nav class="menu-cards">' + cards + '</nav></section>';
      })
      .join('');
    const how: string = T.menu.how.map((text: string, index: number) => '<div><b>' + (index + 1) + '</b><span>' + text + '</span></div>').join('');
    const books = (items: string[]): string => items.map((item: string) => '<li>' + item + '</li>').join('');

    root.innerHTML =
      '<div class="menu">' +
      '  <div class="menu-backdrop" aria-hidden="true"><i></i><i></i><i></i>' + this.orbit() + '</div>' +
      '  <header class="menu-header">' +
      '    <div class="institution-box">' +
      '      <img src="/utfpr-logo.svg" alt="UTFPR" class="logo-utfpr" />' +
      '      <div class="institution-divider"></div>' +
      '      <img src="/tsi.png" alt="TSI UTFPR" class="logo-tsi" />' +
      '      <div class="institution-divider"></div>' +
      '      <div class="institution-names"><span class="institution-university">' + T.common.university + '</span>' +
      '        <span class="institution-campus">' + T.common.course + '</span></div>' +
      '    </div>' +
      '    <span class="menu-seal">' + T.menu.seal + '</span>' +
      '    <h1>' + T.menu.titleStart + ' <span class="gradient-text">' + T.menu.titleHighlight + '</span></h1>' +
      '    <p>' + T.menu.lead + '</p>' +
      '    <div class="menu-buttons">' +
      '      <a class="primary-button" href="#/exam">' + T.menu.examButton + '</a>' +
      '      <a class="secondary-button" href="#/flashcards">' + T.menu.flashcardsButton + '</a>' +
      '      <button class="secondary-button" data-action="cheat">' + T.menu.cheatButton + '</button>' +
      '    </div>' +
      '    <div class="overall-progress"><div class="overall-labels"><span>' + T.menu.overallLabel + '</span>' +
      '      <b>' + T.menu.overall(overall.done, overall.total) + '</b></div>' +
      '      <div class="progress-bar"><i style="--ratio:' + overall.ratio + '"></i></div></div>' +
      '  </header>' +
      unitSections +
      '  <a class="exam-banner" href="#/exam"><span class="exam-banner-icon">📝</span>' +
      '    <div><h2>' + T.menu.examCardTitle + '</h2><p>' + T.menu.examCardText + '</p></div>' +
      '    <div class="exam-banner-side"><span>' + this.bestExam() + '</span><b>' + T.menu.examCardAction + '</b></div></a>' +
      '  <section class="menu-how">' + how + '</section>' +
      '  <div class="people">' + new Author(author, T.menu.authorCaption, T.menu.authorPhotoAlt).renderHtml() +
      '    <section class="professor"><div class="professor-monogram" aria-hidden="true">' + professor.monogram + '</div><div>' +
      '      <span class="author-caption">' + T.menu.professorCaption + '</span><h2>' + professor.name + '</h2>' +
      '      <p class="professor-subject">' + professor.subject + '</p>' +
      '      <p class="professor-note">' + professor.note + '</p></div></section>' +
      '  </div>' +
      '  <details class="bibliography"><summary>' + T.menu.bibliographyTitle + '</summary>' +
      '    <h4>' + T.menu.bibliographyBasic + '</h4><ul>' + books(bibliography.basic) + '</ul>' +
      '    <h4>' + T.menu.bibliographyExtra + '</h4><ul>' + books(bibliography.extra) + '</ul></details>' +
      '  <button class="link-button" data-action="reset">' + T.menu.reset + '</button>' +
      '</div>';

    this.modal = new Modal(T.common.close);
    query(root, '[data-action="cheat"]').addEventListener('click', () => {
      this.modal?.open(T.menu.cheatTitle, CheatSheet.html(topics));
    });
    query(root, '[data-action="reset"]').addEventListener('click', () => {
      if (!window.confirm(T.menu.resetConfirm)) return;
      this.progress.reset();
      Toast.show(T.menu.resetDone);
      this.unmount();
      this.mount(root);
    });
  }

  public unmount(): void {
    this.modal?.destroy();
    this.modal = null;
  }

  private card(topic: Topic, index: number): string {
    const progress: TopicProgress = this.progress.topicProgress(topic);
    const tags: string = topic.tags.map((tag: string) => '<code>' + tag + '</code>').join(' ');
    const number: string = String(topic.number).padStart(2, '0');
    return '<a class="card" href="#/' + topic.id + '" style="--card-color: var(' + topic.color + ');--i:' + index + '">' +
      '<span class="card-number">' + number + '</span>' +
      '<span class="card-icon">' + topic.icon + '</span>' +
      '<h3>' + topic.title + '</h3>' +
      '<p>' + topic.summary + '</p>' +
      '<div class="card-tags">' + tags + '</div>' +
      '<div class="card-footer"><span class="card-ring">' + this.ring(progress.ratio) + '<small>' +
      T.menu.cardCounts(topic.lessons.length, topic.questions.length + topic.openQuestions.length) + '</small></span>' +
      '<span class="card-open">' + T.menu.study + '</span></div></a>';
  }

  private ring(ratio: number): string {
    const offset: number = RING_LENGTH * (1 - ratio);
    return '<svg class="ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="' + RING_RADIUS + '" class="ring-track"></circle>' +
      '<circle cx="22" cy="22" r="' + RING_RADIUS + '" class="ring-value" stroke-dasharray="' + RING_LENGTH.toFixed(2) + '" stroke-dashoffset="' +
      offset.toFixed(2) + '"></circle><text x="22" y="22" text-anchor="middle" dominant-baseline="central">' + Math.round(ratio * 100) + '%</text></svg>';
  }

  private bestExam(): string {
    const exams: ExamRecord[] = this.progress.exams();
    if (exams.length === 0) return T.menu.examNone;
    const best: number = Math.max(...exams.map((exam: ExamRecord) => (exam.correct / exam.total) * 10));
    return T.menu.examBest(formatNumber(best));
  }

  /** Decorative lifecycle orbit drawn behind the title. */
  private orbit(): string {
    return '<svg class="menu-orbit" viewBox="0 0 600 600">' +
      '<circle cx="300" cy="300" r="270" class="orbit-ring slow"></circle>' +
      '<circle cx="300" cy="300" r="200" class="orbit-ring reverse"></circle>' +
      '<circle cx="300" cy="300" r="130" class="orbit-ring"></circle>' +
      '<g class="orbit-dots slow"><circle cx="300" cy="30" r="6"></circle><circle cx="570" cy="300" r="4"></circle><circle cx="300" cy="570" r="5"></circle></g>' +
      '<g class="orbit-dots reverse"><circle cx="300" cy="100" r="5"></circle><circle cx="100" cy="300" r="4"></circle></g>' +
      '</svg>';
  }
}
