const config = require('./config.json');
const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

function postCommands(commandDeclarations) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationGuildCommands(config['clientID'], config['guild']), {
        body: commandDeclarations,
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

function userOption(i) {
    return new SlashCommandUserOption()
        .setName('player' + i)
        .setDescription('Player to add to the game.')
        .setRequired(i == 1);
}

// main function
module.exports = function() {
    const commandDeclarations = [
        new SlashCommandBuilder().setName('perudo').setDescription('Start a perudo game.'),
        new SlashCommandBuilder()
            .setName('perudo-resign')
            .setDescription('Resign the current perudo game.'),
        new SlashCommandBuilder()
            .setName('perudo-help')
            .setDescription('Get help on the perudo commands.'),
        new SlashCommandBuilder()
            .setName('perudo-ranking')
            .setDescription('Get a ranking of all the perudo players.'),
    ];
    for (let i = 1; i <= config.maxPlayers; i++) {
        commandDeclarations[0].addUserOption(userOption(i));
    }
    postCommands(commandDeclarations.map((command) => command.toJSON()));
};
