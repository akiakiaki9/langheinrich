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
    
        wsMessages.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Получены данные WebSocket:", data);
    
                if (data.history) {
                    console.log(`Получена история сообщений для чата ${chatId}`, data.history);
                    setMessages(data.history);
                } else if (data.type === "message" && data.chat_id === Number(chatId)) {
                    console.log("Новое сообщение добавлено в чат...");
                    setMessages((prev) => [...prev, data]);
                }
    
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при обработке сообщений:", error);
                setLoading(false);
            }
        };
    
        wsMessages.current.onerror = (error) => {
            console.error("Ошибка WebSocket:", error);
        };
    
        wsMessages.current.onclose = () => {
            console.log("WebSocket соединение закрыто.");
        };
    
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

    const sendMessage = () => {
        if (!input.trim()) return;
    
        if (!wsMessages.current || wsMessages.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket закрыт. Сообщение не отправлено.");
            return;
        }
    
        const message = {
            action: "send_message",
            content: input,
            author: "Administration",
            chat_id: chatId,
            time: new Date().toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short"
            }).replace(",", "")
        };
    
        console.log("Отправляем сообщение:", message);
    
        wsMessages.current.send(JSON.stringify(message));
        setInput("");
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
                            messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.author === "Administration" ? "admin" : "client"}`}>
                                    <p>{msg.content}</p>
                                    <p className="chat-blok__time">{msg.time}</p>
                                </div>
                            ))
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