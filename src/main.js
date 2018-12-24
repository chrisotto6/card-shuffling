import { CardDeck } from './cards';

let playerArea = document.getElementById("playerArea");
let deck = new CardDeck();
let players;

document.getElementById("addPlayers").addEventListener("click", e => {
        // Get the value the user entered for number of players and clear the player list area if there was a previous session
        players = document.getElementById("players").value;
        clearArea();

        // Shuffle and deal the cards out to the amount of players
        deck.shuffle();
        let dealt = dealToPlayers(deck, players);

        // Take the players and cards and apply their values to the page
        playerToClient(dealt);

        // There is no other user interaction with the deck so restore it
        deck.restore();
});

function clearArea() {
    while (playerArea.firstChild) {
        playerArea.removeChild(playerArea.firstChild);
    }
}

function dealToPlayers(deckOfCards, numberOfPlayers) {
    let cdl = deckOfCards.cardDeck.length;
    let dealtDeck = [];

    // Create arrays within the dealtDeck array that will be used to house the cards as they're dealt
    for(let i = 0; i < numberOfPlayers; i++) {
        dealtDeck[i] = [];
    }
    
    // Use the deck length to drive the dealing, loop through the dealtDeck array for the player and deal cards into each one of their arrays. If the rest
    // of the cards run out before we finish, put an empty string in the remainder of the last positions of the array for the rest of the players.
    while (cdl) {
        for(let j = 0; j < dealtDeck.length; j++) {
            if (cdl > 0) {
                dealtDeck[j].push(deckOfCards.deal()); 
                cdl--;
            }
            else {
                dealtDeck[j].push(" ");
            }
        }
    }
    return dealtDeck;
}

function playerToClient(deckOfCards) {
    let dealer = deckOfCards;

    // Loop through the two dimensional array and create 'cards' for players with their hands in a list below the card header
    for(let k = 0; k < dealer.length; k++){
        let playerDiv = document.createElement('div');
        playerDiv.setAttribute("class", "card");

        let temp = "<div class = 'card-header'>\nPlayer " + (k + 1) + "\n</div>\n<ul class = 'list-group list-group-flush'>";

        for(let l = 0; l < dealer[k].length; l++) {
            temp += "\n<li class = 'list-group-item'>" + dealer[k][l] + "</li>";
        }

        playerArea.appendChild(playerDiv);
        playerDiv.innerHTML = temp;        
    }
}