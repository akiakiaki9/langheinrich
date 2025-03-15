import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../components/footer/Footer';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import NEWS from '../utils/news';
import { MdFormatQuote } from "react-icons/md";

export default function NewsDetail() {
    const { id } = useParams();
    const newsItem = NEWS.find(news => news.id === Number(id));

    if (!newsItem) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Новость не найдена</h2>;
    }

    return (
        <div>
            <Navbar />
            <div className='pagename'>
                <div className="pagename-blok">
                    <div>
                        <h1>News</h1>
                    </div>
                    <div>
                        <Link to='/'><p className='pagename-blok__p-1'>Home</p></Link>
                        <GoDotFill className='pagename-icon' />
                        <Link to='/news' className='pagename-blok__p-2'>News</Link>
                        <GoDotFill className='pagename-icon' />
                        <p className='pagename-blok__p-2'>
                            {newsItem.title.length > 10 ? newsItem.title.slice(0, 10) + '...' : newsItem.title}
                        </p>
                    </div>
                </div>
            </div>
            <div className="newsdet">
                <div className="newsdet-blok">
                    <div className="newsdet-blok__section">
                        <div className="newsdet-blok__section__header">
                            <p>{newsItem.autor}</p>
                            <p>/</p>
                            <p>{newsItem.date}</p>
                        </div>
                        <h1>{newsItem.title}</h1>
                        <div className="newsdet-blok__section__section">
                            <img src={newsItem.image} alt="" />
                            <p>{newsItem.category}</p>
                        </div>
                        <div className="newsdet-blok__section__description">
                            <p>{newsItem.description_1}</p>
                            <p>{newsItem.description_2}</p>
                        </div>
                    </div>
                    <div className="newsdet-blok__footer">
                        <div className="newsdet-blok__footer__header">
                            <MdFormatQuote className='newsdet-blok__footer__icon' />
                        </div>
                        <p>Since more than 40 years, LANGHEINRICH is operating in the textile market manufacture and trader. As years go by, the range of produced textiles has been increased, besides the regular production became the largest exporter.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};