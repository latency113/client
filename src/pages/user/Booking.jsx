import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const ConcertBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchconcert = () => {
    concertService
      .get()
      .then((response) => {
        setconcert(response.data.bookings);
        console.log(response.data.concerts);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchconcert();
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
        <Sidebar />
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800 p-5 text-center">
            บัตรของคุณ
          </h1>
          <div className="space-y-5">
            {bookings.map((booking) => {
              const selectedSchedule = booking.concertDetails.Schedule.find(
                (schedule) => schedule.id === booking.scheduleId
              );

              return booking ? (
                <div
                  key={booking.id}
                  className="p-5 border-b border-gray-300 last:border-none"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {booking.concertDetails.concertName}
                  </h2>
                  <p className="text-gray-600">
                    {selectedSchedule
                      ? `วันที่: ${moment(selectedSchedule.date).format(
                          "DD/MM/YYYY"
                        )}`
                      : "ไม่พบข้อมูลรอบการแสดง"}
                  </p>
                  <p className="text-gray-600">
                    สถานที่: {booking.concertDetails.venue}
                  </p>
                  <p className="text-gray-600">
                    ราคา: {booking.concertDetails.price} บาท
                  </p>
                </div>
              ) : (
                <p className="text-center text-xl text-gray-600">
                  ไม่พบข้อมูลคอนเสิร์ต
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertBooking;
