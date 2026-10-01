import type { CheatRow, Topic } from '../content/Topic';

/** Builds the quick-reference tables shown in the cheat sheet window. */
export class CheatSheet {
  public static html(topics: Topic[]): string {
    return topics
      .map((topic: Topic) => {
        const rows: string = topic.cheatSheet
          .map((row: CheatRow) => '<tr><td><b>' + row.term + '</b></td><td>' + row.definition + '</td></tr>')
          .join('');
        return '<h3 style="color:var(' + topic.color + ')">' + topic.icon + ' ' + topic.title + '</h3><table class="table">' + rows + '</table>';
      })
      .join('');
  }
}
