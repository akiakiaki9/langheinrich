import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Функция для обработки прокрутки страницы
        const handleScroll = () => {
            // Определяем текущую позицию прокрутки страницы
            const scrollTop = window.pageYOffset;
            // Устанавливаем состояние isVisible в зависимости от позиции прокрутки
            setIsVisible(scrollTop > 100); // Например, кнопка появляется, когда прокручено более 100 пикселей вниз
        };

        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);

        // Отменяем добавленный обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только один раз при монтировании компонента

    // Функция для прокрутки страницы вверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    };

    // Условный рендеринг кнопки "Наверх"
    return (
        <div className={`scroll-to-top-button ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
            <FaArrowUp />
        </div>
    );
}

export default ScrollTop;