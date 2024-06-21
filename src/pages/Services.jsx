import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import valuteImage from '../images/services/crypto.jpg';
import cryptoImage from '../images/services/valute.jpg';
import weatherImage from '../images/services/weather.webp';

export default function Services() {

  const { t } = useTranslation()

  const SERVICES = [
    {
        id: 1,
        title: t('services-title-1'),
        subtitle: t('services-subtitle-1'),
        image: valuteImage,
        link: "valute"
    },
    {
        id: 2,
        title: t('services-title-2'),
        subtitle: t('services-subtitle-2'),
        image: cryptoImage,
        link: "cryptovalute"
    },
    {
        id: 3,
        title: t('services-title-3'),
        subtitle: t('services-subtitle-3'),
        image: weatherImage,
        link: "weather"
    }
];

  return (
    <div className='container'>
      <div className="container-menu">
        <Menu />
      </div>
      <div className="container-navbar">
        <Navbar />
      </div>
      <div className="container-section">
        <div className="services">
          <div className="services-sar">
            <h1>{t('services-sar')}</h1>
            <div className='title-tire'></div>
          </div>
          <br />
          <br />
          <br />
          <div className="services-blok">
            {SERVICES.map(service => (
              <div className="services-blok__section" key={service.id}>
                <Link to={`/${service.link}`}>
                  <img src={service.image} alt="" className='service__img' />
                  <b className='service__title'>{service.title}</b>
                  <p className='service__subtitle'>{service.subtitle}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}