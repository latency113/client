import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import bookingService from "../services/booking.service";

const ConcertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTickets, setTotalTickets] = useState(1);
  const [userId, setUserId] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    // ดึง token และ decode หา userId
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการจอง");
      navigate("/login");
    } else {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload)); // ใช้ atob เพื่อแปลง Base64 เป็น string
        setUserId(decodedPayload.id); // ดึง id จาก Payload
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Token ไม่ถูกต้อง, กรุณาเข้าสู่ระบบอีกครั้ง");
        navigate("/login");
      }
    }
  }, [navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // เปลี่ยนสถานะการเปิด/ปิด Modal
  };

  const callApi = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/concert/${id}`);
      setData(res.data.concert);
    } catch (error) {
      console.error("Error fetching concert details:", error);
      setError("ไม่สามารถโหลดข้อมูลคอนเสิร์ตได้");
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  const handlePurchase = async () => {
    if (!selectedSchedule) {
      toast.error("กรุณาเลือกรอบการแสดงก่อนทำการจอง");
      return;
    }
  
    const schedule = data.Schedule.find(
      (schedule) => schedule.id === selectedSchedule
    );
  
    if (!schedule) {
      toast.error("รอบการแสดงไม่ถูกต้อง");
      return;
    }
  
    const availableTickets = schedule.availableTickets;
  
    if (totalTickets > availableTickets) {
      toast.error(
        `จำนวนบัตรที่เลือกเกินกว่าจำนวนที่มีในรอบการแสดง (${availableTickets} ตั๋วเหลืออยู่)`
      );
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อนทำการจอง");
        navigate("/login");
        return;
      }
  
      const bookingData = {
        concertId: id,
        totalTickets,
        scheduleId: selectedSchedule,
      };
  
      console.log("Booking Data: ", bookingData);
  
      const response = await bookingService.createBooking(bookingData, token);
  
      // ตรวจสอบข้อมูล response ที่ได้รับ
      console.log("Response from API: ", response);
  
      // ตรวจสอบว่า response.booking หรือ bookingId อยู่ในที่ไหน
      if (response?.data?.id) {
        const bookingId = response.data.id;
        setIsModalOpen(false);
        navigate(`/user/checkout/${bookingId}`); // ไปยังหน้า checkout
      } else if (response?.booking?.id) {
        const bookingId = response.booking.id;
        setIsModalOpen(false);
        navigate(`/user/checkout/${bookingId}`); // ไปยังหน้า checkout
      } else {
        console.error("Booking ID is not found!", response);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการจองบัตร"
      );
    }
  };
  
  

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-red-500 text-2xl mb-4">{error}</p>
        <NavLink
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          ย้อนกลับ
        </NavLink>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-white text-xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white flex justify-center min-h-screen p-4">
        <div className="container mx-auto md:w-[80%] lg:w-[60%] rounded-lg overflow-hidden">
          <hr />
          <button className="p-4">
            <NavLink
              to="/concert"
              className=" w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
            >
              ← ย้อนกลับ
            </NavLink>
          </button>
          <div className="flex flex-col md:flex-row gap-4">
            {/* รูปคอนเสิร์ต */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={data.pictureUrl}
                alt="concert"
                className="w-full md:w-auto rounded-lg shadow-md"
              />
            </div>

            {/* รายละเอียดคอนเสิร์ต */}
            <div className="w-full md:w-2/3 flex flex-col justify-between text-gray-700">
              <div>
                <h1 className="text-2xl font-bold">{data.concertName}</h1>

                <p className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar text-blue-700"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="ml-2">
                    {data.Schedule.map((Schedule) => (
                      <span key={Schedule.id}>
                        {moment(Schedule.date).format("DD/MM/YYYY")}
                      </span>
                    ))}
                  </span>
                </p>

                <p className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock-3 text-red-700"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16.5 12" />
                  </svg>
                  <span className="ml-2 ">
                    {data.Schedule.map((Schedule) => (
                      <span key={Schedule.id}>
                        {Schedule.startTime} - {Schedule.endTime} น.
                      </span>
                    ))}
                  </span>
                </p>

                <p className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin text-green-700"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="ml-2">สถานที่: {data.venue}</span>
                </p>
              </div>

              {/* ปุ่มซื้อตั๋ว */}
              <button
                onClick={toggleModal}
                className="flex justify-center w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
              >
                ซื้อตั๋ว {data.price?.toLocaleString()} บาท
              </button>
            </div>
          </div>

          <div className="bg-gray-100 w-full p-4 mt-4 rounded-md">
            <p>รายละเอียด</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">ยืนยันการซื้อตั๋ว</h2>

            {/* เลือกรอบการแสดง */}
            <div className="mb-4">
              <label
                htmlFor="Schedule"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกรอบการแสดง:
              </label>
              <select
                id="Schedule"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedSchedule(e.target.value)}
              >
                <option value="">เลือก</option>
                {data.Schedule.map((Schedule) => (
                  <option key={Schedule.id} value={Schedule.id}>
                    {moment(Schedule.date).format("DD/MM/YYYY")} :{" "}
                    {Schedule.startTime} น. - {Schedule.endTime} น.
                  </option>
                ))}
              </select>
            </div>

            {/* จำนวนตั๋ว */}
            <div className="mb-4">
              <label
                htmlFor="totalTickets"
                className="block text-sm font-medium text-gray-700"
              >
                จำนวนตั๋ว:
              </label>
              <input
                type="number"
                id="totalTickets"
                value={totalTickets}
                onChange={(e) => setTotalTickets(e.target.value)}
                min="1"
                max="10"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* ปุ่มยืนยัน */}
            <div className="mt-4">
              <button
                onClick={handlePurchase}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                ยืนยันการซื้อตั๋ว
              </button>
              <button
                onClick={toggleModal}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ConcertDetail;
