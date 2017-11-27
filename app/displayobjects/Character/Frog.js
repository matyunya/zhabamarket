import * as PIXI from 'pixi.js';
import FROG1 from './frog1.png';
import FROG2 from './frog2.png';
import FROG3 from './frog3.png';
import FROG4 from './frog4.png';
import FROG5 from './frog5.png';
import FROG6 from './frog6.png';

export const speechStyle = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 24,
    fontColor: '#ff0000',
    align: 'center',
});

export default class Frog extends PIXI.extras.AnimatedSprite {
  constructor() {
    const frog1 = PIXI.Texture.fromImage(FROG1);
    const frog2 = PIXI.Texture.fromImage(FROG2);
    const frog3 = PIXI.Texture.fromImage(FROG3);
    const frog4 = PIXI.Texture.fromImage(FROG4);
    const frog5 = PIXI.Texture.fromImage(FROG5);
    const frog6 = PIXI.Texture.fromImage(FROG6);

    super([frog1, frog1, frog1, frog1, frog1, frog1, frog2, frog3, frog4, frog5, frog6], true);

    this.anchor.x = .5;
    this.anchor.y = 1;
    this.animationSpeed = 0.1;

    this.pivot.x = .5;
    this.pivot.y = .5;

    this.scale = { x: 2, y: 2 };
    this.play();

    this.croakText = new PIXI.Text('— Добро пожаловать в сеть супермаркетов "ЖАБА Маркет"!', speechStyle);
    this.croakText.x = -150;
    this.croakText.y = -350;
    this.croakText.scale.x = 0.6;
    this.croakText.scale.y = 0.6;
  }

  croak() {
    this.addChild(this.croakText);
  }

  stopCroaking() {
    this.removeChild(this.croakText);
  }
}
