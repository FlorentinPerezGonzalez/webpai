let Grid;
let CanvasModule;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Grid = require('./grid.js').Grid;
  CanvasModule = require('../canvas-utility.js').canvasModule;
} else {
  Grid = window.Grid;
  CanvasModule = window.canvasModule;
}

const CANVAS = document.getElementById('canvas');
CanvasModule.fixDpi(CANVAS);
const CONTEXT = CANVAS.getContext("2d");
console.log(CANVAS.height);
// CANVAS.width = window.innerWidth * 2 / 3;
// CANVAS.height = window.innerHeight * 3 / 4;
console.log(CANVAS.height);
const GRID = new Grid(Grid.CELLS * (CANVAS.width / CANVAS.height), Grid.CELLS, CANVAS);
GRID.draw(CONTEXT);