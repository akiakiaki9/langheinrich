import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginComp from './LoginComp'; // Импорт компонента

export default function Navbar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.15) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`navbar1 ${visible ? "visible" : "hidden"}`}>
            <div className="navbar1-blok">
                <Link to='/'>
                    <img src="/images/logo.jpg" alt="Logo" />
                </Link>
                <div className="navbar1-blok__section">
                    <Link to='/store'>Store</Link>
                    <Link to='/contacts'>Contacts</Link>
                    <Link to='/login' className="landing-header__login">Login</Link>
                </div>
            </div>
        </div>
    );
}
