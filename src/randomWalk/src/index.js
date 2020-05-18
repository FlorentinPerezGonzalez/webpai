/**
 * @version 0.1.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Grid, que representa
 * una cuadrícula sobre un plano.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
 * @exports setup
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

let Grid;
let RandomWalk;
let isNode = false;
let canvasModule;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  isNode = true;
  Grid = require('./grid.js').Grid;
  RandomWalk = require('./random-walk.js').RandomWalk;
  canvasModule = require('./canvas-utility.js');
} else {
  Grid = window.Grid;
  RandomWalk = window.RandomWalk;
  canvasModule = window.canvasModule;
}

const ROWS = 60;
const COLS = 90;

/* istanbul ignore next */
if (!isNode) {
  window.addEventListener('load', () => {
    window.setup = setup;
  });
}

/* istanbul ignore next */
/**
 * @desc Función de arranque. Crea los datos necesarios y gestiona el
 * funcionamiento general del programa dando paso a las distintas
 * funciones que lo componen en un orden determinado.
 */
function setup() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  const grid = new Grid(ROWS, COLS);
  grid.draw(CANVAS);
  const walk = new RandomWalk(grid);
  walk.generate(CANVAS);
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.setup = setup;
} else { 
  window.setup = setup;
}
