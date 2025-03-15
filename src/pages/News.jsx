import React from 'react'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import Footer from '../components/footer/Footer'
import NEWS from '../utils/news'

export default function News() {
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
                        <p className='pagename-blok__p-2'>News</p>
                    </div>
                </div>
            </div>
            <div className='news'>
                <div className="news-blok">
                    {NEWS.map(item => (
                        <div
                            className='news-blok__section'
                            key={item.id}
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            <div className='news-blok__section__header'>
                                <p>{item.category}</p>
                            </div>
                            <Link to={`/news/${item.id}`}><h1>{item.title}</h1></Link>
                            <div className="news-blok__section__footer">
                                <p>By: {item.autor}</p>
                                <p>{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
};