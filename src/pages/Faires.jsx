import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Footer from "../components/footer/Footer";
import axios from "axios";

export default function Faires() {
    const [faires, setFaires] = useState([]);

    useEffect(() => {
        const loadFaires = async () => {
            try {
                const response = await axios.get("https://macalistervadim.site/api/faire/");
                setFaires(response.data);
            } catch (error) {
                console.error("Ошибка загрузки faires:", error);
            }
        };

        loadFaires();
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
                        <h1>Faires</h1>
                    </div>
                    <div>
                        <Link to="/">
                            <p className="pagename-blok__p-1">Home</p>
                        </Link>
                        <GoDotFill className="pagename-icon" />
                        <p className="pagename-blok__p-2">Faires</p>
                    </div>
                </div>
            </div>
            <div className="news">
                <div className="news-blok">
                    {faires.length > 0 ? (
                        faires.map((item) => (
                            <div
                                className="news-blok__section"
                                key={item.id}
                                style={{ backgroundImage: `url(${item.image})` }}
                            >
                                <div className="news-blok__section__header">
                                    <p>{item.category}</p>
                                </div>
                                <Link to={`/faires/${item.id}`}>
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