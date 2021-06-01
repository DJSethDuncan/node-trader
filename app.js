require('dotenv').config();
const Galaxy = require('./lib/Galaxy');
const Player = require('./lib/Player');

// generate map for this session
let activeGalaxy = new Galaxy();
let mapSystems = activeGalaxy.getSystemIds();

// initialize player
let player = new Player(mapSystems[Math.floor(Math.random() * mapSystems.length)]);
