/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase ParabolMovement.
 * @copyright Florentín Pérez Glez 2020
 * @since 24.04.2020
 * @exports ParabolMovement
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase ParabolMovement 
 * que representa un movimiento parabólico.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

const GRAVITY_VALUE = 9.8;

class ParabolMovement {
  /**
   * @desc Constructor de la clase ParabolMovement
   * @param {Number} angle Angulo inicial del tiro parabólico.
   * @param {Number} initialSpeed Velocidad inicial del tiro parabólico.
   * @param {Number} time Tiempo para el cual se desea calcular los datos
   * del tiro parabólico.
   * @param {Number} initialHeight Altura inicial sobre la que se efectura el
   * tiro parabólico.
   */
  constructor(angle, initialSpeed, time, initialHeight = 0) {
    this._angle = angle;
    this._initialSpeed = parseInt(initialSpeed);
    this._initialHeight = initialHeight;
    this._time = time;
    this.calculate();
    this.calculateFlightTime();
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get angle() {
    return this._angle;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get initialSpeed() {
    return this._initialSpeed;
  }

  /**
   * @desc Getter y setter.
   * @type {Number}
   */
  get initialHeight() {
    return this._initialHeight;
  }

  /**
   * @desc Getter. Devuelve la velocidad sobre el eje X.
   * @type {Number}
   */
  get xSpeed() {
    return this._xSpeed;
  }

  /**
   * @desc Getter. Devuelve la velocidad sobre el eje Y.
   * @type {Number}
   */
  get ySpeed() {
    return this._ySpeed;
  }

  /**
   * @desc Getter. Posición de la partícula sobre el eje X.
   * @type {Number}
   */
  get xPosition() {
    return this._xPosition;
  }

  /**
   * @desc Getter. Posición de la partícula sobre el eje Y.
   * @type {Number}
   */
  get yPosition() {
    return this._yPosition;
  }

  /**
   * @desc Getter. Tiempo de vuelo máximo de la partícula..
   * @type {Number}
   */
  get flightTime() {
    return this._flightTime;
  }

  /**
   * @desc Getter. Distancia máxima a la que puede llegar la partícula.
   * @type {Number}
   */
  get maxDistance() {
    return this._maxDistance;
  }

  /**
   * @desc Getter. Altura máxima a la que puede llegar la partícula.
   * @type {Number}
   */
  get maxHeight() {
    return this._maxHeight;
  }

  set angle(newAngle) {
    this._angle = newAngle;
    this.calculate();
    this.calculateFlightTime();
  }

  set initialSpeed(newSpeed) {
    this._initialSpedd = newSpeed;
    this.calculate();
    this.calculateFlightTime();
  }
  
  set initialHeight(newHeight) {
    this._initialHeight = newHeight;
    this.calculate();
    this.calculateFlightTime();
  }

  /**
   * @desc Setter.
   * @type {Object}
   */
  set time(newTime) {
    this._time = newTime;
    this.calculate();
  }

  /**
   * @desc Actualiza cada uno de los atributos del objeto a su valor
   * correspondiente en función de los datos provistas actuales para
   * ángulo inicial, altura inicial y velocidad inicial.
   */
  calculate() {
    this._xSpeed = this._initialSpeed * Math.cos(this._angle);
    this._ySpeed = this._initialSpeed * Math.sin(this._angle) -
      GRAVITY_VALUE * this._time;
    this._xPosition = this._xSpeed * this._time;
    this._yPosition = parseInt(this._initialHeight) + this._initialSpeed *
      Math.sin(this._angle) * this._time - 0.5 * GRAVITY_VALUE *
      Math.pow(this._time, 2);
    if (this._yPosition < 0) {
      this._yPosition = 0;
    }
    this._maxHeight = (Math.pow(this._initialSpeed, 2) *
      Math.pow(Math.sin(this._angle), 2)) / (2 * GRAVITY_VALUE);
  }

  /**
   * @desc Actualiza únicamente el valor de máxima distancia del objeto.
   */
  calculateMaxDistance() {
    this._maxDistance = this._xSpeed * this._flightTime;
  }

  /**
   * @desc Actualiza únicamente el valor de tiempo de vuelo del objeto.
   */
  calculateFlightTime() {
    this._flightTime = Math.round((2 * this._initialSpeed * Math.sin(this._angle) /
      GRAVITY_VALUE) * 100000) / 100000;
    this.calculateMaxDistance();
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ParabolMovement = ParabolMovement;
} else { 
  window.ParabolMovement = ParabolMovement;
}
