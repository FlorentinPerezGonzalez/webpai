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

function setup() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  const axis = new CoordinateAxis;
  let movement = new ParabolMovement(Math.PI / 4, 100, 10);
  axis.setAxisData(CANVAS.width, CANVAS.height);
  const factors = getRightFactors(axis, movement);
  axis.xFactor = factors[X_FACTOR];
  axis.yFactor = factors[Y_FACTOR];
  const CONTEXT = CANVAS.getContext('2d');
  axis.draw(CONTEXT);
  const PHYSICS = new Physics(movement);
  PHYSICS.represent(axis, CONTEXT);
}

function getRightFactors(axis, movement) {
  const MAX_DISTANCE = movement.maxDistance;
  const INITIAL_POINT = axis.initialPoint;
  const MAX_X_VALUE = INITIAL_POINT.x + MAX_DISTANCE;
  const CURRENT_MAX_X_AXIS = INITIAL_POINT.x + axis.xLength;
  console.log(MAX_X_VALUE);
  console.log(CURRENT_MAX_X_AXIS);
  console.log(Math.ceil(MAX_X_VALUE / CURRENT_MAX_X_AXIS));
  return [
    Math.ceil((MAX_X_VALUE / CURRENT_MAX_X_AXIS)), 
    1
  ];
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.setup = setup;
} else { 
  window.setup = setup;
}
