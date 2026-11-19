const flags = {
    '--genesis': 'delete the saved galaxy and player, then generate a new galaxy',
    '--debug': 'print debug logs while generating, loading and playing',
    '--help': 'show these options and exit'
};

const usage = () => 'Usage: npm start -- [options]\n\nOptions:\n' +
    Object.entries(flags).map(([flag, text]) => `  ${flag.padEnd(12)}${text}`).join('\n');

// returns { genesis, debug, help } or throws on an unknown flag
const parseArgs = (argv) => {
    const unknown = argv.filter((arg) => !(arg in flags));
    if (unknown.length > 0) {
        throw new Error(`Unknown option: ${unknown.join(', ')}\n\n${usage()}`);
    }
    return {
        genesis: argv.includes('--genesis'),
        debug: argv.includes('--debug'),
        help: argv.includes('--help')
    };
};

module.exports = { parseArgs, usage };
