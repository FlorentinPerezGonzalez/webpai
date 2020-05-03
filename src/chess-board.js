/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase ChessBoard, que representa
 * un tablero de ajedrez.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports ChessBoard
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase ChessBoard,
 * que representa un tablero de ajedrez, entendido como una estructura de datos
 * en las que se posicionan las distintas Fichas del correspondiente juego.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 03.05.2020 - Versión presentada para evaluación.
 */

'use strict';

const CHESS_ROWS = 8;
const CHESS_COLS = 8;

class ChessBoard {
/**
 * @desc Constructor de la clase ChessBoard
 * @param {Number} rows Filas del tablero.
 * @param {Number} cols Columnas del tablero.
 */
  constructor(rows = 8, cols = 8) {
    this._rows = rows;
    this._cols = cols; 
    this.reset();
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get rows() {
    return this._rows;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get cols() {
    return this._cols;
  }

  /**
   * @desc Permite obtener la Ficha en una posición dada del tablero.
   * @param {Number} row Fila del tablero.
   * @param {Number} col Columna del tablero.
   * @return {Object} Ficha del tablero.
   */
  getData(row, col) {
    if (row >= CHESS_COLS || row < 0) {
      throw new Error('Fila especificada inválida');
    }
    if (col >= CHESS_COLS || col < 0) {
      throw new Error('Columna especificada inválida');
    }
    return this._data[row][col];
  }

  /**
   * @desc Permite asignar una Ficha a una posición dada del tablero.
   * @param {Object} piece Ficha del tablero.
   * @param {Number} row Fila del tablero.
   * @param {Number} col Columna del tablero.
   */
  setData(piece, row, col) {
    if (row >= CHESS_COLS || row < 0) {
      throw new Error('Fila especificada inválida');
    }
    if (col >= CHESS_COLS || col < 0) {
      throw new Error('Columna especificada inválida');
    }
    this._data[row][col] = piece;
  }

  /**
   * @desc Reinicia el tablero. En la práctica, esto elimina todas
   * las fichas sobre el mismo.
   */
  reset() {
    this._data = [];
    for (let row = 0; row < CHESS_ROWS; row++) {
      this._data[row] = [];
      for (let col = 0; col < CHESS_COLS; col++) {
        this._data[row][col] = null;
      }
    }
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessBoard = ChessBoard;
} else { 
  window.ChessBoard = ChessBoard;
}