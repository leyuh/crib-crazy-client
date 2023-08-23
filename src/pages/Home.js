import { useState, useEffect } from "react";

import "../styles/Home.css";

import Deck from "../models/Deck.js";
import Hand from "../models/Hand.js";
import Card from "../models/Card.js";

const Home = () => {

    const [currDeck, setCurrDeck] = useState(null);
    const [myHand, setMyHand] = useState(null);
    const [cribIsMine, setCribIsMine] = useState(true);

    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        let newDeck = new Deck();
        setCurrDeck(newDeck);
        setMyHand(new Hand(newDeck.dealCards(6)));
        setCribIsMine(Math.random() >= 0.5);
    }, [])

    const addSelectedCard = (card) => {
        if (selectedCards.length !== 2) {
            setSelectedCards(prev => [...prev, card]);
        } else {
            setSelectedCards(prev => [prev[1], card]);
        }
    }

    return <div id="home">
        <h2>The crib is:</h2>
        <h1 id="crib-owner-label">{cribIsMine ? "YOURS" : "THEIRS"}</h1>

        <h2>Select two cards to send to the crib.</h2>
        <div id="cards-div">
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

        <button id="submit-btn">Submit</button>
    </div>
}

export default Home;