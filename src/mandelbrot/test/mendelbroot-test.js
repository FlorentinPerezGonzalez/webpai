import * as mandelbroot from "../src/mendelbroot.js";
import ComplexNumber from "../src/complex-number.js";
const expect = chai.expect;

describe ('Class ComplexNumber', () => {
  const auxComplex = new ComplexNumber(1, 2);
  it ('Should have a real component', () => {
    expect(auxComplex.realNumber).to.be.a('number');
  });
  it ('Should have a imaginary component', () => {
    expect(auxComplex.imaginaryNumber).to.be.a('number');
  });
  describe ('Module method', () => {
    it ('Should have a method to calculate the module', () => {
      expect(auxComplex.module).to.be.a('function');
    });
    it ('Should calculate the module correctly,', () => {
      expect(Math.round(auxComplex.module() * 100) / 100).to.be.equal(2.24);
    });
  });
  describe ('Getters functionality,', () => {
    it ('The real component  should be obtainable', () => {
      expect(auxComplex.realNumber).to.be.equal(1);
    });
    it ('The imaginary component  should be obtainable', () => {
      expect(auxComplex.imaginaryNumber).to.be.equal(2);
    });
  });
  describe ('Setters functionality,', () => {
    it ('The real component  should be modifiable', () => {
      expect(auxComplex.realNumber = 3).to.be.equal(3);
    });
    it ('The imaginary component  should be modifiable', () => {
      expect(auxComplex.imaginaryNumber = 4).to.be.equal(4);
    });
  });
});

describe ('Mandelbroot functions', () => {
  it ('Should have a function to calculate the set', () => {
    expect(mandelbroot.mandelbroot).to.be.a('function');
  });
  it ('Should have a function to convert coordinate to complex', () => {
    expect(mandelbroot.convertCoordinatesToComplex).to.be.a('function');
  });
  it ('Should have a function to generate a set of complex number', () => {
    expect(mandelbroot.generateSetOfComplexNumber).to.be.a('function');
  });
  it ('Should have a function to calculate the Mandelbroot area', () => {
    expect(mandelbroot.calculateMandelbrootAreaAndError).to.be.a('function');
  });
  it ('Should have a function to calculate the Mandelbroot error', () => {
    expect(mandelbroot.calculateMandelbrootAreaAndError).to.be.a('function');
  });
  it ('Should have a function to calculate the iterations needed to' +
    'consider if a number is part of the Mandelbroot set', () => {
    expect(mandelbroot.calculateMandelbrootIterations).to.be.a('function');
  });
  describe ('Functions functionality', () => {
    let auxComplex;
    let tempComplex
    beforeEach( () => {
      auxComplex = new ComplexNumber(0, 0);
      tempComplex = new ComplexNumber(1, 2);
    });
    it ('generateSetOfComplexNumber should return an array', () => {
      const result = mandelbroot.
          generateSetOfComplexNumber(auxComplex, auxComplex, 0);
      expect(result).to.be.an('array');
    });
  });
})