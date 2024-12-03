import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

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

export function saveNonogram(nonogramData) {
    return api.post('/puzzle/save', {
        nonogramData: nonogramData
    });
}

export function loadNonogram(nonogramData) {
    return api.get('/puzzle/load', {
        params: {
            nonogramData: nonogramData
        }
    });
}

export function saveCreatedNonogram(nonogramData) {
    return api.post('/create/save', {
        nonogramData: nonogramData
    });
}

export function loadCreatedNonogram(nonogramData) {
    return api.get('/create/load', {
        params: {
            nonogramData: nonogramData
        }
    });
}