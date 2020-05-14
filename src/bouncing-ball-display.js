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

class BouncingBall {
  /**
   * @desc Constructor de la clase BouncingBall.
   * @param {Canvas} canvas Canvas sobre el que se realizará la representación. 
   * @param {Object} ball Objeto que simboliza una bola desplazable en un
   * entorno bidimensional. 
   * @param {Number} fps Frames por segundo deseados. 
   */
  constructor(canvas, ball, fps = 30) {
    this._maxWidth = canvas.width;
    this._maxHeight = canvas.height;
    this._ball = ball;
    this._fps = fps;
    if (typeof exports !== 'undefined') {
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

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.BouncingBall = BouncingBall;
} else { 
  window.BouncingBall = BouncingBall;
}
