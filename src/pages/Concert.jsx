import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Concert = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
        <Navbar />
        <div>
        localhost:4000/api/concerts
          <h1 className="text-white text-center text-4xl m-5">Concert</h1>
          {/* carousel */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Concert;
