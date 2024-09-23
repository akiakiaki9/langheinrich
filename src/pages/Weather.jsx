import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

const API_KEY = 'dd9d85f5a00a871bcd47afb83a773695';
const popularCities = ['Москва', 'Нью-Йорк', 'Париж', 'Лондон', 'Токио'];

const fetchWeatherData = async (cityName, apiKey, language) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=${language}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const WeatherSearch = () => {
    const { t, i18n } = useTranslation();
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [popularWeather, setPopularWeather] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (cityName, language) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchWeatherData(cityName, API_KEY, language);
            setWeatherData(data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError(t('city-not-found'));
            } else {
                setError(t('fetch-error'));
            }
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularWeather = useCallback(async () => {
        try {
            const weatherPromises = popularCities.map((city) => fetchWeatherData(city, API_KEY, i18n.language));
            const weatherResponses = await Promise.all(weatherPromises);
            setPopularWeather(weatherResponses);
        } catch (error) {
            console.error('Ошибка при получении данных для популярных городов:', error);
        }
    }, [i18n.language]);

    useEffect(() => {
        fetchPopularWeather(); // Fetch initially

        const intervalId = setInterval(fetchPopularWeather, 3600000); // Update every hour (3600000 ms)

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, [fetchPopularWeather]);

    const handleChange = (e) => {
        const cityName = e.target.value;
        setCity(cityName);
        if (cityName) {
            fetchWeather(cityName, i18n.language); // Передаем текущий язык
        } else {
            setWeatherData(null);
        }
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        i18n.changeLanguage(newLanguage);
    };

    return (
        <div className="container">
            <div className="container-menu">
                <Menu />
            </div>
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className="container-section">
                <div className="weather">
                    <div className="weather-sar">
                        <h1>{t('weather-sar')}</h1>
                        <div className="title-tire"></div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="weather-blok">
                        <div className='weather-blok__section'>
                            {/* Добавляем переключатель языка */}
                            <select onChange={handleLanguageChange} value={i18n.language}>
                                <option value="en">English</option>
                                <option value="ru">Русский</option>
                            </select>

                            <input
                                type="text"
                                placeholder={t('weather-search')}
                                value={city}
                                onChange={handleChange}
                                style={{
                                    padding: '10px',
                                    width: '100%',
                                    marginBottom: '20px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd'
                                }}
                            />
                            {loading ? (
                                <p>{t('Loading...')}</p>
                            ) : error ? (
                                <p style={{ color: 'red', fontSize: "70%" }}>{error}</p>
                            ) : (
                                <>
                                    {weatherData ? (
                                        <div style={{ textAlign: 'left' }}>
                                            <h2>{t('weather-at')} {weatherData.name}, {weatherData.sys.country}</h2>
                                            <p><strong>{t('weather-temperature')}:</strong> {weatherData.main.temp}°C</p>
                                            <p><strong>{t('weather-feeling')}:</strong> {weatherData.main.feels_like}°C</p>
                                            <p><strong>{t('weather-weather')}:</strong> {weatherData.weather[0].description}</p>
                                            <p><strong>{t('weather-humidity')}:</strong> {weatherData.main.humidity}%</p>
                                            <p><strong>{t('weather-wind-speed')}:</strong> {weatherData.wind.speed} м/с</p>
                                        </div>
                                    ) : (
                                        <div className='weather-popular'>
                                            <h2>{t('weather-popular')}</h2>
                                            {popularWeather.map((cityWeather) => (
                                                <div key={cityWeather.id} className='weather-popular__section'>
                                                    <h3>{cityWeather.name}, {cityWeather.sys.country}</h3>
                                                    <p><strong>{t('weather-temperature')}:</strong> {cityWeather.main.temp}°C</p>
                                                    <p><strong>{t('weather-weather')}:</strong> {cityWeather.weather[0].description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSearch;
