import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API}/resume/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const saveResume = async (data) => {
  const res = await axios.post(`${API}/resume/save`, data);
  return res.data;
};

export const getResume = async (id) => {
  const res = await axios.get(`${API}/resume/${id}`);
  return res.data;
};

export const enhanceText = async (text, context) => {
  const res = await axios.post(`${API}/resume/enhance`, { text, context });
  return res.data;
};
