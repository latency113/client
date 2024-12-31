import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditConcert = () => {
  const { state } = useLocation();
  const concert = state?.concert;

  const [concertName, setConcertName] = useState(concert?.concertName || "");
  const [venue, setVenue] = useState(concert?.venue || "");
  const [price, setPrice] = useState(concert?.price || "");
  const [seatsAvailable, setSeatsAvailable] = useState(
    concert?.seatsAvailable || ""
  );
  const [schedules, setSchedules] = useState(concert?.schedules || []);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ฟังก์ชันจัดการการเลือกไฟล์
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  // ฟังก์ชันเพิ่มรอบตารางเวลา
  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", startTime: "", endTime: "" }]);
  };

  // ฟังก์ชันลบรอบตารางเวลา
  const handleRemoveSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของตารางเวลา
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setSchedules(updatedSchedules);
  };

  // ฟังก์ชันส่งข้อมูลเมื่อกดบันทึก
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("price", price);
    formData.append("seatsAvailable", seatsAvailable);
    formData.append("schedules", JSON.stringify(schedules));
    if (picture) formData.append("picture", picture);

    try {
      const res = await axios.put(
        `http://localhost:4000/api/concert/${concert.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response:", res); // log ผลลัพธ์จาก API
      toast.success("อัปเดตคอนเสิร์ตสำเร็จ");
      setError(null);
    } catch (err) {
      console.log("Error:", err); // log ข้อผิดพลาด
      toast.error("เกิดข้อผิดพลาดในการอัปเดตคอนเสิร์ต");
      setMessage("");
    }
  };

  if (!concert) {
    return <div>ไม่พบข้อมูลคอนเสิร์ต</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Navbar />
        <h2 className="text-2xl font-semibold my-6">
          แก้ไขคอนเสิร์ต: {concertName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อคอนเสิร์ต:
            </label>
            <input
              type="text"
              value={concertName}
              onChange={(e) => setConcertName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              สถานที่จัดคอนเสิร์ต:
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ราคา:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              จำนวนที่นั่งที่มี:
            </label>
            <input
              type="number"
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ตารางเวลา:
            </label>
            {schedules.map((schedule, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="date"
                  value={schedule.date}
                  onChange={(e) =>
                    handleScheduleChange(index, "date", e.target.value)
                  }
                  className="w-1/3 px-2 py-1 border border-gray-300 rounded"
                  required
                />
                <input
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) =>
                    handleScheduleChange(index, "startTime", e.target.value)
                  }
                  className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                  required
                />
                <input
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) =>
                    handleScheduleChange(index, "endTime", e.target.value)
                  }
                  className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(index)}
                  className="text-red-600 hover:underline"
                >
                  ลบ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSchedule}
              className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              เพิ่มรอบ
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              รูปภาพคอนเสิร์ต:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "กำลังอัปเดต..." : "อัปเดตคอนเสิร์ต"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditConcert;
