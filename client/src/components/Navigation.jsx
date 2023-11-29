import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Auth from '../utils/auth';


export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    

    const getNavLinkClass = (path) => {
        return location.pathname === path ? 'nav-link-active bg-gray-400' : 'nav-link bg-[#f0f0f0]';
    }

    return (
        <>
            <nav className="fixed w-full bg-[#f0f0f0] shadow px-4 py-2 md:px-8">
                <div className="flex justify-between items-center mx-auto max-w-[1000px]">
                    <div className="text-lg font-bold text-gray-800">Space Blog</div>
                    
                    <div className={`md:flex ${isMobileMenuOpen ? "flex" : "hidden"} flex-col md:flex-row`}>
                        <Link to="/" className={`${getNavLinkClass('/')} text-black rounded px-4 py-2 md:mr-4`}>Home</Link>
                        {/* <Link to={`/profile/${Auth.getProfile().data._id}`} className={`${getNavLinkClass(`/profile/${Auth.getProfile().data._id}`)} text-black rounded px-4 py-2 md:mr-4`}>Profile</Link> */}
                        {Auth.loggedIn() ? (
                            <>
                            <Link className = 'bg-green-500 text-white rounded px-4 py-2' onClick={Auth.logout}>Logout</Link>
                            </>
                        ) : (
                            <Link to="/login" className="bg-green-500 text-white rounded px-4 py-2">Login</Link>
                        )}
                    </div>

                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        Menu
                    </button>
                </div>
            </nav>
        </>
    )
}
