/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase ChessPiece, que representa
 * la pieza cualquier del ajedrez.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports ChessPiece
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase ChessPiece,
 * que representa una pieza cualquier del ajedrez, definiendo las propiedades
 * básicas que las definen pero no realizando ninguna concreción. Se trata pues,
 * de una clase que debe ser utilizada para la creación de otras.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 03.05.2020 - Versión presentada para evaluación.
 */

'use strict';

class ChessPiece {
  static colDictionary = {
    '1': 'a',
    '2': 'b',
    '3': 'c',
    '4': 'd',
    '5': 'e',
    '6': 'f',
    '7': 'g',
    '8': 'h',
  }
  /**
   * @desc Constructor de la clase ChessPiece.
   * @param {Number} row Fila del tablero que ocupa la ficha.
   * @param {Number} col Columna del tablero que ocupa la ficha.
   */
  constructor(row, col) {
    this._row = row;
    this._col = col;
    this._type = undefined;
    this._img = undefined;
    this._color = undefined;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get row() {
    return this._row;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get col() {
    return this._col;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get type() {
    return this._type;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get img(){
    return this._img;
  }

  set row(row) {
    this._row = row;
  }

  set col(col) {
    this._col = col;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get color() {
    return this._color;
  }

  /**
   * @desc Muestra la notación algebraica de la ficha sobre el tablero.
   * @return {String} Cadena de texto con la representación algebraica.
   */
  showPosition() {
    return `${this._type}${ChessPiece.colDictionary[8 - this._col ]}${this._row + 1}`;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessPiece = ChessPiece;
} else { 
  window.ChessPiece = ChessPiece;
}