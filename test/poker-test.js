'use strict'
let expect;
let card;
let deck;
let hand;
let pokerHand;
let pokerGame;
if (typeof require !== 'undefined') {
  expect = require('chai').expect;
  card = require('../src/card.js');
  deck = require('../src/deck.js');
  hand = require('../src/hand.js');
  pokerHand = require('../src/poker-hand.js');
  pokerGame = require('../src/poker-game.js');
} else {
  expect = chai.expect;
  card = window.cardModule;
  hand = window.handModule;
  deck = window.deckModule;
  pokerHand = window.pokerHandModule;
  pokerGame = window.pokerGameModule;
}

describe('Class card', () => {
  it('Should exist', () => {
    expect(card.Card).to.be.a('function');
  });
  const testCard = new card.Card();
  context('Testing getters', () => {
    it('Should have a value atribute', () => {
      expect(testCard.value).to.be.a('Number');
    });
    it('Should have a suit atribute', () => {
      expect(testCard.suit).to.be.a('Number');
    });
  });
  context('Testing default value', () => {
    it('Should have a value of 2', () => {
      expect(testCard.value).to.be.equal(2);
    });
    it('Should be of the clubs suit', () => {
      expect(testCard.suit).to.be.equal(0);
    });
  });
  context('Should convert to string in a propper way', () => {
    it('Testing the default value', () => {
      expect(testCard.toString()).to.be.a.equal('2 of Clubs');
    });
    it('Testing an Ace card', () => {
      expect(new card.Card(1).toString()).to.be.a.equal('Ace of Clubs');
    });
    it('Testing a Jack Value', () => {
      expect(new card.Card(11).toString()).to.be.a.equal('Jack of Clubs');
    });
    it('Testing a Queen Value', () => {
      expect(new card.Card(12).toString()).to.be.a.equal('Queen of Clubs');
    });
    it('Testing a King Value', () => {
      expect(new card.Card(13).toString()).to.be.a.equal('King of Clubs');
    });
    it('Testing a different suit', () => {
      expect(new card.Card(1, 2).toString()).to.be.a.equal('Ace of Hearts');
    });
  });
  context('Should compare correctly two cards', () => {
    it('Compare cards of the same suit', () => {
      const auxCard = new card.Card(5, 1);
      expect(auxCard.compareIfLess(new card.Card(6, 1))).to.be.equal(true);
      expect(auxCard.compareIfLess(new card.Card(2, 1))).to.be.equal(false);
    });
    it('Compare cards of differents suits', () => {
      const auxCard = new card.Card(5, 1);
      expect(auxCard.compareIfLess(new card.Card(5, 0))).to.be.equal(false);
      expect(auxCard.compareIfLess(new card.Card(2, 2))).to.be.equal(true);
    });
  });
});

