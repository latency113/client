import http from "../../http-common";

const get = () => {
  return http.get("/api/users");
};

const getUserProfile = (token) => {
  return http.get("/api/user/profile",token);
};

const updateUserProfile = (data) => {
  return http.put("/api/user/profile", data);
};

const updateRole = (id, role) => {
  if (!["admin", "user"].includes(role)) {
    return Promise.reject(new Error("Invalid role provided"));
  }

  return http.put(`/api/change-role/${id}`, { role });
};

const deleteUser = (id) => {
  return http.delete(`/api/user/${id}`);
};

const UserService = {
  get,
  getUserProfile,
  updateUserProfile,
  updateRole,
  deleteUser
};

export default UserService;
