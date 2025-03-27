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
        const token = Cookies.get("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        ws.current = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({ action: "get_chats" }));
            ws.current.send(JSON.stringify({ action: "get_messages", chat_id: chatId }));
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.chats) {
                    setChats(data.chats);
                } else if (data.type === "messages") {
                    setMessages(data.messages);
                } else if (data.type === "message" && data.chat_id === Number(chatId)) {
                    setMessages((prev) => [...prev, data]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
                setLoading(false);
            }
        };

        return () => ws.current?.close();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectChat = (chat) => {
        navigate(`/admin/chat/${chat.id}`);
        setLoading(true);
    };

    const sendMessage = () => {
        if (!input.trim() || !ws.current) return;

        const message = { action: "send_message", message: input, author: "Administration", chat_id: chatId };
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
                                <p
                                    key={chat.id}
                                    onClick={() => handleSelectChat(chat)}
                                    className={chatId === String(chat.id) ? "active" : ""}
                                >
                                    {chat.customer_username} - {chat.product_name || "Без продукта"}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div className="chat-window">
                    <div className="admin-blok__header">
                        <h3>Чат с {currentChat ? currentChat.customer_username : "Неизвестным пользователем"}</h3>
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