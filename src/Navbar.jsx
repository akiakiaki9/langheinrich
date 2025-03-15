import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPhoneCall, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const location = useLocation();
    const activePage = location.pathname;
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
    const [partnersDropdownOpen, setPartnersDropdownOpen] = useState(false);
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
                        <Link
                            style={{ color: activePage === "/store" ? "var(--orange-color)" : "" }}
                            className='navbar-menu__a'
                            to='/store'
                            onClick={() => setMenuOpen(false)}>
                            Store
                        </Link>
                        <Link
                            style={{ color: activePage === "/contacts" ? "var(--orange-color)" : "" }}
                            className='navbar-menu__a'
                            to='/contacts'
                            onClick={() => setMenuOpen(false)}>
                            Contacts
                        </Link>
                        <Link className='navbar-menu__a' to='/login' onClick={() => setMenuOpen(false)}>Login</Link>

                        {/* Выпадающее меню News */}
                        <div
                            className="dropdown"
                            onMouseEnter={() => !isMobile && setNewsDropdownOpen(true)}
                            onMouseLeave={() => !isMobile && setNewsDropdownOpen(false)}
                            onClick={() => isMobile && setNewsDropdownOpen(!newsDropdownOpen)}
                        >
                            <span style={{ color: activePage === "/news" ? "var(--orange-color)" : ""}}>News</span>
                            <ul className={`dropdown-menu ${newsDropdownOpen ? 'show' : ''}`}>
                                <li><Link to='/news' style={{ color: activePage === "/news" ? "var(--orange-color)" : ""}}>News</Link></li>
                                <li><Link to='/faires' style={{ color: activePage === "/faires" ? "var(--orange-color)" : ""}}>Faires</Link></li>
                            </ul>
                        </div>

                        {/* Выпадающее меню Partners */}
                        <div
                            className="dropdown"
                            onMouseEnter={() => !isMobile && setPartnersDropdownOpen(true)}
                            onMouseLeave={() => !isMobile && setPartnersDropdownOpen(false)}
                            onClick={() => isMobile && setPartnersDropdownOpen(!partnersDropdownOpen)}
                        >
                            <span>Partners</span>
                            <ul className={`dropdown-menu ${partnersDropdownOpen ? 'show' : ''}`}>
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