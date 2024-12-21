import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Logout = () => {
//   toast.success("ออกจากระบบสำเร็จ");
//   setTimeout(() => {
//     navigate("/login");
//   }, 1500);
// };

const Navbar = () => {
  return (
    <div className="text-white bg-blue-500 p-5">
      <div className="flex justify-between items-center">
        <div>
          <img
            src="https://www.theconcert.com/assets/images/tcc-main-logo.svg"
            alt="Logo"
          />
        </div>

        <div className="space-x-5">
          <span className="mr-4 text-lg">
            ยินดีต้อนรับ ยังไม่ได้เข้าสู่ระบบ
          </span>
          <button className="hover:border-b-2 pb-[5px]">
            <a href="/login"><p className="hover:text-red-500 text-lg">เข้าสู่ระบบหรือลงทะเบียน</p></a>
          </button>
        </div>
      </div>

      <nav>
        <ul className="navb flex gap-10 justify-center">
          <li>
            <NavLink to="/" className="space-x-2">
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
                class="lucide lucide-tickets"
              >
                <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                <path d="M6 10V8" />
                <path d="M6 14v1" />
                <path d="M6 19v2" />
                <rect x="2" y="8" width="20" height="13" rx="2" />
              </svg>
              <p>หน้าแรก</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/concert" className="space-x-2">
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
                class="lucide lucide-tickets"
              >
                <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                <path d="M6 10V8" />
                <path d="M6 14v1" />
                <path d="M6 19v2" />
                <rect x="2" y="8" width="20" height="13" rx="2" />
              </svg>
              <p>คอนเสิร์ต</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist" className="space-x-2">
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
                class="lucide lucide-tickets"
              >
                <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                <path d="M6 10V8" />
                <path d="M6 14v1" />
                <path d="M6 19v2" />
                <rect x="2" y="8" width="20" height="13" rx="2" />
              </svg>
             <p>ศิลปิน</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="space-x-2">
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
                class="lucide lucide-tickets"
              >
                <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                <path d="M6 10V8" />
                <path d="M6 14v1" />
                <path d="M6 19v2" />
                <rect x="2" y="8" width="20" height="13" rx="2" />
              </svg>
              <p>สินค้า</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className="space-x-2">
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
                class="lucide lucide-tickets"
              >
                <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                <path d="M6 10V8" />
                <path d="M6 14v1" />
                <path d="M6 19v2" />
                <rect x="2" y="8" width="20" height="13" rx="2" />
              </svg>
              <p>ข่าวสาร</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default Navbar;
