"use client";

import { useState } from 'react';

export default function ChatbotPage(){
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessages([...messages, inputValue]);
        setInputValue('');
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};