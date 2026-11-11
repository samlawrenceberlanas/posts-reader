
import { create } from "axios";

const api = create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
