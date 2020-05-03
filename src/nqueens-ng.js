let ChessBoard;
let Queen;
let Line;
let Point;
let generalUtility;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/chess-board.js').ChessBoard;
  Line = require('../src/line.js').Line;
  Point = require('../src/point.js').Point;
  Queen = require('../src/queen.js').Queen;
  generalUtility = require('../src/generalUtility.js').generalUtility;
} else {
  ChessBoard = window.ChessBoard;
  Line = window.Line;
  Point = window.Point;
  Queen = window.Queen;
  generalUtility = window.generalUtility;
}

class NQueensNG {
  constructor(size) {
    this._size = size;
  }

  _createDataContainer(xCoordinates, xToChoose, yToChoose) {
    return {
      xArray: xCoordinates,
      currentX: xToChoose,
      currentY: yToChoose,
    };
  }

  resolve() {
    const result = [];
    //const dictionary = buildDictionary(size);
    const board = [];
    const dataContainer = [];
    const initialData = this._createDataContainer(
        generalUtility.range(0, this._size - 1, 1),
        0,
        0);
    dataContainer.push(initialData);
    while (dataContainer.length > 0) {
      const length = dataContainer.length;
      const currentX = dataContainer[length - 1].currentX;
      const currentY = dataContainer[length - 1].currentY;
      const xCoordinate = dataContainer[length - 1].xArray[currentX];
      const yCoordinate = currentY;
      const queen = new Queen(xCoordinate, yCoordinate, 0);
      if (this._checkIfConflict(board, queen)) {
        if (currentX < dataContainer[length - 1].xArray.length -1) {
          dataContainer[length - 1].currentX++;
        } else {
          dataContainer.pop();
          board.pop();
        }
      } else {
        board.push(queen);
        if (dataContainer[length - 1].xArray.length === 1) { // Solución encontrada
          result.push(board.slice());
          dataContainer.pop();
          board.pop();
          board.pop();
        } else {
          dataContainer[length - 1].currentX++;
          const newXArray = dataContainer[length - 1].xArray.slice();
          newXArray.splice(currentX, 1);
          const newData = this._createDataContainer(
              newXArray,
              0,
              currentY + 1);
          dataContainer.push(newData);
        }
      }
    }
    return this._buildConfiguration(result);
  }

/**
 * Comrpruba si las reinas de un tablero entran en clonflicto
 * con una nueva especificada por 'point'
 * @param {Object} board - Colección de puntos
 * @param {Object} toCheckPoint - Punto nuevo a validar
 * @return {Boolean} - True si no se da conflicto alguno
 */
  _checkIfConflict(board, toCheckQueen) {
    if (!Number.isInteger(toCheckQueen.row) ||
        !Number.isInteger(toCheckQueen.col)) {
      return true;
    }
    let result = false;
    for (const queen of board) {
      const xCoordinate = toCheckQueen.row;
      const yCoordinate = toCheckQueen.col;
      const toCheckPoint = new Point(xCoordinate, yCoordinate);
      const principalDiagonalPoint = new Point(xCoordinate + 1, yCoordinate - 1);
      const secondaryDiagonalPoint = new Point(xCoordinate - 1, yCoordinate - 1);
      const principalDiagonalLine = new Line(principalDiagonalPoint, toCheckPoint);
      const secondaryDiagonalLine = new Line(secondaryDiagonalPoint, toCheckPoint);
      const tempPoint = new Point(queen.row, queen.col);
      if ((principalDiagonalLine.isPointInLine(tempPoint)) ||
      (secondaryDiagonalLine.isPointInLine(tempPoint))) {
        result = true;
        break;
      }  else {
        for (const currentQueen of board) {
          const currentPoint = new Point(currentQueen.row, currentQueen.col);
          const betweenLine = new Line(toCheckPoint, tempPoint)
          betweenLine.isPointInLine(currentPoint);
          if (betweenLine.isPointInLine(currentPoint) &&
          currentPoint !== tempPoint) {
            result = true;
            break;
          }
        }
        if (result) {
          break;
        }
      }
    }
    return result;
  }

  _buildConfiguration(result) {
    const configurations = [];
    for (const board of result) {
      configurations.push(Object.create(null));
      configurations[configurations.length - 1].size = this._size;
      let counter = 0;
      for (const piece of board) {
        configurations[configurations.length - 1][`piece${counter}`] = {};
        configurations[configurations.length - 1][`piece${counter}`].color = piece.color;
        configurations[configurations.length - 1][`piece${counter}`].type = 'queen';
        configurations[configurations.length - 1][`piece${counter}`].row = piece.row;
        configurations[configurations.length - 1][`piece${counter++}`].col = piece.col;
      }
    }
    return configurations;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.NQueensNG = NQueensNG;
} else { 
  window.NQueensNG = NQueensNG;
}
