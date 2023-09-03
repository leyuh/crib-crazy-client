import Card from "./Card.js";
import Deck from "./Deck.js";

class Hand {
    constructor(cards, starterCard = null) {
        this.cards = cards;
        this.cardCount = cards.length;
        this.sortedCards = this.getSortedCards();
        this.starterCard = starterCard;
        this.handPoints = 0;
        this.scoreHand().map(pointInfo => this.handPoints += pointInfo[2]);
    }

    static TEST_COUNT = 200;

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

        return [];
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
        let points = [];

        let fifteens = this.getFifteens();
        for (let i = 0; i < fifteens.length; i++) points.push(["fifteen", fifteens[i], 2]);
        
        let sets = this.getSets();
        for (let i = 0; i < sets.length; i++) points.push(["set", sets[i], sets[i].length*(sets[i].length - 1)]);

        if (this.cardCount === 2) return points;

        let runs = this.getRuns();
        for (let i = 0; i < runs.length; i++) points.push(["run", runs[i], runs[i].length]);

        let flush = this.getFlush();
        if (flush) points.push(["flush", flush, flush.length]);

        let nobs = this.getNobs();
        if (nobs) points.push(["nobs", nobs, 1]);

        return points;
    }

    getPotentialPoints = (deck) => {

        if (this.cardCount === 2) {
            let totalPotentialCribPoints = 0;

            for (let i = 0; i < Hand.TEST_COUNT; i++) {
                let testDeck = new Deck([...deck.cards]);
                let testCards = testDeck.dealCards(3);

                let testHand = new Hand([...this.cards, ...testCards], testCards[2]);
                let testHandPoints = testHand.handPoints;

                totalPotentialCribPoints += testHandPoints;
            }

            return Math.round(totalPotentialCribPoints / Hand.TEST_COUNT * 10) / 10;

        } else if (this.cardCount === 4) {
            let totalPotentialHandPoints = 0;

            for (let i = 0; i < deck.cards.length; i++) {
                let thisCard = deck.cards[i];

                let testHand = new Hand([...this.cards, thisCard], thisCard);
                let testHandPoints = testHand.handPoints;
                totalPotentialHandPoints += testHandPoints;
            }

            return Math.round(totalPotentialHandPoints / deck.cards.length * 10) / 10;
        }
    }


    static getBestCombo = (deck, hand, cribIsMine) => {

        let bestCombo = {
            "hand cards": [],
            "hand points": [],
            "hand points total": 0,
            "potential hand points": 0,

            "crib cards": [],
            "crib points": [],
            "crib points total": 0,
            "potential crib points": 0,

            "overall score": 0
        }

        // test all 15 possible hand-crib combos
        for (let i = 0; i < hand.cardCount; i++) {
            for (let j = i + 1; j < hand.cardCount; j++) {
                
                let thisCrib = new Hand([hand.cards[i], hand.cards[j]]);
                let thisHand = new Hand(hand.cards.filter(card => thisCrib.cards.indexOf(card) === -1));
                
                // score hand
                let handPoints = thisHand.scoreHand();
                let handPointsCount = thisHand.handPoints;

                // get potential hand points
                let potentialHandPoints = thisHand.getPotentialPoints(deck);

                // score crib
                let cribPoints = thisCrib.scoreHand();
                let cribPointsCount = thisCrib.handPoints;

                // get potential crib points
                let potentialCribPoints = thisCrib.getPotentialPoints(deck);

                let overallScore = cribIsMine ? potentialHandPoints + potentialCribPoints : potentialHandPoints - potentialCribPoints;

                if (overallScore >= bestCombo["overall score"]) {
                    bestCombo = {
                        "hand cards": thisHand.cards,
                        "hand points": handPoints,
                        "hand points total": handPointsCount,
                        "potential hand points": potentialHandPoints,
            
                        "crib cards": thisCrib.cards,
                        "crib points": cribPoints,
                        "crib points total": cribPointsCount,
                        "potential crib points": potentialCribPoints,
            
                        "overall score": overallScore
                    };
                }
            }
        }

        return bestCombo;

    }

    static evaluateCombo = (deck, handCards, cribCards, cribIsMine) => {
        let handHand = new Hand(handCards);
        let cribHand = new Hand(cribCards);

        let potentialHandPoints = handHand.getPotentialPoints(deck);
        let potentialCribPoints = cribHand.getPotentialPoints(deck);

        let combo = {
            "hand cards": handCards,
            "hand points": handHand.scoreHand(),
            "hand points total": handHand.handPoints,
            "potential hand points": potentialHandPoints,

            "crib cards": cribCards,
            "crib points": cribHand.scoreHand(),
            "crib points total": cribHand.handPoints,
            "potential crib points": potentialCribPoints,

            "overall score": Math.round((cribIsMine ? potentialHandPoints + potentialCribPoints : potentialHandPoints - potentialCribPoints) * 10) / 10
        }

        return combo;
    }
}


export default Hand;