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
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K"
    ];

    constructor(suit, rank) {
        this.suit = suit;
        this.suitImg = Card.SUIT_IMGS[Card.SUITS.indexOf(suit)];
        this.rank = rank;
        this.rankValue = this.getRankValue();
        this.rankIndex = Card.RANKS.indexOf(rank);
        this.isRed = (suit === "diamonds" || suit === "hearts") ? true : false;
        this.commonName = this.getCommonName();
    }

    getRankValue = () => {
        return Math.min(1 + Card.RANKS.indexOf(this.rank), 10);
    }

    getCommonName = () => {
        return `${this.rank} of ${this.suit}`;
    }
}

export default Card;