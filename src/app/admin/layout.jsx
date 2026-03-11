"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Array of links makes it easy to manage and apply active states cleanly
  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Campaigns", href: "/admin/campaigns" },
    { name: "Transactions", href: "/admin/transactions" },
    { name: "Reports", href: "/admin/reports" },
    { name: "Messages", href: "/admin/messages" },
    { name: "Notifications", href: "/admin/notification" }, // Note: Make sure your folder is named 'notifications' (plural)
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm md:hidden z-20 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - Deep Indigo */}
      <aside
        className={`fixed md:static bg-indigo-950 text-slate-100 w-64 h-full z-30 flex flex-col shadow-2xl
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo / Title */}
        <div className="px-6 py-5 border-b border-indigo-900/50 flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-wide text-white">
            <span className="text-teal-400">Admin</span> Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)} // Closes menu on mobile when a link is clicked
                className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-indigo-800 text-teal-400 border-l-4 border-teal-400 shadow-md"
                    : "text-slate-300 hover:bg-indigo-800/50 hover:text-white border-l-4 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions (Logout) */}
        <div className="p-4 border-t border-indigo-900/50">
          <Link
            href="/login"
            className="block w-full text-center px-4 py-2 rounded-lg text-rose-400 font-medium hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-slate-600 hover:text-indigo-600 focus:outline-none transition-colors"
            >
              ☰
            </button>
            <h2 className="text-lg font-semibold text-indigo-950 hidden sm:block">
              CollabHub Overview
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              A
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              Admin User
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-50">
          {children}
        </main>

      </div>
    </div>
  );
}