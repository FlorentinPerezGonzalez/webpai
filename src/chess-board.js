const CHESS_ROWS = 8;
const CHESS_COLS = 8;

class ChessBoard {
  constructor() {
    this._rows = CHESS_ROWS;
    this._cols = CHESS_COLS; 
  }
  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  draw(context, height, width) {

  }
  
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessBoard = ChessBoard;
} else { 
  window.ChessBoard = ChessBoard;
}