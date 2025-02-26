import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import concertService from "../services/concert.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [concertList, setConcertList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConcert();
  }, []);

  const fetchConcert = () => {
    setIsLoading(true);
    concertService
      .get()
      .then((response) => setConcertList(response.data.concerts))
      .catch((e) => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", e))
      .finally(() => setIsLoading(false));
  };

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
      <div className="relative w-full h-96 bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold">ค้นหาคอนเสิร์ตที่ใช่สำหรับคุณ</h1>
          <p className="mt-2">พบกับศิลปินและคอนเสิร์ตที่คุณชื่นชอบ</p>
          <form onSubmit={handleSearch} className="mt-4 flex">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 rounded-l-lg w-64 text-black" placeholder="ค้นหาคอนเสิร์ต..." />
            <button type="submit" className="bg-indigo-600 px-4 py-2 text-white rounded-r-lg">ค้นหา</button>
          </form>
        </div>
      </div>

      {/* Upcoming Concerts */}
      <div className="container mx-auto px-6 mt-10">
        <h2 className="text-3xl font-semibold text-center mb-6">คอนเสิร์ตที่กำลังจะมา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {concertList.map((concert) => (
            <div key={concert.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={concert.pictureUrl} alt={concert.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">{concert.name}</h3>
              <p className="text-gray-600">{concert.date}</p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">ดูรายละเอียด</button>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-gray-100 py-10 mt-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-6">รีวิวจากผู้เข้าชม</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"สุดยอดคอนเสิร์ต สนุกมาก!"</p>
              <p className="text-gray-800 font-bold mt-2">- คุณสมชาย</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"เสียงดีมาก คุ้มค่าเงิน!"</p>
              <p className="text-gray-800 font-bold mt-2">- คุณสมศรี</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">"จัดงานดีมาก ไฟ แสง สีสุดอลังการ"</p>
              <p className="text-gray-800 font-bold mt-2">- คุณเอก</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;