import { Lab } from './Lab';
import { ClassifierGame } from '../components/ClassifierGame';
import { DiagramPlayer } from '../components/DiagramPlayer';
import { StackExplorer } from '../components/StackExplorer';
import { T } from '../content/uiText';
import * as introductionData from '../content/labs/introductionLab';
import * as lifecyclesData from '../content/labs/lifecyclesLab';
import * as agileData from '../content/labs/agileLab';
import * as requirementsData from '../content/labs/requirementsLab';
import * as estimationData from '../content/labs/estimationLab';
import * as qualityData from '../content/labs/qualityLab';
import * as testingData from '../content/labs/testingLab';
import * as evolutionData from '../content/labs/evolutionLab';
import { RolloutPanel } from './RolloutPanel';
import { BoundaryPanel } from './testing/BoundaryPanel';
import { CyclomaticPanel } from './testing/CyclomaticPanel';
import { WheelPanel } from './WheelPanel';
import { FunctionPointPanel } from './estimation/FunctionPointPanel';
import { CocomoPanel } from './estimation/CocomoPanel';
import { ThreePointPanel } from './estimation/ThreePointPanel';
import { PokerPanel } from './estimation/PokerPanel';
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
      case 'estimation':
        return new Lab(estimationData.estimationLabTitle, [
          new FunctionPointPanel(estimationData.functionPointCalculator),
          new CocomoPanel(estimationData.cocomoCalculator),
          new ThreePointPanel(estimationData.threePointCalculator),
          new PokerPanel(estimationData.planningPoker),
          new ClassifierGame(estimationData.feasibilityGame, game),
        ]);
      case 'quality':
        return new Lab(qualityData.qualityLabTitle, [
          new WheelPanel(qualityData.qualityWheel),
          new ClassifierGame(qualityData.characteristicGame, game),
          new StackExplorer(qualityData.maturityStack),
          new ClassifierGame(qualityData.costGame, game),
          new ClassifierGame(qualityData.scopeGame, game),
        ]);
      case 'testing':
        return new Lab(testingData.testingLabTitle, [
          new BoundaryPanel(testingData.boundaryWorkbench),
          new CyclomaticPanel(testingData.cyclomaticWorkbench),
          new ClassifierGame(testingData.levelsGame, game),
          new ClassifierGame(testingData.kindsGame, game),
          new ClassifierGame(testingData.boxGame, game),
          new ClassifierGame(testingData.verificationGame, game),
        ]);
      case 'evolution':
        return new Lab(evolutionData.evolutionLabTitle, [
          new RolloutPanel(evolutionData.rolloutTimeline),
          new ClassifierGame(evolutionData.maintenanceGame, game),
          new DiagramPlayer(evolutionData.changeDiagram, steps),
          new StackExplorer(evolutionData.webPyramid),
          new ClassifierGame(evolutionData.webAttributesGame, game),
        ]);
      default:
        return null;
    }
  }
}
