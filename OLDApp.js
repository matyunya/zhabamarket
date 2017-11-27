import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

import EXAMPLE from '../FinishScreen/example.png';
import ARROWS from '../FinishScreen/arrows.png';
import FROGG from '../FinishScreen/frog.png';
import ScaledContainer from '../ScaledContainer/ScaledContainer';
import Shelf from '../Shelf/Shelf';
import Character from '../Character/Character';
import Frog from '../Character/Frog';
import { speechStyle } from '../Character/Frog';
import Background from '../Background/Background';
import RendererStore from '../../stores/RendererStore';
import BACKGROUND from '../Background/bg.png';
import WALL from '../Background/wall.png';
import FENCE from '../Background/fence.png';
import CASHIER from '../Background/cashier.png';
import BASKET from '../Background/basket.png';
import SECURITY from '../Background/mp.png';
import SECURITY2 from '../Background/mp_2.png';
import FS from '../Interface/fs.png';
import MAN from '../Interface/man.png';

import WALLET from '../Cash/wallet.png';

import { goods, r } from '../Shelf/Shelf';

import atmosphere from '../Background/atmosphere.mp3';
import purchaseSound from '../Background/purchase.mp3';
import step from '../Background/step.mp3';

import BAG from '../FinishScreen/bag.png';
import FRAME from '../FinishScreen/frame.png';
import FB from '../FinishScreen/fb.png';
import VK from '../FinishScreen/vk.png';
import FROG_B from '../FinishScreen/frog_b.png';

const redStyle = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 36,
    fontWeight: 'bold',
    wordWrap: true,
    wordWrapWidth: 440,
    color: '#ff0000'
});

const tagStyle = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 24,
    fontColor: '#ff0000',
    align: 'center',
});

const priceStyle = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    fontColor: '#ff0000',
    align: 'center',
});

const p1 = { x: 2167, y: -266 };
const p2 = { x: 7372, y: 2361 };
const p3 = { x: 3529, y: 4224 };
const p4 = { x: -1649, y: 1689 };

const f1 = { x: 2288, y: 1755.5 };
const f2 = { x: 2873, y: 2049.5 };
const f3 = { x: 3488, y: 1731.5 };
const f4 = { x: 2930, y: 1425 };

// const sh1 = { x: 1003, y: 789.5 };
// const sh2 = { x: 2107, y: 1419.5 };

// const dd1 = { x: 463, y: 1092.5 };
// const dd2 = { x: 1573, y: 1716.5 };

// const db1 = { x: -65, y: 1395.5 };
// const db2 = { x: 1045, y: 2025.5 };

// const dc1 = { x: -614, y: 1695.5 };
// const dc2 = { x: 496, y: 2328.5 };

// const shh1 = { x: 1552, y: 498.5 };
// const shh2 = { x: 2653, y: 1119.5 };

// const ssh1 = { x: 2092, y: 195.5 };
// const ssh2 = { x: 3175, y: 822.5 };

// const ss1 = { x: 4513, y: 1647.5 };
// const ss2 = { x: 5629, y: 2283.5 };

// const ba1 = { x: 3985, y: 1959.5 };
// const ba2 = { x: 5101, y: 2586.5 };

// const bb1 = { x: 3430, y: 2262.5 };
// const bb2 = { x: 4567, y: 2889.5 };

// const bc1 = { x: 2911, y: 2553.5 };
// const bc2 = { x: 4015, y: 3195.5 };

// const bd1 = { x: 2368, y: 2853.5 };
// const bd2 = { x: 3487, y: 3480.5 };

// || this.char.shape.collidesLine(sh1, sh2)
// || this.char.shape.collidesLine(shh1, shh2) 
// || this.char.shape.collidesLine(ssh1, ssh2) 
// || this.char.shape.collidesLine(ss1, ss2) 
// || this.char.shape.collidesLine(ba1, ba2) 
// || this.char.shape.collidesLine(bb1, bb2) 
// || this.char.shape.collidesLine(bc1, bc2) 
// || this.char.shape.collidesLine(bd1, bd2)
// || this.char.shape.collidesLine(dd1, dd2)
// || this.char.shape.collidesLine(db1, db2)
// || this.char.shape.collidesLine(dc1, dc2)

