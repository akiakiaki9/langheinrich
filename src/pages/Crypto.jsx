import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import ScrollTop from '../components/ScrollTop';

const CryptoList = () => {

    const { t } = useTranslation()
    const [cryptoData, setCryptoData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCryptoData, setFilteredCryptoData] = useState([]);
    const [filterOption, setFilterOption] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // При загрузке компонента, пытаемся загрузить данные из localStorage
        const savedCryptoData = localStorage.getItem('cryptoData');
        if (savedCryptoData) {
            setCryptoData(JSON.parse(savedCryptoData));
            setFilteredCryptoData(JSON.parse(savedCryptoData)); // Также устанавливаем фильтрованные данные
        }

        fetchData(); // Загрузка актуальных данных
    }, []);

    useEffect(() => {
        // При обновлении cryptoData, сохраняем данные в localStorage
        localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
    }, [cryptoData]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false,
                },
            });

            if (response.data) {
                setCryptoData(response.data);
                setFilteredCryptoData(response.data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);
        filterCryptoData(value, filterOption);
    };

    const filterCryptoData = (query, option) => {
        let filteredData = cryptoData;

        if (query) {
            filteredData = filteredData.filter((crypto) =>
                crypto.name.toLowerCase().includes(query)
            );
        }

        switch (option) {
            case 'gainers':
                filteredData = filteredData.filter((crypto) =>
                    crypto.price_change_percentage_24h > 0
                );
                break;
            case 'losers':
                filteredData = filteredData.filter((crypto) =>
                    crypto.price_change_percentage_24h < 0
                );
                break;
            default:
                break;
        }

        setFilteredCryptoData(filteredData);
    };

    const handleFilterOption = (option) => {
        setFilterOption(option);
        filterCryptoData(searchQuery, option);
    };

    return (
        <div className='container'>
            <div className='container-menu'>
                <Menu />
            </div>
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className='container-section'>
                <div className='crypto'>
                    <div className="crypto-sar">
                        <h1>{t('crypto-sar')}</h1>
                        <div className='title-tire'></div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='crypto-blok'>
                        <div className="crypto-blok__section">
                            <input
                                className='crypto__input'
                                type="text"
                                placeholder={t('crypto-search')}
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="crypto-blok__section">
                            <button onClick={() => handleFilterOption('all')} className='crypto__btn crypto__alls-btn'>
                                {t('crypto-alls')}
                            </button>
                            <button onClick={() => handleFilterOption('gainers')} className='crypto__btn crypto__top-btn'>
                                {t('crypto-top')}
                            </button>
                            <button onClick={() => handleFilterOption('losers')} className='crypto__btn crypto__btm-btn'>
                                {t('crypto-bottom')}
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <p>{t('loading')}</p>
                    ) : (
                        <table className='crypto__table' style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>{t('crypto-name')}</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>{t('crypto-price')} (USD)</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>{t('crypto-change')} (%)</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>{t('crypto-total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCryptoData.map((crypto, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '10px' }}>{crypto.name}</td>
                                        <td style={{ padding: '10px' }}>{crypto.current_price}</td>
                                        <td style={{ padding: '10px', color: crypto.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                            {crypto.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                        <td style={{ padding: '10px' }}>{(crypto.current_price * 1000).toFixed(2)} USD</td> {/* Пример суммы */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <ScrollTop />
        </div>
    );
};

export default CryptoList;