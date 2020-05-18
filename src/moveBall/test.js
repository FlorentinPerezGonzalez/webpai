'use strict'

let expect;
let Point;
let Circle;
let Move;
if (typeof require !== 'undefined') {
  expect = require('chai').expect;
  Point = require('./point.js').Point;
  Circle = require('./circle.js').Rectangle;
  Move = require('./move.js').Move;
} else {
  expect = chai.expect;
  Point = window.Point;
  Circle = window.Circle;
  Move = window.Move;
}

describe('Class Point', () => {
  it('Should exist', () => {
    expect(Point).to.be.a('function');
  });
  context('Point functionality', () => {
    const tempPoint = new Point(0, 1);
    it('Should have a X coordinate', () => {
      expect(tempPoint.x).to.be.a('number');
    });
    it('Should have a Y coordinate', () => {
      expect(tempPoint.x).to.be.a('number');
    });
    it('Should return the correct X', () => {
      expect(tempPoint.x).to.be.equal(0);
    });
    it('Should return the correct Y', () => {
      expect(tempPoint.y).to.be.equal(1);
    });
    it('Should be able to to modify the X', () => {
      const expectedPoint = new Point(0, 0);
      expectedPoint.x = 1;
      expect(expectedPoint.x).to.be.equal(1);
    });
    it('Should be able to to modify the y', () => {
      const expectedPoint = new Point(0, 0);
      expectedPoint.y = 1;
      expect(expectedPoint.y).to.be.equal(1);
    });
  });
});

describe('Class Circle', () => {
  it('Should exist', () => {
    expect(Circle).to.be.a('function');
  });
  context('Circle functionality', () => {
    const tempCircle = new Circle(new Point(0, 0), 1);
    it('Should have a middlePoint', () => {
      expect(tempCircle.middlePoint).to.be.a('object');
    });
    it('Should have a radius', () => {
      expect(tempCircle.radius).to.be.a('number');
    });
    it('Should be possible to modify the radius', () => {
      tempCircle.radius = 10;
      expect(tempCircle.radius).to.be.equal(10);
    });
    it('Should be possible to modify the middlePoint', () => {
      const point = new Point(1, 1);
      tempCircle.middlePoint = point;
      expect(tempCircle.middlePoint).to.be.equal(point);
    });
  });
});

describe('Class Move', () => {
  it('Should exist', () => {
    expect(Move).to.be.a('function');
  });
  context('Move functionality', () => {
    const tempMove = new Move(new Point(10, 10));
    it('Should have a middlePoint', () => {
      expect(tempMove.middlePoint).to.be.a('object');
    });
    it('Should have a radius', () => {
      expect(tempMove.radius).to.be.a('number');
    });
    it('Should be possible to modify the radius', () => {
      tempMove.radius = 10;
      expect(tempMove.radius).to.be.equal(10);
    });
    it('Should be possible to modify the middlePoint', () => {
      const point = new Point(1, 1);
      tempMove.middlePoint = point;
      expect(tempMove.middlePoint).to.be.equal(point);
    });
  });
});
