const config = require('./config.json');

module.exports = function(message, Game) {
    // get the command name and the arguments
    const prefix = config['prefix'];
    const commandAliases = config['commandAliases'];
    if (!message.content.startsWith(prefix)) return;
    // check if the command corresponds to one of the aliases
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    if (!commandAliases.includes(commandName)) return;
    // check if we are resigning
    if (args.length < 1) return;
    if (!config['resign'].includes(args[0])) return;
    Game.over = true;
    Game.channel.send(`${message.author.toString()} resigned, game ended.`);
    for (const i in Game.player) {
        Game.player[i].send(`${message.author.toString()} resigned, game ended.`);
    }
    const maxDice = maxargmax(Game.dice)[0];
    for (const i in Game.player) {
        if (Game.player[i].dice == maxDice) {
            Game.channel.send(`Most dice : ${Game.player[i].toString()} with ${maxDice} dice left`);
        }
    }
};

function maxargmax(t) {
    // return the max and argmax of an array
    return t.map((x, i) => [x, i]).reduce((a, r) => (a[0] > r[0] ? a : r));
}
