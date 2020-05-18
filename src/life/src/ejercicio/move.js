/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de la clase Move.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.04.2020
 * @exports Move
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
 * Contenido detallado: Contiene la implementación de la clase Move que gestiona
 * el movimiento de entidades.
 *
 * Historial de revisiones:
 *    - 28.04.2020 - Versión presentada para evaluación.
 */

'use strict';

class Move {
  /**
   * @desc Constructor de la clase Move
   * @param {Point} dimensions Punto con las
   * dimensiones máximas.
   */
  constructor(dimensions) {
    this._center = dimensions;
  }

  /**
   * @desc Gestiona el movimiento de un objeto al norte.
   * @param {NUMBER} RADIUS Radio del objeto que se desplaza.
   * @param {NUMBER} PIXELS Píxeles del desplazamiento.
   * @return {Number} Nueva coordeanda con el desplazamiento.
   */
  moveNorth(RADIUS, PIXELS, height) {
    height = (height - PIXELS - RADIUS) < 0 ? 0 + RADIUS : height - PIXELS;
    return height;
  }

  /**
   * @desc Gestiona el movimiento de un objeto al sur.
   * @param {NUMBER} RADIUS Radio del objeto que se desplaza.
   * @param {NUMBER} PIXELS Píxeles del desplazamiento.
   * @return {Number} Nueva coordeanda con el desplazamiento.
   */
  moveSouth(RADIUS, PIXELS, height) {
    height = (height + PIXELS + RADIUS) > this._center.y ?
      this._center.y - RADIUS : height + PIXELS;
    return height;
  }

    /**
   * @desc Gestiona el movimiento de un objeto al este.
   * @param {NUMBER} RADIUS Radio del objeto que se desplaza.
   * @param {NUMBER} PIXELS Píxeles del desplazamiento.
   * @return {Number} Nueva coordeanda con el desplazamiento.
   */
  moveEast(RADIUS, PIXELS, width) {
    width = (width + PIXELS + RADIUS) > this._center.x ?
      this._center.x - RADIUS : width + PIXELS;
    return width;
  }

    /**
   * @desc Gestiona el movimiento de un objeto al oeste.
   * @param {NUMBER} RADIUS Radio del objeto que se desplaza.
   * @param {NUMBER} PIXELS Píxeles del desplazamiento.
   * @return {Number} Nueva coordeanda con el desplazamiento.
   */
  moveWest(RADIUS, PIXELS, width) {
    width = (width - PIXELS - RADIUS) < 0 ? 0 + RADIUS : width - PIXELS;
    return width
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Move = Move;
} else { 
  window.Move = Move;
}
