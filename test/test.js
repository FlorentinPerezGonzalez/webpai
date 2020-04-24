'use strict'

let Point;
let canvasModule;
let Line;
let expect;
let CoordinateAxis;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  expect = require('chai').expect;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  expect = chai.expect;
  CoordinateAxis = window.CoordinateAxis;
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

describe('Class Line', () => {
  it('Should exist', () => {
    expect(Line).to.be.a('function');
  });
  context('Line functionality', () => {
    const tempLine = new Line(new Point(0, 0), new Point(4, 4));
    it('Should have a initial Point', () => {
      expect(tempLine.initialPoint).to.be.a('object');
    });
    it('Should have a final Point', () => {
      expect(tempLine.finalPoint).to.be.a('object');
    });
    it('Should return the correct initial Point', () => {
      expect(tempLine.initialPoint.x).to.be.equal(0);
      expect(tempLine.initialPoint.y).to.be.equal(0);
    });
    it('Should return the correct final Point', () => {
      expect(tempLine.finalPoint.x).to.be.equal(4);
      expect(tempLine.finalPoint.y).to.be.equal(4);
    });
    it('Should be able to modify the initial Point', () => {
      const expectedLine = new Line(new Point(0, 0), new Point(4, 4));
      expectedLine.initialPoint = new Point(0, 4);
      expect(expectedLine.initialPoint.x).to.be.equal(0);
      expect(expectedLine.initialPoint.y).to.be.equal(4);
    });
    it('Should be able to modify the final Point', () => {
      const expectedLine = new Line(new Point(0, 0), new Point(4, 4));
      expectedLine.finalPoint = new Point(4, 4);
      expect(expectedLine.finalPoint.x).to.be.equal(4);
      expect(expectedLine.finalPoint.y).to.be.equal(4);
    });
    it('Should return the correct length', () => {
      expect(tempLine.length()).to.be.equal(4);
    });
    it('Should calculate the distance between a point and the line', () => {
      const tempPoint = new Point(0, 1);
      expect(tempLine.distanceToLine(tempPoint)).to.be.equal(0.707);
    });
  });
});

describe('Class Line', () => {
  it('Should exist', () => {
    expect(CoordinateAxis).to.be.a('function');
  });
  context('Line functionality', () => {

  });
});