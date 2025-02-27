import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="sm:w-1/4 md:w-1/4 text-black h-full min-h-screen p-4 ">
      <h2 className="text-2xl font-bold mb-6 hidden sm:inline">บัญชีของฉัน</h2>
      <ul className="sidebar">
        <li>
          <button className="block mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200">
            <NavLink to="/profile">
              <p className="flex gap-2">
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
                  className="lucide lucide-user-pen"
                >
                  <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                  <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                  <circle cx="10" cy="7" r="4" />
                </svg>
                <span className="hidden sm:inline">จัดการบัญชี</span>
              </p>
            </NavLink>
          </button>
        </li>
        <li>
          <button className="block mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200">
            <NavLink to="/user/tickets">
              <p className="flex gap-2">
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
                  className="lucide lucide-ticket"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span className="hidden sm:inline">บัตรของฉัน</span>
              </p>
            </NavLink>
          </button>
        </li>
        <li>
          <button
            onClick={Logout}
            className="block mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
          >
            <p className="flex gap-2">
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
                className="lucide lucide-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </p>
          </button>
        </li>
      </ul>
      <toast />
    </div>
  );
};

export default Sidebar;
