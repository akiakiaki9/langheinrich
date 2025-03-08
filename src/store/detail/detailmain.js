import React from 'react'
import Navbar from '../../Navbar'
import DetailComp from './DetailComp'
import Footer from '../../components/footer/Footer'

export default function DetailMain() {
    return (
        <div>
            <div className='layout'>
                <Navbar />
                <DetailComp />
            </div>
            <Footer />
        </div>
    )
}