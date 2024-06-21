import React from 'react'

export default function GoogleMap({ src, allowFullScreen, loading, referrerPolicy }) {
    return (
        <div>
            <iframe
                className='google-map'
                src={src}
                allowFullScreen={allowFullScreen}
                loading={loading}
                referrerPolicy={referrerPolicy}
                title="Google Map"
            ></iframe>
        </div>
    )
}