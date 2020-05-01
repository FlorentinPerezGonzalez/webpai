const CHESS_ROWS = 8;
const CHESS_COLS = 8;
const BOARD_LINES = 7;

class ChessBoard {
  constructor() {
    this._rows = CHESS_ROWS;
    this._cols = CHESS_COLS; 
    this.reset();
  }

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  draw(context, length) {
    const BROWN_COLOR = 'tan';
    const WHITE_COLOR = '	cornsilk';
    const LENGHT_INCREMENT = length / BOARD_LINES;
    let isBrown = false;
    for (let row = 0; row < CHESS_ROWS; row++) {
      isBrown = !isBrown;
      for (let col = 0; col < CHESS_COLS; col++) {
        if (isBrown) {
          context.fillStyle = BROWN_COLOR;
        } else {
          context.fillStyle = WHITE_COLOR;
        }
        isBrown = !isBrown;
        context.fillRect(LENGHT_INCREMENT * col,
                        LENGHT_INCREMENT * row,
                        LENGHT_INCREMENT,
                        LENGHT_INCREMENT)
      }
    }
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

  showBoard(domElement) {
    for (let row = 0; row < CHESS_ROWS; row++) {
      for (let col = 0; col < CHESS_COLS; col++) {
        const output = this._data[row][col].showPosition();
        domElement.innerText += output;
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