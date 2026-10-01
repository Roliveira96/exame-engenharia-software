import './styles/base.css';
import './styles/menu.css';
import './styles/topic.css';
import './styles/labs.css';
import './styles/exam.css';
import { Application } from './app/Application';

const root: HTMLElement = document.getElementById('app') as HTMLElement;
new Application(root).start();
