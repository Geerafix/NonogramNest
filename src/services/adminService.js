import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function getUsers(page, limit) {
    return api.get('/users', {
        params: {
            page: page, 
            limit: limit
        }
    });
}

export function getPuzzles(page, limit) {
    return api.get('/puzzles', {
        params: {
            page: page,
            limit: limit
        }
    });
}