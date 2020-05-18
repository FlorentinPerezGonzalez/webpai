/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase DrawFigures, que representa
 * permite dibujar formas básicas sobre un canvas.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports DrawFigures
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase DrawFigures, que permite
 * representar formas básicas como cuadrados o círculos sobre un canvas.
 * 
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict'

class DrawFigures {
  /**
   * @desc Constructor de DrawFigures.
   * @param {Context} context 
   */
  constructor(context) {
    this._context = context;
  }

  /**
   * @desc Getter y setter.
   * @type {Context}
   */
  get context() {
    return this._context;
  }

  set context(newContext) {
    this._context = newContext;
  }

  /**
   * @desc Permite dibujar un punto.
   * @param {Object} point Punto a dibujar .
   * @param {Number} lineWidth Grosor del punto.
   * @param {Color} colour Color del punto.
   */
  drawPoint(point, lineWidth = 2, colour = 'black') {
    this._context.fillStyle = colour;
    this._context.strokeStyle = colour;
    this._context.beginPath();
    this._context.arc(point.x, point.y, lineWidth, 0, 2 * Math.PI);
    this._context.fill();
    this._context.closePath();
    this._context.stroke();
  }

  /**
   * @desc Permite dibujar una línea.
   * @param {Object} line Línea a dibujar.
   * @param {Number} lineWidth Grosor de la línea.
   * @param {Color} colour Color de la línea.
   */
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
   * @param {Object} rectangle Rectángulo a dibujar.
   * @param {Boolean} fillRequire Indica si se desea rellenar la figura.
   * @param {Number} lineWidth Groso de las líneas del rectángulo.
   * @param {Color} colour Color del rectángulo.
   */
  drawRectangle(rectangle, fillRequire = false, lineWidth = 1, colour = 'black') {
    if (fillRequire) {
      this._context.fillStyle = colour;
      this.context.fillRect(rectangle.x, rectangle.y, rectangle.width,
        rectangle.height);
    } else {
      this._context.strokeStyle = colour;
      this._context.lineWidth = lineWidth;
      this._context.strokeRect(rectangle.x, rectangle.y, rectangle.width,
        rectangle.height);
    }
  }

  /**
   * @desc Permite dibujar un triángulo.
   * @param {Object} rectangle triángulo a dibujar.
   * @param {Boolean} fillRequire Indica si se desea rellenar la figura.
   * @param {Number} lineWidth Groso de las líneas del triángulo.
   * @param {Color} colour Color del triángulo.
   */
  drawTriangle(triangle, fillRequire = false, lineWidth = 1, colour = 'black') {
    if (fillRequire) {
      this._context.fillStyle = colour;
      this._context.beginPath();
      this._context.moveTo(triangle.firstPoint.x, triangle.firstPoint.y);
      this._context.lineTo(triangle.secondPoint.x, triangle.secondPoint.y);
      this._context.lineTo(triangle.thirdPoint.x, triangle.thirdPoint.y);
      this._context.closePath();
      this._context.fill();
    } else {
      this._context.strokeStyle = colour;
      this._context.lineWidth = lineWidth;
      this._context.beginPath();
      this._context.moveTo(triangle.firstPoint.x, triangle.firstPoint.y);
      this._context.lineTo(triangle.secondPoint.x, triangle.secondPoint.y);
      this._context.lineTo(triangle.thirdPoint.x, triangle.thirdPoint.y);
      this._context.closePath();
      this._context.stroke();
    }
  }

  /**
   * @desc Permite dibujar un círculo.
   * @param {Object} circle círculo a dibujar.
   * @param {Boolean} fillRequire Indica si se desea rellenar la figura.
   * @param {Number} lineWidth Groso de las líneas del círculo.
   * @param {Color} colour Color del círculo.
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
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.DrawFigures = DrawFigures;
} else { 
  window.DrawFigures = DrawFigures;
}
