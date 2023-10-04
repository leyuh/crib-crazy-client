import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { HashRouter as Router, } from 'react-router-dom';

import "./styles/App.css";
import "./styles/ThemesModule.css";

import Home from "./pages/Home.js";
import Themes from "./pages/Themes.js";
import Auth from "./pages/Auth.js";

import Navbar from "./components/Navbar.js";

import Deck from "./models/Deck.js";
import Hand from "./models/Hand.js";

import useStickyState from "./hooks/useStickyState.js";

function App() {
  const [theme, setTheme] = useStickyState("default", "theme");

  const [currDeck, setCurrDeck] = useStickyState(null, "currDeck");
  const [myHand, setMyHand] = useStickyState(null, "myHand");
  const [cribIsMine, setCribIsMine] = useStickyState(true, "cribIsMine");

  const [selectedCards, setSelectedCards] = useStickyState([], "selectedCards");

  const resetRound = () => {
    setSelectedCards([]);
    
    let newDeck = new Deck();
    setCurrDeck(newDeck);
    let hand = new Hand(newDeck.dealCards(6))
    setMyHand(hand);

    let cribIsMine = Math.random() >= 0.5;
    setCribIsMine(cribIsMine);
}


  return <div id="app" className={`background ${theme}`}>
    <Router>
      <Navbar
        setTheme={setTheme}
        resetRound={resetRound}
      />
      <Routes>
        <Route path="/" element={<Home 
          currDeck={currDeck}
          setCurrDeck={setCurrDeck}
          myHand={myHand}
          setMyHand={setMyHand}
          cribIsMine={cribIsMine}
          setCribIsMine={setCribIsMine}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          resetRound={resetRound}
        />} />
        <Route path="/themes" element={<Themes 
          theme={theme}
          setTheme={setTheme}
        />} />
        <Route path="/auth" element={<Auth
          resetRound={resetRound}
          setTheme={setTheme}
        />} />
      </Routes>
    </Router>
  </div>
}

export default App;
