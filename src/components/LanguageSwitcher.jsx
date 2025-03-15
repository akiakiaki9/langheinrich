import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const currentLang = i18n.language || "en";

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const flags = {
        de: "/images/flags/germany.png",
        en: "/images/flags/britain.webp",
        fr: "/images/flags/france.png",
        ru: "/images/flags/russian.png",
        uz: "/images/flags/uzbekistan.png",
        ar: "/images/flags/arabemirates.svg",
    };

    return (
        <div className="language">
            <div className="language-switcher" ref={dropdownRef}>
                <div className="selected" onClick={() => setIsOpen(!isOpen)}>
                    <img src={flags[currentLang]} alt={currentLang} className="flag" />
                    {currentLang.toUpperCase()}
                </div>
                {isOpen && (
                    <div className="language-dropdown">
                        {Object.keys(flags).map((lang) => (
                            <div
                                key={lang}
                                className={`language-dropdown-item ${currentLang === lang ? "active" : ""}`}
                                onClick={() => switchLanguage(lang)}
                            >
                                <img src={flags[lang]} alt={lang} />
                                {lang.toUpperCase()}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};