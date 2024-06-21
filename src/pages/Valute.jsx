import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import 'flag-icons/css/flag-icons.min.css';
import { currencyToCountry } from '../valute utils/currentFlags';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import ScrollTop from '../components/ScrollTop'

const INTERVAL_TIME = 60000; // Интервал в миллисекундах (например, каждая минута)

export default function Valute() {

    const { t } = useTranslation()
    const [rates, setRates] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                setRates(Object.entries(response.data.rates));
            } catch (error) {
                setError("Ошибка при получении данных");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRates(); // Запустить первоначальную загрузку

        // Установить интервал для обновления данных
        const intervalId = setInterval(fetchRates, INTERVAL_TIME);

        // Очистить интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [baseCurrency]);

    const getFlagClass = (currencyCode) => {
        const countryCode = currencyToCountry[currencyCode];
        return countryCode ? `fi fi-${countryCode}` : 'fi fi-un';
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRates = rates.filter(([currency]) => {
        return currency.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const convertedAmount = useMemo(() => {
        // Проверяем, является ли amount числом
        if (isNaN(amount) || amount === '') return null;

        const fromRate = rates.find(([currency]) => currency === fromCurrency)?.[1];
        const toRate = rates.find(([currency]) => currency === toCurrency)?.[1];
        if (fromRate && toRate) {
            return (amount / fromRate) * toRate;
        }
        return null;
    }, [rates, fromCurrency, toCurrency, amount]);

    return (
        <div className="container">
            <div className="container-menu">
                <Menu />
            </div>
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className="container-section">
                <div className='valute'>
                    <div className="valute-sar">
                        <h1>{t('valute-sar')}</h1>
                        <div className='title-tire'></div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="valute-blok">
                        <div className="valute-blok__section valute-blok__section-1">
                            {error && <p>{error}</p>}
                            <label htmlFor="base-currency">{t('valute-base')}</label>
                            <select id="base-currency" value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
                                {rates.map(([currency]) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                        <div className='valute-blok__section valute-blok__section-2'>
                            <h3>{t('valute-convert')}</h3>
                            <div className='valute-blok__section-2__container'>
                                <div>
                                    <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                                        {rates.map(([currency]) => (
                                            <option key={currency} value={currency}>{currency}</option>
                                        ))}
                                    </select>
                                    <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                                        {rates.map(([currency]) => (
                                            <option key={currency} value={currency}>{currency}</option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)} // Убираем Number для пустой строки
                                    placeholder={t('valute-enter')}
                                />
                            </div>
                            {/* Проверяем, что amount не пусто и convertedAmount не null */}
                            {amount && convertedAmount !== null && (
                                <p>
                                    {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="valute-header">
                        <input
                            className='valute__search'
                            type="text"
                            placeholder={t('valute-search')}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="valute-footer">
                        {loading ? (
                            <p>{t('loading')}</p>
                        ) : (
                            <div className='valute__list'>
                                {filteredRates.map(([currency, rate]) => (
                                    <p className='valute__list-item' key={currency}>
                                        <span className={getFlagClass(currency)} style={{ marginRight: '10px' }}></span>
                                        {currency}: {rate}
                                    </p>
                                ))}
                                {filteredRates.length === 0 && (
                                    <p>Нет результатов для текущего запроса.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ScrollTop />
        </div>
    );
}
