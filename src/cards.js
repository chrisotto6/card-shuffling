'use strict';

export class CardDeck {
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
        const cardSuit = ["Spades", "Hearts", "Diamonds","Clubs"];

        /* Loop through the card suit and card value to push those two items together in the cardDeck array */
        for (let suit in cardSuit) {
            for (let value in cardValue) {
                this.cardDeck.push(`${cardValue[value]} of ${cardSuit[suit]}`)
            }
        }
    }

    /* 
     * Shuffle uses the cardDeck object and shuffles it. Utilizing the Fisher-Yates algorithm for shuffling
     * the array of cards.
    */
   shuffle() {
       const { cardDeck } = this;
       let cdl = cardDeck.length;
       let i;

       /* Loop through the deck, using Math.random() swap the two items locations in the array */
       while(cdl) {
            i = Math.floor(Math.random() * cdl--);

            [cardDeck[cdl], cardDeck[i]] = [cardDeck[i], cardDeck[cdl]];
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