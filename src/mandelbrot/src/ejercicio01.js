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

import * as canvasModule from "./canvas-utility.js"

window.onload = setup();

/**
 * @desc Función que gestiona el proceso de creación de la iamgen.
 */
function setup() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  const WITDH = CANVAS.width;
  const HEIGHT = CANVAS.height;
  //drawLines(CANVAS, WITDH, HEIGHT, 10, 25);
  clearFirst(CANVAS, 2);
  //drawLines(CANVAS, WITDH, HEIGHT, 6, 20);
  clearFirst(CANVAS, 1);
  //drawLines(CANVAS, WITDH, HEIGHT, 6, 15);
  clearFirst(CANVAS, 0);
  drawLines(CANVAS, WITDH, HEIGHT, 6, 15);
  clearFirst(CANVAS, -1);
  drawInnerCircle(CANVAS);
  drawOuterCircles(CANVAS);
  //drawLines(CANVAS);
}

/**
 * @desc Función que permite dibujar el círculo interior
 * @param {Canvas} CANVAS Canvas sobre el que dibujar
 */
function drawInnerCircle(CANVAS) {
  const WITDH = CANVAS.width;
  const HEIGHT = CANVAS.height;
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.beginPath();
  const X_POSITION = WITDH / 2;
  const Y_POSITION = HEIGHT / 2;
  const RADIUS = WITDH / 20;
  CONTEXT.fillStyle = 'orchid';
  CONTEXT.arc(X_POSITION, Y_POSITION, RADIUS, 0, 2 * Math.PI);
  CONTEXT.fill();
}

/**
 * @desc Función que permite dibujar los círculos externos
 * @param {Canvas} CANVAS Canvas sobre el que dibujar
 */
function drawOuterCircles(CANVAS) {
  const WITDH = CANVAS.width;
  const HEIGHT = CANVAS.height;
  const X_POSITION = WITDH / 2;
  const Y_POSITION = HEIGHT / 2;
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.lineWidth = 15;
  CONTEXT.beginPath();
  CONTEXT.strokeStyle = 'mediumslateblue';
  let radius = WITDH / 10;
  for (let i = 0; i < 3; i++) {
    CONTEXT.beginPath();
    CONTEXT.arc(X_POSITION, Y_POSITION, radius, 0, 2 * Math.PI);
    CONTEXT.stroke();
    radius = radius + WITDH / 12;
    CONTEXT.lineWidth = CONTEXT.lineWidth + 18;
  }
}

/**
 * Función que permite dibujar las líneas internas de la imagen
 * @param {Canvas} CANVAS Canvas sobre el que dibujar
 * @param {Number} WITDH Anchura del lienzo
 * @param {Number} HEIGHT Altura dle lienzo
 * @param {Number} lineWidth Grosor de los trazos
 * @param {Number} iterations Región de dibujo
 */
function drawLines(CANVAS, WITDH, HEIGHT,lineWidth, iterations) {
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.save();
  const X_POSITION = WITDH / 2;
  const Y_POSITION = HEIGHT / 2;
  CONTEXT.lineWidth = lineWidth;
  CONTEXT.strokeStyle = 'black';
  CONTEXT.moveTo(X_POSITION, Y_POSITION);
  for (let y = 0; y <= HEIGHT; y = y + HEIGHT / iterations) {
    CONTEXT.beginPath();
    CONTEXT.moveTo(X_POSITION, Y_POSITION);
    CONTEXT.lineTo(0, y);
    CONTEXT.stroke();
  }
  for (let y = 0; y <= HEIGHT; y = y + HEIGHT / iterations) {
    CONTEXT.beginPath();
    CONTEXT.moveTo(X_POSITION, Y_POSITION);
    CONTEXT.lineTo(WITDH, y);
    CONTEXT.stroke();
  }
  for (let x = 0; x <= HEIGHT; x = x + WITDH / iterations) {
    CONTEXT.beginPath();
    CONTEXT.moveTo(X_POSITION, Y_POSITION);
    CONTEXT.lineTo(x, 0);
    CONTEXT.stroke();
  }
  for (let x = 0; x <= HEIGHT; x = x + WITDH / iterations) {
    CONTEXT.beginPath();
    CONTEXT.moveTo(X_POSITION, Y_POSITION);
    CONTEXT.lineTo(x, HEIGHT);
    CONTEXT.stroke();
  }
}

/**
 * Fcunción que permite borrar una región circular de la iamgen
 * @param {Canvas} CANVAS Canvas sobre el que dibujar
 * @param {Number} nCircle Región circular
 */
function clearFirst(CANVAS, nCircle) {
  const WITDH = CANVAS.width;
  const HEIGHT = CANVAS.height;
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.beginPath();
  const radius = WITDH / 10 + (WITDH / 12) * nCircle;
  const X_POSITION = WITDH / 2;
  const Y_POSITION = HEIGHT / 2;
  CONTEXT.fillStyle = "white";
  CONTEXT.arc(X_POSITION, Y_POSITION, radius, 0, 2 * Math.PI);
  CONTEXT.fill();
}