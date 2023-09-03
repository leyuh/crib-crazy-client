import { useEffect, useState } from "react";
import "../styles/RoundSummary.css";

const RoundSummary = (props) => {
    const {
        setShowRoundSummary,
        originalHand,
        bestCombo,
        myCombo,
        cribIsMine
    } = props;


    return <div id="round-summary">
        <h1>ROUND SUMMARY</h1>
        <h2>{cribIsMine ? "YOUR" : "THEIR"} CRIB</h2>

        <div className="cards-div med-cards-div" id="rs-initial-hand-div">
            {originalHand.cards.map((card, i) => {
                return <div className={`rs-initial-hand-card card ${card.isRed ? "red" : "black"}`} key={i}>
                    <h4>{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>

        <div id="rs-plr-summaries-div">

            <SummaryDiv 
                isPlr={true}
                combo={myCombo}
            />

            <SummaryDiv
                isPlr={false}
                combo={bestCombo}
            />

        </div>

        <button onClick={() => setShowRoundSummary(false)}>CONTINUE</button>


    </div>
}


const SummaryDiv = (props) => {
    const {
        isPlr,
        combo
    } = props;

    return <div id={isPlr ? "rs-plr-summary-div" : "rs-bot-summary-div"} className="rs-summary-div">
        <h1 className="rs-plr-label">{isPlr ? "YOU" : "BOT"}</h1>

        <div className="cards-div small-cards-div rs-crib-div">
            {combo["crib cards"].map((card, i) => {
                return <div className={` card ${card.isRed ? "red" : "black"}`} key={i}>
                    <h4>{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>
        <h2 className="rs-threw-label">{isPlr ? "YOU THREW" : "BEST THROW"}</h2>

        <SummaryEvaluationDiv 
            isHand={true}
            cards={combo["hand cards"]}
        />
        <SummaryEvaluationDiv 
            isHand={false}
            cards={combo["crib cards"]}
        />

        <h2>Score: {combo["overall score"]}</h2>

    </div>
}

const SummaryEvaluationDiv = (props) => {
    const {
        isHand,
        cards
    } = props;

    return <div className={`rs-summary-${isHand ? "hand" : "crib"}-evaluation-div rs-summary-evaluation-div`}>
        <div className="cards-div small-cards-div">
            {cards.map((card, i) => {
                return <div className={` card ${card.isRed ? "red" : "black"}`} key={i}>
                    <h4>{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>
    </div>
}

export default RoundSummary;