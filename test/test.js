'use strict'

let ChessBoard;
let ChessPiece;
let ChessRepresentation;
let Pawn;
let Bishop;
let Queen;
let King;
let Knight;
let expect;
let NQueens;
let NQueensG;
let Line;
let Point;
let Rook;
let generalUtility;
if (typeof require !== 'undefined') {
  ChessBoard = require('../src/chess-board.js').ChessBoard;
  expect = require('chai').expect;
  ChessPiece = require('../src/chess-piece.js').ChessPiece;
  Pawn = require('../src/pawn.js').Pawn;
  Bishop = require('../src/bishop.js').Bishop;
  Queen = require('../src/queen.js').Queen;
  King = require('../src/king.js').King;
  Knight = require('../src/knight').Knight;
  NQueens = require('../src/nqueens.js').NQueens;
  NQueensG = require('../src/nqueens-generalized.js').NQueensG;
  Line = require('../src/line.js').Line;
  Point = require('../src/point.js').Point;
  generalUtility = require('../src/generalUtility.js').generalUtility;
  ChessRepresentation =
    require('../src/chess-representation.js').ChessRepresentation;
  Rook = require('../src/rook.js').Rook;
} else {
  ChessBoard = window.ChessBoard;
  expect = chai.expect;
  ChessPiece = window.ChessPiece;
  Pawn = window.Pawn;
  Bishop = window.Bishop;
  Queen = window.Queen;
  King = window.King;
  Knight = window.Knight;
  NQueens = window.NQueens;
  NQueensG = window.NQueensG;
  Line = window.Line;
  Point = window.Point;
  generalUtility = window.generalUtility;
  ChessRepresentation = window.ChessRepresentation;
  Rook = window.Rook;
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

describe('ChessBoard class', () => {
  it('Should exist', () => {
    expect(ChessBoard).to.be.a('function');
  });
  context('ChessBoard functionality', () => {
    let board;
    beforeEach(() => {
      board = new ChessBoard();;
    });
    it('should have a number of rows equal to 8', () => {
      expect(board.rows).to.be.eql(8);
    });
    it('should have a number of cols equal to 8', () => {
      expect(board.cols).to.be.eql(8);
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
      expect(pawn.showPosition()).to.be.eql('f2');
    });
  });
  context('Queen Piece', () => {
    let queen;
    beforeEach(() => {
      queen = new Queen(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(queen.type).to.be.eql('Q');
    });
    it('Should return its color', () => {
      expect(queen.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(queen.showPosition()).to.be.eql('Qf2');
    });
  });
  context('King Piece', () => {
    let king;
    beforeEach(() => {
      king = new King(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(king.type).to.be.eql('K');
    });
    it('Should return its color', () => {
      expect(king.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(king.showPosition()).to.be.eql('Kf2');
    });
  });
  context('Rook Piece', () => {
    let rook;
    beforeEach(() => {
      rook = new Rook(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(rook.type).to.be.eql('R');
    });
    it('Should return its color', () => {
      expect(rook.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(rook.showPosition()).to.be.eql('Rf2');
    });
  });
  context('Bishop Piece', () => {
    let bishop;
    beforeEach(() => {
      bishop = new Bishop(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(bishop.type).to.be.eql('B');
    });
    it('Should return its color', () => {
      expect(bishop.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(bishop.showPosition()).to.be.eql('Bf2');
    });
  });
  context('Knight Piece', () => {
    let knight;
    beforeEach(() => {
      knight = new Knight(1, 2, 0);
    });
    it('Should return its type letter', () => {
      expect(knight.type).to.be.eql('N');
    });
    it('Should return its color', () => {
      expect(knight.color).to.be.eql(0);
    });
    it('Should return its position in algebraic notation', () => {
      expect(knight.showPosition()).to.be.eql('Nf2');
    });
  });
});

describe('Class NQueens', () => {
  it('Should exist', () => {
    expect(NQueens).to.be.a('function');
  });
  context('NQueens functionality' ,() => {
    let nQueens;
    beforeEach(() => {
      nQueens = new NQueens(8);
    });
    it('Should have a property size', () => {
      expect(nQueens).to.have.a.property('_size');
    });
    it('Should have a method to resolve the problem', () => {
      expect(nQueens).to.have.a.property('resolve');
    });
    it('Resolve should give a correct solution', () => {
      expect(nQueens.resolve()).to.be.an('array');
    });
  });
});

describe('Class NQueensG', () => {
  it('Should exist', () => {
    expect(NQueensG).to.be.a('function');
  });
  context('NQueens functionality' ,() => {
    let nQueens;
    beforeEach(() => {
      nQueens = new NQueensG(8);
    });
    it('Should have a property size', () => {
      expect(nQueens).to.have.a.property('_size');
    });
    it('Should have a method to resolve the problem', () => {
      expect(nQueens).to.have.a.property('resolve');
    });
    it('Resolve should give a correct solution', () => {
      expect(nQueens.resolve()).to.be.an('array');
    });
  });
});

describe('Class ChessRepresentation', () => {
  it('Should exist', () => {
    expect(ChessRepresentation).to.be.a('function');
  });
  context('Chess functionality' ,() => {
    let chess;
    beforeEach(() => {
      chess = new ChessRepresentation(8);
    });
    it('Should have a property board', () => {
      expect(chess).to.have.a.property('_board');
    });
    it('Should have a method to initialize a game', () => {
      expect(chess).to.have.a.property('buildInitial');
    });
    it('Should have a method to display the pieces on the board', () => {
      expect(chess).to.have.a.property('displayPieces');
    });
    it('Should have a method to load a board configuration', () => {
      expect(chess).to.have.a.property('loadConfiguration');
    });
    it('Should allow to load a configuration', () => {
      expect(chess.loadConfiguration(
        {
        "size": 8,
        "peonN1": {"color": 0,"type": "pawn","row": 6,"col": 0},
        "torreN2": {"color": 0,"type": "rook","row": 7,"col": 7},
        "caballoN2": {"color": 0,"type": "knight","row": 7,"col": 6},
        "alfilN2": {"color": 0,"type": "bishop","row": 7,"col": 5},
        "reyN": {"color": 0,"type": "king","row": 7,"col": 3},
        "reinaN": {"color": 0,"type": "queen","row": 7,"col": 4},
      })).to.be.eql(undefined);
    });
    it('should have a method to draw the board', () => {
      expect(chess).to.have.a.property('draw');
    });
    it('should have a method to display the pieces', () => {
      expect(chess).to.have.a.property('displayPieces');
    });
    it('should have a method to get the algebraic notation', () => {
      expect(chess).to.have.a.property('showBoard');
    });
  });
});
