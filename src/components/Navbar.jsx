import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [name, setName] = useState(""); // เก็บชื่อผู้ใช้
  const [isLoggedIn, setIsLoggedIn] = useState(false); // เช็คว่าเข้าสู่ระบบแล้วหรือยัง

  useEffect(() => {
    const token = localStorage.getItem("token"); // รับ token จาก localStorage

    if (token) {
      // ถ้ามี token ให้ดึงข้อมูลผู้ใช้จาก API
      fetch("http://localhost:4000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.user.name);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="text-white bg-blue-500 p-5">
      <div className="flex justify-between items-center">
        <div>
          <img
            src="https://www.theconcert.com/assets/images/tcc-main-logo.svg"
            alt="Logo"
          />
        </div>

        <div className="flex space-x-3">
          {isLoggedIn ? (
            <span className="flex gap-3 text-lg">
              ยินดีต้อนรับ <p>{name}</p>
            </span>
          ) : (
            <span className="text-lg">ยินดีต้อนรับ</span>
          )}

          <div className="flex space-x-3">
            {isLoggedIn ? (
              <>
                <a href="/profile">
                  <p className="hover:text-red-500 text-lg">โปรไฟล์</p>
                </a>
                <button className="hover:text-red-500 text-lg" onClick={Logout}>
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <a href="/login">
                <p className="hover:text-red-500 text-lg">
                  เข้าสู่ระบบหรือลงทะเบียน
                </p>
              </a>
            )}
          </div>
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
