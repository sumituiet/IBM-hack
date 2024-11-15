"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const sendMessage = async (question: string) => {
    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      const data = await response.json();
      return data.answer; // Extract the 'answer' from the QueryResponse
    } catch (error) {
      console.error("Error sending message:", error);
      return "Sorry, I couldn't connect to the server.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages([...messages, { user: userMessage, bot: "..." }]);
    setInputValue("");

    const botResponse = await sendMessage(userMessage);

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1].bot = botResponse;
      return updatedMessages;
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-1/4 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-xl font-semibold border-b border-gray-700 flex justify-between items-center">
            <span>Chat History</span>
            <button
              onClick={() => setIsSidebarVisible(false)}
              className="text-gray-300 hover:text-gray-100"
            >
              Hide
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-md">
                {message.user}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className={`flex flex-col ${isSidebarVisible ? "w-3/4" : "w-full"}`}>
        {/* Header */}
        <div className="bg-gray-700 text-white py-4 text-center text-xl font-semibold relative">
          {isSidebarVisible ? null : (
            <button
              onClick={() => setIsSidebarVisible(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
            >
              Show
            </button>
          )}
          Chatbot
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className="p-3 float-left rounded-lg bg-gray-300 text-gray-800 max-w-m self-start">
                {message.user}
              </div>
              <div className=" p-3 float-right rounded-lg bg-blue-500 max-w-l text-white self-end">
              <ReactMarkdown>{message.bot}</ReactMarkdown>

              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-4 border-t border-gray-300"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow border bg-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
