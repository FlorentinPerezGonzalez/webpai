let ChessBoard;
let ChessPiece;
let CanvasModule;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  CanvasModule = require('../src/canvas-utility.js');
} else {
  ChessBoard = window.ChessBoard;
  ChessPiece = window.ChessPiece;
  CanvasModule = window.canvasModule;
  console.log(CanvasModule);
}

const CANVAS = document.getElementById('canvas');
CanvasModule.fixDpi(CANVAS);
const board = new ChessBoard;
const CONTEXT = CANVAS.getContext('2d');
board.draw(CONTEXT, CANVAS.width);