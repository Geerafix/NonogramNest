import axios from "axios";

const apiUrl = 'http://localhost:3000';

export function postPuzzle(cluesX, cluesY, size) {
    return axios({
        method: 'POST',
        url: `${apiUrl}/puzzles`,
        withCredentials: true,
        data: {
            cluesX: JSON.stringify(cluesX),
            cluesY: JSON.stringify(cluesY),
            size: size
        }
    });
}

export function postSolvedPuzzle(puzzleId, time, points) {
    return axios({
        method: 'POST',
        url: `${apiUrl}/solved`,
        withCredentials: true,
        data: {
            puzzleId: puzzleId,
            time: time,
            points: points
        }
    });
}

export function getPuzzles(page, limit) {
    return axios({
        method: 'GET',
        url: `${apiUrl}/puzzles`,
        params: {
            page: page,
            limit: limit
        }
    });
}