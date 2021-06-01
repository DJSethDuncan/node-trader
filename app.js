require('dotenv').config();
const Galaxy = require('./lib/Galaxy');
const Player = require('./lib/Player');
const Game = require('./lib/Game');

// generate map for this session
let activeGalaxy = new Galaxy();

// initialize player
let player = new Player(activeGalaxy);

// generate the game instance
let gameInstance = {
    galaxy: activeGalaxy,
    player: player
};

let activeGame = new Game(gameInstance);
