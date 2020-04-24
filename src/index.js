'use strict'

let Point;
let canvasModule;
let Line;
let Axis;
let CoordinateAxis;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  Axis = require('../src/axis.js').Axis;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  Axis = window.Axis;
  CoordinateAxis = window.CoordinateAxis;
}

function setup() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  const axis = new CoordinateAxis(2, 2);
  const CONTEXT = CANVAS.getContext('2d');
  axis.draw(CONTEXT, CANVAS.clientWidth, CANVAS.height);
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.setup = setup;
} else { 
  window.setup = setup;
}
