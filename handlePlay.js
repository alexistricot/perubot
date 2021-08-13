const config = require("./config.json");
const dudo = require("./dudo");
const calzone = require("./calzone");
const newBet = require("./newBet");

module.exports = function(message, Game) {
    const content = message.content.trim().toLowerCase();
    // check the message content for keywords
    if (config["dudo"].includes(content)) {
        dudo(message, Game);
    }
    else if (config["calzone"].includes(content)) {
        calzone(message, Game);
    }
    else {
        newBet(message, Game);
    }
};
