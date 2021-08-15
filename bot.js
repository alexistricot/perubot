const dotenv = require("dotenv");
const { Client, Intents } = require("discord.js");
const printMessage = require("./printMessage");
const handlePlay = require("./handlePlay");
const startGame = require("./startGame");

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
client.once("ready", () => {
    console.log("Ready!");
});

let Game;
client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    // start a game if there isn't one
    if (!Game) {
        Game = startGame(message);
    }
    // handle the plays
    if (Game) {
        handlePlay(message, Game);
        if (Game.over) Game = undefined;
    }
    // print information to the console
    printMessage(message, Game);
});

// login
client.login(process.env.TOKEN);
