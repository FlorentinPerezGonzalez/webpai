/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Permite calcular la envolvente convexa de un cpnjunto de puntos a
 * través del algortimo QuickHull implementado recursivamente.
 * @copyright Florentín Pérez Glez 2020
 * @since 21.03.2020
 * @requires module:line.js
 * @requires module:canvasUtility.js
 * @requires module:generalUtility.js
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 6. QuickHull. Gráficos en JS usando Canvas
 *
 * Contenido detallado: Contiene la implementación de numerosas funciones que
 * que están dirigidas a calcular la envolvente convexa de un conjunto de puntos
 * y mostrar su resultado en un canvas existente en un fichero HTML.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md
 *    - Definición de envolvente convexa
 *      https://en.wikipedia.org/wiki/Convex_hull
 *    - Explicación del algoritmo QuickHull
 *      https://en.wikipedia.org/wiki/Quickhull
 *
 * Historial de revisiones:
 *    - 21.03.2020 - Creación del código
 *    - 24.03.2020 - Versión presentada para evaluación
 */

import * as pointModule from './point.js';
import * as lineModule from './line.js';
import * as canvasModule from './canvasUtility.js';
import * as generalModule from './generalUtility.js';
'use strict';

const ABOVE = 1;
const UNDER = 0;

const BUTTONPOINT = document.getElementById('buttonPoint');
BUTTONPOINT.addEventListener('click', mainCoordinator);

/**
 * @desc Función que gestiona el proceso de ejecución del algortimo QuickHull.
 * Obtiene la referencia al canvas en el que se mostrará el resultado del
 * algortimo. De igual manera, también genera los puntos con los que se
 * trabajarán.
 */
function mainCoordinator() {
  const CANVAS = document.getElementById('canvas');
  const CONTEXT = canvas.getContext('2d');
  canvasModule.fixDpi(CANVAS);
  const nPoints = parseInt(document.getElementById('numberOfPoints').value);
  try {
    const originalPoints = generatePoints(CANVAS, nPoints);
    const setOfPoints = originalPoints.slice();
    canvasModule.clearScreen(CONTEXT, CANVAS);
    drawPoints(setOfPoints, CONTEXT);
    quickHull(CONTEXT, setOfPoints, CANVAS, originalPoints);
  } catch (error) {}
}

/**
 * @desc Función que genera un conjunto de puntos con
 * coordenadas contenidas dentro de las dimensiones de un canvas.
 * @param {Canvas} CANVAS - Referencia a un canvas presente en el documento
 * HTML.
 * @param {Number} nPoints - Cantidad de puntos a generar en el canvas.
 * @return {Array} - Array con los puntos generados. Cada punto es, además,
 * único en coordenadas.
 */
function generatePoints(CANVAS, nPoints) {
  if (nPoints < 3) {
    alert('Input must be a number greater than 2');
    throw new Error;
  }
  const setOfPoints = [];
  if (nPoints > 0) {
    for (let i = 0; i < nPoints; i++) {
      const yCoordiante = Math.round(Math.random() * CANVAS.height - 1);
      const xCoordinate = Math.round(Math.random() * CANVAS.width - 1);
      setOfPoints.push(pointModule.createPoint(xCoordinate, yCoordiante));
    }
  } else {
    alert('Input must be a number greater than 0');
    throw new Error;
  }
  return generalModule.makeUnique(setOfPoints);
}

/**
 * @desc Función que permite dibujar un conjunto de puntos en un canvas
 * dado su contexto.
 * @param {Array} setOfPoints - Conjunto de puntos a dibujar en el canvas
 * @param {Context} CONTEXT - Contexto asociado a un canvas
 * @param {String} color - String que identifica a un color. Por ejemplo:
 * 'red', 'blue', ...
 */
function drawPoints(setOfPoints, CONTEXT, color) {
  CONTEXT.strokeStyle = color;
  for (const point of setOfPoints) {
    CONTEXT.beginPath();
    CONTEXT.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    CONTEXT.fill();
    CONTEXT.stroke();
  }
}

/**
 * @desc Función que permite dividir un conjunto de puntos en dos en función
 * de si se encuentran por debajo o encima de una recta dada.
 * @param {Object} line - Recta que separa el conjunto en dos
 * @param {Array} setOfPoints - Conjunto de puntos a separar
 * @return {Array} - Array de dos elementos. Cada uno es otro array con los
 * puntos que se encuentran a cada lado de una recta respectivamente.
 */
