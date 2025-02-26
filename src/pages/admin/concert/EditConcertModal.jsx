import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import concertService from "../../../services/concert.service";
import brandService from "../../../services/brand.service";

const EditConcertModal = ({ isOpen, onClose, concert }) => {
  const [concertName, setConcertName] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [image, setImage] = useState(null); // ใช้สำหรับเก็บภาพที่เลือก
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await brandService.getBrands();
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands.");
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (concert) {
      setConcertName(concert.concertName);
      setVenue(concert.venue);
      setPrice(concert.price);
      setBrand(concert.brandId);
      setSeatsAvailable(concert.seatsAvailable);
      setImage(concert.picture); // ถ้ามีภาพที่ถูกอัปโหลดอยู่แล้ว
      if (concert.Schedules && concert.Schedules.length > 0) {
        setSchedules(
          concert.Schedules.map((Schedule) => ({
            id: Schedule.id || Date.now() + Math.random(),
            date: Schedule.date ? Schedule.date.split("T")[0] : "",
            startTime: Schedule.startTime || "",
            endTime: Schedule.endTime || "",
          }))
        );
      } else {
        setSchedules([
          { id: Date.now(), date: "", startTime: "", endTime: "" },
        ]);
      }
    }
  }, [concert]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.includes(file.type)) {
        setImage(file);
      } else {
        toast.error("Please upload a valid image (JPEG, PNG, GIF).");
      }
    }
  };

  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      { id: Date.now(), date: "", startTime: "", endTime: "" },
    ]);
  };

  const handleRemoveSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleScheduleChange = (id, field, value) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0 || seatsAvailable <= 0) {
      toast.error("ราคาหรือจำนวนที่นั่งต้องเป็นตัวเลขที่มากกว่าศูนย์");
      return;
    }

    const formData = new FormData();
    formData.append("id", concert.id);
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("price", price);
    formData.append("brandId", brand);
    formData.append("seatsAvailable", seatsAvailable);
    formData.append("schedules", JSON.stringify(schedules));

    // ตรวจสอบว่าไฟล์ภาพมีการเลือกหรือไม่ และส่งไฟล์นั้นไป
    if (image && typeof image !== "string") {
      formData.append("picture", image); // ถ้าเป็นไฟล์ภาพจริงๆ จะต้อง append ภาพไป
    } else {
      console.log("No image selected or image is already in string format");
    }

    try {
      const response = await concertService.update(formData, concert.id);
      console.log("Full response:", response);

      if (response?.message === "อัพเดตคอนเสิร์ตสำเร็จ") {
        toast.success("คอนเสิร์ตอัพเดตสำเร็จ!");
        setTimeout(() => {
          onClose();
          setConcertName("");
          setVenue("");
          setPrice("");
          setBrand("");
          setSeatsAvailable("");
          setImage(null);
          setSchedules([
            { id: Date.now(), date: "", startTime: "", endTime: "" },
          ]);
        }, 1000);
      } else {
        toast.error("ไม่สามารถอัพเดตคอนเสิร์ตได้");
      }
    } catch (error) {
      console.error("Error in updating concert:", error);
      toast.error(
        `ไม่สามารถอัพเดตคอนเสิร์ตได้: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 w-11/12 sm:w-1/2 md:w-2/3 lg:w-1/4 relative z-10 transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Edit Concert</h2>
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
          <input
            type="text"
            placeholder="Concert Name"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
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
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />
          <input
            type="number"
            placeholder="Seats Available"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg mb-4"
            required
          />

          {/* แสดงภาพตัวอย่างถ้ามีการเลือกไฟล์ */}
          {image && (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Concert"
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}

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
              class="lucide lucide-hard-drive-upload"
            >
              <path d="m16 6-4-4-4 4" />
              <path d="M12 2v8" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <path d="M6 18h.01" />
              <path d="M10 18h.01" />
            </svg>
            Select File
            <input
              type="file"
              accept="images/photo/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

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
            {schedules.map((Schedule) => (
              <div key={Schedule.id} className="flex items-center gap-2 mb-2">
                <input
                  type="date"
                  value={Schedule.date}
                  onChange={(e) =>
                    handleScheduleChange(Schedule.id, "date", e.target.value)
                  }
                  className="w-1/3 px-2 py-1 border rounded"
                  required
                />
                <input
                  type="time"
                  value={Schedule.startTime}
                  onChange={(e) =>
                    handleScheduleChange(
                      Schedule.id,
                      "startTime",
                      e.target.value
                    )
                  }
                  className="w-1/4 px-2 py-1 border rounded"
                  required
                />
                <input
                  type="time"
                  value={Schedule.endTime}
                  onChange={(e) =>
                    handleScheduleChange(Schedule.id, "endTime", e.target.value)
                  }
                  className="w-1/4 px-2 py-1 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(Schedule.id)}
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
            className="w-full mt-3 text-xl text-yellow-500 py-2 px-4 text-center gap-1 border-transparent hover:border-yellow-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
          >
            Edit Concert
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditConcertModal;
