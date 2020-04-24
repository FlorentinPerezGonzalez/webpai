/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase CoordinateAxis.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
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

const MAX_DEFAULT_X = 100;
const MAX_DEFAULT_Y = 100;

class CoordinateAxis {
  /**
   * @desc Constructor de la calse CoordinateAxis.
   * @param {Number} xFactor Factor multiplicativo para el eje X. 
   * @param {Number} yFactor Factor multiplicativo para el eje y.
   */
  constructor(xFactor, yFactor) {
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
  set xFactor(newFactor) {
    this._xFactor = newFactor;
  }
  set yFactor(newFactor) {
    this._yFactor = newFactor;
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.CoordinateAxis = CoordinateAxis;
} else { 
  window.CoordinateAxis = CoordinateAxis;
}