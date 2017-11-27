import { Sprite, Texture, extras } from 'pixi.js';
import DOWN1 from './down1.png';
import DOWN2 from './down2.png';
import DOWN3 from './down3.png';

import UP1 from './up1.png';
import UP2 from './up2.png';
import UP3 from './up3.png';

import LEFT1 from './left1.png';
import LEFT2 from './left2.png';
import LEFT3 from './left3.png';

import { Rectangle } from 'yy-intersects';

export default class Character extends extras.AnimatedSprite {

  constructor() {
    const down1 = Texture.fromImage(DOWN1);
    const down2 = Texture.fromImage(DOWN2);
    const down3 = Texture.fromImage(DOWN3);
    const up1 = Texture.fromImage(UP1);
    const up2 = Texture.fromImage(UP2);
    const up3 = Texture.fromImage(UP3);
    const left1 = Texture.fromImage(LEFT1);
    const left2 = Texture.fromImage(LEFT2);
    const left3 = Texture.fromImage(LEFT3);

    super([down1, down2, down3, up1, up2, up3, left1, left2, left3], true);

    this.anchor.x = .5;
    this.anchor.y = 1;
    this.animationSpeed = 0.1;
    this.isChar = true;
    this.position.z = 1;

    this.pivot.x = .5;
    this.pivot.y = .5;

    this.vx = 0;
    this.vy = 0;

    this.purchasing = false;

    this.onFrameChange = f => this.animate(f);

    this.shape = new Rectangle(this, { width: 50, height: 50 });

    this.input();
  }

  renderCanvas() {
    this.position.x += this.vx;
    this.position.y += this.vy;
  }

  input() {
    const left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
      space = keyboard(32),
      enter = keyboard(13);

    space.press = () => this.purchasing = true;
    enter.press = () => this.purchasing = true;

    left.press = () => {
      this.vx = -3;
    };

    left.release = () => {
      this.vx = 0;
    };

    //Up
    up.press = () => {
      this.vy = -3;
    };
    up.release = () => {
      this.vy = 0;
    };

    //Right
    right.press = () => {
      this.vx = 3;
    };
    right.release = () => {
      this.vx = 0;
    };

    //Down
    down.press = () => {
      this.vy = 3;
    };
    down.release = () => {
      this.vy = 0;
    };
  }

  animate(f) {
    //up
    if (this.vy !== 0 && this.vy < 0 && (f !== 3 && f !== 4 && f !== 5)) {
      this.gotoAndPlay(3);
      return;
    }

    //down
    if (this.vy > 0 && this.vx === 0 && f >= 3) {
      this.gotoAndPlay(0);
      return;
    }

    //side
    if (this.vx !== 0 && (this.vy > 0 || this.vy === 0) && f < 6) {
      this.gotoAndPlay(6);
      return;
    }
  }
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}