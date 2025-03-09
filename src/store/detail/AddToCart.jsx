import axios from 'axios';
import React, { useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import Cookies from "js-cookie";

export default function AddToCart({ data }) {
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [alreadyMessage, setAlreadyMessage] = useState(false);
    const accessToken = Cookies.get("access");

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/cart/`,
                {
                    product_id: data
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                });

            if (response.data.success || response.status === 200 || response.status === 201) {
                setSuccessMessage(true);

                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
            } else if (response.data.message === "Product already in cart") {
                setAlreadyMessage(true);
                setTimeout(() => {
                    setAlreadyMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error("Error adding to cart:", error.message);

            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 5000);
        }
    };

    return (
        <div>
            {successMessage && (
                <div className="notification">
                    <p>Added to cart!</p>
                    <div className="notification-bar"></div>
                </div>
            )}
            {errorMessage && (
                <div className="notification">
                    <p style={{ color: 'red' }}>Failed to add to cart!</p>
                    <div style={{ backgroundColor: 'red' }} className="notification-bar"></div>
                </div>
            )}
            {alreadyMessage && (
                <div className="notification">
                    <p style={{ color: '#FFA500' }}>Product already in cart!</p>
                    <div style={{ backgroundColor: '#FFA500' }} className="notification-bar"></div>
                </div>
            )}
            <button
                className="detail-blok__section-2__header__button-2"
                onClick={handleAddToCart}
            >
                To cart
                <FaCartShopping className='detail-blok__section-2__header__button-2__icon' />
            </button>
        </div>
    );
};