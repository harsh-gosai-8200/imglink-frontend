import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // must match backend @RequestParam("image")

  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};