import axios from "axios";

export default axios.create({
  baseURL: "concert-yyqf.onrender.com/",
  headers: {
    "Content-type": "application/json"
  }
});
