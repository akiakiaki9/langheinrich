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
    const ws = useRef(null);

    useEffect(() => {
        console.log("Инициализация WebSocket...");
        const token = Cookies.get("access");
        if (!token) {
            console.warn("Токен не найден, редирект на /login");
            window.location.href = "/login";
            return;
        }

        ws.current = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

        ws.current.onopen = () => {
            console.log("WebSocket открыт, запрос чатов и сообщений...");
            ws.current.send(JSON.stringify({ action: "get_chats" }));
            ws.current.send(JSON.stringify({ action: "get_messages", chat_id: chatId }));
        };

        ws.current.onmessage = (event) => {
            console.log("Получены данные из WebSocket:", event.data);
            try {
                const data = JSON.parse(event.data);
                if (data.chats) {
                    console.log("Обновление списка чатов...");
                    setChats(data.chats);
                } else if (data.history) {
                    console.log("Обновление истории чата...");
                    setMessages(data.history);
                } else if (data.type === "message" && data.chat_id === Number(chatId)) {
                    console.log("Новое сообщение добавлено в чат...");
                    setMessages((prev) => [...prev, data]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при обработке сообщения WebSocket:", error);
                setLoading(false);
            }
        };

        return () => {
            console.log("Закрытие WebSocket...");
            ws.current?.close();
        };
    }, [chatId]);

    useEffect(() => {
        console.log("Прокрутка вниз после обновления сообщений...");
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectChat = (chat) => {
        console.log("Выбран чат:", chat);
        navigate(`/admin/chat/${chat.id}`);
        setLoading(true);
    };

    const sendMessage = () => {
        if (!input.trim() || !ws.current) {
            console.warn("Сообщение не отправлено: пустой ввод или WebSocket закрыт");
            return;
        }

        const message = { action: "send_message", message: input, author: "Administration", chat_id: chatId };
        console.log("Отправка сообщения:", message);
        ws.current.send(JSON.stringify(message));
        setMessages((prev) => [...prev, message]);
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
                                <div key={index} className={`message ${msg.sender}`}>
                                    <p>{msg.text}</p>
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