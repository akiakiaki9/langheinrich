import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import Navbar from './Navbar';

const images = [
    '/images/landing/landing1.jpg',
    '/images/landing/landing2.jpg',
    '/images/landing/landing3.jpg',
    '/images/landing/landing4.jpg',
];

export default function LandingPage() {
    return (
        <div className='landing'>
            <Navbar />
            <Swiper
                effect={'fade'}
                modules={[EffectFade, Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className='landing-swiper'
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className='landing-blok'
                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.423), rgba(0, 0, 0, 0.423)), url(${img})` }}
                        >
                            <h1>Langheinrich</h1>
                            <p>Langheinrich – is an experienced manufacturer and supplier from Germany.</p>
                            <div className='landing-blok__container'>
                                <Link to='/store'><button className='landing-blok__container-button-1'>Store</button></Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='landing-footer'>
                <div className='landing-footer__container'>
                    <p className='landing-footer__p1'>Langheinrich Vertriebs GmbH</p>
                    <div className='landing-footer__container__container'>
                        <p><a href='tel:+496642870'>Tel: +49 6642 / 87-0</a></p>
                        <p><a href='tel:4966428763'>Fax: +49 6642 / 87-63</a></p>
                    </div>
                    <p className='landing-footer__p2'><a href='mailto:service@langheinrich.de'>service@langheinrich.de</a></p>
                </div>
            </div>
        </div>
    );
}
