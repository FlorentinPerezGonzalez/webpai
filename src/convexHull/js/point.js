/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta una función que permite crear puntos.
 * @copyright Florentín Pérez Glez 2020
 * @since 21.03.2020
 * @exports createPoint
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 6. QuickHull. Gráficos en JS usando Canvas
 *
 * Contenido detallado: Contiene la implementación de createPoint,
 * función que permite crear puntos dadas sus coordenadas.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md
 *
 * Historial de revisiones:
 *    - 21.03.2020 - Creación del código
 *    - 24.03.2020 - Versión presentada para evaluación
 */

'use strict';

/**
  * @desc Función que permite crear un punto con coordenadas
  * xCoordinate e yCoordiante.
  * @param {Numeric} xCoordinate - Coordenada X
  * @param {Numeric} yCoordinate - Coordenada Y
  * @return {Object} - Objeto que representa un punto
  */
function createPoint(xCoordinate, yCoordinate) {
  return {
    x: xCoordinate,
    y: yCoordinate,
  };
}

export {createPoint};
