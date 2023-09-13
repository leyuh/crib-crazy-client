import { useEffect, useState } from "react";
import THEMES from "../modules/Themes.js";
import "../styles/Themes.css";
import axios from "axios";

const Themes = ({ theme, setTheme }) => {

    const [userLvl, setUserLvl] = useState(null);

    const titleCase = (word) => {
        let firstLetter = word.charAt(0).toUpperCase();
        let rest = word.slice(1);
        return firstLetter + rest;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await axios.get("http://localhost:3001/user/");

                let thisUser = response.data.filter(val => val._id === localStorage.getItem("userId"))[0];
                setUserLvl(thisUser.level);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [])

    return <div id="themes" className="page">
        <div className="secondary primary-border">

            <h1 className="font-secondary">Themes</h1>

            <ul id="theme-list">
                {Object.keys(THEMES).map((val, i) => {
                    if (userLvl >= THEMES[val]) {
                        return <li key={i} className="theme-li primary unlocked" onClick={() => {
                            setTheme(val);
                        }}>
                            <h1 className="font-secondary">{titleCase(val)}</h1>
                        </li>
                    } else {
                        return <li key={i} className="theme-li locked">
                            <h1>Unlock at lvl {THEMES[val]}</h1>
                        </li>
                    }

                })}
            </ul>
        </div>
    </div>
}

export default Themes;