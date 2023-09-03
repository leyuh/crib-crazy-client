import Card from "./Card.js";

class Deck {
    constructor(cards = null) {
        cards ? this.cards = cards : this.cards = this.generateDeck();
        this.cards = this.shuffleDeck(this.cards);
    }

    shuffleDeck = (cards) => {
        return cards.sort((a, b) => {
            return Math.random() >= 0.5 ? 1 : -1;
        });
    }

    generateDeck = () => {
        let cards = [];

        for (let i = 0; i < Card.SUITS.length; i++) {
            for (let j = 0; j < Card.RANKS.length; j++) {
                let newCard = new Card(Card.SUITS[i], Card.RANKS[j]);
                cards.push(newCard);
            }
        }


        return cards;
    }

    dealCards = (cardCount) => {
        let hand = [];
        for (let i = 0; i < cardCount; i++) {
            let card = this.cards.pop();
            hand.push(card);
        }

        return hand;
    }
}

export default Deck;