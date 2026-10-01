/** Short status message shown at the bottom of the page. */
export class Toast {
  private static element: HTMLElement | null = null;
  private static timer: number | null = null;

  public static show(text: string): void {
    if (Toast.element === null) {
      Toast.element = document.createElement('div');
      Toast.element.className = 'toast';
      Toast.element.setAttribute('role', 'status');
      document.body.appendChild(Toast.element);
    }
    const element: HTMLElement = Toast.element;
    element.textContent = text;
    element.classList.add('visible');
    if (Toast.timer !== null) window.clearTimeout(Toast.timer);
    Toast.timer = window.setTimeout(() => element.classList.remove('visible'), 2600);
  }
}
