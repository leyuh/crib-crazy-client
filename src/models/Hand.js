import Card from "./Card.js";

class Hand {
    constructor(cards, starterCard = null) {
        this.cards = cards;
        this.sortedCards = this.getSortedCards();
        this.starterCard = starterCard;
    }

    getSortedCards = () => {
        return [...this.cards].sort((a, b) => {
            if (Card.RANKS.indexOf(a.rank) > Card.RANKS.indexOf(b.rank)) {
                return 1;
            }
            return -1;
        })
    }

    getCombinations = () => {
        var combinations = [];
        var temp = [];
        var slent = Math.pow(2, this.cards.length);

        for (var i = 0; i < slent; i++) {
            temp = [];
            for (var j = 0; j < this.cards.length; j++) {
                if ((i & Math.pow(2, j))) {
                    temp.push(this.cards[j]);
                }
            }
            if (temp.length > 0) {
                combinations.push(temp);
            }
        }

        return combinations;
    }

    getFifteens = () => {
        let fifteenCombos = this.getCombinations().filter(combo => {
            let sum = 0;
            combo.map(card => sum += card.rankValue);
            return sum === 15;
        });
        
        return fifteenCombos;
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

    getRuns = () => {
        let runs = [[this.sortedCards[0]]];

        let longestRunLength = 1;
        let lastCard = this.sortedCards[0];
        let lastRankAddition;

        for (let i = 1; i < this.sortedCards.length; i++) {
            let currCard = this.sortedCards[i];
            if (currCard.rankIndex - lastCard.rankIndex === 1) {
                runs = runs.map(run => [...run, currCard]);

                lastCard = currCard;
                lastRankAddition = null;
                longestRunLength++;
            } else if (currCard.rankIndex - lastCard.rankIndex === 0) {
                if (!lastRankAddition) {
                    lastRankAddition = [...runs].map(run => run.slice(0, -1))
                    let newRuns = [...runs].map(run => [...run.slice(0, -1), currCard]);
                    runs = [...runs, ...newRuns];
                } else {
                    runs = [...runs, ...lastRankAddition.map(run => [...run, currCard])];
                }

                lastCard = currCard;
            } else {
                // RUN BROKEN
                if (longestRunLength >= 3) {
                    return runs;
                } else {
                    runs = [[currCard]];
                    lastCard = currCard;
                    lastRankAddition = null;
                    longestRunLength = 1;
                }
            }
        }

        if (longestRunLength >= 3) {
            return runs;
        }

        return null;
    }

    getFlush = () => {
        for (let i = 0; i < Card.SUITS.length; i++) {
            let currSuit = Card.SUITS[i];
            let cardsOfSuit = this.cards.filter(card => card.suit === currSuit);
            if (cardsOfSuit.length >= 4) {
                return cardsOfSuit;
            }
        }

        return null;
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

    scoreHand = () => {
        let rubric = {
            "fifteens": this.getFifteens(),
            "sets": this.getSets(),
            "runs": this.getRuns(),
            "flush": this.getFlush(),
            "nobs": this.getNobs()
        } 

        return rubric;
    }
}


export default Hand;