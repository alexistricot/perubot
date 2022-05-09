const fs = require('fs');

module.exports = {
    addWin: addWin,
    addLoss: addLoss,
    printRanking: printRanking,
    initRanking: initRanking,
};

function addWin(player) {
    fs.readFile('./ranking.json', (err, content) => {
        if (err) return console.error(err);
        const ranking = JSON.parse(content);
        // Check if new player and add a win
        if (Object.keys(ranking['win']).includes(player.user.username)) {
            ranking['win'][player.user.username] += 1;
        }
        else {
            ranking['win'][player.user.username] = 1;
        }
        // check if player exists in losses too
        if (~Object.keys(ranking['loss']).includes(player.user.username)) {
            ranking['loss'][player.user.username] = 0;
        }
        console.log(ranking);
        fs.writeFile('./ranking.json', JSON.stringify(ranking), console.error);
    });
}

async function printRanking(interaction) {
    fs.readFile('./ranking.json', (err, data) => {
        if (err) return console.error(err);
        const ranking = JSON.parse(data);
        const players = Object.keys(ranking.win);
        const sortedPlayers = orderedPlayers(ranking, players);
        console.log(`sortedPlayers: ${sortedPlayers}`);
        let output = ':crown: ***Ranking*** :crown:\n\n';
        for (const p in sortedPlayers) {
            const player = sortedPlayers[p];
            console.log(`player: ${player}`);
            // add medals to the first three players
            if (p == 0) output += ':first_place:';
            else if (p == 1) output += ':second_place:';
            else if (p == 2) output += ':third_place:';
            // add the score of the player to the current line
            output += `**${player}** `;
            output += `${ranking['win'][player]} - ${ranking['loss'][player]} `;
            output += `(${
                (100 * ranking['win'][player]) / (ranking['loss'][player] + ranking['win'][player])
            } %)`;
            output += '\n';
        }
        reply(interaction, output);
    });
}

function addLoss(player) {
    fs.readFile('./ranking.json', (err, content) => {
        if (err) return console.error(err);
        const ranking = JSON.parse(content);
        // check if new player and add a loss
        if (Object.keys(ranking['loss']).includes(player.user.username)) {
            ranking['loss'][player.user.username] += 1;
        }
        else {
            ranking['loss'][player.user.username] = 1;
        }
        // check if player exists in wins too
        if (~Object.keys(ranking['win']).includes(player.user.username)) {
            ranking['win'][player.user.username] = 0;
        }
        fs.writeFile('./ranking.json', JSON.stringify(ranking), console.error);
    });
}

function initRanking() {
    if (!fs.existsSync('./ranking.json')) {
        const ranking = { win: {}, loss: {} };
        fs.writeFile('./ranking.json', JSON.stringify(ranking), console.error);
    }
}

function reply(interaction, message) {
    if (interaction.replied) {
        interaction.editReply(message);
    }
    else {
        interaction.reply(message);
    }
    console.log(message);
}

function orderedPlayers(ranking, players) {
    // get the winrate for each player
    const winrate = players.map((p) => ranking.win[p] / (ranking.loss[p] + ranking.win[p]));
    // return a new array with players sorted based on their winrate (highest winrate first)
    return players
        .slice()
        .sort((a, b) => winrate[players.indexOf(b)] - winrate[players.indexOf(a)]);
}
