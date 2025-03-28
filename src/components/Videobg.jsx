import React from 'react'

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
                <h1 className="video__title">Langheinrich – is an experienced manufacturer and supplier of from Germany.</h1>
            </div>
        </div>
    )
};