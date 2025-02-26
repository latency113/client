import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  // ฟังก์ชันเพื่อหาวันที่เริ่มต้นและวันสุดท้าย
  const getConcertStartDate = (schedule) => {
    if (schedule && schedule.length > 0) {
      const startDate = new Date(
        Math.min(...schedule.map((s) => new Date(s.date)))
      );
      return startDate.toLocaleDateString();
    }
    return "No schedule available";
  };

  const getConcertEndDate = (schedule) => {
    if (schedule && schedule.length > 0) {
      const endDate = new Date(
        Math.max(...schedule.map((s) => new Date(s.date)))
      );
      return endDate.toLocaleDateString();
    }
    return "No schedule available";
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "ต้องการลบคอนเสิร์ตนี้ใช่มั้ย",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "ตกลง",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await concertService.remove(id);
          setConcerts(concerts.filter((concert) => concert.id !== id));
          Swal.fire("Deleted!", "Your concert has been deleted.", "success");
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error!", "เกิดข้อผิดพลาด: " + err.message, "error");
        }
      }
    });
  };

  const handleEditClick = (concert) => {
    setSelectedConcert(concert);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedConcert(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
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
                onClick={() => setIsAddModalOpen(true)}
                className="mt-3 text-xl text-blue-500 py-2 px-4 text-center gap-1 rounded-lg border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] transition-all duration-200"
              >
                <p className="flex items-center gap-1">
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
                    class="lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  เพิ่มคอนเสิร์ต
                </p>
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
                      <th className="p-3">ชื่อคอนเสอร์ต</th>
                      <th className="p-3">วันแรก</th>
                      <th className="p-3">วันสุดท้าย</th>
                      <th className="p-3">สถานี</th>
                      <th className="p-3">จำนวนบัตร</th>
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
                          {getConcertStartDate(concert.Schedule)}
                        </td>
                        <td className="p-3">
                          {getConcertEndDate(concert.Schedule)}
                        </td>
                        <td className="p-3">{concert.venue}</td>
                        <td className="p-3">{concert.seatsAvailable}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEditClick(concert)}
                            className="mt-3 text-xl text-yellow-500 py-2 px-4 text-center gap-1 border-transparent rounded-lg hover:border-yellow-500 hover:border-b-2 hover:pb-[5px] transition-all duration-200"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() => handleDelete(concert.id)}
                            className="mt-3 text-xl text-red-500 py-2 px-4 text-center gap-1 border-transparent rounded-lg hover:border-red-500 hover:border-b-2 hover:pb-[5px] transition-all duration-200"
                          >
                            ลบ
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
      <AddConcertModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      <ToastContainer />
    </div>
  );
};

export default Concert;
