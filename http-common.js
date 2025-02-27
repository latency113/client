import axios from "axios";

export default axios.create({
  baseURL: "https://concert-production.up.railway.app/",
  headers: {
    "Content-type": "application/json"
  }
});
