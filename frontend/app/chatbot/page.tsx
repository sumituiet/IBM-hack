// app/page.tsx

'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'advisor'; text: string }[]
  >([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: inputText },
    ]);

    const question = inputText;
    setInputText('');
    setLoading(true);

    try {
      // Send POST request to the /query endpoint
      const response = await axios.post('http://localhost:8000/query', { question });

      // Add bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'advisor', text: response.data.answer },
      ]);
    } catch (error) {
      // Handle error
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'advisor', text: 'Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-h-screen text-yellow p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg flex flex-col h-[80vh] bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-center">Advisor</h1>

          {/* Chat Window */}
          <div className="flex-1 overflow-auto mb-4 p-4 bg-gray-700 rounded">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-4 flex justify-start">
                <div className="rounded-lg p-3 max-w-xs bg-gray-300 text-black">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border rounded-l"
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
