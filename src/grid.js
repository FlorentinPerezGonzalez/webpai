/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Grid, que representa
 * un grid de casillas cuadradas.
 * @copyright Florentín Pérez Glez 2020
 * @since 09.05.2020
 * @exports Grid
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
 * Contenido detallado: Contiene la implementación de la clase Grid, que representa
 * una malla de casillas cuadradas. El tamaño de las respectivas casillas se calcula
 * dinámicamente para ajustarlo al tamaño del lienzo.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *
 */

'use strict';

let Line;
let Point;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Line = require('./line.js').Line;
  Point = require('./point.js').Point;
} else {
  Line = window.Line;
  Point = window.Point;
}

class Grid {
  static CELLS = 30;
  /**
   * @desc Constructor de la clase Grid.
   * @param {Number} xCells Número en el eje X.
   * @param {Number} yCells Número en el eje Y.
   * @param {Canvas} canvas Canvas sobre el que se representará el grid.
   */
  constructor(xCells, yCells, canvas) {
    this._cellWidth = canvas.width / Math.round(xCells);
    console.log(this._cellWidth);
    this._cellHeight = canvas.height / Math.round(yCells);
    console.log(this._cellHeight);
    this._xCells = Math.round(xCells);
    this._yCells = Math.round(yCells);
  }
  /**
   * @desc Getter.
   * @type {Number}
   */
  get yCells() {
    return this._yCells;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get xCells() {
    return this._xCells;
  }

  /**
   * @desc Método que permite dibujar la malla sobre un Canvas.
   * @param {Context} context Contexto del canvas sobre el que se
   * produce el dibujo.
   */
  async draw(context) {
    // Horizontal Lines
    let currentY = this._cellHeight;
    for (let cell = 0; cell < this._yCells - 1; cell++) {
      const initialPoint = new Point(0, currentY);
      const finalPoint = new Point(canvas.width, currentY);
      (new Line(initialPoint, finalPoint, '#BFC9CA')).draw(context, 2);
      currentY += this._cellHeight;
    }
    // Vertical Lines
    let currentX = this._cellWidth;
    for (let cell = 0; cell < this._xCells - 1; cell++) {
      const initialPoint = new Point(currentX, 0);
      const finalPoint = new Point(currentX, canvas.height);
      (new Line(initialPoint, finalPoint, '#BFC9CA')).draw(context, 2);
      currentX += this._cellWidth;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Grid = Grid;
} else { 
  window.Grid = Grid;
}
