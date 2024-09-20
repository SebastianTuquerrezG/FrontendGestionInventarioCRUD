import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL de la API
});

export default api;
