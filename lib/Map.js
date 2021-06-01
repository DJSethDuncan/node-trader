const StarSystem = require('./StarSystem');
const fs = require('fs');

// instantiating a new map does these things
//
// 1. Generates x star systems where x is defined in .env
// 2. Generates connections for each star system

class Map {
    systemObject = {};
    constructor (numSystems) {
        let i = 1;
        do {
            let thisSystem = new StarSystem();
            this.systemObject[thisSystem.id] = thisSystem;
            i++;
        } while (i <= numSystems);

        // generate connections
        const systemIds = this.getSystemIds();
        systemIds.forEach((systemId) => {
            this.systemObject[systemId].generateConnections(systemIds);
        });

        // store system object to file
        fs.writeFile('./files/map.dat', JSON.stringify(this.systemObject), (err) => {
            if (err) throw err;
        });
    }

    // getters
    getSystemObject = () => this.systemObject;
    getSystemIds = () => Object.keys(this.systemObject)

}

module.exports = Map;