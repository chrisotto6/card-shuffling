# Card-Shuffling
A simple web application that will take in a user defined number of players and deal out a shuffled, standard deck of cards. The shuffle method used is the Fisher-Yates algorithm.

## Contents
 * [Features](##Features)
 * [Technologies Used](##Technologies-Used)
 * [Contributing](##Contributing)
 * [Release Notes](##Relese-Notes)

## Features
 * Ability to pass in a number of players.
 * A new deck of cards is created and shuffled.
 * The deck is then distributed card by card to each player and displayed on the screen.   

## Technologies Used
### ES6
The underlying cardDeck class and implementation are using ES6 standards. 
### Babel
Due to the class and implementation using ES6 standards Babel was need to transpile the ES6 code to ES2015 so that it can be understood by the browser.
### Browserify
Combines the output from Babel into a single Javascript file. This is needed because the export and requires included in those files could not communicate if they were not in the same file.
### HTTP-Server
A simple tool used to start a service pointing to the index.html and defaults to localhost:8080.
### Mocha and Chai
Used to unit the cardDeck class.

## Contributing
In order to contribute to this repository the following build steps will need to be followed, using Babel, Browserify and HTTP-Server.
### Building with Babel
When making changes to either the cards.js or main.js you will need to transpile the code with Babel to get it to the point that we can then use Browserify.
> npm run babel
### Browserify
With the changes transpiled to ES2015 standards by Babel. This build step will combine both files into a single file referenced by index.html.
> npm run browser
### HTTP-Server
Once all changes have been built and you are ready to see your changes running this command will start a new service defaulted to localhost:8080 to test the changes.
>npm run start
### Mocha
To run the unit tests run the following command.
>npm run test

## Release Notes
### 1.0.0
    * Initial Release
    * Added ability to define a number of players
    * Added ability to shuffle and deal a standard 52 card deck
    * Added ability to deal to a user defined number of players
    * Added ability to display each player's hand to the end user