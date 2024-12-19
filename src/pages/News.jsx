import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const News = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <Navbar />
      <div>
        <h1 className="text-white text-center text-4xl m-5">News</h1>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default News;
