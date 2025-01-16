import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
    if (!userId) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการจอง");
      navigate("/login");
      return;
    }
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

    const availableTickets = data.Schedule.find(
      (schedule) => schedule.id === selectedSchedule
    )?.availableTickets;

    if (totalTickets > availableTickets) {
      toast.error("จำนวนบัตรที่เลือกเกินกว่าจำนวนที่มีในรอบการแสดง");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/booking",
        {
          concertId: id,
          totalTickets: totalTickets,
          scheduleId: selectedSchedule,
          userId: userId, // ใช้ userId ที่ได้จาก Token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("ซื้อตั๋วสำเร็จ");
    } catch (error) {
      console.error("Error creating booking:", error);
      setError(error.response?.data?.message || "เกิดข้อผิดพลาดในการจองบัตร");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-center">
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
    <Navbar/>
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center min-h-screen p-4">
        <div className="w-full md:w-[80%] lg:w-[60%] rounded-lg overflow-hidden">
          <div className="p-4">
            <NavLink
              to="/concert"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-all"
            >
              ← ย้อนกลับ
            </NavLink>
          </div>
          <div className="flex justify-center">
            <div>
              <img src={data.pictureUrl} alt="" />
            </div>
            <div className="p-4 text-white bg-slate-800 rounded-lg">
              <h1 className="text-2xl font-bold mb-2">{data.concertName}</h1>
              <p>
                {" "}
                {data.Schedule.map((schedule) => (
                  <span key={schedule.id} value={schedule.id}>
                    {moment(schedule.date).format("DD/MM/YYYY")} เวลา{" "}
                    {schedule.startTime} น. - {schedule.endTime} น.
                  </span>
                ))}
              </p>
              <p>📍 สถานที่: {data.venue}</p>
              <p>💵 ราคา: {data.price?.toLocaleString()} บาท</p>
              <button
                onClick={toggleModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ซื้อตั๋ว
              </button>
            </div>
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
                htmlFor="schedule"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกรอบการแสดง:
              </label>
              <select
                id="schedule"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedSchedule(e.target.value)}
              >
                <option value="">เลือก</option>
                {data.Schedule.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {moment(schedule.date).format("DD/MM/YYYY")} :{" "}
                    {schedule.startTime} น. - {schedule.endTime} น.
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
                className="w-full mt-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default ConcertDetail;
