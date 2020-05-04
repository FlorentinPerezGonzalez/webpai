/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Queen, que representa
 * la pieza de la reina en el ajedrez.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports Queen
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase Queen,
 * que representa la pieza de la reina en el ajedrez. Contiene toda la información
 * referente a la misma, desde su color a su imagen representativa.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 03.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class Queen extends ChessPiece {
  /**
   * @desc Constructor de la clase Queen.
   * @param {Number} row Fila del tablero que ocupa la ficha.
   * @param {Number} col Columna del tablero que ocupa la ficha.
   * @param {Number} color Color de la ficha.
   */
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'Q';
    if (color) {
      this._img = imgLoader.pieceImg.reinaB;
    } else {
      this._img = imgLoader.pieceImg.reinaN;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Queen = Queen;
} else { 
  window.Queen = Queen;
}