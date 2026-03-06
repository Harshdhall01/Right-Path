import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

export const predictColleges = (data) => API.post('/predict', data);
export const getColleges = (params) => API.get('/colleges', { params });
export const getCollege = (id) => API.get(`/colleges/${id}`);
export const sendChat = (message, history) => API.post('/chat', { message, history });
export const calcROI = (data) => API.post('/roi', data);
export const getQuiz = () => API.get('/quiz');

export default API;