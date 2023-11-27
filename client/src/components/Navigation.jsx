import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
            <nav className="fixed w-full bg-[#f0f0f0] shadow px-4 py-2 md:px-8">
                <div className="flex justify-between items-center mx-auto max-w-[1000px]">
                    <div className="text-lg font-bold text-gray-800">Space Blog</div>
                    
                    <div className={`md:flex ${isMobileMenuOpen ? "flex" : "hidden"} flex-col md:flex-row`}>
                        <Link to="/" className="nav-link bg-[#f0f0f0] text-black rounded px-4 py-2 md:mr-4">Home</Link>
                        <Link to="/profile" className="nav-link bg-[#f0f0f0] text-black rounded px-4 py-2 md:mr-4">Profile</Link>
                        <Link to="/login" className="bg-green-500 text-white rounded px-4 py-2">Login</Link>
                    </div>

                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        Menu
                    </button>
                </div>
            </nav>
        </>
    )
}
