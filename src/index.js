'use strict'

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
  const axis = new CoordinateAxis(2, 2);
  const CONTEXT = CANVAS.getContext('2d');
  axis.draw(CONTEXT, CANVAS.clientWidth, CANVAS.height);
  let movement = new ParabolMovement(Math.PI / 4, 50, 10);
  const PHYSICS = new Physics(movement);
  PHYSICS.represent(axis, CONTEXT);
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.setup = setup;
} else { 
  window.setup = setup;
}