function divideSetByALine(line, setOfPoints) {
  // Crear función checkIfVertical
  if (line.finalPoint.x - line.initialPoint.x === 0) {
    return [[], []];
  }
  const slope = (line.finalPoint.y - line.initialPoint.y) /
    (line.finalPoint.x - line.initialPoint.x);
  const yIntercept = -1 * slope * line.initialPoint.x + line.initialPoint.y;
  const result = [[], []];
  for (const point of setOfPoints) {
    if (point.y > slope * point.x + yIntercept) {
      result[UNDER].push(pointModule.createPoint(point.x, point.y));
    } else if (point.y < slope * point.x + yIntercept) {
      result[ABOVE].push(pointModule.createPoint(point.x, point.y));
    }
  }
  return result;
}

/**
 * @desc Función que ejecuta el algortimo QuickHull sobre un conjunto
 * de puntos. Supone la fase inicial del mismo, la que añade a la solución
 * los puntos más cercanos a los extremos en cuanto a la coordenada X
 * se refiere. Su implementación es recursiva.
 * @param {Context} CONTEXT - Contexto del canvas sobre el que se mostrarán
 * los resultados.
 * @param {Array} setOfPoints - Conjunto de puntos sobre los que aplicar el
 * algortimo.
 * @param {Canvas} CANVAS - Canvas donde se representarán los resultados.
 * @param {Array} originalPoints - Array de puntos originales
 */
async function quickHull(CONTEXT, setOfPoints, CANVAS, originalPoints) {
  const convexHull = [];
  setOfPoints.sort( (firstPoint, secondPoint) => {
    if (firstPoint.x < secondPoint.x) {
      return -1;
    } else if (firstPoint.x > secondPoint.x) {
      return 1;
    } else {
      return 0;
    }
  });
  const MINIMUN_X_POINT = setOfPoints.shift();
  const MAXIMUN_X_POINT = setOfPoints.pop();
  convexHull.push(MINIMUN_X_POINT, MAXIMUN_X_POINT);
  const convexHullcopy = convexHull.slice();
  await generalModule.sleep(1000);
  drawConvexHull(CONTEXT, convexHullcopy, CANVAS, originalPoints);
  await generalModule.sleep(1000);
  const INITIAL_LINE = lineModule.lineFromTo(MINIMUN_X_POINT, MAXIMUN_X_POINT);
  const subSetOfPoints = divideSetByALine(INITIAL_LINE, setOfPoints);
  await findHull(CONTEXT, CANVAS, convexHull, subSetOfPoints[UNDER],
      INITIAL_LINE, UNDER, originalPoints);
  await findHull(CONTEXT, CANVAS, convexHull, subSetOfPoints[ABOVE],
      INITIAL_LINE, ABOVE, originalPoints);
}

/**
 * @desc Función que realiza las etapas posteriores a la inicial en el
 * algortimo QuickHull. Se encarga de encontrar el resto de puntos que
 * forman parte de la envolvente convexa. Su implementación es recursiva.
 * @param {Context} CONTEXT - Contexto del canvas sobre el que se mostrarán
 * los resultados.
 * @param {Canvas} CANVAS - Canvas sobre el que se mostrarán los resultados.
 * @param {Array} convexHull - Conjunto de puntos que forman parte de la
 * envolvente convexa.
 * @param {Array} setOfPoints - Conjunto de puntos sobre los que opera el
 * algortimo.
 * @param {Object} currentLine - Línea sobre la que se calcula el punto más
 * alejado de a la misma, entendido este como un integrante de la envolvente
 * convexa.
 * @param {Number} flag - Número que puede tomar dos valores. 0 y 1, que se
 * corresponde con Under y Above correspondientemente. Indican sobre que
 * conjunto de puntos debería operar la siguiente llamada a la función en
 * su procedimiento recursivo.
 * @param {Array} originalPoints - Array de puntos originales
 */
async function findHull(CONTEXT, CANVAS, convexHull, setOfPoints,
    currentLine, flag, originalPoints) {
  if (setOfPoints.length === 0) {
    return;
  }
  let farthestPoint;
  let farthestDistance = -Infinity;
  for (const point of setOfPoints) {
    const distance =
      lineModule.calculateDistancePointToLine(point, currentLine);
    if (distance > farthestDistance) {
      farthestDistance = distance;
      farthestPoint = point;
    }
  }
  convexHull.push(farthestPoint);
  const convexHullcopy = convexHull.slice();
  drawQuickHullStep(CONTEXT, currentLine, farthestPoint);
  await generalModule.sleep(1000);
  drawConvexHull(CONTEXT, convexHullcopy, CANVAS, originalPoints);
  await generalModule.sleep(1000);
  const index = setOfPoints.indexOf(farthestPoint);
  setOfPoints.splice(index, 1);
  const FIRST_SUB_SET_LINE =
    lineModule.lineFromTo(currentLine.initialPoint, farthestPoint);
  const SECOND_SUB_SET_LINE =
    lineModule.lineFromTo(currentLine.finalPoint, farthestPoint);
  const firstSubSet = divideSetByALine(FIRST_SUB_SET_LINE, setOfPoints);
  const secondSubSet = divideSetByALine(SECOND_SUB_SET_LINE, setOfPoints);
  if (flag === UNDER) {
    await findHull(CONTEXT, CANVAS, convexHull,
        firstSubSet[UNDER], FIRST_SUB_SET_LINE, UNDER, originalPoints);
    await findHull(CONTEXT, CANVAS, convexHull,
        secondSubSet[UNDER], SECOND_SUB_SET_LINE, UNDER, originalPoints);
  } else {
    await findHull(CONTEXT, CANVAS, convexHull,
        firstSubSet[ABOVE], FIRST_SUB_SET_LINE, ABOVE, originalPoints);
    await findHull(CONTEXT, CANVAS, convexHull,
        secondSubSet[ABOVE], SECOND_SUB_SET_LINE, ABOVE, originalPoints);
  }
}

