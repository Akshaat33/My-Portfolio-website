import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-portfolio-website-nvvd.onrender.com/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',},
});

export default api;
