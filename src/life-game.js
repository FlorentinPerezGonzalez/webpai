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

  initialize(nCells) {
    const generatedPositions = [];
    let counter = 0;
    while (counter < nCells) {
      const randomRow = generalUtility.getRandomInt(0, this._rows);
      const randomCol = generalUtility.getRandomInt(0, this._cols);
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
    let result = 0;
    let rowCounter = row - 1;
    while (rowCounter <= row + 1) {
      if (rowCounter < this._rows && rowCounter >= 0) {
        if (rowCounter === row -1 ) {
          let colCounter = col - 1;
          while (colCounter <= col + 1) {
            if (colCounter < this._cols && colCounter >= 0) {
              if (this._data[rowCounter, colCounter].state === Cell.ALIVE) {
                result++;
              }
            }
            colCounter++;
          }
        } else if (rowCounter === row) {
          let colCounter = col - 1;
          while (colCounter <= col + 1) {
            if (colCounter < this._cols && colCounter >= 0 && colCounter !== col) {
              if (this._data[rowCounter, colCounter].state === Cell.ALIVE) {
                result++;
              }
            }
            colCounter++;
          }
        } else {
          let colCounter = col - 1;
          while (colCounter <= col + 1) {
            if (colCounter < this._cols && colCounter >= 0) {
              if (this._data[rowCounter, colCounter].state === Cell.ALIVE) {
                result++;
              }
            }
            colCounter++;
          }
        }
      }
      rowCounter++;
    }
    return result;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.LifeGame = LifeGame;
} else { 
  window.LifeGame = LifeGame;
}
