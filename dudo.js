const config = require('./config.json');

module.exports = function(message, Game) {
    // check if the author of the message is the player whose turn it is to play
    if (!(message.author.id === Game.player[Game.current].id)) return;
    if (Game.Bet.first) return;
    message.react(config['dodo']);
    // check if the player who dudoed won
    let winner, loser;
    if (Game.Bet.count > Game.count[Game.Bet.dice]) {
        // the dudo won
        winner = Game.current;
        loser = Game.previousPlayer();
    }
    else {
        // the dudo lost
        winner = Game.previousPlayer();
        loser = Game.current;
    }
    // notify the players of the results
    Game.sendResults();
    Game.channel.send(
        `${Game.player[winner].toString()} won, ${Game.player[loser]} lost the round`,
    );
    // set the current player to the loser and remove a dice
    Game.current = loser;
    Game.removeDice(loser);
    Game.startRound();
};
