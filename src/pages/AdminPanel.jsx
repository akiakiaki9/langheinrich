import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import Cookies from "js-cookie";

export default function AdminPanel() {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
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
            console.log("WebSocket подключен");
            ws.current.send(JSON.stringify({ action: "get_chats" }));
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("WebSocket данные:", data);

                if (data.chats) {
                    setChats(data.chats);
                } else if (data.type === "messages" && selectedChat?.id === data.chat_id) {
                    setMessages(data.messages); // Загружаем историю чата
                } else if (data.type === "message" && selectedChat?.id === data.chat_id) {
                    setMessages((prev) => [...prev, data]); // Добавляем новое сообщение
                }
            } catch (error) {
                console.error("Ошибка при обработке WebSocket-сообщения:", error);
            }
        };

        ws.current.onerror = (error) => console.error("Ошибка WebSocket:", error);
        ws.current.onclose = () => console.log("WebSocket отключен");

        return () => ws.current?.close();
    }, []);

    useEffect(() => {
        if (!selectedChat) return;

        // Очищаем предыдущие сообщения перед загрузкой новых
        setMessages([]);

        // Запрашиваем историю сообщений для выбранного чата
        ws.current.send(JSON.stringify({ action: "get_messages", chat_id: selectedChat.id }));

    }, [selectedChat]);

    useEffect(() => {
        // Скроллим вниз при добавлении новых сообщений
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const selectChat = (chat) => {
        setSelectedChat(chat);
    };

    const sendMessage = () => {
        if (!input.trim() || !ws.current || !selectedChat) return;

        const message = {
            action: "send_message",
            text: input,
            sender: "admin",
            chat_id: selectedChat.id
        };

        ws.current.send(JSON.stringify(message));
        setMessages((prev) => [...prev, message]);
        setInput("");
    };

    return (
        <div className="admin full-screen">
            <div className="admin-panel">
                {/* Список чатов */}
                <div className={`chat-list ${selectedChat ? "hidden" : ""}`}>
                    <h3>Чаты</h3>
                    <div className="chat-list__items">
                        {chats.map((chat) => (
                            <p key={chat.id} onClick={() => selectChat(chat)}>
                                {chat.customer_username} - {chat.product_name || "Без продукта"}
                                {chat.last_message && <span> ({chat.last_message})</span>}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Окно сообщений */}
                <div className={`chat-window ${selectedChat ? "active" : ""}`}>
                    {!selectedChat ? (
                        <p className="select-chat-message">Выберите чат для начала общения</p>
                    ) : (
                        <>
                            <div className="admin-blok__header">
                                <h3>Чат с {selectedChat.customer_username}</h3>
                                <RiArrowGoBackLine onClick={() => setSelectedChat(null)} />
                            </div>
                            <div className="admin-blok__list">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender}`}>
                                        <p>{msg.text}</p>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="admin-blok__input">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Введите сообщение..."
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                />
                                <BsSendFill onClick={sendMessage} />
                            </div>
                        </>
                    )}
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