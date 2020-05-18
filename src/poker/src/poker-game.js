/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene una serie de funciones dirigidas a determinar la
 * probabilidad de que se de cada mano del poker.
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports setup
 * @exports probabilitiesSetup
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 8. Poker. Programación orientada a objetos en JS.
 *
 * Contenido detallado: Contiene la implementación de una serie de funciones
 * dirigidas a calcular la probabilidad de que se de cada mano del poker en el
 * barajeo inicial. El resultado se muestra tanto por la consola como por un fichero
 * JSON (Solo si se ejecuta con node).
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *    - Poker probability:
 *      https://en.wikipedia.org/wiki/Poker_probability
 *
 * Historial de revisiones:
 *    - 08.04.2020 - Creación del código.
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

let pokerHand;
let deck;
let fs;
let isNode = false;
if (typeof require !== 'undefined') {
  isNode = true;
  pokerHand = require('./poker-hand');
  deck = require('./deck');
  fs = require('fs');
} else {
  pokerHand = window.pokerHandModule;
  deck = window.deckModule;
}

/**
 * @const {Number}
 * @default
 */
const MAX_HANDS = 7;
/**
 * @const {Number}
 * @default
 */
const MAX_CARDS = 7;
/**
 * @const {Number}
 * @default
 */
const DECK_SIZE = 52;

/**
 * @desc Obtiene un objeto con las probabilidades y lo muestra por la
 * consola. También lo escribe en un fichero JSON y lo retorna para
 * su posible manipulación.
 * @param {Number} nHands Cantidad de manos a las que repartir cartas.
 * @return {Object} Objeto con la probabilidad de cada posible mano.
 */
function probabilitiesSetup(nHands) {
  const handsProbabilities = calculateProbabilities(nHands);
  if (isNode) {
    fs.writeFile('./poker.json', JSON.stringify(handsProbabilities, null, 1),
    function(err) {
      if (err) {
        throw new Error('No se ha podido escribir el fichero JSON');
      }
  });
  }
  return handsProbabilities;
}

/**
 * @desc Función que crea la configuración inicial necesaria para
 * comprobar si una serie de manos creadas posee una escalera.
 * @return {Bool} True si alguna de las manos creadas posee una escalera.
 */
function setup() {
  const pokerDeck = new deck.Deck;
  pokerDeck.shuffle();
  const hands = [];
  for (let hand = 0; hand < MAX_HANDS; hand++) {
    hands.push(new pokerHand.PokerHand());
    hands[hand].moveCards(pokerDeck, MAX_CARDS);
  }
  return checkIfStraight(hands);
}

/**
 * @desc Función que permite comprobar si alguna mano de un conjunto
 * de manos de poker posee una escelara.
 * @param {Array} pokerHands Conjunto de manos a examinar.
 * @return {Bool} True si alguna de las manos posee una escalera.
 */
function checkIfStraight(pokerHands) {
  let result = false;
  pokerHands.forEach(element => {
    if (element.hasStraight()) {
      result = true;
    }
  });
  return result;
}

/**
 * @desc Función que calcula las probabilidades de cada mano en el poker.
 * @param {Number} nHands Cantidad de manos a considerar para el proceso
 * de sacar estadísticos.
 * @return {Object} Objeto con las probabilidades de cada mano.
 */
function calculateProbabilities(nHands) {
  const result = {
    'Pair': 0,
    'Two Pair': 0,
    'Three of a Kind': 0,
    'Straight': 0,
    'Flush': 0,
    'Full House': 0,
    'Four of a Kind': 0,
    'Straight Flush': 0,
    'Simple Hand': 0,
  };
  let remainedCards = DECK_SIZE;
  let pokerDeck = new deck.Deck();
  pokerDeck.shuffle();
  for (let hand = 0; hand < nHands; hand++) {
    pokerDeck.shuffle();
    remainedCards = remainedCards - MAX_CARDS;
    const tempPokerHand = new pokerHand.PokerHand();
    tempPokerHand.moveCards(pokerDeck, MAX_CARDS);
    tempPokerHand.classify();
    rebuildDeck(pokerDeck, tempPokerHand, MAX_CARDS);
    result[tempPokerHand.label]++;
  }
  convertToProbability(result, nHands);
  return result;
}

/**
 * @desc Función que permite devolver un conjunto de cartas presentes
 * en una mano a un mazo.
 * @param {Object} deck Mazo de cartas.
 * @param {Object} hand Mano de la que se extraerán las cartas.
 * @param {Number} nCards Número de cartas a devolver al mazo desde la mano.
 */
function rebuildDeck(deck, hand, nCards) {
  for (let i = 0; i < nCards; i++) {
    deck.addCard(hand.popCard());
  }
}

/**
 * @desc Función que permite expresar los contenidos de un objeto
 * en probabilidades. Para ello requiere que las properties del objeto
 * representan cantidades arbitrarias y que se especifique, además, la
 * cantidad de casos totales estudiados. Esto último, necesario para
 * determinar la probabilidad con éxito.
 * @param {Object} objectToConvert Objeto cuyas properties se quieren
 * expresar como probabilidades.
 * @param {Number} nData Cantidad total de casos estudiados.
 */
function convertToProbability(objectToConvert, nData) {
  for (const data in objectToConvert) {
    if (objectToConvert.hasOwnProperty(data)) {
      objectToConvert[data] /= nData; 
    }
  }
}

if (typeof exports !== 'undefined') {
  exports.setup = setup;
  exports.probabilitiesSetup = probabilitiesSetup;
} else {
  window.pokerGameModule = {};
  window.pokerGameModule.setup = setup;
  window.pokerGameModule.probabilitiesSetup = probabilitiesSetup;
}
