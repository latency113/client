import http from "../../http-common";

const getAllBookings = async () => {
  try {
    const response = await http.get("/api/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

const getBookingByUserId = async (id) => {
  try {
    const response = await http.get(`/api/booking/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${id}:`, error);
    throw error;
  }
};

const getConcertById = async (id) => {
  try {
    const response = await http.get(`/api/concert/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching concert ${id}:`, error);
    throw error;
  }
};

const createBooking = async (bookingData, token) => {
  try {
    const response = await http.post(
      "http://localhost:4000/api/bookings", // Your backend API endpoint
      bookingData, // Send booking data in the body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    console.log("Response from API:", response.data); // ตรวจสอบ response
    return response.data; // ตรวจสอบว่า return ค่าที่ API ส่งมาหรือไม่
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

const bookingService = {
  getAllBookings,
  getBookingByUserId,
  getConcertById,
  createBooking,
};

export default bookingService;
