import React, { useState, useEffect, useRef } from 'react';
import { RiArrowGoBackLine } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function AdminPanel() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'The message from client!', sender: 'client' },
        { id: 2, text: 'The message from myself!', sender: 'admin' },
    ]);
    const [input, setInput] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState({});
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages(prev => [...prev, { id: prev.length + 1, text: input, sender: 'admin' }]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const selectChat = (chatId) => {
        setSelectedChat(chatId);
        setUnreadMessages((prev) => ({ ...prev, [chatId]: 0 }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setMessages(prev => [...prev, { id: prev.length + 1, file: fileURL, fileName: file.name, sender: 'admin' }]);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            }
        }, 100);
    }, [messages, selectedChat]);

    return (
        <div>
            <div className='admin full-screen'>
                <div className="admin-panel">
                    <div className={`chat-list ${selectedChat !== null ? "hidden" : ""}`}>
                        <h3>Chats</h3>
                        <div className="chat-list__items">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(chat => (
                                <p
                                    key={chat}
                                    onClick={() => selectChat(chat)}
                                    className={selectedChat === chat ? "active" : ""}>
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
                                    <h3>ООО Покупатель НФС</h3>
                                    <RiArrowGoBackLine className="admin-blok__header-icon" onClick={() => setSelectedChat(null)} />
                                </div>
                                <div className="admin-blok__list" ref={messagesEndRef}>
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`message ${msg.sender}`}>
                                            {msg.text && <p>{msg.text}</p>}
                                            {msg.file && (
                                                msg.file.includes('image') ? <img src={msg.file} alt={msg.fileName} className='sent-image' /> :
                                                    <a href={msg.file} target="_blank" rel="noopener noreferrer">{msg.fileName}</a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="admin-blok__input">
                                    <label className="file-upload">
                                        <AiOutlinePlus className='file-upload-icon' />
                                        <input type="file" onChange={handleFileUpload} hidden />
                                    </label>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..." 
                                    />
                                    <BsSendFill className='admin-blok__input__icon' onClick={sendMessage} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Link to='/'><p className='admin__home'>HOME <RiArrowGoBackLine className='admin__home__icon' /></p></Link>
            </div>
        </div>
    );
};