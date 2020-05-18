/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase Point, que representa
 * un punto.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports Point
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 13. BouncingBall.
 *
 * Contenido detallado: Contiene la implementación de la clase Point,
 * que permite representar un punto dada unas coordenada X e Y.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *
 * Historial de revisiones:
 *    - 19.05.2020 - Versión presentada para evaluación.
 */

'use strict';

class Point {
  /**
   * @desc Constructor de la clase Point
   * @param {Number} x Coordenada X del punto
   * @param {Number} y Coordenada Y del punto
   * @param {String} colour Color del punto
   */
  constructor(x, y, colour = 'Black') {
    this._x = x;
    this._y = y;
    this._colour = colour;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get x() {
    return this._x;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get y() {
    return this._y;
  }

  set x(xCoordinate) {
    this._x = xCoordinate;
  }

  set y(yCoordinate) {
    this._y = yCoordinate;
  }

  /* istanbul ignore next */
  /**
   * @desc Función que permite dibujar el punto en un CANVAS
   * @param {Context} context Contexto asociado a un canvas.
   * @param {Number} lineWidth Grosor del punto
   */
  draw(context, lineWidth = 2) {
    const PREVIOUS_COLOR = context.fillStyle;
    context.fillStyle = this._colour;
    context.strokeStyle = this._colour;
    context.beginPath();
    context.arc(this._x, this._y, lineWidth, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.stroke();
    context.fillStyle = PREVIOUS_COLOR;
    context.strokeStyle = PREVIOUS_COLOR;
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Point = Point;
} else { 
  window.Point = Point;
}
