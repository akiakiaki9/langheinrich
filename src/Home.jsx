import React from 'react'
import LandingPage from './LandingPage'
import Section from './components/section/Section'
import Video from './components/video/Video'
import Footer from './components/footer/Footer'
import Section2 from './components/section/Section2'
import Navbar from './Navbar'
import LanguageSwitcher from './components/LanguageSwitcher'
import Contacts2 from './components/contacts/Contacts2'

export default function Home() {
    return (
        <div className='home'>
            <Navbar />
            <LandingPage />
            <LanguageSwitcher />
            <Section />
            <Section2 />
            <Contacts2 />
            <Video />
            <Footer />
        </div>
    )
};