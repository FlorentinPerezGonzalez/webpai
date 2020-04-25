'use strict'

const X_FACTOR = 0;
const Y_FACTOR = 1;

let Point;
let canvasModule;
let Line;
let Axis
let CoordinateAxis;
let ParabolMovement;
let Physics;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
  Axis = require('../src/axis.js').Axis;
  ParabolMovement = require('../src/parabol-movement.js').ParabolMovement;
  Physics = require('../src/physics.js').Physics;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  Axis = window.Axis;
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

const BUTTON = document.getElementById('sendData');
if (BUTTON !== null) {
  BUTTON.addEventListener('click', () => {
    calculateParabolMovement();
  });
}

function calculateParabolMovement() {

}

function calculateRadians(angle) {
  return (Math.PI * angle / 180);
}

/* istanbul ignore next */
async function setup() {
  canvas = document.getElementById('canvas');
  dataCanvas = document.getElementById('dataCanvas');
  canvasModule.fixDpi(canvas);
  canvasModule.fixDpi(dataCanvas);
  context = canvas.getContext('2d');
  dataContext = dataCanvas.getContext('2d');
  // const axis = new CoordinateAxis;
  // let movement = new ParabolMovement(Math.PI / 4, 100, 10);
  // axis.setAxisData(canvas.width, canvas.height);
  // const factors = getRightFactors(axis, movement);
  // axis.xFactor = factors[X_FACTOR];
  // axis.yFactor = factors[Y_FACTOR];
  // canvasModule.clearScreen(dataContext, dataCanvas);
  // axis.draw(context);
  // const PHYSICS = new Physics(movement);
  // await PHYSICS.represent(axis, context);
  // displayData(movement, dataCanvas.height);
}

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
function displayData(movement, height) {
  dataContext.font = '20px arial';
  const SPACE = height / 15;
  let yCoordinate = height / 20;
  dataContext.fillText(`Tiempo transcurrido: ${movement.flightTime} s.`, 0, yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Distancia recorrida: ${movement.maxDistance} m.`, 0, yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura inicial: ${movement.initialHeight} m.`, 0, yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura máxima: ${movement.maxHeight} m.`, 0, yCoordinate);
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
