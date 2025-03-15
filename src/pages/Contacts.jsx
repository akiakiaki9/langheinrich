import React from 'react'
import { Link } from 'react-router-dom';
import Contacts1 from '../components/contacts/Contacts1';
import Contacts2 from '../components/contacts/Contacts2';
import Footer from '../components/footer/Footer';
import { GoDotFill } from 'react-icons/go';
import Navbar from '../Navbar';

export default function Contacts() {
    return (
        <div>
            <Navbar />
            <div className='pagename'>
                <div className="pagename-blok">
                    <div>
                        <h1>Store</h1>
                    </div>
                    <div>
                        <Link to='/'><p className='pagename-blok__p-1'>Home</p></Link>
                        <GoDotFill className='pagename-icon' />
                        <p className='pagename-blok__p-2'>Store</p>
                    </div>
                </div>
            </div>
            <Contacts1 />
            <Contacts2 />
            <Footer />
        </div>
    )
};