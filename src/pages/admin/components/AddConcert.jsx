import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddConcert = () => {
  const [concertName, setConcertName] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [picture, setPicture] = useState(null);
  const [schedules, setSchedules] = useState([
    { date: "", startTime: "", endTime: "" },
  ]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setSchedules(updatedSchedules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("price", price);
    formData.append("seatsAvailable", seatsAvailable);
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("schedules", JSON.stringify(schedules));

    try {
      const response = await axios.post(
        "http://localhost:4000/api/concerts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <Navbar />
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center mt-5">
              Add New Concert
            </h2>

            {message && <div className="text-green-600 mb-4">{message}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

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
                Add Concert
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddConcert;
