'use strict'

let Point;
let canvasModule;
let expect;
let Circle;
let Ball;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  expect = require('chai').expect;
  Circle = require('../src/circle.js').Circle;
  Ball = require('../src/ball.js').Ball;
} else {
  Point = window.Point;
  canvasModule = window.canvasModule;
  expect = chai.expect;
  Circle = window.Circle;
  Ball = window.Ball;
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

describe('Class Ball', () => {
  it('Should exist', () => {
    expect(Ball).to.be.a('function');
  });
  context('Ball functionality', () => {
    const tempBall = new Ball(new Point(100, 110), 10, 5, 6);
    it('Should return the initial Point', () => {
      expect(tempBall.middlePoint).to.be.eql(new Point(100, 110));
    });
    it('Should return the radius', () => {
      expect(tempBall.radius).to.be.eql(10);
    });
    it('Should allow to get and set the speed in the X axis', () => {
      tempBall.xSpeed = 20;
      expect(tempBall.xSpeed).to.be.eql(20);
    });
    it('Should allow to get and set the speed in the Y axis', () => {
      tempBall.ySpeed = 30;
      expect(tempBall.ySpeed).to.be.equal(30);
    });
    it('Should allow to get the current X position', () => {
      expect(tempBall.xPosition).to.be.equal(100);
    });
    it('Should allow to get the current Y position', () => {
      expect(tempBall.yPosition).to.be.equal(110);
    });
    it('Should have a method to update the ball position', () => {
      expect(tempBall.update).to.be.a('function');
    });
    it('The update method should work correctly', () => {
      tempBall.update();
      expect(tempBall.xPosition).to.be.equal(105);
      expect(tempBall.yPosition).to.be.equal(116);
    });
  });
});
