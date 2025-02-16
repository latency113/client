import http from "../../http-common";

const get = () => {
  return http.get("/api/users");
};
const getUserProfile = () => {
  return http.get("/api/user/profile");
};

const updateUserProfile = () => {
  return http.put("/api/user/profile");
};

const UserService = {
  get,
  getUserProfile,
  updateUserProfile,
};

export default UserService;
