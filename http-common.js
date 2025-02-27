import axios from "axios";

export default axios.create({
  baseURL: "concert-production.up.railway.app/",
  headers: {
    "Content-type": "application/json"
  }
});
