/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Deck, que representa
 * un mazo de la baraja francesa.
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports Deck
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 8. Poker. Programación orientada a objetos en JS.
 *
 * Contenido detallado: Contiene la implementación de la clase Deck que
 * representa una mazo de la baraja francesa de cartas. Posee métodos que están
 * dirigidos a permitir la insercción de cartas en el mazo, su retirada, el reparto
 * de la cartas en varias manos y, barajar las cartas existentes.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *    - Baraja francesa:
 *      https://en.wikipedia.org/wiki/Standard_52-card_deck
 *
 * Historial de revisiones:
 *    - 08.04.2020 - Creación del código.
 *    - 14.04.2020 - Versión presentada para evaluación.
 */
'use strict'
/**
 * @const {Number}
 * @default
 */
const MAX_SUITS = 4;
/**
 * @const {Number}
 * @default
 */
const MAX_VALUE = 13;

let card;
let hand;
if (typeof require !== 'undefined') {
  card = require('./card.js');
  hand = require('./hand.js')
} else {
  card = window.cardModule;
  hand = window.handModule;
}

/**
 * @desc Clase que representa una carta de la baraja francesa.
 */
class Deck {
  _cards = [];
  /**
   * @desc Constructor de la clase Deck.
   */
  constructor() {
    for (let suit = 0; suit < MAX_SUITS; suit++) {
      for (let value = 1; value <= MAX_VALUE; value++) {
        this._cards.push(new card.Card(value, suit));
      }
    }
  }
  /**
   * @desc Retorna en forma de String, el contenido del mazo.
   * @return {String} Mazo cartas en forma de String
   */
  print() {
    let result = '';
    for (const card of this._cards) {
      result = result + card.toString() + '\n';
    }
    return result;
  }
  /**
   * @desc Añade una o varias cartas al mazo.
   * @param  {...any} cards Cartas a añadir.
   */
  addCard(...cards) {
    for (const card of cards) {
      this._cards.push(card);
    }
  }
  /**
   * @desc Retorna y elimina la última carta del mazo.
   * @return {Object} Última carta del mazo.
   */
  popCard() {
    return this._cards.pop();
  }
  /**
   * @desc Baraja el mazo actual, aleatorizando la posición de las
   * cartas.
   */
  shuffle() {
    function range(start, end, step) {
      return Array.from({length: (end - start) / step + 1},
          function(/* Ignore this */ _, index) {
            return start + (index * step);
          });
    }
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const valid_numbers = range(0, this._cards.length - 1, 1);
    const result = [];
    while (valid_numbers.length > 0) {
      const indexToDelete = getRandomInt(0, valid_numbers.length);
      result.push(this._cards[valid_numbers[indexToDelete]]);
      valid_numbers.splice(indexToDelete, 1);
    }
    this._cards = result;
  }
  /**
   * @desc Ordena el mazo actual. La ordenación se hace en función del valor de
   * cada palo. El orden es: Trebol, diamantes, corazones y picas.
   */
  sort() {
    for (let cardToSort = 0; cardToSort < this._cards.length - 1; cardToSort++) {
      let index = cardToSort;
      for (let restOfcards = cardToSort; restOfcards < this._cards.length;
      restOfcards++) {
        if (!this._cards[index].compareIfLess(this._cards[restOfcards])) {
          index = restOfcards;
        }
      }
      const temp = this._cards[cardToSort];
      this._cards[cardToSort] = this._cards[index];
      this._cards[index] = temp;
    }
  }
  /**
   * @desc Permite repartir ncards cartas del mazo entre una cantidad dada
   * de manos.
   * @param {Number} nHands Cantidad de manos a las que repartir
   * @param {*} ncards Cantidad de cartas a repartir por mano
   * @return {Array} nHands manos de ncards cartas cada una.
   */
  dealHands(nHands, ncards){
    const result = [];
    for (let i = 0; i < nHands; i++) {
      const tempHand = new hand.Hand();
      tempHand.moveCards(this, ncards);
      result.push(tempHand);
    }
    return result;
  }
};

if (typeof exports !== 'undefined') {
  exports.Deck = Deck;
} else {
  window.deckModule = {};
  window.deckModule.Deck = Deck;
}
