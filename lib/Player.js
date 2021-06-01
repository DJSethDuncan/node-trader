const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Tools = require('./Tools');

class Player {
    properties = {
        id: 0,
        activeSystem: ''
    };
    constructor (activeGalaxy) {
        if (
            fs.existsSync('./files/player.dat')
        ) {
            console.log('****** LOADING PLAYER');
            this.properties = Tools.load('player');
            console.log('****** PLAYER LOADED');
        } else {
            console.log('****** GENERATING NEW PLAYER');
            let mapSystems = activeGalaxy.getSystemIds();
            this.properties.id = 'PA' + uuidv4();
            this.properties.activeSystem = mapSystems[Math.floor(Math.random() * mapSystems.length)];
            fs.writeFileSync('./files/player.dat', JSON.stringify(this.properties), (err) => {
                if (err) throw err;
            });
            console.log('****** PLAYER GENERATED');
        }
    }
}

module.exports = Player;