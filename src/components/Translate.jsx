import React, { useState, useEffect } from 'react';
import i18n from '../translate/resources'; // Убедитесь, что этот импорт корректен

export default function Translate() {

    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Загрузка языка из localStorage при монтировании
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
            i18n.changeLanguage(savedLanguage)
                .catch(err => console.error('Error changing language on mount:', err));
        }
    }, []);

    useEffect(() => {
        console.log('Current language:', language);
    }, [language]);

    const handleChangeLanguage = async (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        console.log('Attempting to change language to:', newLanguage);

        if (i18n && typeof i18n.changeLanguage === 'function') {
            try {
                await i18n.changeLanguage(newLanguage);
                console.log(`Language changed to ${newLanguage}`);
                localStorage.setItem('language', newLanguage);
            } catch (err) {
                console.error('Error changing language:', err);
            }
        } else {
            console.error('i18n or changeLanguage function is not available.');
        }
    };

    return (
        <div className="language-switcher">
            <select className='select' value={language} onChange={handleChangeLanguage}>
                <option className='option' value="en">
                    <div className="language-option">
                        <b>English</b>
                    </div>
                </option>
                <option className='option' value="ru">
                    <div className="language-option">
                        <b>Русский</b>
                    </div>
                </option>
            </select>
        </div>
    );
}