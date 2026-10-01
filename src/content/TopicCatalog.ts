import type { Topic } from './Topic';
import { introduction } from './introduction';
import { lifecycles } from './lifecycles';
import { agile } from './agile';
import { requirements } from './requirements';
import { estimation } from './estimation';
import { quality } from './quality';
import { testing } from './testing';
import { evolution } from './evolution';

/** Every topic of the material, in the order of the official course plan. */
export class TopicCatalog {
  private readonly topics: Topic[] = [introduction, lifecycles, agile, requirements, estimation, quality, testing, evolution];

  public list(): Topic[] {
    return this.topics;
  }

  public byUnit(unit: number): Topic[] {
    return this.topics.filter((topic: Topic) => topic.unit === unit);
  }

  public get(id: string): Topic | undefined {
    return this.topics.find((topic: Topic) => topic.id === id);
  }

  public previous(topic: Topic): Topic | undefined {
    return this.topics[this.topics.indexOf(topic) - 1];
  }

  public next(topic: Topic): Topic | undefined {
    return this.topics[this.topics.indexOf(topic) + 1];
  }
}
