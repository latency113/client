// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block py-2 px-4 rounded transition duration-300 ${
                isActive ? "bg-gray-700 text-white font-bold" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/concert"
            className={({ isActive }) =>
              `block py-2 px-4 rounded transition duration-300 ${
                isActive ? "bg-gray-700 text-white font-bold" : "hover:bg-gray-700"
              }`
            }
          >
            Manage Concert
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block py-2 px-4 rounded transition duration-300 ${
                isActive ? "bg-gray-700 text-white font-bold" : "hover:bg-gray-700"
              }`
            }
          >
            Manage Users
          </NavLink>
        </li>
        {/* Example of a logout link (requires handling the logout logic) */}
        <li>
          <NavLink
            to="/logout" // Replace with your logout route
            className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-700"
            onClick={() => {
              // Handle logout logic here (e.g., clear tokens, redirect)
              localStorage.removeItem("token"); //Example
            }}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;