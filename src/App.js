import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from "react-cookie";

import "./styles/App.css";
import "./styles/ThemesModule.css";

import Home from "./pages/Home.js";
import Themes from "./pages/Themes.js";
import Auth from "./pages/Auth.js";

import Navbar from "./components/Navbar.js";

import Deck from "./models/Deck.js";
import Hand from "./models/Hand.js";

import useStickyState from "./hooks/useStickyState.js";
import axios from "axios";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const [theme, setTheme] = useStickyState("default", "theme");

  const [currDeck, setCurrDeck] = useStickyState(null, "currDeck");
  const [myHand, setMyHand] = useStickyState(null, "myHand");
  const [cribIsMine, setCribIsMine] = useStickyState(true, "cribIsMine");

  const [selectedCards, setSelectedCards] = useStickyState([], "selectedCards");

  useEffect(() => {
    // start server
    const bootServer = async () => {
      try {
        let res = await axios.get("https://crib-cards-api.onrender.com/user/");
        if (res.data) {
          console.log("Fetching server....");
        }
      } catch (err) {
        console.log(err);
      }
    }

    bootServer();
  }, [])

  useEffect(() => {
    if (!cookies["access_token"]) {
      setTheme("default");
      localStorage.setItem("userId", "");
    }

    if (JSON.parse(localStorage.getItem("myHand")) === null) {
      resetRound();
    }
  }, [])

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
