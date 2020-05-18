/**
 * @version 0.1.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase RandomWalk, que construye un
 * camino aleatorio sobre un grid determinado.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
 * @exports RandomWalk
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de la clase RandomWalk que
 * permite construir un camino aleatorio sobre un grid determinado. Este camino
 * se construye respetando los segmentos e intersecciones del grid, que, en esencia,
 * constituyen los caminos válidos.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *    - Ejemplos de caminos aleatorios:
 *      https://raw.githubusercontent.com/fsande/PAI-P09-RandomWalk/master/random-walk.png
 *    - Definición:
 *      https://en.wikipedia.org/wiki/Random_walk
 *
 * Historial de revisiones:
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

const SATURATION_INITIAL = 100;
const LIGHTNESS_INITIAL = 85;

let sleep;
let Line;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Line = require('./line.js').Line;
  sleep = require('./generalUtility.js').sleep;
} else {
  Line = window.Line;
  sleep = window.generalUtility.sleep;
}

class RandomWalk {
  /**
   * @desc Constructor de la clase RandomWlak
   * @param {Object} grid Objeto representativo de un grid sobre un canvas. 
   */
  constructor(grid) {
    this._grid = grid;
  }

  /**
   * @desc Setter.
   * @type {Object}
   */
  set grid(grid) {
    this._grid = grid;
  }

  /* istanbul ignore next */
  /**
   * @desc Método que genera un camino aleatorio sobre un grid.
   * @param {Canvas} canvas Canvas en el que está representado el grid.
   * @param {Colour} colour Color del camino aleatorio.
   */
  async generate(canvas) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const hue = 0;
    const saturation = SATURATION_INITIAL;
    let lightness = LIGHTNESS_INITIAL;
    const CONTEXT = canvas.getContext('2d');
    const ROWS = this._grid.rows;
    const COLS = this._grid.cols;
    let currentRow = parseInt(ROWS / 2);
    let currentCol = parseInt(COLS / 2);
    let currentPoint = this._grid.getPoint(currentRow,
      currentCol, canvas.width, canvas.height);
    let counter = 0;
    do {
      let colour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      CONTEXT.strokeStyle = colour;
      switch (getRandomInt(0, 4)) {
        case 0:
          currentRow--;
          break;
        case 1:
          currentCol--;
          break;
        case 2:
          currentRow++;
          break;
        case 3:
          currentCol++;
          break;
      }
      const nextPoint = this._grid.getPoint(currentRow,
        currentCol, canvas.width, canvas.height);
      (new Line(currentPoint, nextPoint)).draw(CONTEXT, 7);
      currentPoint = nextPoint;
      await sleep(100);
      counter++;
      if ((counter === 5) && (lightness > 13)) {
        counter = 0;
        lightness -= 3;
      }
    } while(((currentCol < COLS) && currentCol > 0) &&
        ((currentRow < ROWS) && (currentRow > 0)));
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.RandomWalk = RandomWalk;
} else { 
  window.RandomWalk = RandomWalk;
}
