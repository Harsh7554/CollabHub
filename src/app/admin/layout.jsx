"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-10"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`fixed md:static bg-[#0f172a] text-white w-64 h-full z-20
  transform ${open ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 transition-transform duration-300`}
>

  {/* Logo / Title */}
  <div className="px-6 py-5 border-b border-slate-700">
    <h1 className="text-xl font-semibold tracking-wide">
      Admin Panel
    </h1>
  </div>

  {/* Navigation */}
  <nav className="p-5 space-y-2 text-sm">

    <Link
      href="/admin/dashboard"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Dashboard
    </Link>

    <Link
      href="/admin/users"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Users
    </Link>

    <Link
      href="/admin/campaigns"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Campaigns
    </Link>

    <Link
      href="/admin/transactions"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Transactions
    </Link>

    <Link
      href="/admin/reports"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Reports
    </Link>
    <Link
      href="/admin/messages"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Messages
    </Link>
     <Link
      href="/admin/notification"
      className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
    >
      Notifications
    </Link>

  </nav>

</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl"
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold text-gray-700">
            Admin Dashboard
          </h2>

          <span className="text-sm text-gray-600">
            Admin
          </span>

        </header>

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}