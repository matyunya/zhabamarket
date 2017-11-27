import * as PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore';

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#000000',
    color: '#ffffff',
    strokeThickness: 1,
    wordWrap: true,
    wordWrapWidth: 440,
    align: 'center',
});

export default class FinishScreen extends PIXI.Text {
  constructor(purchased) {
    const names = purchased.map(p => p.tag);
    super(names.join(',') + ' ', style);
    this.x = window.width / 2;
    this.y = window.height / 2;
  }
}