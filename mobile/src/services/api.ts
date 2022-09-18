import axios from "axios";

const api = axios.create({
  baseURL: "https://d1d7-2804-1dfc-3043-e00-c153-ffa4-16d2-c9d6.sa.ngrok.io/",
});

export default api;
