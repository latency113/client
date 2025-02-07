import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-white p-12 ">
        <div className="flex flex-col text-md md:flex-row md:justify-around items-center 4 font-semibold">
          <div>
            <img
              src="https://www.theconcert.com/assets/images/tcc-main-logo.svg"
              alt="Logo"
            />
            <p className="mt-2">Follow Us</p>
            <div className="flex">
              <svg
                class="w-10 h-10 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="w-10 h-10 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-lg mb-2 text-gray-300">รายการหลัก</h1>
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
            <h1 className="text-lg mb-2 text-gray-300">เกี่ยวกับเรา</h1>
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
            <h1 className="text-lg text-gray-300">ฝ่ายประชาสัมพันธ์</h1>
            <div className="text-sm space-y-3">
              <p>Tel.090-000-0009</p>
              <p>Line: The Concert </p>
              <p>Mon-Sun : 8 A.M - 6 P.M</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-center bg-blue-600">Copyright © 2024</div>
    </>
  );
};

export default Footer;
