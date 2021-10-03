const Perudo = require('./Perudo');
const config = require('./config.json');

module.exports = function(message) {
    // get the command name and the arguments
    const prefix = config['prefix'];
    const commandAliases = config['commandAliases'];
    if (!message.content.startsWith(prefix)) return;
    // check if the command corresponds to one of the aliases
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    if (!commandAliases.includes(commandName)) return;
    // return if we are printing the help
    if (config['help'].includes(args[0])) return;
    // get the mentionned players
    if (!message.mentions.users.size) {
        message.reply('you must tag users to play with.');
        return;
    }
    // get the players
    const players = message.mentions.users.first(message.mentions.users.size).filter((p) => {
        return p.id != message.author.id;
    });
    players.push(message.author);
    // get the guild with custom emojis
    // initialize the game
    const Game = new Perudo(message, players, parseInt(config['diceNumber']));
    // start a first round
    Game.startRound(config);
    return Game;
};
