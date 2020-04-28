/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase Physics.
 * @copyright Florentín Pérez Glez 2020
 * @since 24.04.2020
 * @exports Physics
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de la clase Physics 
 * que permite reprentar sobre un canvas una serie de físicas. En concreto
 * y en la versión actual, solo permite la representación de tiros
 * parabólicos.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

const TIME_UNIT = 0.25;
const TIME_SLEEP = (1/60) * 1000;

let Point;
let generalUtility
let ParabolMovement;
/* istanbul ignore next */
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  generalUtility = require('../src/generalUtility.js').generalUtility;
  ParabolMovement = require('../src/parabol-movement.js').ParabolMovement;
} else {
  Point = window.Point;
  generalUtility = window.generalUtility;
  ParabolMovement = window.ParabolMovement;
}

class Physics {
  /**
   * @desc Constructor de la clase Physics
   * @param {Object} parabolMovement Movimiento parabólico a representar.
   */
  constructor(parabolMovement) {
    this._parabolMovement = parabolMovement;
  }

  /**
   * @desc Getter y Setter.
   * @type {Object}
   */ 
  get parabolMovement() {
    return this._parabolMovement;
  }

  set parabolMovement(newMovement) {
    this._parabolMovement = newMovement;
  }

  /* istanbul ignore next */
  /**
   * @desc Método que representa el movimiento parabólico especificado
   * sobre un canvas.
   * @param {Object} coordinateAxis Objeto que representa un eje de coordenadas. 
   * @param {Context} context Contexto del canvas sobre el que se representará
   * el resultado.
   */
  async represent(coordinateAxis, context) {
    function randomColor() {
      const RED = generalUtility.getRandomInt(0, 256);
      const GREEN = generalUtility.getRandomInt(0, 256);
      const BLUE = generalUtility.getRandomInt(0, 256);
      return `rgb(${RED}, ${GREEN}, ${BLUE})`;
    }
    const color = randomColor();
    let xPosition = 0;
    let yPosition = 0;
    let time = TIME_UNIT;
    const initialPointOfAxis = coordinateAxis.initialPoint;
    const xMax = coordinateAxis.initialPoint.x + coordinateAxis.xLength;
    let stop = false;
    do {
      const currentPoint = new Point(xPosition, yPosition, color);
      currentPoint.x = currentPoint.x / coordinateAxis.xFactor +
        initialPointOfAxis.x;
      if (currentPoint.x > xMax) {
        currentPoint.x = xMax;
        stop = true;
      }
      currentPoint.y = initialPointOfAxis.y - currentPoint.y /
        coordinateAxis.yFactor;
      currentPoint.draw(context);
      if (stop) {
        break;
      }
      this._parabolMovement.time = time;
      xPosition = this._parabolMovement.xPosition;
      yPosition = this._parabolMovement.yPosition;
      time += TIME_UNIT;
      await generalUtility.sleep(TIME_SLEEP);
    } while (yPosition > 0);
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Physics = Physics;
} else { 
  window.Physics = Physics;
}
