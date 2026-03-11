"use client";

import { useState } from "react";

export default function Users() {

  const [users, setUsers] = useState([
    { id: 1, name: "John", email: "john@gmail.com", role: "Brand", active: true },
    { id: 2, name: "Sara", email: "sara@gmail.com", role: "Influencer", active: true },
    { id: 3, name: "Mike", email: "mike@gmail.com", role: "Brand", active: false },
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-semibold text-gray-800">
          Users
        </h1>

        <div className="flex gap-3">

          {/* Search */}
          <input
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Add User Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            Add User
          </button>

        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-gray-50 text-gray-600 text-sm">

            <tr>
              <th className="text-left p-5">User</th>
              <th className="text-left p-5">Email</th>
              <th className="text-left p-5">Role</th>
              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Actions</th>
            </tr>

          </thead>

          {/* Table Body */}
          <tbody className="text-sm text-gray-700">

            {users.map((user) => (

              <tr key={user.id} className="border-t hover:bg-gray-50 transition">

                {/* User */}
                <td className="p-5 flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                    {user.name.charAt(0)}
                  </div>

                  {user.name}

                </td>

                {/* Email */}
                <td className="p-5">
                  {user.email}
                </td>

                {/* Role */}
                <td className="p-5">
                  {user.role}
                </td>

                {/* Status */}
                <td className="p-5">

                  <span
                    className={`px-2 py-1 rounded-md text-xs
                    ${user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>

                </td>

                {/* Actions */}
                <td className="p-5 flex gap-3">

                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 text-xs rounded text-white
                      ${user.active
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                      }`}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}