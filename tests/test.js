'use strict'

let expect;
let Line;
let Point;
let Grid;
let Cell;
if (typeof require !== 'undefined') {
  expect = require('chai').expect;
  Line = require('../src/line.js').Line;
  Point = require('../src/point.js').Point;
  Grid = require('../src/grid.js').Grid;
  Cell = require('../src/cell.js').Cell;
} else {
  expect = chai.expect;
  Line = window.Line;
  Point = window.Point;
  Grid = window.Grid;
  Cell = window.Cell;
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
    expect(Line).to.be.a('function');
  });
  context('Grid functionality', () => {
    const tempLine = new Grid(1, 2, {width: 2, heigth: 3});
    it('Should have the cells width', () => {
      expect(tempLine).to.have.a.property('_cellWidth');
    });
    it('Should have the cells height', () => {
      expect(tempLine).to.have.a.property('_cellHeight');
    });
    it('Should have the number of cells (X axis)', () => {
      expect(tempLine).to.have.a.property('_xCells');
    });
    it('Should have the number of cells (Y axis)', () => {
      expect(tempLine).to.have.a.property('_yCells');
    });
    it('Should have a draw method', () => {
      expect(tempLine.draw).to.be.a('function');
    });
  });
});

describe('Class Cell', () => {
  it('Should exist', () => {
    expect(Cell).to.be.a('function');
  });
  context('Grid functionality', () => {
    let tempCell;
    beforeEach(() => {
      tempCell = new Cell;
    });
    it('Should have a state', () => {
      expect(tempCell).to.have.a.property('_state');
    });
    it('Should have a previous state', () => {
      expect(tempCell).to.have.a.property('_previousState');
    });
    it('Should be able to get the state', () => {
      expect(tempCell.state).to.be.eql(Cell.DEAD);
    });
    it('Should be able to get the previous state', () => {
      expect(tempCell.previousState).to.be.eql(Cell.DEAD);
    });
    it('Should be able to modify the state', () => {
      tempCell.changeState();
      expect(tempCell.state).to.be.eql(Cell.ALIVE);
      expect(tempCell.previousState).to.be.eql(Cell.DEAD);
    });
  });
});