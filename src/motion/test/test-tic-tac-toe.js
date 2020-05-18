'use strict'

let Point;
let canvasModule;
let Line;
let expect;
let Circle;
let Matrix;
let Game;
let XFigure;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  expect = require('chai').expect;
  Matrix = require('../src/matrix.js').Matrix;
  Circle = require('../src/circle.js').Circle;
  Game = require('../src/game.js').Game;
  XFigure = require('../src/xFigure.js').XFigure
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  expect = chai.expect;
  Matrix = window.Matrix;
  Circle = window.Circle;
  Game = window.Game;
  XFigure = window.XFigure;
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

describe('Class Matrix', () => {
  it('Should exist', () => {
    expect(Matrix).to.be.a('function');
  });
  context('Circle functionality', () => {
    const tempMatrix = new Matrix(3, 3);
    it('Should have a method to clear', () => {
      expect(tempMatrix.clear).to.be.a('function');
    });
    it('Should return the matrix size', () => {
      expect(tempMatrix.size()).to.be.eql(9);
    });
    it('Should return the number of rows', () => {
      expect(tempMatrix.rows).to.be.eql(3);
    });
    it('Should return the number of cols', () => {
      expect(tempMatrix.cols).to.be.eql(3);
    });
    it('Should have a method to return the data', () => {
      expect(tempMatrix.getData).to.be.a('function');
    });
    it('Should return the data of a certain position', () => {
      expect(tempMatrix.getData(2, 1)).to.be.eql(0);
    });
    it('Should have a method to modify the data', () => {
      expect(tempMatrix.setData).to.be.a('function');
    });
    it('Should modify the data of a certain position', () => {
      tempMatrix.setData(2, 1, 5);
      expect(tempMatrix.getData(2, 1)).to.be.eql(5);
    });
  });
});

describe('Class Game', () => {
  it('Should exist', () => {
    expect(Game).to.be.a('function');
  });
  context('Game functionality', () => {
    let tempGame;
    beforeEach(() => {
      tempGame = new Game;
    });
    it('Should have a method to insert an X in a position', () => {
      expect(tempGame.insertX).to.be.a('function');
    });
    it('Should have a method to insert an Y in a position', () => {
      expect(tempGame.insertY).to.be.a('function');
    });
    it('Should have a method that checks if a position is free', () => {
      expect(tempGame.checkPosition).to.be.a('function');
    });
    it('Should have a method that checks if there is a winner', () => {
      expect(tempGame.checkIfWinner).to.be.a('function');
    });
    it('Should have a method that return the numbers of free positions available', () => {
      expect(tempGame.getFree).to.be.a('function');
    });
    it('Should return the numbers of free positions correctly', () => {
      expect(tempGame.getFree()).to.be.eql(9);
    });
  });
});

describe('Class XFigure', () => {
  it('Should exist', () => {
    expect(XFigure).to.be.a('function');
  });
  context('XFigure functionality', () => {
    let tempX;
    beforeEach(() => {
      tempX = new XFigure(new Point(100, 100), 10, 8);
    });
    it('Should return the central position', () => {
      expect(tempX.centralPoint).to.be.eql(new Point(100, 100));
    });
    it('Should return the length of each line', () => {
      expect(tempX.length).to.be.eql(10);
    });
    it('Should return the lineWidth of each line', () => {
      expect(tempX.lineWidth).to.be.eql(8);
    });
    it('Should have a method to draw the X', () => {
      expect(tempX.draw).to.be.a('function');
    });
  });
});
