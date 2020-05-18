/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase DrawFigures.
 * @copyright Florentín Pérez Glez 2020
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de la clase DrawFigures, que
 * permite dibujar figuras sobre un canvas.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *
 */

class DrawFigures {
  constructor(context) {
    this._context = context;
  }

  get context() {
    return this._context;
  }

  set context(newContext) {
    this._context = newContext;
  }

  drawPoint(point, lineWidth = 2, colour = 'black') {
    this._context.fillStyle = colour;
    this._context.strokeStyle = colour;
    this._context.beginPath();
    this._context.arc(point.x, point.y, lineWidth, 0, 2 * Math.PI);
    this._context.fill();
    this._context.closePath();
    this._context.stroke();
  }

  drawLine(line, lineWidth = 2, colour = 'black') {
    this._context.beginPath();
    this._context.moveTo(line.initialPoint.x, line.initialPoint.y);
    this._context.lineTo(line.finalPoint.x, line.finalPoint.y);
    this._context.lineWidth = lineWidth;
    this._context.strokeStyle = colour;
    this._context.stroke();
  }

  /**
   * @desc Permite dibujar un rectángulo.
   * @param {*} rectagle Objeto Rectangle
   * @param {*} fillRequire Flag que indica si se desea rellenar el rectángulo.
   * @param {*} lineWidth Grosor de la línea
   * @param {*} colour Color del rectángulo.
   */
  drawRectangle(rectangle, fillRequire = false, lineWidth = 1,
    colour = 'black') {
    if (fillRequire) {
      this._context.fillStyle = colour;
      this.context.fillRect(rectangle.x, rectangle.y, Math.abs(rectangle.width),
        Math.abs(rectangle.height));
      this._context.stroke();
    } else {
      this._context.strokeStyle = colour;
      this._context.lineWidth = lineWidth;
      this._context.strokeRect(rectangle.x, rectangle.y, rectangle.width,
        rectangle.height);
    }
  }

  /**
   * @desc Permite dibujar un círculo.
   * @param {*} circle Objeto Círculo
   * @param {*} fillRequire Flag que indica si se desea rellenar el círculo.
   * @param {*} lineWidth Grosor de la línea
   * @param {*} colour Color del círculo.
   */
  drawCircle(circle, fillRequire = false, lineWidth = 1, colour = 'black') {
    if (fillRequire) {
      this._context.fillStyle = colour;
      this._context.beginPath();
      this.context.arc(circle.middlePoint.x, circle.middlePoint.y, circle.radius,
        0, 2 * Math.PI);
      this._context.fill();
    } else {
      this._context.strokeStyle = colour;
      this._context.beginPath();
      this._context.lineWidth = lineWidth;
      this.context.arc(circle.middlePoint.x, circle.middlePoint.y, circle.radius,
        0, 2 * Math.PI);
      this._context.stroke();
    }
  }

  /**
   * @desc Permite dibujar un arco.
   * @param {*} circle Objeto Arc
   * @param {*} fillRequire Flag que indica si se desea rellenar el arco.
   * @param {*} lineWidth Grosor de la línea
   * @param {*} colour Color del arco.
   */
  drawArc(arc, fillRequire = false, lineWidth = 1, colour = 'black') {
    if (fillRequire) {
      this._context.fillStyle = colour;
      this._context.beginPath();
      this._context.arc(arc.middlePoint.x, arc.middlePoint.y, arc.radius, 0,
        arc.endAngle);
      this._context.fill();
    } else {
      console.log(arc);
      this._context.lineWidth = lineWidth;
      this._context.strokeStyle = colour;
      this._context.beginPath();
      this._context.arc(arc.middlePoint.x, arc.middlePoint.y, arc.radius, 0,
        arc.endAngle);
      this._context.stroke();
    }
  }
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.DrawFigures = DrawFigures;
} else { 
  window.DrawFigures = DrawFigures;

}
