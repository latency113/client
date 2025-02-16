import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black h-full min-h-screen p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">บัญชีของฉัน</h2>
      <ul>
        <li>
          <NavLink
            to="/profile"
            className="block py-2 px-4 hover:bg-gray-700 rounded hover:text-white"
          >
            จัดการโปรไฟล์
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/tickets"
            className="block py-2 px-4 hover:bg-gray-700 rounded hover:text-white"
          >
            บัตรของฉัน
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
