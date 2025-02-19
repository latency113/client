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
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="container">
          <div className="flex justify-end">
            {" "}
            {/* Flexbox for layout */}
            <h1 className="text-xl font-bold">
              {" "}
              {/* Removed empty string */}
              {/* You can add your logo or title here if needed */}
            </h1>
            <div>
              <button
                onClick={Logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" // Improved button styling
              >
                ออกจากระบบ
              </button>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />{" "}
            {/* Toast Container customization */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
