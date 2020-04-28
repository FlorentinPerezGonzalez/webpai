/* istanbul ignore file */
/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta funciones de utilidad general.
 * @copyright Florentín Pérez Glez 2020
 * @since 17.04.2020
 * @exports sleep
 * @exports makeUnique
 * @exports getRandomInt
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 10. Tiro parabólico.
 *
 * Contenido detallado: Contiene la implementación de varios funciones de
 * utilidad general que pueden ser usadas en proyectos JS de
 * categorías distintas. Se recomienda comprobar detenidamente la documentación
 * asociada para determinar cuáles son estas funciones.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

'use strict';

/**
 * @desc Función que imita a las funciones sleep de otros lenguajes.
 * Permite ralentizar la ejecución del código hasta pasado ms milisegundos.
 * Solo puede ser utilizada en funciones indicadas como asincronas (async) y
 * su uso debe acompañarse de la palabra reservada await.
 * @param {Number} ms - Milisegundos que se quieren fijar de espera
 * @return {Promise} - Promise que la función asíncrona esperara que termine
 * hasta de proseguir con su ejecución.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @desc Función que permite eliminar los puntos duplicados en un
 * array de puntos
 * @param {Array} originalArray - Array en su estado original
 * @return {Array} - Array original sin elementos duplicados
 */
function makeUnique(originalArray) {
  const result = [];
  for (const item of originalArray) {
    if (!result.find((object) => {
      return (object.x === item.x) && (object.y === item.y);
    })) {
      result.push(item);
    }
  }
  return result;
}

/**
 * @desc Función que permite obtener un número entero aleatorio dado un
 * intervalor.
 * @param {Number} min Valor mínimo posible (Incluído).
 * @param {Number} max Valor máximo posible (No incluído).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

if (typeof exports !== 'undefined') {
  exports.generalUtility = {};
  exports.generalUtility.sleep = sleep;
  exports.generalUtility.makeUnique = makeUnique;
  exports.generalUtility.getRandomInt = getRandomInt;
  /* istanbul ignore next */
} else { 
  window.generalUtility = {};
  window.generalUtility.sleep = sleep;
  window.generalUtility.makeUnique = makeUnique;
  window.generalUtility.getRandomInt = getRandomInt;
}
