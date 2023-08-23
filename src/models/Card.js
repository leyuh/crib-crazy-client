class Card {
    static SUITS = [
        "hearts",
        "diamonds",
        "spades",
        "clubs"
    ];

    static SUIT_IMGS = [
        "♥️",
        "♦️",
        "♠️",
        "♣️"
    ];

    static RANKS = [
        "ace",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "jack",
        "queen",
        "king"
    ];

    constructor(suit, rank) {
        this.suit = suit;
        this.suitImg = Card.SUIT_IMGS[Card.SUITS.indexOf(suit)];
        this.rank = rank;
        this.rankValue = this.getRankValue();
        this.getCommonName = this.getCommonName();
    }

    getRankValue = () => {
        return Math.min(1 + Card.RANKS.indexOf(this.rank), 10);
    }

    getCommonName = () => {
        return `${this.rank} of ${this.suit}`;
    }
}

export default Card;