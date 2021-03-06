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
}

module.exports = Annonce;
