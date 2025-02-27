import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

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
