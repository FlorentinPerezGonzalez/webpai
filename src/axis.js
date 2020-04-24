/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase Axis.
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
 * Contenido detallado: Contiene la implementación de la clase Axis que
 * representa a un eje de coordenadas, ya sea el X o el Y.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

const MAX_DEFAULT_X = 100;
const MAX_DEFAULT_Y = 100;

class Axis {
  static X_TYPE = 0;
  static Y_TYPE = 1;
  /**
   * @desc Constructor de la clase Axis.
   * @param {Number} type Especificación del eje: 0 -> X, 1 -> Y.
   * @param {Number} length Longitud del eje deseada.
   * @param {Number} factor Factor multiplicativo para el eje X. 
   */
  constructor(type, length, factor = 1) {
    this._length = length;
    this._type = type;
    this._factor = factor;
  }
  /**
   * @desc Getter y Setter.
   */
  get type() {
    return this._type;
  }
  /**
   * @desc Getter y Setter.
   */
  get length() {
    return this._length;
  }
  /**
   * @desc Getter y Setter.
   */
  get factor() {
    return this._factor;
  }

  set type(newType) {
    this._type = newType;
  }

  set length(newLength) {
    this._length = newLength;
  }

  set factor(newFactor) {
    this._factor = newFactor;
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Axis = Axis;
} else { 
  window.Axis = Axis;
}
