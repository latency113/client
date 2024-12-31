import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import moment from "moment";

const ConcertBooking = () => {
  const [bookings, setBookings] = useState([]); // เก็บข้อมูลการจอง
  const [loading, setLoading] = useState(true); // ตัวแปรสำหรับสถานะโหลดข้อมูล

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-2xl">กำลังโหลดข้อมูลการจอง...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center min-h-screen gap-5 p-5">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800 p-5">การจองของคุณ</h1>
          <div className="space-y-5">
            {/* แสดงรายการการจอง */}
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 border-b border-gray-300 last:border-none"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {booking.concert.concertName}
                  </h2>
                  <p className="text-gray-600">วันที่: {moment(booking.schedule.date).format("DD/MM/YYYY")}</p>
                  <p className="text-gray-600">สถานที่: {booking.concert.venue}</p>
                  <p className="text-gray-600">ราคา: {booking.concert.price} บาท</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">คุณยังไม่ได้ทำการจองคอนเสิร์ตใดๆ</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertBooking;
