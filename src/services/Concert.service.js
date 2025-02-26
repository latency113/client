import http from "../../http-common";

const get = async () => {
  try {
    const response = await http.get("/api/concerts"); // Make the API call
    return response; // <-- Add this crucial return statement
  } catch (error) {
    console.error("Error fetching concerts:", error);
    throw error; // Re-throw the error so the component can handle it
  }
};

const create = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await http.post("/api/concerts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating concert:", error);
    throw error;
  }
};


const update = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");



    const response = await http.put(`/api/concert/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Concert updated response:", response); // เพิ่มบรรทัดนี้เพื่อตรวจสอบ response

    return response.data;
  } catch (error) {
    console.error("Error updating concert:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.status, error.response.data);
    }
    throw error;
  }
};


const getQuery = (query) => {
  return http.get(`/api/concerts/query?query=${encodeURIComponent(query)}`); // No auth needed?
};

const getConcertById = async (concertId) => {
  try {
    const response = await http.get(`/api/concert/${concertId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching concert ${concertId}:`, error);
    throw error;
  }
};

const remove = async (id) => {
  // Add async for error handling
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await http.delete(`/api/concert/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting concert:", error);
    throw error;
  }
};

const ConcertService = {
  get,
  getQuery,
  getConcertById,
  remove,
  create,
  update,
};

export default ConcertService;
