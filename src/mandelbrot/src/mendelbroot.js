/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación de funciones que permiten calcular
 * el conjunto de Mandelbroot.
 * @copyright Florentín Pérez Glez 2020
 * @since 28.03.2020
 * @exports clearScreen
 * @exports getRandomArbitrary
 * @exports generateSetOfComplexNumber
 * @exports convertCoordinatesToComplex
 * @exports calculateMandelbrootAreaAndError
 * @exports calculateMandelbrootIterations
 * @exports mandelbroot
 * @exports HSLToRGB
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *
 * Contenido detallado: Contiene la implementación de varios funciones que
 * permiten calcular el conjunto de Mandelbroot, así como una aproximación
 * de su área, junto a una segunda estimación del error producido. Para
 * calcular el conjunto en sí, se itera un máximo de 300 veces por pixel.
 * Por su parte, para el cálculo del área, se itera hasta un máximo de 
 * 10000 veces por complejo generado en el rango [(-2.0, 0), (0.5, 1.125)].
 * La cantidad de puntos a generar se deja a elección del usuario.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *
 * Historial de revisiones:
 *    - 28.03.2020 - Creación del código
 *    - 31.03.2020 - Versión presentada para evaluación
 */

'use strict';

import ComplexNumber from "./complex-number.js"
import * as canvasModule from "./canvas-utility.js"
import HSLToRGB from "./color-conversion.js";

const MAX_ITERATIONS = 10000;
const MENDELBROOT_ITERATIONS = 300;
const AREA_POS = 0;
const ERROR_POS = 1;

const BUTTON = document.getElementById('buttonPoint');
if (BUTTON !== null) {
  BUTTON.addEventListener('click', setup);
}
/**
 * @desc Función que gestiona el programa en su conjunto.
 * Es el encargado de obtener la referencia al canvas, dar
 * paso al cálculo del conjunto de Mandelbroot y del cálculo
 * de su área.
 */
function setup() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  mandelbroot(CANVAS);
  const areaAndError = calculateMandelbrootAreaAndError();
  document.getElementById('area')
    .innerText = `Área del conjunto de mandelbroot: ${areaAndError[AREA_POS]}`;
  document.getElementById('error')
    .innerText = `Error cometido: ${areaAndError[ERROR_POS]}`;
}

/**
 * @desc Función que calcula el conjunto de Mandelbroot y lo representa.
 * @param {Canvas} CANVAS - Canvas sobre el que se representará el
 * conjunto de Mandelbroot.
 */
function mandelbroot(CANVAS) {
  const START_COMPLEX_NUMBER = new ComplexNumber(-2.0, -1);
  const END_COMPLEX_NUMBER = new ComplexNumber(1, 1);
  const CONTEXT = CANVAS.getContext('2d');
  const image = CONTEXT.getImageData(0, 0, CANVAS.width, CANVAS.height);
  for (let x = 0; x < CANVAS.width; x++) {
    for (let y = 0; y < CANVAS.height; y++) {
      const cNumber = convertCoordinatesToComplex(START_COMPLEX_NUMBER,
                  END_COMPLEX_NUMBER, x, y, CANVAS);
      const nIterations = calculateMandelbrootIterations(cNumber, MENDELBROOT_ITERATIONS);
      const hue = parseInt(240 - 240 * nIterations / MENDELBROOT_ITERATIONS);
      const saturation = 100;
      const lightness = (nIterations < MENDELBROOT_ITERATIONS)?
        (10 + 100 * nIterations / MENDELBROOT_ITERATIONS * 1.5) : 0;
      const rgb = HSLToRGB(hue, saturation, lightness);
      const pixel = (x + y * CANVAS.width) * 4;
      image.data[pixel + 0] = rgb.red;
      image.data[pixel + 1] = rgb.green;
      image.data[pixel + 2] = rgb.blue;
      image.data[pixel + 3] = 255;
    }
  }
  CONTEXT.putImageData(image, 0, 0);
}

/**
 * @desc Función que calcula el área del conjunto de Mandebroot
 * y su área a través del Muestreo de Monte Carlo.
 * @return {Array} - Array cuya primera componente es el área
 * del conjunto y la segunda, el error estimado.
 */
function calculateMandelbrootAreaAndError() {
  const START_COMPLEX_NUMBER = new ComplexNumber(-2.0, 0);
  const END_COMPLEX_NUMBER = new ComplexNumber(0.5, 1.125);
  const QUANTITY = document.getElementById('numberOfComplex').value;
  if (QUANTITY > 0) {
    const setOfComplex = 
      generateSetOfComplexNumber(START_COMPLEX_NUMBER, END_COMPLEX_NUMBER, QUANTITY);
    let numberInSet = 0;
    let numberOutSet = 0;
    while (setOfComplex.length !== 0) {
      const iterations = calculateMandelbrootIterations(setOfComplex.shift(), MAX_ITERATIONS);
      if (iterations === MAX_ITERATIONS) {
        numberInSet++;
      } else {
        numberOutSet++;
      }
    }
    const AREA = 2 * 2.5 * 1.125 * numberInSet / QUANTITY;
    const ERROR = AREA / Math.sqrt(QUANTITY);
    return [Math.round(AREA * 1000) / 1000, Math.round(ERROR * 1000) / 1000];
  } else {
    alert('Debe insertar especificar una cantidad de' +
      'números complejos superior a 0');
  }
}

