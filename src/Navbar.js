import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => {

    }

    return <div id="navbar">
        <Link to={"/"}> Crib Crazy </Link>
        {!cookies.access_token ? 
            <Link to={"/auth"}> Login </Link>
         : 
            <button onClick={logout}>Logout</button>
        }
    </div>
}

export default Navbar;