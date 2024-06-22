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

export function updateDailyChallenge() {
    
}