class Cell {
  static DEAD = 0;
  static ALIVE = 1;
  constructor() {
    this._state = Cell.DEAD;
    this._previousState = Cell.DEAD;
  };

  get state() {
    return this._state;
  }

  get previousState() {
    return this._previousState;
  }

  changeState() {
    this._previousState = this._state;
    if (this._state === Cell.DEAD) {
      this._state = Cell.ALIVE;
    } else {
      this._state = Cell.DEAD;
    }
  }
};

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Cell = Cell;
} else { 
  window.Cell = Cell;
}
