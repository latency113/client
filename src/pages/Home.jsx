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

  // ฟังก์ชันดึงข้อมูลคอนเสิร์ต
  const fetchConcert = (query = "") => {
    setIsLoading(true);
    concertService
      .getQuery(query)
      .then((response) => {
        setConcertList(response.data.concerts);
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // โหลดข้อมูลคอนเสิร์ตเมื่อเปิดหน้า
  useEffect(() => {
    fetchConcert();
  }, []);

  // ล้างค่า searchQuery เมื่อออกจากหน้านี้
  useEffect(() => {
    return () => setSearchQuery("");
  }, []);

  // ฟังก์ชันค้นหา
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
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center mt-10">
        {/* ค้นหา */}
          <div className="bg-white flex flex-col items-center py-10 px-5 w-3/4 md:w-2/4 shadow-lg rounded-full">
            <h1 className="text-indigo-500 text-4xl mb-5 text-center">
              ตามหาคอนเสิร์ตที่ต้องการได้เลย !
            </h1>
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row justify-center w-full max-w-2xl"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหา..."
                className="px-4 py-3 rounded-l-xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-3/5 transition-transform hover:scale-105 duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-r-xl shadow-md flex items-center justify-center gap-2 hover:bg-indigo-700 transition duration-200 w-full sm:w-auto"
              >
                <span>ค้นหา</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default Home;
