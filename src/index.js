/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
<<<<<<< HEAD
 * @file Módulo principal. Gestiona el funcionamiento del programa a través
 * de la asignación de eventos y obtención de referencias a componentes
 * del DOM.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports waitCharge
 * @exports pieceImg
=======
 * @file Contiene la implementación de un script que permite
 * representar un eje de coordanas sobre un canvas y representar
 * tiros parabólicos en el mismo.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports Arrow
>>>>>>> 6f255971c8ae7993441026795b12f04cbabe9245
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Este módulo está dirigido a permitir el correcto funcionamiento
 * del programa desarrollado para la práctica 11 de la asignatura "Programación de Aplicaciones
 * Interactivas". Se encarga de gestionar el correcto funcionamiento del mismo mediante la
 * asignación de eventos y obtención de referencias a elementos del DOM.
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let ChessBoard;
let ChessPiece;
let ChessRepresentation;
let CanvasModule;
let Pawn;
let Bishop;
let Queen;
let King;
let Knight;
let NQueens;
let NQueensG;
let Line;
let Point;
let generalUtility;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  Pawn = require('../src/pawn.js').Pawn;
  Bishop = require('../src/bishop.js').Bishop;
  Queen = require('../src/queen.js').Queen;
  King = require('../src/king.js').King;
  Knight = require('../src/knight').Knight;
  NQueens = require('../src/nqueens.js').NQueens;
  NQueensG = require('./nqueens-generalized.js').NQueensG;
  Line = require('../src/line.js').Line;
  CanvasModule = require('../src/canvas-utility.js').canvasModule;
  Point = require('../src/point.js').Point;
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
  NQueensG = window.NQueensG;
  Line = window.Line;
  Point = window.Point;
  CanvasModule = window.canvasModule;
  generalUtility = window.generalUtility;
  ChessRepresentation = window.ChessRepresentation;
}

imgLoader.waitCharge(setup);
let solutionCounter = 0;
let solutionCounterNG = 0;
let result8Queens;
let result8QueensNG;

/**
 * @desc Función que gestiona e inicializa el programa.
 * Obtiene referencias a elementos del DOM y asigna eventos
 * convenientemente.
 */
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
    canvasModule.clearScreen(CONTEXT, CANVAS);
    chess.draw(CONTEXT, CANVAS.width);
    if (CHECKBOX.checked) {
      solutionCounterNG = 0;
      if (result8QueensNG === undefined) {
        const NQUEENS_NG = new NQueensG(8);
        result8QueensNG = NQUEENS_NG.resolve();
      }
      chess.loadConfiguration(result8QueensNG[0]);
    } else {
      solutionCounter = 0;
      if (result8Queens === undefined) {
        nqueen = new NQueens(8);
        result8Queens = nqueen.resolve();
      }
      chess.loadConfiguration(result8Queens[0]);
    }
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
    if (CHECKBOX.checked) {
      if (solutionCounterNG + 1 < result8QueensNG.length) {
        solutionCounterNG++;
        canvasModule.clearScreen(CONTEXT, CANVAS);
        chess.draw(CONTEXT, CANVAS.width);
        chess.loadConfiguration(result8QueensNG[solutionCounterNG]);
        chess.displayPieces(CONTEXT, CANVAS.width);
        chess.showBoard(NOTATION);
      }
    } else {
      if (solutionCounter + 1 < result8Queens.length) {
        solutionCounter++;
        canvasModule.clearScreen(CONTEXT, CANVAS);
        chess.draw(CONTEXT, CANVAS.width);
        chess.loadConfiguration(result8Queens[solutionCounter]);
        chess.displayPieces(CONTEXT, CANVAS.width);
        chess.showBoard(NOTATION);
      }
    }
  });
}

