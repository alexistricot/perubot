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
    const players = message.mentions.users;
    const Game = new Perudo(players, parseInt(config["diceNumber"]));
    return Game;
};
