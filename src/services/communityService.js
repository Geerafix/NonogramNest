import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({ baseURL: apiUrl, withCredentials: true });

export function getCommunityPuzzles(page, limit, search, option) {
    return api.get('/community/puzzles', {
        params: {
            page: page,
            limit: limit,
            search: search,
            option: option
        }
    });
}

export function getCommunityPuzzle(id) {
    return api.get('/community/puzzle', {
        params: {
            created_id: id
        }
    });
}

export function postCommunityPuzzle(cluesX, cluesY, size, excludedTiles) {
    return api.post('/community/created', {
        cluesX: JSON.stringify(cluesX),
        cluesY: JSON.stringify(cluesY),
        size: size,
        excludedTiles: JSON.stringify(excludedTiles)
    });
}