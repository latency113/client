import http from "../../http-common";

const get = () => {
  return http.get("/api/concerts");
};
const getById = () => {
  return http.get("/api/concert/:id");
};
const ConcertService = {
  get,getById,
};

export default ConcertService;
