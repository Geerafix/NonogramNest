import axios from "axios";

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function postPuzzle(cluesX, cluesY, size) {
    return api.post('/puzzles', {
        cluesX: JSON.stringify(cluesX),
        cluesY: JSON.stringify(cluesY),
        size: size
    });
}

export function postSolvedPuzzle(puzzleId, time, points) {
    return api.post('/solved', {
        puzzleId: puzzleId,
        time: time,
        points: points
    });
}

export function postCreatedPuzzle(cluesX, cluesY, size, excludedTiles) {
    return api.post('/created', {
        cluesX: JSON.stringify(cluesX),
        cluesY: JSON.stringify(cluesY),
        size: size,
        excludedTiles: JSON.stringify(excludedTiles)
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

export function getCommunityPuzzles(page, limit, search, option) {
    return api.get('/communityPuzzles', {
        params: {
            page: page,
            limit: limit,
            search: search,
            option: option
        }
    });
}

export function getCommunityPuzzle(id) {
    return api.get('/communityPuzzle', {
        params: {
            created_id: id
        }
    });
}