import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../styles/RoundSummary.css";

import axios from "axios";

const RoundSummary = (props) => {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const {
        setShowRoundSummary,
        originalHand,
        displayCards,
        bestCombo,
        worstCombo,
        myCombo,
        cribIsMine,
        resetRound
    } = props;

    const updateUserMostRecentRatings = async (newRating, userId) => {
        try {
            let response = await axios.put("http://localhost:3001/user/new-rating", {
                _id: userId,
                newRating
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const getAccuracyRating = (plrScore, bestPosScore, worstPosScore) => {
        let range = bestPosScore - worstPosScore;
        return Math.floor(((plrScore - worstPosScore) / range) * 100);
    }

    let accuracyRating = getAccuracyRating(myCombo["overall score"], bestCombo["overall score"], worstCombo["overall score"]);

    useEffect(() => {
        if (cookies.access_token) {
            updateUserMostRecentRatings(accuracyRating, localStorage.getItem("userId"));
        }
    }, [])


    return <div id="round-summary">
        <h1>ROUND SUMMARY</h1>
        <h2>{cribIsMine ? "YOUR" : "THEIR"} CRIB</h2>

        <div className="cards-div med-cards-div" id="rs-initial-hand-div">
            {displayCards.map((card, i) => {
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

        <h1 id="accuracy-percentage-label">
            {accuracyRating}%
        </h1>
        
        <h3 id="accuracy-rating-label">ACCURACY RATING</h3>

        <button id="round-sum-continue-btn" onClick={() => {
            setShowRoundSummary(false);
            resetRound();
        }}>CONTINUE</button>


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
            points={combo["hand points"]}
            pointsTotal={combo["hand points total"]}
            potPoints={combo["potential hand points"]}
        />
        <SummaryEvaluationDiv 
            isHand={false}
            cards={combo["crib cards"]}
            points={combo["crib points"]}
            pointsTotal={combo["crib points total"]}
            potPoints={combo["potential crib points"]}
        />

        <h2 className="score-label">Throw Score: {combo["overall score"]}</h2>

    </div>
}

const SummaryEvaluationDiv = (props) => {
    const {
        isHand,
        cards,
        points,
        pointsTotal,
        potPoints
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

        <h2>{isHand ? "HAND" : "CRIB"} POINTS:</h2>
        <ul className="points-list">
            {points.map((point, i) => {
                let typeOfPoint = point[0];
                let cards = point[1];
                let pointCount = point[2];

                return <li key={i}>
                    <hr/>
                    <div className="cards-div small-cards-div point-combo-div">
                        {cards.map((card, i) => {
                            return <div className={` card ${card.isRed ? "red" : "black"}`} key={i}>
                                <h4>{card.rank}</h4>
                                <h4>{card.suitImg}</h4>
                            </div>
                        })}
                    </div>
                    <h4 className="type-of-point-label">{typeOfPoint}</h4>

                    <h2 className="point-count-label">{pointCount}</h2>

                    <hr/>
                </li>
            })}

            <li className="total-li">
                <h4 className="type-of-point-label">Total:</h4>
                <h2 className="point-count-label">{pointsTotal}</h2>
            </li>

            <li className="total-li">
                <h4 className="type-of-point-label">Potential:</h4>
                <h2 className="point-count-label">{potPoints}</h2>
            </li>
        </ul>

    </div>
}

export default RoundSummary;