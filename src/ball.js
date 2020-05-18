/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase Ball, que representa
 * un círculo.
 * @copyright Florentín Pérez Glez 2020
 * @since 16.05.2020
 * @exports Ball
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 13. Bouncing Ball.
 *
 * Contenido detallado: Contiene la implementación de la clase Ball que representa un objeto
 * circular con capacidad de moverse. A tal fin, se le asigna una velocidad y una posición
 * inicial. Para cada frame, el objeto es capaz de calcular su nueva posición.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *
 * Historial de revisiones:
 *    - 19.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let Circle;
let Point;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Circle = require('../src/circle.js').Circle;
  Point = require('../src/point.js').Point;
} else {
  Circle = window.Circle;
  Point = window.Point;
}

class Ball extends Circle {
  /**
   * @desc Constructor de la clase Ball.
   * @param {Object} initialPoint Punto que ocupa el centro de la bola
   * inicialmente.
   * @param {Number} radius Radio la bola. 
   * @param {Number} xSpeed Velocidad en el eje X de la bola. 
   * @param {Number} ySpeed Velocidad en el eje Y de la bola.
   */
  constructor(initialPoint, radius, xSpeed, ySpeed, color) {
    super(initialPoint, radius, color);
    this._xSpeed = xSpeed;
    this._ySpeed = ySpeed;
    this._xPosition = initialPoint.x;
    this._yPosition = initialPoint.y;
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

  /**
   * @desc Getter.
   * @type {Number}
   */
  get xPosition() {
    return this._xPosition;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get yPosition() {
    return this._yPosition;
  }

  set xSpeed(speed) {
    this._xSpeed = speed;
  }

  set ySpeed(speed) {
    this._ySpeed = speed;
  }

  /**
   * @desc Actualiza la posición de la bola a su siguiente frame.
   * Para ello modifica las posiciones actuales en ambos ejes en función
   * de la velocidad (píxeles por frame) que tiene asignado el objeto.
   */
  update(){
    this._xPosition += this._xSpeed;
    this._yPosition += this._ySpeed;
    this._middlePoint = new Point(this._xPosition, this._yPosition);
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Ball = Ball;
} else { 
  window.Ball = Ball;
}
