const fs = require('fs');

Tools = {
    load: function (file) {
        switch (file) {
            case 'systems':
                return JSON.parse(fs.readFileSync('./files/systems.dat', { encoding: 'utf-8' }));
                break;
            case 'player':
                return JSON.parse(fs.readFileSync('./files/player.dat', { encoding: 'utf-8' }));
                break;
            case 'properties':
                return JSON.parse(fs.readFileSync('./files/properties.dat', { encoding: 'utf-8' }));
                break;
            default:
                return false;
                break;
        }
    },
    loadPlanet: function (planetId) {
        if (fs.existsSync('./files/planets/' + planetId + '.dat')) {
            return JSON.parse(fs.readFileSync('./files/planets/' + planetId + '.dat', { encoding: 'utf-8' }));
        } else {
            return false;
        }
    }

}

module.exports = Tools;