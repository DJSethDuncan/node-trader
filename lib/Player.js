const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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
            const existingPlayerRaw = fs.readFileSync('./files/player.dat', { encoding: 'utf-8' });
            this.properties = JSON.parse(existingPlayerRaw);
            console.log('****** PLAYER LOADED');
        } else {
            console.log('****** GENERATING NEW PLAYER');
            let mapSystems = activeGalaxy.getSystemIds();
            this.properties.id = 'PA' + uuidv4();
            this.properties.activeSystem = mapSystems[Math.floor(Math.random() * mapSystems.length)];
            console.log('properties: ', this.properties);
            fs.writeFileSync('./files/player.dat', JSON.stringify(this.properties), (err) => {
                if (err) throw err;
            });
            console.log('****** PLAYER GENERATED');
        }
    }
}

module.exports = Player;