import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // useNavigate for redirection
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน!");
      return;
    }

    try {
      const response = await AuthService.register({
        email,
        password,
        name,
        phoneNumber,
      });
    
      if (response) {
        toast.success("สมัครเป็นสมาชิกสำเร็จ!");
        setTimeout(() => navigate("/login"), 500);
      }
    } catch (err) {
      toast.error(err.message); // แสดงข้อความจาก backend
    }
    
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex">
          <div className="bg-white w-full max-w-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              สมัครสมาชิก
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                ></label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="ชื่อ - นามสกุล"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                ></label>
                <input
                  type="email"
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
                ></label>
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

              <div className="mb-6">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="password"
                ></label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="ยืนยันรหัสผ่าน"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="phone"
                ></label>
                <input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  maxLength="10"
                  pattern="\d{10}"
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ""))}
                  required
                  placeholder="เบอร์โทรศัพท์"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* <div className="mb-6">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="profile"
                ></label>
                <input
                  type="file"
                  id="profile"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div> */}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="bg-yellow-500 w-full max-w-lg p-8 shadow-lg flex items-center ">
            <div className="text-white">
              <div className="text-center mb-5">
                <h1 className="text-3xl font-bold">SignUp :)</h1>
                <br />
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Saepe ducimus dicta voluptatem ad labore, consequuntur
                  asperiores cupiditate ab dolorum odit nobis rem totam quos
                  officia ipsum ipsam officiis neque cum.
                </p>
              </div>

              <div className="flex items-end">
                <NavLink to="/login">
                  <button className="hover:border-2 p-1">เป็นสมาชิกแล้ว</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
