(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDeck = void 0;

class CardDeck {
  constructor() {
    this.restore();
  }
  /*
   * Restore re-creates the cardDeck object to an empty array and rebuilds the deck
   * based on the standard 52 card deck.
   */


  restore() {
    this.cardDeck = [];
    const cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
    const cardSuit = ["Spades", "Hearts", "Diamonds", "Clubs"];
    /* Loop through the card suit and card value to push those two items together in the cardDeck array */

    for (let suit in cardSuit) {
      for (let value in cardValue) {
        this.cardDeck.push(`${cardValue[value]} of ${cardSuit[suit]}`);
      }
    }
  }
  /* 
   * Shuffle uses the cardDeck object and shuffles it. Utilizing the Fisher-Yates algorithm for shuffling
   * the array of cards.
  */


  shuffle() {
    const cardDeck = this.cardDeck;
    let cdl = cardDeck.length;
    let i;
    /* Loop through the deck, using Math.random() swap the two items locations in the array */

    while (cdl) {
      i = Math.floor(Math.random() * cdl--);
      var _ref = [cardDeck[i], cardDeck[cdl]];
      cardDeck[cdl] = _ref[0];
      cardDeck[i] = _ref[1];
    }

    return this;
  }
  /*
   * Utilizing array shift, we can retrieve and remove the first element of the cardDeck array
   */


  deal() {
    return this.cardDeck.shift();
  }

}

exports.CardDeck = CardDeck;
},{}],2:[function(require,module,exports){
"use strict";

var _cards = require("./cards");

let playerArea = document.getElementById("playerArea");
let deck = new _cards.CardDeck();
let players;
document.getElementById("addPlayers").addEventListener("click", e => {
  // Get the value the user entered for number of players and clear the player list area if there was a previous session
  players = document.getElementById("players").value;
  clearArea(); // Shuffle and deal the cards out to the amount of players

  deck.shuffle();
  let dealt = dealToPlayers(deck, players);
  alert(dealt[0]);
  alert(dealt[0].length);
  alert(dealt[1]);
  alert(dealt[1].length);
  playerToClient(dealt);
  deck.restore();
});

function clearArea() {
  while (playerArea.firstChild) {
    playerArea.removeChild(playerArea.firstChild);
  }
}

function dealToPlayers(deckOfCards, numberOfPlayers) {
  let cdl = deckOfCards.cardDeck.length;
  let dealtDeck = []; // Create arrays within the dealtDeck array that will be used to house the cards as they're dealt

  for (let i = 0; i < numberOfPlayers; i++) {
    dealtDeck[i] = [];
  } // Use the deck length to drive the dealing, loop through the dealtDeck array for the player and deal cards into each one of their arrays. If the rest
  // of the cards run out before we finish, put an empty string in the remainder of the last positions of the array for the rest of the players.


  while (cdl) {
    for (let j = 0; j < dealtDeck.length; j++) {
      if (cdl > 0) {
        dealtDeck[j].push(deckOfCards.deal());
        cdl--;
      } else {
        dealtDeck[j].push(" ");
      }
    }
  }

  return dealtDeck;
}

function playerToClient(deckOfCards) {
  let dealer = deckOfCards;

  for (let k = 0; k < dealer.length; k++) {
    let playerDiv = document.createElement('div');
    playerDiv.setAttribute("class", "card");
    let temp = "<div class = 'card-header'>\nPlayer " + (k + 1) + "\n</div>\n<ul class='list-group list-group-flush'>";

    for (let l = 0; l < dealer[k].length; l++) {
      temp += "\n<li class='list-group-item'>" + dealer[k][l] + "</li>";
    }

    playerArea.appendChild(playerDiv);
    playerDiv.innerHTML = temp;
  }
}
},{"./cards":1}]},{},[2]);
