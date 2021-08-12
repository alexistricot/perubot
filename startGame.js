const Perudo = require("./Perudo");

module.exports = function(message, config) {
    // get the command name and the arguments
    const prefix = config["prefix"];
    const commandAliases = config["commandAliases"];
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // check if the command corresponds to one of the aliases
    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    if (!commandAliases.includes(commandName)) return;
    // get the mentionned players
    if (!message.mentions.users.size) {
        message.reply("you must tag users to play with.");
        return;
    }
    // get the players
    const players = message.mentions.users.first(message.mentions.users.size);
    players.push(message.author);
    // initialize the game
    const Game = new Perudo(
        message.guild,
        message.channel,
        players,
        parseInt(config["diceNumber"]),
    );
    // start a first round
    Game.startRound(config);
    return Game;
};
