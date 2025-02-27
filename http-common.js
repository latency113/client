import axios from "axios";

export default axios.create({
  baseURL: "https://concert-yyqf.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});
