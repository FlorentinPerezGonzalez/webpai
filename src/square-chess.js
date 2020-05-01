class SquareChess {
  constructor(row, col, length) {
    this._row = row;
    this._col = col;
    this._length = length;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.SquareChess = SquareChess;
} else { 
  window.SquareChess = SquareChess;
}