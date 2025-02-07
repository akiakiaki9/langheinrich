import React, { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginComp() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

        if (!login || !password) {
            setError('Please fill all inputs!');
            return;
        }

        try {
            const response = await axios.post(
                'https://macalistervadim.site/api/token/',
                {
                    username: login,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                Cookies.set('access', response.data.access, { path: '/', expires: 7 });
                Cookies.set('refresh', response.data.refresh, { path: '/', expires: 30 });
                navigate('/online-shop');
                handleCloseModal();
            } else {
                setError('Incorrect login or password.');
            }

        } catch (error) {
            setError('There was an error sending data.');
        }
    };

    return (
        <div>
            <p className="landing-header__login" onClick={handleOpenModal}>Login</p>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content__header">
                            <h2>Login</h2>
                            <MdClose className="close-button" onClick={handleCloseModal} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="login">Login</label>
                                <input
                                    type="text"
                                    id="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    placeholder="Enter Login"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};