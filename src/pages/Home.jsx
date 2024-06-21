import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

export default function Home() {

  const { t } = useTranslation()

  return (
    <div className='container'>
      <div className="container-menu">
        <Menu />
      </div>
      <div className="container-navbar">
        <Navbar />
      </div>
      <div className="container-section-home">
        <div className="home">
          <div className="home-blok">
            <div className="home-blok__section">
              <h1>SYNTAX</h1>
              <p>{t('home-title')}</p>
              <Link to='/services'><button>{t('home-button')}</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </div>
  )
}