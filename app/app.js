import './index.html';
import {config} from '../package.json';
import Renderer from './Renderer/Renderer';
import App from './displayobjects/App/App';
import screenfull from 'screenfull';

document.getElementById('button').addEventListener('click', () => {
  if (screenfull.enabled) {
    screenfull.request();
  }
});


const renderer = new Renderer(config.stageWidth, config.stageHeight);
const app = new App(config.stageWidth, config.stageHeight);

document.body.appendChild(renderer.view);

if (typeof window.orientation !== 'undefined') { 
  document.body.innerHTML = 'Наша игра работает только на большом компьютере.'
} else {
  renderer.addRenderable(app);
  renderer.start();
}