/**
 * @desc Función que permite dibujar el paso del algortimo
 * a través del cual se construye un triángulo entre la recta
 * considerada y el punto más alejado a la misma, entendido este
 * como un integrante de la envolvente convexa.
 * @param {Context} CONTEXT - Contexto del canvas asociado sobre
 * el que se mostrarán los resultados.
 * @param {Object} line - Recta sobre la que se calcula el punto
 * más alejado de la misma. Se requiere para poder dibujar el
 * susodicho triángulo.
 * @param {Object} point - Punto más alejado de la recta. Se requiere
 * para poder dibujar el triángulo.
 */
function drawQuickHullStep(CONTEXT, line, point) {
  CONTEXT.beginPath();
  CONTEXT.moveTo(line.initialPoint.x, line.initialPoint.y);
  CONTEXT.lineTo(point.x, point.y);
  CONTEXT.lineTo(line.finalPoint.x, line.finalPoint.y);
  CONTEXT.stroke();
}

/**
 * @desc Función que permite dibujar la envolvente convexa
 * hasta ahora calculada.
 * @param {Context} CONTEXT - Contexto del canvas sobre el que
 * se mostrarán los resultados.
 * @param {Array} convexHull - Conjunto de puntos que conforman la
 * envolvente convexa hasta ahora calculada.
 * @param {Canvas} CANVAS - Canvas sobre el que se muestran los resultados
 * de la función.
 * @param {Array} originalPoints - Array de puntos originales
 */
function drawConvexHull(CONTEXT, convexHull, CANVAS, originalPoints) {
  const CONVEXT_HULL_SIZE = convexHull.length;
  canvasModule.clearScreen(CONTEXT, CANVAS);
  drawPoints(originalPoints, CONTEXT, 'black');
  CONTEXT.closePath();
  drawPoints(convexHull, CONTEXT, 'red');
  convexHull.sort( (firstPoint, secondPoint) => {
    if (firstPoint.y < secondPoint.y) {
      return -1;
    } else if (firstPoint.y > secondPoint.y) {
      return 1;
    } else {
      return 0;
    }
  });
  CONTEXT.beginPath();
  let flag = true;
  CONTEXT.moveTo(convexHull[0].x, convexHull[0].y);
  let point = convexHull.shift();
  while (flag) {
    flag = false;
    for (const pointOfHull of convexHull) {
      if (pointOfHull.x >= point.x) {
        CONTEXT.lineTo(pointOfHull.x, pointOfHull.y);
        point = pointOfHull;
        convexHull.splice(convexHull.indexOf(pointOfHull), 1);
        flag = true;
        break;
      }
    }
  }
  flag = true;
  while (flag) {
    flag = false;
    let nearestPoint;
    let distance = Infinity;
    for (const pointOfHull of convexHull) {
      if ((pointOfHull.y >= point.y) && (point.x - pointOfHull.x) < distance) {
        flag = true;
        nearestPoint = pointOfHull;
        distance = (point.x - pointOfHull.x);
      }
    }
    if (flag) {
      CONTEXT.lineTo(nearestPoint.x, nearestPoint.y);
      point = nearestPoint;
      convexHull.splice(convexHull.indexOf(nearestPoint), 1);
    }
  }
  flag = true;
  while (flag) {
    flag = false;
    let nearestPoint;
    let distance = Infinity;
    for (const pointOfHull of convexHull) {
      if ((point.y - pointOfHull.y) < distance) {
        flag = true;
        nearestPoint = pointOfHull;
        distance = (point.y - pointOfHull.y);
      }
    }
    if (flag) {
      CONTEXT.lineTo(nearestPoint.x, nearestPoint.y);
      point = nearestPoint;
      convexHull.splice(convexHull.indexOf(nearestPoint), 1);
    }
  }
  if (CONVEXT_HULL_SIZE > 2) {
    CONTEXT.closePath();
  }
  CONTEXT.stroke();
}
