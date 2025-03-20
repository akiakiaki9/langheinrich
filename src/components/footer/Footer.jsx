import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer-blok">
                <div className="footer-blok__section-1">
                    <Link to='/'><img src="/images/logo.jpg" alt="Langheinrich Logo" /></Link>
                    <p>Langheinrich – is an experienced manufacturer and supplier of from Germany.</p>
                </div>
                <div className="footer-blok__section-2">
                    <div className="footer-blok__section-2-part">
                        <p className='footer-blok__section-2-part__p-1'>Links</p>
                        <Link to='/store'><p className='footer-blok__section-2-part__p-2'>Store</p></Link>
                        <Link to='/contacts'><p className='footer-blok__section-2-part__p-2'>Contacts</p></Link>
                        <Link to='/login'><p className='footer-blok__section-2-part__p-2'>Login</p></Link>
                    </div>
                    <div className="footer-blok__section-2-part">
                        <p className='footer-blok__section-2-part__p-1'>News</p>
                        <Link to='/news'><p className='footer-blok__section-2-part__p-2'>News</p></Link>
                        <Link to='/faires'><p className='footer-blok__section-2-part__p-2'>Faires</p></Link>
                    </div>
                    <div className="footer-blok__section-2-part">
                        <div className="footer-blok__section-2-part__p-1">Partners</div>
                        <a href="https://akbarsoft.uz"><p className='footer-blok__section-2-part__p-2'>Zarhan</p></a>
                        <a href="https://akbarsoft.uz"><p className='footer-blok__section-2-part__p-2'>Curt Bauer</p></a>
                    </div>
                </div>
                <div className="footer-blok__section-3">
                    <div className="footer-blok__section-3-part">
                        <div className="footer-blok__section-3-part__header">
                            <div className="footer-blok__section-3-part__header-part">
                                <BsFillTelephoneFill className='footer-blok__section-3-part__header-part__icon' />
                            </div>
                            <p>CONTACT US</p>
                        </div>
                        <a href='mailto:service@langheinrich.de' className='footer-blok__section-3-part__a-1'>service@langheinrich.de</a>
                        <a href="tel:+49 6642 / 87-0" className='footer-blok__section-3-part__a-2'>+49 6642 / 87-0</a>
                    </div>
                    <div className="footer-blok__section-3-part">
                        <div className="footer-blok__section-3-part__header">
                            <div className="footer-blok__section-3-part__header-part">
                                <FaLocationDot className='footer-blok__section-3-part__header-part__icon' />
                            </div>
                            <p>ADDRESS</p>
                        </div>
                        <p href='mailto:service@langheinrich.de'
                            className='footer-blok__section-3-part__a-1'
                        >
                            4789 Melmorn Street,Zakila Ton Mashintron Town
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-footer">
                <p>Copyright © 2022 <span>Langheinrich</span> Designed and Developed by <a href="https://akbarsoft.uz">Akbar Soft</a>.</p>
            </div>
        </div>
    )
};