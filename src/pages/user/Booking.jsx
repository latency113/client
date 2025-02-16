import React, { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import bookingService from "../../services/booking.service";

const ConcertBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // ตรวจสอบว่า userId และ token มีค่าหรือไม่
    if (!userId || !token) {
      console.error("ไม่พบ userId หรือ token ใน localStorage");
      return;
    }

    const fetchConcert = async () => {
      try {
        const response = await bookingService.getById(userId, token);
        console.log("ข้อมูลที่ได้รับจาก API:", response);
        if (response && response.data && response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          console.error("ไม่พบข้อมูลการจองใน API response");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [token, userId]);

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
      <div className="bg-gray-100 min-h-screen pt-[70px]">
        <div className="mt-[120px]">
          <div className="flex justify-center gap-5 p-5">
            <Sidebar />
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <h1 className="text-3xl font-bold text-gray-800 p-5 text-center">
                บัตรของคุณ
              </h1>
              <div className="space-y-5">
                {bookings.length > 0 ? (
                  bookings.map((booking) => {
                    const selectedSchedule =
                      booking.concertDetails.Schedule.find(
                        (schedule) => schedule.id === booking.scheduleId
                      );

                    return (
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

                        {/* แสดง id ของการจอง หรือ id ของคอนเสิร์ต */}
                        <p className="text-gray-500">
                          การจอง ID: {booking.id} {/* แสดง id ของการจอง */}
                        </p>
                        <p className="text-gray-500">
                          คอนเสิร์ต ID: {booking.concertDetails.id}{" "}
                          {/* แสดง id ของคอนเสิร์ต */}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-xl text-gray-600">
                    ไม่พบข้อมูลคอนเสิร์ต
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertBooking;
