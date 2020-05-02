'use strict'

let ChessBoard;
let ChessPiece;
let Pawn;
let Bishop;
let Queen;
let King;
let Knight;
let NQueens;
let Line;
let Point;
let generalUtility;
let CanvasModule;
let ChessRepresentation;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/chess-board.js').ChessBoard;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  Pawn = require('../src/pawn.js').Pawn;
  Bishop = require('../src/bishop.js').Bishop;
  Queen = require('../src/queen.js').Queen;
  King = require('../src/king.js').King;
  Knight = require('../src/knight').Knight;
  NQueens = require('../src/nqueens.js').NQueens;
  Line = require('../src/line.js').Line;
  Point = require('../src/point.js').Point;
  CanvasModule = require('../src/canvas-utility.js').canvasModule;
  generalUtility = require('../src/generalUtility.js').generalUtility;
  ChessRepresentation =
    require('../src/chess-representation.js').ChessRepresentation;
} else {
  ChessBoard = window.ChessBoard;
  ChessPiece = window.ChessPiece;
  Pawn = window.Pawn;
  Bishop = window.Bishop;
  Queen = window.Queen;
  King = window.King;
  Knight = window.Knight;
  NQueens = window.NQueens;
  Line = window.Line;
  Point = window.Point;
  generalUtility = window.generalUtility;
  CanvasModule = window.canvasModule;
  ChessRepresentation = window.ChessRepresentation;
}

imgLoader.waitCharge(setup);

function setup() {
  const CANVAS = document.getElementById('canvas');
  CanvasModule.fixDpi(CANVAS);
  const chess = new ChessRepresentation;
  const CONTEXT = CANVAS.getContext('2d');
  chess.buildInitial();
  chess.draw(CONTEXT, CANVAS.width);
  chess.displayPieces(CONTEXT, CANVAS.width);
  const nqueen = new NQueens(8);
  const result = nqueen.resolve();
  canvasModule.clearScreen(CONTEXT, CANVAS);
  chess.draw(CONTEXT, CANVAS.width);
  chess.loadConfiguration(result[0]);
  chess.displayPieces(CONTEXT, CANVAS.width);
  console.log(result[0]);
}

