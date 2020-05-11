/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase LifeGame, que permite
 * ejecutar el algoritmo del "Juego de la vida".
 * @copyright Florentín Pérez Glez 2020
 * @since 09.05.2020
 * @exports LifeGame
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
 * Contenido detallado: Contiene la implementación de la clase LifeGame, que permite
 * la ejecución del algortimo del "Juego de la vida". La clase únicamente se encarga
 * de los cálculos, y no representa visualmente ni de ninguna otra manera estos resultados.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *
 */

'use strict';

let Cell;
let GeneralModule;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Cell = require('./cell.js').Cell;
  GeneralModule = require('./generalUtility.js').generalUtility;
} else {
  Cell = window.Cell;
  GeneralModule = window.generalUtility;
}

class LifeGame {
  /**
   * @desc Constructor de la clase LifeGame
   * @param {Number} rows Filas de la matriz de almacenamiento.
   * @param {Number} cols Columnas de la amtriz de almacenamiento.
   */
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this._data = [];
    for (let row = 0; row < rows; row++) {
      this._data[row] = [];
      for (let col = 0; col < cols; col++) {
        this._data[row][col] = new Cell;
      }
    }
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get rows() {
    return this._rows;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get cols() {
    return this._cols;
  }

  /**
   * @desc Método que permite obtener una célula concreta de la
   * estructura de datos.
   * @param {Number} row Fila que ocupa la célula. 
   * @param {Number} col Column que ocupa la célula.
   */
  getCell(row, col) {
    return this._data[row][col];
  }

  /**
   * @desc Método que inicializa el algortimo. Da vida a nCells células
   * elegidas aleatoriamente.
   * @param {Number} nCells Cantidad de células.
   */
  initialize(nCells) {
    const generatedPositions = [];
    let counter = 0;
    while (counter < nCells) {
      const randomRow = generalUtility.getRandomInt(0, this._rows);
      const randomCol = generalUtility.getRandomInt(0, this._cols);
      const position = generatedPositions.indexOf({row: randomRow, col: randomCol});
      if (position === -1) {
        counter++;
        this._data[randomRow][randomCol].changeState();
        this._data[randomRow][randomCol].transferState();
        generatedPositions.push({row: randomRow, col: randomCol});
      }
    }
  }

  /**
   * @desc Produce la siguiente generación del algortimo.
   */
  generation() {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        const cellSurrodingInformation = this._cellInformation(row, col);
        if (this._data[row][col].previousState === Cell.ALIVE) {
          if (cellSurrodingInformation < 2 || cellSurrodingInformation > 3) {
            this._data[row][col].changeState();
          }
        } else {
          if (cellSurrodingInformation === 3) {
            this._data[row][col].changeState();
          }
        }
      }
    }
    this._passTime();
  }

  /**
   * @desc MÉTODO PROTEGIDO. Simula "el paso del tiempo". Es decir,
   * asigne el estado previo de cada célula a su estado actual.
   */
  _passTime() {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        this._data[row][col].transferState();
      }
    }
  }

  /**
   * @desc MÉTODO PROTEGIDO. Permite obtener información de las células,
   * en concreto, cuántos vecinos vivos tiene.
   * @param {Number} row Fila que ocupa la célula a comprobar.
   * @param {Number} col Columna que ocupa la célula a comprobar.
   */
  _cellInformation(row, col) {
    function consultData(row, col) {
      if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
        if (this._data[row][col].previousState === Cell.ALIVE) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    }
    let result = 0;
    result += consultData.call(this, row - 1, col -1);
    result += consultData.call(this, row - 1, col);
    result += consultData.call(this, row - 1, col + 1);
    result += consultData.call(this, row, col - 1);
    result += consultData.call(this, row, col + 1);
    result += consultData.call(this, row + 1, col - 1);
    result += consultData.call(this, row + 1, col);
    result += consultData.call(this, row + 1, col + 1);
    return result;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.LifeGame = LifeGame;
} else { 
  window.LifeGame = LifeGame;
}
