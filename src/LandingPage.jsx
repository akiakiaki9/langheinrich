import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function LandingPage() {
    return (
        <div className='landing'>
            <Navbar />
            <div className="landing-blok">
                <h1>Langheinrich In Uzbekistan</h1>
                <p>Langheinrich – is an experienced manufacturer and supplier of table linen from Germany.</p>
                <div className="landing-blok__container">
                    <Link to='/store'><button className='landing-blok__container-button-1'>Store</button></Link>
                </div>
            </div>
            <div className="landing-footer">
                <div className="landing-footer__container">
                    <p className='landing-footer__p1'>Langheinrich Vertriebs GmbH</p>
                    <div className="landing-footer__container__container">
                        <p><a href="tel:+496642870">Tel: +49 6642 / 87-0</a></p>
                        <p><a href="tel:4966428763">Fax: +49 6642 / 87-63</a></p>
                    </div>
                    <p className='landing-footer__p2'><a href="mailto:service@langheinrich.de">service@langheinrich.de</a></p>
                </div>
            </div>
        </div>
    );
};