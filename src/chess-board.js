const CHESS_ROWS = 8;
const CHESS_COLS = 8;
const BOARD_LINES = 8;

class ChessBoard {
  static initialBoard = {
    "peonN1": {"color": 0,"type": "pawn","row": 6,"col": 0},
    "peonN2": {"color": 0,"type": "pawn","row": 6,"col": 1},
    "peonN3": {"color": 0,"type": "pawn","row": 6,"col": 2},
    "peonN4": {"color": 0,"type": "pawn","row": 6,"col": 3},
    "peonN5": {"color": 0,"type": "pawn","row": 6,"col": 4},
    "peonN6": {"color": 0,"type": "pawn","row": 6,"col": 5},
    "peonN7": {"color": 0,"type": "pawn","row": 6,"col": 6},
    "peonN8": {"color": 0,"type": "pawn","row": 6,"col": 7},
    "torreN1": {"color": 0,"type": "rook","row": 7,"col": 0},
    "torreN2": {"color": 0,"type": "rook","row": 7,"col": 7},
    "caballoN1": {"color": 0,"type": "knight","row": 7,"col": 1},
    "caballoN2": {"color": 0,"type": "knight","row": 7,"col": 6},
    "alfilN1": {"color": 0,"type": "knight","row": 7,"col": 2},
    "alfilN2": {"color": 0,"type": "knight","row": 7,"col": 5},
    "reyN": {"color": 0,"type": "knight","row": 7,"col": 3},
    "reinaN": {"color": 0,"type": "knight","row": 7,"col": 4},
    "peonB1": {"color": 1,"type": "pawn","row": 1,"col": 0},
    "peonB2": {"color": 1,"type": "pawn","row": 1,"col": 1},
    "peonB3": {"color": 1,"type": "pawn","row": 1,"col": 2},
    "peonB4": {"color": 1,"type": "pawn","row": 1,"col": 3},
    "peonB5": {"color": 1,"type": "pawn","row": 1,"col": 4},
    "peonB6": {"color": 1,"type": "pawn","row": 1,"col": 5},
    "peonB7": {"color": 1,"type": "pawn","row": 1,"col": 6},
    "peonB8": {"color": 1,"type": "pawn","row": 1,"col": 7},
    "torreB1": {"color": 1,"type": "rook","row": 0,"col": 0},
    "torreB2": {"color": 1,"type": "rook","row": 0,"col": 7},
    "caballoB1": {"color": 1,"type": "knight","row": 0,"col": 1},
    "caballoB2": {"color": 1,"type": "knight","row": 0,"col": 6},
    "alfilB1": {"color": 1,"type": "knight","row": 0,"col": 2},
    "alfilB2": {"color": 1,"type": "knight","row": 0,"col": 5},
    "reyB": {"color": 1,"type": "knight","row": 0,"col": 3},
    "reinaB": {"color": 1,"type": "knight","row": 0,"col": 4}
  }

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

  displayPieces(context, length) {
    const LENGHT_INCREMENT = length / BOARD_LINES;
    for (let row = 0; row < CHESS_ROWS; row++) {
      for (let col = 0; col < CHESS_COLS; col++) {
        if (this._data[row][col] !== null) {
          const img = this._data[row][col].img;
          console.log(this._data[row][col]);
          console.log(img);
          context.drawImage(img, LENGHT_INCREMENT * col, LENGHT_INCREMENT * row,
            LENGHT_INCREMENT, LENGHT_INCREMENT);
        }
      }
    }
  }

  builInitial() {
    for (const piece in ChessBoard.initialBoard) {
      const row = ChessBoard.initialBoard[piece].row;
      const col = ChessBoard.initialBoard[piece].col;
      const type = ChessBoard.initialBoard[piece].type;
      const color = ChessBoard.initialBoard[piece].color;
      if (type === 'pawn') {
        
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