/** Every screen knows how to mount into a container and clean up when leaving. */
export interface Screen {
  mount(root: HTMLElement): void;
  unmount(): void;
  /** Returning false cancels the navigation (used while an exam is running). */
  canLeave?: () => boolean;
}
