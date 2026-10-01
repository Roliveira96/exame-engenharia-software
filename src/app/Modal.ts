import { query } from './html';

/** Overlay window used for the cheat sheet and other reference material. */
export class Modal {
  private readonly backdrop: HTMLElement;
  private readonly title: HTMLElement;
  private readonly content: HTMLElement;
  private readonly onKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.close();
  };

  constructor(closeLabel: string) {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';
    this.backdrop.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true"><header><h2></h2>' +
      '<button class="close-button" aria-label="' + closeLabel + '">✕</button></header>' +
      '<div class="modal-content"></div></div>';
    this.title = query(this.backdrop, 'h2');
    this.content = query(this.backdrop, '.modal-content');
    query(this.backdrop, '.close-button').addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (event: MouseEvent) => {
      if (event.target === this.backdrop) this.close();
    });
    document.body.appendChild(this.backdrop);
  }

  public open(title: string, html: string): void {
    this.title.textContent = title;
    this.content.innerHTML = html;
    this.backdrop.classList.add('open');
    document.addEventListener('keydown', this.onKey);
  }

  public close(): void {
    this.backdrop.classList.remove('open');
    document.removeEventListener('keydown', this.onKey);
  }

  public destroy(): void {
    this.close();
    this.backdrop.remove();
  }
}
