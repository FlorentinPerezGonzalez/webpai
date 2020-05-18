/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que exporta la clase ComplexNumber
 * @copyright Florentín Pérez Glez 2020
 * @since 28.03.2020
 * @exports ComplexNumber
 * @desc
 * Universidad: Universidad de La Laguna
 *
 * Asignatura: Programación de Aplicaciones Interactivas
 *
 * Curso: 3º
 *
 * Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *
 * Contenido detallado: Contiene la definición de una clase que define
 * números complejos. A sí mismo, la clase contiene un método que permite
 * obtener el módulo del complejo en cuestión.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *
 * Historial de revisiones:
 *    - 28.03.2020 - Creación del código
 *    - 31.03.2020 - Versión presentada para evaluación
 */

 /**
  * @class
  * @classdesc Clase que permite la creación de objetos que represetan
  * número complejos.
  */
export default class ComplexNumber {
  _realNumber = 0;
  _imaginaryNumber = 0;

  /**
   * @constructs
   * @desc Contructor de complejos. Recibe como argumentos la parte
   * entera y real del complejo.
   * @param {Number} realPart Parte entera del complejo.
   * @param {Number} imaginaryPart Parte imaginaria del complejo.
   */
  constructor(realPart, imaginaryPart) {
    this._realNumber = realPart;
    this._imaginaryNumber = imaginaryPart;
  }
  /**
   * @desc Getter de la componente real del complejo.
   * @return {Number} Componente real del complejo.
   */
  get realNumber() {
    return this._realNumber;
  }
   /**
   * @desc Getter de la componente imaginaria del complejo.
   * @return {Number} Componente imaginaria del complejo.
   */
  get imaginaryNumber() {
    return this._imaginaryNumber;
  }
  /**
   * @desc Setter de la parte real del complejo.
   * @param {Number} realPart Nueva componente real.
   */
  set realNumber(realPart) {
    this._realNumber = realPart;
  }
  /**
   * @desc Setter de la parte imaginaria del complejo.
   * @param {Number} realPart Nueva componente imaginaria.
   */
  set imaginaryNumber(imaginaryPart) {
    this._imaginaryNumber = imaginaryPart;
  }
  /**
   * @desc Función que calcula el módulo del número complejo.
   * @return {Number} Módulo del complejo.
   */
  module() {
    return Math.sqrt(this._realNumber * this._realNumber +
      this._imaginaryNumber * this._imaginaryNumber);
  }
}
