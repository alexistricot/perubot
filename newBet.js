const Annonce = require('./Annonce');
const config = require('./config.json');

module.exports = function(message, Game) {
    // check if the author of the message is the player whose turn it is to play
    if (!(message.author.id === Game.player[Game.current].id)) return;
    const Bet = fromMessage(message);
    if (!Bet) return;
    if (Bet.value() <= Game.Bet.value()) return;
    // in palmito, we must bet the same dice as previous player
    if (Game.palmito && !Game.Bet.first && Bet.dice != Game.Bet.dice) return;
    // the bet is valid
    message.react(config['thumbsup']);
    Game.Bet = Bet;
    Game.nextPlayer();
    Game.notify();
};

function fromMessage(message) {
    const content = message.content.trim().toLowerCase().split(' ');
    if (!content.length == 2) return;
    const count = parseInt(content[0]),
        dice = parseInt(content[1]);
    if (!count || !dice) return;
    if (count <= 0) return;
    if (dice < 1 || dice > 6) return;
    // the bet is correct
    return new Annonce(false, count, dice);
}
