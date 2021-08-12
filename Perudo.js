const Annonce = require("./Annonce");

class Perudo {
    constructor(guild, players, diceNumber = 5) {
        // list of players still in the game (Discord.User)
        this.player = players;
        // number of players still in the game
        this.nbPlayers = players.length;
        // number of dice left for each player
        this.dice = new Array(this.nbPlayers).fill(diceNumber);
        // current roles for each player and each of their dice
        this.rolls = new Array(this.nbPlayers).fill(new Array(diceNumber).fill(1));
        // count of each dice type
        this.count = [this.nbPlayers * diceNumber, 0, 0, 0, 0, 0];
        // whether we are in palmito or not
        this.palmito = false;
        // current player
        this.current = 0;
        // current annonce
        this.annonce = new Annonce(true);
        this.guild = guild;
    }

    roll() {
        // roll all the dice
        // decide if we are in palmito
        this.rolls = this.rolls.map((a) => a.map(() => Math.floor(Math.random() * 6) + 1));
        this.updateCount();
    }

    startRound(config) {
        // start a new round
        this.roll();
        this.sendDice(config);
    }

    updateCount() {
        // update the count of each dice number
        for (let i = 1; i < 7; i++) {
            this.count[i] = this.rolls.reduce((x, y) => x + y.filter((a) => a == i).length, 0);
        }
        // if we are NOT in palmito, we add the pacos to the other number's counts
        if (!this.palmito) {
            for (let i = 2; i < 7; i++) {
                this.count[i] += this.count[0];
            }
        }
    }

    updateRolls(player) {
        // update the rolls array of a player
        this.rolls[player] = new Array(this.dice[player]).fill(1);
    }

    addDice(player) {
        // add a dice for a player
        this.dice[player] += 1;
        this.updateRolls(player);
    }

    removeDice(player) {
        // remove a dice for a player
        const user = this.player[player];
        this.dice[player] -= 1;
        this.updateRolls(player);
        if (this.dice[player] == 0) {
            this.removePlayer(player);
            return user;
        }
        else if (this.dice[player] == 1) {
            this.palmito = true;
        }
        else {
            return null;
        }
    }

    removePlayer(player) {
        // remove a player from the game
        this.nbPlayers -= 1;
        this.player.splice(player, 1);
        this.dice.splice(player, 1);
        this.rolls.splice(player, 1);
        this.current = this.current % this.nbPlayers;
    }

    sendDice(config) {
        // sends a DM to a player with their dice
        let diceEmojis;
        for (const i in this.player) {
            this.player[i].send("Rolls :");
            diceEmojis = this.rolls[i].map((a) => config["diceEmojiID"][a - 1]);
            diceEmojis = diceEmojis.map((a) => this.guild.emojis.cache.get(a).toString());
            this.player[i].send(diceEmojis.reduce((a, b) => a + " " + b));
        }
    }

    nextPlayer() {
        // move the current player to the next player
        this.current = (this.current + 1) % this.nbPlayers;
    }
}

module.exports = Perudo;
