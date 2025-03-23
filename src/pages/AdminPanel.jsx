import React, { useState, useEffect, useRef } from 'react';
import { RiArrowGoBackLine } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AdminPanel() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [unreadMessages] = useState({});
    const messagesEndRef = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        if (selectedChat) {
            const token = Cookies.get('access');
            ws.current = new WebSocket(`wss://macalistervadim.site/ws/admin/?token=${token}`);

            ws.current.onopen = () => console.log("WebSocket connected");
            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages(prev => [...prev, data]);
            };
            ws.current.onerror = (error) => console.error("WebSocket Error: ", error);
            ws.current.onclose = () => console.log("WebSocket disconnected");
        }

        return () => ws.current?.close();
    }, [selectedChat]);

    const sendMessage = () => {
        if (input.trim() && ws.current) {
            const message = { text: input, sender: 'admin', chatId: selectedChat };
            ws.current.send(JSON.stringify(message));
            setMessages(prev => [...prev, message]);
            setInput('');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            }
        }, 100);
    }, [messages]);

    return (
        <div>
            <div className='admin full-screen'>
                <div className="admin-panel">
                    <div className={`chat-list ${selectedChat !== null ? "hidden" : ""}`}>
                        <h3>Chats</h3>
                        <div className="chat-list__items">
                            {[1, 2, 3, 4, 5].map(chat => (
                                <p key={chat} onClick={() => setSelectedChat(chat)}>
                                    Chat {chat} {unreadMessages[chat] > 0 && <span className="unread-count">{unreadMessages[chat]}</span>}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className={`chat-window ${selectedChat !== null ? "active" : ""}`}>
                        {selectedChat === null ? (
                            <p className="select-chat-message">Select a chat to start messaging</p>
                        ) : (
                            <>
                                <div className="admin-blok__header">
                                    <h3>Chat {selectedChat}</h3>
                                    <RiArrowGoBackLine onClick={() => setSelectedChat(null)} />
                                </div>
                                <div className="admin-blok__list" ref={messagesEndRef}>
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`message ${msg.sender}`}>
                                            <p>{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="admin-blok__input">
                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                                    <BsSendFill onClick={sendMessage} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Link to='/'><p className='admin__home'>HOME <RiArrowGoBackLine /></p></Link>
            </div>
        </div>
    );
};