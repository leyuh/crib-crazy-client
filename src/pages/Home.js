import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import leaderboardIcon from "../images/leaderboard-icon.png";

import "../styles/Home.css";

import Deck from "../models/Deck.js";
import Hand from "../models/Hand.js";
import Card from "../models/Card.js";

import useStickyState from "../hooks/useStickyState.js";

import RoundSummary from "../components/RoundSummary.js";
import Leaderboard from "../components/Leaderboard.js";
import HelpMenu from "../components/HelpMenu";
import HelpButton from "../components/HelpButton";


const Home = (props) => {

    const {
        currDeck,
        setCurrDeck,
        myHand,
        setMyHand,
        cribIsMine,
        setCribIsMine,
        selectedCards,
        setSelectedCards,
        resetRound
    } = props;

    const [cookies, setCookies] = useCookies(["access_token"]);


    const [showRoundSummary, setShowRoundSummary] = useStickyState(false, "showRoundSummary");
    const [showLeaderboard, setShowLeaderboard] = useStickyState(false, "showLeaderboard");
    const [showHelpMenu, setShowHelpMenu] = useStickyState(false, "showHelpMenu");

    const [displayCards, setDisplayCards] = useStickyState(null, "displayCards");

    const [myCombo, setMyCombo] = useStickyState(null, "myCombo");
    const [bestCombo, setBestCombo] = useStickyState(null, "bestCombo");
    const [worstCombo, setWorstCombo] = useStickyState(null, "worstCombo");

    const experienceRate = 0.001;


    const sortFunction = (a, b) => {
        if (Card.RANKS.indexOf(a.rank) > Card.RANKS.indexOf(b.rank)) {
            return 1;
        } else if (Card.RANKS.indexOf(a.rank) === Card.RANKS.indexOf(b.rank)) {
            if (Card.SUITS.indexOf(a.suit) > Card.SUITS.indexOf(b.suit)) {
                return 1;
            }
        }
        return -1;
    }

    const addSelectedCard = (card) => {
        if (selectedCards.length !== 2) {
            setSelectedCards(prev => [...prev, card]);
        } else {
            setSelectedCards(prev => [prev[1], card]);
        }
    }


    useEffect(() => {
        if (myHand) { setDisplayCards(myHand.cards); }
    }, [myHand])


    return <div id="home" className="page">
        
        <HelpButton 
            target="#help-label"
            showHelpMenu={showHelpMenu}
            setShowHelpMenu={setShowHelpMenu}
        />
        <button id="leaderboard-btn" onClick={() => setShowLeaderboard(prev => !prev)}>
            <img src={leaderboardIcon}/>
        </button>

        <div id="crib-div">
            <h2 className="font-primary"><i>The crib is:</i></h2>
            <h1 id="crib-owner-label" className={`${cribIsMine ? "your-crib" : "their-crib"} font-primary`}>
                {cribIsMine ? "YOURS" : "THEIRS"}
            </h1>
        </div>

        <div>
            <h2 id="select-label" className="font-primary">Select two cards to send to the crib.</h2>
        </div>

        <div className="cards-div large-cards-div secondary primary-border" id="home-cards-div">
            {displayCards && displayCards.map((card, i) => {
                return <div className={`card ${card.isRed ? "red" : "black"} ${selectedCards.filter(val => val.commonName === card.commonName).length > 0 ? "selected" : ""}`} key={i} onClick={() => {
                    if (selectedCards.indexOf(card) === -1) {
                        addSelectedCard(card);
                    }
                }}>
                    <h4 className="font-primary">{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>

        <button id="cards-sort-btn" className="primary font-secondary" onClick={() => {
            setDisplayCards(myHand.sortedCards);
        }}>Sort</button>

        <button id="submit-btn" className="primary font-secondary" onClick={() => {

            let threeCombos = Hand.getThreeCombos(currDeck, myHand, selectedCards, cribIsMine);

            let [myComboVar, bestComboVar, worstComboVar] = threeCombos;

            if (selectedCards.length == 2) {
                setMyCombo(myComboVar);
                setBestCombo(bestComboVar);
                setWorstCombo(worstComboVar);
                setShowRoundSummary(true);
            }
        }}>Submit</button>

        {showRoundSummary && <RoundSummary 
            setShowRoundSummary={setShowRoundSummary}
            deck={currDeck}
            originalHand={myHand}
            displayCards={displayCards}
            myCombo={myCombo}
            bestCombo={bestCombo}
            worstCombo={worstCombo}
            selectedCards={selectedCards}
            cribIsMine={cribIsMine}
            resetRound={resetRound}
            experienceRate={experienceRate}
        />}

        {showLeaderboard && <Leaderboard 
            setShowLeaderboard={setShowLeaderboard}
        />}

        {showHelpMenu && <HelpMenu
            showHelpMenu={showHelpMenu}
            setShowHelpMenu={setShowHelpMenu}
        />}
    </div>
}

export default Home;