'use strict'

let Point;
let canvasModule;
let Line;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
}