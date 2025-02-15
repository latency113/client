import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      authService
        .login({
          email,
          password,
        })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            toast.success("ล็อกอินสำเร็จ!");
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        });
    } catch (err) {
      toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex">
          <div className="bg-indigo-500 w-full max-w-lg p-8 shadow-lg flex items-center ">
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

          <div className="bg-white w-full max-w-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              เข้าสู่ระบบ
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                >
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="อีเมล"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="password"
                >
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="รหัสผ่าน"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
