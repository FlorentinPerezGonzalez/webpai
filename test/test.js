'use strict'

let ChessBoard;
let ChessPiece;
let Pawn;
let expect;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/square-chess.js').ChessBoard;
  expect = require('chai').expect;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  Pawn = require('../src/pawn.js').Pawn;
} else {
  ChessBoard = window.ChessBoard;
  expect = chai.expect;
  ChessPiece = window.ChessPiece;
  Pawn = window.Pawn;
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
    it('should have a method to display the pieces', () => {
      expect(board).to.have.a.property('displayPieces');
    });
  });
});

describe('ChessPiece class', () => {
  it('Should exist', () => {
    expect(ChessPiece).to.be.a('function');
  });
  context('ChessPiece functionality', () => {
    let piece;
    beforeEach(() => {
      piece = new ChessPiece(1, 2);
    });
    it('Should return the row where the piece is', () => {
      expect(piece.row).to.be.eql(1);
    });
    it('Should return the col where the piece is', () => {
      expect(piece.col).to.be.eql(2);
    });
    it('Should have a method to show the position in algebraic notation', () => {
      expect(piece).to.have.a.property('showPosition');
    });
    it('Should return the img', () => {
      expect(piece.img).to.be.eql(undefined);
    });
    it('Should have a color tag', () => {
      expect(piece.color).to.be.eql(undefined);
    });
  });
  context('Pawn Piece', () => {
    let pawn;
    beforeEach(() => {
      pawn = new Pawn(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(pawn.type).to.be.eql('');
    });
    it('Should return its color', () => {
      expect(pawn.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(pawn.showPosition()).to.be.eql('b1');
    });
  });
});
