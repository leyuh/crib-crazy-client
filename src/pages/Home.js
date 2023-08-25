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

    const [showRoundSummary, setShowRoundSummary] = useState(false);

    useEffect(() => {
        let newDeck = new Deck();
        setCurrDeck(newDeck);

        let hand = new Hand(newDeck.dealCards(6))
        setMyHand(hand);
        setCribIsMine(Math.random() >= 0.5);

        console.log(hand.getSets());
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
            if (selectedCards.length == 2) {
                setShowRoundSummary(true);
            }
        }}>Submit</button>

        {showRoundSummary && <RoundSummary 
            myHand={myHand}
            selectedCards={selectedCards}
            cribIsMine={cribIsMine}
            setShowRoundSummary={setShowRoundSummary}
        />}
    </div>
}

export default Home;