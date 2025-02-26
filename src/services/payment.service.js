import http from "../../http-common";

const payment = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await http.post("/api/user/create-checkout-session", {
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

const UserService = {
  payment,
};

export default UserService;
