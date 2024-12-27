import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const callApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/concerts");
      setConcerts(res.data.concerts);
      setLoading(false);
    } catch (error) {
      setError("Error fetching concerts");
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  if (loading) {
    return <div>Loading concerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Recent Concerts</h3>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">Concert Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Venue</th>
            <th className="p-2">Tickets Sold</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((concert) => (
            <tr key={concert.id}>
              <td className="border-b p-2">{concert.concertName}</td>
              <td className="border-b p-2">
                {moment(concert.concertDate).format("DD/MM/YYYY")}
              </td>
              <td className="border-b p-2">{concert.venue}</td>
              <td className="border-b p-2">{concert.seatsAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Navbar />

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Concerts</h3>
              <p className="text-3xl font-bold mt-2">50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Upcoming Concerts</h3>
              <p className="text-3xl font-bold mt-2">10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Tickets Sold</h3>
              <p className="text-3xl font-bold mt-2">1,500</p>
            </div>
          </div>

          <Concert />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
