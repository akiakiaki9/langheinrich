import React from 'react'
import OrdersComp from './OrdersComp'
import Footer from '../../components/footer/Footer'
import Navbar from '../../Navbar'

export default function Orders() {
    return (
        <div>
            <div className='layout'>
                <Navbar />
                <OrdersComp />
            </div>
            <Footer />
        </div>
    )
};