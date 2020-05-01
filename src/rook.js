let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class Rook extends ChessPiece {
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'R';
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Rook = Rook;
} else { 
  window.Rook = Rook;
}