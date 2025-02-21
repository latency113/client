import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../services/auth.service";
import "./login.css"; // ใส่ CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      authService
        .login({ email, password })
        .then((response) => {
          if (response && response.token) {
            localStorage.setItem("token", response.token);
            toast.success("ล็อกอินสำเร็จ!");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            toast.error("การล็อกอินล้มเหลว: ไม่พบโทเค็น");
          }
        })
        .catch((error) => {
          console.error("Login Error:", error);
          toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        });
    } catch (err) {
      console.error("handleSubmit Error:", err);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <>
      <div className="">
        {/* หน้า login */}
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex">
            <div className="bg-indigo-500 w-full max-w-lg p-8 shadow-lg flex items-center page login-page rounded-r-2xl">
              <div className="text-white">
                <div className="text-center mb-5">
                  <h1 className="text-3xl">Welcome to CONHUB :)</h1>
                  <br />
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Saepe ducimus dicta voluptatem ad labore, consequuntur
                    asperiores cupiditate ab dolorum odit nobis rem totam quos
                    officia ipsum ipsam officiis neque cum.
                  </p>
                </div>

                <div className="flex items-end">
                  <NavLink to="/register">
                    <button className="hover:border-2 p-1">
                      ยังไม่ได้เป็นสมาชิก
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="bg-white w-full max-w-lg p-8 shadow-md rounded-l-2xl">
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                เข้าสู่ระบบ
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="อีเมล"
                    className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="รหัสผ่าน"
                    className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg"
                >
                  เข้าสู่ระบบ
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
