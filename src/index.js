let ChessBoard;
let ChessPiece;
let Pawn;
let CanvasModule;
let Bishop;
let Queen;
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
} else {
  ChessBoard = window.ChessBoard;
  CanvasModule = window.canvasModule;
  ChessPiece = window.ChessPiece;
  Pawn = window.Pawn;
  Bishop = window.Bishop;
  Queen = window.Queen;
  King = window.King;
  Knight = window.Knight;
}

imgLoader.waitCharge(setup);

function setup() {
  const CANVAS = document.getElementById('canvas');
  CanvasModule.fixDpi(CANVAS);
  const board = new ChessBoard;
  const CONTEXT = CANVAS.getContext('2d');
  board.draw(CONTEXT, CANVAS.width);
  const peon = new Pawn(2, 2, 0);
  board.setData(peon, 2, 2);
  console.log(board.getData(2, 2));
  board.displayPieces(CONTEXT, CANVAS.width);
}
