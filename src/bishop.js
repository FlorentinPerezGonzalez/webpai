let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class Bishop extends ChessPiece {
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'B';
    if (color) {
      this._img = imgLoader.pieceImg.alfilB;
    } else {
      this._img = imgLoader.pieceImg.alfilN;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Bishop = Bishop;
} else { 
  window.Bishop = Bishop;
}