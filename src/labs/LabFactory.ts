import { Lab } from './Lab';
import { ClassifierGame } from '../components/ClassifierGame';
import { DiagramPlayer } from '../components/DiagramPlayer';
import { StackExplorer } from '../components/StackExplorer';
import { T } from '../content/uiText';
import * as introductionData from '../content/labs/introductionLab';

/** Builds the interactive lab that goes with each topic. */
export class LabFactory {
  public static create(topicId: string): Lab | null {
    const steps = T.common.step;
    const game = T.lab.classifier;
    switch (topicId) {
      case 'introduction':
        return new Lab(introductionData.introductionLabTitle, [
          new DiagramPlayer(introductionData.activitiesDiagram, steps),
          new StackExplorer(introductionData.layersStack),
          new ClassifierGame(introductionData.mythsGame, game),
          new ClassifierGame(introductionData.attributesGame, game),
        ]);
      default:
        return null;
    }
  }
}
