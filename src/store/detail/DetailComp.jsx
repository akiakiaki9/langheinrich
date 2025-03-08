import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import MakeOrder from './MakeOrder';
import AddToCart from './AddToCart';
import axios from 'axios';
import { IoIosPricetags } from "react-icons/io";

export default function DetailComp() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className='loading'><div className='loader'></div></div>;
    }

    return (
        <div>
            {product ? (
                <div>
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
                                    <img src={product.image ? product.image : "/images/category.jpg"} alt={product.name} />
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
                                        <MakeOrder data={product} />
                                        <AddToCart data={product.id} />
                                    </div>
                                    <p className='detail__description'>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No data</div>
            )}
        </div>
    );
};