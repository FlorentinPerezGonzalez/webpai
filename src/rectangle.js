/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Rectangle, que representa
 * una línea.
 * @copyright Florentín Pérez Glez 2020
 * @since 09.05.2020
 * @exports Rectangle
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 12. Juego de la vida. Programación Gráfica, Orientada a Objetos y
 * dirigida por eventos en JS.
 *
 * Contenido detallado: Contiene la implementación de la clase Rectangle,
 * que permite representar un rectángulo.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *
 */

'use strict';

let Point;
let Line;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('./point.js').Point;
  Line = require('./line.js').Line;
} else {
  Point = window.Point;
  Line = window.Line;
}

class Rectangle {
  constructor(leftUpperPoint, rightBottomPoint, color) {
    this._leftUpperPoint = leftUpperPoint;
    this._rightBottomPoint = rightBottomPoint;
    this._color = color;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get x() {
    return this._leftUpperPoint.x;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get y() {
    return this._leftUpperPoint.y;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get width() {
    return this._rightBottomPoint.x - this._leftUpperPoint.x;
  }

  /**
   * @desc Getter.
   * @type {Object}
   */
  get height() {
    return this._rightBottomPoint.y - this._leftUpperPoint.y;
  }

  /**
   * @desc Setter.
   * @type {Object}
   */
  set leftUpperPoint(point) {
    this._leftUpperPoint = point;
  }

    /**
   * @desc Setter.
   * @type {Object}
   */
  set rightBottomPoint(point) {
    this._rightBottomPoint = point;
  }

  /* istanbul ignore next */
  /**
   * @desc Función que permite dibujar un rectángulo en un CANVAS
   * @param {Context} context Contexto asociado a un canvas.
   * @param {Boolean} fillRequire Indica si se desea rellenar el cuadrado.
   * @param {Number} lineWidth Grosor del punto
   */
  draw(context, fillRequire = false, lineWidth = 1) {
    if (fillRequire) {
      context.fillStyle = this._color;
      context.fillRect(this.x, this.y, this.width,
        this.height);
    } else {
      context.strokeStyle = this._color;
      context.lineWidth = lineWidth;
      context.strokeRect(this.x, this.y, this.width,
        this.height);
    }
  } 

  /**
   * @desc Función que permite calcular el perímetro del rectángulo.
   * @return {Number} Perímetro del rectángulo.
   */
  perimeter() {
    let result = 0;
    result = result + ((new Line(this._leftUpperPoint,
      new Point(this._rightBottomPoint.x, this._leftUpperPoint.y))).length()) * 2;
    result = result + ((new Line(this._leftUpperPoint,
      new Point(this._leftUpperPoint.x, this._rightBottomPoint.y))).length()) * 2;
    return result;
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Rectangle = Rectangle;
} else { 
  window.Rectangle = Rectangle;
}
