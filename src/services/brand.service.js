import http from "../../http-common";

const getBrands = async () => {
    try {
      const response = await http.get("/api/brands"); // Adjust the API endpoint as necessary
      return response.data; // Assume response contains an array of brands
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  };

  const bookingService = {
    getBrands
  };
  
  export default bookingService;
  