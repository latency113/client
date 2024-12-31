import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import moment from "moment";
import { toast } from "react-toastify";

const ConcertDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTickets, setTotalTickets] = useState(1);
  const [userId, setUserId] = useState(1); // Placeholder for dynamic user fetch
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      const response = await axios.post("http://localhost:4000/api/booking", {
        concertId: id,
        totalTickets: totalTickets,
        scheduleId: selectedSchedule,
        userId: userId,
      });
      toast.success("ซื้อตั๋วสำเร็จ");
      console.log("Booking response:", response.data);
    } catch (error) {
      console.error(
        "Error creating booking:",
        error.response?.data || error.message
      );
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
      <Navbar />
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
          <div className="flex flex-col md:flex-row space-x-5">
            <div className="relative md:w-[40%] h-40 md:h-auto">
              {data.pictureUrl ? (
                <img
                  src={data.pictureUrl}
                  alt={data.concertName}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-300">
                  <p className="text-gray-500 text-sm">ไม่มีภาพ</p>
                </div>
              )}
            </div>
            <div className="p-4 md:w-[60%] bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-lg">
              <h1 className="text-2xl font-bold mb-2">{data.concertName}</h1>
              <p className="flex gap-1">
                <svg
                  class="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="flex">
                  วันที่: {moment(data.Schedule.date).format("DD/MM/YYYY")}
                </span>
              </p>
              <p className="flex gap-1">
                <svg
                  class="w-6 h-6 "
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
                <span>สถานที่: {data.venue}</span>
              </p>
              <p className="flex gap-1">
                <svg
                  class="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                </svg>
                <span className="flex gap-1">
                  ราคา:{" "}
                  <p className="text-red-500">{data.price?.toLocaleString()}</p>{" "}
                  บาท
                </span>
              </p>

              {/* Schedule Section */}
              {data.Schedule?.length > 0 ? (
                <ul>
                  {data.Schedule.map((schedule, index) => (
                    <li key={index} className="flex gap-1">
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
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {moment(schedule.date).format("DD/MM/YYYY")} |{" "}
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
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>{" "}
                      {schedule.startTime} - {schedule.endTime}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>ไม่มีรอบการแสดง</p>
              )}

              {/* Modal Section */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">กรอกข้อมูลการจอง</h2>
                    <label className="block mb-2">เลือกรอบการแสดง:</label>
                    <select
                      value={selectedSchedule || ""}
                      onChange={(e) => setSelectedSchedule(e.target.value)}
                      className="border p-2 w-full mb-4 text-black"
                    >
                      <option value="" disabled>
                        กรุณาเลือกรอบ
                      </option>
                      {data.Schedule.map((schedule, index) => (
                        <option key={index} value={schedule.id}>
                          {moment(schedule.date).format("DD/MM/YYYY")} |{" "}
                          {schedule.startTime} - {schedule.endTime}
                        </option>
                      ))}
                    </select>

                    <label>จำนวนบัตร:</label>
                    <input
                      type="number"
                      className="border p-2 w-full mb-4 text-black"
                      value={totalTickets}
                      onChange={(e) =>
                        setTotalTickets(Math.max(1, parseInt(e.target.value)))
                      }
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                      >
                        ปิด
                      </button>
                      <button
                        onClick={handlePurchase}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      >
                        ยืนยันการจอง
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
      <Footer />
    </>
  );
};

export default ConcertDetail;
