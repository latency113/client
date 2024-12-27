import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ConcertDetail = () => {
  const { id } = useParams(); // Fetch the concert ID from the URL parameters
  const [data, setData] = useState(null); // Store concert details
  const [error, setError] = useState(null); // Track errors

  // Fetch concert details from the backend
  const callApi = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/concert/${id}`); // ใช้ backtick รอบ URL
      console.log("Concert data: ", res.data.concert); // Debug response
      setData(res.data.concert); // ตั้งค่า data จาก API
    } catch (error) {
      console.error("Error fetching concert details:", error);
      setError("ไม่สามารถโหลดข้อมูลคอนเสิร์ตได้");
    }
  };

  useEffect(() => {
    callApi(); // Call API to fetch concert details when component mounts
  }, [id]);

  // แสดงข้อความแสดงข้อผิดพลาด หากเกิดปัญหา
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  // แสดงหน้าจอโหลดขณะที่ข้อมูลยังไม่พร้อม
  if (data === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-white text-2xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center min-h-screen gap-5 p-5">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Concert Image Section */}
          <div className="relative w-full h-[400px] overflow-hidden">
            {data.concert?.pictureUrl ? (
              <img
                src={data.concert.pictureUrl} // Fetch picture URL from the backend response
                alt={data.concert.concertName}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-gray-300 rounded-t-lg">
                <p className="text-gray-600 text-lg">ไม่มีภาพ</p>
              </div>
            )}
          </div>

          {/* Concert Details */}
          <div className="p-6 space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">{data.concert?.concertName || "ไม่มีชื่อคอนเสิร์ต"}</h1>
            <div className="text-lg text-gray-700">
              <p className="mb-2">
                <span className="font-semibold">วันที่:</span> {data.concert?.concertDate || "ไม่ระบุ"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">สถานที่:</span> {data.concert?.venue || "ไม่ระบุ"}
              </p>
              <p className="mb-4">
                <span className="font-semibold">ราคา:</span> {data.concert?.price ? `${data.concert.price} บาท` : "ไม่ระบุ"}
              </p>
            </div>
            {/* Button or Call to Action */}
            <div className="text-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                ซื้อบัตร
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertDetail;
