/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase ParabolMovement.
 * @copyright Florentín Pérez Glez 2020
 * @since 24.04.2020
 * @exports sleep
 * @exports makeUnique
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
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
  constructor(angle, initialSpeed, time, initialHeight = 0) {
    this._angle = angle;
    this._initialSpeed = parseInt(initialSpeed);
    this._initialHeight = initialHeight;
    this._time = time;
    this.calculate();
    this.calculateFlightTime();
  }

  get angle() {
    return this._angle;
  }
  get initialSpeed() {
    return this._initialSpeed;
  }
  get initialHeight() {
    return this._initialHeight;
  }
  get xSpeed() {
    return this._xSpeed;
  }
  get ySpeed() {
    return this._ySpeed;
  }
  get xPosition() {
    return this._xPosition;
  }
  get yPosition() {
    return this._yPosition;
  }
  get flightTime() {
    return this._flightTime;
  }
  get maxDistance() {
    return this._maxDistance;
  }
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
  set time(newTime) {
    this._time = newTime;
    this.calculate();
  }

  calculate() {
    this._xSpeed = this._initialSpeed * Math.cos(this._angle);
    this._ySpeed = this._initialSpeed * Math.sin(this._angle) -
      GRAVITY_VALUE * this._time;
    this._xPosition = this._xSpeed * this._time;
    this._yPosition = parseInt(this._initialHeight) + this._initialSpeed *
      Math.sin(this._angle) * this._time - 0.5 * GRAVITY_VALUE *
      Math.pow(this._time, 2);
      console.log(this._yPosition, 'time', this._time, 'speed', this._initialSpeed, 'height', this._initialHeight, 'angle:', this._angle);
    if (this._yPosition < 0) {
      this._yPosition = 0;
    }
    this._maxHeight = (Math.pow(this._initialSpeed, 2) *
      Math.pow(Math.sin(this._angle), 2)) / (2 * GRAVITY_VALUE);
  }
  calculateMaxDistance() {
    this._maxDistance = this._xSpeed * this._flightTime;
  }
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
