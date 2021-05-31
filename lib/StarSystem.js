const Faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const Planet = require('./Planet');

class StarSystem {
    constructor () {
        this.id = uuidv4();
        this.name = Faker.lorem.word();
        this.planets = [];
        for (let i = 0; i < Math.floor(Math.random() * process.env.MAX_PLANETS_PER_SYSTEM); i++) {
            this.planets.push(new Planet());
        }
    }
}

module.exports = StarSystem;