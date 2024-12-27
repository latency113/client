import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    return (
      <div className="w-64 bg-gray-800 text-white h-full min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/dashboard/orders"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/dashboard/settings"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-concert"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Add Concert
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

export default Sidebar
