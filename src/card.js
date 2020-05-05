/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la Card que representa una carta
 * de la baraja francesa
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports Card
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 8. Poker. Programación orientada a objetos en JS.
 *
 * Contenido detallado: Contiene la implementación de la clase Card que
 * representa una carta de la baraja francesa. La clase permite expresar
 * la carta como un string y, de igual manera, comparar cartas entre sí.
 * El valor de estas está asignado de tal manera que primero se atiende
 * a la importancia del palo, y posteriormente, y solo entre cartas del mismo
 * palo, al valor numérico de las respectivas cartas.
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
const CLUBS = 0;
/**
 * @const {Number}
 * @default
 */
const DIAMONDS = 1;
/**
 * @const {Number}
 * @default
 */
const HEARTS = 2;
/**
 * @const {Number}
 * @default
 */
const SPADES = 3;

/**
 * @desc Clase que representa una carta de la baraja francesa.
 */
class Card {
  static suitDictionary = {
    '0': 'C',
    '1': 'D',
    '2': 'H',
    '3': 'S',
  }

  static valueDictionary = {
    '1': 'A',
    '11': 'J',
    '12': 'Q',
    '13': 'K', 
  }

  _value;
  _suit;
  /**
   * @desc Constructor de la clase Card
   * @param {Number} value Valor de la carta
   * @param {Number} suit Palo de la carta: 0 -> Trebol, 1 -> Diamantes,
   * 2 -> Corazones, 3 -> Picas.
   */
  constructor(value = 2, suit = CLUBS) {
    this._value = value;
    this._suit = suit;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get suit() {
    return this._suit;
  }

  /**
   * @desc Permite representar la carta en formato String
   * @return {String} Representación String de la carta
   */
  toString() {
    let valueString;
    switch (this._value) {
      case 1:
        valueString = 'Ace';
        break;
      case 11:
        valueString = 'Jack';
        break;
      case 12:
        valueString = 'Queen';
        break;
      case 13:
        valueString = 'King';
        break;
      default:
        valueString = this._value;
        break;
    }
    let suitString;
    switch (this._suit) {
      case CLUBS:
        suitString = 'Clubs';
        break;
      case DIAMONDS:
        suitString = 'Diamonds';
        break;
      case HEARTS:
        suitString = 'Hearts';
        break;
      case SPADES:
        suitString = 'Spades';
        break;
    }
    return `${valueString} of ${suitString}`;
  }

  /**
   * @des Sobrecarga del operador inspect de Object.
   * @return {String} Representación String de la carta
   */
  inspect() {
    return this.toString();
  }

  /**
   * @desc Permite comparar dos cartas entre ellas.
   * @param {Object} otherCard Carta con la que comparar.
   * @return {Bool} True si this es menor que otherCard. False para el caso
   * contrario.
   */
  compareIfLess(otherCard) {
    if (this._suit == otherCard.suit) {
      return this._value < otherCard.value;
    } else {
      return this._suit < otherCard.suit;
    }
  }
};

if (typeof exports !== 'undefined') {
  exports.Card = Card;
} else { 
  window.cardModule = {};
  window.cardModule.Card = Card;
}
