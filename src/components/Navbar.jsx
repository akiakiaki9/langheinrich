import React from 'react'
import Translate from './Translate'
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar-blok">
            <div className="navbar-blok__section">
                <Translate />
                <a href='https://t.me/aki_developer'><b>author link <FaTelegramPlane className='navbar-icon' /></b></a>
                <Link to='/'><b className='navbar-brand'>SYNTAX</b></Link>
            </div>
        </div>
    </div>
  )
}