import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/Leaderboard.css";

import friendIcon from "../images/leaderboard-icon.png";

const Leaderboard = (props) => {
    const {
        setShowLeaderboard
    } = props;

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const getAverageScore = (scores) => {
        if (scores.length === 0 ) return 100;
        let total = 0;
        scores.map(score => total += score);
        total = Math.floor(total / scores.length * 10) / 10;
        return total;
    }
    
    const getAge = (oldDate, now) => {
        return Math.ceil((now - oldDate) / 8.64e7);
    }

    useEffect(() => {
        // fetch users
        const fetchUsers = async () => {
            try {
                let response = await axios.get("https://crib-cards-api.onrender.com/user/");
                setUsers(response.data.sort((a, b) => {
                    if (a.level > b.level) return -1;
                    if (a.level < b.level) return 1;
                    return 0;
                }));
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [])

    return <div id="leaderboard" className="secondary primary-border">
        <h1 className="font-secondary">Leaderboard</h1>
        <ul id="leaderboard-list">
            {users.map((user, i) => {
                let isFriend = false;
                return <li key={i} className={`font-primary leaderboard-item ${selectedUser === user ? "selected-l-item" : ""} ${isFriend && "friend"} primary`} onClick={() => {
                    if (selectedUser === user) {
                        setSelectedUser(null);
                    } else {
                        setSelectedUser(user);
                    }
                }}>
                    {isFriend && <img className="friend-icon" src={friendIcon}/>}
                    <h3 className={`${i === 0 ? "first" : i === 1 ? "second" : i === 2 ? "third" : user._id === "650674806499f64540188fe9" ? "pink" : "font-secondary"}`}>
                        {user.username}
                    </h3>
                    <h5>lvl {Math.floor(user.level)}</h5>

                    {(selectedUser === user) && <div id="user-stats">
                        <h3 className="font-primary">Unnecessary User Stats</h3>
                        <ul>
                            <li>
                                <h6 className="us-li-label font-primary">Rank:</h6>
                                <h6 className="us-li-amount font-secondary">{i+1}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Level:</h6>
                                <h6 className="us-li-amount font-secondary">{user.level}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Avg Accuracy Rating:</h6>
                                <h6 className="us-li-amount font-secondary">{getAverageScore(user.mostRecentRatings)}%</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Hit/Miss Ratio:</h6>
                                <h6 className="us-li-amount font-secondary">{user.hitCount}/{user.missCount}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Longest Hit Streak:</h6>
                                <h6 className="us-li-amount font-secondary">{user.longestHitStreak}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Highest Throw Score:</h6>
                                <h6 className="us-li-amount font-secondary">{user.highestThrowScore}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Account Creation Date:</h6>
                                <h6 className="us-li-amount font-secondary">{new Date(user.accountCreationDate).toJSON().slice(2, 10)}</h6>
                            </li>
                            <li>
                                <h6 className="us-li-label font-primary">Account Age:</h6>
                                <h6 className="us-li-amount font-secondary">{getAge(new Date(user.accountCreationDate), new Date())}</h6>
                            </li>
                        </ul>

                        <div id="hit-miss-info">
                            <h5 className="font-primary">Hit = 100% Accuracy</h5>
                            <h5 className="font-primary">Miss = &lt;100% Accuracy</h5>
                        </div>
                    </div>}
                </li>
            })}
        </ul>
        <button id="leaderboard-close-btn" className="font-secondary primary" onClick={() => setShowLeaderboard(false)}>Close</button>
    </div>
}

export default Leaderboard;