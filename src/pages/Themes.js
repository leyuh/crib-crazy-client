import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import "../styles/Themes.css";

import THEMES from "../modules/Themes.js";


const Themes = ({ theme, setTheme }) => {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const [userLvl, setUserLvl] = useState(null);

    const titleCase = (word) => {
        let firstLetter = word.charAt(0).toUpperCase();
        let rest = word.slice(1);
        return firstLetter + rest;
    }

    const fetchUsers = async () => {
        try {
            let response = await axios.get("http://localhost:3001/user/");

            let thisUser = response.data.filter(val => val._id === localStorage.getItem("userId"))[0];
            setUserLvl(thisUser.level);
        } catch (err) {
            console.error(err);
        }
    }

    const setCurrTheme = async (theme) => {
        try {
            let response = await axios.put("http://localhost:3001/user/set-curr-theme", {
                _id: localStorage.getItem("userId"),
                theme
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
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
                            setCurrTheme(val);
                        }}>
                            <h1 className="font-secondary">{titleCase(val)}</h1>
                        </li>
                    } else {
                        return <li key={i} className="theme-li locked">
                            <h1>Unlocks at lvl {THEMES[val]}</h1>
                        </li>
                    }

                })}
            </ul>
        </div>
    </div>
}

export default Themes;