"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function FinancialChatbot() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
      return data.answer;
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
    <div className="flex flex-col h-screen">
      <Navbar/>
      {/* Header */}
      <header className="text-center py-4 text-xl font-semibold">
        Financial Assistant Chatbot
      </header>

      {/* Chat Section */}
      <div className="flex-grow flex flex-col items-center p-4 overflow-y-auto">
        <div className="w-full max-w-3xl rounded-lg p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {messages.length === 0 ? (
            <p className="text-center text-gray-700">
              Start a conversation with your financial assistant.
            </p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-2">
                {/* User Message */}
                <div className="flex justify-start">
                  <div className="border border-gray-300 text-gray-200 p-3 rounded-lg max-w-md shadow-md">
                    {message.user}
                  </div>
                </div>
                {/* Bot Response */}
                <div className="flex justify-end">
                  <div className="border border-gray-300 text-gray-200 p-3 rounded-lg max-w-md shadow-md">
                    <ReactMarkdown>{message.bot}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-3xl mx-auto px-4 pb-4"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow bg-white border text-gray-700 border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-200 transition"
        >
          Send
        </button>
      </form>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pb-4">
        <button
          className="py-2 px-6 border border-gray-300 font-semibold rounded-md hover:bg-gray-200 transition"
          onClick={() => (window.location.href = "/chatbot")}
        >
          Connect with Advisors
        </button>
        <button
          className="py-2 px-6 border border-gray-300 font-semibold rounded-md hover:bg-gray-200 transition"
          onClick={() => (window.location.href = "/local-banks")}
        >
          Find Local Banks
        </button>
      </div>
    </div>
  );
}
