import React, { useEffect, useState } from 'react';
import { IoIosPricetag } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductsComp() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://macalistervadim.site/api/products/');
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://macalistervadim.site/api/categories/');
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    // Фильтрация продуктов по ID категории
    const filteredProducts = products.filter((product) => product.category === Number(id));

    // Находим категорию по ID
    const categoryName = categories.find((category) => category.id === Number(id))?.name;

    return (
        <div>
            <div className="navigator">
                <div className="navigator-blok">
                    <Link to="/online-shop">Main</Link>
                    <MdOutlineKeyboardArrowRight className="navigator__slesh" />
                    <p className="navigator__p">{categoryName || 'Category not found'}</p>
                </div>
            </div>
            <div className="producs">
                <div className="products-blok">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div className="products-blok__section" key={item.id}>
                                <div className="products-blok__section__image">
                                    <Link to={`/online-shop/product/${item.id}`}>
                                        <img src={item.image} alt="" />
                                    </Link>
                                </div>
                                <Link to={`/online-shop/product/${item.id}`}>
                                    <h2>{item.name}</h2>
                                </Link>
                                <div className="products-blok__container">
                                    <div className="products-blok__container__section">
                                        <IoIosPricetag className="products-blok__container__section__icon" />
                                        <p>Price: <span style={{ color: 'blue', fontWeight: 'bold' }}>
                                            {Number(item.price).toLocaleString('ru-RU')} UZS
                                        </span></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No products found for this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};