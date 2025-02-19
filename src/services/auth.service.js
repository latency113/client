import http from "../../http-common";

const login = async (data) => {
  try {
    const response = await http.post("/api/login", data);
    if (response.data.token) localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

const register = async (data) => {
  try {
    const response = await http.post("/api/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

const AuthService = {
  login,
  register,
};

export default AuthService;
