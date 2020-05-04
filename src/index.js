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
<<<<<<< HEAD
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

=======
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene una serie de funciones definidas
 * que están dirigidas a permitir la representación de tiros
 * parabólicos sobre un sistema de coordenadas generado dinámicamente.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict'

const X_FACTOR = 0;
const Y_FACTOR = 1;

let Point;
let canvasModule;
let Line;
let Axis
let CoordinateAxis;
let ParabolMovement;
let Arrow;
let Physics;

/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
  Axis = require('../src/axis.js').Axis;
  ParabolMovement = require('../src/parabol-movement.js').ParabolMovement;
  Physics = require('../src/physics.js').Physics;
  Arrow = require('../src/arrow.js').Arrow;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  Axis = window.Axis;
  Arrow = window.Arrow;
  CoordinateAxis = window.CoordinateAxis;
  ParabolMovement = window.ParabolMovement;
  Physics = window.Physics;
}

let canvas;
let context;
let dataCanvas;
let dataContext;
let inputSpeed;
let inputHeight;
let inputAngle;
let firstUseflag = true;
let axis;
const ARROW_SIZE = 80;
const INITIAL_Y = 20;
const Y_COORDINATE = 25;
let BUTTON;
let CHECK_BOX;

let isCheckBoxActive = false;

/* istanbul ignore next */
/**
 * @desc Función que se encarga de calcular un movimiento parabólico y
 * representarlo sobre un canvas. De igual manera, también representa
 * un eje de coordenadas y una flecha que indica la dirección del
 * tiro parabólico.
 */
async function calculateParabolMovement() {
  canvasModule.clearScreen(dataContext, dataCanvas);
  const initialHeight = inputHeight.value;
  const initialSpeed = inputSpeed.value;
  let angle = inputAngle.value;
  if (!initialSpeed || !initialHeight || !angle) {
    dataContext.font = '20px arial';
    let yCoordinate = INITIAL_Y;
    context.fillStyle = "red";
    dataContext.fillText(`Introduzca un valor válido para cada input`, 0,
      yCoordinate);
    context.fillStyle = "black";
  } else {
    angle = calculateRadians(angle);
    const movement = new ParabolMovement(angle, initialSpeed, 1, initialHeight);
    if (!isCheckBoxActive) {
      if (firstUseflag) {
        firstUseflag = !firstUseflag;
        axis.setAxisData(canvas.width, canvas.height);
        const factors = getRightFactors(axis, movement);
        console.log(factors);
        axis.xFactor = factors[X_FACTOR];
        axis.yFactor = factors[Y_FACTOR];
        axis.draw(context);
      }
      const INITIAL_POINT = new Point(axis.initialPoint.x,
          axis.initialPoint.y - initialHeight);
      const arrow = new Arrow(INITIAL_POINT, ARROW_SIZE);
      arrow.draw(context, angle);
      const PHYSICS = new Physics(movement);
      await PHYSICS.represent(axis, context);
    }
    displayData(movement, dataCanvas.height);
  }
}

/**
 * @desc Función que permite pasar un ángulo de grados a radianes.
 * @param {Number} angle Ángulo en grados. 
 */
function calculateRadians(angle) {
  return (Math.PI * angle / 180);
}

/* istanbul ignore next */
/**
 * @desc Función gestiora del proceso. Se encarga de inicializar
 * las referrencias a nodos del DOM.
 */
async function setup() {
  canvas = document.getElementById('canvas');
  dataCanvas = document.getElementById('dataCanvas');
  canvasModule.fixDpi(canvas);
  canvasModule.fixDpi(dataCanvas);
  context = canvas.getContext('2d');
  dataContext = dataCanvas.getContext('2d');
  inputSpeed = document.getElementById('initialSpeed');
  inputAngle = document.getElementById('angle');
  inputHeight = document.getElementById('initialHeight');
  BUTTON = document.getElementById('sendData');
  CHECK_BOX = document.getElementById('checkBox');
  if (BUTTON !== null) {
    BUTTON.addEventListener('click', () => {
      calculateParabolMovement();
    });
  }
  if (CHECK_BOX !== null) {
    CHECK_BOX.addEventListener('click', () => {
      isCheckBoxActive = !isCheckBoxActive;
    });
  }
  axis = new CoordinateAxis;
}

/* istanbul ignore next */
/**
 * @desc Función que permite obtener el valor multiplicativo a aplicar
 * a un eje de coordenadas para obtener la escala deseada.
 * @param {Object} axis Objeto que representa un eje de coordenadas.
 * @param {Object} movement Objeto que representa un tiro parabólico.
 * @return {Array} Array de dos elementos. El primero, es la escala a
 * aplicar al eje X. El segundo, la del eje Y.
 */
function getRightFactors(axis, movement) {
  const MAX_DISTANCE = movement.maxDistance;
  const MAX_HEIGHT = movement.maxHeight;
  const INITIAL_POINT = axis.initialPoint;
  const MAX_X_VALUE = INITIAL_POINT.x + MAX_DISTANCE;
  let maxYValue = INITIAL_POINT.y - MAX_HEIGHT;
  console.log(maxYValue);

  const CURRENT_MAX_X_AXIS = INITIAL_POINT.x + axis.xLength;
  const CURRENT_MAX_Y_AXIS = INITIAL_POINT.y + axis.yLength;
  if (maxYValue < 0) {
    maxYValue = Math.abs(CURRENT_MAX_Y_AXIS) + Math.abs(maxYValue);
  }
  return [
    Math.ceil((MAX_X_VALUE / CURRENT_MAX_X_AXIS)), 
    Math.ceil((Math.abs(maxYValue) / CURRENT_MAX_Y_AXIS)) + 1
  ];
}

/* istanbul ignore next */
/**
 * @desc Función que permite mostrar los datos referentes a un tiro parabólico
 * sobre un canvas concreto.
 * @param {Object} Movement Objeto que representa al tiro parabólico.
 * @param {Number} height Altura del canvas sobre el que se representarán
 * los datos.
 */
function displayData(movement, height) {
  dataContext.font = '20px arial';
  const SPACE = height / (INITIAL_Y / 2);
  let yCoordinate = Y_COORDINATE;
  dataContext.fillText(`Tiempo transcurrido: ${movement.flightTime} s.`,
    (INITIAL_Y / 2), yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Distancia recorrida: ${movement.maxDistance} m.`,
    (INITIAL_Y / 2), yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura recorrida: ${movement.maxHeight * 2 -
    movement.initialHeight} m.`, (INITIAL_Y / 2), yCoordinate);
  yCoordinate += SPACE;
  dataContext.fillText(`Altura máxima: ${movement.maxHeight} m.`,
  (INITIAL_Y / 2), yCoordinate);
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.main = {};
  exports.main.setup = setup;
  exports.main.calculateRadians = calculateRadians;
  exports.main.getRightFactors = getRightFactors;
} else { 
  window.main = {};
  window.main.setup = setup;
  window.main.calculateRadians = calculateRadians;
  window.main.getRightFactors = getRightFactors;
}
>>>>>>> 6f255971c8ae7993441026795b12f04cbabe9245
