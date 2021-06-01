const Faker = require('faker');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Planet {
    // if the system is generating planets it'll pass an iterator, otherwise you get '1'
    constructor (systemIterator = 1) {
        this.id = 'PL' + uuidv4();
        this.name = Faker.lorem.word() + ' ' + systemIterator;
        this.isHabitable = Math.floor(Math.random() * 100) < process.env.HABITABILITY_CHANCE
        
        // store planet object to file
        fs.writeFile('./files/planets/' + this.id + '.dat', JSON.stringify(this), (err) => {
            if (err) throw err;
        });
    }

    getId() {
        return this.id;
    }
}

module.exports = Planet;