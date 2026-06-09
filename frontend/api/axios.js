import axios from "axios";

const API = axios.create({
  baseURL: "https://job-search-backend-azda.onrender.com",
});

export default API;
