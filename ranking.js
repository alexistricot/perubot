// export a function which adds a point to a player in ranking.json
// export a function that adds a loss to a player in ranking.json
// export a function which prints the ranking in ranking.json
// export a function that initializes ranking.json if it does not exist

const fs = require('fs');

module.exports = {
    addPoint: addWin,
    addLoss: addLoss,
    printRanking: printRanking,
    initRanking: initRanking,
};

function addWin(player) {
    fs.readFile('./ranking.js', (err, content) => {
        if (err) return console.error(err);
        const ranking = JSON.parse(content);
        // Check if new player and add a win
        if (Object.keys(ranking['win']).includes(player.name)) {
            ranking['win'][player.name] += 1;
        }
        else {
            ranking['win'][player.name] = 1;
        }
        // check if player exists in losses too
        if (Object.keys(ranking['loss']).includes(player.name)) {
            ranking['loss'][player.name] = 0;
        }
        fs.writeFile('./ranking.json', ranking, console.error);
    });
}

function printRanking(interaction) {}

function addLoss(player) {
    fs.readFile('./ranking.js', (err, content) => {
        if (err) return console.error(err);
        const ranking = JSON.parse(content);
        // check if new player and add a loss
        if (Object.keys(ranking['loss']).includes(player.name)) {
            ranking['loss'][player.name] += 1;
        }
        else {
            ranking['loss'][player.name] = 1;
        }
        // check if player exists in wins too
        if (Object.keys(ranking['win']).includes(player.name)) {
            ranking['win'][player.name] = 0;
        }
        fs.writeFile('./ranking.json', ranking, console.error);
    });
}

function initRanking() {
    if (!fs.existsSync('./ranking.json')) {
        const ranking = { win: [], loss: [] };
        fs.writeFile('./ranking.json', ranking, console.error);
    }
}
