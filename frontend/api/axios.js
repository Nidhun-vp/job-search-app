import axios from "axios";

const API = axios.create({
  baseURL: "https://job-search-app-nine-xi.vercel.app",
});

export default API;
