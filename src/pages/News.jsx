import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const News = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div>
          <h1 className="text-white text-center text-4xl mt-10">News</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
