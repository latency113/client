import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom"; // ใช้ useLocation เพื่อดึงข้อมูล query จาก URL
import concertService from "../services/concert.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [concertList, setConcertList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // ใช้เพื่อดึงข้อมูลจาก URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // ดึง query ที่ส่งมาจาก URL

  // ฟังก์ชันดึงข้อมูลคอนเสิร์ต
  const fetchConcert = (query) => {
    concertService
      .getQuery(query) // ส่ง query ไปที่ API
      .then((response) => {
        setConcertList(response.data.concerts);
        console.log(response.data.concerts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ใช้ useEffect เพื่อโหลดข้อมูลเมื่อ query เปลี่ยนแปลง
  useEffect(() => {
    if (query) {
      setSearchQuery(query); // ตั้งค่าค่าของ searchQuery จาก URL
      fetchConcert(query); // ค้นหาข้อมูลตาม query ที่ได้จาก URL
    }
  }, [query]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col mt-10">
        <Navbar />
        <div className="bg-home relative">
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <h1 className="text-white text-4xl">ผลการค้นหา: {searchQuery}</h1>
            </div>

            <div className="concert-list">
              {/* แสดงรายการคอนเสิร์ต */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {concertList.length > 0 ? (
                  concertList.map((concert) => (
                    <div key={concert.id} className="concert-card">
                      <div className="bg-white rounded-lg shadow-md transition-shadow duration-300 cursor-pointer hover:shadow-xl hover:shadow-gray-500 w-[75%] max-w-[420px">
                        {/* ภาพ */}
                        <div className="flex flex-row items-center mx-auto]">
                          <div className="w-[40%] h-[250px] overflow-hidden rounded-lg p-2">
                            <img
                              src={concert.pictureUrl}
                              alt={concert.concertName}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                            />
                          </div>

                          {/* ข้อมูล */}
                          <div className="flex flex-col justify-between p-4 w-[60%]">
                            <div>
                              <div className="text-base font-semibold text-gray-900 truncate mb-2">
                                {concert.concertName}
                              </div>
                              <div className="flex text-sm text-gray-700 truncate mb-1">
                                <svg
                                  class="w-6 h-6"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                <span>{concert.venue}</span>
                              </div>

                              <div className="text-sm text-gray-600">
                                {concert.Schedule &&
                                concert.Schedule.length > 0 ? (
                                  concert.Schedule.map((s, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-1 mb-1"
                                    >
                                      <svg
                                        className="w-5 h-5 text-gray-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span>
                                        {new Date(s.date).toLocaleDateString()}{" "}
                                        | {s.startTime} น. - {s.endTime} น.
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <div>No schedule available</div>
                                )}
                              </div>

                              {/* ปุ่ม */}
                              <div className="flex justify-end">
                                <NavLink
                                  to={`/concert/${concert.id}`}
                                  className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                  ดูรายละเอียด
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>ไม่พบคอนเสิร์ตที่ตรงกับการค้นหา</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
