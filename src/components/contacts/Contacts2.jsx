import React, { useState } from 'react';
import axios from 'axios';

export default function Contacts2() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log(formData);

        try {
            await axios.post('https://macalistervadim.site/api/feedbacks/', formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert('Thanks for your feedback!');
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });
        } catch (error) {
            alert('Error submitting feedback!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='contacts2'>
            <div className="contacts2-blok">
                <div className="contacts2-blok__section">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.296119635555!2d13.65669747629147!3d48.623315271301294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47748b7810744701%3A0xf529d9c5aa5f754b!2zTGFuZ2hlaW5yaWNoc3RyYcOfZSwgOTQwNTEgSGF1emVuYmVyZywg0JPQtdGA0LzQsNC90LjRjw!5e0!3m2!1sru!2s!4v1736752352818!5m2!1sru!2s"
                        width="100%"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
                <div className="contacts2-blok__section contacts2-blok__section-2">
                    <p>LET’S CONNECT</p>
                    <h1>SEND YOUR MESSAGE</h1>
                    <br />
                    <form className='contacts2-blok__section__form' onSubmit={handleSubmit}>
                        <div className="contacts2-blok__section__form-part">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='Your Name*'
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='Phone Number*'
                                required
                            />
                        </div>
                        <div className="contacts2-blok__section__form-part">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Your Email*'
                                required
                            />
                        </div>
                        <div className="contacts2-blok__section__form-part">
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder='Message'
                                required
                            ></textarea>
                        </div>
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};