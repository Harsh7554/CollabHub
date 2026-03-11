"use client";

import React, { useState, useMemo } from "react";

export default function UsersPage() {
  // 1. State: Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@brandx.com", role: "Brand", active: true, joined: "2026-01-15" },
    { id: 2, name: "Sara Smith", email: "sara.creates@gmail.com", role: "Influencer", active: true, joined: "2026-02-10" },
    { id: 3, name: "Mike Johnson", email: "mike@startup.co", role: "Brand", active: false, joined: "2026-02-28" },
    { id: 4, name: "Alex Chen", email: "alex.admin@collabhub.com", role: "Admin", active: true, joined: "2025-11-01" },
  ]);

  // 2. State: UI Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // 3. State: Forms (Add & Edit)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Influencer" });
  const [editingUser, setEditingUser] = useState(null); // Holds the user being edited

  // --- Functions --- //

  // Filter users based on search and dropdown
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Handle Toggle Status (Activate / Deactivate)
  const toggleStatus = (id) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };

  // Handle Delete User
  const handleDelete = (id) => {
    if(confirm("Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Handle Add New User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userToAdd = {
      id: Date.now(),
      ...newUser,
      active: true,
      joined: new Date().toISOString().split('T')[0],
    };

    setUsers([userToAdd, ...users]);
    setNewUser({ name: "", email: "", role: "Influencer" });
    setIsAddModalOpen(false);
  };

  // Handle Update Existing User (Edit)
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email) return;

    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setEditingUser(null); // Close modal
  };

  // Get avatar color based on role
  const getAvatarColor = (role) => {
    switch(role) {
      case 'Admin': return 'bg-indigo-600';
      case 'Brand': return 'bg-teal-500';
      case 'Influencer': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Users</h1>
          <p className="text-slate-500 mt-1">Manage access, roles, and platform members.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-600 transition shadow-sm"
        >
          + Add User
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Brand">Brand</option>
          <option value="Influencer">Influencer</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">User Info</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Role</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Joined</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition">
                    
                    {/* User Info */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${getAvatarColor(user.role)}`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600 font-medium border border-slate-200 px-2 py-1 rounded bg-slate-50">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-sm text-slate-500">
                      {user.joined}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                        ${user.active ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions Column (Edit, Delete, Toggle) */}
                    <td className="py-4 px-6 flex items-center justify-end gap-3">
                      
                      {/* Edit Button */}
                      <button 
                        onClick={() => setEditingUser(user)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-rose-500 hover:text-rose-700 text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>

                      {/* Toggle Activate/Deactivate Button */}
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors border shadow-sm w-24 text-center
                          ${user.active 
                            ? "bg-white text-slate-600 border-slate-300 hover:bg-slate-50" // If active, button says "Deactivate"
                            : "bg-teal-500 text-white border-teal-600 hover:bg-teal-600"  // If inactive, button says "Activate"
                          }`}
                      >
                        {user.active ? "Deactivate" : "Activate"}
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Add User Modal --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-indigo-950">Add New User</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Role</label>
                <select 
                  value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="Influencer">Influencer</option>
                  <option value="Brand">Brand</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 shadow-sm transition">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Edit User Modal --- */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-indigo-950">Edit User Details</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" required value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" required value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Role</label>
                <select 
                  value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="Influencer">Influencer</option>
                  <option value="Brand">Brand</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}