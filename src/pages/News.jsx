import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

const News = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="min-h-screen">
          <hr />
          <h1 className="text-black text-center text-4xl mt-10">News</h1>
        </div>
        <hr />
      </div>
      <Footer />
      <BottomNav/>
    </>
  );
};

export default News;
