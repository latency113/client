import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-white p-12 ">
        <div className="flex flex-col text-md md:flex-row md:justify-around items-center 4 font-semibold">
          <div>
            <h1 className="text-2xl font-bold text-indigo-500">CONHUB</h1>
            <p className="mt-2">Follow Us</p>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-facebook"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-lg mb-2 text-indigo-700">รายการหลัก</h1>
            <ul className="nava space-y-3 text-sm">
              <li>
                <NavLink to="/news">ข่าวสารวงการเพลง</NavLink>
              </li>
              <li>
                <NavLink to="/concert">คอนเสิร์ตทั้งหมด</NavLink>
              </li>
              <li>
                <NavLink to="#">ภาพกิจกรรม</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-lg mb-2 text-indigo-700">เกี่ยวกับเรา</h1>
            <ul className="nava space-y-3 text-sm">
              <li>
                <NavLink to="#">เกี่ยวกับเรา</NavLink>
              </li>
              <li>
                <NavLink to="#">ข้อกำหนดการให้บริการ</NavLink>
              </li>
              <li>
                <NavLink to="#">นโยบายความเป็นส่วนตัว</NavLink>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h1 className="text-lg text-indigo-700">ฝ่ายประชาสัมพันธ์</h1>
            <div className="text-sm space-y-3 text-indigo-500">
              <p>Tel.090-000-0009</p>
              <p>Line: The Concert </p>
              <p>Mon-Sun : 8 A.M - 6 P.M</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-center bg-indigo-600">
        Copyright © 2024
      </div>
    </>
  );
};

export default Footer;
