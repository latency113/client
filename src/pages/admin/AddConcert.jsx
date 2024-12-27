import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const AddConcert = () => {
  const [concertName, setConcertName] = useState("");
  const [venue, setVenue] = useState("");
  const [concertDate, setConcertDate] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("venue", venue);
    formData.append("concertDate", concertDate);
    formData.append("price", price);
    formData.append("seatsAvailable", seatsAvailable);
    if (picture) {
      formData.append("picture", picture);
    }

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
                  Concert Name:
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
                  Venue:
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
                  Concert Date:
                </label>
                <input
                  type="date"
                  value={concertDate}
                  onChange={(e) => setConcertDate(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price:
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
                  Seats Available:
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
                  Concert Picture:
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
      </div>
    </>
  );
};

export default AddConcert;