/**
 * @desc Función que calcula cuantas iteraciones son necesarias
 * para determinar si un punto forma parte del conjunto
 * de Mandelbroot o no. Las iteraciones máximas son dadas como
 * argumento.
 * @param {Object} cNumber - Objeto que representa un número complejo.
 * Es el número que se comprobará si forma parte del conjunto.
 * @param {Number} iterations - Iteraciones máximas que se realizarán
 * para comprobar si un número complejo dado forma parte o no del
 * conjunto de Mandelbroot.
 * @return {Number} - Cantidad de iteraciones que fueran necesarias
 * para determinar la pertencia del número complejo al conjunto.
 */
function calculateMandelbrootIterations(cNumber, iterations) {
  let realNumber = cNumber.realNumber;
  let imaginaryNumber = cNumber.imaginaryNumber;
  const zNumber = new ComplexNumber(0, 0);
  let nIterations = 0;
  while (nIterations < iterations) {
    if (Math.abs(zNumber.realNumber + zNumber.imaginaryNumber) > 2.0) {
      break;
    }
    realNumber =
      zNumber.realNumber * zNumber.realNumber - zNumber.imaginaryNumber * zNumber.imaginaryNumber;
    imaginaryNumber = 2 * zNumber.realNumber * zNumber.imaginaryNumber;
    zNumber.realNumber = realNumber + cNumber.realNumber;
    zNumber.imaginaryNumber = imaginaryNumber + cNumber.imaginaryNumber;
    nIterations++;
  }
  return nIterations
}

/**
 * @desc Función que permite convertir coordenadas de un plano a un número
 * complejo entre el rango existente entre dos números complejos dados
 * como argumentos.
 * @param {Object} START_COMPLEX_NUMBER - Número complejo que da comienzo al rango.
 * @param {Object} END_COMPLEX_NUMBER - Número complejo al final del rango.
 * @param {Number} xCoordinate - Coordenada X del plano.
 * @param {Number} yCoordinate - Coordenada Y del plano.
 * @param {Canvas} CANVAS - Canvas al que referencian las coordenadas dadas.
 * @return {Object} - Objeto que representa un número complejo.
 */
function convertCoordinatesToComplex(START_COMPLEX_NUMBER, END_COMPLEX_NUMBER,
          xCoordinate, yCoordinate, CANVAS) {

  const WIDTH = CANVAS.width;
  const HEIGHT = CANVAS.height;
  const REAL_PART = START_COMPLEX_NUMBER.realNumber + (xCoordinate / WIDTH) * 
        (END_COMPLEX_NUMBER.realNumber - START_COMPLEX_NUMBER.realNumber);
  const IMG_PART = START_COMPLEX_NUMBER.imaginaryNumber + (yCoordinate / HEIGHT) *
        (END_COMPLEX_NUMBER.imaginaryNumber - START_COMPLEX_NUMBER.imaginaryNumber);
  return new ComplexNumber(REAL_PART, IMG_PART);
}

/**
 * @desc Función que genera un conjunto aleatorio de números complejos
 * en un rango dado por otros dos números complejos.
 * @param {Object} minComplex - Complejo inferior del rango.
 * @param {Object} maxComplex - Complejo superior del rango.
 * @param {Number} QUANTITY - Cantidad de complejos que conformarán el
 * conjunto.
 * @return {Array} - Conjunto de número complejos únicos.
 */
function generateSetOfComplexNumber(minComplex, maxComplex, QUANTITY) {
  const result = [];
  for (let i = 0; i < QUANTITY; i++) {
    const realNumber = getRandomArbitrary(minComplex.realNumber, 
                    maxComplex.realNumber);
    const imaginaryNumber = getRandomArbitrary(minComplex.imaginaryNumber, 
                    maxComplex.imaginaryNumber);
    result.push(new ComplexNumber(realNumber, imaginaryNumber))
  }
  return makeUnique(result);
}

/**
 * Función que genera números aleatorios en el rango existente entre
 * min y max.
 * @param {Number} min - Valor inferior del intervalo.
 * @param {Number} max - Valor superior del intervalo.
 * @return {Number} Número aleatorio en el rango especificado.
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * @desc Función que permite eliminar los puntos duplicados en un
 * array de puntos.
 * @param {Array} originalArray - Array en su estado original.
 * @return {Array} - Array original sin elementos duplicados.
 */
function makeUnique(originalArray) {
  const result = [];
  for (const item of originalArray) {
    if (!result.find((object) => {
      return (object.realNumber === item.realNumber)
          && (object.imaginaryNumber === item.imaginaryNumber);
    })) {
      result.push(item);
    }
  }
  return result;
}

export {
  getRandomArbitrary,
  generateSetOfComplexNumber,
  convertCoordinatesToComplex,
  calculateMandelbrootAreaAndError,
  calculateMandelbrootIterations,
  mandelbroot,
  };