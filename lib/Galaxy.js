const StarSystem = require('./StarSystem');
const fs = require('fs');
const Tools = require('./Tools');

class Galaxy {

    properties = {};
    systems = {};

    constructor () {

        if (
            fs.existsSync('./files/properties.dat') &&
            fs.existsSync('./files/systems.dat')
        ) {
            this.loadGalaxy();
        } else {
            this.generateGalaxy();
        }

    }

    // getters
    getProperties = () => this.properties;
    getSystems = () => this.systems;
    getSystemIds = () => Object.keys(this.systems)

    // tools
    generateGalaxy = () => {
        console.log('****** GENERATING NEW GALAXY');

        // make sure the relevant folders exist
        fs.mkdirSync('./files');
        fs.mkdirSync('./files/planets');

        let i = 1;
        do {
            let thisSystem = new StarSystem();
            this.systems[thisSystem.id] = thisSystem;
            Tools.debug(`generated system ${thisSystem.name} (${thisSystem.id}) with ${thisSystem.planets.length} planets`);
            i++;
        } while (i <= process.env.SYSTEMS_TO_GENERATE);

        // generate connections
        const systemIds = this.getSystemIds();
        systemIds.forEach((systemId) => {
            this.systems[systemId].generateConnections(systemIds);
            Tools.debug(`system ${this.systems[systemId].name} has ${this.systems[systemId].connections.length} wormholes`);
        });

        this.properties = {
            generatedAt: {
                epoch: Date.now(),
                date: Date()
            }
        }

        // store system object to file
        fs.writeFileSync('./files/systems.dat', JSON.stringify(this.systems), (err) => {
            if (err) throw err;
        });

        fs.writeFileSync('./files/properties.dat', JSON.stringify(this.properties), (err) => {
            if (err) throw err;
        });
        console.log('****** NEW GALAXY GENERATED');
    }

    loadGalaxy = () => {
        console.log('****** LOADING GALAXY');

        this.properties = Tools.load('properties');
        this.systems = Tools.load('systems');
        Tools.debug(`loaded ${this.getSystemIds().length} systems`, this.properties);

        // check for planet data
        const systemIds = this.getSystemIds();
        systemIds.forEach((systemId) => {
            if (this.systems[systemId].planets.length > 0) {
                this.systems[systemId].planets.forEach((planetId) => {
                    if (!fs.existsSync('./files/planets/' + planetId + '.dat')) {
                        console.error('Unable to load planet data for planet ' + planetId);
                    }
                })
            }
        });
        console.log('****** GALAXY LOADED');
    }

    // wipes every saved file so the next Galaxy is generated from scratch
    static genesis = () => {
        console.log('****** INITIATING PROJECT GENESIS')
        fs.rmSync('./files', {force: true, recursive: true});
        console.log('****** PROJECT GENESIS COMPLETE')
    }
}

module.exports = Galaxy;