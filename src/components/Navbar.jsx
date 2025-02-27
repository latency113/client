import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://concert-production.up.railway.app/api/user/profile", {
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
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="mb-[130px]">
      <div className="fixed top-0 left-0 w-full z-50 text-blue-500">
        <div className="bg-white p-3">
          <div className="flex justify-center">
            <div className="container w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-blue-500">
                    <a href="/">CONHUB</a>
                  </h1>
                </div>
                <div className="px-5 text-blue-500">
                  {/* Menu */}
                  <nav className="navb">
                    <ul
                      className={`${
                        isMenuOpen ? "block" : "hidden"
                      } md:flex md:flex-row gap-10 justify-center md:block w-full`}
                    >
                      <li>
                        <NavLink to="/" className="flex items-center space-x-2">
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
                          <p className="">หน้าแรก</p>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/concert"
                          className="flex items-center space-x-2"
                        >
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
                          <p className="">คอนเสิร์ต</p>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/news"
                          className="flex items-center space-x-2"
                        >
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
                          <p className="">ข่าวสาร</p>
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div>
                  {isLoggedIn ? (
                    <span className="flex gap-3 text-lg text-blue-500">
                      ยินดีต้อนรับ <p className="text-red-700">{name}</p>
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <div className="flex items-center justify-center space-x-3 mb-3">
                    {isLoggedIn ? (
                      <>
                        <NavLink
                          to="/profile"
                          className="hover:text-blue-900 text-lg"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </NavLink>
                        {isAdmin && (
                          <NavLink
                            to="/admin/dashboard"
                            className="hover:text-blue-900 text-lg"
                          >
                            <svg
                              className="w-6 h-6 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </NavLink>
                        )}
                        <button className="hover:text-blue-900 text-lg">
                          <NavLink to="/user/tickets">
                            <svg
                              className="w-6 h-6"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                            </svg>
                          </NavLink>
                        </button>
                        <button
                          className="hover:text-blue-900 text-lg"
                          onClick={Logout}
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14 19V5h4a1 1 0 0 1 1 1v11h1a1 1 0 0 1 0 2h-6Z" />
                            <path
                              fillRule="evenodd"
                              d="M12 4.571a1 1 0 0 0-1.275-.961l-5 1.428A1 1 0 0 0 5 6v11H4a1 1 0 0 0 0 2h1.86l4.865 1.39A1 1 0 0 0 12 19.43V4.57ZM10 11a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0V12a1 1 0 0 1 1-1Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <NavLink to="/login">
                        <button className="bg-blue-500 hover:bg-blue-600 p-2 mb-3 rounded-md text-white">
                          เข้าสู่ระบบ
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Navbar;
