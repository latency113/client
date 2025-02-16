import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Product = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div>
          <h1 className="text-white text-center text-4xl m-5">Product</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
