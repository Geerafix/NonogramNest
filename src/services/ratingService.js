import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export async function getRatingClassic(page, limit, size) {
    return await api.get('/rating/classic', {
        params: {
            page: page,
            limit: limit,
            size: size
        }
    });
}

export function getRatingChallenge(page, limit) {
    return api.get('/rating/challenges', {
        params: {
            page: page,
            limit: limit
        }
    });
}