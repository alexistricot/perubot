const config = require('./config.json');
const fs = require('fs');

module.exports = function(interaction) {
    const helpMessage = fs.readFileSync('./README.md');
    interaction.channel.send(helpMessage.toString());
};
