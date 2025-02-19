import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import "react-toastify/dist/ReactToastify.css";
import AddConcertModal from "./AddConcertModal";
import EditConcertModal from "./EditConcertModal";
import concertService from "../../../services/concert.service";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedConcert, setSelectedConcert] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await concertService.get();
        if (
          response &&
          response.data &&
          response.data.concerts &&
          Array.isArray(response.data.concerts)
        ) {
          setConcerts(response.data.concerts);
        } else {
          console.error("Invalid data format from API:", response);
          setError("Invalid data format from API");
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
        title: 'ต้องการลบคอนเสิร์ตนี้ใช่มั้ย',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'gray',
        confirmButtonText: 'ตกลง'
    }).then(async (result) => { 
        if (result.isConfirmed) {
            try {
                await concertService.remove(id);
                setConcerts(concerts.filter((concert) => concert.id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your concert has been deleted.',
                    'success'
                );
            } catch (err) {
                console.error("Delete error:", err);
                Swal.fire(
                    'Error!',
                    'เกิดข้อผิดพลาด: ' + err.message,
                    'error'
                );
            }
        }
    });
};


  const handleEditClick = (concert) => {
    console.log("Concert data:", concert);
    setSelectedConcert(concert);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedConcert(null); 
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <div className="container mx-auto mt-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Concert Management
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                All Concerts
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Concert
              </button>
            </div>
            <div className="overflow-x-auto">
              {concerts.length === 0 ? (
                <div className="text-center text-gray-500">
                  No concerts available
                </div>
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
                      <tr
                        key={concert.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{concert.concertName}</td>
                        <td className="p-3">
                          {concert.Schedule.length > 0
                            ? new Date(
                                concert.Schedule[0].date
                              ).toLocaleDateString()
                            : "No schedule available"}
                        </td>
                        <td className="p-3">{concert.venue}</td>
                        <td className="p-3">{concert.seatsAvailable}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEditClick(concert)} // เรียกฟังก์ชัน handleEditClick
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
      <EditConcertModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        concert={selectedConcert}
      />
      <AddConcertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default Concert;
