let ChessBoard;
let ChessPiece;
let CanvasModule;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  CanvasModule = require('../src/canvas-utility.js');
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessBoard = window.ChessBoard;
  ChessPiece = window.ChessPiece;
  CanvasModule = window.canvasModule;
  imgLoader = window.imgLoader;
}

imgLoader.waitCharge(setup);

function setup() {
  const CANVAS = document.getElementById('canvas');
  CanvasModule.fixDpi(CANVAS);
  const board = new ChessBoard;
  const CONTEXT = CANVAS.getContext('2d');
  board.draw(CONTEXT, CANVAS.width);
}
