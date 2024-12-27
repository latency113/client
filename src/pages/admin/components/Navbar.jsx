import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      navigate("/"); // Redirect to the homepage after logout
    }, 1000);
  };

  return (
    <div className="bg-gray-800 text-white text-center p-4 items-center">
      <h1 className="text-xl font-bold">Welcome Admin</h1>
      <div className="flex justify-end">
        <button
          onClick={Logout}
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          ออกจากระบบ
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