export default class App extends ScaledContainer {

  constructor(...args) {
    super(...args);

    this.startScreen = document.getElementById('start').classList;

    this.world = new PIXI.Container();

    this.bg = this.addBackground();

    this.world.addChild(this.bg);

    this.objects = new PIXI.Container();
    this.world.addChild(this.objects);

    this.addChild(this.world);

    this.char = this.addChar();

    this.frog = new Frog();
    this.frog.x = RendererStore.get('stageCenter').x + 1700;
    this.frog.y = RendererStore.get('stageCenter').y + 1500;
    
    this.objects.addChild(this.frog);

    this.addShelves();
    this.cash = 1000;
    this.cashText = document.getElementById('cash');
    this.purchased = [];
    this.purchasedImageUrls = [];
    this.croaking = false;
    this.finishing = false;

    this.addWalls();
    this.addSecurity();

    // TODO fade in
    this.atmosphere = new Howl({
      src: [atmosphere],
      loop: true,
      volume: 0.3,
      autoplay: false,
    });

    this.purchaseSound = new Howl({ src: [purchaseSound], volume: 0.4 });
    this.step = new Howl({ src: [step], volume: 0.34, });
  }

  purchase() {
    if (!this.closestShelf || !this.closestShelf.good) {
      return;
    }

    const purchase = this.closestShelf.good;

    if (purchase.sound) {
      this.playingsound && this.playingsound.stop();
      purchase.sound.play();
      this.playingsound = purchase.sound;
    }

    this.cash -= purchase.price;

    this.cashText.innerHTML = `${this.cash}₽`;

    this.closestShelf.purchase();

    this.purchased.push(purchase);
    if (this.purchased.length === 12) {
      this.purchased.shift();
      this.purchased.map((p, i) => {
        p.transform.position.x = (i + 2) * 100 + 250;
        p.transform.position.y = 300;    
      })
    }

    this.char.purchasing = false;
    this.addChild(purchase);
    this.hideOffer();

    this.purchasedImageUrls.push(purchase._texture.baseTexture.imageUrl);
    this.renderPurchases();
    
    this.closestShelf = null;
    this.purchaseSound.play();
  }

  update() {
    if (!this.atmosphere.playing() && this.startScreen.contains("hidden")) {
      this.atmosphere.play();
      this.atmosphere.fade(0, 0.5, 5000);
    }

    if (this.char.finished) return;

    if (this.char.purchasing && this.finishing) {
      this.finish();
      return;
    }

    if (this.char.purchasing && this.closestShelf) {
      this.purchase();
    }

    if (!this.char.vx && !this.char.vy) {
      this.char.stop();
      this.step.stop();
      return;
    }

    this.checkFrog();

    const { children } = this.objects;

    children.sort((a, b) => {
      if (a.isWall || b.isWall) return a.position.y - b.position.y;

      return b.position.y - a.position.y;
    });
    const closest = this.getClosestShelf(children, this.char);
    if (this.closestShelf && closest !== this.closestShelf) {
      this.hideOffer();
    }

    if (closest && closest.isShelf && closest !== this.closestShelf && calcDistance(this.char, closest) < 300) {
      this.closestShelf = closest;
      this.showOffer();
      this.closestShelf.showOffer();
    }

    this.checkFinish();
    this.char.shape.update();
    children.map(o => o.shape && o.shape.update());
    
    if (this.char.shape.collidesLine(p1, p2) || this.char.shape.collidesLine(p2, p3)
      || this.char.shape.collidesLine(p3, p4) || this.char.shape.collidesLine(p1, p4)
      || this.char.shape.collidesLine(f1, f2) || this.char.shape.collidesLine(f2, f3)
      || this.char.shape.collidesLine(f3, f4) || this.char.shape.collidesLine(f1, f4)
      ) {
      this.char.position.x -= this.char.vx;
      this.char.position.y -= this.char.vy;
      this.world.position.x += this.char.vx;
      this.world.position.y += this.char.vy;
      this.char.vx = 0;
      this.char.vy = 0;
    } else {
      this.char.position.x += this.char.vx;
      this.char.position.y += this.char.vy;
      this.world.position.x -= this.char.vx;
      this.world.position.y -= this.char.vy;
    }

    this.char.play();
    if (!this.step.playing() && !this.char.still) {
      this.step.play();  
    }

    this.char.scale.x = this.char.vx < 0 ? 1 : -1;

    this.char.purchasing = false;
  }

