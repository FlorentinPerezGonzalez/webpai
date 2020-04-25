/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase ParabolMovement.
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
 * Contenido detallado: Contiene la implementación de la clase ParabolMovement 
 * que representa un movimiento parabólico.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

const TIME_UNIT = 0.25;

let Point;
let generalUtility
let ParabolMovement;
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
  constructor(parabolMovement) {
    this._parabolMovement = parabolMovement;
  }
  get parabolMovement() {
    return this._parabolMovement;
  }
  set parabolMovement(newMovement) {
    this._parabolMovement = newMovement;
  }
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
    do {
      const currentPoint = new Point(xPosition, yPosition, color);
      currentPoint.x = currentPoint.x + initialPointOfAxis.x;
      currentPoint.y = initialPointOfAxis.y - currentPoint.y;
      currentPoint.draw(context);
      this._parabolMovement.time = time;
      xPosition = this._parabolMovement.xPosition;
      yPosition = this._parabolMovement.yPosition;
      time += TIME_UNIT;
      await generalUtility.sleep(250);
    } while (yPosition > 0);
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Physics = Physics;
} else { 
  window.Physics = Physics;
}
