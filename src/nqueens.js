/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase NQueens, que permite
 * resolver el problema de las N Reinas en el ajedrez..
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports NQueens
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase NQueens,
 * que permite resolver de manera iterativa el problema de las N Reinas en
 * el ajedrez.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let ChessBoard;
let Queen;
let Line;
let Point;
let generalUtility;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/chess-board.js').ChessBoard;
  Line = require('../src/line.js').Line;
  Point = require('../src/point.js').Point;
  Queen = require('../src/queen.js').Queen;
  generalUtility = require('../src/generalUtility.js').generalUtility;
} else {
  ChessBoard = window.ChessBoard;
  Line = window.Line;
  Point = window.Point;
  Queen = window.Queen;
  generalUtility = window.generalUtility;
}

class NQueens {
  /**
   * @desc Constructor de la clase NQueensNG
   * @param {Number} size Cantidad de reinas que tendrá el
   * problema.
   */
  constructor(size) {
    this._size = size;
  }

    /**
   * @desc MÉTODO PROTEGIDO. Crea una estructura de datos auxiliar para resolver
   * el problema de las N Reinas de manera iterativa.
   * @param {Array} xCoordinates Columnas del tablero libres (eje X).
   * @param {Number} xToChoose Siguiente posición en el eje X a elegir.
   * @param {Number} yToChoose Siguiente posición en el eje Y a elegir.
   * @return {Object} Estructura de datos auxiliar para el problema de
   *  las N Reinas.
   */
  _createDataContainer(xCoordinates, xToChoose, yToChoose) {
    return {
      xArray: xCoordinates,
      currentX: xToChoose,
      currentY: yToChoose,
    };
  }

  /**
   * @desc Resuelve el problema de las N Reinas.
   * @return {Array} Array de objetos donde cada uno representa una
   * configuración para un tablero de ajedrez con la disposición de las
   * reinas que determinan una solución.
   */
  resolve() {
    const result = [];
    const board = [];
    const dataContainer = [];
    const initialData = this._createDataContainer(
        generalUtility.range(0, this._size - 1, 1),
        0,
        0);
    dataContainer.push(initialData);
    while (dataContainer.length > 0) {
      const length = dataContainer.length;
      const currentX = dataContainer[length - 1].currentX;
      const currentY = dataContainer[length - 1].currentY;
      const xCoordinate = dataContainer[length - 1].xArray[currentX];
      const yCoordinate = currentY;
      const queen = new Queen(xCoordinate, yCoordinate, 0);
      if (this._checkIfConflict(board, queen)) {
        if (currentX < dataContainer[length - 1].xArray.length -1) {
          dataContainer[length - 1].currentX++;
        } else {
          dataContainer.pop();
          board.pop();
        }
      } else {
        board.push(queen);
        if (dataContainer[length - 1].xArray.length === 1) { // Solución encontrada
          result.push(board.slice());
          dataContainer.pop();
          board.pop();
          board.pop();
        } else {
          dataContainer[length - 1].currentX++;
          const newXArray = dataContainer[length - 1].xArray.slice();
          newXArray.splice(currentX, 1);
          const newData = this._createDataContainer(
              newXArray,
              0,
              currentY + 1);
          dataContainer.push(newData);
        }
      }
    }
    return this._buildConfiguration(result);
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
      }
    }
    return result;
  }

    /**
   * @desc MÉTODO PROTEGIDO. Construya una configuración de tablero de ajedrez.
   * @param {Array} result Array con dispociciones de reinas que conforman
   * soluciones para el problema de las N Reinas.
   * @return {Array} Array de configuraciones de tableros de ajedrez.
   */
  _buildConfiguration(result) {
    const configurations = [];
    for (const board of result) {
      configurations.push(Object.create(null));
      configurations[configurations.length - 1].size = this._size;
      let counter = 0;
      for (const piece of board) {
        configurations[configurations.length - 1][`piece${counter}`] = {};
        configurations[configurations.length - 1][`piece${counter}`].color = piece.color;
        configurations[configurations.length - 1][`piece${counter}`].type = 'queen';
        configurations[configurations.length - 1][`piece${counter}`].row = piece.row;
        configurations[configurations.length - 1][`piece${counter++}`].col = piece.col;
      }
    }
    return configurations;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.NQueens = NQueens;
} else { 
  window.NQueens = NQueens;
}
