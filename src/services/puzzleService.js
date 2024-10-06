import axios from "axios";

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function getPuzzles(page, limit) {
    return api.get('/puzzles', {
        params: {
            page: page,
            limit: limit
        }
    });
}

export function postPuzzle(cluesX, cluesY, size) {
    return api.post('/puzzle', {
        cluesX: JSON.stringify(cluesX),
        cluesY: JSON.stringify(cluesY),
        size: size
    });
}

export function postSolvedPuzzle(puzzleId, time, points) {
    return api.post('/puzzle/solved', {
        puzzleId: puzzleId,
        time: time,
        points: points
    });
}