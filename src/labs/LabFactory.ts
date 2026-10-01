import { Lab } from './Lab';
import { ClassifierGame } from '../components/ClassifierGame';
import { DiagramPlayer } from '../components/DiagramPlayer';
import { StackExplorer } from '../components/StackExplorer';
import { T } from '../content/uiText';
import * as introductionData from '../content/labs/introductionLab';
import * as lifecyclesData from '../content/labs/lifecyclesLab';
import * as agileData from '../content/labs/agileLab';
import * as requirementsData from '../content/labs/requirementsLab';
import { SprintPanel } from './SprintPanel';

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
      case 'lifecycles':
        return new Lab(lifecyclesData.lifecyclesLabTitle, [
          new DiagramPlayer(lifecyclesData.modelsDiagram, steps),
          new ClassifierGame(lifecyclesData.chooseModelGame, game),
        ]);
      case 'agile':
        return new Lab(agileData.agileLabTitle, [
          new SprintPanel(agileData.sprintSimulation, steps),
          new ClassifierGame(agileData.rolesGame, game),
          new ClassifierGame(agileData.elementsGame, game),
          new ClassifierGame(agileData.methodsGame, game),
        ]);
      case 'requirements':
        return new Lab(requirementsData.requirementsLabTitle, [
          new ClassifierGame(requirementsData.kindsGame, game),
          new ClassifierGame(requirementsData.nfrGame, game),
          new ClassifierGame(requirementsData.techniquesGame, game),
          new DiagramPlayer(requirementsData.requirementsDiagram, steps),
        ]);
      default:
        return null;
    }
  }
}
