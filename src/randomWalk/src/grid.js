/**
 * @version 0.1.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Grid, que representa
 * una cuadrícula sobre un plano.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
 * @exports Grid
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de la clase Grid,
 * que permite representar una cuadrícula sobre un plano. Esta cuadrícula
 * fragmenta un plano en un conjunto de celdas divididas entre sí por
 * filas y columnas.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *
 * Historial de revisiones:
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

let Point;
let Line;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('./point.js').Point;
  Line = require('./line.js').Line;
} else {
  Point = window.Point;
  Line = window.Line;
}

const DEFAULT_SIZE = 2;

class Grid {
  /**
   * @desc Constructor de la clase Grid.
   * @param {Number} rows Filas de la cuadrícula.
   * @param {String} cols Columnas de la cuadrícula.
   */
  constructor(rows = DEFAULT_SIZE, cols = DEFAULT_SIZE) {
    this._rows = rows;
    this._cols = cols;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get rows() {
    return this._rows;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get cols() {
    return this._cols;
  }

  set rows(nRows) {
    this._rows = nRows;
  }

  set cols(nCols) {
    this._cols = nCols;
  }

  /**
   * @desc Método que devuelve las coordenadas reales de un punto del grid.
   * Se deben proveer las dimensiones del "lienzo".
   * @param {Number} nRow Fila que ocupa el punto.
   * @param {Number} nCol Columna que ocupa el punto.
   * @param {Number} width Anchura del "lienzo".
   * @param {Number} height Altura del "lienzo".
   * @return {Object} Punto del grid cuyas coordenadas están ajustadas al
   * "lienzo".
   */
  getPoint(nRow, nCol, width, height) {
    const widthIncrement = width / this._cols;
    const heightIncrement = height / this._rows;
    let realX = ((widthIncrement * nCol) < width) ?
      widthIncrement * nCol : width;
    let realY = ((heightIncrement * nRow) < height) ?
      heightIncrement * nRow : height;
    return new Point(realX, realY);
  }

  /* istanbul ignore next */
  /**
   * @desc Método que permite dibujar el grid sobre un canvas dado.
   * @param {Canvas} canvas Referencia al canvas sobre el que se dibujará el
   * grid.
   */
  draw(canvas) {
    const widthIncrement = canvas.width / this._cols;
    const heightIncrement = canvas.height / this._rows;
    const context = canvas.getContext('2d');
    for (let currentX = 0; currentX < canvas.width; currentX += widthIncrement) {
      const initialPoint = new Point(currentX, 0);
      const finalPoint = new Point(currentX, canvas.height);
      (new Line(initialPoint, finalPoint)).draw(context, 2);
    }
    for (let currentY = 0; currentY < canvas.height; currentY += heightIncrement) {
      const initialPoint = new Point(0, currentY);
      const finalPoint = new Point(canvas.width, currentY);
      (new Line(initialPoint, finalPoint)).draw(context, 2);
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Grid = Grid;
} else { 
  window.Grid = Grid;
}
