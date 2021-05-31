const StarSystem = require('./StarSystem');

class Map {

    systemObject = {};

    constructor (numSystems) {

        let i = 1;

        do {
            let thisSystem = new StarSystem();
            this.systemObject[thisSystem.id] = thisSystem;
            i++;
        } while (i <= numSystems);

    }

    // getters
    getSystemObject = () => this.systemObject;
    getSystemIds = () => Object.keys(this.systemObject)

}

module.exports = Map;