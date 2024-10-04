import axios from "axios";

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getPuzzles(page, limit) {
    return api.get('/community/created', {
        params: {
            page: page,
            limit: limit
        }
    });
}

export function postPuzzle(cluesX, cluesY, size) {
    return api.post('/community/created', {
        cluesX: JSON.stringify(cluesX),
        cluesY: JSON.stringify(cluesY),
        size: size
    });
}

export function postSolvedPuzzle(puzzleId, time, points) {
    return api.post('/community/created/created', {
        puzzleId: puzzleId,
        time: time,
        points: points
    });
}