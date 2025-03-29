import React, { useState, useEffect, useRef } from 'react';
import { IoSend, IoBackspaceOutline } from "react-icons/io5";
import { Link, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(true);
    const chatEndRef = useRef(null);
    const ws = useRef(null);
    const [searchParams] = useSearchParams();
    const chatId = searchParams.get("chatId");

    useEffect(() => {
        const token = Cookies.get('access');
        if (!token) {
            console.warn("⚠️ Токен отсутствует, перенаправление на /login");
            window.location.href = '/login';
            return;
        }

        const wsUrl = `wss://macalistervadim.site/ws/chat/room/${chatId}/?token=${token}`;
        console.log(`🔌 Подключение к WebSocket: ${wsUrl}`);
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => console.log('✅ WebSocket подключен');

        ws.current.onmessage = (event) => {
            console.log("📩 Получено сообщение:", event.data);
            try {
                const data = JSON.parse(event.data);

                if (data.history) {
                    console.log("🔄 Получена история сообщений:", data.history);
                    setMessages(data.history.map(msg => ({
                        id: msg.message_id,
                        text: msg.content,
                        sender: msg.author === "Administrator" ? "admin" : "me",
                        time: new Date().toLocaleString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "short"
                        }).replace(",", ""),
                    })));
                    setLoading(false);
                } else {
                    console.log("➕ Новое сообщение:", data);
                    setMessages(prev => [...prev, {
                        id: data.message_id || Date.now(),
                        text: data.message,
                        sender: data.author === "Administrator" ? "admin" : "me",
                        time: new Date().toLocaleTimeString().slice(0, 5),
                    }]);

                    if (data.product_id) {
                        console.log(`📦 Продукт в чате: ${data.product_name} (ID: ${data.product_id})`);
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

        return () => {
            console.log("🔌 Отключение WebSocket...");
            ws.current?.close();
        };
    }, [chatId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) {
            console.warn("⚠️ Пустое сообщение, отправка отменена.");
            return;
        }
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.warn("⚠️ WebSocket не подключен, сообщение не отправлено.");
            return;
        }

        const messageData = {
            message: newMessage,
            author: 'me',
            time: new Date().toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short"
            }).replace(",", ""),
            product_id: productId,
        };

        console.log("📤 Отправка сообщения:", messageData);
        ws.current.send(JSON.stringify(messageData));

        setMessages(prev => [...prev, { ...messageData, id: Date.now() }]);
        setNewMessage('');
        console.log("✅ Сообщение отправлено и добавлено в чат.");
    };

    if (!chatId) {
        console.error("❌ Ошибка: chatId отсутствует");
        return <h2>ErroR</h2>;
    }

    return (
        <div className="chat-main">
            <div className="chat-home">
                <Link to='/home'><IoBackspaceOutline className='chat-home__icon' /></Link>
            </div>
            <div className="chat">
                <div className="chat-header">
                    <h3>Чат с админом</h3>
                </div>

                {loading ? (
                    <div className='loading'><div className='loader'></div></div>
                ) : (
                    <>
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
                                    <p className="chat-blok__time">{msg.time}</p>
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>
                    </>
                )}

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
        </div>
    );
};