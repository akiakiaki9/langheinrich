import React, { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoIosPricetags } from "react-icons/io";
import Cookies from 'js-cookie';

export default function MakeOrder({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setError('');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let accessToken = Cookies.get('access');
        const refreshToken = Cookies.get('refresh');
    
        if (!accessToken) {
            if (!refreshToken) {
                setError('You need to login!');
                navigate('/');
                return;
            }
    
            try {
                const refreshResponse = await axios.post('http://127.0.0.1:8000/api/refresh/', {
                    refresh: refreshToken
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                Cookies.set('access', refreshResponse.data.access, { path: '/' });
                accessToken = refreshResponse.data.access;
    
                return handleSubmit(e);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError.response?.data || refreshError.message);
                setError('Failed to refresh access token.');
                navigate('/');
                return;
            }
        }
    
        try {
            if (!quantity || !date) {
                setError('Please fill in all fields.');
                return;
            }
    
            const response = await axios.post(
                'http://127.0.0.1:8000/api/orders/',
                {
                    product_id: data.id,
                    quantity: quantity,
                    delivery_date: date
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
    
            if (response.data.success || response.status === 200 || response.status === 201) {
                handleCloseModal();
                setQuantity('');
                setDate('');
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 5000);
            }
        } catch (err) {
            console.error("Request error:", err.response || err);
            setError('Request error:');
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 5000);
        }
    };

    return (
        <div>
            {successMessage && (
                <div className="notification">
                    <p>Order successfully placed!</p>
                    <div className="notification-bar"></div>
                </div>
            )}
            {errorMessage && (
                <div className="notification">
                    <p style={{ color: 'red' }}>Failed to order!</p>
                    <div style={{ backgroundColor: 'red' }} className="notification-bar"></div>
                </div>
            )}
            <button
                className="detail-blok__section-2__header__button-1"
                onClick={handleOpenModal}
            >
                Order
            </button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content__header">
                            <h3><span>Order</span> {data.name}</h3>
                            <MdClose className="close-button" onClick={handleCloseModal} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="quantity">Enter Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min={20}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Choose Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form-section'>
                                <IoIosPricetags className='form-section__icon' />
                                <p className='form-section__p'>
                                    <span className='form-section__p__span'>
                                        {(Number(data.price) * (Number(quantity) || 0)).toLocaleString('ru-RU')}
                                    </span> UZS
                                </p>
                            </div>
                            <div>
                                {error && <p className="error-message">{error}</p>}
                            </div>
                            <div className="form-footer">
                                <button type="submit" className="submit-button">
                                    Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};