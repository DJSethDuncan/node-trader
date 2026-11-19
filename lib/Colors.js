const enabled = process.stdout.isTTY && !('NO_COLOR' in process.env);

const style = (open, close) => (text) => enabled ? `\x1b[${open}m${text}\x1b[${close}m` : String(text);

module.exports = {
    bold: style(1, 22),
    dim: style(2, 22),
    red: style(31, 39),
    green: style(32, 39),
    yellow: style(33, 39),
    cyan: style(36, 39),
    magenta: style(35, 39)
};
