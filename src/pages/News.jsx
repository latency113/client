import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-12">
          <h1 className="text-black text-center text-4xl font-semibold">
            เกี่ยวกับเรา
          </h1>
          <p className="text-gray-700 text-lg mt-6 text-center">
            โปรเจคนี้สร้างขึ้นเพื่อเป็นการทำงานส่งอาจารย์
            โดยเว็บไซต์นี้ไม่ได้ใช้เพื่อการค้าขายจริง
            เป็นเพียงโปรเจคทดลองใช้งานในเชิง<span className="text-red-500">วิชาการเท่านั้น</span>
          </p>
          <p className="text-gray-700 text-lg mt-4 text-center">
            ระบบเว็บไซต์นี้มีการออกแบบที่เหมาะสมสำหรับการใช้งานที่ง่ายและสะดวก
            และถูกพัฒนาด้วยเทคโนโลยีสมัยใหม่ เช่น React และ TailwindCSS ส่วน
            back end ใช้ Node.js และได้ทำการ deploy ด้วย Render
            สำหรับการให้บริการเว็บไซต์ พร้อมทั้งใช้ API จาก Railway
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

export default About;
