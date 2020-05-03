'use strict'

let ChessBoard;
let Pawn;
let Bishop;
let Queen;
let King;
let Knight;
let Rook;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/chess-board.js').ChessBoard;
  Pawn = require('../src/pawn.js').Pawn;
  Bishop = require('../src/bishop.js').Bishop;
  Queen = require('../src/queen.js').Queen;
  King = require('../src/king.js').King;
  Knight = require('../src/knight').Knight;
  Rook = require('../src/rook.js').Rook;
} else {
  ChessBoard = window.ChessBoard;
  Pawn = window.Pawn;
  Bishop = window.Bishop;
  Queen = window.Queen;
  King = window.King;
  Knight = window.Knight;
  Rook = window.Rook;
}

class ChessRepresentation {
  static initialBoard = {
    "size": 8,
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
    "alfilN1": {"color": 0,"type": "bishop","row": 7,"col": 2},
    "alfilN2": {"color": 0,"type": "bishop","row": 7,"col": 5},
    "reyN": {"color": 0,"type": "king","row": 7,"col": 3},
    "reinaN": {"color": 0,"type": "queen","row": 7,"col": 4},
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
    "alfilB1": {"color": 1,"type": "bishop","row": 0,"col": 2},
    "alfilB2": {"color": 1,"type": "bishop","row": 0,"col": 5},
    "reyB": {"color": 1,"type": "king","row": 0,"col": 3},
    "reinaB": {"color": 1,"type": "queen","row": 0,"col": 4}
  }

  constructor(boardSize = 8) {
    this._board = undefined;
    this._boardSize = boardSize;
  }

  buildInitial() {
    this.loadConfiguration(ChessRepresentation.initialBoard);
  }

  loadConfiguration(boardConfig) {
    this._boardSize = boardConfig.size;
    this._board = new ChessBoard(this._boardSize, this._boardSize);
    for (const piece in boardConfig) {
      const row = boardConfig[piece].row;
      const col = boardConfig[piece].col;
      const type = boardConfig[piece].type;
      const color = boardConfig[piece].color;
      if (type === 'pawn') {
        const data = new Pawn(row, col, color);
        this._board .setData(data, row, col);
      } else if (type === 'knight') {
        const data = new Knight(row, col, color);
        this._board .setData(data, row, col);
      } else if (type === 'king') {
        const data = new King(row, col, color);
        this._board .setData(data, row, col);
      } else if (type === 'queen') {
        const data = new Queen(row, col, color);
        this._board .setData(data, row, col);
      } else if (type === 'rook') {
        const data = new Rook(row, col, color);
        this._board .setData(data, row, col);
      } else if (type === 'bishop') {
        const data = new Bishop(row, col, color);
        this._board .setData(data, row, col);
      }
    }
  }

  displayPieces(context, length) {
    if (this._board !== undefined) {
      const LENGHT_INCREMENT = length / this._boardSize;
      for (let row = 0; row < this._boardSize; row++) {
        for (let col = 0; col < this._boardSize; col++) {
          if (this._board.getData(row, col) !== null) {
            const img = this._board.getData(row, col).img;
            context.drawImage(img, LENGHT_INCREMENT * col, LENGHT_INCREMENT * row,
              LENGHT_INCREMENT, LENGHT_INCREMENT);
          }
        }
      }
    }
  }

  draw(context, length) {
    const BROWN_COLOR = '#946f51';
    const WHITE_COLOR = '	#F0D9B5';
    const LENGHT_INCREMENT = length / this._boardSize;
    let isBrown = false;
    for (let row = 0; row < this._boardSize; row++) {
      isBrown = !isBrown;
      for (let col = 0; col < this._boardSize; col++) {
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

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessRepresentation = ChessRepresentation;
} else { 
  window.ChessRepresentation = ChessRepresentation;
}