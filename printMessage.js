const ctag = require("common-tags");

module.exports = function(message, Game) {
    console.log(ctag.stripIndents`Message from ${message.author.username}\
     on ${message.channel.topic}: ${message.content}`);
    // eslint-disable-next-line no-constant-condition
    console.log(`Game ${"on" ? Game : "off"}`);
    if (Game) {
        console.log(`${Game.nbPlayers} players`);
        console.log(`Players : ${Game.players.map((p) => p.toString())}`);
        console.log(`Current player : ${Game.players[Game.current].toString()}`);
        console.log(`Dice : ${Game.dice}`);
    }
};
