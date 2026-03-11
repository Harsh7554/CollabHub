"use client";

import { useState } from "react";

export default function Messages() {

  const [conversations] = useState([
    { id: 1, name: "John (Brand)" },
    { id: 2, name: "Sara (Influencer)" },
    { id: 3, name: "Mike (Brand)" }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "John", text: "Hello, I want to discuss a campaign." },
    { id: 2, sender: "Admin", text: "Sure, please share the campaign details." }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), sender: "Admin", text: input }
    ]);

    setInput("");
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Messages
      </h1>

      {/* Chat Layout */}
      <div className="grid grid-cols-12 bg-white rounded-xl shadow-sm border overflow-hidden">

        {/* Conversation List */}
        <div className="col-span-4 border-r">

          <div className="p-4 border-b font-semibold">
            Conversations
          </div>

          <div className="divide-y">

            {conversations.map((chat) => (

              <div
                key={chat.id}
                className="p-4 hover:bg-gray-50 cursor-pointer text-sm"
              >
                {chat.name}
              </div>

            ))}

          </div>

        </div>

        {/* Chat Window */}
        <div className="col-span-8 flex flex-col">

          {/* Chat Header */}
          <div className="p-4 border-b font-semibold">
            John (Brand)
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto h-[400px]">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`max-w-xs p-3 rounded-lg text-sm
                ${msg.sender === "Admin"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"}
                `}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>

            ))}

          </div>

          {/* Message Input */}
          <div className="p-4 border-t flex gap-3">

            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}