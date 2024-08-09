import axios from "axios";

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getClassicRating(page, limit, size) {
    return api.get('/rating/classic', {
        params: {
            page: page,
            limit: limit,
            size: size
        }
    });
}

export function getDailyChallengeRating(page, limit) {
    return api.get('/rating/dailyChallenges', {
        params: {
            page: page,
            limit: limit
        }
    });
}