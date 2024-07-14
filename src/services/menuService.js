// src/services/menuService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getMenuItems = () => {
    return axios.get(`${API_URL}/menu-items/`);
};
