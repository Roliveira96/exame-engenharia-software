import type { Screen } from './Screen';
import { MenuScreen } from './MenuScreen';
import { TopicScreen } from './TopicScreen';
import { ExamScreen } from './ExamScreen';
import { FlashcardScreen } from './FlashcardScreen';
import { TopicCatalog } from '../content/TopicCatalog';
import type { Topic } from '../content/Topic';

/** Switches between menu, topics, exam and flashcards based on the address (#/agile, #/exam...). */
export class Application {
  private readonly root: HTMLElement;
  private readonly catalog: TopicCatalog = new TopicCatalog();
  private currentScreen: Screen | null = null;
  private currentHash: string = window.location.hash;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public start(): void {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  private navigate(): void {
    if (window.location.hash === this.currentHash && this.currentScreen !== null) return;
    if (this.currentScreen?.canLeave !== undefined && !this.currentScreen.canLeave()) {
      // Cancels the navigation by restoring the previous route.
      window.history.replaceState(null, '', this.currentHash || '#/');
      return;
    }
    this.currentHash = window.location.hash;

    const [route, argument]: string[] = window.location.hash.replace('#/', '').split('/');
    if (route === 'exam') {
      this.show(new ExamScreen(this.catalog));
      return;
    }
    if (route === 'flashcards') {
      this.show(new FlashcardScreen(this.catalog, argument ?? null));
      return;
    }
    const topic: Topic | undefined = this.catalog.get(route);
    this.show(topic !== undefined ? new TopicScreen(topic, this.catalog) : new MenuScreen(this.catalog));
  }

  private show(screen: Screen): void {
    this.currentScreen?.unmount();
    this.currentScreen = screen;
    this.root.innerHTML = '';
    screen.mount(this.root);
    window.scrollTo(0, 0);
  }
}
