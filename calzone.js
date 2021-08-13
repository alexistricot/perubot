const config = require("./config.json");

module.exports = function(message, Game) {
    // get the player who calzoned
    let calzoner = Game.player.filter((a) => message.author.id === a.id);
    // check if player is in the game
    if (!calzoner.length) return;
    calzoner = calzoner[0];
    // calzone was valid
    message.react(config["pizza"]);
    // send the results to the channel
    Game.sendResults();
    // set the current player to the calzoner, he will start no matter what happens
    Game.current = calzoner;
    // check if the player won
    if (Game.Bet.count() == Game.count[Game.Bet.dice()]) {
        // calzoner won
        Game.addDice(calzoner);
    }
    else {
        // calzoner lost
        Game.removeDice(calzoner);
    }
    Game.startRound();
};
