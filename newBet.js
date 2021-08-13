const Annonce = require("./Annonce");
const config = require("./config.json");

module.exports = function(message, Game) {
    // check if the author of the message is the player whose turn it is to play
    if (!(message.author.id === Game.player[Game.current].id)) return;
    const Bet = Annonce.fromMessage(message);
    if (!Bet) return;
    if (Bet.value() <= Game.Bet.value()) return;
    // the bet is valid
    message.react(config["thumbsup"]);
    Game.Bet = Bet;
    Game.nextPlayer();
    Game.notify();
};
