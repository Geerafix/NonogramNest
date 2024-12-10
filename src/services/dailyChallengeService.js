import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}/api`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function getDailyChallenge() {
    return api.get('/challenge');
}

export function postDailyChallenge(puzzleId, time, points, answers) {
    return api.post('/challenge', {
        puzzleId: puzzleId,
        time: time,
        points: points,
        answers: answers
    });
}

export function updateDailyChallenge(answers, time, points, isSolved, bonus) {
    return api.put('/challenge', {
        answers: answers,
        time: time,
        points: points,
        bonus: bonus,
        isSolved: isSolved
    });
}

export function getDailies(month, year) {
    return api.get('/challenge/dailies', {
        params: {month: month, year: year}
    });
}

export function getStreak() {
    return api.get('/challenge/streak');
}

export function getDailyChallengeInfo(date) {
    return api.get('/challenge/info', {
        params: {date: date}
    });
}