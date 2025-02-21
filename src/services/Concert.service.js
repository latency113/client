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

const create = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const headers = {
      // Define headers object first
      Authorization: `Bearer ${token}`,
    };

    console.log("Headers in request:", headers); // Log the headers *before* the request

    const response = await http.post("/api/concerts", data, {
      headers: headers, // Use the defined headers object
    });
    return response.data;
  } catch (error) {
    console.error("Error creating concert:", error);
    throw error;
  }
};

const update = async (data, id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await http.put(`/api/concert/${id}`, data, {
      headers: headers, // Do NOT set Content-Type here when using FormData
    });

    return response.data;
  } catch (error) {
    console.error("Error update concert:", error);

    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Server response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Request setup error:", error.message);
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
