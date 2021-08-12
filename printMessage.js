const ctag = require("common-tags");

module.exports = function(message, Game) {
    console.log(ctag.stripIndents`Message from ${message.author.username}\
     on ${message.channel.topic}: ${message.content}`);
    // eslint-disable-next-line no-constant-condition
    console.log(`Game ${Game ? "on" : "off"}`);
    if (Game) {
        console.log(`${Game.nbPlayers} players`);
        console.log(`Players : ${Game.player.map((p) => p.toString())}`);
        console.log(`Current player : ${Game.player[Game.current].toString()}`);
        console.log(`Dice : ${Game.dice}`);
        console.log(`Rolls : ${Game.rolls}`);
    }
};
