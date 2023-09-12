import axios from "axios";
import { useState } from "react";
import { useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

import "../styles/Auth.css";


const Auth = () => {
    const [currAuthDiv, setCurrAuthDiv] = useState("register");

    return <div id="auth" className="page">
        {currAuthDiv === "register" ? <Register 
            currAuthDiv={currAuthDiv}
            setCurrAuthDiv={setCurrAuthDiv}
        /> : <Login
            currAuthDiv={currAuthDiv}
            setCurrAuthDiv={setCurrAuthDiv} 
        />}
    </div>
}

const Login = (props) => {
    const {
        currAuthDiv,
        setCurrAuthDiv
    } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            });

            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userId", res.data.userId);
            navigate("/");

        } catch (err) {
            console.error(err);
        }
    }

    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Login"}
        onSubmit={onSubmit}
        currAuthDiv={currAuthDiv}
        setCurrAuthDiv={setCurrAuthDiv}
    />
}

const Register = (props) => {
    const {
        currAuthDiv,
        setCurrAuthDiv
    } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            })
        } catch (err) {
            console.error(err);
        }
    }

    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        currAuthDiv={currAuthDiv}
        setCurrAuthDiv={setCurrAuthDiv}
    />
}

const Form = ({
    username,
    setUsername,
    password,
    setPassword,
    label,
    onSubmit,
    currAuthDiv,
    setCurrAuthDiv
}) => {
    return <div className="auth-container secondary primary-border">
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>

            <div className="form-group">
                <label htmlFor={`${label}-username`}> Username: </label>
                <input type="text" id={`${label}-username`} className="username form-input" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            </div>

            <div className="form-group">
                <label htmlFor={`${label}-password`}> Password: </label>
                <input type="password" id={`${label}-password`} className="password form-input" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>

            <button type="submit" className="form-submit-btn">{label}</button>

        </form>
        
        <h3>{label === "Register" ? "Already have an account?" : "Don't have an account?"}</h3>
        <button onClick={() => {
            if (currAuthDiv === "register") {
                setCurrAuthDiv("login");
            } else {
                setCurrAuthDiv("register");
            }
        }}>{label === "Register" ? "Sign in" : "Register"}</button>
    </div>
}

export default Auth;