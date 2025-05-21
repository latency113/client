import React, { useState, useEffect } from "react";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/user.service";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    pictureUrl: "https://www.nc.ac.th/img/logo.png",
    password: "",
  });
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      UserService.getUserProfile({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const data = response.data;
          setData(data);
          setUserInfo({
            name: data.user.name,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            pictureUrl: data.user.pictureUrl || userInfo.pictureUrl,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setError("ไม่พบข้อมูลผู้ใช้");
      setIsLoading(false);
      toast.error("กรุณาเข้าสู่ระบบ", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name); // แสดงชื่อไฟล์
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("phoneNumber", userInfo.phoneNumber);
    if (userInfo.password) {
      formData.append("password", userInfo.password);
    }
    if (image) {
      formData.append("picture", image);
    }

    const dataToUpdate = {
      name: userInfo.name,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      password: userInfo.password,
      pictureUrl: image ? URL.createObjectURL(image) : userInfo.pictureUrl,
    };

    if (JSON.stringify(dataToUpdate) !== JSON.stringify(data.user)) {
      if (token && data) {
        fetch(`concert-yyqf.onrender.com/api/user/profile/${data.user.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((updatedData) => {
            setData(updatedData);
            setIsEditing(false);
            if (userInfo.password) {
              toast.success("รหัสผ่านของคุณถูกอัปเดตแล้วจะถูกออกจากระบบ", {
                autoClose: 3000,
              });
              localStorage.removeItem("token");
              window.location.href = "/login";
            } else {
              toast.success("ข้อมูลของคุณถูกอัปเดตแล้ว", {
                autoClose: 2000,
              });
            }
          })
          .catch((err) => {
            setError(err.message);
          });
      }
    } else {
      toast.info("ข้อมูลของคุณไม่มีการเปลี่ยนแปลง", {
        autoClose: 2000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen text-center mt-5 text-5xl">
          <p>กำลังโหลด...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center mt-5">
          <div className="text-center">
            <h1 className="text-6xl">404</h1>
            <p className="text-3xl">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen gap-5 p-5">
        <div className="">
          {data && data.user ? (
            <div className="flex justify-center ">
              <div className="max-w-6xl w-full">
                <main className="flex max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-4 ">
                  <Sidebar />
                  <div className="w-full">
                    <h1 className="text-center text-3xl font-semibold text-black mb-6">
                      โปรไฟล์ของคุณ
                    </h1>
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src={userInfo.pictureUrl}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-4 border-gray-300"
                      />
                    </div>
                    <div className="flex justify-center">
                      {isEditing ? (
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-6 w-full md:w-2/4"
                        >
                          <div>
                            <label className="block text-lg text-gray-600">
                              ชื่อผู้ใช้:
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={userInfo.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-lg text-gray-600">
                              อีเมล:
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={userInfo.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-lg text-gray-600">
                              รหัสผ่าน:
                            </label>
                            <div className="relative">
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={userInfo.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-3 text-gray-600"
                              >
                                {passwordVisible ? (
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
                                    className="lucide lucide-eye"
                                  >
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                ) : (
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
                                    className="lucide lucide-eye-closed"
                                  >
                                    <path d="m15 18-.722-3.25" />
                                    <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                    <path d="m20 15-1.726-2.05" />
                                    <path d="m4 15 1.726-2.05" />
                                    <path d="m9 18 .722-3.25" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-lg text-gray-600">
                              เบอร์โทร:
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={userInfo.phoneNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 cursor-pointer w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4">
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
                                className="lucide lucide-hard-drive-upload"
                              >
                                <path d="m16 6-4-4-4 4" />
                                <path d="M12 2v8" />
                                <rect
                                  width="20"
                                  height="8"
                                  x="2"
                                  y="14"
                                  rx="2"
                                />
                                <path d="M6 18h.01" />
                                <path d="M10 18h.01" />
                              </svg>
                              {fileName
                                ? `ไฟล์ที่เลือก: ${fileName}`
                                : "อัพเดทโปรไฟล์"}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </label>
                            {image && (
                              <div className="mt-3 flex justify-center">
                                <p className="text-lg text-gray-700">
                                  รูปที่เลือก:
                                </p>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Selected"
                                  className="w-24 h-24 rounded-full border-2 border-gray-300 mt-2 ml-4"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between mt-6">
                            <button
                              type="submit"
                              className="flex justify-center w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
                            >
                              บันทึกการเปลี่ยนแปลง
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="flex justify-center w-full mt-3 text-gray-500 py-2 px-4 text-center gap-1 border-transparent hover:border-gray-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div>
                            <p className="text-lg text-gray-700">
                              <strong>ชื่อผู้ใช้:</strong> {data.user.name}
                            </p>
                            <p className="text-lg text-gray-700">
                              <strong>อีเมล:</strong> {data.user.email}
                            </p>
                            <p className="text-lg text-gray-700">
                              <strong>เบอร์โทร:</strong> {data.user.phoneNumber}
                            </p>
                            <div className="mt-6">
                              <button
                                onClick={() => setIsEditing(true)}
                                className="flex justify-center w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
                              >
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
                                  class="lucide lucide-pencil"
                                >
                                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                                แก้ไขข้อมูล
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          ) : (
            <div className="min-h-screen text-center text-2xl text-gray-700">
              <p>ไม่พบข้อมูลโปรไฟล์</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />

      <Footer />
      <BottomNav />
    </>
  );
};

export default Profile;
