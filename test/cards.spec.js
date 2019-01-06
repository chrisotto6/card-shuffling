var chai = require("chai");
var assert = chai.assert;
var CardDeck = require("../lib/cards");

describe("Card Deck Tests", function() {
  describe("New Deck Tests", function() {
    let deck = new CardDeck.CardDeck();

    it("Should have a length of 52", function() {
      assert.lengthOf(deck.cardDeck, 52, "Array is 52 characters long.");
    });
    it("Should have 2s in consistent positions", function() {
      assert.equal(deck.cardDeck[0], "2 of Spades");
      assert.equal(deck.cardDeck[13], "2 of Hearts");
      assert.equal(deck.cardDeck[26], "2 of Diamonds");
      assert.equal(deck.cardDeck[39], "2 of Clubs");
    });
  });

  describe("Shuffle Deck Tests", function() {
    let deck = new CardDeck.CardDeck();
    deck.shuffle();

    it("Should have a length of 52", function() {
      assert.lengthOf(deck.cardDeck, 52, "Array is 52 characters long.");
    });
    it("Should not have 2 of Spades as first element", function() {
      assert(deck.cardDeck[0] !== "2 of Spades");
    });
  });

  describe("Restore Deck Tests", function() {
    let deck = new CardDeck.CardDeck();
    deck.restore();

    it("Should have a length of 52", function() {
      assert.lengthOf(deck.cardDeck, 52, "Array is 52 characters long.");
    });
    it("Should have 2s in consistent positions", function() {
      assert.equal(deck.cardDeck[0], "2 of Spades");
      assert.equal(deck.cardDeck[13], "2 of Hearts");
      assert.equal(deck.cardDeck[26], "2 of Diamonds");
      assert.equal(deck.cardDeck[39], "2 of Clubs");
    });
  });

  describe("Deal Card Tests", function() {
    let deck = new CardDeck.CardDeck();
    deck.deal();
    it("Should pull the first element the 2 of Spades", function() {
      assert.equal(deck.cardDeck[0], "3 of Spades");
    });
    it("Should reduce the count of the deck", function() {
      assert.lengthOf(
        deck.cardDeck,
        51,
        "The deck has been reduced since a card has been dealt"
      );
    });
  });
});
