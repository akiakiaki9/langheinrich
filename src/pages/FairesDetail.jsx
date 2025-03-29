import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../components/footer/Footer";
import { GoDotFill } from "react-icons/go";
import { MdFormatQuote } from "react-icons/md";

export default function FairesDetail() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://macalistervadim.site/api/faire/${id}`);
                setNewsItem(response.data);
            } catch (error) {
                setError("Ошибка загрузки новости.");
                console.error("Ошибка загрузки новости:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) return <div className='loading'><div className='loader'></div></div>;
    if (error) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{error}</h2>;

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
                        <Link to="/home"><p className="pagename-blok__p-1">Home</p></Link>
                        <GoDotFill className="pagename-icon" />
                        <Link to="/news" className="pagename-blok__p-2">News</Link>
                        <GoDotFill className="pagename-icon" />
                        <p className="pagename-blok__p-2">
                            {newsItem.title.length > 10 ? newsItem.title.slice(0, 10) + "..." : newsItem.title}
                        </p>
                    </div>
                </div>
            </div>
            <div className="newsdet">
                <div className="newsdet-blok">
                    <div className="newsdet-blok__section">
                        <div className="newsdet-blok__section__header">
                            <p>{newsItem.author}</p>
                            <p>/</p>
                            <p>{formatDate(newsItem.created_at)}</p>
                        </div>
                        <h1>{newsItem.title}</h1>
                        <div className="newsdet-blok__section__section">
                            <img src={newsItem.image} alt={newsItem.title} />
                            <p>{newsItem.category}</p>
                        </div>
                        <div className="newsdet-blok__section__description">
                            <p>{newsItem.description_1}</p>
                            <p>{newsItem.description_2}</p>
                        </div>
                    </div>
                    <div className="newsdet-blok__footer">
                        <div className="newsdet-blok__footer__header">
                            <MdFormatQuote className="newsdet-blok__footer__icon" />
                        </div>
                        <p>Since more than 125 years, LANGHEINRICH is operating in the textile market manufacture and trader...</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};