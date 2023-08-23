import { useState, useEffect } from "react";

import Deck from "../models/Deck.js";
import Hand from "../models/Hand.js";
import Card from "../models/Card.js";

const Home = () => {

    const [myHand, setMyHand] = useState(null);
    const [myCrib, setMyCrib] = useState(true);

    useEffect(() => {
        let newDeck = new Deck();
        setMyHand(new Hand(newDeck.dealCards(6)));
        setMyCrib(Math.random() >= 0.5);
    }, [])

    return <div id="home">
        <h2>The crib is:</h2>
        <h1 id="crib-owner-label">{myCrib ? "YOURS" : "THEIRS"}</h1>

        <h2>Select two cards to send to the crib.</h2>
        <div id="cards-div">
            {myHand && myHand.cards.map((card, i) => {
                return <div className="card" key={i}>
                    <h4>{card.suitImg}</h4>
                    <h4>{card.rank}</h4>
                </div>
            })}
        </div>
    </div>
}

export default Home;