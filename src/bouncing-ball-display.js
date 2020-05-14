/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase Circle, que representa
 * un círculo.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports Circle
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase Circle,
 * que permite representar un círculo dado su posición central y su radio.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict'

let Ball;
let Point;
let GeneralUtility;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Ball = require('../src/ball.js').Ball;
  Point = require('../src/point.js').Point;
  GeneralUtility = require('../src/generalUtility.js').generalUtility
} else {
  Ball = window.Ball;
  Point = window.Point;
  GeneralUtility = window.generalUtility
}

class BouncingBall {
  static RADIUS = 20;
  /**
   * @desc Constructor de la clase BouncingBall.
   * @param {Canvas} canvas Canvas sobre el que se realizará la representación. 
   * @param {Object} ball Objeto que simboliza una bola desplazable en un
   * entorno bidimensional. 
   * @param {Number} fps Frames por segundo deseados. 
   */
  constructor(canvas, fps = 30, xSpeed = 20, ySpeed = 20) {
    this._maxWidth = canvas.width;
    this._maxHeight = canvas.height;
    this._fps = fps;
    this._xSpeed = xSpeed;
    this._ySpeed = ySpeed;
    if (typeof exports === 'undefined') {
      this._context = canvas.getContext('2d');
    }
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get fps() {
    return this._fps;
  }

  set fps(newFps) {
    this._fps = newFps;
  }

    /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get xSpeed() {
    return this._xSpeed;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get ySpeed() {
    return this._ySpeed;
  }

  set xSpeed(speed) {
    this._xSpeed = speed;
  }

  set ySpeed(speed) {
    this._ySpeed = speed;
  }

  /**
   * @desc Método que inicializa los recursos necesarios para dar lugar
   * al BouncingBall. Tras la inicialización, da lugar al propio procedimiento.
   */
  startGame() {
    const color = GeneralUtility.getRandomRGBColor();
    const initialX = GeneralUtility.getRandomInt(Math.round(this._maxWidth / 3),
                      Math.round(this._maxWidth / (3/2)));
    const initialY = GeneralUtility.getRandomInt(Math.round(this._maxHeight / 3),
                      Math.round(this._maxHeight / (3/2)));
    const gameXSpeed = this._realSpeed(this._xSpeed);
    const gameYSpeed = this._realSpeed(this._ySpeed);
    this._ball = new Ball(new Point(initialX, initialY), BouncingBall.RADIUS,
                      gameXSpeed, gameYSpeed, color);
    setInterval(() => {
      this._moveBall();
    }, 1000 / this._fps);
  }

  _realSpeed(speed) {
    return GeneralUtility.getRandomInt(0, 2) === 0 ? speed : -speed;
  }

  _moveBall() {
    this._ball.update();
    const currentX = this._ball.xPosition;
    const currentXSpeed = this._ball.xSpeed;
    const currentY = this._ball.yPosition;
    const currentYSpeed = this._ball.ySpeed;
    if ((currentX - BouncingBall.RADIUS < 0 && currentXSpeed < 0) ||
      (currentX + BouncingBall.RADIUS > this._maxWidth && currentXSpeed > 0)) {
      this._ball.xSpeed = -currentXSpeed;
    }
    if ((currentY - BouncingBall.RADIUS < 0 && currentYSpeed < 0) ||
      (currentY + BouncingBall.RADIUS > this._maxHeight && currentYSpeed > 0)) {
      this._ball.ySpeed = -currentYSpeed;
    }
    this._context.fillStyle = 'black';
    this._context.fillRect(0, 0, this._maxWidth, this._maxHeight);
    this._ball.draw(this._context, true);
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.BouncingBall = BouncingBall;
} else { 
  window.BouncingBall = BouncingBall;
}
