import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_KINDLYDO_URL
});

export default api;