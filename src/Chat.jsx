import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiCheck, FiClock, FiTrash2, FiCopy, FiCornerDownLeft } from 'react-icons/fi';
import { IoSend } from "react-icons/io5";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [unread, setUnread] = useState(true);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();
    const ws = useRef(null);

    useEffect(() => {
        if (chatOpen) setUnread(false);
    }, [chatOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const token = Cookies.get('access');
        if (!token) {
            navigate('/login');
            return;
        };

        ws.current = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

        ws.current.onopen = () => {
            console.log('✅ WebSocket подключен');
        };

        ws.current.onmessage = (event) => {
            console.log('📩 Новое сообщение:', event.data);
            try {
                const data = JSON.parse(event.data);
                setMessages(prev => [...prev, data]);
            } catch (error) {
                console.error('❌ Ошибка парсинга данных WebSocket:', error);
            }
        };

        ws.current.onclose = (event) => {
            console.warn('❌ WebSocket отключен:', event.reason);
        };

        ws.current.onerror = (error) => {
            console.error('⚠️ Ошибка WebSocket:', error);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.error('🚫 WebSocket не подключен. Сообщение не отправлено.');
            return;
        }

        const messageData = {
            text: newMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString().slice(0, 5),
        };

        ws.current.send(JSON.stringify(messageData));
        setMessages(prev => [...prev, messageData]);
        setNewMessage('');
    };

    const deleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text);
        alert('Скопировано!');
    };

    return (
        <div>
            <div className="chat-icon" onClick={() => setChatOpen(!chatOpen)}>
                <FiMessageSquare size={30} />
                {unread && <span className="chat-notification">1</span>}
            </div>

            {chatOpen && (
                <div className={`chat ${chatOpen ? 'open' : ''}`}>
                    <div className="chat-header">
                        <h3>Administration</h3>
                        <FiX onClick={() => setChatOpen(false)} size={25} />
                    </div>
                    <div className="chat-blok">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                <div className="chat-info">
                                    <span><FiClock /> {msg.time}</span>
                                    <FiCornerDownLeft onClick={() => alert('Ответить')} />
                                    <FiCopy onClick={() => copyMessage(msg.text)} />
                                    <FiTrash2 onClick={() => deleteMessage(msg.id)} />
                                    {msg.sender === 'me' && <FiCheck color='green' />}
                                </div>
                                <div ref={chatEndRef}></div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <form onSubmit={sendMessage}>
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                            <button type="submit"><IoSend className='chat-footer__icon' /></button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};