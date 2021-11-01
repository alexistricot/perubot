const Perudo = require('./Perudo');
const config = require('./config.json');

module.exports = function(interaction) {
    // get the mentioned players, without the author
    console.log(interaction.options.data);
    const players = interaction.options.data
        .map((x) => x.member)
        .filter((p) => {
            return p.id != interaction.member.id && !p.bot;
        });
    if (!players || !players.length) {
        interaction.reply('you must tag users to play with.');
        return;
    }
    // add the author to the game
    players.push(interaction.member);
    // initialize the game
    const Game = new Perudo(interaction, players, parseInt(config['diceNumber']));
    // start a first round
    Game.startRound(config);
    return Game;
};
