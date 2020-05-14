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

class Circle {
  /**
   * @desc Constructor de la clase Circle
   * @param {Object} middlePoint Punto medio del círculo.
   * @param {Number} radius Radio del círculo.
   */
  constructor(middlePoint, radius, color = 'Black') {
    this._middlePoint = middlePoint;
    this._radius = radius;
    this._color = color;
  }

  /**
   * @desc Getter y setter.
   * @type {Object}
   */
  get middlePoint() {
    return this._middlePoint;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get radius() {
    return this._radius;
  }

  /**
   * @desc Getter y setter.
   * @type {Color}
   */
  get color() {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
  }

  set middlePoint(point) {
    this._middlePoint = point;
  }
  
  set radius(newRadius) {
    this._radius = newRadius;
  }

  draw(circle, fillRequire = false, lineWidth = 1) {
    if (fillRequire) {
      this._context.fillStyle = this._color;
      this._context.beginPath();
      this.context.arc(circle.middlePoint.x, circle.middlePoint.y, circle.radius,
        0, 2 * Math.PI);
      this._context.fill();
    } else {
      this._context.strokeStyle = this._color;
      this._context.beginPath();
      this._context.lineWidth = lineWidth;
      this.context.arc(circle.middlePoint.x, circle.middlePoint.y, circle.radius,
        0, 2 * Math.PI);
      this._context.stroke();
    }
  }
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Circle = Circle;
} else { 
  window.Circle = Circle;
}
