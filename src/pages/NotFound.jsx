import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center">
          <div className="mt-[300px]">
            <h1 className="text-3xl">ไม่พบหน้าที่ต้องการ.</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
