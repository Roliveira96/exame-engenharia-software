import { describe, expect, it } from 'vitest';
import { TopicCatalog } from '../src/content/TopicCatalog';
import { bookGroups, videoGroups, videosForTopic } from '../src/content/references';
import type { BookReference, VideoReference } from '../src/content/references';

const allBooks: BookReference[] = bookGroups.flatMap((group) => group.books);
const allVideos: VideoReference[] = videoGroups.flatMap((group) => group.videos);

describe('references', () => {
  it('keeps the whole official bibliography of the course plan', () => {
    expect(bookGroups[0].books).toHaveLength(3);
    expect(bookGroups[1].books).toHaveLength(5);
    for (const author of ['WAZLAWICK', 'PRESSMAN', 'SOMMERVILLE', 'COHN', 'LARMAN', 'BEZERRA', 'FOWLER', 'TELES']) {
      expect(allBooks.some((book: BookReference) => book.citation.startsWith(author)), author).toBe(true);
    }
  });

  it('adds books beyond the course plan', () => {
    expect(allBooks.length).toBeGreaterThanOrEqual(25);
    expect(new Set<string>(allBooks.map((book: BookReference) => book.citation)).size).toBe(allBooks.length);
  });

  it('only links to secure addresses', () => {
    for (const book of allBooks) {
      if (book.url !== undefined) expect(book.url).toMatch(/^https:\/\/[\w.-]+\//);
    }
  });

  it('describes every video and links it to YouTube', () => {
    expect(new Set<string>(allVideos.map((video: VideoReference) => video.url)).size).toBe(allVideos.length);
    for (const video of allVideos) {
      expect(video.url).toMatch(/^https:\/\/www\.youtube\.com\/(watch\?v=[\w-]{11}|playlist\?list=[\w-]+)$/);
      expect(video.title.trim()).not.toBe('');
      expect(video.channel.trim()).not.toBe('');
      expect(video.note.trim()).not.toBe('');
    }
  });

  it('has videos for the course as a whole and for every topic', () => {
    expect(videosForTopic('course').length).toBeGreaterThanOrEqual(3);
    for (const topic of new TopicCatalog().list()) {
      expect(videosForTopic(topic.id).length, topic.id).toBeGreaterThanOrEqual(3);
    }
    const topicIds: string[] = ['course', ...new TopicCatalog().list().map((topic) => topic.id)];
    for (const group of videoGroups) expect(topicIds).toContain(group.topic);
  });
});
