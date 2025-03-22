import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';
import VideoBg from '../components/Videobg';

export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            } else {
                setError('Incorrect login or password.');
            }

        } catch (error) {
            console.error(error);
            setError('There was an error sending data.');
        }
    };

    return (
        <div className="login">
            <div className="login__container">
                <div className="login-blok-1">
                    <VideoBg />
                </div>
                <div className="login-blok-2">
                    <div className="login-blok__section-2">
                        <Link to='/'><img src="/images/logo.jpg" alt="Langheinrich Logo" className='login-img-visible' /></Link>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h1>Log In</h1>
                            <div className="login-form__section">
                                <label>Login</label>
                                <input
                                    type="text"
                                    name="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="login-form__section">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="login-form__section">
                                <button type="submit">SUBMIT</button>
                            </div>
                            <div className="login-form__section">
                                {error && <p className="error-message">{error}</p>}
                            </div>
                            <div className="login-form__absolute-1">
                                <div>
                                    <FaHome className='login-form__absolute__icon' />
                                    <Link className='login-form__absolute-a' to='/'>Home</Link>
                                </div>
                                <div>
                                    <MdLocalPhone className='login-form__absolute__icon' />
                                    <Link className='login-form__absolute-a' to='/'>Contacts</Link>
                                </div>
                            </div>
                            <div className="login-form__absolute-2">
                                <div>
                                    <IoMdHelpCircleOutline className='login-form__absolute__icon' />
                                    <Link className='login-form__absolute-a' to='/'>Help</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};