import { CardDeck } from './cards';

let playerArea = document.getElementById("playerArea");
let deck = new CardDeck();
let players;

document.getElementById("addPlayers").addEventListener("click", e => {
    // Get the value the user entered for number of players and clear the player list area if there was a previous session
    players = document.getElementById("players").value;
    players = parseFloat(players);
    clearArea();

    // Make the number added is a positive number great than zero.
    if (players <= 0) {
        alert('The numbers of players has to be greater than 0.');
        document.getElementById("players").value = "";
    }
    else if (players > 52) {
        alert('The numbers of players has to be less than or equal to 52.');
         document.getElementById("players").value = "";
    }
    else {
        // Shuffle and deal the cards out to the amount of players
        deck.shuffle();
        let dealt = dealToPlayers(deck, players);

        // Take the players and cards and apply their values to the page
        playerToClient(dealt);
    }
        
    // There is no other user interaction with the deck so restore it
    deck.restore();
});

// If the user presses Enter instead of clicking the button, execute a click on the button
document.getElementById("players").addEventListener("keyup", e => {
    e.preventDefault();
    if(e.keyCode === 13) {
        document.getElementById("addPlayers").click();
    }
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

/*
 * Utilizing the dealtDeck from dealToPlayers, now display each player and their cards to the user.
 */
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