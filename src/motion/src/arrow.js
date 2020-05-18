/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Arrow, que representa
 * una flecha.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports Arrow
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase Arrow,
 * que permite representar una flecha dado un punto inicial y la
 * longitud de la misma.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

let Point;
let Line;
let Circle;
let DrawFigures;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  Circle = require('../src/circle.js').Circle;
  DrawFigures = require('../src/drawFigures.js').DrawFigures;
} else {
  Point = window.Point;
  Line = window.Line;
}

class Arrow {
  /**
   * @desc Constructor de la clase Arrow.
   * @param {Object} initialPoint Punto de origen de la flecha.
   * @param {Object} length Longitud de la flecha.
   */
 constructor(initialPoint, length) {
   this._initialPoint = initialPoint;
   this._length = length;
 }

  /**
  * @desc Setter.
  * @type {Object}
  */
 set initialPoint(point) {
   this._initialPoint = point;
 }

 /**
  * @desc Setter
  * @type {Number}
  */
 set length(data) {
   this._length = data;
 }

 /* istanbul ignore next */
 /**
  * @desc Método que permite representar el objeto sobre un canvas.
  * @param {Context} context Contexto del canvas sobre el que se dibujará el
  * objeto.
  * @param {Number} angle Ángulo de inclinación del objeto en radianes. 
  */
 draw(context, angle) {
  context.translate(this._initialPoint.x, this._initialPoint.y) ;
  context.rotate(2 * Math.PI - angle) ;
  context.translate(-this._initialPoint.x,-this._initialPoint.y) ;
  context.moveTo(this._initialPoint.x, this._initialPoint.y);
  const finalPoint = new Point(this._initialPoint.x + this._length,
                this._initialPoint.y);
  (new Line(new Point(this._initialPoint.x, this._initialPoint.y),
                finalPoint)).draw(context, 3);
  const minorLinesLength = this._length / 10;
  (new Line(finalPoint, new Point(finalPoint.x - minorLinesLength,
                finalPoint.y - minorLinesLength))).draw(context, 3);
  (new Line(finalPoint, new Point(finalPoint.x - minorLinesLength,
                finalPoint.y + minorLinesLength))).draw(context, 3);
  context.setTransform(1, 0, 0, 1, 0, 0);
 }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Arrow = Arrow;
} else { 
  window.Arrow = Arrow;
}
