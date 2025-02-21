import React, { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import bookingService from "../../services/booking.service";
import { decodeToken } from "../../auth/auth";

const ConcertBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const decodedPayload = decodeToken(token);
        const userId = decodedPayload.id;
        const { data } = await bookingService.getBookingByUserId(userId, token);
        const bookingsData = data?.bookings || [];
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const concertResponse = await bookingService.getConcertById(
                booking.concertId,
                token
              );
              if (
                concertResponse &&
                concertResponse.data &&
                concertResponse.data.concert
              ) {
                return {
                  ...booking,
                  concertDetails: concertResponse.data.concert,
                };
              } else {
                console.error(
                  `Concert not found for booking ID: ${booking.id}`
                );
                return { ...booking, concertDetails: null };
              }
            } catch (error) {
              console.error(
                `Error fetching concert details for booking ID: ${booking.id}`,
                error
              );
              return { ...booking, concertDetails: null };
            }
          })
        );

        setBookings(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

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
      <div className="bg-gray-100 flex justify-center min-h-screen gap-5 p-5 mt-[150px]">
        <Sidebar />
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800 p-5 text-center">
            บัตรของคุณ
          </h1>
          <div className="space-y-5">
            {bookings.length === 0 ? (
              <p className="text-center text-xl text-gray-600">
                ไม่พบข้อมูลการจอง
              </p>
            ) : (
              bookings.map((booking) => {
                const selectedSchedule = booking.concertDetails?.Schedule?.find(
                  (schedule) => schedule.id === booking.scheduleId
                );

                return (
                  <div
                    key={booking.id}
                    className="p-5 border-b border-gray-300 last:border-none"
                  >
                    <h2 className="text-xl font-semibold text-gray-800">
                      {booking.concertDetails
                        ? booking.concertDetails.concertName
                        : "ไม่พบข้อมูลคอนเสิร์ต"}
                    </h2>
                    <p className="text-gray-600">
                      {selectedSchedule
                        ? `วันที่: ${moment(selectedSchedule.date).format(
                            "DD/MM/YYYY"
                          )}`
                        : "ไม่พบข้อมูลรอบการแสดง"}
                    </p>
                    <p className="text-gray-600">
                      สถานที่:{" "}
                      {booking.concertDetails
                        ? booking.concertDetails.venue
                        : "ไม่ทราบ"}
                    </p>
                    <p className="text-gray-600">
                      ราคา:{" "}
                      {booking.concertDetails
                        ? booking.concertDetails.price
                        : "ไม่ทราบ"}{" "}
                      บาท
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertBooking;
