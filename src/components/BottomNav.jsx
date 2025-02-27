import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiUser,
  FiTag,
} from "react-icons/fi"; // ใช้ React Icons
import { IoTicketOutline } from "react-icons/io5";


const BottomNav = () => {
  return (
    <>
      <div className="md:hidden mt-[10%]">
        <div className="fixed bottom-0 left-0 w-full bg-white md:hidden ">
          <div className="flex justify-around py-3 ">
            {/* ข่าวสาร */}
            <NavLink
              to="/about"
              className="flex flex-col items-center text-blue-500 hover:text-blue-700"
              activeClassName="text-red-500"
            >
              <FiFileText size={24} />
              <span className="text-xs mt-1">เกี่ยวกับ</span>
            </NavLink>

            <NavLink
              to="/concert"
              className="flex flex-col items-center text-blue-500 hover:text-blue-700"
              activeClassName="text-red-500"
            >
              <IoTicketOutline  size={24} />
              <span className="text-xs mt-1">ซื้อตั๋วเลย</span>
            </NavLink>


            {/* หน้าแรก */}
            <NavLink to="/" className="flex flex-col items-center text-blue-500 hover:text-blue-700">
              <FiHome size={24} />
              <span className="text-xs mt-1">หน้าแรก</span>
            </NavLink>

            {/* คูปอง */}
            <NavLink
              to="/user/tickets"
              className="flex flex-col items-center text-blue-500 hover:text-blue-700"
              activeClassName="text-red-500"
            >
              <FiTag size={24} />
              <span className="text-xs mt-1">ตั๋วคอนเสิร์ต</span>
            </NavLink>

            {/* โปรไฟล์ */}
            <NavLink
              to="/profile"
              className="flex flex-col items-center text-blue-500 hover:text-blue-700"
              activeClassName="text-red-500"
            >
              <FiUser size={24} />
              <span className="text-xs mt-1">โปรไฟล์</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
