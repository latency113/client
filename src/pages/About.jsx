import React from "react";
import { FaReact, FaNodeJs } from "react-icons/fa"; // React and Node.js icons
import { SiRailway } from "react-icons/si"; // Railway icon from react-icons
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

const News = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-12">
          <h1 className="text-black text-center text-4xl font-semibold">
            เกี่ยวกับเรา <FaReact className="inline ml-2 text-blue-500" />
          </h1>
          <p className="text-gray-700 text-lg mt-6 text-center">
            โปรเจคนี้สร้างขึ้นเพื่อเป็นการทำงานส่งอาจารย์
            โดยเว็บไซต์นี้ไม่ได้ใช้เพื่อการค้าขายจริง
            เป็นเพียงโปรเจคทดลองใช้งานในเชิง<span className="text-red-500">วิชาการเท่านั้น</span>
          </p>
          <p className="text-gray-700 text-lg mt-4 text-center">
            ระบบเว็บไซต์นี้มีการออกแบบที่เหมาะสมสำหรับการใช้งานที่ง่ายและสะดวก
            และถูกพัฒนาด้วยเทคโนโลยีสมัยใหม่ เช่น <br /><FaReact className="inline text-blue-500" /> React และ{" "}
            <FaNodeJs className="inline text-green-500" /> Node.js ส่วน
            back end ใช้ Node.js และได้ทำการ deploy ผ่าน <SiRailway className="inline text-purple-600" />
            Railway สำหรับการให้บริการ API
            เพื่อเพิ่มความสะดวกในการเชื่อมต่อข้อมูล
          </p>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              หากมีคำถามเกี่ยวกับโปรเจคนี้ โปรดติดต่อผู้พัฒนา
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
};

export default News;
