import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="bg-gray-800 text-white text-center p-4 items-center">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold ">{""}</h1>
        <div>
          <button
            onClick={Logout}
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
