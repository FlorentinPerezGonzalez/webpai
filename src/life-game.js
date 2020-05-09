'use strict';

let Cell;
let GeneralModule;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Cell = require('./cell.js').Cell;
  GeneralModule = require('./generalUtility.js').generalUtility;
} else {
  Cell = window.Cell;
  GeneralModule = window.generalUtility;
}

class LifeGame {
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this._data = [];
    for (let row = 0; row < rows; row++) {
      this._data[row] = [];
      for (let col = 0; col < cols; col++) {
        this._data[row][col] = new Cell;
      }
    }
  }

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  getCell(row, col) {
    return this._data[row][col];
  }

  initialize(nCells) {
    const generatedPositions = [];
    let counter = 0;
    while (counter < nCells) {
      const randomRow = generalUtility.getRandomInt(1, this._rows - 1);
      const randomCol = generalUtility.getRandomInt(1, this._cols - 1);
      const position = generatedPositions.indexOf({row: randomRow, col: randomCol});
      if (position === -1) {
        counter++;
        this._data[randomRow][randomCol].changeState();
        this._data[randomRow][randomCol].transferState();
        generatedPositions.push({row: randomRow, col: randomCol});
      }
    }
  }

  generation() {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        const cellSurrodingInformation = this._cellInformation(row, col);
        if (this._data[row][col].previousState === Cell.ALIVE) {
          if (cellSurrodingInformation < 2 || cellSurrodingInformation > 3) {
            this._data[row][col].changeState();
          }
        } else {
          if (cellSurrodingInformation === 3) {
            this._data[row][col].changeState();
          }
        }
      }
    }
    this._passTime();
  }

  _passTime() {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        this._data[row][col].transferState();
      }
    }
  }

  _cellInformation(row, col) {
    function consultData(row, col) {
      if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
        if (this._data[row][col].previousState === Cell.ALIVE) {
          return 1;
        } else {
          return 0;
        }
      }
      return 3;
    }
    let result = 0;
    result += consultData.call(this, row - 1, col -1);
    result += consultData.call(this, row - 1, col);
    result += consultData.call(this, row - 1, col + 1);
    result += consultData.call(this, row, col - 1);
    result += consultData.call(this, row, col + 1);
    result += consultData.call(this, row + 1, col - 1);
    result += consultData.call(this, row + 1, col);
    result += consultData.call(this, row + 1, col + 1);
    return result;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.LifeGame = LifeGame;
} else { 
  window.LifeGame = LifeGame;
}