  showOffer() {
    const shelf = this.closestShelf;
    if (!shelf.good) return;

    shelf.showOffer();
    this.priceTag = new PIXI.Text(shelf.good.tag, tagStyle);
    this.priceTag.x = shelf.x;
    this.priceTag.y = shelf.y - 200;
    this.priceTag.anchor.x = 0.5;
    this.priceTag.anchor.y = 0.5;
    this.world.addChild(this.priceTag);

    this.priceText = new PIXI.Text(`${shelf.good.price}₽`, priceStyle);
    this.priceText.x = shelf.x;
    this.priceText.y = shelf.y - 200 + 40;
    this.priceText.anchor.x = 0.5;
    this.priceText.anchor.y = 0.5;
    this.world.addChild(this.priceText);
  }

  hideOffer() {
    this.closestShelf.hideOffer();
    this.world.removeChild(this.priceText);
    this.world.removeChild(this.priceTag);
  }

  checkFinish() {
    if (calcDistance(this.char, this.cashierPoint) < 230 && !this.finishing) {
      this.finishing = true;
      this.showFinish();
    }

    if (calcDistance(this.char, this.cashierPoint) > 230) {
      this.hideFinish();
      this.finishing = false;
    }
  }

  checkFrog() {
    if (calcDistance(this.char, this.frog) < 500 && !this.croaking) {
      this.croaking = true;
      this.frog.croak();
    }

    if (calcDistance(this.char, this.frog) > 500) {
      this.frog.stopCroaking();
      this.croaking = false;
    }
  }

  getClosestShelf(children, char) {
    const objects = children.filter(c => c.isShelf && c.good);
    return objects.reduce((a, b) => calcDistance(char, a) < calcDistance(char, b) ? a : b, children[0]);
  }

  addBackground() {
    const texture = PIXI.Texture.fromImage(BACKGROUND);
    var bg = new PIXI.TilingSprite(texture);

    bg.width = 10000;
    bg.height = 7000;

    bg.anchor.x = 0.2;
    bg.anchor.y = 0.1;

    return bg;
  }

  showFinish() {
    this.bagText = new PIXI.Text('— Пакет нужен?', speechStyle);
    this.bagText.x = this.cashierPoint.x - 100;
    this.bagText.y = this.cashierPoint.y - 100;
    this.bagText.scale = { x: 2, y: 2 };
    this.addChild(this.bagText);
  }

  hideFinish() {
    this.objects.removeChild(this.bagText);
  }

  addChar() {
    const char = new Character();

    char.position.x = RendererStore.get('stageCenter').x;
    char.position.y = RendererStore.get('stageCenter').y - 120;

    this.objects.addChild(char);

    return char;
  }

  addSecurity() {
    this.cashierPoint = new PIXI.Container();
    this.cashierPoint.x = 953;
    this.cashierPoint.y = 2810.5;
    this.addChild(this.cashierPoint);

    const security = new PIXI.Sprite(PIXI.Texture.fromImage(SECURITY));
    security.x = RendererStore.get('stageCenter').x + 600 - 300;
    security.y = RendererStore.get('stageCenter').y + 1500;

    this.objects.addChild(security);

    const security2 = new PIXI.Sprite(PIXI.Texture.fromImage(SECURITY2));
    security2.x = RendererStore.get('stageCenter').x + 600 - 500;
    security2.y = RendererStore.get('stageCenter').y + 1500;

    this.objects.addChild(security2);
  }

