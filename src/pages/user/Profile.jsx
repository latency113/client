import React, { useState, useEffect } from "react";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import Sidebar from "../../components/Sidebar";
import UserService from "../../services/user.service";

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
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("phoneNumber", userInfo.phoneNumber);
    if (image) {
      formData.append("picture", image);
    }

    if (token) {
      fetch("http://localhost:4000/api/user/profile", {
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
        })
        .catch((err) => {
          setError(err.message);
        });
    }
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
        <p>{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex justify-center min-h-screen gap-5 p-5">
        <div className="mt-[120px]">
          {data && data.user ? (
            <div className="container mx-auto flex justify-center gap-6">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-5">
                <h1 className="text-center text-3xl font-semibold text-black">
                  โปรไฟล์ของคุณ
                </h1>
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={userInfo.pictureUrl || "/path/to/default-image.jpg"}
                    alt="Profile"
                    className="w-48 h-48 rounded-full border-2 border-gray-300"
                  />
                </div>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-lg text-gray-600">
                        <strong>ชื่อผู้ใช้:</strong>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        className="border p-3 rounded-lg w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-lg text-gray-600">
                        <strong>อีเมล:</strong>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        className="border p-3 rounded-lg w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-lg text-gray-600">
                        <strong>เบอร์โทร:</strong>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleInputChange}
                        className="border p-3 rounded-lg w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-lg text-gray-600">
                        <strong>อัปโหลดรูปโปรไฟล์:</strong>
                      </label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="border p-3 rounded-lg w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {image && (
                        <div className="mt-3 flex justify-center">
                          <strong className="text-lg text-gray-700">
                            รูปที่เลือก:
                          </strong>
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
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        บันทึกการเปลี่ยนแปลง
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
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
                        className="bg-yellow-500 text-white p-3 rounded-lg w-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        แก้ไขข้อมูล
                      </button>
                    </div>
                  </>
                )}
              </main>
            </div>
          ) : (
            <div className="min-h-screen text-center text-2xl text-gray-700">
              <p>ไม่พบข้อมูลโปรไฟล์</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
