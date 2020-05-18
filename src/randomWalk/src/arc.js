class Arc {
  constructor(middlePoint, radius, endAngle) {
    this._middlePoint = middlePoint;
    this._radius = radius;
    this._endAngle = endAngle;
  }
  get middlePoint() {
    return this._middlePoint;
  }
  get radius() {
    return this._radius;
  }
  get endAngle() {
    return this._endAngle;
  }
  set middlePoint(point) {
    this._middlePoint = point;
  }
  set radius(newRadius) {
    this._radius = newRadius;
  }
  set endAngle(newAngle) {
    this._endAngle = newAngle;
  }
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.Arc = Arc;
} else { 
  window.Arc = Arc;
}