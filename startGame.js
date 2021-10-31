const Perudo = require('./Perudo');
const config = require('./config.json');

module.exports = function (interaction) {
    // get the command name and the arguments
    const commandName = interaction.commandName;
    // get the mentionned players
    const players = interaction.options.resolved?.members;
    if (!interaction.mentions.users.size) {
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
