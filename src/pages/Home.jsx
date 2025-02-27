import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const [concertList, setConcertList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("กรุณากรอกคำค้นหาก่อน !");
      return;
    }
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      {/* Banner Section */}
      <div className="relative w-full h-96 bg-cover bg-center text-white flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold">ค้นหาคอนเสิร์ตที่ใช่สำหรับคุณ</h1>
          <p className="mt-2">พบกับศิลปินและคอนเสิร์ตที่คุณชื่นชอบ</p>
          <form onSubmit={handleSearch} className="mt-4 flex justify-center">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 rounded-l-lg w-64 text-black" placeholder="ค้นหาคอนเสิร์ต..." />
            <button type="submit" className="bg-indigo-600 px-4 py-2 text-white rounded-r-lg">ค้นหา</button>
          </form>
        </div>
      </div>


      {/* Reviews */}
      <div className="bg-gray-100 py-10 mt-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-6">รีวิวจากผู้เข้าชม</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"สุดยอดคอนเสิร์ต สนุกมาก!"</p>
              <p className="text-gray-800 font-bold mt-2">- จ้อดสมาทอน</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"เสียงดีมาก คุ้มค่าเงิน!"</p>
              <p className="text-gray-800 font-bold mt-2">- คุณอึมคึม</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"จัดงานดีมาก ไฟ แสง สีสุดอลังการ"</p>
              <p className="text-gray-800 font-bold mt-2">- ปอสะมีรา</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav/>
      
      <Footer />
    </>
  );
};

export default Home;