  addWalls() {
    const right = [ 0, -1, -2, -3,  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    right.map(i => this.addWall(i, false, false));

    const left = [0, -1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    left.map(i => this.addWall(i, true, false));

    const rightBottom = [0, -1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    rightBottom.map(i => this.addWall(i, true, true));

    const leftBottom = [0, -1, -2, -3, -4, 1];
    leftBottom.map(i => this.addFence(i));

    const cashiers = [2, 7, 12, 17];
    cashiers.map(i => this.addCashier(i));
  }

  addCashier(i) {
    const cashier = new PIXI.Sprite(PIXI.Texture.fromImage(CASHIER));
    this.objects.addChild(cashier);
    cashier.x = RendererStore.get('stageCenter').x - 2000 + i * 170;
    cashier.y = 96 * i;
    cashier.y += 1890;
    if (i === 7) {
      cashier.x += 30;
      cashier.y -= 20;
    }
    if (i === 12) {
      cashier.x += 60;
      cashier.y -= 40;
    }
    if (i === 17) {
      cashier.x += 85;
      cashier.y -= 60;
    }
    cashier.isWall = true;
  }

  addFence(i) {
    const fence = new PIXI.Sprite(PIXI.Texture.fromImage(FENCE));
    this.objects.addChild(fence);
    fence.x = RendererStore.get('stageCenter').x - 2000 + i * 168;
    fence.y = 93 * i;
    fence.y += 1900;
    fence.isWall = true;
  }

  addWall(i, left, bottom) {
    const wall = new PIXI.Sprite(PIXI.Texture.fromImage(WALL));
    wall.isWall = true;
    this.objects.addChild(wall);
    if (left) {
      wall.x = RendererStore.get('stageCenter').x - 1000 - (600 - i * 600);
      wall.y = RendererStore.get('stageCenter').y - 500 - 311 * i;
    } else {
      wall.x = RendererStore.get('stageCenter').x + 3000 + (600 + i * 600);
      wall.y = 311 * i;
    }

    if (bottom) {
      wall.x += 3500;
      wall.y += 3500;
      wall.alpha = 0.6;
    }

    if (!left) {
      wall.scale.x = -1;
    }
  }

  addShelves() {
    let shelves = shuffle(Object.keys(goods));

    shelves.map((good, i) => {
      this.objects.addChild(addShelf(goods[good], i));
    });
  }

  finish() {
    this.world.removeChild(this.objects);
    this.atmosphere.stop();
    this.char.finished = true;
    this.playingsound && this.playingsound.volume(1);
    const finish = document.getElementById('finish');
    finish.classList.remove('hidden');
    const yourGood = rand(this.purchased);
    document.getElementById('g-name').innerHTML = yourGood.tag;
    document.getElementById('exp').innerHTML = yourGood.explanation;
    document.getElementById('good').src = "/displayobjects/Goods/" + yourGood.name + ".png";
    this.removeChild(this.objects);
    this.removeChild(this.cash);
    this.purchased.map(p => this.removeChild(p));
    this.purchased = [];
    document.getElementById('button').classList.add('hidden');
    document.getElementById('man').classList.add('hidden');
    document.getElementById('wallet').classList.add('hidden');
    document.getElementById('cash').classList.add('hidden');
    document.getElementById('bg').classList.remove('hidden');
  }

  renderPurchases() {
    
  }
}

const rand = arr => arr[Math.floor(Math.random()*arr.length)];

function addShelf(good, index) {
  const row = Math.floor((index / 10) % 10);
  const col = index % 10;

  good.podium = col === 4 || col === 5;
  const shelf = new Shelf(good);

  shelf.position.x = RendererStore.get('stageCenter').x + 1800 - (600 - index % 10 * 290) - (row * 180 * 3);
  shelf.position.y = RendererStore.get('stageCenter').y - 200 - ((150 - 300 * row) - col * 170);
  if (col > 4) {
    shelf.position.x += 700;
    shelf.position.y += 450;
  }

  shelf.name = good.name;
  return shelf;
}

const calcDistance = (a, b) => Math.sqrt(Math.pow((a.position.x-b.position.x), 2) + Math.pow((a.position.y-b.position.y), 2));

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

const isCashier = i => i === 7 || i === 10 || i === 2 || i === 14 || i === 18;

function line(g, p1, p2, color)
{
    g.lineStyle(10, color);
    g.moveTo(p1.x, p1.y);
    g.lineTo(p2.x, p2.y);
}
