import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [name, setName] = useState(""); // เก็บชื่อผู้ใช้
  const [isLoggedIn, setIsLoggedIn] = useState(false); // เช็คว่าเข้าสู่ระบบแล้วหรือยัง
  const [isAdmin, setIsAdmin] = useState(false); // เช็คว่าเป็น admin หรือไม่
  const navigate = useNavigate();

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
          if (data.user.role === "admin") {
            setIsAdmin(true); // ถ้าเป็น admin ให้ตั้งค่าเป็น true
          }
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
      navigate("/"); // ไปที่หน้าแรกหลังจากออกจากระบบ
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
                <NavLink to="/profile" className="hover:text-red-500 text-lg">
                  โปรไฟล์
                </NavLink>
                {isAdmin && (
                  <NavLink
                    to="/admin/dashboard"
                    className="hover:text-red-500 text-lg"
                  >
                    Admin Dashboard
                  </NavLink>
                )}
                <button className="hover:text-red-500 text-lg" onClick={Logout}>
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <NavLink to="/login" className="hover:text-red-500 text-lg">
                เข้าสู่ระบบหรือลงทะเบียน
              </NavLink>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
