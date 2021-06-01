const Faker = require('faker');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Planet {
    properties = {};
    constructor () {
        this.properties.id = 'PL' + uuidv4();
        this.properties.name = Faker.lorem.word();
        this.properties.isHabitable = Math.floor(Math.random() * 100) < process.env.HABITABILITY_CHANCE
        
        // store planet object to file
        fs.writeFileSync('./files/planets/' + this.properties.id + '.dat', JSON.stringify(this.properties), (err) => {
            if (err) throw err;
        });
    }

    getId() {
        return this.properties.id;
    }
}

module.exports = Planet;