import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiCheck, FiClock, FiTrash2, FiCopy, FiCornerDownLeft } from 'react-icons/fi';
import { IoSend } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Chat() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Привет! Как я могу помочь?', sender: 'admin', time: '10:30', status: 'просмотрено' },
        { id: 2, text: 'Добрый день! У меня вопрос.', sender: 'me', time: '10:32', status: 'отправлено' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [unread, setUnread] = useState(true);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatOpen) setUnread(false);
    }, [chatOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString().slice(0, 5),
            status: 'отправлено'
        }]);
        setNewMessage('');
    };

    const deleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text);
        alert('Скопировано!');
    };

    return (
        <div>
            <div className="chat-icon" onClick={() => setChatOpen(!chatOpen)}>
                <FiMessageSquare size={30} />
                {unread && <span className="chat-notification">1</span>}
            </div>

            {chatOpen && (
                <div className={`chat ${chatOpen ? 'open' : ''}`}>
                    <div className="chat-header">
                        <h3>Administration</h3>
                        <FiX onClick={() => setChatOpen(false)} size={25} />
                    </div>
                    <div className="chat-blok">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                <div className="chat-info">
                                    <span><FiClock /> {msg.time}</span>
                                    <FiCornerDownLeft onClick={() => alert('Ответить')} />
                                    <FiCopy onClick={() => copyMessage(msg.text)} />
                                    <FiTrash2 onClick={() => deleteMessage(msg.id)} />
                                    {msg.sender === 'me' && (msg.status === 'просмотрено' ? <FiCheck color='green' /> : <FiCheck />)}
                                </div>
                                <div ref={chatEndRef}></div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <form onSubmit={sendMessage}>
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                            <button type="submit"><IoSend className='chat-footer__icon' /></button>
                            <button type="submit"><MdOutlineFileUpload className='chat-footer__icon' /></button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};