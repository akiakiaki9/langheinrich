import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoAnalyticsOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

export default function Menu() {

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const navRef = useRef(null);
  const location = useLocation()
  const [activePage, setActivePage] = useState(location.pathname)
  const { t } = useTranslation()

  useEffect(() => {
    setActivePage(location.pathname)
  }, [location]);

  const toggleNav = () => setIsOpen(!isOpen);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
    if (window.innerWidth >= 700) {
      setIsOpen(true); // Навбар виден на больших экранах
    } else {
      setIsOpen(false); // Навбар скрыт на маленьких экранах
    }
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target) && !event.target.classList.contains('burger')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleResize(); // Устанавливаем начальное состояние при загрузке компонента
  }, []);

  return (
    <div ref={navRef}>
      {isMobile && (
        <div className="burger" onClick={toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <Link><h3 className='menu-brand'>SYNTAX</h3></Link>
        <ul className="menu-links">
          <li>
            <Link to='/' style={{ color: activePage === '/' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-1')}</Link>
          </li>
          <li>
            <Link to='/services' style={{ color: activePage === '/services' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-2')}</Link>
          </li>
          <li>
            <Link to='/about-us' style={{ color: activePage === '/about-us' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-3')}</Link>
          </li>
          <li>
            <Link to='/contacts' style={{ color: activePage === '/contacts' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-4')}</Link>
          </li>
        </ul>
        <br />
        <hr style={{ width: '200px' }} />
        <ul className='menu-links'>
          <li>
            <Link to='/valute' style={{ color: activePage === '/valute' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-5')}</Link>
          </li>
          <li>
            <Link to='/cryptovalute' style={{ color: activePage === '/cryptovalute' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-6')}</Link>
          </li>
          <li>
            <Link to='/weather' style={{ color: activePage === '/weather' ? "var(--orange-color-hover)" : "#fff" }}>{t('menu-7')}</Link>
          </li>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <IoAnalyticsOutline className='menu-icon' />
      </div>
    </div >
  );
};