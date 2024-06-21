import React from 'react'
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer-blok">
                <div className="footer-blok__section-1">
                    <p>Наши социальные сети</p>
                    <div className="footer-blok__section-part">
                        <a href="https://t.me/dev_aki"><FaTelegramPlane className='footer-icon' /></a>
                        <a href="https://twitter.com/aki_developer"><FaXTwitter className='footer-icon' /></a>
                        <a href="https://www.facebook.com/profile.php?id=61558861636723&mibextid=LQQJ4d"><FaFacebookF className='footer-icon' /></a>
                        <a href="https://www.youtube.com/@akigazzz"><IoLogoYoutube className='footer-icon' /></a>
                    </div>
                </div>
                <div className="footer-blok__section-2">
                    <p>© 2024 SYNTAX | Все права защищены</p>
                </div>
            </div>
        </div>
    )
}