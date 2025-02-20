import React from "react";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="container">
          <div className="text-center">
            {" "}
            {/* Flexbox for layout */}
            <h1 className="text-2xl font-bold">
              Welcome Admin
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
