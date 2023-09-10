import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/Leaderboard.css";

const Leaderboard = (props) => {
    const {
        setShowLeaderboard
    } = props;

    const [users, setUsers] = useState([]);

    const getAverageScore = (scores) => {
        if (scores.length === 0 ) return 100;
        let total = 0;
        scores.map(score => total += score);
        total = Math.floor(total / scores.length);
        return total;
    }

    useEffect(() => {
        // fetch users
        const fetchUsers = async () => {
            try {
                let response = await axios.get("http://localhost:3001/user/");
                setUsers(response.data.sort((a, b) => {
                    if (Math.floor(a.level) > Math.floor(b.level)) return -1;
                    if (Math.floor(a.level) < Math.floor(b.level)) return 1;
                    if (getAverageScore(a.mostRecentRatings) > getAverageScore(b.mostRecentRatings)) return -1;
                    if (getAverageScore(a.mostRecentRatings) < getAverageScore(b.mostRecentRatings)) return 1;
                    return 0;
                }));
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [])

    return <div id="leaderboard">
        <h1>Leaderboard</h1>
        <ul id="leaderboard-list">
            {users.map((user, i) => {
                return <li key={i} className={`leaderboard-item ${i === 0 ? "first" : i === 1 ? "second" : i === 2 ? "third" : ""}`}>
                    <h3>{user.username}</h3>
                    <h5>{getAverageScore(user.mostRecentRatings)}%</h5>
                    <h5>lvl {Math.floor(user.level)}</h5>
                </li>
            })}
        </ul>
        <button id="leaderboard-close-btn" onClick={() => setShowLeaderboard(false)}>Close</button>
    </div>
}

export default Leaderboard;