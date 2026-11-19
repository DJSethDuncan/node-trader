const _ = require('lodash');
const fs = require('fs');
const Tools = require('./Tools');
const Colors = require('./Colors');

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
                commandResponse.text += this.scanSystem(commandInstance);
                break;
            case 'warp':
                commandResponse.text += Colors.yellow('Please enter a destination, like "warp deleniti"')
                break;
            case 'quit':
            case 'exit':
                console.log(Colors.dim('Bye.'));
                process.exit(1);
                break;
            default:
                if (commandInstance.input.startsWith('warp ')) {
                    commandResponse.text += this.warp(commandInstance);
                    // @TODO it would be nice if this didn't update if the warp failed but for now we'll update every time
                    commandResponse.updatePlayer = true;
                } else if (commandInstance.input.startsWith('scan ')) {
                    commandResponse.text += this.scanEntity(commandInstance);
                } else {
                    commandResponse.text = Colors.red(`Not sure what you mean by ${commandInstance.input}.`);
                }
                break;
        }
        return commandResponse;
    }

    welcomeText = (gameInstance) => {
        const commandInstance = { gameInstance: gameInstance };
        const systemCount = gameInstance.galaxy.getSystemIds().length;
        const currentSystem = gameInstance.galaxy.systems[gameInstance.player.properties.activeSystem];
        const exampleDestination = gameInstance.galaxy.systems[currentSystem.connections[0]].name;
        return Colors.cyan(banner) + '\n\n' +
            `${systemCount} star systems are linked by wormholes. Explore them.\n\n` +
            this.getStatus(commandInstance) + '\n\n' +
            Colors.bold('Getting started:') + '\n' +
            '  1. Type ' + Colors.green('"scan"') + ' to list the planets and wormholes in this system\n' +
            '  2. Type ' + Colors.green('"warp <name>"') + ' to jump through a wormhole, like ' + Colors.green(`"warp ${exampleDestination}"`) + '\n' +
            '  3. Type ' + Colors.green('"help"') + ' any time to see every command';
    }

    getStatus = (commandInstance) => {
        let status = '';
        status += Colors.bold('Location: ') + Colors.cyan(_.capitalize(commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].name))
        return status;
    }

    scanSystem = (commandInstance) => {
        let scan = '';
        let currentSystemId = commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].id;
        const systemsLibrary = Tools.load('systems');

        scan += Colors.bold('System: ') + Colors.cyan(_.capitalize(commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].name)) + '\n';
        scan += '\n';

        scan += Colors.bold('Planets:') + '\n';
        if (commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].planets.length > 0) {
            commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].planets.forEach((planetId) => {
                let thisPlanet = Tools.loadPlanet(planetId);
                scan += '  ' + Colors.magenta(_.capitalize(systemsLibrary[currentSystemId].name) + ' ' + _.capitalize(thisPlanet.name)) + '\n';
            })
        } else {
            scan += '  ' + Colors.dim('(none)') + '\n';
        }
        scan += '\n';

        scan += Colors.bold('Wormholes:') + '\n';
        commandInstance.gameInstance.galaxy.systems[commandInstance.gameInstance.player.properties.activeSystem].connections.forEach((systemId) => {
            scan += '  ' + Colors.cyan(_.capitalize(systemsLibrary[systemId].name)) + '\n';
        })
        scan += '\n';

        return scan;
    }

    scanEntity = (commandInstance) => {
        const entity = commandInstance.input.split('scan ')[1].trim();
        if (entity == 'system') {
            return this.scanSystem(commandInstance);
        } else {
            return Colors.red('Unable to resolve ' + entity + ' on scanners');
        }
        // @TODO allow scanning wormholes and planets (and ships? whatever else)
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
                warpText = Colors.green('Warping to ' + _.capitalize(destination)) + '\n';
            }
        })
        if (!successfulWarp) {
            warpText = Colors.red('Unable to lock warp engines on ' + _.capitalize(destination));
        }
        return warpText;
    }
}

const banner = `+------------------------------------------+
|                                          |
|          N O D E   T R A D E R           |
|                                          |
+------------------------------------------+`;

const helpText = [
    ['status', 'run a status report'],
    ['scan', 'scan the local system'],
    ['scan <entity>', 'scan a target entity (planets, ships, etc)'],
    ['warp <system>', 'jump through a wormhole to a connected system'],
    ['quit', 'exit game']
].map(([command, description]) => Colors.green(command.padEnd(20)) + description).join('\n');

module.exports = CLI;