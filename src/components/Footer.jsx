import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Footer - ซ่อนในมือถือ, แสดงเฉพาะจอขนาดกลางขึ้นไป */}
      <div className="hidden md:block bg-white py-12 px-6">
        <div className="container mx-auto flex justify-between gap-8 text-md md:grid-cols-4 md:text-left text-center ">
          {/* Logo + Social Media */}
          <div>
            <h1 className="text-2xl font-bold text-blue-500">CONHUB</h1>
            <p className="mt-2">Follow Us</p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook cursor-pointer hover:text-blue-600 transition"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram cursor-pointer hover:text-pink-500 transition"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>

          {/* เมนูหลัก */}
          <div>
            <h1 className="text-lg font-semibold text-blue-700">รายการหลัก</h1>
            <ul className="space-y-3 text-sm mt-2">
              <li>
                <NavLink to="/news" className="hover:text-blue-500">
                  ข่าวสารวงการเพลง
                </NavLink>
              </li>
              <li>
                <NavLink to="/concert" className="hover:text-blue-500">
                  คอนเสิร์ตทั้งหมด
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-500">
                  ภาพกิจกรรม
                </NavLink>
              </li>
            </ul>
          </div>

          {/* เกี่ยวกับเรา */}
          <div>
            <h1 className="text-lg font-semibold text-blue-700">เกี่ยวกับเรา</h1>
            <ul className="space-y-3 text-sm mt-2">
              <li>
                <NavLink to="#" className="hover:text-blue-500">
                  เกี่ยวกับเรา
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-500">
                  ข้อกำหนดการให้บริการ
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-500">
                  นโยบายความเป็นส่วนตัว
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ฝ่ายประชาสัมพันธ์ */}
          <div>
            <h1 className="text-lg font-semibold text-blue-700">
              ฝ่ายประชาสัมพันธ์
            </h1>
            <div className="text-sm space-y-3 mt-2 text-blue-500">
              <p>Tel.090-000-0009</p>
              <p>Line: The Concert</p>
              <p>Mon-Sun : 8 A.M - 6 P.M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - ซ่อนในมือถือ */}
      <div className="hidden md:block text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-2">
        Copyright © Khan
      </div>
    </>
  );
};

export default Footer;
