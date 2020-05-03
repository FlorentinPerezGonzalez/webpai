/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Line, que representa
 * una línea.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports Line
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Contiene la implementación de la clase Line,
 * que permite representar una línea comprendida entre dos puntos.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 03.05.2020 - Versión presentada para evaluación.
 */

'use strict';

class Line {
    /**
   * @desc Constructor de la clase Line.
   * @param {Object} initialPoint Punto inicial de la línea.
   * @param {Object} finalPoint Punto final de la línea.
   * @param {String} colour Color de la línea.
   */
  constructor(initialPoint, finalPoint, colour = 'Black') {
    this._initialPoint = initialPoint;
    this._finalPoint = finalPoint;
    this._colour = colour;
    this._calculateSlope();
    this._calculateYIntercept();
  }

  /**
   * @desc Getter y setter.
   * @type {Object}
   */
  get initialPoint() {
    return this._initialPoint;
  }

  /**
   * @desc Getter y setter.
   * @type {Object}
   */
  get finalPoint() {
    return this._finalPoint;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get slope() {
    return this._slope;
  }

  /**
   * @desc Getter.
   * @type {Number}
   */
  get yIntercept() {
    return this._yIntercept;
  }

  set initialPoint(point) {
    this._initialPoint = point;
  }

  set finalPoint(point) {
    this._finalPoint = point;
  }

  /**
   * @desc MÉTODO PROTEGIDO. Calcula la pendiente de la recta.
   */
  _calculateSlope() {
    this._slope = (this._finalPoint.y -
                  this._initialPoint.y) /
                  (this._finalPoint.x -
                  this._initialPoint.x);
  }

  /**
   * @desc MÉTODO PROTEGIDO. Calcula la ordenada en el origen de la recta.
   */
  _calculateYIntercept() {
    this._yIntercept = (this._initialPoint.y) -
                      (this._slope * this._initialPoint.x);
  }

  /**
   * @desc Función que permite calcular la distancia de un punto a una recta.
   * @param {Object} point Punto cuya distancia a la recta se quiere calcular.
   * @return {Number} Distancia del punto a la recta.
   */
  distanceToLine(point) {
    const aCoefficient = this._initialPoint.y - this._finalPoint.y;
    const bCoefficient = this._finalPoint.x - this._initialPoint.x;
    const cCoefficient = this._initialPoint.x * this._finalPoint.y -
    this._finalPoint.x * this._initialPoint.y;
    return Math.round((Math.abs(aCoefficient * point.x + bCoefficient * point.y +
      cCoefficient) / Math.sqrt(aCoefficient * aCoefficient +
      bCoefficient * bCoefficient)) * 1000) / 1000;
  }

  /**
   * @desc Función que permite determinar la longitud de la línea.
   * @return {Number} Longitud de la línea.
   */
  length() {
    const xValue = this._finalPoint.x - this._initialPoint.x;
    const yValue = this._finalPoint.y - this._initialPoint.y;
    return (Math.sqrt(Math.pow(xValue, 2),
      Math.pow(yValue, 2)));
  }

  /* istanbul ignore next */
   /**
   * @desc Función que permite dibujar una línea en un CANVAS
   * @param {Context} context Contexto asociado a un canvas.
   * @param {Number} lineWidth Grosor del punto
   */
  draw(context, lineWidth) {
    context.beginPath();
    context.moveTo(this._initialPoint.x, this._initialPoint.y);
    context.lineTo(this._finalPoint.x, this._finalPoint.y);
    context.lineWidth = lineWidth;
    context.stroke();
  }

   /**
   * Función que comprueba su un punto dado pertenece a una recta especificada
   * @param {Object} point - Punto que se desea comprobar
   * su pertenencia a una recta
   * @param {Object} line - Recta con la que comprobar
   * @return {Boolean} - True si el punto pertenece a la recta. False para
   * el caso contrario.
   */
  isPointInLine(point) {
    return (point.x * this._slope + this._yIntercept) === (point.y);
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Line = Line;
} else { 
  window.Line = Line;
}
