const config = require("./config.json");

module.exports = function(message, Game) {
    // get the player who calzoned
    let calzoner = Game.player.filter((a) => message.author.id == a.id);
    // check if player is in the game
    if (!calzoner.length) return;
    if (Game.Bet.first) return;
    calzoner = Game.player.indexOf(calzoner[0]);
    // calzoner can NOT be the previous player
    if (calzoner == Game.previousPlayer()) return;
    // calzone was valid
    message.react(config["pizza"]);
    // send the results to the channel
    Game.sendResults();
    // set the current player to the calzoner, he will start no matter what happens
    Game.current = calzoner;
    Game.palmito = false;
    // check if the player won
    if (Game.Bet.count == Game.count[Game.Bet.dice - 1]) {
        // calzoner won
        Game.addDice(calzoner);
    }
    else {
        // calzoner lost
        Game.removeDice(calzoner);
    }
    Game.startRound();
};
