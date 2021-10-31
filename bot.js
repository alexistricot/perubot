const { Client, Intents } = require('discord.js');
const { initRanking, printRanking } = require('./ranking');
const printMessage = require('./printMessage');
const handlePlay = require('./handlePlay');
const startGame = require('./startGame');
const resign = require('./resign');
const dotenv = require('dotenv');
const help = require('./help');
const declareCommands = require('./declareCommands');

// load the bot token from .env
dotenv.config();

// load a new client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

// print when ready
client.once('ready', () => {
    console.log('Ready!');
    // initialize the ranking system
    initRanking();
    // declare the commands
    declareCommands();
});

let Game;
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    // handle the plays
    if (Game) {
        handlePlay(message, Game);
        resign(message, Game);
        if (Game.over) Game = undefined;
    }
    // print information to the console
    printMessage(message, Game);
});

client.on('interactionCreate', (interaction) => {
    // check the interaction
    if (interaction.user.bot) return;
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
    case 'perudo':
        // start a game if there isn't one
        if (!Game) {
            Game = startGame(interaction);
        }
        break;
    case 'perudo-help':
        help(interaction);
        break;
    case 'perudo-resign':
        if (Game) {
            resign(interaction, Game);
            if (Game.over) Game = undefined;
        }
        break;
    case 'perudo-ranking':
        interaction.reply('`Working...`');
        printRanking(interaction);
        break;
    default:
        break;
    }
});

// login
client.login(process.env.TOKEN);
