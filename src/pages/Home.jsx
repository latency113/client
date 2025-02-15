import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import concertService from "../services/concert.service";

const Home = () => {
  const [concertList, setConcertList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // ฟังก์ชันดึงข้อมูลคอนเสิร์ต
  const fetchConcert = (query = "") => {
    concertService
      .getQuery(query)
      .then((response) => {
        setConcertList(response.data.concerts);
        console.log(response.data.concerts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ใช้ useEffect โหลดข้อมูลเริ่มต้น
  useEffect(() => {
    fetchConcert();
  }, []);

  // ฟังก์ชันค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    fetchConcert(searchQuery);
    
    // หลังจากค้นหาแล้วให้ไปยังหน้าใหม่ (ค้นหาผลลัพธ์)
    navigate(`/search-results?query=${searchQuery}`); // เปลี่ยน URL และส่ง query ใน URL
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col mt-10">
        <Navbar />
        <div className="bg-home relative">
          {/* ส่วนซ้อนทับ (Overlay) */}
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <h1 className="text-white text-4xl">
                ตามหาคอนเสิร์ตที่ต้องการได้เลย !
              </h1>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 justify-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหา..."
                  className="px-4 py-3 rounded-l-xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-3/5 transition-transform hover:scale-105 duration-200"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-r-xl shadow-md hover:bg-indigo-700 transition duration-200 w-full sm:w-auto"
                >
                  ค้นหา
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
