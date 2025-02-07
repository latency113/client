import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // เรียกข้อมูลคอนเสิร์ตจาก API
  const callApi = async () => {
    try {
      const concertRes = await axios.get("http://localhost:4000/api/concerts");
      setConcerts(concertRes.data.concerts);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  };

  // ฟังก์ชันลบคอนเสิร์ต
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/concert/${id}`);
      setConcerts(concerts.filter((concert) => concert.id !== id));
      alert("Concert deleted successfully");
    } catch (err) {
      alert("Failed to delete concert");
    }
  };

  // ฟังก์ชันแก้ไขคอนเสิร์ต
  const handleEdit = (concert) => {
    navigate(`/admin/edit-concert/${concert.id}`, { state: concert });
  };

  useEffect(() => {
    callApi();
  }, []);


  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="mt-6 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Concert Management
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">All Concerts</h3>
            <div className="mb-4">
              <NavLink to="/admin/add-concert">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Add Concert
                </button>
              </NavLink>
            </div>
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2 text-left">Concert Name</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Venue</th>
                  <th className="p-2 text-left">Seats Available</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert) => (
                  <tr key={concert.id}>
                    <td className="border-b p-2">{concert.concertName}</td>
                    <td className="border-b p-2">
                      {concert.Schedule.length > 0
                        ? new Date(
                            concert.Schedule[0].date
                          ).toLocaleDateString()
                        : "No schedule available"}
                    </td>
                    <td className="border-b p-2">{concert.venue}</td>
                    <td className="border-b p-2">{concert.seatsAvailable}</td>
                    <td className="border-b p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(concert)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(concert.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concert;
