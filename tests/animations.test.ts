import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Keeps the animations cheap. Anything that runs forever, or on every frame of a transition, must only
 * use transform and opacity: those are handled by the compositor and never repaint or re-layout the page.
 * The numbers behind these rules come from scripts/measure_performance.js.
 */
const STYLES_DIR: string = join(process.cwd(), 'src', 'styles');
const COMPOSITOR_PROPERTIES: Set<string> = new Set<string>(['transform', 'opacity']);
const LAYOUT_PROPERTIES: string[] = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin', 'padding'];

const files: Array<{ name: string; css: string }> = readdirSync(STYLES_DIR)
  .filter((name: string) => name.endsWith('.css'))
  .map((name: string) => ({ name, css: readFileSync(join(STYLES_DIR, name), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') }));
const allCss: string = files.map((file) => file.css).join('\n');

/** Properties animated by each @keyframes block. */
function keyframeProperties(css: string): Map<string, Set<string>> {
  const result: Map<string, Set<string>> = new Map<string, Set<string>>();
  const blocks: RegExp = /@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*)[^{}]*\}/g;
  for (const match of css.matchAll(blocks)) {
    const properties: Set<string> = new Set<string>();
    for (const declaration of match[2].matchAll(/([\w-]+)\s*:/g)) properties.add(declaration[1]);
    result.set(match[1], properties);
  }
  return result;
}

const keyframes: Map<string, Set<string>> = keyframeProperties(allCss);

describe('animation cost', () => {
  it('finds the stylesheets and their keyframes', () => {
    expect(files.length).toBeGreaterThanOrEqual(5);
    expect(keyframes.size).toBeGreaterThan(10);
  });

  it.each(files)('$name has no blur, glow filter or backdrop filter', ({ css }) => {
    expect(css).not.toMatch(/backdrop-filter/);
    expect(css).not.toMatch(/filter\s*:[^;]*(blur|drop-shadow)/);
  });

  it.each(files)('$name only loops animations that the compositor can run', ({ css }) => {
    for (const match of css.matchAll(/animation\s*:([^;}]*infinite[^;}]*)/g)) {
      const name: string | undefined = match[1].trim().split(/\s+/).find((word: string) => keyframes.has(word));
      expect(name, match[0]).toBeDefined();
      for (const property of keyframes.get(name as string) ?? []) {
        expect(COMPOSITOR_PROPERTIES.has(property), name + ' animates ' + property).toBe(true);
      }
    }
  });

  it.each(files)('$name never transitions a layout property', ({ css }) => {
    for (const match of css.matchAll(/transition\s*:([^;}]*)/g)) {
      const animated: string[] = match[1].split(',').map((part: string) => part.trim().split(/\s+/)[0]);
      for (const property of animated) {
        expect(LAYOUT_PROPERTIES, 'transition on ' + property).not.toContain(property);
      }
    }
  });

  it('does not animate layout properties inside keyframes', () => {
    for (const [name, properties] of keyframes) {
      for (const property of properties) {
        expect(LAYOUT_PROPERTIES, name + ' animates ' + property).not.toContain(property);
      }
    }
  });
});
