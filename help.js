const config = require('./config.json');
const fs = require('fs');

module.exports = function(message) {
    // get the command name and the arguments
    const prefix = config['prefix'];
    const commandAliases = config['commandAliases'];
    if (!message.content.startsWith(prefix)) return;
    // check if the command corresponds to one of the aliases
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    if (!commandAliases.includes(commandName)) return;
    // check if we have to print
    if (args.length < 1) return;
    if (!config['help'].includes(args[0])) return;
    const helpMessage = fs.readFileSync('./README.md');
    message.channel.send(helpMessage.toString());
};
