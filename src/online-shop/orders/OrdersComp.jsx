import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { BsCartX } from 'react-icons/bs';

export default function OrdersComp() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Количество заказов на странице

    const accessToken = Cookies.get("access");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU'); // Для формата 01.01.2025
    };

    useEffect(() => {
        if (!accessToken) return;

        const fetchAllOrders = async () => {
            try {
                const response = await axios.get('https://macalistervadim.site/api/orders', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                // Сортируем заказы по id в убывающем порядке (самые новые в начале)
                const sortedOrders = response.data.sort((a, b) => b.id - a.id);
                setOrders(sortedOrders);

                // Получаем данные о каждом продукте по product_id
                const productIds = sortedOrders.map(order => order.product);
                const uniqueProductIds = [...new Set(productIds)];

                uniqueProductIds.forEach(async (productId) => {
                    try {
                        const productResponse = await axios.get(`https://macalistervadim.site/api/products/${productId}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${accessToken}`
                            }
                        });
                        setProducts(prev => ({
                            ...prev,
                            [productId]: productResponse.data
                        }));
                    } catch (error) {
                        console.error(`Ошибка при получении продукта ${productId}: `, error);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllOrders();
    }, [accessToken]);

    // Логика для пагинации
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Обработчик перехода между страницами
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!accessToken) {
        return (
            <div className='orders-message'>
                <p>Вам нужно сначала <Link to='/login'>войти</Link></p>
            </div>
        );
    }

    return (
        <div>
            <div className="navigator">
                <div className="navigator-blok">
                    <Link to='/online-shop'>Main</Link>
                    <MdOutlineKeyboardArrowRight className='navigator__slesh' />
                    <p className='navigator__p'>Orders</p>
                </div>
            </div>
            <div className='orders'>
                <div className="orders-blok">
                    <div className="orders-blok__section orders-blok__section-1">
                        <div className="orders-blok__section-part__main"><p>Id</p></div>
                        <div className="orders-blok__section-part__product"><p>Product</p></div>
                        <div className="orders-blok__section-part"><p>Quantity</p></div>
                        <div className="orders-blok__section-part__status"><p>Status</p></div>
                        <div className="orders-blok__section-part__end"><p>Date</p></div>
                    </div>

                    {orders.length === 0 ? (
                        <div className='orders-message'>
                            <BsCartX />
                            <p>Нет покупок</p>
                        </div>
                    ) : (
                        currentOrders.map(item => {
                            const product = products[item.product]; // Получаем данные о продукте по product_id
                            return (
                                <div className='orders-blok__section orders-blok__section-2' key={item.id}>
                                    <div className="orders-blok__section-part__main">
                                        <p>{item.id}</p>
                                    </div>
                                    <div className="orders-blok__section-part__product">
                                        {product ? (
                                            <>
                                                <Link to={`/online-shop/product/${product.id}`}>
                                                    <img src={product.image} alt={product.name} />
                                                </Link>
                                                <Link to={`/online-shop/product/${product.id}`}>
                                                    <p>{product.name}</p>
                                                </Link>
                                            </>
                                        ) : (
                                            <p>Загружается...</p>
                                        )}
                                    </div>
                                    <div className="orders-blok__section-part">
                                        <p>{item.quantity}</p>
                                    </div>
                                    <div className="orders-blok__section-part__status">
                                        <p>{item.status}</p>
                                    </div>
                                    <div className="orders-blok__section-part__end">
                                        <p className='orders-blok__section-part__end-p'>{formatDate(item.delivery_date)}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {/* Пагинация */}
            {orders.length > ordersPerPage && (
                <div className="pagination">
                    {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};