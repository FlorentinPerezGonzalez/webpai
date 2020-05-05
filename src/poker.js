'use strict';

let card;
let deck;
let hand;
let pokerHand;
let pokerGame;
let CanvasModule;
let imgLoaderPoker;
if (typeof require !== 'undefined') {
  card = require('../src/card.js');
  deck = require('../src/deck.js');
  hand = require('../src/hand.js');
  pokerHand = require('../src/poker-hand.js');
  pokerGame = require('../src/poker-game.js');
  CanvasModule = require('../src/canvas-utility.js').canvasModule;
  generalUtility = require('../src/generalUtility.js').generalUtility;
  imgLoaderPoker = require('../src/imgLoaderPoker.js').imgLoaderPoker
} else {
  card = window.cardModule;
  hand = window.handModule;
  deck = window.deckModule;
  pokerHand = window.pokerHandModule;
  pokerGame = window.pokerGameModule;
  CanvasModule = window.canvasModule;
  generalUtility = window.generalUtility;
  imgLoaderPoker = window.imgLoaderPoker;
}


imgLoaderPoker.waitCharge(setup);

function setup() {
  console.log('cargaron');
}
