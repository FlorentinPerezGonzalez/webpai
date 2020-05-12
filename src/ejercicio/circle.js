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
  constructor(middlePoint, radius) {
    this._middlePoint = middlePoint;
    this._radius = radius;
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

  set middlePoint(point) {
    this._middlePoint = point;
  }
  
  set radius(newRadius) {
    this._radius = newRadius;
  }
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Circle = Circle;
} else { 
  window.Circle = Circle;
}
