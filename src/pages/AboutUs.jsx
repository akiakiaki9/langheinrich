import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {

  const { t } = useTranslation()

  return (
    <div className='container'>
      <div className="container-menu">
        <Menu />
      </div>
      <div className="container-navbar">
        <Navbar />
      </div>
      <div className="container-section">
        <div className="about-us">
          <div className="about-us-sar">
            <h1>{t('about-us-sar')}</h1>
            <div className='title-tire'></div>
          </div>
          <br />
          <br />
          <br />
          <div className="about-us-blok">
            <div className="about-us-blok__section">
              <h2>{t('about-us-title-1')}</h2>
              <p>{t('about-us-body-1')}</p><br />

              <h3>{t('about-us-title-2')}</h3>
              <p>{t('about-us-body-2')}</p><br />
              <p>{t('about-us-body-3')}</p><br /><br />

              <h3>{t('about-us-title-3')}</h3>
              <p>{t('about-us-body-4')}</p><br />
              <p>{t('about-us-body-5')}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}