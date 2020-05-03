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
let solutionCounter = 0;
let result8Queens;

function setup() {
  const CANVAS = document.getElementById('canvas');
  CanvasModule.fixDpi(CANVAS);
  const CONTEXT = CANVAS.getContext('2d');
  const GEN_SOLUTION = document.getElementById('GenerarSolucion');
  const NEXT_SOLUTION = document.getElementById('SiguienteSolucion');
  const CHESS_GAME = document.getElementById('PartidaAjedrez');
  const CHECKBOX = document.getElementById('cbox1');
  const NOTATION = document.getElementById('notacion');
  let nqueen;
  let chess = new ChessRepresentation;
  chess.draw(CONTEXT, CANVAS.width);
  GEN_SOLUTION.addEventListener('click', () => {
    solutionCounter = 0;
    canvasModule.clearScreen(CONTEXT, CANVAS);
    chess.draw(CONTEXT, CANVAS.width);
    if (result8Queens === undefined) {
      nqueen = new NQueens(8);
      result8Queens = nqueen.resolve();
    }
    chess.loadConfiguration(result8Queens[0]);
    chess.displayPieces(CONTEXT, CANVAS.width);
    chess.showBoard(NOTATION);
  });
  CHESS_GAME.addEventListener('click', () => {
    canvasModule.clearScreen(CONTEXT, CANVAS);
    chess.draw(CONTEXT, CANVAS.width);
    chess.buildInitial();
    chess.displayPieces(CONTEXT, CANVAS.width);
  });
  NEXT_SOLUTION.addEventListener('click', () => {
    console.log(result8Queens.lenght);
    if (solutionCounter + 1 < result8Queens.length) {
      solutionCounter++;
      canvasModule.clearScreen(CONTEXT, CANVAS);
      chess.draw(CONTEXT, CANVAS.width);
      chess.loadConfiguration(result8Queens[solutionCounter]);
      chess.displayPieces(CONTEXT, CANVAS.width);
      chess.showBoard(NOTATION);
    }
  });
}

