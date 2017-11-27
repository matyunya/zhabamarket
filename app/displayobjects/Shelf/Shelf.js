import * as PIXI from 'pixi.js';

import SHELF from './shelf.png';
import PODIUM from './podium.png';

import apple from '../Goods/apple.png';
import bananas from '../Goods/bananas.png';
import beef from '../Goods/beef.png';
import beer from '../Goods/beer.png';
import bread from '../Goods/bread.png';
import cake from '../Goods/cake.png';
import cashew from '../Goods/cashew.png';
import caviar from '../Goods/caviar.png';
import champagne from '../Goods/champagne.png';
import chicken from '../Goods/chicken.png';
import chocopie from '../Goods/chocopie.png';
import chocremo from '../Goods/chocremo.png';
import cigarettes from '../Goods/cigarettes.png';
import coffee from '../Goods/coffee.png';
import cognac from '../Goods/cognac.png';
import coke from '../Goods/coke.png';
import colgate from '../Goods/colgate.png';
import condmilk from '../Goods/condmilk.png';
import condoms from '../Goods/condoms.png';
import corn from '../Goods/corn.png';
import crabsticks from '../Goods/crabsticks.png';
import doshir from '../Goods/doshir.png';
import druzhba from '../Goods/druzhba.png';
import eggs from '../Goods/eggs.png';
import fish from '../Goods/fish.png';
import grecha from '../Goods/grecha.png';
import gum from '../Goods/gum.png';
import icecream from '../Goods/icecream.png';
import jack from '../Goods/jack.png';
import jello from '../Goods/jello.png';
import juice from '../Goods/juice.png';
import ketchup from '../Goods/ketchup.png';
import kiwi from '../Goods/kiwi.png';
import lays from '../Goods/lays.png';
import mayo from '../Goods/mayo.png';
import milk from '../Goods/milk.png';
import onion from '../Goods/onion.png';
import paper from '../Goods/paper.png';
import pasta from '../Goods/pasta.png';
import pelmeni from '../Goods/pelmeni.png';
import pickles from '../Goods/pickles.png';
import pomelo from '../Goods/pomelo.png';
import porn from '../Goods/porn.png';
import potatoes from '../Goods/potatoes.png';
import redbull from '../Goods/redbull.png';
import rice from '../Goods/rice.png';
import sausage from '../Goods/sausage.png';
import snickers from '../Goods/snickers.png';
import sunflower from '../Goods/sunflower.png';
import tea from '../Goods/tea.png';
import vodka from '../Goods/vodka.png';
import water from '../Goods/water.png';
import watermelon from '../Goods/watermelon.png';
import wine from '../Goods/wine.png';
import winered from '../Goods/winered.png';
import { Howl } from 'howler';

import allegrovaSound from '../Background/allegrova.mp3';
import breadSound from '../Background/bread.mp3';
import druzhbaSound from '../Background/druzhba.mp3';
import duneSound from '../Background/dune.mp3';
import ketchupSound from '../Background/ketchup.mp3';
import lunaSound from '../Background/luna.mp3';
import mayoSound from '../Background/mazik.mp3';
import mobySound from '../Background/moby.mp3';
import gumSound from '../Background/orbit.mp3';
import redbullSound from '../Background/redbull.mp3';
import chocremoSound from '../Background/shoko.mp3';
import sausageSound from '../Background/yaiki.mp3';
import paperSound from '../Background/tualetka.mp3';
import pornSound from '../Background/porn.mp3';
import vodkaSound from '../Background/vodka.mp3';
import eggsSound from '../Background/sosiski.mp3';

