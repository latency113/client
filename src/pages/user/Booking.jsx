import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import BottomNav from "./../../components/BottomNav";
import { NavLink } from "react-router-dom";

const ConcertBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedPayload = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedPayload.id;

        const { data } = await axios.get(
          `http://localhost:4000/api/booking/user/${userId}`
        );

        const bookingsWithDetails = await Promise.all(
          data.bookings.map(async (booking) => {
            try {
              const concertResponse = await axios.get(
                `http://localhost:4000/api/concert/${booking.concertId}`
              );
              return {
                ...booking,
                concertDetails: concertResponse.data.concert,
              };
            } catch (error) {
              console.error("Error fetching concert details:", error);
              return { ...booking, concertDetails: null };
            }
          })
        );

        // Set the bookings directly without grouping
        setBookings(bookingsWithDetails);
      } catch (error) {
        setError("Failed to load bookings. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const downloadPDF = async (booking) => {
    if (!booking.concertDetails) {
      console.error("No concert details found");
      return;
    }

    const doc = new jsPDF();

    try {
      // สร้าง QR Code
      const qrCodeData = `คอนเสิร์ต: ${booking.concertDetails.concertName}
      วันที่: ${moment(
        booking.concertDetails.Schedule.find((s) => s.id === booking.scheduleId)
          ?.date
      ).format("DD/MM/YYYY")}
      สถานที่: ${booking.concertDetails.venue}`;

      const qrCodeURL = await QRCode.toDataURL(qrCodeData);

      // โหลดฟอนต์ไทยจาก Google Fonts (ต้องใช้ base64 หรือ CDN)
      doc.addFont(
        "../../public/fonts/Prompt-Regular.ttf",
        "Prompt-Regular",
        "normal"
      );
      doc.setFont("Prompt-Regular");

      // เพิ่มโลโก้ (ใช้ Base64 หรือ URL)
      const logoBase64 = "../../public/logo.png"; // ใส่ Base64 ของโลโก้ที่นี่
      doc.addImage(logoBase64, "PNG", 85, 10, 40, 20);

      // เพิ่มข้อมูลบัตร
      doc.setFontSize(16);
      doc.text("บัตรคอนเสิร์ต", 90, 40);
      doc.setFontSize(12);
      doc.text(`คอนเสิร์ต: ${booking.concertDetails.concertName}`, 20, 60);
      doc.text(
        `วันที่: ${moment(
          booking.concertDetails.Schedule.find(
            (s) => s.id === booking.scheduleId
          )?.date
        ).format("DD/MM/YYYY")}`,
        20,
        70
      );
      doc.text(`สถานที่: ${booking.concertDetails.venue}`, 20, 80);
      doc.text(`จำนวนบัตร: ${booking.quantity}`, 20, 90);
      doc.text(
        `สถานะ: ${
          booking.status === "NotPaying" ? "ยังไม่จ่ายเงิน" : "จ่ายเงินแล้ว"
        }`,
        20,
        100
      );

      // เพิ่ม QR Code ลงใน PDF
      doc.addImage(qrCodeURL, "PNG", 140, 120, 50, 50);
      doc.text("สแกน QR เพื่อดูรายละเอียด", 140, 180);

      // บันทึก PDF
      doc.save(`ticket_${booking.concertDetails.concertName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-2xl">กำลังโหลดข้อมูลการจอง...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-5">
        <div className="flex justify-center">
          <div className="flex max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <h1 className="text-3xl font-bold text-gray-800 text-center mb-5">
                บัตรของคุณ
              </h1>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                {bookings.map((booking) => {
                  const selectedSchedule =
                    booking.concertDetails?.Schedule?.find(
                      (schedule) => schedule.id === booking.scheduleId
                    );

                  return (
                    <div
                      key={booking.id}
                      className="p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">
                        {booking.concertDetails?.concertName ||
                          "ไม่พบข้อมูลคอนเสิร์ต"}
                      </h2>
                      <p className="text-gray-600 flex gap-1 py-1">
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
                          className="lucide lucide-calendar-days"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        วันที่:{" "}
                        {selectedSchedule
                          ? moment(selectedSchedule.date).format("DD/MM/YYYY")
                          : "ไม่พบข้อมูล"}
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1">
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
                          className="lucide lucide-clock"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        เวลา:{" "}
                        {selectedSchedule
                          ? `${selectedSchedule.startTime} - ${selectedSchedule.endTime}`
                          : "ไม่พบข้อมูล"}
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1">
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
                          className="lucide lucide-map-pin"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        สถานที่: {booking.concertDetails?.venue || "N/A"}
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1">
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
                          className="lucide lucide-tag"
                        >
                          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                          <circle
                            cx="7.5"
                            cy="7.5"
                            r=".5"
                            fill="currentColor"
                          />
                        </svg>
                        ราคา:{" "}
                        {booking.concertDetails?.price * booking.totalTickets}{" "}
                        บาท
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1 font-bold">
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
                          className="lucide lucide-ticket"
                        >
                          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        จำนวนบัตร: {booking.totalTickets} ใบ
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1 font-bold">
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
                          class="lucide lucide-shield-check"
                        >
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        สถานะ:{" "}
                        {booking.status === "NotPaying" ? (
                          <p className="text-red-500">ยังไม่ชำระเงิน</p>
                        ) : (
                          <p className="text-green-700">ชำระเงินแล้ว</p>
                        )}
                      </p>
                      <p className="text-gray-600 flex gap-1 py-1 mt-2">
                        วันที่ซื้อบัตร:{" "}
                        {selectedSchedule
                          ? moment(booking.bookingDate).format("DD/MM/YYYY")
                          : "ไม่พบข้อมูล"}
                      </p>
                      {booking.status !== "NotPaying" ? (
                        <button
                          onClick={() => downloadPDF(booking)}
                          className="mt-3 text-blue-500 py-2 px-4 flex items-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] transition-all duration-200 rounded-lg"
                        >
                          ดาวน์โหลดบัตร{" "}
                        </button>
                      ) : (
                        <NavLink to={`/user/checkout/${booking.id}`}>
                          <button className="mt-3 text-red-500 py-2 px-4 flex items-center gap-1 border-transparent hover:border-red-500 hover:border-b-2 hover:pb-[5px] transition-all duration-200 rounded-lg">
                            ชำระเงิน
                          </button>
                        </NavLink>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default ConcertBooking;
