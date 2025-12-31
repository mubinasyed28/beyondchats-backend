import axios from "axios";

const api = axios.create({
  baseURL: "https://beyondchats-backend-er9r.onrender.com/api", 
  // ⬆️ later replace with deployed backend URL
});

export default api;
