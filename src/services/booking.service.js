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

const getBookingByUserId = async (userId, token) => {
  try {
    if (!token) throw new Error("No token found");

    const response = await http.get(`/api/booking/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    throw error;
  }
};

const getConcertById = async (concertId, token) => {
  try {
    if (!token) throw new Error("No token found");

    const response = await http.get(`/api/concert/${concertId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching concert ${concertId}:`, error);
    throw error;
  }
};


const bookingService = {
  getAllBookings,
  getBookingByUserId,
  getConcertById,
};

export default bookingService;
