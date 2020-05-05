/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que está dirigido a permitir la carga de imágenes
 * de manera independiente a otros ficheros.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports waitCharge
 * @exports cardImg
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Este módulo está dirigido a permitir la carga de
 * imágenes de manera independiente al resto de módulos. En esencia, las imágenes
 * se cargan una única vez en este módulo y después pueden ser referenciadas por cualquier
 * otro sin tener que volver a cargarse. Para facilitar también un correcto funcionamiento,
 * el módulo también exporta una función de utilidad, waitCharge, que se encarga de comprobar
 * constantemente si las imágenes han sido cargadas y solo en ese entonces, ejecutar la función
 * que se le pasa como argumento. Usando está función, nos garantizamos que las imágenes
 * se hayan cargado correctamente antes de poder ser utilizadas.
 * Las imágenes que se cargan se corresponden con cartas de la mano de póker.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

'use strict';

const cardImg = Object.create(null);

const suitDictionary = {
  '0': 'C',
  '1': 'D',
  '2': 'H',
  '3': 'S',
}

const valueDictionary = {
  '1': 'A',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': 'J',
  '12': 'Q',
  '13': 'K', 
}

let imgCharged = 0;

/**
 * @desc Función que construye el objeto que contendrá todas las imágenes
 * cargadas.
 */
function buildImageDictionary() {
  for (const suit in suitDictionary) {
    cardImg[suitDictionary[suit]] = {};
    for (const value in valueDictionary) {
      cardImg[suitDictionary[suit]][valueDictionary[value]] = new Image();
      cardImg[suitDictionary[suit]][valueDictionary[value]].src =
        `./img/pokerCards/poker-cards/${valueDictionary[value]}` +
        `${suitDictionary[suit]}.png`;
      cardImg[suitDictionary[suit]][valueDictionary[value]]
      .addEventListener('load', () => {
        imgCharged++;
      });
    }
  }
}

buildImageDictionary();

/**
 * @desc Función que comprueba constantemente si las imágenes han sido cargadas.
 * Cuando estas se encuentren en dicho estado, ejecuta una función especificable
 * como argumento.
 * @param {*} toDoFunction 
 */
function waitCharge(toDoFunction) {
  if (imgCharged !== 52) {
    setTimeout(function() {waitCharge(toDoFunction)}, 50);
    return;
  }
  toDoFunction();
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.imgLoader = {};
  exports.imgLoader.waitCharge = waitCharge;
  exports.imgLoader.cardImg = cardImg;
} else { 
  window.imgLoaderPoker = {};
  window.imgLoaderPoker.waitCharge = waitCharge;
  window.imgLoaderPoker.cardImg = cardImg;
}