describe('Class Deck', () => {
  it('Should exist', () => {
    expect(deck.Deck).to.be.a('function');
  });
  context('Print method of Deck objects', () => {
    it('Should have a print method', () => {
      expect((new deck.Deck).print).to.be.a('function');
    });
    it('Should print all the card of the deck in the correct order', () => {
      expect((new deck.Deck).print()).to.be.a.equal('Ace of Clubs\n' +
        '2 of Clubs\n' +
        '3 of Clubs\n' +
        '4 of Clubs\n' +
        '5 of Clubs\n' +
        '6 of Clubs\n' +
        '7 of Clubs\n' +
        '8 of Clubs\n' +
        '9 of Clubs\n' +
        '10 of Clubs\n' +
        'Jack of Clubs\n' +
        'Queen of Clubs\n' +
        'King of Clubs\n' +
        'Ace of Diamonds\n' +
        '2 of Diamonds\n' +
        '3 of Diamonds\n' +
        '4 of Diamonds\n' +
        '5 of Diamonds\n' +
        '6 of Diamonds\n' +
        '7 of Diamonds\n' +
        '8 of Diamonds\n' +
        '9 of Diamonds\n' +
        '10 of Diamonds\n' +
        'Jack of Diamonds\n' +
        'Queen of Diamonds\n' +
        'King of Diamonds\n' +
        'Ace of Hearts\n' +
        '2 of Hearts\n' +
        '3 of Hearts\n' +
        '4 of Hearts\n' +
        '5 of Hearts\n' +
        '6 of Hearts\n' +
        '7 of Hearts\n' +
        '8 of Hearts\n' +
        '9 of Hearts\n' +
        '10 of Hearts\n' +
        'Jack of Hearts\n' +
        'Queen of Hearts\n' +
        'King of Hearts\n' +
        'Ace of Spades\n' +
        '2 of Spades\n' +
        '3 of Spades\n' +
        '4 of Spades\n' +
        '5 of Spades\n' +
        '6 of Spades\n' +
        '7 of Spades\n' +
        '8 of Spades\n' +
        '9 of Spades\n' +
        '10 of Spades\n' +
        'Jack of Spades\n' +
        'Queen of Spades\n' +
        'King of Spades\n');
    });
  });
  context('Add, delete and sort cards methods', () => {
    let auxDeck;
    beforeEach(() => {
      auxDeck = new deck.Deck();
    });
    it('Should have a method to add cards', () => {
      expect(auxDeck.addCard).to.be.a('function');
    });
    it('Should have a method to delete cards', () => {
      expect(auxDeck.popCard).to.be.a('function');
    });
    it('Should have a method to shufle cards', () => {
      expect(auxDeck.shuffle).to.be.a('function');
    });
    it('Should have a method to delete cards', () => {
      expect(auxDeck.sort).to.be.a('function');
    });
    it('Should delete cards correctly', () => {
      expect(auxDeck.popCard().toString()).to.be.equal('King of Spades');
    });
    it('Should add cards correctly', () => {
      for (let i = 0; i < 51; i++) {
        auxDeck.popCard();
      }
      auxDeck.addCard(new card.Card(1, 3));
      expect(auxDeck.print()).to.be.equal('Ace of Clubs\nAce of Spades\n');
    });
    it('Should shuffle correctly', () => {
      auxDeck.shuffle();
      expect((auxDeck.print())).not.to.be.equal('Ace of Clubs\n' +
        '2 of Clubs\n' +
        '3 of Clubs\n' +
        '4 of Clubs\n' +
        '5 of Clubs\n' +
        '6 of Clubs\n' +
        '7 of Clubs\n' +
        '8 of Clubs\n' +
        '9 of Clubs\n' +
        '10 of Clubs\n' +
        'Jack of Clubs\n' +
        'Queen of Clubs\n' +
        'King of Clubs\n' +
        'Ace of Diamonds\n' +
        '2 of Diamonds\n' +
        '3 of Diamonds\n' +
        '4 of Diamonds\n' +
        '5 of Diamonds\n' +
        '6 of Diamonds\n' +
        '7 of Diamonds\n' +
        '8 of Diamonds\n' +
        '9 of Diamonds\n' +
        '10 of Diamonds\n' +
        'Jack of Diamonds\n' +
        'Queen of Diamonds\n' +
        'King of Diamonds\n' +
        'Ace of Hearts\n' +
        '2 of Hearts\n' +
        '3 of Hearts\n' +
        '4 of Hearts\n' +
        '5 of Hearts\n' +
        '6 of Hearts\n' +
        '7 of Hearts\n' +
        '8 of Hearts\n' +
        '9 of Hearts\n' +
        '10 of Hearts\n' +
        'Jack of Hearts\n' +
        'Queen of Hearts\n' +
        'King of Hearts\n' +
        'Ace of Spades\n' +
        '2 of Spades\n' +
        '3 of Spades\n' +
        '4 of Spades\n' +
        '5 of Spades\n' +
        '6 of Spades\n' +
        '7 of Spades\n' +
        '8 of Spades\n' +
        '9 of Spades\n' +
        '10 of Spades\n' +
        'Jack of Spades\n' +
        'Queen of Spades\n' +
        'King of Spades\n');
    });
    it('Should sort cards correctly', () => {
      auxDeck.shuffle();
      auxDeck.sort();
      expect((auxDeck.print())).to.be.equal('Ace of Clubs\n' +
        '2 of Clubs\n' +
        '3 of Clubs\n' +
        '4 of Clubs\n' +
        '5 of Clubs\n' +
        '6 of Clubs\n' +
        '7 of Clubs\n' +
        '8 of Clubs\n' +
        '9 of Clubs\n' +
        '10 of Clubs\n' +
        'Jack of Clubs\n' +
        'Queen of Clubs\n' +
        'King of Clubs\n' +
        'Ace of Diamonds\n' +
        '2 of Diamonds\n' +
        '3 of Diamonds\n' +
        '4 of Diamonds\n' +
        '5 of Diamonds\n' +
        '6 of Diamonds\n' +
        '7 of Diamonds\n' +
        '8 of Diamonds\n' +
        '9 of Diamonds\n' +
        '10 of Diamonds\n' +
        'Jack of Diamonds\n' +
        'Queen of Diamonds\n' +
        'King of Diamonds\n' +
        'Ace of Hearts\n' +
        '2 of Hearts\n' +
        '3 of Hearts\n' +
        '4 of Hearts\n' +
        '5 of Hearts\n' +
        '6 of Hearts\n' +
        '7 of Hearts\n' +
        '8 of Hearts\n' +
        '9 of Hearts\n' +
        '10 of Hearts\n' +
        'Jack of Hearts\n' +
        'Queen of Hearts\n' +
        'King of Hearts\n' +
        'Ace of Spades\n' +
        '2 of Spades\n' +
        '3 of Spades\n' +
        '4 of Spades\n' +
        '5 of Spades\n' +
        '6 of Spades\n' +
        '7 of Spades\n' +
        '8 of Spades\n' +
        '9 of Spades\n' +
        '10 of Spades\n' +
        'Jack of Spades\n' +
        'Queen of Spades\n' +
        'King of Spades\n');
    });
  });
  context('DealHand functionality', () => {
    it('Should exist a method dealHands', () => {
      expect(new deck.Deck().dealHands).to.be.a('function');
    });
    it('DealHands should work correcly', () => {
      let auxDeck = new deck.Deck();
      let result = auxDeck.dealHands(2, 5);
      expect(result).to.be.a('array');
      expect(result).to.be.length(2);
      for (let hand of result) {
        expect(hand.size()).to.be.equal(5);
      }
    });
  });
});

