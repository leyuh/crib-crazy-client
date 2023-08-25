import Card from "./Card.js";

class Hand {
    constructor(cards, starterCard = null) {
        this.cards = cards;
        this.sortedCards = this.getSortedCards();
        this.starterCard = starterCard;
    }

    getSortedCards = () => {
        return this.cards.sort((a, b) => {
            if (Card.RANKS.indexOf(a.rank) > Card.RANKS.indexOf(b.rank)) {
                return 1;
            }
            return -1;
        })
    }

    getSets = () => {
        let sets = [];
        let currRank = this.sortedCards[0].rank;
        let currSet = [this.sortedCards[0]];

        for (let i = 1; i < this.sortedCards.length; i++) {
            if (this.sortedCards[i].rank === currRank) {
                currSet.push(this.sortedCards[i]);
            } else {
                if (currSet.length >= 2) {
                    sets.push(currSet)
                }
                currSet = [this.sortedCards[i]];
                currRank = this.sortedCards[i].rank;
            }
        }

        if (currSet.length >= 2) {
            sets.push(currSet)
        }

        return sets;
    }

    getNobs = () => {
        if (!this.starterCard || this.cards.length !== 5) return null;
        
        for (let i = 0; i < this.sortedCards.length; i++) {
            if (this.sortedCards[i] !== this.starterCard) {
                if (this.sortedCards[i].rank === "J" && this.sortedCards[i].suit === this.starterCard.suit) {
                    return this.sortedCards[i];
                }
            }
        }
    }
}

export default Hand;