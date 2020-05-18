/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase Axis.
 * @copyright Florentín Pérez Glez 2020
 * @since 24.04.2020
 * @exports Axis
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase Axis que
 * representa a un eje de coordenadas, ya sea el X o el Y.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

let Point;
let Line;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
} else {
  Point = window.Point;
  Line = window.Line;
}

const AXIS_REST_SIZE = 20;
const Y_ADVANCE = 35;

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
   * @type {Number}
   */
  get type() {
    return this._type;
  }
  /**
   * @desc Getter y Setter.
   * @type {Number}
   */
  get length() {
    return this._length;
  }
  /**
   * @desc Getter y Setter.
   * @type {Number}
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

  /* istanbul ignore next */
  draw(context, initialPoint, lineWidth) {
    if (this._type === Axis.X_TYPE) {
      (new Line(new Point(initialPoint.x - AXIS_REST_SIZE, initialPoint.y),
        new Point(initialPoint.x + this._length, initialPoint.y)))
        .draw(context, lineWidth);
      this._drawNumbers(context, initialPoint);
      this._drawSmallLines(context, initialPoint);
    } else {
      (new Line(new Point(initialPoint.x, initialPoint.y + AXIS_REST_SIZE),
        new Point(initialPoint.x, initialPoint.y - this._length)))
        .draw(context, lineWidth);
      this._drawNumbers(context, initialPoint);
      this._drawSmallLines(context, initialPoint);
    }
  }
  /* istanbul ignore next */
  _drawNumbers(context, initialPoint) {
    const increment = 200;
    let counter = 0;
    context.fillStyle = 'Black';
    context.font = '14px arial';
    if (this._type === Axis.X_TYPE) {
      for (let i = initialPoint.x; i < initialPoint.x + this._length;
        i += increment) {
        const textSize = context.measureText(`${counter * this._factor} m`)
        .width;
          context.fillText(`${counter * this._factor} m`, (i - (textSize / 2)),
          initialPoint.y + Y_ADVANCE);
        counter += increment;
      }
    } else if (this._type === Axis.Y_TYPE) {
      for (let i = initialPoint.y; i > initialPoint.y - this._length;
        i -= increment) {
        const textSize = context.measureText(`${counter * this._factor} m`)
          .width;
          context.fillText(`${counter * this._factor} m`, initialPoint.x -
          (Y_ADVANCE + textSize), i + 0);
        counter += increment;
      }
    }
  }
  /* istanbul ignore next */
  _drawSmallLines(context, initialPoint) {
    const increment = 20;
    const greatIncrement = 200;
    if (this._type === Axis.X_TYPE) {
      for (let i = initialPoint.x; i < initialPoint.x + this.length;
        i += greatIncrement) {
        (new Line(new Point(i, initialPoint.y), new Point(i, initialPoint.y + /*hacerlo dependiente de la constante de drawNumbers*/20))).draw(context, 3);
        const limit = ((i + greatIncrement) > initialPoint.x + this._length) ?
          initialPoint.x + this._length : i + greatIncrement;
        for (let j = i + increment; j < limit; j += increment) {
          (new Line(new Point(j, initialPoint.y),
            new Point(j, initialPoint.y + 10))).draw(context, 3);
        }
      }
    } else if (this._type === Axis.Y_TYPE) {
      for (let i = initialPoint.y - 0; i > initialPoint.x - this.length;
        i -= greatIncrement) {
        (new Line(new Point(initialPoint.x, i),
          new Point(initialPoint.x - 20, i))).draw(context, 3);
        const limit = ((i - greatIncrement) < initialPoint.y - this._length)
          ? initialPoint.y - this._length : i - greatIncrement;
        for (let j = i - increment; j > limit; j -= increment) {
          (new Line(new Point(initialPoint.x, j),
            new Point(initialPoint.x - 10, j))).draw(context, 3);
        }
      }
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Axis = Axis;
} else { 
  window.Axis = Axis;
}
