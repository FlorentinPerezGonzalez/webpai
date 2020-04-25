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
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Physics = Physics;
} else { 
  window.Physics = Physics;
}
