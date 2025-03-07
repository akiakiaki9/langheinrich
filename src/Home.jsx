import React from 'react'
import LandingPage from './LandingPage'
import Section from './components/section/Section'
import About from './components/about/About'
import Video from './components/video/Video'
import Footer from './components/footer/Footer'
import Section2 from './components/section/Section2'
import Section3 from './components/section/Section3'
import Navbar from './Navbar'

export default function Home() {
    return (
        <div className='home'>
            <Navbar />
            <LandingPage />
            <Section />
            <About />
            <Section2 />
            <Section3 />
            <Video />
            <Footer />
        </div>
    )
};