require('dotenv').config();
const Galaxy = require('./lib/Galaxy');
const Player = require('./lib/Player');
const Game = require('./lib/Game');
const Tools = require('./lib/Tools');
const { parseArgs, usage } = require('./lib/Args');

let args;
try {
    args = parseArgs(process.argv.slice(2));
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

if (args.help) {
    console.log(usage());
    process.exit(0);
}

Tools.debugEnabled = args.debug;

if (args.genesis) {
    Galaxy.genesis();
}

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
