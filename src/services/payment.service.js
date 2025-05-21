import http from "../../http-common";

const checkout = async (token, id) => {
  try {
    const response = await http.post(
      "/api/user/checkout",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating concert:", error);
    throw error;
  }
};

const checkoutstatus = async (token, session) => {
  try {
    const response = await http.get(`concert-yyqf.onrender.com/api/user/checkout-status/${session}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating concert:", error);
    throw error;
  }
};

const paymentService = {
  checkout,
  checkoutstatus,
};

export default paymentService;
