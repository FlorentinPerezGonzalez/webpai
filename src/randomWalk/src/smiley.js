/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Programa que permite representar en un canvas una cara sonriente
 * @copyright Florentín Pérez Glez 2020
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de la función drawSmiley,
 * que permite representar una cara sonriente.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *
 */

let Rectangle;
let Arc;
let Point;
let Circle = false;
let canvasModule;
let DrawFigures;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  isNode = true;
  canvasModule = require('./canvas-utility.js');
  Rectangle = require('./rectangle.js').Rectangle;
  Point = require('./point.js').Point;
  Circle = require('./circle.js').Circle
  DrawFigures = require('./drawFigures.js').DrawFigures;
  Arc = require('./arc.js').Arc;
} else {
  Point = window.Point;
  Rectangle = window.Rectangle;
  Circle = window.Circle;
  canvasModule = window.canvasModule;
  DrawFigures = window.DrawFigures;
  Arc = window.Arc;
}

const EYE_WIDTH = 10;
const EYE_HEIGHT = 12;
const EYE_RADIUS = 30;
const LEFT_EYEBROWN_UPWIDTH = 7;
const LEFT_EYEBROWN_DOWNWIDTH = 16;
const RIGHT_EYEBROWN_UPWIDTH = 19;
const EYEBROWN_UPHEIGHT = 6;
const EYEBROWN_DOWNHEIGHT = 5;

let canvas; 
window.addEventListener('load', () => {
  canvas = document.getElementById('canvas');
  setup();
});

/**
 * @desc Función que gestiona el proceso de creación de la cara
 * sonriente.
 */
function setup() {
  canvasModule.fixDpi(canvas);
  const CONTEXT = canvas.getContext('2d');
  const draw = new DrawFigures(CONTEXT);
  const width = canvas.width;
  const height = canvas.height;
  const circleFace = new Circle(new Point(width / 2, height / 2), height / 3);
  draw.drawCircle(circleFace, false, 10);
  const leftEye = new Circle(new Point((width / 2) - (width / EYE_WIDTH),
                                      (height / 2) - (height / EYE_HEIGHT)),
                                      height / EYE_RADIUS);
  const rightEye = new Circle(new Point((width / 2) + (width / EYE_WIDTH),
                                      (height / 2) - (height / EYE_HEIGHT)),
                                      height / EYE_RADIUS);
  draw.drawCircle(leftEye, true, 1);
  draw.drawCircle(rightEye, true, 1);
  const leftEyebrown = new Rectangle(new Point((width / 2) -
                      (width / LEFT_EYEBROWN_UPWIDTH),
                      (height / 2) - (height / EYEBROWN_UPHEIGHT)),
                      new Point((width / 2) - (width / LEFT_EYEBROWN_DOWNWIDTH),
                      (height / 2) - (height / EYEBROWN_DOWNHEIGHT)));
  const rightEyebrown = new Rectangle(new Point((width / 2) +
                      (width / RIGHT_EYEBROWN_UPWIDTH),
                      (height / 2) - (height / EYEBROWN_UPHEIGHT)),
                      new Point((width / 2) + (width / LEFT_EYEBROWN_UPWIDTH),
                      (height / 2) - (height / EYEBROWN_DOWNHEIGHT)));
  draw.drawRectangle(leftEyebrown, true);
  draw.drawRectangle(rightEyebrown, true);
  const mouth = new Arc(new Point((width / 2), (height / 2) + (height / 10)),
                height / 7, Math.PI);
  draw.drawArc(mouth, false, 10);
}