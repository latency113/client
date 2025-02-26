import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center">
            <h1 className="text-3xl mt-10">ไม่พบหน้าที่ต้องการ.</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
