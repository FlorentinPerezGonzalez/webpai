const CHESS_ROWS = 8;
const CHESS_COLS = 8;

class ChessBoard {

  constructor(rows = 8, cols = 8) {
    this._rows = rows;
    this._cols = cols; 
    this.reset();
  }

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  getData(row, col) {
    if (row >= CHESS_COLS || row < 0) {
      throw new Error('Fila especificada inválida');
    }
    if (col >= CHESS_COLS || col < 0) {
      throw new Error('Columna especificada inválida');
    }
    return this._data[row][col];
  }

  setData(piece, row, col) {
    if (row >= CHESS_COLS || row < 0) {
      throw new Error('Fila especificada inválida');
    }
    if (col >= CHESS_COLS || col < 0) {
      throw new Error('Columna especificada inválida');
    }
    this._data[row][col] = piece;
  }

  reset() {
    this._data = [];
    for (let row = 0; row < CHESS_ROWS; row++) {
      this._data[row] = [];
      for (let col = 0; col < CHESS_COLS; col++) {
        this._data[row][col] = null;
      }
    }
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessBoard = ChessBoard;
} else { 
  window.ChessBoard = ChessBoard;
}