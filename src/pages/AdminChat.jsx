import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsSendFill } from "react-icons/bs";
import Cookies from "js-cookie";

export default function AdminChat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
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
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        return () => ws.current?.close();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectChat = (chat) => {
        navigate(`/admin/chat/${chat.id}`);
    };

    const sendMessage = () => {
        if (!input.trim() || !ws.current) return;

        const message = { action: "send_message", text: input, sender: "admin", chat_id: chatId };
        ws.current.send(JSON.stringify(message));
        setMessages((prev) => [...prev, message]);
        setInput("");
    };

    return (
        <div className="admin full-screen">
            <div className="admin-panel">
                <div className="chat-list">
                    <h3>Чаты</h3>
                    {chats.map((chat) => (
                        <p
                            key={chat.id}
                            onClick={() => handleSelectChat(chat)}
                            className={chatId === String(chat.id) ? "active-chat" : ""}
                        >
                            {chat.customer_username} - {chat.product_name || "Без продукта"}
                        </p>
                    ))}
                </div>
                <div className="chat-window">
                    {chatId ? (
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                            <div className="chat-input">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Введите сообщение..."
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                />
                                <BsSendFill onClick={sendMessage} />
                            </div>
                        </div>
                    ) : (
                        <p className="select-chat-message">Error No Chat</p>
                    )}
                </div>
            </div>
        </div>
    );
};