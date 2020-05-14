'use strict'

let Point;
let canvasModule;
let expect;
let Circle;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  expect = require('chai').expect;
  Circle = require('../src/circle.js').Circle;
} else {
  Point = window.Point;
  canvasModule = window.canvasModule;
  expect = chai.expect;
  Circle = window.Circle;
}

describe('canvasModule', () => {
  it('Should have a method to clear a canvas', () => {
    expect(canvasModule.clearScreen).to.be.a('function');
  });
  it('Should have a method to fix the DPI of a canvas', () => {
    expect(canvasModule.fixDpi).to.be.a('function');
  });
});

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
    const tempCircle = new Circle(new Point(100, 100), 10);
    it('Should return the middle Point', () => {
      expect(tempCircle.middlePoint).to.be.eql(new Point(100, 100));
    });
    it('Should return the radius', () => {
      expect(tempCircle.radius).to.be.eql(10);
    });
    it('Should allow to change the middle point', () => {
      tempCircle.middlePoint = new Point(110, 50);
      expect(tempCircle.middlePoint).to.be.eql(new Point(110, 50));
    });
    it('Should allow to change the radius', () => {
      tempCircle.radius = 20;
      expect(tempCircle.radius).to.be.equal(20);
    });
  });
});
