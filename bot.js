const dotenv = require("dotenv");
const Discord = require("discord.js");
const printMessage = require("./printMessage");
const handlePlay = require("./handlePlay");
const startGame = require("./startGame");

// load the bot token from .env
dotenv.config();

// load config
const config = require("./config.json");

// load a new client
const client = new Discord.Client();

// print when ready
client.once("ready", () => {
    console.log("Ready!");
});

let Game;
client.on("message", (message) => {
    // start a game if there isn't one
    if (!Game) {
        Game = startGame(message, config);
    }
    // print information to the console
    printMessage(message, Game);
    // handle the plays
    if (Game) {
        handlePlay(message, Game, config);
    }
});

// login
client.login(process.env.TOKEN);