describe('Class Hand', () => {
  it('Should exist', () => {
    expect(hand.Hand).to.be.a('function');
  });
  it('Should have a label', () => {
    expect(new hand.Hand().label).to.be.a('String');
  });
  it('Should have a label with a default value', () => {
    expect(new hand.Hand().label).to.be.equal('Simple Hand');
  });
  context('Methods to add and delete cards', () => {
    let auxHand;
    beforeEach(() => {
      auxHand = new hand.Hand();
    });
    it('Should have a method to add cards', () => {
      expect(auxHand.addCard).to.be.a('function');
    });
    it('Should have a method to delete cards', () => {
      expect(auxHand.popCard).to.be.a('function');
    });
    it('Should have a size method', () => {
      expect(auxHand.size).to.be.a('function');
    });
    it('Should add a card correctly', () => {
      auxHand.addCard(new card.Card());
      expect(auxHand.size()).to.be.equal(1);
    });
    it('Should delete a card correctly', () => {
      auxHand.addCard(new card.Card());
      expect(auxHand.popCard().toString()).to.be.equal('2 of Clubs');
    });
  });
  let auxHand;
  beforeEach(() => {
    auxHand = new hand.Hand();
  });
  it('Should have a method to move cards', () => {
    expect(auxHand.moveCards).to.be.a('function');
  });
  it('Should move cards correctly', () => {
    let tempDeck = new deck.Deck;
    auxHand.moveCards(tempDeck, 4);
    expect(auxHand.size()).to.be.equal(4);
  });
});

