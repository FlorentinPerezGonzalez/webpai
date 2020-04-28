/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de un script que permite
 * representar un eje de coordanas sobre un canvas y representar
 * tiros parabólicos en el mismo.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports Arrow
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene una serie de funciones definidas
 * que están dirigidas a permitir la representación de tiros
 * parabólicos sobre un sistema de coordenadas generado dinámicamente.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict'

const X_FACTOR = 0;
const Y_FACTOR = 1;

let Point;
let canvasModule;
let Line;
let Axis
let CoordinateAxis;
let ParabolMovement;
let Arrow;
let Physics;

if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
  Axis = require('../src/axis.js').Axis;
  ParabolMovement = require('../src/parabol-movement.js').ParabolMovement;
  Physics = require('../src/physics.js').Physics;
  Arrow = require('../src/arrow.js').Arrow;
  /* istanbul ignore next */
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  Axis = window.Axis;
  Arrow = window.Arrow;
  CoordinateAxis = window.CoordinateAxis;
  ParabolMovement = window.ParabolMovement;
  Physics = window.Physics;
}

let canvas;
let context;
let dataCanvas;
let dataContext;
let inputSpeed;
let inputHeight;
let inputAngle;
let firstUseflag = true;
let axis;
const ARROW_SIZE = 80;
let BUTTON;
let CHECK_BOX;

let isCheckBoxActive = false;

/* istanbul ignore next */
/**
 * @desc Función que se encarga de calcular un movimiento parabólico y
 * representarlo sobre un canvas. De igual manera, también representa
 * un eje de coordenadas y una flecha que indica la dirección del
 * tiro parabólico.
 */
async function calculateParabolMovement() {
  canvasModule.clearScreen(dataContext, dataCanvas);
  const initialHeight = inputHeight.value;
  const initialSpeed = inputSpeed.value;
  let angle = inputAngle.value;
  if (!initialSpeed || !initialHeight || !angle) {
    dataContext.font = '20px arial';
    let yCoordinate = 20;
    dataContext.fillText(`Introduzca un valor válido para cada input`, 0,
      yCoordinate);
  } else {
    angle = calculateRadians(angle);
    const movement = new ParabolMovement(angle, initialSpeed, 1, initialHeight);
    if (!isCheckBoxActive) {
      if (firstUseflag) {
        firstUseflag = !firstUseflag;
        axis.setAxisData(canvas.width, canvas.height);
        const factors = getRightFactors(axis, movement);
        axis.xFactor = factors[X_FACTOR];
        axis.yFactor = factors[Y_FACTOR];
        axis.draw(context);
      }
      const INITIAL_POINT = new Point(axis.initialPoint.x,
          axis.initialPoint.y - initialHeight);
      const arrow = new Arrow(INITIAL_POINT, ARROW_SIZE);
      arrow.draw(context, angle);
      const PHYSICS = new Physics(movement);
      await PHYSICS.represent(axis, context);
    }
    displayData(movement, dataCanvas.height);
  }
}

/**
 * @desc Función que permite pasar un ángulo de grados a radianes.
 * @param {Number} angle Ángulo en grados. 
 */
function calculateRadians(angle) {
  return (Math.PI * angle / 180);
}

/* istanbul ignore next */
/**
 * @desc Función gestiora del proceso. Se encarga de inicializar
 * las referrencias a nodos del DOM.
 */
async function setup() {
  canvas = document.getElementById('canvas');
  dataCanvas = document.getElementById('dataCanvas');
  canvasModule.fixDpi(canvas);
  canvasModule.fixDpi(dataCanvas);
  context = canvas.getContext('2d');
  dataContext = dataCanvas.getContext('2d');
  inputSpeed = document.getElementById('initialSpeed');
  inputAngle = document.getElementById('angle');
  inputHeight = document.getElementById('initialHeight');
  BUTTON = document.getElementById('sendData');
  CHECK_BOX = document.getElementById('checkBox');
  if (BUTTON !== null) {
    BUTTON.addEventListener('click', () => {
      calculateParabolMovement();
    });
  }
  if (CHECK_BOX !== null) {
    CHECK_BOX.addEventListener('click', () => {
      isCheckBoxActive = !isCheckBoxActive;
    });
  }
  axis = new CoordinateAxis;
}

/**
 * @desc Función que permite obtener el valor multiplicativo a aplicar
 * a un eje de coordenadas para obtener la escala deseada.
 * @param {Object} axis Objeto que representa un eje de coordenadas.
 * @param {Object} movement Objeto que representa un tiro parabólico.
 * @return {Array} Array de dos elementos. El primero, es la escala a
 * aplicar al eje X. El segundo, la del eje Y.
 */
function getRightFactors(axis, movement) {
  const MAX_DISTANCE = movement.maxDistance;
  const MAX_HEIGHT = movement.maxHeight;
  const INITIAL_POINT = axis.initialPoint;
  const MAX_X_VALUE = INITIAL_POINT.x + MAX_DISTANCE;
  const MAX_Y_VALUE = INITIAL_POINT.y - MAX_HEIGHT;
  const CURRENT_MAX_X_AXIS = INITIAL_POINT.x + axis.xLength;
  const CURRENT_MAX_Y_AXIS = INITIAL_POINT.y - axis.yLength;
  return [
    Math.ceil((MAX_X_VALUE / CURRENT_MAX_X_AXIS)), 
    Math.ceil((CURRENT_MAX_Y_AXIS / MAX_Y_VALUE))
  ];
}

/* istanbul ignore next */
/**
 * @desc Función que permite mostrar los datos referentes a un tiro parabólico
 * sobre un canvas concreto.
 * @param {Object} Movement Objeto que representa al tiro parabólico.
 * @param {Number} height Altura del canvas sobre el que se representarán
 * los datos.
 */
function displayData(movement, height) {
  dataContext.font = '20px arial';
  const SPACE = height / 10;
  let yCoordinate = 25;
  dataContext.fillText(`Tiempo transcurrido: ${movement.flightTime} s.`, 10,
    yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Distancia recorrida: ${movement.maxDistance} m.`, 10,
    yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura inicial: ${movement.initialHeight} m.`, 10,
    yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura máxima: ${movement.maxHeight} m.`, 10,
    yCoordinate);
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.main = {};
  exports.main.setup = setup;
  exports.main.calculateRadians = calculateRadians;
} else { 
  window.main = {};
  window.main.setup = setup;
  window.main.calculateRadians = calculateRadians;
}
