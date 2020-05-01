let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class King extends ChessPiece {
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'K';
    if (color) {
      this._img = imgLoader.pieceImg.reyB;
    } else {
      this._img = imgLoader.pieceImg.reyN;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.King = King;
} else { 
  window.King = King;
}