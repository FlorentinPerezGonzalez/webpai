let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class Pawn extends ChessPiece {
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = '';
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Pawn = Pawn;
} else { 
  window.Pawn = Pawn;
}