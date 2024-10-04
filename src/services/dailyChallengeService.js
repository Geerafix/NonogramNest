import axios from 'axios';

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getDailyChallenge() {
    return api.get('/dailyChallenge');
}

export function postDailyChallenge(puzzleId, time, points) {
    return api.post('/dailyChallenge', {
        puzzleId: puzzleId,
        time: time,
        points: points,
    });
}

export function updateDailyChallenge(answers, time, points, isSolved) {
    return api.put('/dailyChallenge', {
        answers: answers,
        time: time,
        points: points,
        isSolved: isSolved
    });
}

export function getDailies(month, year) {
    return api.get('/dailies', {
        params: {month: month, year: year}
    });
}

export function getStreak() {
    return api.get('/streak');
}