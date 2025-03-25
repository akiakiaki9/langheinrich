import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoIosPricetags } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

export default function DetailComp() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const chatId = Cookies.get('chatId');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://macalistervadim.site/api/products/${id}`);
                setProduct(response.data);

                const allProducts = await axios.get('https://macalistervadim.site/api/products');
                const filteredProducts = allProducts.data
                    .filter(item => item.category === response.data.category && item.id !== response.data.id);

                const shuffled = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
                setSimilarProducts(shuffled);

                await checkFavorite(response.data.id);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const checkFavorite = async (productId) => {
        try {
            const token = Cookies.get('access');
            if (!token) return;

            const response = await axios.get('https://macalistervadim.site/api/favorites/', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const favorites = response.data;
            setIsFavorite(favorites.some(item => item.id === productId));
        } catch (error) {
            console.error('Ошибка при проверке избранного:', error);
        }
    };

    const handleFavorite = async () => {
        const token = Cookies.get('access');

        if (!token) {
            alert('Вы не авторизованы');
            return;
        }

        try {
            await axios.post(
                'https://macalistervadim.site/api/favorites/',
                { product: product.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setIsFavorite(true);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
        }
    };

    const handleOrder = async (productId) => {
        try {
            const response = await axios.post(`https://macalistervadim.site/api/products/${productId}/chat/`, {}, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('access')}`
                }
            });

            if (response.status === 200) {
                const chatId = response.data.chat_id;
                Cookies.set('chatId', chatId);
                window.location.href = `/chat?chatId=${chatId}`;
            } else {
                console.error('Failed to create chat');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!chatId) return null;

    if (loading) {
        return <div className='loading'><div className='loader'></div></div>;
    }

    return (
        <div>
            {product ? (
                <div>
                    <div className="chat-icon">
                        <Link to={`/chat?chatId=${chatId}`}><FiMessageSquare /></Link>
                    </div>
                    <div className="navigator">
                        <div className="navigator-blok">
                            <Link to='/store'>Main</Link>
                            <MdOutlineKeyboardArrowRight className='navigator__slesh' />
                            <p className='navigator__p'>{product.name}</p>
                        </div>
                    </div>
                    <div className='detail'>
                        <div className="detail-blok">
                            <div className="detail-blok__section-1">
                                <div className="detail-blok__section-1__image">
                                    <img src={product.image || "/images/category.jpg"} alt={product.name} />
                                </div>
                            </div>
                            <div className="detail-blok__section-2">
                                <h2>{product.name}</h2>
                                <div className="detail-blok__section-2__container">
                                    <div className="detail-blok__section-2__container-part">
                                        <p className='detail-blok__section-2__container-part__p'>
                                            <IoIosPricetags className='detail-blok__section-2__container-part__icon' />
                                            <span className='detail-blok__section-2__container-part__p__span'>
                                                {Number(product.price).toLocaleString('ru-RU')}
                                                <p>UZS</p>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="detail-blok__section-2__header">
                                        <button className="detail-blok__section-2__header__button-1" onClick={() => handleOrder(product.id)}>
                                            Order
                                        </button>
                                        <button
                                            className={`detail-blok__section-2__header__button-2 ${isFavorite ? 'favorite' : ''}`}
                                            onClick={handleFavorite}
                                        >
                                            <FaHeart className='detail-blok__section-2__header__button-2__icon' />
                                        </button>
                                    </div>
                                    <p className='detail__description'>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='similar'>
                        <div className="similar-header">
                            <h1>Similar products</h1>
                            <div className="similar-header__line"></div>
                        </div>
                        <div className="similar-blok">
                            {similarProducts.length > 0 ? (
                                similarProducts.map(similar => (
                                    <div key={similar.id} className="similar-blok__section">
                                        <Link to={`/store/product/${similar.id}`}>
                                            <img src={similar.image || "/images/category.jpg"} alt={similar.name} />
                                            <h2>{similar.name}</h2>
                                            <p>{Number(similar.price).toLocaleString('ru-RU')} UZS</p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No similar products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No data</div>
            )}
        </div>
    );
};