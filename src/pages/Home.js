import { useState, useEffect } from "react";

import "../styles/Home.css";

import Deck from "../models/Deck.js";
import Hand from "../models/Hand.js";
import Card from "../models/Card.js";

import RoundSummary from "../components/RoundSummary.js";

const Home = () => {

    const [currDeck, setCurrDeck] = useState(null);
    const [myHand, setMyHand] = useState(null);
    const [cribIsMine, setCribIsMine] = useState(true);

    const [selectedCards, setSelectedCards] = useState([]);
    const [bestCombo, setBestCombo] = useState(null);
    const [myCombo, setMyCombo] = useState(null);

    const [showRoundSummary, setShowRoundSummary] = useState(false);

    useEffect(() => {
        let newDeck = new Deck();
        setCurrDeck(newDeck);
        let hand = new Hand(newDeck.dealCards(6))
        setMyHand(hand);

        let cribIsMine = Math.random() >= 0.5;
        setCribIsMine(cribIsMine);

        setBestCombo(Hand.getBestCombo(newDeck, hand, cribIsMine));
    }, [])

    const addSelectedCard = (card) => {
        if (selectedCards.length !== 2) {
            setSelectedCards(prev => [...prev, card]);
        } else {
            setSelectedCards(prev => [prev[1], card]);
        }
    }

    return <div id="home">
        
        <div id="crib-div">
            <h2><i>The crib is:</i></h2>
            <h1 id="crib-owner-label" className={`${cribIsMine ? "your-crib" : "their-crib"}`}>
                {cribIsMine ? "YOURS" : "THEIRS"}
            </h1>
        </div>

        <div>
            <h2 id="select-label">Select two cards to send to the crib.</h2>
        </div>

        <div className="cards-div large-cards-div" id="home-cards-div">
            {myHand && myHand.cards.map((card, i) => {
                return <div className={`card ${card.isRed ? "red" : "black"} ${selectedCards.indexOf(card) !== -1 && "selected"}`} key={i} onClick={() => {
                    if (selectedCards.indexOf(card) === -1) {
                        addSelectedCard(card);
                    }
                }}>
                    <h4>{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>

        <button id="submit-btn" onClick={() => {

            let myComboIsBestCombo = true;

            let sortFunction = (a, b) => {
                if (Card.RANKS.indexOf(a.rank) > Card.RANKS.indexOf(b.rank)) {
                    return 1;
                } else if (Card.RANKS.indexOf(a.rank) === Card.RANKS.indexOf(b.rank)) {
                    if (Card.SUITS.indexOf(a.suit) > Card.SUITS.indexOf(b.suit)) {
                        return 1;
                    }
                }
                return -1;
            }

            let myCribSorted = selectedCards.sort(sortFunction);
            let bestCribSorted = bestCombo["crib cards"].sort(sortFunction);

            for (let i = 0; i < myCribSorted.length; i++) {
                if (myCribSorted[i].commonName !== bestCribSorted[i].commonName) {
                    myComboIsBestCombo = false;
                }
            }

            if (selectedCards.length == 2) {
                if (myComboIsBestCombo) {
                    setMyCombo(bestCombo);
                } else {
                    setMyCombo(Hand.evaluateCombo(
                        currDeck, 
                        myHand.cards.filter(card => selectedCards.indexOf(card) === -1),
                        selectedCards,
                        cribIsMine
                    ));
                }

                setShowRoundSummary(true);
            }
        }}>Submit</button>

        {showRoundSummary && <RoundSummary 
            setShowRoundSummary={setShowRoundSummary}
            originalHand={myHand}
            bestCombo={bestCombo}
            myCombo={myCombo}
            cribIsMine={cribIsMine}
        />}
    </div>
}

export default Home;