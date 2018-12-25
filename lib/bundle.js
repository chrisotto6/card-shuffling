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
    let i; // Loop through the deck, using Math.random() swap the two items locations in the array

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
  clearArea(); // Make the number added is a positive number great than zero.

  if (players <= 0) {
    alert('The numbers of players has to be greater than 0.');
    document.getElementById("players").value = "";
  } else {
    // Shuffle and deal the cards out to the amount of players
    deck.shuffle();
    let dealt = dealToPlayers(deck, players); // Take the players and cards and apply their values to the page

    playerToClient(dealt);
  } // There is no other user interaction with the deck so restore it


  deck.restore();
});
/*
 * Clears the area where the hands of each player are displayed
 */

function clearArea() {
  while (playerArea.firstChild) {
    playerArea.removeChild(playerArea.firstChild);
  }
}
/* 
 * Takes in a shuffled deck, utilizing the cardDeck classes deal function, create a two dimensional array to house the players and their cards.
 */


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
/*
 * Utilizing the dealtDeck from dealToPlayers, now display each player and their cards to the user.
 */


function playerToClient(deckOfCards) {
  let dealer = deckOfCards; // Loop through the two dimensional array and create 'cards' for players with their hands in a list below the card header

  for (let k = 0; k < dealer.length; k++) {
    let playerDiv = document.createElement('div');
    playerDiv.setAttribute("class", "card");
    let temp = "<div class = 'card-header'>\nPlayer " + (k + 1) + "\n</div>\n<ul class = 'list-group list-group-flush'>";

    for (let l = 0; l < dealer[k].length; l++) {
      temp += "\n<li class = 'list-group-item'>" + dealer[k][l] + "</li>";
    }

    playerArea.appendChild(playerDiv);
    playerDiv.innerHTML = temp;
  }
}
},{"./cards":1}]},{},[2]);
