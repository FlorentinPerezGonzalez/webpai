/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementación del módulo principal del programa
 * BouncingBall.
 * @copyright Florentín Pérez Glez 2020
 * @since 19.05.2020
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 13. BouncingBall.
 *
 * Contenido detallado: Se trata del módulo principal del programa JS que
 * representa un una bola que se desplaza por un entorno y es capaz de rebotar
 * con los límites del mismo. En el mismo se establecen referencias a elementos del DOM
 * y se inicializa toda variable u objeto que resulta fundamental para el correcto
 * funcionamiento del programa.
 * 
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md
 *
 * Historial de revisiones:
 *    - 19.05.2020 - Versión presentada para evaluación.
 */

'use strict';

let canvasModule;
let BouncingBall;
if (typeof require !== 'undefined') {
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  BouncingBall = require('../src/bouncing-ball-display.js').BouncingBall;
} else {
  canvasModule = window.canvasModule;
  BouncingBall = window.BouncingBall;
}

const CANVAS = document.getElementById('canvas');
canvasModule.fixDpi(CANVAS);
const GAME = new BouncingBall(CANVAS, 30, 10, 10);
GAME.startGame();
