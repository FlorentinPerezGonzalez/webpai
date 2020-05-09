/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase LifeGameDisplay, que permite
 * ejecutar el algoritmo del "Juego de la vida".
 * @copyright Florentín Pérez Glez 2020
 * @since 09.05.2020
 * @exports LifeGameDisplay
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
 * Contenido detallado: Contiene la implementación de la clase LifeGameDisplay, que permite
 * la representación gráfica del "Juego de la vida".
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *
 */

'use strict';

let LifeGame;
let Point;
let Rectangle;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  LifeGame = require('./life-game.js').LifeGame;
  Point = require('./point.js').Point;
  Rectangle = require('./rectangle.js').Rectangle;
} else {
  LifeGame = window.LifeGame;
  Point = window.Point;
  Rectangle = window.Rectangle;
}

class LifeGameDisplay {
  /**
   * @desc Constructor de la clase LifeGameDisplay.
   * @param {Object} grid Objeto que simboliza una malla. Sobre ella
   * se realizará la representación. 
   */
  constructor(grid) {
    this._grid = grid;
    this._game = new LifeGame(grid.yCells + 2, grid.xCells + 2);
    this._firstIteration = true;
  }

  /**
   * @desc Método que permite calcular y representar la siguiente
   * generación del juego de la vida.
   */
  async oneStep(context, nCells = 20) {
    if (this._firstIteration) {
      this._game.initialize(nCells);
      this._firstIteration = false;
    } else {
      this._game.generation();
    }
    this._displayGame(context);
  }

  /**
   * @desc MÉTODO PROTEGIO. Muestra sobre un canvas el estado actual del
   * "Juego de la vida".
   * @param {Context} context Contexto del canvas sobre el que se realiza la
   * representación.
   */
  _displayGame(context) {
    const xIncrement = this._grid._cellWidth;
    const yIncrement = this._grid._cellHeight;
    for (let row = 1; row < this._game.rows - 1; row++) { // Comprobar
      for (let col = 1; col < this._game.cols - 1; col++) {
        if (this._game.getCell(row, col).state === 1) {
          const upLeftPoint = new Point((col - 1) * xIncrement, (row - 1) * yIncrement);
          const botRightPoint = new Point((col - 1) * xIncrement + xIncrement, (row - 1) * yIncrement + yIncrement);
          (new Rectangle(upLeftPoint, botRightPoint, 'red')).draw(context, true);
        }
      }
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.LifeGameDisplay = LifeGameDisplay;
} else { 
  window.LifeGameDisplay = LifeGameDisplay;
}
