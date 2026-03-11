"use client";

import React, { useState, useEffect, useRef } from "react";

export default function MessagesPage() {
  // 1. Mock Data Setup
  const conversations = [
    { id: 1, name: "John Doe", role: "Brand", avatar: "JD", color: "bg-indigo-500" },
    { id: 2, name: "Sara Smith", role: "Influencer", avatar: "SS", color: "bg-rose-500" },
    { id: 3, name: "Mike Johnson", role: "Brand", avatar: "MJ", color: "bg-teal-500" },
  ];

  // Store messages in a dictionary mapped by conversation ID
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "user", text: "Hello, I want to discuss a campaign.", time: "10:00 AM" },
      { id: 2, sender: "admin", text: "Sure, please share the campaign details.", time: "10:05 AM" },
    ],
    2: [
      { id: 1, sender: "user", text: "Did you approve my latest draft?", time: "Yesterday" },
    ],
    3: [],
  });

  // 2. Component State
  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // 3. Functions

  // Auto-scroll to the bottom of the chat when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChatId]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender: "admin",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    setInput("");
  };

  // Allow sending messages by pressing the 'Enter' key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 4. Derived Data
  const activeChat = conversations.find(c => c.id === activeChatId);
  const activeMessages = messages[activeChatId] || [];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-950">Messages</h1>
        <p className="text-slate-500 mt-1">Communicate directly with brands and influencers.</p>
      </div>

      {/* Chat Application Layout */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* --- Sidebar: Conversation List --- */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex flex-col h-64 md:h-auto">
          <div className="p-4 border-b border-slate-200 bg-white">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm transition-all"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 cursor-pointer transition-colors flex items-center gap-3
                  ${activeChatId === chat.id 
                    ? "bg-white border-l-4 border-l-teal-500 shadow-sm" 
                    : "hover:bg-slate-100 border-l-4 border-l-transparent"
                  }
                `}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${chat.color}`}>
                  {chat.avatar}
                </div>
                {/* Name & Role */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-indigo-950 truncate">{chat.name}</h3>
                  <p className="text-xs text-slate-500 truncate">{chat.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Main Chat Window --- */}
        <div className="w-full md:w-2/3 flex flex-col bg-white h-[500px] md:h-auto">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-white z-10 shadow-sm">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${activeChat.color}`}>
              {activeChat.avatar}
            </div>
            <div>
              <h2 className="text-indigo-950 font-semibold">{activeChat.name}</h2>
              <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full font-medium border border-teal-100">
                {activeChat.role}
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
            {activeMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No messages yet. Start the conversation!
              </div>
            ) : (
              activeMessages.map((msg) => {
                const isAdmin = msg.sender === "admin";
                return (
                  <div key={msg.id} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                    <div 
                      className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm
                        ${isAdmin 
                          ? "bg-teal-500 text-white rounded-br-none" 
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })
            )}
            {/* Empty div to act as the scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-slate-200 flex gap-3 items-center">
            <input
              type="text"
              placeholder={`Reply to ${activeChat.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="bg-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors shadow-sm"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}