class ChessPiece {
  static colDictionary = {
    '1': 'a',
    '2': 'b',
    '3': 'c',
    '4': 'd',
    '5': 'e',
    '6': 'f',
    '7': 'g',
    '8': 'h',
  }

  constructor(row, col) {
    this._row = row;
    this._col = col;
    this._type = undefined;
    this._img = undefined;
    this._color = undefined;
  }

  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }

  get type() {
    return this._type;
  }

  get img(){
    return this._img;
  }

  set row(row) {
    this._row = row;
  }

  set col(col) {
    this._col = col;
  }

  get color() {
    return this._color;
  }

  showPosition() {
    return `${this._type}${ChessPiece.colDictionary[this._col]}${this._row}`;
  }

};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.ChessPiece = ChessPiece;
} else { 
  window.ChessPiece = ChessPiece;
}