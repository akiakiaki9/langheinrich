import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import GoogleMap from '../components/GoogleMap'
import { useTranslation } from 'react-i18next'

export default function Contacts() {

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
        <div className="contacts">
          <div className="contacts-sar">
            <h1>{t('contacts-sar')}</h1>
            <div className='title-tire'></div>
          </div>
          <br />
          <br />
          <br />
          <div className="contacts-blok">
            <div className="contacts-blok__section">
              <form>
                <input type="text" placeholder={t('contacts-name')} required />
                <input type="text" placeholder={t('contacts-lastname')} required />
                <input type="email" placeholder={t('contacts-email')} required />
                <input type="tel" placeholder={t('contacts-phone')} required />
                <textarea placeholder={t('contacts-message')} required></textarea>
                <button type='submit'>{t('contacts-button')}</button>
              </form>
            </div>
            <div className="contacts-blok__section">
              <GoogleMap
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d644.885473999052!2d64.41684986482738!3d39.748420075919924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1718945119571!5m2!1sru!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}