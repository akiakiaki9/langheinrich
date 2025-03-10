import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RiCloseLargeFill } from 'react-icons/ri';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import Cookies from 'js-cookie';
import { BsCartX } from "react-icons/bs";

export default function CartComp() {
    const [cart, setCart] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = Cookies.get("access");

    useEffect(() => {
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchCart = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cart/', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCart(response.data);

                const productRequests = response.data.map(item =>
                    axios.get(`http://127.0.0.1:8000/api/products/${item.product_id}/`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                );

                const products = await Promise.all(productRequests);
                setProductDetails(products.map(product => product.data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [accessToken]);

    const handleDeleteCart = async (itemId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cart/${itemId}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
        } catch (error) {
            console.error(error.message);
        }
    };

    // Сортировка cart по id в убывающем порядке
    const sortedCart = [...cart].sort((a, b) => b.id - a.id);

    return (
        <div>
            <div className='layout'>
                <Navbar />
                <div className="navigator">
                    <div className="navigator-blok">
                        <Link to='/online-shop'>Main</Link>
                        <MdOutlineKeyboardArrowRight className='navigator__slesh' />
                        <p className='navigator__p'>Cart</p>
                    </div>
                </div>

                {loading ? (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                ) : (
                    <div className='cart'>
                        <div className="cart-blok">
                            {!accessToken ? (
                                <div className="cart-message">
                                    <p>Вам нужно сначала <Link to="/login">войти</Link>.</p>
                                </div>
                            ) : sortedCart.length === 0 ? (
                                <div className="cart-message">
                                    <BsCartX />
                                    <p>Ваша корзина пуста.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="cart-blok__section cart-blok__section__header">
                                        <div className="cart-blok__section-part" style={{ color: 'var(--main-color)' }}>PRODUCT</div>
                                        <div className="cart-blok__section-part" style={{ color: 'var(--main-color)' }}>PRICE</div>
                                        <div className="cart-blok__section-part__end"></div>
                                    </div>
                                    <br />
                                    <hr />
                                    <br />
                                    {sortedCart.map(item => {
                                        const product = productDetails.find(p => p.id === item.product_id);
                                        return (
                                            <div className='cart-blok__section cart-blok__section-2' key={item.id}>
                                                <div className="cart-blok__section-part">
                                                    <div className="cart-blok__section-part__footer">
                                                        <div className="cart-blok__section-part__footer__image">
                                                            <Link to={`/online-shop/product/${product?.id}`}>
                                                                <img src={product?.image} alt="" />
                                                            </Link>
                                                        </div>
                                                        <Link to={`/online-shop/product/${product?.id}`}>
                                                            <h3>{product?.name}</h3>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="cart-blok__section-part">
                                                    <p>{Number(product?.price).toLocaleString('ru-RU')} UZS</p>
                                                </div>
                                                <div className="cart-blok__section-part__end">
                                                    <RiCloseLargeFill onClick={() => handleDeleteCart(item.id)} className="cart-blok__section-part__end__icon" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
