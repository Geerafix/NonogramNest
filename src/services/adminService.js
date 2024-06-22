import axios from 'axios';

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getUsers(page, limit) {
    return api.get('/users', {
        params: { page: page, limit: limit }
    });
}