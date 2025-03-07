import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAME } from '../../utils/name'
import { PiShoppingCartBold } from "react-icons/pi";
import { FaHistory } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import Chat from './Chat';

export default function NavbarComp() {

    const location = useLocation();
    const [activePage, setAcitvePage] = useState(location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        setAcitvePage(location.pathname)
    }, [location]);

    const handleLogOut = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        navigate('/');
    };

    return (
        <div className='navbar'>
            <div className="navbar-blok">
                <div className="navbar-blok__section">
                    <Link to='/'><img src="/images/logo.jpg" alt={`${NAME} Logo`} /></Link>
                </div>
                <div className="navbar-blok__section">
                    <div className="navbar-blok__section__container">
                        <div onClick={handleLogOut}><IoExitOutline className='navbar-blok__section__container__icon__exit' /></div>
                    </div>
                    <div className="navbar-blok__section__container">
                        <Chat />
                    </div>
                    <div className="navbar-blok__section__container">
                        <Link to='/store/cart' className='navbar-blok__section__container__part' style={{ backgroundColor: activePage === '/store/cart' ? 'var(--main-color)' : '' }}>
                            <p style={{ color: activePage === '/store/cart' ? '#fff' : '' }}>Cart</p>
                            <PiShoppingCartBold
                                className='navbar-blok__section__container__icon'
                                style={{ color: activePage === '/store/cart' ? '#fff' : '' }}
                            />
                        </Link>
                    </div>
                    <div className="navbar-blok__section__container">
                        <Link to='/store/orders' className='navbar-blok__section__container__part' style={{ backgroundColor: activePage === '/store/orders' ? 'var(--main-color)' : '' }}>
                            <p style={{ color: activePage === '/store/orders' ? '#fff' : '' }}>Orders</p>
                            <FaHistory
                                className='navbar-blok__section__container__icon'
                                style={{ color: activePage === '/store/orders' ? '#fff' : '' }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};