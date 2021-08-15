const Annonce = require('./Annonce');
const config = require('./config.json');

class Perudo {
    constructor(guild, channel, players, diceNumber = 5) {
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
        // current bet
        this.Bet = new Annonce(true);
        this.guild = guild; // guild where the game takes place
        this.channel = channel; // channel where the game takes place
        // notify the players
        this.channel.send(`:dodo: Perudo game started ! :dodo:`);
        // game is over
        this.over = false;
    }

    roll() {
        // roll all the dice
        // decide if we are in palmito
        this.rolls = this.rolls.map((a) => a.map(() => Math.floor(Math.random() * 6) + 1));
        this.updateCount();
    }

    stop() {
        this.over = true;
    }

    startRound() {
        // start a new round
        // check if a player won
        if (this.nbPlayers == 1) {
            this.channel.send(`${this.player[0]} won the game :crown:`);
            return this.stop();
        }
        // check palmito
        if (this.palmito) {
            this.channel.send(':dodo: ***¡ PALMITO !*** :dodo:');
        }
        this.roll();
        this.sendDice();
        this.Bet = new Annonce(true);
        this.notify();
    }

    updateCount() {
        // update the count of each dice number
        for (let i = 1; i < 7; i++) {
            this.count[i] = this.rolls.reduce((x, y) => x + y.filter((a) => a == i).length, 0);
        }
        // if we are NOT in palmito, we add the pacos to the other number's counts
        if (!this.palmito) {
            for (let i = 1; i < 7; i++) {
                this.count[i] += this.count[0];
            }
        }
    }

    updateRolls(player) {
        // update the rolls array of a player
        this.rolls[player] = new Array(this.dice[player]).fill(1);
    }

    addDice(player) {
        // add a dice for a player, only if we are not in duel
        if (this.nbPlayers > 2) {
            this.dice[player] += 1;
            this.updateRolls(player);
            this.player[player].send(`You won a dice, ${this.dice[player]} dice left`);
            this.channel.send(`${this.player[player].toString()} won a dice`);
        }
    }

    removeDice(player) {
        // remove a dice for a player
        // remove the dice
        this.dice[player] -= 1;
        this.updateRolls(player);
        // notify the player
        this.player[player].send(`You lost a dice, ${this.dice[player]} dice left`);
        this.channel.send(`${this.player[player].toString()} lost a dice`);
        // handle losing player
        if (this.dice[player] == 0) {
            this.channel.send(`${this.player[player].toString()} lost :skull:`);
            this.removePlayer(player);
            this.palmito = false;
        }
        else if (this.dice[player] == 1) {
            this.palmito = true;
        }
        else {
            this.palmito = false;
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

    sendDice() {
        // sends a DM to a player with their dice
        let diceEmojis;
        for (const i in this.player) {
            this.player[i].send('Rolls :');
            diceEmojis = this.rolls[i].map((a) => this.diceEmoji(a));
            this.player[i].send(diceEmojis.reduce((a, b) => a + ' ' + b));
        }
    }

    nextPlayer() {
        // move the current player to the next player
        this.current = (this.current + 1) % this.nbPlayers;
    }

    sendResults() {
        let resultString = '',
            diceEmojis;
        for (const i in this.player) {
            resultString += this.player[i].toString() + '\n';
            diceEmojis = this.rolls[i].map((a) => config['diceEmojiID'][a - 1]);
            diceEmojis = diceEmojis.map((a) => this.guild.emojis.cache.get(a).toString());
            resultString += diceEmojis.reduce((a, b) => a + ' ' + b) + '\n';
        }
        resultString += `Bet was **${this.Bet.count}** ${this.diceEmoji(this.Bet.dice)}, \
there are **${this.count[this.Bet.dice - 1]}** ${this.diceEmoji(this.Bet.dice)}\n`;
        this.channel.send(resultString);
    }

    notify() {
        if (this.Bet.first) {
            this.channel.send(`First play, ${this.player[this.current].toString()} to bet first.`);
        }
        else {
            this.channel.send(`${this.player[this.previousPlayer()].toString()} bet \
**${this.Bet.count}** \
${this.diceEmoji(this.Bet.dice)}, \
${this.player[this.current].toString()} to play next`);
        }
    }

    diceEmoji(dice) {
        return this.guild.emojis.cache.get(config['diceEmojiID'][dice - 1]).toString();
    }

    previousPlayer() {
        // return the previous player
        return this.current == 0 ? this.nbPlayers - 1 : this.current - 1;
    }
}

module.exports = Perudo;
