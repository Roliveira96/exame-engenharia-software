// Captures the README screenshots. Needs the dev server running (npm run dev) and Google Chrome installed.
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5174/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const OUTPUT_DIR = path.resolve('docs/screenshots');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Each shot: file name, route and an optional script that puts the page in the state worth showing. */
const SHOTS = [
  { file: '01-menu.png', hash: '' },
  {
    file: '02-lifecycles-spiral.png',
    hash: '#/lifecycles',
    setup: () => {
      document.querySelector('[data-model="spiral"]').click();
      for (let i = 0; i < 5; i++) document.querySelector('[data-step="next"]').click();
    },
  },
  {
    file: '03-agile-sprint.png',
    hash: '#/agile',
    setup: () => {
      for (let i = 0; i < 4; i++) document.querySelector('[data-step="next"]').click();
    },
  },
  {
    file: '04-requirements-questions.png',
    hash: '#/requirements',
    setup: () => {
      document.querySelector('[data-tab="questions"]').click();
      document.querySelector('.option').click();
      document.querySelector('[data-panel="process"]').click();
      document.querySelector('[data-model="usecase"]').click();
      for (let i = 0; i < 3; i++) document.querySelector('[data-step="next"]').click();
    },
  },
  { file: '05-estimation-function-points.png', hash: '#/estimation' },
  {
    file: '06-testing-cyclomatic.png',
    hash: '#/testing',
    setup: () => {
      document.querySelector('[data-panel="cyclomatic"]').click();
      document.querySelector('[data-program="shipping"]').click();
      document.querySelector('[data-path="2"]').click();
    },
  },
  {
    file: '07-quality-wheel.png',
    hash: '#/quality',
    setup: () => {
      document.querySelector('[data-slice="reliability"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    },
  },
  {
    file: '08-exam-running.png',
    hash: '#/exam',
    setup: () => {
      document.querySelector('.start-button').click();
      for (let i = 0; i < 3; i++) {
        document.querySelectorAll('.option')[i % 4].click();
        document.querySelector('[data-action="next"]').click();
      }
    },
  },
  {
    file: '09-exam-result.png',
    hash: '#/exam',
    setup: () => {
      document.querySelector('[data-mode="quick"]').click();
      document.querySelector('.start-button').click();
      for (let i = 0; i < 10; i++) {
        document.querySelectorAll('.option')[i % 4].click();
        const next = document.querySelector('[data-action="next"]');
        if (!next.disabled) next.click();
      }
      document.querySelector('[data-action="finish"]').click();
    },
  },
  {
    file: '10-flashcards.png',
    hash: '#/flashcards',
    setup: () => document.querySelector('.flip-card').click(),
  },
  {
    file: '11-concept-curiosity.png',
    hash: '#/lifecycles',
    setup: () => document.querySelectorAll('.callout-fun')[1].scrollIntoView({ block: 'end' }),
    settle: 2600,
  },
  {
    file: '12-written-question.png',
    hash: '#/requirements',
    setup: () => {
      document.querySelector('[data-tab="open"]').click();
      document.querySelector('.open-reveal').click();
      document.querySelector('[data-panel="techniques"]').click();
    },
  },
  {
    file: '13-planning-poker.png',
    hash: '#/estimation',
    setup: () => {
      document.querySelector('[data-panel="poker"]').click();
      document.querySelector('[data-points="8"]').click();
      document.querySelector('[data-action="reveal"]').click();
    },
  },
  {
    file: '14-deployment-strategies.png',
    hash: '#/evolution',
    setup: () => document.querySelector('[data-strategy="phased"]').click(),
    settle: 3600,
  },
  {
    file: '16-references.png',
    hash: '',
    setup: () => document.querySelector('.references').scrollIntoView({ block: 'start' }),
  },
  {
    file: '15-boundary-values.png',
    hash: '#/testing',
    setup: () => {
      document.querySelector('[data-scenario="grade"]').click();
      document.querySelector('[data-action="suggest"]').click();
    },
  },
];

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  });
  for (const shot of SHOTS) {
    console.log('Capturing ' + shot.file);
    const page = await browser.newPage();
    page.on('dialog', (dialog) => dialog.accept());
    // Every shot starts from a clean progress so the pictures do not depend on the order they are taken.
    await page.evaluateOnNewDocument(() => window.localStorage.clear());
    await page.goto(BASE_URL + shot.hash, { waitUntil: 'networkidle0' });
    await wait(1200);
    if (shot.setup) {
      await page.evaluate(shot.setup);
      await wait(shot.settle ?? 1800);
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, shot.file) });
    await page.close();
  }
  await browser.close();
  console.log('Screenshots saved to ' + OUTPUT_DIR);
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
