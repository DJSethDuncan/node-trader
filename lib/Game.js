const readlineSync = require('readline-sync');
const { command } = require('yargs');
const CLI = require('./CLI');

class Game {

    isAlive = true;

    constructor (gameInstance) {
        this.galaxy = gameInstance.galaxy;
        this.player = gameInstance.player;
        this.cli = new CLI();
        this.commandLine();
    }

    commandLine = async (prePromptText = '') => {
        const input = readlineSync.question(`${prePromptText}\n\n#-> `);
        const commandInstance = {
            gameInstance: this,
            input: input.toLowerCase()
        };
        const commandResponse = this.cli.processCommand(commandInstance);
        // updateGalaxy
        // updatePlayer
        this.commandLine(commandResponse.text);
    }

}

module.exports = Game;