'use strict';

let Line;
let Point;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Line = require('./line.js').Line;
  Point = require('./point.js').Point;
} else {
  Line = window.Line;
  Point = window.Point;
}

class Grid {
  static CELLS = 30;
  constructor(xCells, yCells, canvas) {
    this._cellWidth = canvas.width / Math.round(xCells);
    console.log(this._cellWidth);
    this._cellHeight = canvas.height / Math.round(yCells);
    console.log(this._cellHeight);
    this._xCells = Math.round(xCells);
    this._yCells = Math.round(yCells);
  }

  get yCells() {
    return this._yCells;
  }

  get xCells() {
    return this._xCells;
  }

  async draw(context) {
    // Horizontal Lines
    let currentY = this._cellHeight;
    for (let cell = 0; cell < this._yCells - 1; cell++) {
      const initialPoint = new Point(0, currentY);
      const finalPoint = new Point(canvas.width, currentY);
      (new Line(initialPoint, finalPoint, '#BFC9CA')).draw(context, 2);
      currentY += this._cellHeight;
    }
    // Vertical Lines
    let currentX = this._cellWidth;
    for (let cell = 0; cell < this._xCells - 1; cell++) {
      const initialPoint = new Point(currentX, 0);
      const finalPoint = new Point(currentX, canvas.height);
      (new Line(initialPoint, finalPoint, '#BFC9CA')).draw(context, 2);
      currentX += this._cellWidth;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Grid = Grid;
} else { 
  window.Grid = Grid;
}
