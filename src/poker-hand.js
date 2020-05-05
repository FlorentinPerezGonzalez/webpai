/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Contiene la implementació de la clase PokerHand, que representa
 * una mano de póker.
 * @copyright Florentín Pérez Glez 2020
 * @since 08.04.2020
 * @exports PokerHand
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 8. Poker. Programación orientada a objetos en JS.
 *
 * Contenido detallado: Contiene la implementación de la clase PokerHand
 * que representa una mano de poker. Sus pecularidades están dirigidas a
 * determinar si en la mano se dan las cartas necesarias para que se considere
 * una mano concreta (pareja, doble pareja...). Asimismo, también permite
 * etiquetar una mano concreta con la mano de mayor valor presente.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *    - Poker probability:
 *      https://en.wikipedia.org/wiki/Poker_probability
 *
 * Historial de revisiones:
 *    - 08.04.2020 - Creación del código.
 *    - 14.04.2020 - Versión presentada para evaluación.
 */

 /**
 * @const {Number}
 * @default
 */
const PAIR_NUMBER = 2;
/**
 * @const {Number}
 * @default
 */
const TRIPLE_NUMBER = 3;
/**
 * @const {Number}
 * @default
 */
const STRAIGHT_NUMBER = 5;
/**
 * @const {Number}
 * @default
 */
const MAX_CARD_VALUE = 13;
/**
 * @const {Number}
 * @default
 */
const FOUR_OF_A_KIND_NUMBER = 4;
/**
 * @const {Number}
 * @default
 */
const FLUSH_NUMBER = 5;
const SIZE_DIFFERENCE = 20;

let card;
let hand;
if (typeof require !== 'undefined') {
  card = require('./card.js');
  hand = require('./hand.js')
} else {
  card = window.cardModule;
  hand = window.handModule;
}

/**
 * @desc Clase que representa una mano de poker.
 */
