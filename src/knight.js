let ChessPiece;
let imgLoader;
if (typeof require !== 'undefined') {
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  imgLoader = require('../src/imgLoader.js').imgLoader;
} else {
  ChessPiece = window.ChessPiece;
  imgLoader = window.imgLoader;
}

class Knight extends ChessPiece {
  constructor(row, col, color) {
    super(row, col);
    this._color = color;
    this._type = 'N';
    if (color) {
      this._img = imgLoader.pieceImg.caballoB;
    } else {
      this._img = imgLoader.pieceImg.caballoN;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Knight = Knight;
} else { 
  window.Knight = Knight;
}