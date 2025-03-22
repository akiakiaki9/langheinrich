import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Glava() {
    const navigate = useNavigate();

    const flags = {
        de: "/images/flags/germany.png",
        en: "/images/flags/britain.webp",
        fr: "/images/flags/france.png",
        ru: "/images/flags/russian.png",
        uz: "/images/flags/uzbekistan.png",
        ar: "/images/flags/arabemirates.svg",
    };

    const switchLanguage = (lang) => {
        localStorage.setItem("language", lang);
        navigate("/home");
    };

    return (
        <div className='glava'>
            <div className="glava-blok">
                <img className='glava-blok__image' src="/images/logo.jpg" alt="Logo" />
                <div className="glava-blok__container">
                    {Object.keys(flags).map((lang) => (
                        <div
                            key={lang}
                            className="glava-language-item"
                            onClick={() => switchLanguage(lang)}
                        >
                            <img src={flags[lang]} alt={lang} className="glava-flag" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};