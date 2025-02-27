import axios from "axios";

export default axios.create({
  baseURL: "https://concert-ysbe.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});
