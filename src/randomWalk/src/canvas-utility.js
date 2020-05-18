/* istanbul ignore file */
/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta funciones de utilidad especificas para tratar
 * con canvas.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
 * @exports clearScreen
 * @exports fixDpi
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 9. Random Walk.
 *
 * Contenido detallado: Contiene la implementación de varios funciones de
 * utilidad general exclusiva para canvas. Estas funciones permiten hacer
 * operaciones tales como borrar un canvas o ajustar sus DPI. Se recomienda
 * consultar la documentación para determinar con exactitud el reportorio de
 * funciones que aporta este módulo.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *
 * Historial de revisiones:
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

'use strict';

/**
 * @desc Función que permite borrar todo el contenido de un canvas
 * @param {Context} CONTEXT - Contexto del canvas que se desea borrar
 * @param {Canvas} CANVAS - Canvas que se desea borrar
 */
function clearScreen(CONTEXT, CANVAS) {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

/**
 * @desc Función que permite ajustar los puntos por pulgada de un canvas,
 * consiguiendo que, tras su redimensión a un tamaño mayor del estándar,
 * los dibujos que se hagan sobre el mismo no se vean borrosos. Para tal fin,
 * la función tiene en cuanta la resolución actual del usuario que visualiza
 * la página web en la que se encuentra el canvas
 * @param {Canvas} CANVAS - Canvas al que se ajusta su DPI.
 */
function fixDpi(CANVAS) {
  const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
  const styleHeight =
    parseFloat(getComputedStyle(CANVAS).getPropertyValue('height')
        .slice(0, -2));
  const styleWidth =
    parseFloat(getComputedStyle(CANVAS).getPropertyValue('width').slice(0, -2));
  CANVAS.setAttribute('height', styleHeight * DEVICE_PIXEL_RATIO);
  CANVAS.setAttribute('width', styleWidth * DEVICE_PIXEL_RATIO);
}

if (typeof exports !== 'undefined') {
  exports.canvasModule = {};
  exports.canvasModule.clearScreen = clearScreen;
  exports.canvasModule.fixDpi = fixDpi;
} else { 
  window.canvasModule = {};
  window.canvasModule.clearScreen = clearScreen;
  window.canvasModule.fixDpi = fixDpi;
}
