import * as PIXI from 'pixi.js';
import { Howl } from 'howler';
import { Rectangle } from 'yy-intersects';

import EXAMPLE from '../FinishScreen/example.png';
import ARROWS from '../FinishScreen/arrows.png';
import FROGG from '../FinishScreen/frog.png';
import HEADPHONES from '../FinishScreen/headphones.png';
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
import REPLAY from '../FinishScreen/replay.png';
import EMAIL from '../FinishScreen/email.png';

import AT from '../FinishScreen/at.png';

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

// const f1 = { x: 2288, y: 1755.5 };
// const f2 = { x: 2873, y: 2049.5 };
// const f3 = { x: 3488, y: 1731.5 };
// const f4 = { x: 2930, y: 1425 };

const finishLine1 = { x: -173, y: 2235.5 };
const finishLine2 = { x: 2746, y: 3756.5 };

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
    this.frog.y = RendererStore.get('stageCenter').y + 1400;
    
    this.objects.addChild(this.frog);

    this.addShelves();
    this.cash = 1000;
    this.currentCash = 1000;
    this.showing = false;
    this.justPurchased = false;
    this.cashText = document.getElementById('cash');
    this.basketNode = document.getElementById('basket');
    this.purchased = [];
    this.purchasedNodes = [];
    this.croaking = false;
    this.finishing = false;
    this.cashiers = [];

    const texture = PIXI.Texture.fromImage(BACKGROUND);
    texture.opacity = 0;  


    this.addWalls();
    this.addSecurity();

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

    if (this.cash - purchase.price < 0) {
      return;
    }

    this.playingsound && this.playingsound.stop();
    if (purchase.sound) {
      purchase.sound.play();
      this.playingsound = purchase.sound;
    }

    this.cash -= purchase.price;

    this.closestShelf.purchase();

    this.purchased.push(purchase);

    if (this.purchased.length > 11) {
      this.purchasedNodes[this.purchased.length - 11].remove();
    }

    this.char.purchasing = false;
    this.addChild(purchase);
    this.hideOffer();

    const img = document.createElement("img");
    img.src = purchase._texture.baseTexture.imageUrl;
    this.purchasedNodes.push(img);
    this.basketNode.appendChild(img);
    
    this.closestShelf = null;
    this.purchaseSound.play();
    this.justPurchased = purchase;
  }

  update() {
    if (this.justPurchased) {
      this.justPurchased.scale -= 0.1;
      if (this.justPurchased.scale < 0) {
        this.justPurchased = null;
      }
    }

    if (this.showing && this.priceText.scale.x < 1) {
      this.priceText.scale.x *= 1.3;
      this.priceText.scale.y *= 1.3;
      this.priceTag.scale.x *= 1.3;
      this.priceTag.scale.y *= 1.3;
      this.priceTag.y -= 10;
      this.priceText.y -= 10;
    }

    if (this.currentCash !== this.cash) {
      this.currentCash -= 3;
      this.cashText.innerHTML = `${this.currentCash}₽`; 
      if (this.currentCash < this.cash) {
        this.currentCash = this.cash;
        this.cashText.innerHTML = `${this.cash}₽`; 
      } 
    }

    if (!this.atmosphere.playing() && this.startScreen.contains("hidden")) {
      this.atmosphere.play();
      this.atmosphere.fade(0, 0.5, 5000);
    }

    if (this.char.finished) return;

    if (this.char.purchasing && this.finishing && this.purchased.length > 0) {
      this.finish();
      return;
    }

    this.char.shape.update();
    this.checkFinish();

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
    const closest = this.getClosest(children, this.char);
    if (this.closestShelf && closest !== this.closestShelf) {
      this.hideOffer();
    }

    if (closest && closest.isShelf && closest !== this.closestShelf && calcDistance(this.char, closest) < 200) {
      this.closestShelf = closest;
      this.showOffer();
      this.closestShelf.showOffer();
    }
    
    if (this.char.shape.collidesLine(p1, p2) || this.char.shape.collidesLine(p2, p3)
      || this.char.shape.collidesLine(p3, p4) || this.char.shape.collidesLine(p1, p4)
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

    // console.log(this.char.x, this.char.y)

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
    this.showing = true;
    this.priceTag = new PIXI.Text(shelf.good.tag, speechStyle);
    this.priceTag.x = shelf.x;
    this.priceTag.y = shelf.y + 150 - 360;
    this.priceTag.anchor.x = 0.5;
    this.priceTag.anchor.y = 0.5;
    this.priceTag.scale.x = 0.01;
    this.priceTag.scale.y = 0.01;
    this.world.addChild(this.priceTag);

    this.priceText = new PIXI.Text(`${shelf.good.price}₽`, priceStyle);
    this.priceText.scale.x = 0.01;
    this.priceText.scale.y = 0.01;
    this.priceText.x = shelf.x;
    this.priceText.y = shelf.y + 40 + 150 - 360;
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
    const closestCashier = this.cashiers.find(c => c.shape.collidesRectangle(this.char.shape));
    if (closestCashier && !this.finishing) {
      console.log(closestCashier.shape, "SPAHE");
      this.finishing = true;
      this.showFinish(closestCashier);
      this.closestCashier = closestCashier;
    }

    if (!closestCashier && this.finishing) {
      this.finishing = false;
      this.hideFinish();
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

  getClosest(children, char) {
    const objects = children.filter(c => (c.isShelf && c.good) || c.isCashier);
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

  showFinish(cashier) {
    const text = this.purchased.length === 0 ? '— Сначала возьми что-нибудь, артист!' : '— Пакет нужен?';
    
    this.bagText = new PIXI.Text(text, speechStyle);
    cashier.addChild(this.bagText);
    this.bagText.scale = { x: 1, y: 1 };
    this.bagText.x = -10;
    this.bagText.y = -110;

    if (this.purchased.length === 0) return;

    this.bagSubText = new PIXI.Text('(нажми пробел, чтобы увидеть результат)', speechStyle);
    this.bagSubText.scale = { x: 0.7, y: 0.7 };
    this.bagSubText.x = -10;
    this.bagSubText.y = -60;
    cashier.addChild(this.bagSubText);
  }

  hideFinish() {
    this.closestCashier.removeChild(this.bagText);

    this.bagSubText && this.closestCashier.removeChild(this.bagSubText);
  }

  addChar() {
    const char = new Character();

    char.position.x = RendererStore.get('stageCenter').x;
    char.position.y = RendererStore.get('stageCenter').y - 120;

    this.objects.addChild(char);

    return char;
  }

  addSecurity() {
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

    const leftBottom = [-2, -3, -4];
    leftBottom.map(i => this.addFence(i));

    const cashiers = [2, 7, 12, 17];
    this.cashiers = cashiers.map(i => this.addCashier(i));
  }

  addCashier(i) {
    const cashier = new PIXI.Sprite(PIXI.Texture.fromImage(CASHIER));
    this.objects.addChild(cashier);
    cashier.x = RendererStore.get('stageCenter').x - 2000 + i * 170;
    cashier.y = 96 * i;
    cashier.y += 1890;
    cashier.anchor.x = 0.5;
    cashier.anchor.y = 0.5;
    cashier.isCashier = true;
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
    cashier.shape = new Rectangle(cashier, { width: 600, height: 600 });
    return cashier;
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
    document.getElementById('img').content = "http://vkontakte.ru/share.php?image=http://www.zhabamarket.com/displayobjects/FinishScreen/" + yourGood.name + ".png&url=http%3A%2F%2Fwww.zhabamarket.com"
    document.getElementById('vklink').href = "http://vkontakte.ru/share.php?image=http://www.zhabamarket.com/displayobjects/FinishScreen/" + yourGood.name + ".png&url=http%3A%2F%2Fwww.zhabamarket.com"
    document.getElementById('fblink').href = "https://www.facebook.com/sharer/sharer.php?picture=http://www.zhabamarket.com/displayobjects/FinishScreen/" + yourGood.name + ".png&u=http%3A%2F%2Fwww.zhabamarket.com%2F&amp;src=sdkpreparse"
    this.removeChild(this.objects);
    this.removeChild(this.cash);
    this.purchased.map(p => this.removeChild(p));
    this.purchased = [];
    document.getElementById('button').classList.add('hidden');
    document.getElementById('man').classList.add('hidden');
    document.getElementById('wallet').classList.add('hidden');
    document.getElementById('cash').classList.add('hidden');
    document.getElementById('interface').classList.add('hidden');
    document.getElementById('bg').classList.remove('hidden');
  }
}

const rand = arr => arr[Math.floor(Math.random()*arr.length)];

function addShelf(good, index) {
  const row = Math.floor((index / 10) % 10);
  const col = index % 10;

  good.podium = col === 4 || col === 5;
  const shelf = new Shelf(good);

  shelf.position.x = RendererStore.get('stageCenter').x + 1900 - (600 - index % 10 * 290) - (row * 180 * 3);
  shelf.position.y = RendererStore.get('stageCenter').y - 400 - ((150 - 300 * row) - col * 170);
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
