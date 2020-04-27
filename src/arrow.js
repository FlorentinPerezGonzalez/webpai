/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase Line, que representa
 * una línea.
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports Line
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de la clase Line,
 * que permite representar una línea comprendida entre dos puntos.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *
 * Historial de revisiones:
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

let Point;
let Line;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
} else {
  Point = window.Point;
  Line = window.Line;
}

class Arrow {
 constructor(initialPoint, length) {
   this._initialPoint = initialPoint;
   this._length = length;
 }
 set initialPoint(point) {
   this._initialPoint = initialPoint;
 }
 set length(data) {
   this._length = data;
 }
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