import http from "../../http-common";

const login = async (data) => {
  try {
    const response = await http.post("/api/login", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
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

    // ดึงข้อความจาก backend ถ้ามี
    const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการสมัคร";
    
    throw new Error(errorMessage);
  }
};


const AdminCheck = async () => {
  const token = localStorage.getItem("token");
  return http.post("/api/current-admin", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserCheck = async () => {
  const token = localStorage.getItem("token");
  return http.post("/api/current-user", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AuthService = {
  login,
  register,
  AdminCheck,
  UserCheck,
};

export default AuthService;
