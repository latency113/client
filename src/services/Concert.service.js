import http from "../../http-common";

const get = () => {
  return http.get("/api/concerts");
};

const getQuery = (query) => {
  return http.get(`/api/concerts/query?query=${encodeURIComponent(query)}`);
};

const getById = (id) => {
  return http.get(`/api/concert/${id}`);
};

const ConcertService = {
  get,
  getQuery,
  getById,
};

export default ConcertService;
