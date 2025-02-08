import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const fullText = "ssearch concert now!"; // ตรวจสอบข้อความให้ถูกต้อง
  const [animatedText, setAnimatedText] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setAnimatedText(""); // รีเซ็ตข้อความก่อนเริ่ม animation

    let index = 0;

    const animateText = () => {
      if (index < fullText.length && isMounted.current) {
        setAnimatedText((prev) => prev + (fullText[index] || "")); // ป้องกัน undefined
        index++;
        setTimeout(animateText, 100);
      }
    };

    setTimeout(animateText, 100);

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex justify-center">
          <div className="bg-white p-8 mt-10 w-2/4 rounded-3xl shadow-2xl">
            <h1 className="text-blue-600 text-center text-3xl font-semibold mb-6">
              {animatedText || "\u00A0"} {/* ป้องกันแสดง undefined */}
            </h1>
            <form className="flex  gap-4 justify-center">
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
