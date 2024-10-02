import axios from 'axios';

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getUserAchievements(page, limit) {
    return api.get('/userAchievements', {
        params: { page: page, limit: limit }
    });
}