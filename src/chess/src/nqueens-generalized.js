/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase NQueensNG, que permite
 * resolver una versión modificada del problema de las N Reinas en el ajedrez.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports NQueensG
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase NQueensNG,
 * que permite resolver de manera iterativa una versión modificada del
 * problema de las N Reinas, en la que a las condiciones originales se la
 * ha sumado otra que impide que pueden darse más de dos reinas en una misma
 * línea sin la necesidad de que esta última coincida con los movimientos diagonales
 * que podrían darse desde una posición concreta.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let Queen;
let Line;
let Point;
let NQueens;
let generalUtility;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Line = require('./line.js').Line;
  Point = require('./point.js').Point;
  Queen = require('./queen.js').Queen;
  generalUtility = require('./generalUtility.js').generalUtility;
  NQueens = require('./nqueens.js').NQueens;
} else {
  Line = window.Line;
  Point = window.Point;
  Queen = window.Queen;
  generalUtility = window.generalUtility;
  NQueens = window.NQueens;
}

class NQueensG extends NQueens {
  /**
   * @desc Constructor de la clase NQueensNG
   * @param {Number} size Cantidad de reinas que tendrá el
   * problema.
   */
  constructor(size) {
    super(size);
  }

/**
 * @desc MÉTODO PROTEGIDO. Comprueba si las reinas de un tablero
 * entran en conflicto con una nueva especificada por 'point'
 * @param {Object} board Colección de reinas.
 * @param {Object} toCheckQueen Reina nueva a validar
 * @return {Boolean} True si no se da conflicto alguno
 */
  _checkIfConflict(board, toCheckQueen) {
    if (!Number.isInteger(toCheckQueen.row) ||
        !Number.isInteger(toCheckQueen.col)) {
      return true;
    }
    let result = false;
    for (const queen of board) {
      const xCoordinate = toCheckQueen.row;
      const yCoordinate = toCheckQueen.col;
      const toCheckPoint = new Point(xCoordinate, yCoordinate);
      const principalDiagonalPoint = new Point(xCoordinate + 1, yCoordinate - 1);
      const secondaryDiagonalPoint = new Point(xCoordinate - 1, yCoordinate - 1);
      const principalDiagonalLine = new Line(principalDiagonalPoint, toCheckPoint);
      const secondaryDiagonalLine = new Line(secondaryDiagonalPoint, toCheckPoint);
      const tempPoint = new Point(queen.row, queen.col);
      if ((principalDiagonalLine.isPointInLine(tempPoint)) ||
      (secondaryDiagonalLine.isPointInLine(tempPoint))) {
        result = true;
        break;
      }  else {
        for (const currentQueen of board) {
          const currentPoint = new Point(currentQueen.row, currentQueen.col);
          const betweenLine = new Line(toCheckPoint, tempPoint)
          betweenLine.isPointInLine(currentPoint);
          if (betweenLine.isPointInLine(currentPoint) &&
          ((currentPoint.x !== tempPoint.x) ||
          (currentPoint.y !== tempPoint.y))) {
            result = true;
            break;
          }
        }
        if (result) {
          break;
        }
      }
    }
    return result;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.NQueensG = NQueensG;
} else { 
  window.NQueensG = NQueensG;
}
