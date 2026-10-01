// Checks that every reference link still works: asks YouTube for each video and requests each reading URL.
// Usage: node scripts/check_references.js   (needs internet access)
import { readFileSync } from 'fs';

const source = readFileSync('src/content/references.ts', 'utf8');
const videoIds = [...source.matchAll(/watch\('([\w-]{11})'\)/g)].map((match) => 'https://www.youtube.com/watch?v=' + match[1]);
const playlistIds = [...source.matchAll(/playlist\('([\w-]+)'\)/g)].map((match) => 'https://www.youtube.com/playlist?list=' + match[1]);
const readingUrls = [...source.matchAll(/url: '(https:\/\/[^']+)'/g)].map((match) => match[1]);

async function checkVideo(url) {
  const response = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(url));
  if (!response.ok) return { url, ok: false, detail: 'HTTP ' + response.status };
  const data = await response.json();
  return { url, ok: true, detail: data.author_name + ' | ' + data.title };
}

async function checkPage(url) {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return { url, ok: response.ok, detail: 'HTTP ' + response.status };
  } catch (error) {
    return { url, ok: false, detail: String(error) };
  }
}

const results = [
  ...(await Promise.all([...videoIds, ...playlistIds].map(checkVideo))),
  ...(await Promise.all([...new Set(readingUrls)].map(checkPage))),
];
for (const result of results) console.log((result.ok ? 'OK   ' : 'FAIL ') + result.url + '  ' + result.detail);
const failures = results.filter((result) => !result.ok);
console.log('\n' + (results.length - failures.length) + ' of ' + results.length + ' links working.');
if (failures.length > 0) process.exit(1);
