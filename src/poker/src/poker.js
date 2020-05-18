/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo principal. Gestiona el funcionamiento del programa a través
 * de la asignación de eventos y obtención de referencias a componentes
 * del DOM.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Módulo que contiene las funciones administrativas necesarias para hacer
 * funcionar el programa que muestra dos manos de poker y las compara, indicando el ganador en
 * cada situación.
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

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
let jugadorUno;
let jugadorDos;

/**
 * @desc Función que gestiona e inicializa el programa.
 * Obtiene referencias a elementos del DOM y asigna eventos
 * convenientemente.
 */
function setup() {
  upHalf = document.getElementById('up-half');
  botHalf = document.getElementById('bot-half');
  jugadorUno = document.getElementById('jugadorUno');
  jugadorDos = document.getElementById('jugadorDos');
  CanvasModule.fixDpi(upHalf);
  CanvasModule.fixDpi(botHalf);
  upContext = upHalf.getContext('2d');
  botContext = botHalf.getContext('2d');
  button = document.getElementById('button');
  button.addEventListener('click', playGame);
}

/**
 * @desc Función que crear dos manos de póker, las muestra y compara,
 * indicando ademas, la mano ganadora.
 */
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
  determineWinner(tempPokerHand.label, tempPokerHandTwo.label);
}

/**
 * @desc Función que compara dos manos, indicando la mano ganadora.
 * @param {String} labelFirst Jugada de la primera mano.
 * @param {String} labelSecond Jugada de la segunda mano.
 */
function determineWinner(labelFirst, labelSecond) {
  function setWinner(node) {
    node.classList.add("has-text-success");
    node.classList.remove("has-text-warning");
    node.classList.remove("has-text-danger");
    node.innerText = 'Ganador';
  }
  function setLooser(node) {
    node.classList.add("has-text-danger");
    node.classList.remove("has-text-warning");
    node.classList.remove("has-text-success");
    node.innerText = 'Perdedor';
  }
  function setTie(node) {
    node.classList.add("has-text-warning");
    node.classList.remove("has-text-danger");
    node.classList.remove("has-text-success");
    node.innerText = 'Empate';
  }
  const score = {
    'Pair': 1,
    'Two Pair': 2,
    'Three of a Kind': 3,
    'Straight': 4,
    'Flush': 5,
    'Full House': 6,
    'Four of a Kind': 7,
    'Straight Flush': 8,
    'Simple Hand': 0,
  };
  const scoreFirst = score[labelFirst];
  const scoreSecond = score[labelSecond];
  if (scoreFirst > scoreSecond) {
    setWinner(jugadorUno);
    setLooser(jugadorDos);
  } else if (scoreSecond > scoreFirst) {
    setWinner(jugadorDos);
    setLooser(jugadorUno);
  } else {
    setTie(jugadorUno);
    setTie(jugadorDos);
  }
}
