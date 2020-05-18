/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Fichero que crear un tablero concreto del tres en raya sobre
 * un canvas.
 * @copyright Florentín Pérez Glez 2020
 * @since 24.03.2020
 * @requires module:canvasUtility.js
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 6. QuickHull. Gráficos en JS usando Canvas
 *
 * Contenido detallado: Permite la creación de un tablero del tres en raya
 * con ciertas fichas sobre el mismo en posiciones concretas.
 *
 * Historial de revisiones:
 *    - 24.03.2020 - Versión presentada para evaluación
 */

'use strict';

import * as canvasModule from './canvasUtility.js';

window.addEventListener('load', mainCoordinator);

const RADIUS = 120;
const LINE_SIZE = 12;

/**
 * @desc Función que coordina el proceso de creación de
 * un tablero de 3 en raya. También coloca fichas por encima
 * del mismo.
 */
function mainCoordinator() {
  createTable();
  createCircles(750, 150);
  createCircles(450, 450);
  createCircles(150, 750);
  createCross(150, 450);
  createCross(750, 750);
}

/**
 * @desc Función que permite crear el tablero del tres en raya
 * con un tamaño fijo.
 */
function createTable() {
  const CANVAS = document.getElementById('canvas');
  canvasModule.fixDpi(CANVAS);
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.lineWidth = LINE_SIZE;
  CONTEXT.strokeStyle = 'black';
  CONTEXT.beginPath();
  CONTEXT.moveTo(0, 0);
  CONTEXT.lineTo(900, 0);
  CONTEXT.lineTo(900, 900);
  CONTEXT.lineTo(0, 900);
  CONTEXT.lineTo(0, 0);
  CONTEXT.moveTo(300, 0);
  CONTEXT.lineTo(300, 900);
  CONTEXT.moveTo(600, 0);
  CONTEXT.lineTo(600, 900);
  CONTEXT.moveTo(0, 300);
  CONTEXT.lineTo(900, 300);
  CONTEXT.moveTo(0, 300);
  CONTEXT.lineTo(900, 300);
  CONTEXT.moveTo(0, 600);
  CONTEXT.lineTo(900, 600);
  CONTEXT.closePath();
  CONTEXT.stroke();
}

/**
 * @desc Función que dibuja sobre un canvas un círculo de radio fijo
 * dada sus coordenadas centrales
 * @param {Number} xCoordinate - Coordenada X central del círculo
 * @param {Number} yCoordinate - Coordenada Y central del círculo
 */
function createCircles(xCoordinate, yCoordinate) {
  const CANVAS = document.getElementById('canvas');
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.beginPath();
  CONTEXT.arc(xCoordinate, yCoordinate, RADIUS, 0, 2 * Math.PI);
  CONTEXT.stroke();
}

/**
 * @desc Función que dibuja una cruz sobre una posición del tablero
 * dado su punto central.
 * @param {Number} xCoordinate - Coordenada X del centro de la cruz
 * @param {Number} yCoordinate - Coordenada Y del centro de la cruz
 */
function createCross(xCoordinate, yCoordinate) {
  const CANVAS = document.getElementById('canvas');
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.beginPath();
  CONTEXT.moveTo(xCoordinate - RADIUS, yCoordinate - RADIUS);
  CONTEXT.lineTo(xCoordinate + RADIUS, yCoordinate + RADIUS);
  CONTEXT.moveTo(xCoordinate - RADIUS, yCoordinate + RADIUS);
  CONTEXT.lineTo(xCoordinate + RADIUS, yCoordinate - RADIUS);
  CONTEXT.stroke();
}
