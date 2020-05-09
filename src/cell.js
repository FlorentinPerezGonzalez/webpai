/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Cell, que representa
 * una célula para "El juego de la vida"
 * @copyright Florentín Pérez Glez 2020
 * @since 09.05.2020
 * @exports Cell
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 12. Juego de la vida. Programación Gráfica, Orientada a Objetos y
 * dirigida por eventos en JS.
 *
 * Contenido detallado: Contiene la implementación de la clase Cell,
 * que representa una célula para "El juego de la vida". Esta se caracteriza por 
 * dos estados, viva y muerta. La célula contiene información, así mismo, de su
 * anterior al instante actual de tiempo.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *
 */

'use strict';

class Cell {
  static DEAD = 0;
  static ALIVE = 1;
  /**
   * @desc Constructor de la clase Cell.
   */
  constructor() {
    this._state = Cell.DEAD;
    this._previousState = Cell.DEAD;
  };
  /**
   * @desc Getter.
   * @type {Number}
   */
  get state() {
    return this._state;
  }
  /**
   * @desc Getter.
   * @type {Number}
   */
  get previousState() {
    return this._previousState;
  }

  /**
   * @desc Método que propaga el estado actual al estado previo.
   */
  transferState() {
    this._previousState = this._state;
  }

  /**
   * @desc Método que cambia el estado de la célula a su opuesto.
   * También propaga el estado actual al estado previo.
   */
  changeState() {
    this._previousState = this._state;
    if (this._state === Cell.DEAD) {
      this._state = Cell.ALIVE;
    } else {
      this._state = Cell.DEAD;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Cell = Cell;
} else { 
  window.Cell = Cell;
}
