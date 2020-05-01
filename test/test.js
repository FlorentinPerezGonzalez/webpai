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
      board = new ChessBoard(2, 4, 100);;
    });
    it('should have a number of rows equal to 8', () => {
      expect(board.rows).to.be.eql(8);
    });
    it('should have a number of cols equal to 8', () => {
      expect(board.cols).to.be.eql(8);
    });
    it('should have a method to draw the board', () => {
      expect(board).to.have.a.property('draw');
    });
    it('Should have a method to access certain positions', () => {
      expect(board).to.have.a.property('getData');
    });
    it('Should return the element in a certain position', () => {
      expect(board.getData(0, 0)).to.be.eql(null);
    });
    it('Should let insert an element in a certain position', () => {
      board.setData(1, 0, 0);
      expect(board.getData(0, 0)).to.be.eql(1);
    });
    it('Should have a method to reset the board', () => {
      expect(board).to.have.a.property('reset');
    });
    it('reset should work correctly', () => {
      board.setData(1, 0, 0);
      board.reset();
      expect(board.getData(0, 0)).to.be.eql(null);
    });
    it('should have a method to get the algebraic notation', () => {
      expect(board).to.have.a.property('showBoard');
    });
  });
});
