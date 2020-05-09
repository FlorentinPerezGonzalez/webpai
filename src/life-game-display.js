let LifeGame;
let Point;
let Rectangle;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  LifeGame = require('./life-game.js').LifeGame;
  Point = require('./point.js').Point;
  Rectangle = require('./rectangle.js').Rectangle;
} else {
  LifeGame = window.LifeGame;
  Point = window.Point;
  Rectangle = window.Rectangle;
}

class LifeGameDisplay {
  constructor(grid) {
    this._grid = grid;
    this._game = new LifeGame(grid.yCells + 2, grid.xCells + 2);
    this._firstIteration = true;
  }

  async oneStep(context, nCells = 20) {
    if (this._firstIteration) {
      this._game.initialize(nCells);
      this._firstIteration = false;
    } else {
      this._game.generation();
    }
    this._displayGame(context);
  }

  _displayGame(context) {
    const xIncrement = this._grid._cellWidth;
    const yIncrement = this._grid._cellHeight;
    for (let row = 1; row < this._game.rows - 1; row++) { // Comprobar
      for (let col = 1; col < this._game.cols - 1; col++) {
        if (this._game.getCell(row, col).state === 1) {
          const upLeftPoint = new Point((col - 1) * xIncrement, (row - 1) * yIncrement);
          const botRightPoint = new Point((col - 1) * xIncrement + xIncrement, (row - 1) * yIncrement + yIncrement);
          (new Rectangle(upLeftPoint, botRightPoint, 'red')).draw(context, true);
        }
      }
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.LifeGameDisplay = LifeGameDisplay;
} else { 
  window.LifeGameDisplay = LifeGameDisplay;
}
