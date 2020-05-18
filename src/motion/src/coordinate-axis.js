/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase CoordinateAxis.
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
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase CoordinateAxis, que
 * representa un eje de coordenadas bidimensional.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

let Point;
let Line;
let Axis;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  Axis = require('../src/axis.js').Axis;
} else {
  Point = window.Point;
  Line = window.Line;
  Axis = window.Axis;
}

const DIVISOR = 18;

class CoordinateAxis {
  /**
   * @desc Constructor de la calse CoordinateAxis.
   * @param {Number} xFactor Factor multiplicativo para el eje X. 
   * @param {Number} yFactor Factor multiplicativo para el eje y.
   */
  constructor(xFactor = 1, yFactor = 1) {
    this._xFactor = xFactor;
    this._yFactor = yFactor;
  }
  /**
   * @desc Getter y Setter.
   */
  get xFactor() {
    return this._xFactor;
  }
  /**
   * @desc Getter y Setter.
   */
  get yFactor() {
    return this._yFactor;
  }

  /**
   * @desc Getter.
   */
  get initialPoint() {
    return this._initialPoint;
  }

  /**
   * @desc Getter.
   * @return {Number} Longitud eje X.
   */
  get xLength() {
    return this._xLength;
  }

  /**
   * @desc Getter.
   * @return {Number} Longitud eje Y.
   */
  get yLength() {
    return this._yLength; 
  }

  set xFactor(newFactor) {
    this._xFactor = newFactor;
  }

  set yFactor(newFactor) {
    this._yFactor = newFactor;
  }

  setAxisData(width, height) {
    this._initialPoint = new Point(width / DIVISOR, height - (height / DIVISOR));
    this._xLength = width - (width / DIVISOR) * 2;
    this._yLength = height - (height / DIVISOR) * 2;
  }
  /* istanbul ignore next */
  /**
   * @desc Método que permite dibujar el eje de coordenadas sobre un canvas.
   * @param {Context} context Contexto del canvas sobre el que se dibujarán
   * los resultados.
   */
  draw(context) {
    (new Axis(Axis.X_TYPE, this._xLength, this._xFactor))
      .draw(context, this._initialPoint, 5);
    (new Axis(Axis.Y_TYPE, this._yLength, this._yFactor))
      .draw(context, this._initialPoint, 5);
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.CoordinateAxis = CoordinateAxis;
} else { 
  window.CoordinateAxis = CoordinateAxis;
}