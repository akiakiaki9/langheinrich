import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoBg() {
    return (
        <div className="video-bg">
            <video
                src="/videos/login.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline>
            </video>
            <div className="effects"></div>
            <div className="video-bg__content">
                <Link to='/'><img src="/images/logo.svg" alt="Zarhal Logo" /></Link>
                <h1 className="video__title">When select the best of your choice, let our fabrics be an exception!</h1>
            </div>
        </div>
    )
};