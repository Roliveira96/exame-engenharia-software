// Measures how smooth each screen and animation is: frames per second, slow frames and long tasks.
// Needs the dev server running (npm run dev) and Google Chrome installed.
// Usage: node scripts/measure_performance.js [cpuSlowdown]   (default 4 = a machine four times slower)
import puppeteer from 'puppeteer-core';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5174/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const CPU_SLOWDOWN = Number(process.argv[2] ?? 4);
const SAMPLE_MS = 3000;
const SLOW_FRAME_MS = 34; // Two missed frames in a row at 60 Hz: visible as a stutter.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Each scenario: a route plus an optional action that starts the animation being measured. */
const SCENARIOS = [
  { name: 'menu (idle backdrop)', hash: '' },
  { name: 'menu (scrolling)', hash: '', action: () => window.scrollBy({ top: 1400, behavior: 'smooth' }) },
  { name: 'topic idle', hash: '#/introduction' },
  { name: 'topic scrolling concepts', hash: '#/introduction', action: () => document.querySelector('.study-scroll').scrollBy({ top: 2500, behavior: 'smooth' }) },
  { name: 'diagram playing', hash: '#/introduction', action: () => document.querySelector('[data-step="play"]').click() },
  { name: 'spiral playing', hash: '#/lifecycles', setup: () => document.querySelector('[data-model="spiral"]').click(), action: () => document.querySelector('[data-step="play"]').click() },
  { name: 'sprint playing', hash: '#/agile', action: () => document.querySelector('[data-step="play"]').click() },
  { name: 'classifier answering', hash: '#/requirements', action: () => document.querySelector('.classifier-choice').click() },
  { name: 'function point slider', hash: '#/estimation', action: () => {
    const range = document.querySelector('.fp-range');
    let value = 0;
    const timer = setInterval(() => { value = (value + 3) % 70; range.value = String(value); range.dispatchEvent(new Event('input')); }, 50);
    setTimeout(() => clearInterval(timer), 2800);
  } },
  { name: 'quality wheel', hash: '#/quality', action: () => {
    const slices = [...document.querySelectorAll('.wheel-slice')];
    let index = 0;
    const timer = setInterval(() => slices[index++ % slices.length].dispatchEvent(new MouseEvent('click', { bubbles: true })), 400);
    setTimeout(() => clearInterval(timer), 2800);
  } },
  { name: 'cyclomatic path', hash: '#/testing', setup: () => document.querySelector('[data-panel="cyclomatic"]').click(), action: () => document.querySelector('[data-path="1"]').click() },
  { name: 'rollout timeline', hash: '#/evolution' , action: () => document.querySelector('[data-strategy="parallel"]').click() },
  { name: 'exam running', hash: '#/exam', setup: () => document.querySelector('.start-button').click() },
  { name: 'flashcard flip', hash: '#/flashcards', action: () => {
    const timer = setInterval(() => document.querySelector('.flip-card')?.click(), 700);
    setTimeout(() => clearInterval(timer), 2800);
  } },
];

/** Runs inside the page: samples requestAnimationFrame for a while and summarizes the frame times. */
function sampleFrames(durationMs, slowFrameMs) {
  return new Promise((resolve) => {
    const deltas = [];
    let longTasks = 0;
    let longTaskTime = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        longTasks++;
        longTaskTime += entry.duration;
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
    const start = performance.now();
    let last = start;
    const frame = (now) => {
      deltas.push(now - last);
      last = now;
      if (now - start < durationMs) {
        requestAnimationFrame(frame);
        return;
      }
      observer.disconnect();
      const sorted = [...deltas].sort((a, b) => a - b);
      resolve({
        fps: Math.round((deltas.length / (now - start)) * 1000),
        worstMs: Math.round(sorted[sorted.length - 1]),
        p95Ms: Math.round(sorted[Math.floor(sorted.length * 0.95)]),
        slowFrames: deltas.filter((delta) => delta > slowFrameMs).length,
        longTasks,
      });
    };
    requestAnimationFrame(frame);
  });
}

/** Adds up rendering work found in a trace: how often the page repainted and how long each stage took. */
function summarizeTrace(events) {
  const total = { Paint: 0, RasterTask: 0, Layout: 0, UpdateLayoutTree: 0 };
  let paints = 0;
  for (const event of events) {
    if (event.ph !== 'X' || !(event.name in total)) continue;
    total[event.name] += event.dur / 1000;
    if (event.name === 'Paint') paints++;
  }
  return {
    paints,
    paintMs: Math.round(total.Paint),
    rasterMs: Math.round(total.RasterTask),
    layoutMs: Math.round(total.Layout),
    styleMs: Math.round(total.UpdateLayoutTree),
  };
}

async function measure() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const rows = [];
  for (const scenario of SCENARIOS) {
    const page = await browser.newPage();
    page.on('dialog', (dialog) => dialog.accept());
    await page.goto(BASE_URL + scenario.hash, { waitUntil: 'networkidle0' });
    await wait(1500);
    if (scenario.setup) {
      await page.evaluate(scenario.setup);
      await wait(1200);
    }
    const session = await page.createCDPSession();
    await session.send('Emulation.setCPUThrottlingRate', { rate: CPU_SLOWDOWN });
    await page.tracing.start({ categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline'] });
    if (scenario.action) await page.evaluate(scenario.action);
    const result = await page.evaluate(sampleFrames, SAMPLE_MS, SLOW_FRAME_MS);
    const trace = JSON.parse(Buffer.from(await page.tracing.stop()).toString('utf8'));
    rows.push({ scenario: scenario.name, ...result, ...summarizeTrace(trace.traceEvents) });
    await page.close();
  }
  await browser.close();
  console.log('CPU slowdown: ' + CPU_SLOWDOWN + 'x, sample: ' + SAMPLE_MS + ' ms per scenario');
  console.table(rows);
}

measure().catch((error) => {
  console.error(error);
  process.exit(1);
});
