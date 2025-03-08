import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPhoneCall, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);    

    return (
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <div className="navbar-blok">
                <div className="navbar-blok__section-1">
                    <Link to='/'>
                        <img src="/images/logo.jpg" alt="Logo" />
                    </Link>
                    <div className='navbar-blok__section-1__line'></div>
                    <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
                    </button>
                    <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                        <Link className='navbar-menu__a' to='/store' onClick={() => setMenuOpen(false)}>Store</Link>
                        <Link className='navbar-menu__a' to='/contacts' onClick={() => setMenuOpen(false)}>Contacts</Link>
                        <Link className='navbar-menu__a' to='/login' onClick={() => setMenuOpen(false)}>Login</Link>
                        <div 
                            className="dropdown"
                            onMouseEnter={() => !isMobile && setDropdownOpen(true)}
                            onMouseLeave={() => !isMobile && setDropdownOpen(false)}
                            onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
                        >
                            <span>Partners</span>
                            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                <li><a href="https://akbarsoft.uz">Zarhal</a></li>
                                <li><a href="https://akbarsoft.uz">Curt Bauer</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-blok__section-2">
                    <FiPhoneCall className='navbar-blok__section__icon' />
                    <div>
                        <p>Call Us Now!</p>
                        <a href="tel:+18-2222-3555">+18 - 2222 - 3555</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};