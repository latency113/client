import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/concerts");
        setConcerts(response.data.concerts);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this concert?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/concert/${id}`);
      setConcerts(concerts.filter((concert) => concert.id !== id));
      toast.success("Concert deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete concert!");
    }
  };

  const handleEdit = (concert) => {
    navigate(`/admin/edit-concert/${concert.id}`, { state: concert });
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <div className="container mx-auto mt-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">Concert Management</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">All Concerts</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Concert
              </button>
            </div>
            <div className="overflow-x-auto">
              {concerts.length === 0 ? (
                <div className="text-center text-gray-500">No concerts available</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-100 text-gray-700">
                      <th className="p-3">Concert Name</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Venue</th>
                      <th className="p-3">Seats Available</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {concerts.map((concert) => (
                      <tr key={concert.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{concert.concertName}</td>
                        <td className="p-3">
                          {concert.Schedule.length > 0
                            ? new Date(concert.Schedule[0].date).toLocaleDateString()
                            : "No schedule available"}
                        </td>
                        <td className="p-3">{concert.venue}</td>
                        <td className="p-3">{concert.seatsAvailable}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(concert)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(concert.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddConcert setIsModalOpen={setIsModalOpen} />}
      <ToastContainer />
    </div>
  );
};

const AddConcert = ({ setIsModalOpen }) => {
  const [concertName, setConcertName] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [picture, setPicture] = useState(null);
  const [schedules, setSchedules] = useState([{ date: "", startTime: "", endTime: "" }]);

  const handleFileChange = (e) => setPicture(e.target.files[0]);

  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      { date: "", startTime: "", endTime: "" }, // Add an empty schedule
    ]);
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
  
    // Validate price and seatsAvailable
    if (price <= 0 || seatsAvailable <= 0) {
      toast.error("Price and seats available must be positive numbers.");
      return;
    }
  
    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("price", price);
    formData.append("seatsAvailable", seatsAvailable);
    if (picture) formData.append("picture", picture);
    formData.append("schedules", JSON.stringify(schedules));
  
    try {
      await axios.post('http://localhost:4000/api/concerts', formData);
      toast.success("Concert added successfully!");
      setIsModalOpen(false);  // Close the modal after successful submission
    } catch (err) {
      toast.error("Failed to add concert!");
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Concert</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Concert Name"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            placeholder="Seats Available"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
          
          {/* Schedule Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ตารางเวลา:</label>
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

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Concert;
