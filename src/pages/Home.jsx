import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "ค้นหาคอนเสิร์ตที่ต้องการได้เลย !";

  useEffect(() => {
    let index = 0;
    setAnimatedText(""); // Reset text before animation starts
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setAnimatedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []); // Run effect only once

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center flex-grow">
          <div className="bg-white p-8 mt-10 w-2/4 rounded-3xl shadow-2xl">
            <h1 className="text-blue-600 text-center text-3xl font-semibold mb-6">
              {animatedText || " "}
            </h1>
            <form className="flex items-center gap-4 justify-center">
              <input
                type="text"
                placeholder="ค้นหา..."
                className="px-4 py-3 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/5 transition transform hover:scale-105 duration-200"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
              >
                ค้นหา
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
