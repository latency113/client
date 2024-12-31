import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const callApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/concerts");
      console.log(res.data.concerts);
      setConcerts(res.data.concerts);
      setLoading(false);
    } catch (error) {
      setError("ไม่มีสิทธิ์");
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleEdit = (concert) => {
    navigate(`/admin/edit-concert/${concert.id}`, { state: { concert } });
  };

  if (loading) {
    return <div>Loading concerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Navbar />
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <h3 className="text-xl font-semibold mb-4">Recent Concerts</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Concert Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Venue</th>
                <th className="p-2">Tickets Sold</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((concert) => (
                <tr key={concert.id}>
                  <td className="border-b p-2">{concert.concertName}</td>
                  <td className="border-b p-2">
                    {concert.Schedule.length > 0
                      ? new Date(concert.Schedule[0].date).toLocaleDateString()
                      : "No schedule available"}
                  </td>
                  <td className="border-b p-2">{concert.venue}</td>
                  <td className="border-b p-2">{concert.seatsAvailable}</td>
                  <td className="border-b p-2">
                    <button
                      onClick={() => handleEdit(concert)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
