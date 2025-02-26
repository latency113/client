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

const bookingService = {
  getAllBookings,
  getBookingByUserId,
  getConcertById,
};

export default bookingService;
