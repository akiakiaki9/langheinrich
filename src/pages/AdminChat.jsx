import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsSendFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function AdminChat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const wsChats = useRef(null);
    const wsMessages = useRef(null);

    useEffect(() => {
        const token = Cookies.get("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        console.log("Инициализация WebSocket для списка чатов...");
        wsChats.current = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

        wsChats.current.onopen = () => {
            console.log("WebSocket для чатов открыт, запрос списка чатов...");
            wsChats.current.send(JSON.stringify({ action: "get_chats" }));
        };

        wsChats.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.chats) {
                    console.log("Получен список чатов", data.chats);
                    setChats(data.chats);
                }
            } catch (error) {
                console.error("Ошибка при обработке чатов:", error);
            }
        };

        return () => {
            console.log("Закрытие WebSocket для списка чатов...");
            wsChats.current?.close();
        };
    }, []);

    useEffect(() => {
        if (!chatId) return;

        const token = Cookies.get("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        console.log(`Инициализация WebSocket для сообщений чата ${chatId}...`);
        wsMessages.current = new WebSocket(`wss://macalistervadim.site/ws/chat/room/${chatId}/?token=${token}`);

        wsMessages.current.onopen = () => {
            console.log(`WebSocket открыт. Запрашиваем историю сообщений...`);
            wsMessages.current.send(JSON.stringify({ action: "get_messages", chat_id: chatId }));
        };

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
                        time: new Date(msg.timestamp).toLocaleTimeString().slice(0, 5),
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

        wsMessages.current.onerror = (error) => { console.error("Ошибка WebSocket:", error) };
        wsMessages.current.onclose = () => { console.log("WebSocket соединение закрыто.") };

        return () => {
            console.log(`Закрытие WebSocket для сообщений чата ${chatId}...`);
            wsMessages.current?.close();
        };
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectChat = (chat) => {
        navigate(`/admin/chat/${chat.id}`);
        setLoading(true);
    };

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

    const currentChat = chats.find((chat) => String(chat.id) === chatId);

    return (
        <div className="admin full-screen">
            <div className="admin-panel">
                <div className="chat-list">
                    <h3>Чаты</h3>
                    {loading ? (
                        <div className='loading'><div className='loader'></div></div>
                    ) : (
                        <div className="chat-list__items">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleSelectChat(chat)}
                                    className={chatId === String(chat.id) ? "active" : ""}
                                >
                                    <p className="chat-list__items-author">{chat.customer_username}</p>
                                    <p className="chat-list__items-message">{chat.last_message || ""}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="chat-window">
                    <div className="admin-blok__header">
                        <h3>Чат с {currentChat ? currentChat.customer_username : "?Undefined"}</h3>
                        <RiArrowGoBackLine onClick={() => navigate("/admin")} />
                    </div>
                    <div className="admin-blok__list">
                        {loading ? (
                            <div className='loading'><div className='loader'></div></div>
                        ) : (
                            <div>
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
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="admin-blok__input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Введите сообщение..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            disabled={loading}
                        />
                        <BsSendFill onClick={sendMessage} />
                    </div>
                </div>
            </div>
            <Link to="/">
                <p className="admin__home">
                    HOME <RiArrowGoBackLine />
                </p>
            </Link>
        </div>
    );
};