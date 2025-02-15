import http from "../../http-common";

const login = (data) => {
  return http.post("/api/login",data);
};

const register = (data) => {
  return http.post("/api/register",data)
}
const AuthService = {
  login,register
};

export default AuthService;
