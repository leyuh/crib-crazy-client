import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = ({ setTheme }) => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/auth");
        setTheme("default");
    }

    return <div id="navbar" className="primary font-secondary">
        <Link to={"/"} className="nav-btn"> Home </Link>
        {!cookies.access_token ? 
            <Link to={"/auth"} className="nav-btn"> Login </Link>
         : 
            <>
                <Link to={"/themes"} className="nav-btn"> Themes </Link>
                <button onClick={logout} className="nav-btn">Logout</button>
            </>
        }
    </div>
}

export default Navbar;