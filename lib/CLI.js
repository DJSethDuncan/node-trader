const _ = require('lodash');
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
                commandResponse.text += this.getStatus(commandInstance.gameInstance);
                break;
            case 'quit':
            case 'exit':
                console.log('Bye.');
                process.exit(1);
                break;
            default:
                commandResponse.text == `Not sure what you mean by ${commandInstance.input}.`;
                break;
        }
        return commandResponse;
    }

    getStatus = (gameInstance) => {
        let status = 'Ship Status: 100%\n';
        status += 'Location: ' + _.capitalize(gameInstance.galaxy.systems[gameInstance.player.properties.activeSystem].name)
        return status;
    }
}

const helpText = `HELP

status          run a status report
quit            exit game`;

module.exports = CLI;