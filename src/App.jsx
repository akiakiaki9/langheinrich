import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Valute from './pages/Valute'
import Weather from './pages/Weather'
import CryptoList from './pages/Crypto'
import AboutUs from './pages/AboutUs'
import Contacts from './pages/Contacts'
import Services from './pages/Services'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/valute' element={<Valute />} />
                <Route path='/weather' element={<Weather />} />
                <Route path='/cryptovalute' element={<CryptoList />} />
                <Route path='/services' element={<Services />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contacts' element={<Contacts />} />
            </Routes>
        </BrowserRouter>
    )
}