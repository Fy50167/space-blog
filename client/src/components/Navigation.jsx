import { Link } from "react-router-dom";
import Auth from "../utils/auth"


export default function Navigation() {
    return(
        <>
            <nav className="navbar">
                <div className="nav-content">
                <div className="nav-logo">Space Blog</div>
                
                {/* Put the links here; one that says home and one that says profile. Profile route is / and nav route is /profile */}
                <Link to="/" className="nav-link"> Home </Link>
                <Link to="profile" className="nav-link">Profile</Link>
                <Link to="/login" className="login-btn">
                    Login
                </Link>
            
                </div>
            </nav>
        </>
    )
}