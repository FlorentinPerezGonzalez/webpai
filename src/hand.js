/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Deck, que representa
 * un mazo de la baraja francesa.
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports Hand
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
 * @desc Clase que representa una mano de cartas
 */
class Hand {
  _cards = [];
  _label = '';
  /**
   * @desc Constructor de la clase Hand. Genera un conjunto de
   * cartas vacío.
   * @param {String} label Etiqueta a asignar a la mano.
   */
  constructor(label = 'Simple Hand') {
    this._label = label;
  }
  /**
   * @desc Getter.
   * @type {Number}
   */
  get label() {
    return this._label;
  }
  /**
   * @desc Añade una carta a la mano
   * @param {Object} card Carta a añadir a la mano
   */
  addCard(card) {
    this._cards.push(card);
  }
  /**
   * @desc Elimina y retorna la última carta de la mano.
   * @return {Object} Última carta de la mano.
   */
  popCard() {
    return this._cards.pop();
  }
  /**
   * @desc Indica cuantas cartas hay actualmente en la mano.
   * @return {Number} Cantidad de cartas en la mano.
   */
  size() {
    return this._cards.length;
  }
  /**
   * @desc Permite transferir cartas de una fuenta de cartas a la mano
   * @param {Object} cardSource Objeto que contiene y permite extraer cartas.
   * @param {Number} nCards Cantidad de cartas a extraer
   */
  moveCards(cardSource, nCards) {
    for (let i = 0; i < nCards; i++) {
      this._cards.push(cardSource.popCard());
    }
  }
};

if (typeof exports !== 'undefined') {
  exports.Hand = Hand;
} else {
  window.handModule = {};
  window.handModule.Hand = Hand;
}
