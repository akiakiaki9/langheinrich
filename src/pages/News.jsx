import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Footer from "../components/footer/Footer";
import axios from "axios";

export default function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const response = await axios.get("https://macalistervadim.site/api/news/");
                setNews(response.data);
            } catch (error) {
                console.error("Ошибка загрузки новостей:", error);
            }
        };

        loadNews();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };
    

    return (
        <div>
            <Navbar />
            <div className="pagename">
                <div className="pagename-blok">
                    <div>
                        <h1>News</h1>
                    </div>
                    <div>
                        <Link to="/">
                            <p className="pagename-blok__p-1">Home</p>
                        </Link>
                        <GoDotFill className="pagename-icon" />
                        <p className="pagename-blok__p-2">News</p>
                    </div>
                </div>
            </div>
            <div className="news">
                <div className="news-blok">
                    {news.length > 0 ? (
                        news.map((item) => (
                            <div
                                className="news-blok__section"
                                key={item.id}
                                style={{ backgroundImage: `url(${item.image})` }}
                            >
                                <div className="news-blok__section__header">
                                    <p>{item.category}</p>
                                </div>
                                <Link to={`/news/${item.id}`}>
                                    <h1>{item.title}</h1>
                                </Link>
                                <div className="news-blok__section__footer">
                                    <p>By: {item.author}</p>
                                    <p>{formatDate(item.created_at)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='loading'><div className='loader'></div></div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};