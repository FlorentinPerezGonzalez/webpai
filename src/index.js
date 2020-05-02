let ChessBoard;
let ChessPiece;
let Pawn;
let CanvasModule;
let Bishop;
let Queen;
let Rook;
let King;
let Knight;
if (typeof require !== 'undefined') {
  CanvasModule = require('../src/canvas-utility.js');
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  Pawn = require('../src/pawn.js').Pawn;
  Bishop = require('../src/bishop.js').Bishop;
  Queen = require('../src/queen.js').Queen;
  King = require('../src/king.js').King;
  Knight = require('../src/knight').Knight;
  Rook = require('../src/rook.js').Rook;
} else {
  ChessBoard = window.ChessBoard;
  CanvasModule = window.canvasModule;
  ChessPiece = window.ChessPiece;
  Pawn = window.Pawn;
  Bishop = window.Bishop;
  Queen = window.Queen;
  King = window.King;
  Knight = window.Knight;
  Rook = window.Rook;
}

imgLoader.waitCharge(setup);

function setup() {
  const CANVAS = document.getElementById('canvas');
  CanvasModule.fixDpi(CANVAS);
  const board = new ChessBoard;
  const CONTEXT = CANVAS.getContext('2d');
  board.draw(CONTEXT, CANVAS.width);
  buildInitial(board);
  board.displayPieces(CONTEXT, CANVAS.width);
}

function buildInitial(board) {
  for (const piece in initialBoard) {
    const row = initialBoard[piece].row;
    const col = initialBoard[piece].col;
    const type = initialBoard[piece].type;
    const color = initialBoard[piece].color;
    if (type === 'pawn') {
      const data = new Pawn(row, col, color);
      board.setData(data, row, col);
    } else if (type === 'knight') {
      const data = new Knight(row, col, color);
      board.setData(data, row, col);
    } else if (type === 'king') {
      const data = new King(row, col, color);
      board.setData(data, row, col);
    } else if (type === 'queen') {
      const data = new Queen(row, col, color);
      board.setData(data, row, col);
    } else if (type === 'rook') {
      const data = new Rook(row, col, color);
      board.setData(data, row, col);
    } else if (type === 'bishop') {
      const data = new Bishop(row, col, color);
      board.setData(data, row, col);
    }
  }
}

const initialBoard = {
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