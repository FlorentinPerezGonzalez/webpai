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

const HAND_SIZE = 5;

let upHalf = document.getElementById('up-half');
let botHalf = document.getElementById('bot-half');
let upContext;
let botContext;
let button = document.getElementById('button');

function setup() {
  upHalf = document.getElementById('up-half');
  botHalf = document.getElementById('bot-half');
  CanvasModule.fixDpi(upHalf);
  CanvasModule.fixDpi(botHalf);
  upContext = upHalf.getContext('2d');
  botContext = botHalf.getContext('2d');
  button = document.getElementById('button');
  button.addEventListener('click', playGame);
}

function playGame() {
  CanvasModule.clearScreen(upContext, upHalf);
  CanvasModule.clearScreen(botContext, botHalf);
  const pokerDeck = new deck.Deck();
  pokerDeck.shuffle();
  const tempPokerHand = new pokerHand.PokerHand();
  tempPokerHand.moveCards(pokerDeck, HAND_SIZE);
  tempPokerHand.draw(upContext, upHalf.clientHeight, upHalf.width);
  const tempPokerHandTwo = new pokerHand.PokerHand();
  tempPokerHandTwo.moveCards(pokerDeck, HAND_SIZE);
  tempPokerHandTwo.draw(botContext, botHalf.clientHeight, botHalf.width);
  tempPokerHand.classify();
  tempPokerHandTwo.classify();
  console.log(tempPokerHand.g)
}
