/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo principal que gestiona la ejecución de un programa destinado
 * a realizar el Juego de la Vida.
 * @copyright Florentín Pérez Glez 2020
 * @since 12.05.2020
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 12. Juego de la vida. Programación Gráfica, Orientada a Objetos y
 * dirigida por eventos en JS.
 *
 * Contenido detallado: Se trata de un fichero JS cuya finalidad radica en permitir
 * la ejecución del Juego de la Vida. En concreto, se encarga de obtener referencias
 * del DOM y de inicializar el proceso.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 */

'use strict';

let GeneralModule;
let CanvasModule;
let Grid;
let LifeGame;
let LifeGameDisplay;
if (typeof require !== 'undefined') {
  Grid = require('../src/grid.js').Grid;
  LifeGame = require('../src/life-game.js').LifeGame;
  GeneralModule = require('./generalUtility.js').generalUtility;
  CanvasModule = require('../src/canvas-utility.js').canvasModule;
  LifeGameDisplay = require('../src/life-game-display.js').LifeGameDisplay;
} else {
  Grid = window.Grid;
  LifeGame = window.LifeGame;
  GeneralModule = window.generalUtility;
  CanvasModule = window.canvasModule;
  LifeGameDisplay = window.LifeGameDisplay;
}

const CANVAS = document.getElementById('canvas');
CanvasModule.fixDpi(CANVAS);
const CONTEXT = CANVAS.getContext("2d");
const GRID = new Grid(Grid.CELLS * (CANVAS.width / CANVAS.height), Grid.CELLS, CANVAS);
GRID.draw(CONTEXT);
let startFlag = false;
let pause = false;
let interval;
let display;
const startButton = document.getElementById('start');
const endButton = document.getElementById('end');
const pauseButton = document.getElementById('pause');
const steepButton = document.getElementById('steep');
const slider = document.getElementById('speed');
const cellsInput = document.getElementById('cells');
let initialCells;
startButton.addEventListener('click', () => {
  if (interval !== undefined) {
    clearTimeout(interval); 
  }
  initialCells = cellsInput.value;
  display = new LifeGameDisplay(GRID);
  interval = setTimeout(() => {
    playGame();
  }, 100);
  startFlag = true;
  pause = false;
});
endButton.addEventListener('click', () => {
  clearTimeout(interval);
  startFlag = false;
  pause = false;
  CanvasModule.clearScreen(CONTEXT, CANVAS);
  GRID.draw(CONTEXT);
});
pauseButton.addEventListener('click', () => {
  pause = true;
  clearTimeout(interval);
});
steepButton.addEventListener('click', () => {
  if (startFlag) {
    CanvasModule.clearScreen(CONTEXT, CANVAS);
    display.oneStep(CONTEXT, initialCells);
    GRID.draw(CONTEXT);
  }
});
async function playGame() {
  CanvasModule.clearScreen(CONTEXT, CANVAS);
  await display.oneStep(CONTEXT, initialCells);
  GRID.draw(CONTEXT);
  const fps = 1/slider.value * 1000;
  if (startFlag && !pause) {
    interval = setTimeout(() => {
      playGame();
    }, fps);
  }
}