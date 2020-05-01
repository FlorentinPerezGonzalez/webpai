'use strict'

let ChessBoard;
let expect;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  expect = require('chai').expect;
} else {
  ChessBoard = window.ChessBoard;
  expect = chai.expect;
}

describe('ChessBoard class', () => {
  it('Should exist', () => {
    expect(ChessBoard).to.be.a('function');
  });
  context('ChessBoard functionality', () => {
    let board;
    beforeEach(() => {
      square = new ChessBoard(2, 4, 100);;
    });
    it('should have a number of rows equal to 8', () => {
      expect(square).to.have.a.property('centerPoint');
    });
    it('should have a number of cols equal to 8', () => {
      expect(square).to.have.a.property('sideLength');
    });
    it('should have a method to draw the board', () => {
      expect(square).to.have.a.property('row');
    });
  });
});
