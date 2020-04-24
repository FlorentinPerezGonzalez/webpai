'use strict'

let Point;
let Line;
let Grid;
let RandomWalk;
let canvasModule;
let expect;
let setup;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  Grid = require('../src/grid.js').Grid;
  RandomWalk = require('../src/random-walk.js').RandomWalk;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  setup = require('../src/index.js').setup;
  expect = require('chai').expect;
} else {
  Point = window.Point;
  Line = window.Line;
  Grid = window.Grid;
  RandomWalk = window.RandomWalk;
  canvasModule = window.canvasModule;
  setup = window.setup;
  expect = chai.expect;
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

describe('Class Grid', () => {
  it('Should exist', () => {
    expect(Grid).to.be.a('function');
  });
  context('Grid functionality', () => {
    const tempGrid = new Grid();
    it('Should have a number of rows', () => {
      expect(tempGrid.rows).to.be.a('number');
    });
    it('Should have a number of cols', () => {
      expect(tempGrid.cols).to.be.a('number');
    });
    it('Should be able to get rows', () => {
      expect(tempGrid.rows).to.be.eql(2);
    });
    it('Should be able to get cols', () => {
      expect(tempGrid.cols).to.be.eql(2);
    });
    it('Should be able to change rows', () => {
      tempGrid.rows = 3;
      expect(tempGrid.rows).to.be.eql(3);
      tempGrid.rows = 2;
    });
    it('Should be able to change cols', () => {
      tempGrid.cols = 3;
      expect(tempGrid.cols).to.be.eql(3);
      tempGrid.cols = 2;
    });
    it('Should have a method to get a point from the grid', () => {
      expect(tempGrid.getPoint).to.be.a('function');
    });
    context('GetPoint functionality', () => {
      it('GetPoint should return a point', () => {
        expect(tempGrid.getPoint()).to.be.a('object');
      });
      it('GetPoint should return a point', () => {
        const expected = new Point(50, 50);
        expect(tempGrid.getPoint(1, 1, 100, 100)).to.be.eql(expected);
      });
      it('GetPoint should return a point(outside canvas)', () => {
        const expected = new Point(100, 100);
        expect(tempGrid.getPoint(4, 4, 100, 100)).to.be.eql(expected);
      });
    });
    it('Should have a method to draw the grid on a canvas', () => {
      expect(tempGrid.draw).to.be.a('function');
    });
  });
});

describe('Class RadomWalk', () => {
  it('Should exist', () => {
    expect(RandomWalk).to.be.a('function');
  });
  context('RandomWalk funcionality', () => {
    const walk = new RandomWalk('grid');
    it('Should exist a method to generate the walk', () => {
      expect(walk.generate).to.be.a('function');
    });
    it('Should be able to change the grid', () => {
      const tempGrid = new Grid();
      expect(walk.grid = tempGrid).to.be.eql(tempGrid);
    });
  });
});

describe('index.js', () => {
  it('Should have a function to start the process', () => {
    expect(setup).to.be.a('function');
  });
}); 