export const goods = {
  apple: {
    name: 'apple',
    good: apple,
    price: 50,
    explanation: 'Мать мечтала, что ты будешь как Стивен Крабс.',
    tag: 'яблоки'
  },
  bananas: {
    name: 'bananas',
    good: bananas,
    price: 50,
    explanation: 'Пошлость — твое второе я.',
    tag: 'бананы'
  },
  beef: {
    name: 'beef',
    good: beef,
    price: 50,
    explanation: 'Ты чиканулся на мясном рулете и телесереалах, что ж, так тому и быть.',
    tag: 'тушонка'
  },
  beer: {
    name: 'beer',
    good: beer,
    price: 45,
    explanation: 'Выпить пивка — лучшее, что вы можете сделать в жизни.',
    tag: 'пиво',
    sound: duneSound,
  },
  bread: {
    name: 'bread',
    good: bread,
    price: 40,
    explanation: 'Вы запутались в отношениях и теперь будете вечно курить на лестничной площадке.',
    tag: 'подольский',
    sound: breadSound,
  },
  cake: {
    name: 'cake',
    good: cake,
    price: 470,
    explanation: 'Они думают, ты слушаешь "Сектор газа", а ты слушаешь "Лед Зепелин".',
    tag: 'торт'
  },
  cashew: {
    name: 'cashew',
    good: cashew,
    price: 120,
    explanation: 'Просто не бери трубку, потом что-нибудь придумаешь.',
    tag: 'кешью',
    sound: mobySound,
  },
  caviar: {
    name: 'caviar',
    good: caviar,
    price: 280,
    explanation: 'Не думай, что сможешь купить чьи-то чувства, бедняк.',
    tag: 'икра'
  },
  champagne: {
    name: 'champagne',
    good: champagne,
    price: 140,
    explanation: 'Все ок, но пукать при всех необязательно.',
    tag: 'игристое',
    sound: allegrovaSound,
  },
  chicken: {
    name: 'chicken',
    good: chicken,
    price: 275,
    explanation: 'Головокружительная любовь, к сожалению, не для тебя.',
    tag: 'кура-гриль'
  },
  chocopie: {
    name: 'chocopie',
    good: chocopie,
    price: 125,
    explanation: 'Твоя мама нашла у тебя какие-то таблетки и теперь ей весело.',
    tag: 'чокопай'
  },
  chocremo: {
    name: 'chocremo',
    good: chocremo,
    price: 170,
    explanation: 'Все вокруг в восторге от ваших охуительных шуток.',
    tag: 'шокремо',
    sound: chocremoSound,
  },
  cigarettes: {
    name: 'cigarettes',
    good: cigarettes,
    price: 125,
    explanation: 'Наверное, тяжело работать охранником. Сочувствую.',
    tag: 'сигареты'
  },
  coffee: {
    name: 'coffee',
    good: coffee,
    price: 12,
    explanation: 'Тебе наскучила обыденная жизнь, но у тебя слишком слабые руки, чтобы что-то изменить.',
    tag: 'кофе 3 в 1'
  },
  cognac: {
    name: 'cognac',
    good: cognac,
    price: 380,
    explanation: 'Ты стал крепче! Без постоянных тренировок об этом и мечтать было невозможно. За тебя!',
    tag: 'киновский'
  },
  coke: {
    name: 'coke',
    good: coke,
    price: 78,
    explanation: 'Завтра вам придет письмо. И это будет спам.',
    tag: 'кола'
  },
  colgate: {
    name: 'colgate',
    good: colgate,
    price: 65,
    explanation: 'Еще не время полностью забить на себя.',
    tag: 'зубная паста'
  },
  condmilk: {
    name: 'condmilk',
    good: condmilk,
    price: 75,
    explanation: 'Этим летом ты покроешься веснушками с головы до пят, и тебя начнут фоткать незнакомые люди.',
    tag: 'сгущенка'
  },
  condoms: {
    name: 'condoms',
    good: condoms,
    price: 60,
    explanation: 'Больше никаких праздников.',
    tag: 'презики',
    sound: lunaSound,
  },
  corn: {
    name: 'corn',
    good: corn,
    price: 76,
    explanation: 'Давно не было такой холодной весны, такой же холодной, как ты.',
    tag: 'кукуруза'
  },
  crabsticks: {
    name: 'crabsticks',
    good: crabsticks,
    price: 115,
    explanation: '3 2 1: Вот и ещё одной твоей мечте не суждено сбыться.',
    tag: 'крабовые палочки'
  },
  doshir: {
    name: 'doshir',
    good: doshir,
    price: 36,
    explanation: 'Ты лучше меня, а это не так уж и мало. бля',
    tag: 'дошир'
  },
  druzhba: {
    name: 'druzhba',
    good: druzhba,
    price: 65,
    explanation: 'Кое-кто говорит, что ты сдулся, но это лишь часть твоего плана.',
    tag: 'сыр дружба',
    sound: druzhbaSound,
  },
  eggs: {
    name: 'eggs',
    good: eggs,
    price: 76,
    explanation: 'ВКонтакте ты гораздо круче, чем в фейсбуке.',
    tag: 'яйца',
    sound: eggsSound,
  },
  fish: {
    name: 'fish',
    good: fish,
    price: 120,
    explanation: 'Похоже, вы любитель и рыбки съесть, и на хуй сесть.',
    tag: 'рыбка'
  },
  grecha: {
    name: 'grecha',
    good: grecha,
    price: 76,
    explanation: 'Не надо строить из себя интересную личность.',
    tag: 'греча'
  },
  gum: {
    name: 'gum',
    good: gum,
    price: 43,
    explanation: 'Если вас никто не трогает, потрогайте себя сами, ничего такого.',
    tag: 'жевачка',
    sound: gumSound,
  },
  icecream: {
    name: 'icecream',
    good: icecream,
    price: 38,
    explanation: 'Пора бы вернуться в зону комфорта.',
    tag: 'мороженое',
  },
  jack: {
    name: 'jack',
    good: jack,
    price: 950,
    explanation: 'Твой бывший знает, где ты справляешь днюху, и уже вызвал такси.',
    tag: 'джек дениелс',
  },
  jello: {
    name: 'jello',
    good: jello,
    price: 28,
    explanation: 'Твоя судьба — заниматься современным искусством.',
    tag: 'червячки'
  },
  juice: {
    name: 'juice',
    good: juice,
    price: 96,
    explanation: 'Попробуйте неделю не пить, вдруг поможет.',
    tag: 'сок'
  },
  ketchup: {
    name: 'ketchup',
    good: ketchup,
    price: 160,
    explanation: 'Ты бы убил кого-нибудь, просто боишься, что тебя поймают.',
    tag: 'кетчуп',
    sound: ketchupSound,
  },
  kiwi: {
    name: 'kiwi',
    good: kiwi,
    price: 96,
    explanation: 'Ты сидишь на игле "чего-нибудь новенького".',
    tag: 'киви'
  },
  lays: {
    name: 'lays',
    good: lays,
    price: 86,
    explanation: 'Лох.',
    tag: 'чипсы'
  },
  mayo: {
    name: 'mayo',
    good: mayo,
    price: 80,
    explanation: 'Лучше скрыть свои эмоции, чем плакать при всех.',
    tag: 'мазик',
    sound: mayoSound,
  },
  milk: {
    name: 'milk',
    good: milk,
    price: 76,
    explanation: 'Твои голые фотографии скоро окажутся в сети.',
    tag: 'молоко'
  },
  onion: {
    name: 'onion',
    good: onion,
    price: 30,
    explanation: 'Не плачь, он тебя не достоин.',
    tag: 'лук'
  },
  paper: {
    name: 'paper',
    good: paper,
    price: 40,
    explanation: 'Уснуть в туалете не так стыдно, как работать с 9 до 6.',
    tag: 'туалетная бумага',
    sound: paperSound,
  },
  pasta: {
    name: 'pasta',
    good: pasta,
    price: 65,
    explanation: 'Желаем, чтобы ваша жизнь была длинной как спагетти "Каждый день".',
    tag: 'макароны'
  },
  pelmeni: {
    name: 'pelmeni',
    good: pelmeni,
    price: 140,
    explanation: 'Твои пельмени снова разварились, братишка.',
    tag: 'пельмени'
  },
  pickles: {
    name: 'pickles',
    good: pickles,
    price: 70,
    explanation: 'Какой большой огурец!',
    tag: 'огурчики'
  },
  pomelo: {
    name: 'pomelo',
    good: pomelo,
    price: 98,
    explanation: 'Хм… займись собой, чтобы тебя не называли "африка бамбата".',
    tag: 'помело'
  },
  porn: {
    name: 'porn',
    good: porn,
    price: 150,
    explanation: 'За сколько ты пробегаешь стометровку, мама?',
    tag: 'порнушка',
    sound: pornSound,
  },
  potatoes: {
    name: 'potatoes',
    good: potatoes,
    price: 60,
    explanation: 'Если холодный душ не помогает, подышите над горячей картошкой.',
    tag: 'картошка'
  },
  redbull: {
    name: 'redbull',
    good: redbull,
    price: 120,
    explanation: 'Не хватает энергии? Просто ты занимаешься полной хуйней.',
    tag: 'редбульчик',
    sound: redbullSound,
  },
  rice: {
    name: 'rice',
    good: rice,
    price: 60,
    explanation: 'Вы слишком много работаете. Давайте я пропишу вам таблетки.',
    tag: 'рис'
  },
  sausage: {
    name: 'sausage',
    good: sausage,
    price: 132,
    explanation: 'Кажется, у кого-то проблемы на личном фронте.',
    tag: 'сосисочки',
    sound: sausageSound,
  },
  snickers: {
    name: 'snickers',
    good: snickers,
    price: 55,
    explanation: 'Не торопись и ты успеешь.',
    tag: 'сникерс'
  },
  sunflower: {
    name: 'sunflower',
    good: sunflower,
    price: 45,
    explanation: 'С вами так весело, я просто охуеваю.',
    tag: 'семки'
  },
  tea: {
    name: 'tea',
    good: tea,
    price: 180,
    explanation: 'Я прочитал твой дневник и всю переписку с друзьями. Ну ты даёшь.',
    tag: 'чай'
  },
  vodka: {
    name: 'vodka',
    good: vodka,
    price: 220,
    explanation: 'Линолиум, на котором ты спишь, делает из тебя железного человека.',
    tag: 'водка',
    sound: vodkaSound,
  },
  water: {
    name: 'water',
    good: water,
    price: 45,
    explanation: 'Иисус охраняет тебя, собаки преклоняясь шепчут слово "свобода".',
    tag: 'вода'
  },
  watermelon: {
    name: 'watermelon',
    good: watermelon,
    price: 60,
    explanation: 'Ты будешь жить на балконе у родственников, если не прекратишь делать то, что ты делаешь.',
    tag: 'арбуз'
  },
  wine: {
    name: 'wine',
    good: wine,
    price: 250,
    explanation: 'Скоро будет так плохо, что даже алкоголь не поможет.',
    tag: 'вино'
  },
  winered: {
    name: 'winered',
    good: winered,
    price: 350,
    explanation: 'Стоя на балконе, ты вспоминаешь свой выпускной, жаль у нас не принято зажигать свечи, а веть тебе так хотелось.',
    tag: 'вино получше',
  },
};