describe('PokerHand class', () => {
  it('Should exist', () => {
    expect(pokerHand.PokerHand).to.be.a('function');
  });
  context('Methods to check the hands', () => {
    let tempHand;
    beforeEach(() => {
      tempHand = new pokerHand.PokerHand();
    });
    it('Should have a method hasPair', () => {
      expect(tempHand.hasPair).to.be.a('function');
    });
    it('Should have a method hasTwoPair', () => {
      expect(tempHand.hasTwoPair).to.be.a('function');
    });
    it('Should have a method hasThreeOfAKind', () => {
      expect(tempHand.hasThreeOfAKind).to.be.a('function');
    });
    it('Should have a method hasStraight', () => {
      expect(tempHand.hasStraight).to.be.a('function');
    });
    it('Should have a method hasFlush', () => {
      expect(tempHand.hasFlush).to.be.a('function');
    });
    it('Should have a method hasFullHouse', () => {
      expect(tempHand.hasFullHouse).to.be.a('function');
    });
    it('Should have a method hasFourOfAKind', () => {
      expect(tempHand.hasFourOfAKind).to.be.a('function');
    });
    it('Should have a method hasStraightFlush', () => {
      expect(tempHand.hasStraightFlush).to.be.a('function');
    });
  });
  context('Methods to check hands functionality', () => {
    let tempHand;
    beforeEach(() => {
      tempHand = new pokerHand.PokerHand();
    });
    it('hasPair should work correclty', () => {
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(3, 2));
      expect(tempHand.hasPair()).to.be.equal(true);
    });
    it('hasTwoPair should work correclty', () => {
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(4, 2));
      expect(tempHand.hasTwoPair()).to.be.equal(true);
    });
    it('hasThreeOfAKinf should work correclty', () => {
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(3, 3));
      expect(tempHand.hasThreeOfAKind()).to.be.equal(true);
    });
    it('hasFlush should work correclty', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 1));
      expect(tempHand.hasFlush()).to.be.equal(true);
    });
    it('hasFourOfAkind should work correclty', () => {
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(3, 3));
      tempHand.addCard(new card.Card(3, 4));
      expect(tempHand.hasFourOfAKind()).to.be.equal(true);
    });
    it('hasFullHouse should work correclty', () => {
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(3, 3));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(4, 2));
      expect(tempHand.hasFullHouse()).to.be.equal(true);
    });
    it('hasStraight should work correclty (Ace = 1)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(3, 3));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 2));
      expect(tempHand.hasStraight()).to.be.equal(true);
    });
    it('hasStraight should work correclty (Ace > King)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(10, 2));
      tempHand.addCard(new card.Card(11, 3));
      tempHand.addCard(new card.Card(12, 1));
      tempHand.addCard(new card.Card(13, 2));
      expect(tempHand.hasStraight()).to.be.equal(true);
    });
    it('hasStraight should work correclty (Queen-King-Ace-2-3)', () => {
      tempHand.addCard(new card.Card(12, 1));
      tempHand.addCard(new card.Card(13, 2));
      tempHand.addCard(new card.Card(1, 3));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(3, 2));
      expect(tempHand.hasStraight()).to.be.equal(false);
    });
    it('hasStraightFlush should work correclty (Ace = 1)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 1));
      expect(tempHand.hasStraightFlush()).to.be.equal(true);
    });
    it('hasStraightFlush should work correclty (Ace > King)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(10, 1));
      tempHand.addCard(new card.Card(11, 1));
      tempHand.addCard(new card.Card(12, 1));
      tempHand.addCard(new card.Card(13, 1));
      expect(tempHand.hasStraightFlush()).to.be.equal(true);
    });
    it('hasStraightFlush should work correclty (Different suits)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 1))
      expect(tempHand.hasStraightFlush()).to.be.equal(false);
    });
    it('hasStraightFlush should work correclty (Different values)', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(6, 1));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 1))
      expect(tempHand.hasStraightFlush()).to.be.equal(false);
    });
  });
  context('Classify method', () => {
    let tempHand;
    beforeEach(() => {
      tempHand = new pokerHand.PokerHand();
    });
    it('Pair classification', () => {
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Pair');
    });
    it('Two Pair classification', () => {
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(3, 2));
      tempHand.addCard(new card.Card(3, 3));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Two Pair');
    });
    it('Three of a Kind classification', () => {
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(2, 3));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Three of a Kind');
    });
    it('Straight classification', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(3, 3));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 2));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Straight');
    });
    it('Flush classification', () => {
      tempHand.addCard(new card.Card(1, 2));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(10, 2));
      tempHand.addCard(new card.Card(7, 2));
      tempHand.addCard(new card.Card(6, 2));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Flush');
    });
    it('Full House classification', () => {
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(2, 3));
      tempHand.addCard(new card.Card(4, 2));
      tempHand.addCard(new card.Card(4, 0));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Full House');
    });
    it('Four of a Kind classification', () => {
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(2, 2));
      tempHand.addCard(new card.Card(2, 3));
      tempHand.addCard(new card.Card(2, 0));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Four of a Kind');
    });
    it('Straight Flush classification', () => {
      tempHand.addCard(new card.Card(1, 1));
      tempHand.addCard(new card.Card(2, 1));
      tempHand.addCard(new card.Card(3, 1));
      tempHand.addCard(new card.Card(4, 1));
      tempHand.addCard(new card.Card(5, 1));
      tempHand.classify();
      expect(tempHand.label).to.be.equal('Straight Flush');
    });
  });
});

describe('Poker-game.js', () => {
  it('Should have a function to start the process', () => {
    expect(pokerGame.setup).to.be.a('function');
  });
  it('Should have return if there is a straigh in a hand', () => {
    expect(pokerGame.setup()).to.be.a('boolean');
  });
  it('Should have a function to calculate probabilities', () => {
    expect(pokerGame.probabilitiesSetup).to.be.a('function');
  });
  context('probabilitiesSetup functionality', () => {
    const PROBABILITIES = pokerGame.probabilitiesSetup(100);
    it('Should return an object', () => {
      expect(PROBABILITIES).to.be.a('object');
    });
    it('The object returned should have "Pair"', () => {
      expect(PROBABILITIES).to.have.own.property('Pair');
    });
    it('The object returned should have "Two Pair"', () => {
      expect(PROBABILITIES).to.have.own.property('Two Pair');
    });
    it('The object returned should have "Three of a Kind"', () => {
      expect(PROBABILITIES).to.have.own
        .property('Three of a Kind');
    });
    it('The object returned should have "Straight"', () => {
      expect(PROBABILITIES).to.have.own
        .property('Straight');
    });
    it('The object returned should have "Flush"', () => {
      expect(PROBABILITIES).to.have.own.property('Flush');
    });
    it('The object returned should have "Full House"', () => {
      expect(PROBABILITIES).to.have.own
        .property('Full House');
    });
    it('The object returned should have "Four of a Kind"', () => {
      expect(PROBABILITIES).to.have.own
        .property('Four of a Kind');
    });
    it('The object returned should have "Straight Flush"', () => {
      expect(PROBABILITIES).to.have.own
        .property('Straight Flush');
    });
  });
});
