import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import Chat from '../Chat';
import Footer from '../components/footer/Footer';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = Cookies.get('access');
        if (!token) {
            navigate('/login');
        } else {
            getFavorites();
            getProducts();
        }
    }, [navigate]);

    const getFavorites = async () => {
        const token = Cookies.get('access');
        try {
            const response = await axios.get('https://macalistervadim.site/api/favorites/', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка избранного:', error);
        }
    };

    const getProducts = async () => {
        try {
            const response = await axios.get('https://macalistervadim.site/api/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка продуктов:', error);
        }
    };

    const removeFavorite = async (favoriteId) => {
        const token = Cookies.get('access');
        try {
            await axios.delete(`https://macalistervadim.site/api/favorites/${favoriteId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setFavorites(favorites.filter(item => item.id !== favoriteId));
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Chat />
            <div className='profile'>
                <div className="profile-header">
                    <h1>Your Profile</h1>
                    <CgProfile className='profile-header__icon' />
                </div>
                <div className="profile-blok">
                    <div className="profile-blok__section">
                        <div className="profile-blok__section__header">
                            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
                            <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favorites</button>
                        </div>
                    </div>
                    <div className="profile-blok__section">
                        {activeTab === 'profile' && (
                            <div className="profile-blok__section__container">
                                <div className="profile-blok__section__container-part">
                                    <div className="profile-blok__section__container-part__class">
                                        <h2>Login</h2>
                                    </div>
                                    <div className="profile-blok__section__container-part__class">
                                        <p>admin</p>
                                    </div>
                                </div>
                                <div className="profile-blok__section__container-part">
                                    <div className="profile-blok__section__container-part__class">
                                        <h2>Full Name</h2>
                                    </div>
                                    <div className="profile-blok__section__container-part__class">
                                        <p>Tillayev Akbar</p>
                                    </div>
                                </div>
                                <div className="profile-blok__section__container-part">
                                    <div className="profile-blok__section__container-part__class">
                                        <h2>Email address</h2>
                                    </div>
                                    <div className="profile-blok__section__container-part__class">
                                        <p>admin@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'favorites' && (
                            <div className="favorites">
                                <div className="favorites-blok">
                                    {favorites.length > 0 ? (
                                        favorites.map((item, index) => {
                                            const productData = products.find(prod => prod.id === item.product);
                                            return (
                                                <div key={index} className="favorites-blok__section">
                                                    <Link to={`/store/product/${productData?.id}`}>
                                                        <img src={item.image || '/images/logo.jpg'} alt={productData ? productData.name : 'Неизвестный товар'} />
                                                    </Link>
                                                    <p>{productData ? productData.name : 'Неизвестный товар'}</p>
                                                    <FaHeart className='favorites-blok__section__icon' onClick={() => removeFavorite(item.id)} />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>No favorites found.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};