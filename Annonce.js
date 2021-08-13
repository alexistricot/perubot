class Annonce {
    constructor(first, count, dice) {
        this.first = first;
        if (!this.first) {
            this.count = count;
            this.dice = dice;
        }
    }

    value() {
        if (this.first) return 0;
        let count;
        if (!this.palmito && this.dice == 1) {
            count = 2 * this.count;
        }
        else {
            count = this.count;
        }
        return (count - 1) * 6 + this.dice;
    }

    fromMessage(message) {
        const content = message.content.trim().toLowerCase().split(" ");
        if (!content.length == 2) return;
        const count = parseInt(content[0]),
            dice = parseInt(content[1]);
        if (!count || !dice) return;
        if (count <= 0) return;
        if (dice < 1 || dice > 6) return;
        // the bet is correct
        return new Annonce(false, count, dice);
    }
}

module.exports = Annonce;
