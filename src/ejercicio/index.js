/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo principal que gestiona la ejecución de un programa destinado
 * para navegadores que permite mostrar una bola sobre un canvas y desplazarla.
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
 * Contenido detallado: Se trata de un fichero JS cuya finalidad radica en adquirir
 * las referencias necesarias del DOM para la inicialización, y posterior gestión, de
 * un programa cuya finalidad radica en la visualización de una bola que posee
 * la capacidad de desplazarse mediante botones.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 */

'use strict';


let CanvasModule;
let Circle;
let DrawFigures;
if (typeof require !== 'undefined') {
  Circle = require('./circle.js').Circle;
  DrawFigures = require('./drawFigures.js').DrawFigures;
  CanvasModule = require('./canvas-utility.js').canvasModule;
} else {
  Circle = window.Circle;
  DrawFigures = window.DrawFigures;
  CanvasModule = window.canvasModule;
}

const PIXELS = 5;
const RADIUS = 10;
const NORTH_BUTTON = document.getElementById('north');
const SOUTH_BUTTON = document.getElementById('south');
const WEST_BUTTON = document.getElementById('west');
const EAST_BUTTON = document.getElementById('east');
const CANVAS = document.getElementById('canvas');
const CONTEXT = CANVAS.getContext('2d');
canvasModule.fixDpi(CANVAS);
let width = CANVAS.width / 2;
let height = CANVAS.height / 2;
let ball = new Circle(new Point(width, height), RADIUS);
const DRAW = new DrawFigures(CONTEXT);
DRAW.drawCircle(ball, true, PIXELS, 'red');
NORTH_BUTTON.addEventListener('click', () => {
  height = (height - PIXELS) < 0 ? 0 : height - PIXELS;
  canvasModule.clearScreen(CONTEXT, CANVAS);
  ball = new Circle(new Point(width, height), RADIUS);
  DRAW.drawCircle(ball, true, PIXELS, 'red');
});
SOUTH_BUTTON.addEventListener('click', () => {
  console.log(height);
  height = (height + PIXELS) > CANVAS.height ? CANVAS.height : height + PIXELS;
  canvasModule.clearScreen(CONTEXT, CANVAS);
  ball = new Circle(new Point(width, height), RADIUS);
  DRAW.drawCircle(ball, true, PIXELS, 'red');
  console.log(height);
});
WEST_BUTTON.addEventListener('click', () => {
  width = (width - PIXELS) < 0 ? 0 : width - PIXELS;
  canvasModule.clearScreen(CONTEXT, CANVAS);
  ball = new Circle(new Point(width, height), RADIUS);
  DRAW.drawCircle(ball, true, PIXELS, 'red');
});
EAST_BUTTON.addEventListener('click', () => {
  width = (width + PIXELS) > CANVAS.width ? CANVAS.width : width + PIXELS;
  canvasModule.clearScreen(CONTEXT, CANVAS);
  ball = new Circle(new Point(width, height), RADIUS);
  DRAW.drawCircle(ball, true, PIXELS, 'red');
});