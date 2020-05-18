/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Modulo que exporta una función que permite la conversión de
 * HSL a RGB
 * @copyright Florentín Pérez Glez 2020
 * @since 28.03.2020
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
 * Contenido detallado: Contiene la implementación de la función HSLToRGB
 * que permite convertir un color de HSL a RGB.
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

/**
 * 
 * @param {Number} hue - Componente matiz del HSL.
 * @param {Number} saturation - Componente saturación del HSL.
 * @param {Number} lightness - Componente luminosidad del HSL.
 * @return {Object} Objeto con las tres componentes RGB.
 */
export default function HSLToRGB(hue, saturation, lightness) {
  saturation /= 100;
  lightness /= 100;
  let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation,
  secondLargestComponent = chroma * (1 - Math.abs((hue / 60) % 2 - 1)),
  medium = lightness - chroma/2,
  red = 0,
  green = 0,
  blue = 0;
  if (0 <= hue && hue < 60) {
    red = chroma; green = secondLargestComponent; blue = 0;
  } else if (60 <= hue && hue < 120) {
    red = secondLargestComponent; green = chroma; blue = 0;
  } else if (120 <= hue && hue < 180) {
    red = 0; green = chroma; blue = secondLargestComponent;
  } else if (180 <= hue && hue < 240) {
    red = 0; green = secondLargestComponent; blue = chroma;
  } else if (240 <= hue && hue < 300) {
    red = secondLargestComponent; green = 0; blue = chroma;
  } else if (300 <= hue && hue < 360) {
    red = chroma; green = 0; blue = secondLargestComponent;
  }
  red = Math.round((red + medium) * 255);
  green = Math.round((green + medium) * 255);
  blue = Math.round((blue + medium) * 255);
    
  return {red, green, blue};
}