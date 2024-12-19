import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <Navbar />
      <div>
        <h1 className="text-white text-center text-2xl m-5">แนะนำสำหรับคุณ</h1>
        {/* carousel */}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
