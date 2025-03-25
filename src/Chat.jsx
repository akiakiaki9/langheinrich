import React, { useState, useEffect, useRef } from 'react';
import { FiClock, FiTrash2, FiCopy } from 'react-icons/fi';
import { IoSend } from "react-icons/io5";
import { Link, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const chatEndRef = useRef(null);
    const ws = useRef(null);
    const [searchParams] = useSearchParams();
    const chatId = searchParams.get("chatId");

    useEffect(() => {
        const token = Cookies.get('access');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        ws.current = new WebSocket(`wss://macalistervadim.site/ws/chat/room/${chatId}/?token=${token}`);

        ws.current.onopen = () => console.log('✅ WebSocket подключен');

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.history) {
                    // Загрузка истории сообщений
                    const formattedMessages = data.history.map(msg => ({
                        id: msg.message_id,
                        text: msg.content,
                        sender: msg.author === "Administrator" ? "admin" : "user",
                        time: new Date(msg.timestamp).toLocaleTimeString().slice(0, 5)
                    }));
                    setMessages(formattedMessages);
                } else {
                    // Обработка нового сообщения
                    setMessages(prev => [...prev, { 
                        id: Date.now(), 
                        text: data.text, 
                        sender: 'user', 
                        time: new Date().toLocaleTimeString().slice(0, 5) 
                    }]);

                    if (data.product_id) {
                        setProductId(data.product_id);
                        setProductName(data.product_name || 'Неизвестный товар');
                    }
                }
            } catch (error) {
                console.error('❌ Ошибка парсинга WebSocket данных:', error);
            }
        };

        ws.current.onclose = (event) => console.warn('❌ WebSocket отключен:', event.reason);
        ws.current.onerror = (error) => console.error('⚠️ Ошибка WebSocket:', error);

        return () => ws.current?.close();
    }, [chatId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        const messageData = {
            text: newMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString().slice(0, 5),
            product_id: productId,
        };

        ws.current.send(JSON.stringify(messageData));
        setMessages(prev => [...prev, { ...messageData, id: Date.now() }]);
        setNewMessage('');
    };

    const deleteMessage = (id) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    };

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (!chatId) {
        return <h2>ErroR</h2>;
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <h3>Чат с админом</h3>
            </div>

            {productId && productName && (
                <div className="chat-product-link">
                    <Link to={`/store/product/${productId}`}>
                        <p className="chat-product-name">{productName}</p>
                    </Link>
                </div>
            )}

            <div className="chat-blok">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender}`}>
                        <p>{msg.text}</p>
                        <div className="chat-info">
                            <span><FiClock /> {msg.time}</span>
                            <FiCopy onClick={() => copyMessage(msg.text)} />
                            <FiTrash2 onClick={() => deleteMessage(msg.id)} />
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className="chat-footer">
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter message..."
                    />
                    <button type="submit">
                        <IoSend className="chat-footer__icon" />
                    </button>
                </form>
            </div>
        </div>
    );
};