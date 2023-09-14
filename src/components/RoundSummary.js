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
        resetRound,
        experienceRate
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

    const updateUserLevel = async (userId, amount) => {
        try {
            let response = await axios.put("http://localhost:3001/user/update-lvl", {
                _id: userId,
                amount
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const updateHitMissCount = async (_id, isHit) => {
        try {
            let response = await axios.put("http://localhost:3001/user/update-hit-miss-count", {
                _id,
                isHit
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const updateHitStreak = async (_id, isHit) => {
        try {
            let response = await axios.put("http://localhost:3001/user/update-hit-streak", {
                _id,
                isHit
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const updateHighestThrowScore = async (_id, throwScore) => {
        try {
            let response = await axios.put("http://localhost:3001/user/update-highest-throw-score", {
                _id,
                throwScore
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
            updateUserLevel(localStorage.getItem("userId"), (experienceRate * (accuracyRating)));

            let isHit = accuracyRating === 100;
            updateHitMissCount(localStorage.getItem("userId"), isHit);
            updateHitStreak(localStorage.getItem("userId"), isHit);
            updateHighestThrowScore(localStorage.getItem("userId"), myCombo["overall score"]);

        }
    }, [])


    return <div id="round-summary" className="secondary primary-border">
        <h1 className="font-secondary">ROUND SUMMARY</h1>
        <h2 className="font-primary">{cribIsMine ? "YOUR" : "THEIR"} CRIB</h2>

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

        <h1 id="accuracy-percentage-label" className="font-secondary">
            {accuracyRating}%
        </h1>
        
        <h3 id="accuracy-rating-label" className="font-primary">ACCURACY RATING</h3>

        <button id="round-sum-continue-btn" className="font-primary" onClick={() => {
            setShowRoundSummary(false);
            resetRound();
        }}>Continue</button>


    </div>
}


const SummaryDiv = (props) => {
    const {
        isPlr,
        combo
    } = props;

    return <div id={isPlr ? "rs-plr-summary-div" : "rs-bot-summary-div"} className="rs-summary-div primary">
        <h1 className="rs-plr-label font-secondary">{isPlr ? "YOU" : "BOT"}</h1>

        <div className="cards-div small-cards-div rs-crib-div">
            {combo["crib cards"].map((card, i) => {
                return <div className={` card ${card.isRed ? "red" : "black"}`} key={i}>
                    <h4 className="font-primary">{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>
        <h2 className="rs-threw-label font-primary">{isPlr ? "YOU THREW" : "BEST THROW"}</h2>

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

        <h2 className="score-label font-secondary">Throw Score: {combo["overall score"]}</h2>

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
                    <h4 className="font-primary">{card.rank}</h4>
                    <h4>{card.suitImg}</h4>
                </div>
            })}
        </div>

        <h2 className="font-secondary">{isHand ? "HAND" : "CRIB"} POINTS:</h2>
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
                                <h4 className="font-primary">{card.rank}</h4>
                                <h4>{card.suitImg}</h4>
                            </div>
                        })}
                    </div>
                    <h4 className="type-of-point-label font-primary">{typeOfPoint}</h4>

                    <h2 className="point-count-label font-primary">{pointCount}</h2>

                    <hr/>
                </li>
            })}

            <li className="total-li font-secondary">
                <h4 className="type-of-point-label">Total:</h4>
                <h2 className="point-count-label">{pointsTotal}</h2>
            </li>

            <li className="total-li font-secondary">
                <h4 className="type-of-point-label">Potential:</h4>
                <h2 className="point-count-label">{potPoints}</h2>
            </li>
        </ul>

    </div>
}

export default RoundSummary;