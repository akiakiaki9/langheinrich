import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function AdminPanel() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { chatId } = useParams();

    useEffect(() => {
        const token = Cookies.get("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const ws = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

        ws.onopen = () => ws.send(JSON.stringify({ action: "get_chats" }));
        
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.chats) setChats(data.chats);
            } catch (error) {
                console.error("Ошибка при получении чатов:", error);
            } finally {
                setLoading(false);
            }
        };

        return () => ws.close();
    }, []);

    const handleSelectChat = (chat) => {
        navigate(`/admin/chat/${chat.id}`);
    };

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
                    <p className="select-chat-message">Выберите чат для начала общения</p>
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