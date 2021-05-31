const Faker = require('faker');

class Planet {
    // if the system is generating planets it'll pass an iterator, otherwise you get '1'
    constructor (systemIterator = 1) {
        this.name = Faker.lorem.word() + ' ' + systemIterator;
        this.isHabitable = Math.floor(Math.random() * 100) < process.env.HABITABILITY_CHANCE
    }
}

module.exports = Planet;