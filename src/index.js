'use strict'

let canvasModule;
let BouncingBall;
if (typeof require !== 'undefined') {
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  BouncingBall = require('../src/bouncing-ball-display.js').BouncingBall;
} else {
  canvasModule = window.canvasModule;
  BouncingBall = window.BouncingBall;
}

const CANVAS = document.getElementById('canvas');
canvasModule.fixDpi(CANVAS);
const GAME = new BouncingBall(CANVAS, 30, 10, 10);
GAME.startGame();