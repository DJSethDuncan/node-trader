const Faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const Planet = require('./Planet');

class StarSystem {
    constructor () {
        this.id = 'SS' + uuidv4();
        this.name = Faker.lorem.word();
        this.planets = [];
        for (let i = 0; i < Math.floor(Math.random() * process.env.MAX_PLANETS_PER_SYSTEM); i++) {
            const thisPlanet = new Planet();
            this.planets.push(thisPlanet.getId());
        }
        this.connections = [];
    }

    generateConnections = (possibleIds) => {
        let connectionCount = 0;
        possibleIds.forEach((possibleId) => {
            if (
                Math.floor(Math.random() * 100) < process.env.STAR_SYSTEM_CONNECTION_CHANCE && 
                connectionCount < process.env.STAR_SYSTEM_MAX_CONNECTIONS
            ) {
                this.connections.push(possibleId);
                connectionCount++;
            }
        });
        if (connectionCount == 0) {
            this.generateConnections(possibleIds);
        }
    }
}

module.exports = StarSystem;