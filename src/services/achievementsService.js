import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({ baseURL: apiUrl, withCredentials: true });

export function getUserAchievements(page, limit) {
    return api.get('/user/achievements', {
        params: {page: page, limit: limit}
    });
}