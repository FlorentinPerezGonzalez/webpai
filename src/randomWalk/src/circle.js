class Circle {
  constructor(middlePoint, radius) {
    this._middlePoint = middlePoint;
    this._radius = radius;
  }
  get middlePoint() {
    return this._middlePoint;
  }
  get radius() {
    return this._radius;
  }
  set middlePoint(point) {
    this._middlePoint = point;
  }
  set radius(newRadius) {
    this._radius = newRadius;
  }
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Circle = Circle;
} else { 
  window.Circle = Circle;
}
