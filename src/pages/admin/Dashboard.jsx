import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserService from "./../../services/user.service";
import ConService from "../../services/concert.service";

const Dashboard = () => {
  const [concertCount, setConcertCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const callApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const concertRes = await ConService.get();
      const userRes = await UserService.get();
      setConcertCount(concertRes?.data?.concerts?.length || 0);
      setUserCount(userRes?.data?.users?.length || 0);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load data. Please check your authentication.");
      if (err.message === "No token found" || err.response?.status === 401) {
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Admin Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-200 hover:translate-y-1 transition duration-200">
              <h3 className="text-xl font-semibold mb-2">Total Concerts</h3>
              <p className="text-3xl font-bold text-blue-500">{concertCount}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-200 hover:translate-y-1 transition duration-200">
              <h3 className="text-xl font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-green-500">{userCount}</p>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