export default class Shelf extends PIXI.Sprite {
  constructor(good) {
    const texture = PIXI.Texture.fromImage(good.podium ? PODIUM : SHELF);

    super(texture);

    this.anchor.x = .5;
    this.anchor.y = 1;

    this.pivot.x = .5;
    this.pivot.y = .5;
    this.scale.x = good.podium ? 1 : -1;
    this.isShelf = true;

    this.good = new Good(good, this.position);
    this.addChild(this.good);
  }

  showOffer() {
    if (!this.good) {
      return;
    }
    this.alpha = 0.4;
  }

  hideOffer() {
    this.alpha = 1;
  }

  purchase() {
    this.good = null;
  }
}

class Good extends PIXI.Sprite {
  constructor(good, position) {
    const texture = PIXI.Texture.fromImage(good.good);
    super(texture);

    this.name = good.name;
    this.explanation = good.explanation;
    this.tag = good.tag;
    
    this.anchor.x = .5;
    this.anchor.y = 1.5;

    this.pivot.x = .5;
    this.pivot.y = .5;

    this.scale.x = good.podium ? 1 : -1;

    this.price = good.price || r(0, 300);

    if (good.sound) {
      this.sound = new Howl({
        src: [good.sound],
        volume: 0.5,
        loop: true,
      });
    }

    this.position = {
      x: position.x  + (good.podium ? 0 : 10),
      y: position.y + (good.podium ? -20 : 30),
    };
  }
}

function polygon(g, points, color)
{
    g.beginFill(color);
    g.drawPolygon(points);
    g.endFill();
    return g;
}