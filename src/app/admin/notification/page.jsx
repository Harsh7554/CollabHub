"use client";
import { useState } from "react";

export default function Notifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Creator Registration",
      message: "A new creator has joined the platform.",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Campaign Submitted",
      message: "Brand XYZ submitted a new campaign.",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment received for campaign #1023.",
      time: "1 hour ago",
      read: true
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Mark as read
  const markRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
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

  // Filter logic
  const filteredNotifications = notifications
    .filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((n) => {
      if (filter === "read") return n.read;
      if (filter === "unread") return !n.read;
      return true;
    });

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-semibold text-gray-800">
          Notifications
        </h1>

        <button
          onClick={markAllRead}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Mark All as Read
        </button>

      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search notifications..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

      </div>

      {/* Notification List */}
      <div className="bg-white shadow rounded-lg divide-y">

        {filteredNotifications.length === 0 && (
          <p className="p-6 text-gray-500">
            No notifications found.
          </p>
        )}

        {filteredNotifications.map((n) => (

          <div
            key={n.id}
            className={`p-5 flex justify-between items-start ${
              !n.read ? "bg-blue-50" : ""
            }`}
          >

            {/* Notification Content */}
            <div>

              <h3 className="font-semibold text-gray-800">
                {n.title}
              </h3>

              <p className="text-gray-600 text-sm mt-1">
                {n.message}
              </p>

              <span className="text-xs text-gray-400">
                {n.time}
              </span>

            </div>

            {/* Actions */}
            <div className="flex gap-2">

              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="text-green-600 text-sm"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}