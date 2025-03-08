import React from 'react'
import LayoutMain from './layout/layoutmain'
import Footer from '../components/footer/Footer'
import Navbar from '../Navbar'

export default function OnlineShop() {

    return (
        <div>
            <div className='layout'>
                <Navbar />
                <LayoutMain />
            </div>
            <Footer />
        </div>
    )
};