import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import concertService from "../../../services/Concert.service";
import brandService from "../../../services/brand.service";

const AddConcertModal = ({ isOpen, onClose }) => {
  const [concertName, setConcertName] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState(""); // เปลี่ยนจาก brands เป็น brand
  const [brands, setBrands] = useState([]); // State to hold the list of brands
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState('');
  const [schedules, setSchedules] = useState([
    { date: "", startTime: "", endTime: "" },
  ]);

  const fetchBrands = async () => {
    try {
      const brands = await brandService.getBrands(); // Call the getBrands method
      setBrands(brands); // Set the fetched brands in state
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands.");
    }
  };

  useEffect(() => {
    fetchBrands(); // เรียก fetchBrands เมื่อคอมโพเนนต์โหลดเสร็จ
  }, []);

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
    if (setPicture) {
      setFileName(setPicture.name); // แสดงชื่อไฟล์
    }
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setSchedules(updatedSchedules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!picture) {
      toast.error("กรุณาเลือกไฟล์รูปภาพก่อนส่งข้อมูล!");
      return;
    }

    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("price", parseFloat(price)); // แปลงเป็นตัวเลข
    formData.append("brandId", brand !== null ? brand : null); // ส่ง brand ที่เลือกหรือ null
    formData.append("seatsAvailable", parseInt(seatsAvailable)); // แปลงเป็นตัวเลข
    formData.append("picture", picture);
    formData.append("schedules", JSON.stringify(schedules));

    console.log("📂 FormData before sending:", formData.get("picture"));

    try {
      await concertService.create(formData);
      toast.success("Concert added successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Error creating concert:", error);
      toast.error("Failed to add concert.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 w-11/12 sm:w-1/2 md:w-2/3 lg:w-1/4 relative z-10 transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Add New Concert</h2>
          <button
            onClick={onClose}
            className="text-red-500 py-2 px-4 rounded-full hover:border hover:border-red-500 hover:bg-red-100"
          >
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          ชื่อคอนเสิร์ต
          <input
            type="text"
            placeholder="Concert Name"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          สถานที่จัดงาน
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          เลือกวงดนตรี
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
          >
            <option value="">Select Brand</option>
            {brands.map((brandItem) => (
              <option key={brandItem.id} value={brandItem.id}>
                {brandItem.name}
              </option>
            ))}
          </select>
          ราคาบัตร
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          จำนวนบัตร
          <input
            type="number"
            placeholder="Seats Available"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          <label className="flex items-center gap-2 cursor-pointer w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4">
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
              className="lucide lucide-hard-drive-upload"
            >
              <path d="m16 6-4-4-4 4" />
              <path d="M12 2v8" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <path d="M6 18h.01" />
              <path d="M10 18h.01" />
            </svg>
            {fileName ? `ไฟล์ที่เลือก: ${fileName}` : "เลือกรูปภาพ"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {/* Schedule Section */}
          <div className="my-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                ตารางเวลา:{" "}
              </label>
              <button
                type="button"
                onClick={handleAddSchedule}
                className="mt-2 text-blue-500 text-sm rounded flex gap-1"
              >
                เพิ่มวันเวลา
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
                  class="lucide lucide-between-horizontal-end"
                >
                  <rect width="13" height="7" x="3" y="3" rx="1" />
                  <path d="m22 15-3-3 3-3" />
                  <rect width="13" height="7" x="3" y="14" rx="1" />
                </svg>
              </button>
            </div>
            {Array.isArray(schedules) &&
              schedules.map((schedule, index) => (
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
                      class="lucide lucide-eraser"
                    >
                      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
                      <path d="M22 21H7" />
                      <path d="m5 11 9 9" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="w-full mt-3 text-xl text-green-500 py-2 px-4 text-center gap-1 border-transparent hover:border-green-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
          >
            <p className="flex gap-2 items-center justify-center">
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
                class="lucide lucide-circle-plus"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              Add Concert
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddConcertModal;
