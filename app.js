require('dotenv').config();
const Map = require('./lib/Map');
const Player = require('./lib/Player');

// generate map for this session
let activeMap = new Map(process.env.SYSTEMS_TO_GENERATE);
let mapSystems = activeMap.getSystemIds();
let player = new Player(mapSystems[Math.floor(Math.random() * mapSystems.length)]);

console.log(player);