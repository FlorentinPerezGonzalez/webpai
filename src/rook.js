/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Rook, que representa
 * la pieza de la torre en el ajedrez.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports Rook
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
 * que representa la pieza de la torre en el ajedrez. Contiene toda la información
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

class Rook extends ChessPiece {
  /**
   * @desc Constructor de la clase Rook.
   * @param {Number} row Fila del tablero que ocupa la ficha.
   * @param {Number} col Columna del tablero que ocupa la ficha.
   * @param {Number} color Color de la ficha.
   */
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'R';
    if (color) {
      this._img = imgLoader.pieceImg.torreB;
    } else {
      this._img = imgLoader.pieceImg.torreN;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Rook = Rook;
} else { 
  window.Rook = Rook;
}