import React, { useState, useEffect, useRef } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import { FaCheckDouble } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const AdminMessage = ({ text, time }) => (
    <div className="chat-blok__container-part-1">
        <p>{text}</p>
        <div className="chat-blok__container__footer">
            <p className="chat-time">{time}</p>
        </div>
    </div>
);

const UserMessage = ({ text, time, seen }) => (
    <div className="chat-blok__container-part-2">
        <p>{text}</p>
        <div className="chat-blok__container__footer">
            <p className="chat-time">{time}</p>
            <FaCheckDouble className={`chat-seen ${seen ? "seen" : ""}`} />
        </div>
    </div>
);

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you?", sender: "admin", time: "10:00 AM", seen: true },
        { text: "У меня вопрос есть!", sender: "user", time: "10:02 AM", seen: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const chatContainerRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            text: inputValue,
            sender: "user",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            seen: false
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    return (
        <div>
            <div className="chat__main" onClick={toggleChat}>
                <p className="chat__main-p">Chat</p>
                <IoChatboxEllipsesOutline className="chat__icon" />
            </div>
            {isOpen && (
                <div className="chat active">
                    <div className="chat-blok">
                        <div className="chat-blok__header">
                            <p>Administration</p>
                            <RiCloseLargeLine className="chat__close" onClick={toggleChat} />
                        </div>
                        <div className="chat-blok__container" ref={chatContainerRef}>
                            {messages.map((msg, index) =>
                                msg.sender === "admin" ? (
                                    <AdminMessage key={index} text={msg.text} time={msg.time} />
                                ) : (
                                    <UserMessage key={index} text={msg.text} time={msg.time} seen={msg.seen} />
                                )
                            )}
                        </div>
                        <form className="chat-blok__footer" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Enter message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                            />
                            <button type="submit"><BsSendFill className="chat-send" /></button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
