'use strict'

let SquareChess;
let expect;
if (typeof require !== 'undefined') {
  SquareChess = require('../src/square-chess.js').Point;
  expect = require('chai').expect;
} else {
  SquareChess = window.SquareChess;
  expect = chai.expect;
}

describe('SquareChess class', () => {
  it('Should exist', () => {
    expect(SquareChess).to.be.a('function');
  });
  context('SquareChess functionality', () => {
    let square;
    beforeEach(() => {
      square = new SquareChess(2, 4, 100);;
    });
    it('should have a center point', () => {
      expect(square).to.have.a.property('centerPoint');
    });
    it('should have a side length', () => {
      expect(square).to.have.a.property('sideLength');
    });
    it('should have a row asigned', () => {
      expect(square).to.have.a.property('row');
    });
    it('should have a col asigned', () => {
      expect(square).to.have.a.property('col');
    });
  });
});
