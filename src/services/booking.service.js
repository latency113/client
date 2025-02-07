import http from "../http-common";

const get = () => {
  return http.get("/api/bookings");
};
const getById = () => {
  return http.get("/api/booking/user/:id");
};
const bookingService = {
  get,getById,
};

export default bookingService;