class PokerHand extends hand.Hand {
  /**
   * @desc Constructor de la clase PokerHand
   * @param {string} label Etiqueta que da nombre a la mano 
   */
  constructor(label = 'Simple Hand') {
    super(label);
  }
  /**
   * @desc Comprueba si en la mano se da una pareja.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasPair() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.value] === undefined) {
        tempArray[card.value] = 0;
      }
      tempArray[card.value]++;
    }
    if (tempArray.find(data => data === PAIR_NUMBER)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc Comprueba si en la mano se da una doble pareja.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasTwoPair() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.value] === undefined) {
        tempArray[card.value] = 0;
      }
      tempArray[card.value]++;
    }
    let pairCounters = 0;
    tempArray.forEach(function(data) {
      if (data === PAIR_NUMBER) {
        pairCounters++;
      }
    });
    return pairCounters >= PAIR_NUMBER;
  }

  /**
   * @desc Comprueba si en la mano se da un triple.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasThreeOfAKind() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.value] === undefined) {
        tempArray[card.value] = 0;
      }
      tempArray[card.value]++;
    }
    if (tempArray.find(data => data === TRIPLE_NUMBER)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc Comprueba si en la mano se da una escalera.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasStraight() {
    function checkIfStraight() {
      let isAsPresent = false;
      let tempCardValue = tempArray[0].value;
      if (tempCardValue === 1) {
        isAsPresent = true;
      }
      tempArray.shift();
      let counter = 1;
      for (const card of tempArray) {
        if(card.value === 1) {
          isAsPresent = true;
        }
        if (card.value === (tempCardValue + 1)) {
          counter++;
          tempCardValue = card.value;
          if (counter === STRAIGHT_NUMBER) {
            break;
          }
        } else if (card.value === tempCardValue) {
          continue;
        } else {
          counter = 1;
          tempCardValue = card.value;
        }
      }
      return (counter >= STRAIGHT_NUMBER) ||
        ((counter === STRAIGHT_NUMBER - 1) &&
        (tempCardValue === MAX_CARD_VALUE) && (isAsPresent));
    }
    function sortHand() {
      tempArray.sort(function(firstCard, secondCard) {
        if (firstCard.value < secondCard.value) {
          return -1;
        } else if (firstCard.value === secondCard.value) {
          return 0;
        } else {
          return 1;
        }
      });
    }
    let tempArray = this._cards.slice();
    sortHand();
    return checkIfStraight();
  }

  /**
   * @desc Comprueba si en la mano se da un "color".
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasFlush() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.suit] === undefined) {
        tempArray[card.suit] = 0;
      }
      tempArray[card.suit]++;
    }
    if (tempArray.find(data => data >= FLUSH_NUMBER)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc Comprueba si en la mano se da un "Full".
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasFullHouse() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.value] === undefined) {
        tempArray[card.value] = 0;
      }
      tempArray[card.value]++;
    }
    let pairCounters = 0;
    let tripleCounter = 0;
    tempArray.forEach(function(data) {
      if (data === PAIR_NUMBER) {
        pairCounters++;
      } else if (data === TRIPLE_NUMBER) {
        tripleCounter++;
      }
    });
    return (pairCounters >= 1 && tripleCounter >= 1);
  }

  /**
   * @desc Comprueba si en la mano se da un "Poker".
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasFourOfAKind() {
    const tempArray = [];
    for (const card of this._cards) {
      if (tempArray[card.value] === undefined) {
        tempArray[card.value] = 0;
      }
      tempArray[card.value]++;
    }
    if (tempArray.find(data => data >= FOUR_OF_A_KIND_NUMBER)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc Comprueba si en la mano se da una escalera real.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  hasStraightFlush() {
    function checkIfStraightFlush() {
      let tempCard = tempArray[0];
      const asSuitArray = [];
      const fourCounterSuitArray = [];
      tempArray.shift();
      if (tempCard.value === 1) {
        asSuitArray.push(tempCard.suit);
      }
      let valueCounter = 1;
      for (const card of tempArray) {
        if (card.value === 1) {
          asSuitArray.push(card.suit);
        }
        if ((card.value === (tempCard.value + 1)) &&
        (card.suit === tempCard.suit)) {
          valueCounter++;
          tempCard = card;
          if ((valueCounter === STRAIGHT_NUMBER - 1)
            && (tempCard.value === MAX_CARD_VALUE)) {
            fourCounterSuitArray.push(tempCard.suit);
          }
          if (valueCounter === STRAIGHT_NUMBER) {
            break;
          }
        } else {
          if ((valueCounter === STRAIGHT_NUMBER - 1)
            && (tempCard.value === MAX_CARD_VALUE)) {
            fourCounterSuitArray.push(tempCard.suit);
          }
          valueCounter = 1;
          tempCard = card;
        }
      }
      if (valueCounter >= STRAIGHT_NUMBER) {
        return true;
      } else if ((asSuitArray.length === 0) ||
        (fourCounterSuitArray.length === 0)) {
        return false;
      } else {
        let result = false;
        for (const suit of asSuitArray) {
          if (fourCounterSuitArray.indexOf(suit) !== -1) {
            result = true;
            break;
          }
        }
        return result;
      }
    }
    function sortHand() {
      tempArray.sort(function(firstCard, secondCard) {
        const firstCardValue = 100 * firstCard.suit + firstCard.value;
        const secondCardValue = 100 * secondCard.suit + secondCard.value;
        if (firstCardValue < secondCardValue) {
          return -1;
        } else if (firstCardValue === secondCardValue) {
          return 0;
        } else {
          return 1;
        }
      });
    }
    let tempArray = this._cards.slice();
    sortHand();
    return checkIfStraightFlush();
  }

  /**
   * @desc Comprueba si en la mano se da una pareja.
   * @return {Bool} True si se da la mano. False para el caso contrario.
   */
  classify() {
    if (this.hasStraightFlush()) {
      this._label = 'Straight Flush';
    } else if (this.hasFourOfAKind()) {
      this._label = 'Four of a Kind';
    } else if (this.hasFullHouse()) {
      this._label = 'Full House';
    } else if (this.hasFlush()) {
      this._label = 'Flush';
    } else if (this.hasStraight()) {
      this._label = 'Straight';
    } else if (this.hasThreeOfAKind()) {
      this._label = 'Three of a Kind';
    } else if (this.hasTwoPair()) {
      this._label = 'Two Pair';
    } else if (this.hasPair()) {
      this._label = 'Pair';
    }
  }

  draw(context, height, width) {
    let startX = SIZE_DIFFERENCE;
    let startY = SIZE_DIFFERENCE;
    let counter = 0;
    const widthIncrement = width/this._cards.length;
    for (const card of this._cards) {
      context.drawImage(card.img, startX + counter * widthIncrement, startY,
        widthIncrement - SIZE_DIFFERENCE * 2, height - SIZE_DIFFERENCE * 2);
        counter++;
    }
  }

};

if (typeof exports !== 'undefined') {
  exports.PokerHand = PokerHand;
} else {
  window.pokerHandModule = {};
  window. pokerHandModule.PokerHand = PokerHand;
}
