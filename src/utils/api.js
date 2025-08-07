import axios from "axios";

const api = axios.create({
  baseURL: "https://freelance-backend-3.onrender.com",
  withCredentials: true, // IMPORTANT for cookies and auth
});

export default api;
