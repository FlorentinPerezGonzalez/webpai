/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta una función que permite crear rectas y
 * calcular la distancia de un punto a estas.
 * @copyright Florentín Pérez Glez 2020
 * @since 21.03.2020
 * @exports lineFromTo
 * @exports calculateDistancePointToLine
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 6. QuickHull. Gráficos en JS usando Canvas
 *
 * Contenido detallado: Contiene la implementación de lineFromTo, que
 * permite crear una recta definida este por dos puntos distintos por los
 * que pasa. También contiene la implementación de calculateDistancePointToLine
 * que permite calcular la distancia de un punto a una recta, ambos dados.
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
 * Función que permite obtener una recta a través de la especificación
 * de dos de sus puntos.
 * @param {Object} firstPoint - Un punto cualquiera de la recta
 * @param {Object} secondPoint - Otro punto cualquiera de la recta
 * @return {Object} - Un objeto que representa la recta que une ambos puntos
 */
function lineFromTo(firstPoint, secondPoint) {
  return {
    initialPoint: firstPoint,
    finalPoint: secondPoint,
  };
}

/**
 *
 * @param {Object} point - Punto del que se quiere calcular su distancia
 * a una recta.
 * @param {Object} line - Recta de la que se quiere calcular su distancia
 * a un punto.
 * @return {Number} - Número que indica la distancia existente entre el punto
 * y la recta dados.
 */
function calculateDistancePointToLine(point, line) {
  const aCoefficient = line.initialPoint.y - line.finalPoint.y;
  const bCoefficient = line.finalPoint.x - line.initialPoint.x;
  const cCoefficient = line.initialPoint.x * line.finalPoint.y -
    line.finalPoint.x * line.initialPoint.y;
  return Math.round((Math.abs(aCoefficient * point.x + bCoefficient * point.y +
    cCoefficient) / Math.sqrt(aCoefficient * aCoefficient +
    bCoefficient * bCoefficient)) * 1000) / 1000;
}

export {lineFromTo, calculateDistancePointToLine};
