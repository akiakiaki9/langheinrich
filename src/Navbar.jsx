import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import Cookies from "js-cookie";

export default function Navbar() {
    const location = useLocation();
    const activePage = location.pathname;
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isMobile = window.innerWidth <= 768;

    const navRef = useRef(null);

    useEffect(() => {
        setIsAuthenticated(!!Cookies.get("access"));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (menu) => {
        setDropdownOpen((prev) => (prev === menu ? null : menu));
    };

    return (
        <nav className={`navbar ${visible ? "visible" : "hidden"}`} ref={navRef}>
            <div className="navbar-blok">
                <div className="navbar-blok__section-1">
                    <Link to="/home">
                        <img src="/images/logo.jpg" alt="Logo" />
                    </Link>
                    <div className="navbar-blok__section-1__line"></div>
                    <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
                    </button>
                    <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
                        {[
                            { name: "news", label: "News", links: ["/news", "/faires"] },
                            { name: "company", label: "Company", links: ["/history", "/team", "/future", "/quality"] },
                            { name: "products", label: "Products", links: ["/tabellinen", "/bedlinen", "/towels"] },
                            { name: "customers", label: "Customers", links: ["/laundries", "/hotels", "/airliner", "/cruiseliner", "/railway"] },
                            { name: "services", label: "Services", links: ["/customer-hotline", "/after-sale-service"] },
                            { name: "sustainability", label: "Sustainability", links: ["/certifications", "/future-plans", "/csr"] },
                        ].map(({ name, label, links }) => (
                            <div
                                key={name}
                                className="dropdown"
                                onMouseEnter={() => !isMobile && setDropdownOpen(name)}
                                onMouseLeave={() => !isMobile && setTimeout(() => setDropdownOpen(null), 200)}
                                onClick={() => isMobile && toggleDropdown(name)}
                            >
                                <span style={{ color: activePage.includes(name) ? "var(--orange-color)" : "" }}>{label}</span>
                                <ul className={`dropdown-menu ${dropdownOpen === name ? "show" : ""}`}>
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                to={link}
                                                style={{ color: activePage === link ? "var(--orange-color)" : "" }}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {link.split("/")[1].charAt(0).toUpperCase() + link.split("/")[1].slice(1)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <Link
                            className="navbar-menu__a"
                            to={isAuthenticated ? "/profile" : "/login"}
                            onClick={() => setMenuOpen(false)}
                        >
                            {isAuthenticated ? "Profile" : "Login"}
                        </Link>
                    </div>
                </div>
                <div className="navbar-blok__section-2">
                    <FiPhoneCall className="navbar-blok__section__icon" />
                    <div>
                        <p>Call Us Now!</p>
                        <a href="tel:+18-2222-3555">+18 - 2222 - 3555</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};