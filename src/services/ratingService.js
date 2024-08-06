import axios from "axios";

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export function getRating(size) {
    return api.get('/rating/classic', {
        size: size
    });
}