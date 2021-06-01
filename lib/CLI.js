const _ = require('lodash');
const fs = require('fs');
const Tools = require('./Tools');

class CLI {
    
    constructor () {}

    processCommand = (commandInstance) => {
        let commandResponse = {
            updatePlayer: false,
            updateGalaxy: false,
            text: '\n'
        };
        switch (commandInstance.input) {
            case 'help':
                commandResponse.text += helpText;
                break;
            case 'status':
                commandResponse.text += this.getStatus(commandInstance);
                break;
            case 'scan':
                commandResponse.text += this.getScan(commandInstance);
                break;
            case 'warp':
                commandResponse.text += 'Please enter a destination, like "warp deleniti"'
                break;
            case 'quit':
            case 'exit':
                console.log('Bye.');
                process.exit(1);
                break;
            default:
                if (commandInstance.input.startsWith('warp ')) {
                    commandResponse.text += this.warp(commandInstance);
                    // @TODO it would be nice if this didn't update if the warp failed but for now we'll update every time
                    commandResponse.updatePlayer = true;
                } else {
                    commandResponse.text = `Not sure what you mean by ${commandInstance.input}.`;
                }
                break;
        }
        return commandResponse;
    }

    getStatus = (commandInstance) => {
        let status = '';
        status += 'Location: ' + _.capitalize(commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].name)
        return status;
    }

    getScan = (commandInstance) => {
        let scan = '';
        let currentSystemId = commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].id;
        scan += 'Current System: ' + _.capitalize(commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].name) + '\n';
        scan += '\n';
        
        scan += 'Available Wormholes: \n';
        const systemsLibrary = Tools.load('systems');
        commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].connections.forEach((systemId) => {
            scan += '  ' + _.capitalize(systemsLibrary[systemId].name) + '\n';
        })
        scan += '\n';
        
        scan += 'Planets: \n';
        if (commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].planets.length > 0) {
            commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].planets.forEach((planetId) => {
                let thisPlanet = Tools.loadPlanet(planetId);
                scan += '  ' + _.capitalize(thisPlanet.name) + '\n';
            })
        } else {
            scan += '  (none)\n';
        }
        scan += '\n';
        return scan;
    }

    warp = (commandInstance) => {
        let successfulWarp = false;
        let warpText = '';
        const destination = commandInstance.input.split('warp ')[1].trim();
        const systemsLibrary = Tools.load('systems');
        commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].connections.forEach((systemId) => {
            if (systemsLibrary[systemId].name == destination) {
                successfulWarp = true;
                // @TODO move this to a updatePlayer function?
                commandInstance.gameInstance.player.properties.activeSystem = systemId;
                warpText = 'Warping to ' + _.capitalize(destination) + '\n';
            }
        })
        if (!successfulWarp) {
            warpText = 'Unable to lock warp engines on ' + _.capitalize(destination);
        }
        return warpText;
    }
}

const helpText = `status          run a status report
scan            scan the local system
quit            exit game`;

module.exports = CLI;