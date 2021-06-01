const StarSystem = require('./StarSystem');
const fs = require('fs');

// instantiating a new map does these things
//
// 1. Generates x star systems where x is defined in .env
// 2. Generates connections for each star system

class Galaxy {

    galaxyObject = {
        
    };

    constructor () {
        // if files already exist, load them

        // else generate new stuff
        let i = 1;
        do {
            let thisSystem = new StarSystem();
            this.galaxyObject[thisSystem.id] = thisSystem;
            i++;
        } while (i <= process.env.SYSTEMS_TO_GENERATE);

        // generate connections
        const systemIds = this.getSystemIds();
        systemIds.forEach((systemId) => {
            this.galaxyObject[systemId].generateConnections(systemIds);
        });

        // store system object to file
        fs.writeFile('./files/galaxy.dat', JSON.stringify(this.galaxyObject), (err) => {
            if (err) throw err;
        });
    }

    // getters
    getGalaxyObject = () => this.galaxyObject;
    getSystemIds = () => Object.keys(this.galaxyObject)

}

module.exports = Galaxy;