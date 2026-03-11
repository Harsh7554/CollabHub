"use client";

import React, { useState, useMemo } from "react";

export default function NotificationsPage() {
  // 1. Expanded Mock Data (Added 'type' for icons)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "user",
      title: "New Creator Registration",
      message: "Sara Smith has joined the platform as an Influencer.",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "campaign",
      title: "Campaign Submitted",
      message: "Brand XYZ submitted a new 'Summer Vibes' campaign for review.",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₹45,000 received for campaign TX-1005.",
      time: "1 hour ago",
      read: true
    },
    {
      id: 4,
      type: "alert",
      title: "Action Required",
      message: "You have 3 pending user approvals waiting in the queue.",
      time: "3 hours ago",
      read: false
    }
  ]);

  // 2. State for Toolbar
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // --- Functions --- //

  // Mark single notification as read
  const markRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const markAllRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((n) => n.id !== id)
    );
  };

  // 3. Derived State: Filtering & Unread Count
  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase()))
      .filter((n) => {
        if (filter === "read") return n.read;
        if (filter === "unread") return !n.read;
        return true;
      });
  }, [notifications, search, filter]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Helper function to render the right icon/color based on notification type
  const getIconData = (type) => {
    switch (type) {
      case 'user': return { icon: "👤", bg: "bg-indigo-100", color: "text-indigo-600" };
      case 'campaign': return { icon: "📢", bg: "bg-teal-100", color: "text-teal-600" };
      case 'payment': return { icon: "₹", bg: "bg-emerald-100", color: "text-emerald-600" };
      case 'alert': return { icon: "⚠️", bg: "bg-rose-100", color: "text-rose-600" };
      default: return { icon: "🔔", bg: "bg-slate-100", color: "text-slate-600" };
    }
  };

  return (
    <div className="space-y-6">

      {/* Header & Global Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-indigo-950">Notifications</h1>
          {/* Unread Badge */}
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              {unreadCount} New
            </span>
          )}
        </div>

        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
            ${unreadCount > 0 
              ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent"
            }`}
        >
          Mark All as Read
        </button>
      </div>

      {/* Toolbar: Search + Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search notifications..."
          className="w-full sm:w-80 border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full sm:w-auto bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {filteredNotifications.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl mb-3">📭</div>
            <h3 className="text-lg font-semibold text-indigo-950">All Caught Up!</h3>
            <p className="text-slate-500 text-sm mt-1">You have no notifications matching this criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((n) => {
              const iconData = getIconData(n.type);
              
              return (
                <div
                  key={n.id}
                  className={`p-5 flex flex-col sm:flex-row justify-between items-start gap-4 transition-colors
                    ${!n.read ? "bg-teal-50/30 border-l-4 border-l-teal-500" : "bg-white border-l-4 border-l-transparent hover:bg-slate-50"}
                  `}
                >
                  
                  {/* Notification Content */}
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg mt-0.5 ${iconData.bg} ${iconData.color}`}>
                      {iconData.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm ${!n.read ? "font-bold text-indigo-950" : "font-semibold text-slate-800"}`}>
                          {n.title}
                        </h3>
                        {/* Unread dot indicator for mobile */}
                        {!n.read && <span className="w-2 h-2 rounded-full bg-teal-500 sm:hidden"></span>}
                      </div>
                      <p className={`text-sm mt-1 leading-snug ${!n.read ? "text-slate-700" : "text-slate-500"}`}>
                        {n.message}
                      </p>
                      <span className="text-xs text-slate-400 mt-2 block font-medium">
                        {n.time}
                      </span>
                    </div>
                  </div>

                  {/* Actions (Buttons) */}
                  <div className="flex items-center gap-2 sm:mt-0 mt-3 self-end sm:self-center">
                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-teal-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-teal-50 border border-transparent hover:border-teal-100 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="text-rose-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}